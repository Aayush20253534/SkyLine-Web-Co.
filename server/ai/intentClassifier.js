// server/ai/intentClassifier.js
// Lightweight intent classification using a small LLM call.
// Runs before the main agent to:
//   1. Detect the primary intent category
//   2. Extract any structured data present in the message (email, name, etc.)
//   3. Update session qualification stage
//
// This is a cheap call (small model, strict JSON output) that guides the agent
// on what to prioritize in its system prompt context injection.

import { chatCompletion, extractContent } from "./llmClient.js";

export const INTENTS = {
  GREETING: "greeting",
  PORTFOLIO_QUESTION: "portfolio_question",
  LEAD_INTEREST: "lead_interest",          // "I need a developer / I have a project"
  LEAD_QUALIFICATION: "lead_qualification", // answering qualification questions
  BOOK_MEETING: "book_meeting",
  PROPOSAL_REQUEST: "proposal_request",
  PRICING_QUESTION: "pricing_question",
  GENERAL_CHAT: "general_chat",
  UNKNOWN: "unknown",
};

const CLASSIFIER_PROMPT = `You are an intent classifier for a developer portfolio chatbot.

Classify the user's message into exactly one of these intents:
- greeting
- portfolio_question     (asking about skills, projects, experience, tech stack)
- lead_interest          (wants to hire, needs a developer, has a project idea)
- lead_qualification     (providing project details: type, budget, timeline, email, name)
- book_meeting           (wants to schedule a call or consultation)
- proposal_request       (asking for a project proposal or quote)
- pricing_question       (asking about rates, costs, pricing)
- general_chat           (small talk, off-topic)
- unknown

Also extract any structured data present in the message.

Respond ONLY with a valid JSON object in this exact format:
{
  "intent": "<one of the intents above>",
  "confidence": <0.0-1.0>,
  "extracted": {
    "name": "<string or null>",
    "email": "<string or null>",
    "projectType": "<string or null>",
    "budget": "<string or null>",
    "timeline": "<string or null>"
  }
}`;

/**
 * Classify the intent of a user message.
 *
 * @param {string} userMessage
 * @param {Object} sessionContext - { extractedData, qualificationStage }
 * @returns {Promise<{ intent: string, confidence: number, extracted: Object }>}
 */
export async function classifyIntent(userMessage, sessionContext = {}) {
  const contextHint = sessionContext.qualificationStage !== "none"
    ? `\n[Session context: currently in "${sessionContext.qualificationStage}" stage]`
    : "";

  try {
    const response = await chatCompletion({
      messages: [
        { role: "system", content: CLASSIFIER_PROMPT },
        {
          role: "user",
          content: `Message: "${userMessage}"${contextHint}`,
        },
      ],
      tools: undefined,
      maxTokens: 200,
      temperature: 0.1,
    });

    const raw = extractContent(response);
    // Strip any markdown fences if model wraps in them
    const clean = raw.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    return {
      intent: parsed.intent || INTENTS.UNKNOWN,
      confidence: parsed.confidence || 0.5,
      extracted: parsed.extracted || {},
    };
  } catch (err) {
    console.warn("[IntentClassifier] Failed to parse response:", err.message);
    return {
      intent: INTENTS.UNKNOWN,
      confidence: 0,
      extracted: {},
    };
  }
}