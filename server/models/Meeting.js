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
      required: true,
    },

    timezone: {
      type: String,
      default: "Asia/Kolkata",
    },

    topic: String,

    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "confirmed",
    },

    joinUrl: String,

    // 🔥 ADD THESE (FIX)
    slotKey: {
      type: String,
      required: true,
      index: true,
    },

    dedupeKey: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export const Meeting = mongoose.model("Meeting", meetingSchema);