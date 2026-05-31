// server/ai/agent.js
// The core agent orchestrator.
//
// Implements a ReAct (Reason + Act) loop:
//   1. Build context (RAG + session state + intent)
//   2. Call LLM with tools available
//   3. If LLM wants to use a tool → execute it → feed result back → call LLM again
//   4. Repeat until LLM produces a final text response (or max iterations hit)
//   5. Persist memory

import {
  chatCompletion,
  extractContent,
  extractToolCalls,
  wantsToolCall,
} from "./llmClient.js";
import { buildSystemPrompt } from "./prompts.js";
import { TOOL_DEFINITIONS } from "./tools.js";
import { executeTool } from "./toolExecutor.js";
import { ragSearch } from "./rag.js";
import { classifyIntent, INTENTS } from "./intentClassifier.js";
import {
  loadSession,
  buildMessageHistory,
  appendUserMessage,
  appendAssistantMessage,
  appendToolMessage,
  recordToolExecution,
  mergeExtractedData,
  saveSession,
} from "./memory.js";

const MAX_TOOL_ITERATIONS = 6; // Safety cap — prevents infinite loops

/**
 * Main agent entry point.
 * Called by the chat controller for each user message.
 *
 * @param {Object} params
 * @param {string} params.sessionId
 * @param {string} params.userMessage
 * @param {Object} [params.metadata]   - { ipAddress, userAgent }
 * @returns {Promise<{ reply: string, sessionId: string }>}
 */
export async function runAgent({ sessionId, userMessage, metadata = {} }) {
  // ── 1. Load session ───────────────────────────────────────────────────────
  const session = await loadSession(sessionId, metadata);

  // ── 2. Intent classification (fast pre-pass) ──────────────────────────────
  const { intent, extracted } = await classifyIntent(userMessage, {
    extractedData: session.extractedData,
    qualificationStage: session.qualificationStage,
  });

  // Merge any data extracted by classifier immediately
  if (extracted && Object.keys(extracted).some((k) => extracted[k])) {
    mergeExtractedData(session, extracted);
  }

  // Update qualification stage based on intent
  updateQualificationStage(session, intent);

  // ── 3. RAG retrieval ──────────────────────────────────────────────────────
  // Run RAG for portfolio/pricing/project questions; skip for pure small talk
  let ragContext = "";
  const needsRAG = [
    INTENTS.PORTFOLIO_QUESTION,
    INTENTS.PRICING_QUESTION,
    INTENTS.LEAD_INTEREST,
    INTENTS.PROPOSAL_REQUEST,
  ].includes(intent);

  if (needsRAG) {
    ragContext = await ragSearch(userMessage);
  }

  // ── 4. Build message history ──────────────────────────────────────────────
  const systemPrompt = buildSystemPrompt({
    ragContext,
    extractedData: session.extractedData,
    qualificationStage: session.qualificationStage,
    intent,
  });

  appendUserMessage(session, userMessage);
  const messages = buildMessageHistory(session, systemPrompt);

  // ── 5. ReAct loop ─────────────────────────────────────────────────────────
  let reply = "";
  let iterations = 0;
  // We'll mutate this array as we add tool results
  const loopMessages = [...messages];

  while (iterations < MAX_TOOL_ITERATIONS) {
    iterations++;

    const response = await chatCompletion({
      messages: loopMessages,
      tools: TOOL_DEFINITIONS,
      toolChoice: "auto",
      maxTokens: 1024,
      temperature: 0.4,
    });

    const assistantMessage = response.choices[0].message;

    if (!wantsToolCall(response)) {
      // LLM is done — final text response
      reply = extractContent(response);
      appendAssistantMessage(session, reply, response.usage);
      break;
    }

    // ── Tool call(s) requested ──────────────────────────────────────────────
    const toolCalls = extractToolCalls(response);

    // Add the assistant's tool-call message to the loop
    loopMessages.push(assistantMessage);

    // Execute all tool calls in this turn (may be parallel)
    const toolResults = await Promise.all(
      toolCalls.map(async (toolCall) => {
        const toolName = toolCall.function.name;
        let args;
        try {
          args = JSON.parse(toolCall.function.arguments);
        } catch {
          args = {};
        }

        const { success, result, error } = await executeTool(
          toolName,
          args,
          { sessionId, session }
        );

        // Log tool execution in session history
        recordToolExecution(session, toolName, args, result, success);

        // Merge any extracted data from tool responses
        if (toolName === "saveLead" && success) {
          session.leadSaved = true;
          mergeExtractedData(session, args);
        }
        if (toolName === "createMeeting" && success && args.email) {
          mergeExtractedData(session, { email: args.email });
        }

        const content = success
          ? JSON.stringify(result)
          : JSON.stringify({ error: error || "Tool execution failed" });

        return {
          toolCallId: toolCall.id,
          toolName,
          content,
        };
      })
    );

    // Add tool result messages to session and loop
    for (const tr of toolResults) {
      appendToolMessage(session, tr.toolCallId, tr.toolName, tr.content);
      loopMessages.push({
        role: "tool",
        tool_call_id: tr.toolCallId,
        name: tr.toolName,
        content: tr.content,
      });
    }

    // Loop continues — LLM will now reason about the tool results
  }

  if (!reply) {
    reply =
      "I'm sorry, I ran into an issue processing that. Could you try again?";
    appendAssistantMessage(session, reply);
  }

  // ── 6. Persist memory ─────────────────────────────────────────────────────
  await saveSession(session);

  return { reply, sessionId };
}

/**
 * Update the qualification stage based on detected intent.
 * This drives the agent's questioning strategy.
 */
function updateQualificationStage(session, intent) {
  if (session.qualificationStage === "qualified") return;

  if (intent === INTENTS.LEAD_INTEREST && session.qualificationStage === "none") {
    session.qualificationStage = "collecting_project";
    return;
  }

  const data = session.extractedData;
  if (session.qualificationStage !== "none") {
    if (!data.projectType) {
      session.qualificationStage = "collecting_project";
    } else if (!data.budget) {
      session.qualificationStage = "collecting_budget";
    } else if (!data.timeline) {
      session.qualificationStage = "collecting_timeline";
    } else if (!data.email) {
      session.qualificationStage = "collecting_email";
    } else {
      session.qualificationStage = "qualified";
    }
  }

  session.markModified("qualificationStage");
}