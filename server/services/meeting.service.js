// server/services/meeting.service.js

import { parseDate } from "chrono-node";
import { Meeting } from "../models/Meeting.js";
import { emailService } from "./email.service.js";

/**
 * Normalize datetime safely
 */
function normalizeDate(datetime) {
  if (!datetime) return null;
  try {
    const parsed = parseDate(datetime);
    return parsed ? new Date(parsed) : null;
  } catch (err) {
    console.error("Date parse error:", err.message);
    return null;
  }
}

/**
 * Check if a time slot is taken by ANY user (1-hour window).
 * Returns the conflicting meeting or null.
 */
async function isSlotTaken(date) {
  const start = new Date(date);
  const end = new Date(start);
  end.setMinutes(end.getMinutes() + 60);

  return await Meeting.findOne({
    datetime: { $gte: start, $lt: end },
    status: { $in: ["pending", "confirmed"] },
  });
}

/**
 * Check if THIS email already has any meeting on the same calendar day.
 * Returns the conflicting meeting or null.
 */
async function hasEmailMeetingOnDay(email, date) {
  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);

  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await Meeting.findOne({
    email: email.toLowerCase().trim(),
    datetime: { $gte: dayStart, $lte: dayEnd },
    status: { $in: ["pending", "confirmed"] },
  });
}

/**
 * Format a date for display in user-facing messages.
 */
function formatDateTime(date) {
  return new Date(date).toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

/**
 * Generate stable dedupe key per email+datetime.
 */
function buildKeys(email, date) {
  const normalizedEmail = email.toLowerCase().trim();
  const iso = new Date(date).toISOString();
  return {
    dedupeKey: `${normalizedEmail}_${iso}`,
    slotKey: iso,
  };
}

export const meetingService = {
  /**
   * Availability
   */
  async getAvailability() {
    return {
      availability: "Mon–Fri 10AM–6PM IST",
      slots: [
        "10:00–11:00",
        "11:00–12:00",
        "14:00–15:00",
        "15:00–16:00",
        "16:00–17:00",
      ],
    };
  },

  /**
   * CREATE MEETING
   *
   * Checks (in order):
   *   1. Exact duplicate (same email + same datetime) → return existing
   *   2. Same email already has a meeting on that calendar day → reject with details
   *   3. Slot taken by someone else → reject with booked-slot message
   *   4. All clear → create meeting
   */
  async createMeeting({
    sessionId,
    name,
    email,
    datetime,
    timezone = "Asia/Kolkata",
    topic,
  }) {
    console.log("🔥 CREATE MEETING");

    if (!email || !datetime) {
      return {
        success: false,
        message: "Email and datetime are required.",
      };
    }

    const parsedDate = normalizeDate(datetime);
    if (!parsedDate) {
      return {
        success: false,
        message: "Invalid datetime format. Please try again with a clear date and time.",
      };
    }

    const normalizedEmail = email.toLowerCase().trim();
    const { dedupeKey, slotKey } = buildKeys(normalizedEmail, parsedDate);

    // ── 1. Exact duplicate: same email + exact same time ─────────────────────
    const exactDuplicate = await Meeting.findOne({ dedupeKey });
    if (exactDuplicate) {
      return {
        success: true,
        alreadyExists: true,
        meetingId: exactDuplicate._id.toString(),
        joinUrl: exactDuplicate.joinUrl,
        message: `You already have this meeting scheduled for ${formatDateTime(exactDuplicate.datetime)}. Here's your join link: ${exactDuplicate.joinUrl}`,
      };
    }

    // ── 2. Same email, different time but same day ────────────────────────────
    const sameEmailSameDay = await hasEmailMeetingOnDay(normalizedEmail, parsedDate);
    if (sameEmailSameDay) {
      return {
        success: false,
        conflict: "email_day_conflict",
        existingMeeting: {
          datetime: sameEmailSameDay.datetime,
          topic: sameEmailSameDay.topic,
          joinUrl: sameEmailSameDay.joinUrl,
        },
        message: `You already have a meeting scheduled on ${formatDateTime(sameEmailSameDay.datetime)} for "${sameEmailSameDay.topic || "General Meeting"}". Only one meeting per day is allowed. Would you like to reschedule that one, or pick a different day?`,
      };
    }

    // ── 3. Slot taken by someone else ─────────────────────────────────────────
    const slotConflict = await isSlotTaken(parsedDate);
    if (slotConflict) {
      return {
        success: false,
        conflict: "slot_taken",
        message: `❌ The ${formatDateTime(parsedDate)} slot is already booked by another client. Please choose a different time. Available slots are Mon–Fri 10AM–6PM IST.`,
      };
    }

    // ── 4. All clear — create meeting ─────────────────────────────────────────
    const roomName = `skyline-${Date.now()}`;
    const meetingLink = `https://meet.jit.si/${roomName}`;

    const meeting = await Meeting.create({
      sessionId,
      name: name || "Guest",
      email: normalizedEmail,
      datetime: parsedDate,
      timezone,
      topic: topic || "General Meeting",
      status: "confirmed",
      joinUrl: meetingLink,
      dedupeKey,
      slotKey,
    });

    // Email client (non-blocking)
    emailService
      .send({
        to: email,
        subject: "📅 Meeting Confirmed",
        body: `
Hi ${name || "there"},

Your meeting is confirmed.

📅 Time: ${formatDateTime(parsedDate)}
📝 Topic: ${topic || "General Meeting"}

🔗 Join Link:
${meetingLink}
        `.trim(),
      })
      .catch((err) => console.error("Client email failed:", err.message));

    // Email owner (non-blocking)
    emailService
      .send({
        to: process.env.OWNER_EMAIL || "hello@skyline-web-co.com",
        subject: `📌 New Meeting: ${topic || "Meeting Booked"}`,
        body: `
New meeting scheduled:

👤 Name: ${name || "Guest"}
📧 Email: ${email}
📅 Time: ${formatDateTime(parsedDate)}
📝 Topic: ${topic || "General Meeting"}

🔗 Join Link:
${meetingLink}
        `.trim(),
      })
      .catch((err) => console.error("Owner email failed:", err.message));

    return {
      success: true,
      meetingId: meeting._id.toString(),
      scheduledFor: parsedDate,
      joinUrl: meetingLink,
      message: `✅ Your meeting is confirmed for ${formatDateTime(parsedDate)}. Join link: ${meetingLink}`,
    };
  },
};