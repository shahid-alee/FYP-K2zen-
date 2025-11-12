// utils/sendEmail.js
import nodemailer from "nodemailer";

console.log("✅ ENV EMAIL:", process.env.EMAIL_USER);
console.log("✅ ENV PASS:", process.env.EMAIL_PASS ? "LOADED ✅" : "NOT LOADED ❌");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // ✅ Required for Gmail App Password
  auth: {
    user: process.env.EMAIL_USER || "ftr77477@gmail.com",
    pass: process.env.EMAIL_PASS || "clxlgsyjwneidlms",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendEmail = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER || "ftr77477@gmail.com",
      to,
      subject,
      html,
    });
    console.log("📩 Email sent successfully ✅");
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
  }
};

export default sendEmail;
