import crypto from "crypto";

import { ALLOWED_TOOL_NAMES } from "./tools.js";
import { leadService } from "../services/lead.service.js";
import { emailService } from "../services/email.service.js";
import { proposalService } from "../services/proposal.service.js";
import { meetingService } from "../services/meeting.service.js";
import { ragSearch } from "./rag.js";

export async function executeTool(toolName, args, context = {}) {
  if (!ALLOWED_TOOL_NAMES.has(toolName)) {
    console.warn(`[ToolExecutor] Blocked unknown tool: ${toolName}`);

    return {
      success: false,
      result: null,
      error: `Tool "${toolName}" is not registered.`,
    };
  }

  const sanitizedArgs = sanitizeArgs(args);
  const sessionId = context?.sessionId || crypto.randomUUID();
  const session = context?.session;

  console.log("🧠 SESSION:", sessionId);
  console.log("🔥 TOOL EXECUTED:", toolName);
  console.log("📦 TOOL ARGS:", sanitizedArgs);

  try {
    let result;

    switch (toolName) {
      case "searchPortfolio": {
        result = await ragSearch(sanitizedArgs.query || "");
        break;
      }

      case "saveLead": {
        result = await leadService.saveLead({
          ...sanitizedArgs,
          sessionId,
        });
        break;
      }

      case "sendEmail": {
        const emailKey = createEmailKey(sanitizedArgs);

        const alreadySent = session?.toolHistory?.some((tool) => {
          if (tool.toolName !== "sendEmail") return false;
          if (tool.success !== true) return false;

          return createEmailKey(tool.input || {}) === emailKey;
        });

        if (alreadySent) {
          console.warn("[Email] Duplicate blocked:", sanitizedArgs.to);

          return {
            success: true,
            skipped: true,
            result: {
              success: true,
              skipped: true,
              message: "Duplicate email blocked.",
            },
          };
        }

        result = await emailService.send(sanitizedArgs);
        break;
      }

      case "generateProposal": {
        result = await proposalService.generate(sanitizedArgs);
        break;
      }

      case "getAvailability": {
        result = await meetingService.getAvailability();
        break;
      }

      case "createMeeting": {
        console.log("🚀 Calling meeting service...");

        const meetingResult = await meetingService.createMeeting({
          ...sanitizedArgs,
          sessionId,
        });

        result = meetingResult;

        if (meetingResult?.success === false) {
          return {
            success: false,
            result: meetingResult,
            error: meetingResult.message || "Unknown meeting error",
          };
        }

        break;
      }

      default: {
        throw new Error(`Unhandled tool: ${toolName}`);
      }
    }

    console.log(`✅ Tool completed: ${toolName}`);

    return {
      success: true,
      skipped: false,
      result,
    };
  } catch (err) {
    console.error(`[ToolExecutor] Error in ${toolName}:`, err);

    return {
      success: false,
      skipped: false,
      result: null,
      error: err?.message || "Unknown tool execution error",
    };
  }
}

function createEmailKey(args) {
  return JSON.stringify({
    to: normalize(args.to),
    subject: normalize(args.subject),
    body: normalize(args.body),
  });
}

function normalize(value) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function sanitizeArgs(args) {
  if (!args || typeof args !== "object") return {};

  const sanitized = {};

  for (const [key, value] of Object.entries(args)) {
    if (typeof value === "string") {
      sanitized[key] = value
        .replace(/\bignore\b.{0,40}\binstructions?\b/gi, "[removed]")
        .replace(/<\|.*?\|>/g, "")
        .replace(/```[\s\S]*?```/g, "[code removed]")
        .trim()
        .slice(0, 2000);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
}