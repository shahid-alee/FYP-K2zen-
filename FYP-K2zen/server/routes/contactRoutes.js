import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import Contact from "../models/contact.js";

dotenv.config();
const router = express.Router();

// ✅ Save Contact Message
router.post("/", async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({ message: "Message saved successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error saving message", error });
  }
});

// ✅ Get All Messages (Dashboard)
router.get("/", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages", error });
  }
});

// ✅ Reply to Message (Send Email)
router.post("/reply", async (req, res) => {
  const { to, subject, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Gmail
        pass: process.env.EMAIL_PASS, // App Password
      },
    });

    await transporter.sendMail({
      from: `"K2Zen Adventure" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: `
        <div style="font-family: Arial; color: #333;">
          <h3>Response from K2Zen Adventure 🌄</h3>
          <p>${message}</p>
          <hr />
          <small>This is an automated reply from K2Zen Adventure.</small>
        </div>
      `,
    });

    res.status(200).json({ message: "Reply email sent successfully!" });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.status(500).json({ message: "Failed to send reply", error });
  }
});

export default router;
