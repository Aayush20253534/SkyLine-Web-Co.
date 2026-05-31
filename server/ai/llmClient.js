import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenAI } from "@google/genai";
import { env } from "../config/env.js";

const geminiChat =
  new GoogleGenerativeAI(
    env.gemini.apiKey
  );

const genAI =
  new GoogleGenAI({
    apiKey: env.gemini.apiKey,
  });

/**
 * Chat completion
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

  const modelConfig = {
    model: env.gemini.model,
    generationConfig: {
      maxOutputTokens: maxTokens,
      temperature,
    },
  };

  if (tools.length > 0) {
    modelConfig.tools = [
      {
        functionDeclarations: tools.map(
          toGeminiFunctionDecl
        ),
      },
    ];
  }

 const model =
  geminiChat.getGenerativeModel(
    modelConfig
  );

  const history = conversation
    .slice(0, -1)
    .map(toGeminiMessage)
    .filter(Boolean);

  const chat = model.startChat({
    systemInstruction:
      systemMessage?.content || "",
    history,
  });

  const lastMessage =
    conversation[conversation.length - 1];

  const result = await chat.sendMessage(
    lastMessage?.content || ""
  );

  return result;
}

/**
 * Create embedding vector
 */
export async function createEmbedding(text) {
  const response =
    await genAI.models.embedContent({
      model: "gemini-embedding-001",
      contents: text.slice(0, 8000),
    });

  return response.embeddings[0].values;
}

/**
 * Extract response text
 */
export function extractContent(response) {
  try {
    return response.response?.text?.() || "";
  } catch {
    return "";
  }
}

/**
 * Alias for compatibility
 */
export const extractText = extractContent;

/**
 * Extract Gemini function calls
 */
export function extractToolCalls(response) {
  const parts =
    response.response?.candidates?.[0]
      ?.content?.parts || [];

  const functionCalls = parts
    .map((part) => part.functionCall)
    .filter(Boolean);

  if (functionCalls.length === 0) {
    return null;
  }

  return functionCalls.map((call, index) => ({
    id: `call_${index}_${call.name}`,
    function: {
      name: call.name,
      arguments: JSON.stringify(
        call.args || {}
      ),
    },
  }));
}

/**
 * Whether model requested tool execution
 */
export function wantsToolCall(response) {
  const calls =
    extractToolCalls(response);

  return (
    Array.isArray(calls) &&
    calls.length > 0
  );
}

/**
 * Convert app message format
 * to Gemini history format
 */
function toGeminiMessage(msg) {
  if (!msg) return null;

  if (msg.role === "system") {
    return null;
  }

  if (msg.role === "tool") {
    return {
      role: "user",
      parts: [
        {
          text:
            typeof msg.content === "string"
              ? msg.content
              : JSON.stringify(msg.content),
        },
      ],
    };
  }

  return {
    role:
      msg.role === "assistant"
        ? "model"
        : "user",
    parts: [
      {
        text: msg.content || "",
      },
    ],
  };
}

/**
 * OpenAI-style tool schema
 * → Gemini function declaration
 */
function toGeminiFunctionDecl(tool) {
  return {
    name: tool.function.name,
    description:
      tool.function.description,
    parameters:
      tool.function.parameters,
  };
}