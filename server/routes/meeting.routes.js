import express from "express";
import { Meeting } from "../models/Meeting.js";

const router = express.Router();

/**
 * GET /meet/:id
 * Redirect user to Jitsi room OR frontend meeting page
 */
router.get("/meet/:id", async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id);

    if (!meeting) {
      return res.status(404).json({
        success: false,
        message: "Meeting not found",
      });
    }

    // If meeting already has stored join URL (future-proof)
    if (meeting.calendlyUrl) {
      return res.redirect(meeting.calendlyUrl);
    }

    // fallback: generate Jitsi link on the fly
    const roomName = `skyline-${meeting._id}`;
    const jitsiUrl = `https://meet.jit.si/${roomName}`;

    return res.redirect(jitsiUrl);
  } catch (err) {
    console.error("Meeting route error:", err);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

export default router;