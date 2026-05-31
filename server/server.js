// server/server.js

import "dotenv/config";
import "./config/env.js";

import express from "express";
import cors from "cors";
import helmet from "helmet";

import connectDB from "./config/db.js";

import contactRoutes from "./routes/contact.routes.js";
import chatRoutes from "./routes/chat.routes.js";

import { validateEnv, env } from "./config/env.js";
import { initRAG } from "./ai/rag.js";

// Validate environment variables
validateEnv();

const app = express();

// ─────────────────────────────────────────────
// Security Middleware
// ─────────────────────────────────────────────

app.use(helmet());

app.use(
  cors({
    origin: env?.isProd
      ? [process.env.CLIENT_URL]
      : true,
    credentials: true,
  })
);

// ─────────────────────────────────────────────
// Body Parsers
// ─────────────────────────────────────────────

app.use(express.json({ limit: "64kb" }));
app.use(express.urlencoded({ extended: true }));

// ─────────────────────────────────────────────
// Health Routes
// ─────────────────────────────────────────────

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API Running",
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

// ─────────────────────────────────────────────
// API Routes
// ─────────────────────────────────────────────

// Existing Contact Form
app.use("/api/contact", contactRoutes);

// AI Chat Agent
app.use("/api/chat", chatRoutes);

// ─────────────────────────────────────────────
// 404 Handler
// ─────────────────────────────────────────────

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ─────────────────────────────────────────────
// Global Error Handler
// ─────────────────────────────────────────────

app.use((err, req, res, next) => {
  console.error("========== ERROR ==========");
  console.error(err);
  console.error(err.stack);
  console.error("===========================");

  res.status(err.status || 500).json({
    success: false,
    message: err.message,
  });
});
// ─────────────────────────────────────────────
// Server Startup
// ─────────────────────────────────────────────

const startServer = async () => {
  try {
    // Connect MongoDB
    await connectDB();

    // Initialize AI Knowledge Base
    await initRAG();

    const PORT =
      process.env.PORT ||
      env?.port ||
      5000;

    app.listen(PORT, () => {
      console.log("=================================");
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(`🗄️ MongoDB Connected`);
      console.log(`🤖 AI Agent Initialized`);
      console.log(`📚 RAG Knowledge Loaded`);
      console.log("=================================");
    });
  } catch (error) {
    console.error("❌ Startup Error:", error);
    process.exit(1);
  }
};

startServer();