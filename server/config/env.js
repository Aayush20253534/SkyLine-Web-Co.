import dotenv from "dotenv";

dotenv.config();

const required = [
  "MONGO_URI",
  "GEMINI_API_KEY",
  "RESEND_API_KEY",
  "OWNER_EMAIL",
];

export function validateEnv() {
  const missing = required.filter(
    (key) => !process.env[key]
  );

  if (missing.length > 0) {
    throw new Error(
      `[ENV] Missing required environment variables:\n  ${missing.join(
        "\n  "
      )}`
    );
  }
}

export const env = {
  port: parseInt(process.env.PORT || "5000", 10),

  nodeEnv:
    process.env.NODE_ENV || "development",

  isProd:
    process.env.NODE_ENV === "production",

  mongoUri: process.env.MONGO_URI,

  gemini: {
    apiKey: process.env.GEMINI_API_KEY,
    model:
      process.env.GEMINI_MODEL ||
      "gemini-1.5-flash",
  },

  resend: {
    apiKey: process.env.RESEND_API_KEY,
  },

  ownerEmail: process.env.OWNER_EMAIL,

  rateLimit: {
    windowMs: parseInt(
      process.env.RATE_LIMIT_WINDOW_MS || "60000",
      10
    ),

    max: parseInt(
      process.env.RATE_LIMIT_MAX || "30",
      10
    ),
  },

  rag: {
    topK: parseInt(
      process.env.RAG_TOP_K || "4",
      10
    ),

    similarityThreshold: parseFloat(
      process.env.RAG_SIMILARITY_THRESHOLD ||
        "0.72"
    ),
  },

  calendlyUrl:
    process.env.CALENDLY_URL || "",

  clientUrl:
    process.env.CLIENT_URL ||
    "http://localhost:5173",
};