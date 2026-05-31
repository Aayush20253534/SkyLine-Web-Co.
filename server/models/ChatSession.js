// server/models/ChatSession.js
// Persists full conversation state including messages, extracted data, and tool history.
// This is the memory store for the agent.

import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["user", "assistant", "tool", "system"],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    // For tool messages: which tool was called
    toolName: String,
    toolCallId: String,
    // Token usage for cost tracking
    usage: {
      promptTokens: Number,
      completionTokens: Number,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const toolHistorySchema = new mongoose.Schema(
  {
    toolName: String,
    input: mongoose.Schema.Types.Mixed,
    output: mongoose.Schema.Types.Mixed,
    success: Boolean,
    executedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const chatSessionSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    messages: [messageSchema],
    // Structured data the agent has extracted so far in this session
    extractedData: {
      name: String,
      email: String,
      projectType: String,
      budget: String,
      timeline: String,
      requirements: String,
      intent: String,
    },
    toolHistory: [toolHistorySchema],
    // Tracks what stage the lead qualification is at
    qualificationStage: {
      type: String,
      enum: [
        "none",
        "collecting_project",
        "collecting_budget",
        "collecting_timeline",
        "collecting_email",
        "qualified",
      ],
      default: "none",
    },
    ipAddress: String,
    userAgent: String,
    leadSaved: { type: Boolean, default: false },
    lastActiveAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

// Auto-update lastActiveAt
chatSessionSchema.pre("save", function (next) {
  this.lastActiveAt = new Date();
  next();
});

// Expire inactive sessions after 24 hours
chatSessionSchema.index(
  { lastActiveAt: 1 },
  { expireAfterSeconds: 86400 }
);

export const ChatSession = mongoose.model("ChatSession", chatSessionSchema);