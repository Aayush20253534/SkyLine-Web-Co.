import Contact from "../models/Contact.js";
import { sendContactMail } from "../services/mail.service.js";

export const submitContact = async (req, res) => {
  try {
    console.log("1. Request received");

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    console.log("2. Saving to MongoDB");

    const contact = await Contact.create({
      name,
      email,
      message,
    });

    console.log("3. Saved to MongoDB");

    console.log("4. Sending mail");

    await sendContactMail({
      name,
      email,
      message,
    });

    console.log("5. Mail sent");

    res.status(201).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    console.error("CONTROLLER ERROR:");
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};