// server/services/lead.service.js
// Handles lead persistence and notification.

import { Lead } from "../models/Lead.js";
import { emailService } from "./email.service.js";
import { env } from "../config/env.js";

export const leadService = {
  /**
   * Save a new lead or update an existing one for the session.
   * Also notifies the owner by email.
   */
  async saveLead(data) {
    const { sessionId, email, ...rest } = data;

    if (!email) throw new Error("Email is required to save a lead.");

    // Calculate a basic qualification score
    const score = calcQualificationScore(data);

    const lead = await Lead.findOneAndUpdate(
      { sessionId, email: email.toLowerCase() },
      {
        $set: {
          ...rest,
          email: email.toLowerCase(),
          sessionId,
          qualified: score >= 50,
          qualificationScore: score,
        },
      },
      { upsert: true, new: true, runValidators: true }
    );

    console.log(`[LeadService] Lead saved: ${email} (score: ${score})`);

    // Notify owner
    try {
      await emailService.send({
        to: env.ownerEmail,
        subject: `🎯 New Lead: ${rest.projectType || "Unknown Project"} — ${email}`,
        body: formatLeadEmail(lead),
        type: "general",
      });
    } catch (err) {
      console.error("[LeadService] Owner notification failed:", err.message);
    }

    return { success: true, leadId: lead._id.toString() };
  },

  async getLeadBySession(sessionId) {
    return Lead.findOne({ sessionId }).sort({ createdAt: -1 });
  },
};

function calcQualificationScore(data) {
  let score = 0;
  if (data.email) score += 25;
  if (data.projectType) score += 20;
  if (data.budget) score += 25;
  if (data.timeline) score += 15;
  if (data.name) score += 10;
  if (data.requirements && data.requirements.length > 20) score += 5;
  return Math.min(score, 100);
}

function formatLeadEmail(lead) {
  return `
New lead from portfolio chatbot:

Name:         ${lead.name || "Not provided"}
Email:        ${lead.email}
Project Type: ${lead.projectType || "Not provided"}
Budget:       ${lead.budget || "Not provided"}
Timeline:     ${lead.timeline || "Not provided"}
Requirements: ${lead.requirements || "Not provided"}
Score:        ${lead.qualificationScore}/100
Qualified:    ${lead.qualified ? "Yes ✓" : "No"}
Session:      ${lead.sessionId}
Date:         ${new Date().toLocaleString()}
  `.trim();
}