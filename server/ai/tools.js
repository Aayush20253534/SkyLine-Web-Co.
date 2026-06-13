export const TOOL_DEFINITIONS = [
  {
    type: "function",
    function: {
      name: "sendEmail",
      description: "Send an email to a user.",
      parameters: {
        type: "object",
        properties: {
          to: {
            type: "string",
          },
          subject: {
            type: "string",
          },
          body: {
            type: "string",
          },
          type: {
            type: "string",
            enum: ["proposal", "confirmation", "followup", "general"],
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
      description: "Generate a professional proposal.",
      parameters: {
        type: "object",
        properties: {
          clientName: {
            type: "string",
          },
          email: {
            type: "string",
          },
          projectType: {
            type: "string",
          },
          requirements: {
            type: "string",
          },
          budget: {
            type: "string",
          },
          timeline: {
            type: "string",
          },
        },
        required: ["projectType", "requirements"],
      },
    },
  },

  {
    type: "function",
    function: {
      name: "getAvailability",
      description: "Get consultation availability and booking URL.",
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
        "Create and schedule a consultation meeting ONLY after the user explicitly confirms they want the meeting booked.",
      parameters: {
        type: "object",
        properties: {
          name: {
            type: "string",
          },
          email: {
            type: "string",
          },
          datetime: {
            type: "string",
          },
          timezone: {
            type: "string",
          },
          topic: {
            type: "string",
          },
        },
        required: ["email", "datetime"],
      },
    },
  },
];

export const TOOL_MAP = Object.fromEntries(
  TOOL_DEFINITIONS.map((tool) => [tool.function.name, tool])
);

export const ALLOWED_TOOL_NAMES = new Set(
  TOOL_DEFINITIONS.map((tool) => tool.function.name)
);