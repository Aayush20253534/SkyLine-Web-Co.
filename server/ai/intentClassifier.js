// server/ai/intentClassifier.js

import { chatCompletion, extractContent } from "./llmClient.js";

export const INTENTS = {
  GREETING: "greeting",
  PORTFOLIO_QUESTION: "portfolio_question",
  LEAD_INTEREST: "lead_interest",
  LEAD_QUALIFICATION: "lead_qualification",
  BOOK_MEETING: "book_meeting",
  PROPOSAL_REQUEST: "proposal_request",
  PRICING_QUESTION: "pricing_question",
  GENERAL_CHAT: "general_chat",
  UNKNOWN: "unknown",
};

const CLASSIFIER_PROMPT = `
You are an intent classifier for a developer portfolio chatbot.

Return ONLY valid JSON.

No markdown.
No backticks.
No extra text.
No explanations.
No trailing commas.

Allowed intents:
- greeting
- portfolio_question
- lead_interest
- lead_qualification
- book_meeting
- proposal_request
- pricing_question
- general_chat
- unknown

Output format:
{
  "intent": "one of the intents",
  "confidence": 0.0,
  "extracted": {
    "name": null,
    "email": null,
    "projectType": null,
    "budget": null,
    "timeline": null
  }
}
`;

/**
 * Safely extract JSON from messy LLM output
 */
function safeJsonParse(raw) {
  if (!raw || typeof raw !== "string") {
    throw new Error("Empty LLM response");
  }

  // Remove code fences
  let cleaned = raw
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  // Try direct parse first
  try {
    return JSON.parse(cleaned);
  } catch (_) {
    // fallback: extract first JSON-like block
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (!match) {
      throw new Error("No JSON object found in LLM output");
    }

    return JSON.parse(match[0]);
  }
}

/**
 * Classify the intent of a user message.
 */
export async function classifyIntent(userMessage, sessionContext = {}) {
  const contextHint =
    sessionContext.qualificationStage &&
    sessionContext.qualificationStage !== "none"
      ? `\nSession stage: ${sessionContext.qualificationStage}`
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
      temperature: 0,
    });

    const raw = extractContent(response);

    const parsed = safeJsonParse(raw);

    return {
      intent: parsed.intent || INTENTS.UNKNOWN,
      confidence:
        typeof parsed.confidence === "number"
          ? parsed.confidence
          : 0.5,
      extracted: parsed.extracted || {
        name: null,
        email: null,
        projectType: null,
        budget: null,
        timeline: null,
      },
    };
  } catch (err) {
    console.warn("[IntentClassifier] Failed:", err.message);

    return {
      intent: INTENTS.UNKNOWN,
      confidence: 0,
      extracted: {
        name: null,
        email: null,
        projectType: null,
        budget: null,
        timeline: null,
      },
    };
  }
}