// server/models/Meeting.js

import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      index: true,
    },
    name: String,
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    datetime: {
      type: Date,
    },
    timezone: {
      type: String,
      default: "Asia/Kolkata",
    },
    topic: String,
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
    calendlyUrl: String,
    confirmationSent: { type: Boolean, default: false },
    notes: String,
  },
  {
    timestamps: true,
  }
);

export const Meeting = mongoose.model("Meeting", meetingSchema);