// server/ai/tools.js

export const TOOL_DEFINITIONS = [
  {
    type: "function",
    function: {
      name: "saveLead",
      description:
        "Save a qualified lead to the database after collecting all required information.",
      parameters: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Lead full name",
          },

          email: {
            type: "string",
            description: "Lead email",
          },

          projectType: {
            type: "string",
            description: "Project type",
          },

          budget: {
            type: "string",
            description: "Budget range",
          },

          timeline: {
            type: "string",
            description: "Expected timeline",
          },

          requirements: {
            type: "string",
            description: "Additional requirements",
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
        "Send an email to a user.",
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
            enum: [
              "proposal",
              "confirmation",
              "followup",
              "general",
            ],
          },
        },

        required: [
          "to",
          "subject",
          "body",
        ],
      },
    },
  },

  {
    type: "function",
    function: {
      name: "generateProposal",
      description:
        "Generate a professional proposal.",
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

        required: [
          "projectType",
          "requirements",
        ],
      },
    },
  },

  {
    type: "function",
    function: {
      name: "getAvailability",

      description:
        "Get consultation availability and booking URL.",

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
        "Create and schedule a consultation meeting ONLY after the user explicitly confirms they want the meeting booked. This saves the meeting, sends confirmation emails and returns booking information.",

      parameters: {
        type: "object",

        properties: {
          name: {
            type: "string",
            description:
              "User full name",
          },

          email: {
            type: "string",
            description:
              "User email address",
          },

          datetime: {
            type: "string",
            description:
              "Meeting date/time. Examples: 'tomorrow at 4pm', 'June 10 2026 2pm', '2026-06-10T14:00:00+05:45'",
          },

          timezone: {
            type: "string",
            description:
              "Timezone such as Asia/Kathmandu or UTC",
          },

          topic: {
            type: "string",
            description:
              "Meeting topic",
          },
        },

        required: [
          "email",
          "datetime",
        ],
      },
    },
  },
];

export const TOOL_MAP = Object.fromEntries(
  TOOL_DEFINITIONS.map((tool) => [
    tool.function.name,
    tool,
  ])
);

export const ALLOWED_TOOL_NAMES =
  new Set(
    TOOL_DEFINITIONS.map(
      (tool) => tool.function.name
    )
  );