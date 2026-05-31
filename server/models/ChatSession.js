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
    toolName: String,
    toolCallId: String,
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

// ✅ FIXED: no broken next() dependency
chatSessionSchema.pre("save", function () {
  this.lastActiveAt = new Date();
});

// TTL index
chatSessionSchema.index(
  { lastActiveAt: 1 },
  { expireAfterSeconds: 86400 }
);

export const ChatSession = mongoose.model(
  "ChatSession",
  chatSessionSchema
);