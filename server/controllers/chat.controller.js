// server/controllers/chat.controller.js
// Thin HTTP layer. Validates, delegates to agent, returns response.
// No business logic lives here.

import { runAgent } from "../ai/agent.js";

export const chatController = {
  /**
   * POST /api/chat
   * Body: { message: string, sessionId?: string }
   */
  async handleMessage(req, res) {
    const { message, sessionId } = req.body;

    const metadata = {
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"] || "",
    };

    const { reply, sessionId: returnedSessionId } = await runAgent({
      sessionId,
      userMessage: message,
      metadata,
    });

    return res.status(200).json({
      success: true,
      reply,
      sessionId: returnedSessionId,
    });
  },

  /**
   * GET /api/chat/session/:sessionId
   * Returns session history (for debug / admin — protect in production)
   */
  async getSession(req, res) {
    const { ChatSession } = await import("../models/ChatSession.js");
    const session = await ChatSession.findOne({
      sessionId: req.params.sessionId,
    });

    if (!session) {
      return res.status(404).json({ success: false, error: "Session not found." });
    }

    return res.status(200).json({ success: true, session });
  },
};