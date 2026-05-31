// server/services/proposal.service.js
// Generates professional project proposals using the LLM.
// The generated proposal is returned as HTML/text for emailing.

import { chatCompletion, extractContent } from "../ai/llmClient.js";

const PROPOSAL_SYSTEM_PROMPT = `You are a professional proposal writer for a senior full-stack developer named Aayush.
Generate a professional, detailed project proposal in clean HTML format.

The proposal should include:
1. Executive Summary
2. Project Understanding (based on their requirements)
3. Proposed Solution & Approach
4. Tech Stack Recommendation
5. Project Timeline with phases
6. Investment (pricing estimate based on scope)
7. What's Included
8. Next Steps

Style: Professional, warm, confident. Use clean HTML with inline styles (no external CSS).
Keep it concise but thorough. Focus on value delivery, not buzzwords.`;

export const proposalService = {
  /**
   * Generate a project proposal using the LLM.
   *
   * @param {Object} params
   * @returns {Promise<{ html: string, text: string }>}
   */
  async generate({ clientName, email, projectType, requirements, budget, timeline }) {
    if (!projectType || !requirements) {
      throw new Error("projectType and requirements are needed to generate a proposal.");
    }

    const userPrompt = `
Generate a project proposal for:

Client: ${clientName || "Valued Client"}
Email: ${email || "Not provided"}
Project Type: ${projectType}
Requirements: ${requirements}
Budget: ${budget || "To be discussed"}
Timeline: ${timeline || "To be discussed"}
    `.trim();

    const response = await chatCompletion({
      messages: [
        { role: "system", content: PROPOSAL_SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      tools: undefined,
      maxTokens: 2000,
      temperature: 0.5,
    });

    const html = extractContent(response);

    return {
      success: true,
      html,
      summary: `Proposal generated for ${projectType} project${clientName ? ` for ${clientName}` : ""}.`,
    };
  },
};