// server/services/meeting.service.js

import { parseDate } from "chrono-node";
import { Meeting } from "../models/Meeting.js";
import { emailService } from "./email.service.js";
import { env } from "../config/env.js";

export const meetingService = {
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

      note:
        "For urgent projects, weekend slots may be available on request.",
    };
  },

  async createMeeting({
  sessionId,
  name,
  email,
  datetime,
  timezone,
  topic,
}) {
  console.log("🔥 CREATE MEETING CALLED");

  console.log({
    sessionId,
    name,
    email,
    datetime,
    timezone,
    topic,
  });

  if (!email) {
    throw new Error("Email is required to create a meeting.");
  }

  let parsedDate = null;

  if (datetime) {
    try {
      parsedDate = parseDate(datetime);

      if (
        parsedDate &&
        Number.isNaN(parsedDate.getTime())
      ) {
        parsedDate = null;
      }
    } catch (err) {
      console.error(
        "Date parse error:",
        err.message
      );

      parsedDate = null;
    }
  }

  // Prevent duplicate meetings within 5 minutes
  const existingMeeting = await Meeting.findOne({
    sessionId,
    email: email.toLowerCase(),
    createdAt: {
      $gte: new Date(Date.now() - 5 * 60 * 1000),
    },
  });

  if (existingMeeting) {
    console.log(
      "⚠️ Duplicate meeting prevented"
    );

    return {
      success: true,
      meetingId:
        existingMeeting._id.toString(),
      scheduledFor:
        existingMeeting.datetime,
      message:
        "Meeting already exists.",
    };
  }

  console.log("📦 Creating meeting...");

  const meeting = await Meeting.create({
    sessionId,
    name: name || null,
    email: email.toLowerCase(),
    datetime: parsedDate,
    timezone: timezone || "Asia/Kolkata",
    topic:
      topic || "General Consultation",
    status: "pending",
    calendlyUrl:
      env.calendlyUrl || null,
  });

  console.log(
    "✅ Meeting saved:",
    meeting._id.toString()
  );

  // User Email
  try {
    await emailService.send({
      to: email,
      subject:
        "📅 Consultation Request Received — Aayush",

      body: buildUserConfirmation({
        name,
        datetime: parsedDate,
        topic,
        calendlyUrl:
          env.calendlyUrl,
      }),

      type: "confirmation",
    });

    console.log(
      "✅ User email sent"
    );
  } catch (err) {
    console.error(
      "❌ User email failed:",
      err.message
    );
  }

  // Owner Email
  if (env.ownerEmail) {
    try {
      await emailService.send({
        to: env.ownerEmail,

        subject: `📅 New Meeting Request: ${
          name || email
        }`,

        body: buildOwnerNotification({
          name,
          email,
          datetime: parsedDate,
          timezone,
          topic,
        }),

        type: "general",
      });

      console.log(
        "✅ Owner email sent"
      );
    } catch (err) {
      console.error(
        "❌ Owner email failed:",
        err.message
      );
    }
  }

  meeting.confirmationSent = true;

  await meeting.save();

  return {
    success: true,
    meetingId:
      meeting._id.toString(),
    scheduledFor: parsedDate,

    message: env.calendlyUrl
      ? `Meeting request recorded. Please confirm your slot here: ${env.calendlyUrl}`
      : "Meeting request saved successfully.",
  };
}
};

function buildUserConfirmation({
  name,
  datetime,
  topic,
  calendlyUrl,
}) {
  const greeting = name
    ? `Hi ${name},`
    : "Hi there,";

  const timeStr = datetime
    ? `Requested Time: ${datetime.toLocaleString()}`
    : "Requested Time: To be confirmed";

  return `
${greeting}

Thank you for your consultation request.

${timeStr}

Topic:
${topic || "General consultation"}

${
  calendlyUrl
    ? `Please confirm your slot here:\n${calendlyUrl}`
    : "Aayush will contact you shortly to confirm a suitable time."
}

Best Regards,
Aayush
`.trim();
}

function buildOwnerNotification({
  name,
  email,
  datetime,
  timezone,
  topic,
}) {
  return `
New Consultation Request

Name:
${name || "Not Provided"}

Email:
${email}

Requested Time:
${
  datetime
    ? datetime.toLocaleString()
    : "Not Provided"
}

Timezone:
${timezone || "Not Provided"}

Topic:
${topic || "Not Provided"}
`.trim();
}