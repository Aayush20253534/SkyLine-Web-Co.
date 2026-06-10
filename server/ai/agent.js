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

const MAX_TOOL_ITERATIONS = 3;

export async function runAgent({ sessionId, userMessage, metadata = {} }) {
  const session = await loadSession(sessionId, metadata);

  const { intent, extracted } = await classifyIntent(userMessage, {
    extractedData: session.extractedData,
    qualificationStage: session.qualificationStage,
  });

  if (extracted && Object.values(extracted).some(Boolean)) {
    mergeExtractedData(session, extracted);
  }

  updateQualificationStage(session, intent);

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

  const systemPrompt = buildSystemPrompt({
    ragContext,
    extractedData: session.extractedData,
    qualificationStage: session.qualificationStage,
    intent,
  });

  appendUserMessage(session, userMessage);

  const messages = buildMessageHistory(session, systemPrompt);
  const loopMessages = [...messages];

  let reply = "";
  let iterations = 0;

  while (iterations < MAX_TOOL_ITERATIONS) {
    iterations++;

    const response = await chatCompletion({
      messages: loopMessages,
      tools: TOOL_DEFINITIONS,
      toolChoice: "auto",
      maxTokens: 1024,
      temperature: 0.4,
    });

    const content = extractContent(response) || "";

    if (!wantsToolCall(response)) {
      reply = content || "Done.";

      appendAssistantMessage(session, reply, response?.usage);
      await saveSession(session);

      return { reply, sessionId };
    }

    const toolCalls = extractToolCalls(response);

    if (!toolCalls?.length) {
      reply = content || "Done.";

      appendAssistantMessage(session, reply);
      await saveSession(session);

      return { reply, sessionId };
    }

    loopMessages.push({
      role: "assistant",
      content,
      tool_calls: toolCalls.map((call) => ({
        id: call.id,
        type: "function",
        function: {
          name: call.function.name,
          arguments: call.function.arguments || "{}",
        },
      })),
    });

    for (const toolCall of toolCalls) {
      const toolName = toolCall.function.name;

      let args = {};

      try {
        args = JSON.parse(toolCall.function.arguments || "{}");
      } catch {
        args = {};
      }

      const { success, result, error, skipped } = await executeTool(
        toolName,
        args,
        {
          sessionId,
          session,
        }
      );

      recordToolExecution(session, toolName, args, result, success);

      const toolContent = success
        ? JSON.stringify(result || {})
        : JSON.stringify({ error: error || "Tool failed." });

      appendToolMessage(session, toolCall.id, toolName, toolContent);

      loopMessages.push({
        role: "tool",
        tool_call_id: toolCall.id,
        name: toolName,
        content: toolContent,
      });

      if (toolName === "sendEmail") {
        reply = skipped
          ? "That email was already sent, so I did not send a duplicate."
          : "Email sent successfully.";

        appendAssistantMessage(session, reply);
        await saveSession(session);

        return { reply, sessionId };
      }

      if (toolName === "saveLead") {
        reply = "Your details have been saved successfully.";

        appendAssistantMessage(session, reply);
        await saveSession(session);

        return { reply, sessionId };
      }

      if (toolName === "generateProposal") {
        let parsed = {};

        try {
          parsed = JSON.parse(toolContent);
        } catch {
          parsed = {};
        }

        reply =
          parsed.message ||
          parsed.proposal ||
          "Proposal generated successfully.";

        appendAssistantMessage(session, reply);
        await saveSession(session);

        return { reply, sessionId };
      }

      if (toolName === "createMeeting") {
        let parsed = {};

        try {
          parsed = JSON.parse(toolContent);
        } catch {
          parsed = {};
        }

        if (parsed.success) {
          reply =
            parsed.message ||
            "Your meeting has been scheduled successfully.";
        } else if (parsed.conflict === "email_day_conflict") {
          reply =
            parsed.message ||
            "You already have a meeting scheduled on this day.";
        } else if (parsed.conflict === "slot_taken") {
          reply =
            parsed.message ||
            "This time slot is already booked. Please choose another time.";
        } else {
          reply =
            parsed.message ||
            "Sorry, I couldn't schedule the meeting. Please try again.";
        }

        appendAssistantMessage(session, reply);
        await saveSession(session);

        return { reply, sessionId };
      }
    }
  }

  reply =
    "I completed the request, but stopped after too many tool attempts.";

  appendAssistantMessage(session, reply);
  await saveSession(session);

  return { reply, sessionId };
}

function updateQualificationStage(session, intent) {
  if (session.qualificationStage === "qualified") return;

  if (
    intent === INTENTS.LEAD_INTEREST &&
    session.qualificationStage === "none"
  ) {
    session.qualificationStage = "collecting_project";
    session.markModified("qualificationStage");
    return;
  }

  const d = session.extractedData || {};

  if (session.qualificationStage !== "none") {
    if (!d.projectType) {
      session.qualificationStage = "collecting_project";
    } else if (!d.budget) {
      session.qualificationStage = "collecting_budget";
    } else if (!d.timeline) {
      session.qualificationStage = "collecting_timeline";
    } else if (!d.email) {
      session.qualificationStage = "collecting_email";
    } else {
      session.qualificationStage = "qualified";
    }

    session.markModified("qualificationStage");
  }
}