// server/ai/llmClient.js

import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenAI } from "@google/genai";
import Groq from "groq-sdk";
import { env } from "../config/env.js";

/**
 * =========================
 * CLIENTS
 * =========================
 */

const gemini = new GoogleGenerativeAI(env.gemini.apiKey);
const genAI = new GoogleGenAI({ apiKey: env.gemini.apiKey });

const groq = new Groq({
  apiKey: env.groq.apiKey,
});

/**
 * =========================
 * SAFE GROQ MESSAGE FORMATTER
 * =========================
 */
function sanitizeForGroq(messages) {
  return messages
    .filter((m) =>
      ["system", "user", "assistant"].includes(m.role)
    )
    .map((m) => ({
      role: m.role,
      content:
        typeof m.content === "string"
          ? m.content
          : JSON.stringify(m.content),
    }));
}

/**
 * =========================
 * CHAT COMPLETION (HYBRID)
 * =========================
 * Groq = primary
 * Gemini = fallback (DISABLED SAFELY)
 */
export async function chatCompletion({
  messages,
  tools = [],
  maxTokens = 1024,
  temperature = 0.4,
}) {
  const systemMessage = messages.find(
    (m) => m.role === "system"
  );

  const conversation = messages.filter(
    (m) => m.role !== "system"
  );

  const lastMessage =
    conversation.length > 0
      ? conversation[conversation.length - 1]
      : null;

  const groqMessages = sanitizeForGroq([
    ...(systemMessage ? [systemMessage] : []),
    ...conversation,
  ]);

  try {
    /**
     * =========================
     * GROQ PRIMARY PATH
     * =========================
     */
    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: groqMessages,
      temperature,
      max_tokens: maxTokens,
    });

    return {
      provider: "groq",
      response,
    };
  } catch (err) {
    console.warn("[Groq Error]", err.message);

    /**
     * =========================
     * GEMINI FALLBACK (SAFE MODE)
     * =========================
     * IMPORTANT:
     * Disabled tool usage to avoid quota + format conflicts
     */
    const model = gemini.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: systemMessage?.content || "",
      generationConfig: {
        maxOutputTokens: maxTokens,
        temperature,
      },
    });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text:
                lastMessage?.content || "",
            },
          ],
        },
      ],
    });

    return {
      provider: "gemini",
      response: result,
    };
  }
}

/**
 * =========================
 * EMBEDDINGS (UNCHANGED)
 * =========================
 */
export async function createEmbedding(text) {
  const response = await genAI.models.embedContent({
    model: "gemini-embedding-001",
    contents: text.slice(0, 8000),
  });

  return response.embeddings[0].values;
}

/**
 * =========================
 * EXTRACT CONTENT (ROBUST)
 * =========================
 */
export function extractContent(wrapper) {
  try {
    const response = wrapper?.response;

    if (!response) return "";

    // GROQ
    if (wrapper.provider === "groq") {
      return (
        response?.choices?.[0]?.message?.content || ""
      );
    }

    // GEMINI
    return (
      response?.response?.candidates?.[0]?.content
        ?.parts?.[0]?.text || ""
    );
  } catch {
    return "";
  }
}

/**
 * =========================
 * TOOL CALLS (GEMINI ONLY - UNCHANGED)
 * =========================
 */
export function extractToolCalls(wrapper) {
  const response = wrapper?.response;

  const parts =
    response?.response?.candidates?.[0]?.content?.parts ||
    [];

  const functionCalls = parts
    .map((p) => p.functionCall)
    .filter(Boolean);

  if (!functionCalls.length) return null;

  return functionCalls.map((call, i) => ({
    id: `call_${i}_${call.name}`,
    function: {
      name: call.name,
      arguments: JSON.stringify(call.args || {}),
    },
  }));
}

export function wantsToolCall(wrapper) {
  return Boolean(extractToolCalls(wrapper));
}

/**
 * =========================
 * TOOL CONVERTER (UNCHANGED)
 * =========================
 */
function toGeminiFunctionDecl(tool) {
  return {
    name: tool.function.name,
    description: tool.function.description,
    parameters: tool.function.parameters,
  };
}