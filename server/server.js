// server/server.js

import "dotenv/config";
import "./config/env.js";

import express from "express";
import cors from "cors";
import helmet from "helmet";

import connectDB from "./config/db.js";

// routes
import contactRoutes from "./routes/contact.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import meetingRoutes from "./routes/meeting.routes.js";

import { validateEnv, env } from "./config/env.js";
import { initRAG } from "./ai/rag.js";

// validate env
validateEnv();

const app = express();

/* ─────────────────────────────────────────────
   SECURITY
──────────────────────────────────────────── */

app.use(helmet());

const allowedOrigins = new Set([
  "https://skyline-web-co.com",
  "https://www.skyline-web-co.com",
  "https://skyline-web-co.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000",
]);

app.use(
  cors({
    origin(origin, callback) {
      // allow server-to-server / mobile apps
      if (!origin) return callback(null, true);

      if (allowedOrigins.has(origin)) {
        return callback(null, true);
      }

      console.warn(`🚫 CORS blocked: ${origin}`);
      return callback(new Error("Not allowed by CORS"));
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

/* ─────────────────────────────────────────────
   BODY PARSING
──────────────────────────────────────────── */

app.use(express.json({ limit: "64kb" }));
app.use(express.urlencoded({ extended: true }));

/* ─────────────────────────────────────────────
   BASE ROUTES
──────────────────────────────────────────── */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API Running",
  });
});

app.get("/health", (req, res) => {
  res.json({
    success: true,
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

/* ─────────────────────────────────────────────
   API ROUTES
──────────────────────────────────────────── */

app.use("/api/contact", contactRoutes);
app.use("/api/chat", chatRoutes);

/**
 * 🧠 Meeting system (Jitsi redirect)
 * GET /meet/:id
 */
app.use("/meet", meetingRoutes);

/* ─────────────────────────────────────────────
   404 HANDLER
──────────────────────────────────────────── */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* ─────────────────────────────────────────────
   ERROR HANDLER
──────────────────────────────────────────── */

app.use((err, req, res, next) => {
  console.error("========== ERROR ==========");
  console.error(err);
  console.error("===========================");

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

/* ─────────────────────────────────────────────
   SERVER START
──────────────────────────────────────────── */

const startServer = async () => {
  try {
    await connectDB();
    await initRAG();

    const PORT = process.env.PORT || env?.port || 5000;

    app.listen(PORT, () => {
      console.log("=================================");
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
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