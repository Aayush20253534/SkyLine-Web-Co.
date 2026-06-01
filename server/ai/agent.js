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

const MAX_TOOL_ITERATIONS = 6;

export async function runAgent({
  sessionId,
  userMessage,
  metadata = {},
}) {
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

    const assistantMessage = {
      role: "assistant",
      content: extractContent(response),
    };

    if (!wantsToolCall(response)) {
      reply = extractContent(response);

      appendAssistantMessage(session, reply, response?.usage);
      break;
    }

    const toolCalls = extractToolCalls(response);

    if (!toolCalls) break;

    loopMessages.push(assistantMessage);

    const toolResults = await Promise.all(
      toolCalls.map(async (toolCall) => {
        const toolName = toolCall.function.name;

        let args = {};
        try {
          args = JSON.parse(toolCall.function.arguments);
        } catch {}

        const { success, result, error } =
          await executeTool(toolName, args, {
            sessionId,
            session,
          });

        recordToolExecution(
          session,
          toolName,
          args,
          result,
          success
        );

        const content = success
          ? JSON.stringify(result)
          : JSON.stringify({ error });

        return {
          toolCallId: toolCall.id,
          toolName,
          content,
        };
      })
    );

   for (const tr of toolResults) {
  appendToolMessage(
    session,
    tr.toolCallId,
    tr.toolName,
    tr.content
  );

  loopMessages.push({
    role: "tool",
    tool_call_id: tr.toolCallId,
    name: tr.toolName,
    content: tr.content,
  });

  // stop after successful meeting creation
  if (
    tr.toolName === "createMeeting" &&
    !tr.content.includes('"error"')
  ) {
    reply =
      "Your meeting has been scheduled successfully. A confirmation email has been sent.";

    appendAssistantMessage(session, reply);
    await saveSession(session);

    return { reply, sessionId };
  }
}
  }

  if (!reply) {
    reply =
      "I'm sorry, something broke while processing your request.";
    appendAssistantMessage(session, reply);
  }

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
    return;
  }

  const d = session.extractedData;

  if (session.qualificationStage !== "none") {
    if (!d.projectType)
      session.qualificationStage = "collecting_project";
    else if (!d.budget)
      session.qualificationStage = "collecting_budget";
    else if (!d.timeline)
      session.qualificationStage = "collecting_timeline";
    else if (!d.email)
      session.qualificationStage = "collecting_email";
    else session.qualificationStage = "qualified";
  }

  session.markModified("qualificationStage");
}