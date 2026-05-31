import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendContactMail = async ({
  name,
  email,
  message,
}) => {
  try {
    console.log("Sending email via Resend...");

    const data = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: process.env.CONTACT_RECEIVER,
      subject: `New Contact Request from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>New Project Inquiry</h2>

          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>

          <p><strong>Message:</strong></p>

          <div
            style="
              padding: 12px;
              background: #f4f4f4;
              border-radius: 8px;
            "
          >
            ${message}
          </div>
        </div>
      `,
    });

    console.log("Email sent successfully");
    console.log(data);

    return data;
  } catch (error) {
    console.error("MAIL ERROR:");
    console.error(error);
    throw error;
  }
};