// server/ai/memory.js
// Manages conversation memory for the agent.
// Loads session from MongoDB, provides in-request message array,
// and persists back after each turn.

import { ChatSession } from "../models/ChatSession.js";

/**
 * Load or create a session from MongoDB.
 * Returns the full session document.
 *
 * @param {string} sessionId
 * @param {Object} [metadata] - { ipAddress, userAgent }
 * @returns {Promise<ChatSession>}
 */
export async function loadSession(sessionId, metadata = {}) {
  let session = await ChatSession.findOne({ sessionId });

  if (!session) {
    session = await ChatSession.create({
      sessionId,
      messages: [],
      extractedData: {},
      toolHistory: [],
      ...metadata,
    });
    console.log(`[Memory] New session created: ${sessionId}`);
  }

  return session;
}

/**
 * Build the messages array to send to the LLM.
 * Returns recent history only (last N turns) to stay within context window.
 *
 * @param {ChatSession} session
 * @param {string}      systemPrompt
 * @param {number}      [maxTurns=20] - How many recent user/assistant pairs to include
 * @returns {Array} OpenAI messages array
 */
export function buildMessageHistory(session, systemPrompt, maxTurns = 20) {
  const messages = [{ role: "system", content: systemPrompt }];

  // Take the most recent N messages (each "turn" = 1 user + 1 assistant = 2 messages)
  const recent = session.messages.slice(-(maxTurns * 2));

  for (const msg of recent) {
    const entry = { role: msg.role, content: msg.content };
    if (msg.toolCallId) entry.tool_call_id = msg.toolCallId;
    if (msg.toolName) entry.name = msg.toolName;
    messages.push(entry);
  }

  return messages;
}

/**
 * Append a user message to the session (in memory only — not saved yet).
 *
 * @param {ChatSession} session
 * @param {string}      content
 */
export function appendUserMessage(session, content) {
  session.messages.push({ role: "user", content, timestamp: new Date() });
}

/**
 * Append an assistant message.
 *
 * @param {ChatSession} session
 * @param {string}      content
 * @param {Object}      [usage]
 */
export function appendAssistantMessage(session, content, usage) {
  session.messages.push({
    role: "assistant",
    content,
    usage,
    timestamp: new Date(),
  });
}

/**
 * Append a tool result message (role: "tool" in OpenAI spec).
 *
 * @param {ChatSession} session
 * @param {string}      toolCallId
 * @param {string}      toolName
 * @param {string}      content    - JSON-stringified result
 */
export function appendToolMessage(session, toolCallId, toolName, content) {
  session.messages.push({
    role: "tool",
    toolCallId,
    toolName,
    content,
    timestamp: new Date(),
  });
}

/**
 * Record a tool execution in the history log.
 */
export function recordToolExecution(session, toolName, input, output, success) {
  session.toolHistory.push({
    toolName,
    input,
    output,
    success,
    executedAt: new Date(),
  });
}

/**
 * Merge newly extracted data (name, email, etc.) into session.extractedData.
 * Partial updates only — never overwrites existing values with undefined.
 *
 * @param {ChatSession} session
 * @param {Object}      data
 */
export function mergeExtractedData(session, data) {
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && value !== null && value !== "") {
      session.extractedData[key] = value;
    }
  }
  session.markModified("extractedData");
}

/**
 * Persist the session to MongoDB.
 *
 * @param {ChatSession} session
 */
export async function saveSession(session) {
  try {
    await session.save();
  } catch (err) {
    console.error("[Memory] Failed to save session:", err.message);
    // Don't throw — a save failure shouldn't crash the response
  }
}