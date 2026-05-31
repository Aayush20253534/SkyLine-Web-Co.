import nodemailer from "nodemailer";

console.log("SMTP_HOST:", process.env.SMTP_HOST);
console.log("SMTP_PORT:", process.env.SMTP_PORT);
console.log("SMTP_USER:", process.env.SMTP_USER);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendContactMail = async ({
  name,
  email,
  message,
}) => {
  try {
    console.log("Verifying SMTP connection...");

    await transporter.verify();

    console.log("SMTP verified successfully");

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_RECEIVER,
      subject: `New Contact Request from ${name}`,
      html: `
        <div style="font-family:Arial,sans-serif">
          <h2>New Project Inquiry</h2>

          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>

          <p><strong>Message:</strong></p>

          <div style="padding:12px;background:#f4f4f4">
            ${message}
          </div>
        </div>
      `,
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.error("MAIL ERROR:");
    console.error(error);

    throw error;
  }
};