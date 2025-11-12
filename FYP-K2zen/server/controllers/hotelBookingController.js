import HotelBooking from "../models/hotelBooking.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS
  }
});

const sendMail = async (email, subject, message) => {
  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject,
    html: message,
  });
};

// ✅ Approve Booking
export const approveHotelBooking = async (req, res) => {
  try {
    const booking = await HotelBooking.findByIdAndUpdate(
      req.params.id,
      { status: "Approved" },
      { new: true }
    );

    await sendMail(
      booking.email,
      "Hotel Booking Approved",
      `<p>Dear ${booking.name}, Your hotel booking has been approved! ✅</p>`
    );

    res.json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ❌ Reject Booking
export const rejectHotelBooking = async (req, res) => {
  try {
    const booking = await HotelBooking.findByIdAndUpdate(
      req.params.id,
      { status: "Rejected" },
      { new: true }
    );

    await sendMail(
      booking.email,
      "Hotel Booking Rejected",
      `<p>Sorry ${booking.name}, your booking request was rejected ❌</p>`
    );

    res.json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🗑 Delete Booking
export const deleteHotelBooking = async (req, res) => {
  try {
    await HotelBooking.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Booking Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get All Bookings
export const getHotelBookings = async (req, res) => {
  try {
    const bookings = await HotelBooking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
