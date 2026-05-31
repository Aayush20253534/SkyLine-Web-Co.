// server/models/Lead.js
// Stores qualified leads collected by the agent during conversations.

import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      index: true,
    },
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email address"],
    },
    projectType: {
      type: String,
      trim: true,
    },
    budget: {
      type: String,
      trim: true,
    },
    timeline: {
      type: String,
      trim: true,
    },
    requirements: {
      type: String,
      trim: true,
    },
    source: {
      type: String,
      default: "chatbot",
    },
    qualified: {
      type: Boolean,
      default: false,
    },
    // Agent-assigned qualification score 0-100
    qualificationScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    rawData: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate leads per session
leadSchema.index({ sessionId: 1, email: 1 }, { unique: true });

export const Lead = mongoose.model("Lead", leadSchema);