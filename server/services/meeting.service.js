// server/services/meeting.service.js
// Handles consultation booking and availability.

import { Meeting } from "../models/Meeting.js";
import { emailService } from "./email.service.js";
import { env } from "../config/env.js";

export const meetingService = {
  /**
   * Return available meeting slots.
   * In production this would integrate with Google Calendar / Calendly API.
   * For now returns structured availability info.
   */
  async getAvailability() {
    return {
      availability: env.calendlyUrl
        ? `You can book directly at: ${env.calendlyUrl}`
        : "Available Monday–Friday, 10:00 AM – 6:00 PM IST",
      slots: [
        "Monday–Friday: 10:00 AM – 12:00 PM IST",
        "Monday–Friday: 2:00 PM – 5:00 PM IST",
      ],
      bookingUrl: env.calendlyUrl || null,
      note: "For urgent projects, weekend slots may be available on request.",
    };
  },

  /**
   * Create a meeting record and send confirmation emails.
   *
   * @param {Object} params
   * @returns {Promise<Object>}
   */
  async createMeeting({ sessionId, name, email, datetime, timezone, topic }) {
    if (!email) throw new Error("Email is required to book a meeting.");

    const meeting = await Meeting.create({
      sessionId,
      name,
      email: email.toLowerCase(),
      datetime: datetime ? new Date(datetime) : null,
      timezone: timezone || "Asia/Kolkata",
      topic,
      status: "pending",
      calendlyUrl: env.calendlyUrl || null,
    });

    // Send confirmation to user
    await emailService.send({
      to: email,
      subject: "📅 Consultation Request Received — Aayush",
      body: buildUserConfirmation({ name, datetime, topic, calendlyUrl: env.calendlyUrl }),
      type: "confirmation",
    });

    // Notify owner
    await emailService.send({
      to: env.ownerEmail,
      subject: `📅 New Meeting Request: ${name || email}`,
      body: buildOwnerNotification({ name, email, datetime, timezone, topic }),
      type: "general",
    });

    meeting.confirmationSent = true;
    await meeting.save();

    return {
      success: true,
      meetingId: meeting._id.toString(),
      message: env.calendlyUrl
        ? `Meeting request recorded. Book your slot at: ${env.calendlyUrl}`
        : "Meeting request saved. Aayush will confirm a time shortly.",
    };
  },
};

function buildUserConfirmation({ name, datetime, topic, calendlyUrl }) {
  const greeting = name ? `Hi ${name},` : "Hi there,";
  const timeStr = datetime ? `Requested time: ${new Date(datetime).toLocaleString()}` : "";

  return `
${greeting}

Thanks for reaching out! Your consultation request has been received.

${timeStr}
Topic: ${topic || "General consultation"}

${calendlyUrl
  ? `You can confirm your slot here: ${calendlyUrl}`
  : "I'll reach out within 24 hours to confirm a time that works for both of us."
}

Looking forward to speaking with you!

Best,
Aayush
  `.trim();
}

function buildOwnerNotification({ name, email, datetime, timezone, topic }) {
  return `
New consultation request:

Name:     ${name || "Not provided"}
Email:    ${email}
Time:     ${datetime ? new Date(datetime).toLocaleString() : "Not specified"}
Timezone: ${timezone || "Not specified"}
Topic:    ${topic || "Not specified"}
  `.trim();
}