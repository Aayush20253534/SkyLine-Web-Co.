import { runAgent } from "../ai/agent.js";

export const chatController = {
  /**
   * POST /api/chat
   * Body: { message: string, sessionId?: string }
   */
  async handleMessage(req, res) {
    try {
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
    } catch (err) {
      console.error("[ChatController] handleMessage error:", err);

      return res.status(500).json({
        success: false,
        error: "Something went wrong while processing your message.",
      });
    }
  },

  /**
   * GET /api/chat/session/:sessionId
   * Returns session history.
   */
  async getSession(req, res) {
    try {
      const { ChatSession } = await import("../models/ChatSession.js");

      const session = await ChatSession.findOne({
        sessionId: req.params.sessionId,
      });

      if (!session) {
        return res.status(404).json({
          success: false,
          error: "Session not found.",
        });
      }

      return res.status(200).json({
        success: true,
        session,
      });
    } catch (err) {
      console.error("[ChatController] getSession error:", err);

      return res.status(500).json({
        success: false,
        error: "Something went wrong while fetching the session.",
      });
    }
  },
};