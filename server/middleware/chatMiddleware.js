// server/middleware/chatMiddleware.js
// Middleware stack for the /api/chat endpoint:
//   1. Rate limiting (express-rate-limit)
//   2. Input validation + sanitization
//   3. Session ID generation/validation

import rateLimit from "express-rate-limit";
import { env } from "../config/env.js";
import { v4 as uuidv4 } from "uuid";

// ── Rate Limiter ──────────────────────────────────────────────────────────────

export const chatRateLimit = rateLimit({
  windowMs: env.rateLimit.windowMs,
  max: env.rateLimit.max,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    // Rate limit per IP + session combo
    const sessionId = req.body?.sessionId || req.headers["x-session-id"] || "";
    return `${req.ip}:${sessionId}`;
  },
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      error: "Too many messages. Please wait a moment before continuing.",
    });
  },
});

// ── Input Validation ──────────────────────────────────────────────────────────

export function validateChatInput(req, res, next) {
  const { message, sessionId } = req.body;

  // message must exist and be a string
  if (!message || typeof message !== "string") {
    return res.status(400).json({
      success: false,
      error: "message is required and must be a string.",
    });
  }

  // Length cap — prevent token stuffing
  if (message.length > 2000) {
    return res.status(400).json({
      success: false,
      error: "Message too long. Maximum 2000 characters.",
    });
  }

  // Sanitize: strip HTML tags from user message
  req.body.message = message.replace(/<[^>]*>/g, "").trim();

  if (!req.body.message) {
    return res.status(400).json({
      success: false,
      error: "Message cannot be empty after sanitization.",
    });
  }

  // Validate or generate sessionId
  if (sessionId) {
    // Basic UUID v4 format check
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(sessionId)) {
      return res.status(400).json({
        success: false,
        error: "Invalid sessionId format.",
      });
    }
    req.body.sessionId = sessionId;
  } else {
    // Generate new session ID
    req.body.sessionId = uuidv4();
  }

  next();
}