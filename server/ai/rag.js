// server/ai/rag.js
// Retrieval-Augmented Generation over portfolio knowledge files.
//
// Strategy:
//   1. At startup, chunk all .md files from /knowledge/
//   2. Embed each chunk using OpenAI embeddings
//   3. Store chunks + vectors in memory (no external vector DB needed for portfolio scale)
//   4. At query time, embed the query and return top-K cosine-similar chunks
//
// For larger knowledge bases, swap the in-memory store for Pinecone / Weaviate.

import { readdir, readFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { createEmbedding } from "./llmClient.js";
import { env } from "../config/env.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const KNOWLEDGE_DIR = join(__dirname, "../knowledge");

// In-memory vector store
/** @type {Array<{ source: string, content: string, embedding: number[] }>} */
let vectorStore = [];
let initialized = false;

// ── Chunking ──────────────────────────────────────────────────────────────────

/**
 * Split markdown text into overlapping chunks.
 * Splits on headings and paragraph breaks.
 */
function chunkMarkdown(text, source, maxChunkSize = 500, overlap = 80) {
  // Split on double newlines (paragraphs) and headings
  const rawChunks = text
    .split(/\n#{1,3} |\n\n/)
    .map((c) => c.trim())
    .filter((c) => c.length > 40);

  const chunks = [];

  for (const raw of rawChunks) {
    if (raw.length <= maxChunkSize) {
      chunks.push({ source, content: raw });
    } else {
      // Slide window over long chunks
      let start = 0;
      while (start < raw.length) {
        const end = Math.min(start + maxChunkSize, raw.length);
        chunks.push({ source, content: raw.slice(start, end) });
        start += maxChunkSize - overlap;
      }
    }
  }

  return chunks;
}

// ── Vector Store ──────────────────────────────────────────────────────────────

/**
 * Initialize the RAG system by embedding all knowledge files.
 * Called once at server startup.
 */
export async function initRAG() {
  if (initialized) return;

  console.log("[RAG] Initializing knowledge base...");

  let files;
  try {
    files = await readdir(KNOWLEDGE_DIR);
  } catch {
    console.warn("[RAG] Knowledge directory not found — RAG disabled.");
    initialized = true;
    return;
  }

  const mdFiles = files.filter((f) => f.endsWith(".md"));

  if (mdFiles.length === 0) {
    console.warn("[RAG] No .md files found in /knowledge/");
    initialized = true;
    return;
  }

  const allChunks = [];

  for (const file of mdFiles) {
    const content = await readFile(join(KNOWLEDGE_DIR, file), "utf-8");
    const chunks = chunkMarkdown(content, file);
    allChunks.push(...chunks);
  }

  console.log(`[RAG] Embedding ${allChunks.length} chunks from ${mdFiles.length} files...`);

  // Embed in batches to respect rate limits
  const BATCH_SIZE = 20;
  for (let i = 0; i < allChunks.length; i += BATCH_SIZE) {
    const batch = allChunks.slice(i, i + BATCH_SIZE);
    await Promise.all(
      batch.map(async (chunk) => {
        const embedding = await createEmbedding(chunk.content);
        vectorStore.push({ ...chunk, embedding });
      })
    );
    // Small delay to avoid rate limit spikes
    if (i + BATCH_SIZE < allChunks.length) {
      await new Promise((r) => setTimeout(r, 200));
    }
  }

  initialized = true;
  console.log(`[RAG] Ready. ${vectorStore.length} chunks indexed.`);
}

// ── Retrieval ─────────────────────────────────────────────────────────────────

/**
 * Cosine similarity between two vectors.
 */
function cosineSimilarity(a, b) {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Search the knowledge base for relevant chunks.
 *
 * @param {string} query
 * @returns {Promise<string>} Formatted context string for the LLM
 */
export async function ragSearch(query) {
  if (!initialized || vectorStore.length === 0) {
    return "Knowledge base not available.";
  }

  const queryEmbedding = await createEmbedding(query);

  // Score all chunks
  const scored = vectorStore.map((chunk) => ({
    ...chunk,
    score: cosineSimilarity(queryEmbedding, chunk.embedding),
  }));

  // Filter by threshold and take top-K
  const topChunks = scored
    .filter((c) => c.score >= env.rag.similarityThreshold)
    .sort((a, b) => b.score - a.score)
    .slice(0, env.rag.topK);

  if (topChunks.length === 0) {
    return "No relevant information found in the knowledge base.";
  }

  // Format for LLM context injection
  return topChunks
    .map((c) => `[Source: ${c.source}]\n${c.content}`)
    .join("\n\n---\n\n");
}