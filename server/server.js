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

const allowedOrigins = [
  "https://skyline-web-co.com",
  "https://www.skyline-web-co.com",
  "https://skyline-web-co.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000",
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.warn(`🚫 CORS blocked: ${origin}`);
      return callback(null, false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "X-Session-Id",
    ],
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

app.use("/api/contact", contactRoutes);
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
  console.error("===========================");

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ─────────────────────────────────────────────
// Server Startup
// ─────────────────────────────────────────────

const startServer = async () => {
  try {
    await connectDB();
    await initRAG();

    const PORT =
      process.env.PORT ||
      env?.port ||
      5000;

    app.listen(PORT, () => {
      console.log("=================================");
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(
        `🌍 Environment: ${
          process.env.NODE_ENV || "development"
        }`
      );
      console.log("🗄️ MongoDB Connected");
      console.log("🤖 AI Agent Initialized");
      console.log("📚 RAG Knowledge Loaded");
      console.log("=================================");
    });
  } catch (error) {
    console.error("❌ Startup Error:", error);
    process.exit(1);
  }
};

startServer();