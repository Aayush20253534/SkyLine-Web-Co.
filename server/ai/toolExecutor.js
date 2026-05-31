// server/ai/toolExecutor.js
// Single execution gate for all tool calls.
// Every tool invocation — regardless of which the LLM chose — passes through here.
// Responsibilities: allowlist check, input sanitization, error isolation, result logging.

import { ALLOWED_TOOL_NAMES } from "./tools.js";
import { leadService } from "../services/lead.service.js";
import { emailService } from "../services/email.service.js";
import { proposalService } from "../services/proposal.service.js";
import { meetingService } from "../services/meeting.service.js";
import { ragSearch } from "./rag.js";

/**
 * Execute a single tool call requested by the LLM.
 *
 * @param {string}  toolName  - Name of the tool to run
 * @param {Object}  args      - Parsed arguments from LLM
 * @param {Object}  context   - { sessionId, session }
 * @returns {Promise<{ success: boolean, result: any, error?: string }>}
 */
export async function executeTool(toolName, args, context) {
  // ── Security: allowlist check ───────────────────────────────────────────
  if (!ALLOWED_TOOL_NAMES.has(toolName)) {
    console.warn(`[ToolExecutor] Blocked unknown tool: "${toolName}"`);
    return {
      success: false,
      result: null,
      error: `Tool "${toolName}" is not registered.`,
    };
  }

  // ── Security: sanitize string args (basic prompt injection defense) ─────
  const sanitizedArgs = sanitizeArgs(args);

  console.log(`[ToolExecutor] Executing: ${toolName}`, sanitizedArgs);

  try {
    let result;

    switch (toolName) {
      case "searchPortfolio":
        result = await ragSearch(sanitizedArgs.query);
        break;

      case "saveLead":
        result = await leadService.saveLead({
          ...sanitizedArgs,
          sessionId: context.sessionId,
        });
        break;

      case "sendEmail":
        result = await emailService.send(sanitizedArgs);
        break;

      case "generateProposal":
        result = await proposalService.generate(sanitizedArgs);
        break;

      case "getAvailability":
        result = await meetingService.getAvailability();
        break;

      case "createMeeting":
        result = await meetingService.createMeeting({
          ...sanitizedArgs,
          sessionId: context.sessionId,
        });
        break;

      default:
        throw new Error(`Unhandled tool: ${toolName}`);
    }

    return { success: true, result };
  } catch (err) {
    console.error(`[ToolExecutor] Error in ${toolName}:`, err.message);
    return {
      success: false,
      result: null,
      error: err.message,
    };
  }
}

/**
 * Sanitize all string values in args to prevent prompt injection
 * from user-controlled input leaking into tool arguments.
 */
function sanitizeArgs(args) {
  if (!args || typeof args !== "object") return {};

  const sanitized = {};
  for (const [key, value] of Object.entries(args)) {
    if (typeof value === "string") {
      // Strip common prompt injection patterns
      sanitized[key] = value
        .replace(/\bignore\b.{0,40}\binstructions?\b/gi, "[removed]")
        .replace(/<\|.*?\|>/g, "")
        .replace(/```[\s\S]*?```/g, "[code block removed]")
        .trim()
        .slice(0, 2000); // hard length cap per field
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized;
}