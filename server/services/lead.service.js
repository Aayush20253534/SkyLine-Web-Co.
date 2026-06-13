import { Lead } from "../models/Lead.js";
import { emailService } from "./email.service.js";
import { env } from "../config/env.js";

export const leadService = {
  async saveLead(data) {
    const { sessionId, email, ...rest } = data;

    if (!sessionId) {
      throw new Error("Session ID is required to save a lead.");
    }

    if (!email) {
      throw new Error("Email is required to save a lead.");
    }

    const normalizedEmail = email.toLowerCase().trim();
    const projectType = rest.projectType?.trim();

    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
      throw new Error("Invalid email address.");
    }

    if (!projectType || projectType.length < 3) {
      throw new Error("Project type is required to save a lead.");
    }

    if (
      normalizedEmail === "example@example.com" ||
      projectType.toLowerCase() === "example project"
    ) {
      throw new Error("Dummy lead rejected.");
    }

    const score = calcQualificationScore({
      ...data,
      email: normalizedEmail,
      projectType,
    });

    const lead = await Lead.findOneAndUpdate(
      {
        sessionId,
        email: normalizedEmail,
      },
      {
        $set: {
          ...rest,
          email: normalizedEmail,
          projectType,
          sessionId,
          qualified: score >= 50,
          qualificationScore: score,
        },
      },
      {
        upsert: true,
        returnDocument: "after",
        runValidators: true,
      }
    );

    console.log(`[LeadService] Lead saved: ${normalizedEmail} (score: ${score})`);

    try {
      await emailService.send({
        to: env.ownerEmail,
        subject: `🎯 New Lead: ${projectType} — ${normalizedEmail}`,
        body: formatLeadEmail(lead),
        type: "general",
      });
    } catch (err) {
      console.error("[LeadService] Owner notification failed:", err.message);
    }

    return {
      success: true,
      leadId: lead._id.toString(),
    };
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