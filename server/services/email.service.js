// server/services/email.service.js

import { Resend } from "resend";
import { env } from "../config/env.js";

const resend = new Resend(env.resend.apiKey);

export const emailService = {
  /**
   * Send email using Resend
   *
   * @param {Object} params
   * @param {string|string[]} params.to
   * @param {string} params.subject
   * @param {string} params.body
   * @param {string} [params.type]
   * @param {string} [params.replyTo]
   */
  async send({
    to,
    subject,
    body,
    type = "general",
    replyTo,
  }) {
    if (!to || !subject || !body) {
      throw new Error(
        "Missing required email fields: to, subject, body"
      );
    }

    const isHtml =
      typeof body === "string" &&
      body.trimStart().startsWith("<");

    console.log(
      "EMAIL_FROM =",
      process.env.EMAIL_FROM
    );

    try {
      const { data, error } =
        await resend.emails.send({
          from: process.env.EMAIL_FROM,

          to: Array.isArray(to)
            ? to
            : [to],

          subject,

          ...(isHtml
            ? { html: body }
            : { text: body }),

          ...(replyTo
            ? { replyTo }
            : {}),
        });

      if (error) {
        console.error(
          "[Email] Resend Error:",
          error
        );

        throw new Error(
          error.message ||
            "Failed to send email"
        );
      }

      console.log(
        `[Email] Sent (${type}) to ${
          Array.isArray(to)
            ? to.join(", ")
            : to
        }`
      );

      console.log(
        "[Email] Message ID:",
        data?.id
      );

      return {
        success: true,
        id: data?.id,
      };
    } catch (err) {
      console.error(
        "[Email] Send Failed:",
        err.message
      );

      throw err;
    }
  },
};