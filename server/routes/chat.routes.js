// server/routes/chat.routes.js

import { Router } from "express";
import { chatController } from "../controllers/chat.controller.js";
import {
  chatRateLimit,
  validateChatInput,
} from "../middleware/chatMiddleware.js";

const router = Router();

// Async error wrapper — forwards thrown errors to Express error handler
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// POST /api/chat
router.post(
  "/",
  chatRateLimit,
  validateChatInput,
  asyncHandler(chatController.handleMessage)
);

// GET /api/chat/session/:sessionId  (admin/debug — add auth middleware in prod)
router.get(
  "/session/:sessionId",
  asyncHandler(chatController.getSession)
);

export default router;