// server/ai/tools.js
// Declares every tool the agent can use as OpenAI function-calling schemas.
// The LLM reads these descriptions to decide when and how to call each tool.
// Tool EXECUTION lives in toolExecutor.js — this file is pure schema.

export const TOOL_DEFINITIONS = [
  {
    type: "function",
    function: {
      name: "searchPortfolio",
      description:
        "Search the portfolio knowledge base for information about Aayush's skills, projects, services, pricing, experience, and background. Call this before answering any factual question about the portfolio to avoid hallucination.",
      parameters: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description:
              "The natural language query to search the knowledge base with.",
          },
        },
        required: ["query"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "saveLead",
      description:
        "Save a qualified lead to the database after collecting all required information. Only call this when you have: name, email, projectType, budget, and timeline. Do NOT call prematurely.",
      parameters: {
        type: "object",
        properties: {
          name: { type: "string", description: "Full name of the lead." },
          email: {
            type: "string",
            description: "Email address of the lead.",
          },
          projectType: {
            type: "string",
            description: "Type of project they need (e.g. MERN app, landing page).",
          },
          budget: {
            type: "string",
            description: "Their stated budget or budget range.",
          },
          timeline: {
            type: "string",
            description: "Their desired project timeline or deadline.",
          },
          requirements: {
            type: "string",
            description: "Additional project requirements or notes.",
          },
        },
        required: ["email", "projectType"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "sendEmail",
      description:
        "Send an email to the user. Use for: sending proposals, consultation confirmations, follow-up emails, or sharing resources.",
      parameters: {
        type: "object",
        properties: {
          to: { type: "string", description: "Recipient email address." },
          subject: { type: "string", description: "Email subject line." },
          body: {
            type: "string",
            description:
              "Full email body in plain text or simple HTML. Be professional and helpful.",
          },
          type: {
            type: "string",
            enum: ["proposal", "confirmation", "followup", "general"],
            description: "Category of the email being sent.",
          },
        },
        required: ["to", "subject", "body"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "generateProposal",
      description:
        "Generate a professional project proposal based on the user's requirements. Returns proposal content that should then be emailed to the user.",
      parameters: {
        type: "object",
        properties: {
          clientName: { type: "string" },
          email: { type: "string" },
          projectType: { type: "string" },
          requirements: { type: "string" },
          budget: { type: "string" },
          timeline: { type: "string" },
        },
        required: ["projectType", "requirements"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "getAvailability",
      description:
        "Get Aayush's available consultation slots. Call this when the user asks to book a meeting, schedule a call, or check availability.",
      parameters: {
        type: "object",
        properties: {},
        required: [],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "createMeeting",
      description:
        "Book a consultation meeting after the user has confirmed a time slot. Saves the meeting and sends a confirmation email.",
      parameters: {
        type: "object",
        properties: {
          name: { type: "string" },
          email: { type: "string", description: "User's email address." },
          datetime: {
            type: "string",
            description:
              "Requested meeting datetime as ISO 8601 string or human-readable string.",
          },
          timezone: { type: "string", description: "User's timezone." },
          topic: {
            type: "string",
            description: "Brief description of what they want to discuss.",
          },
        },
        required: ["email"],
      },
    },
  },
];

// Fast lookup by name for the executor
export const TOOL_MAP = Object.fromEntries(
  TOOL_DEFINITIONS.map((t) => [t.function.name, t])
);

// Names only — useful for allowlist checks
export const ALLOWED_TOOL_NAMES = new Set(
  TOOL_DEFINITIONS.map((t) => t.function.name)
);