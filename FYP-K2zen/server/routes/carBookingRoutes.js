// server/routes/carBookingRoutes.js
import express from "express";
import CarBooking from "../models/carBooking.js";
import RentCar from "../models/rentCar.js";
import sendEmail from "../utils/sendEmail.js";

const router = express.Router();

// ✅ Check date overlap
function isOverlap(aStart, aEnd, bStart, bEnd) {
  return aStart <= bEnd && bStart <= aEnd;
}

/* ✅ Create Booking */
router.post("/", async (req, res) => {
  try {
    const {
      carId, userName, email, contact,
      startDate, endDate, totalDays, totalPrice,
      carName, modelYear, image
    } = req.body;

    if (!carId || !startDate || !endDate || !userName || !email) {
      return res.status(400).json({ success: false, msg: "Missing required fields" });
    }

    const s = new Date(startDate);
    const e = new Date(endDate);
    if (s >= e)
      return res.status(400).json({ success: false, msg: "Invalid date selection" });

    const conflict = await CarBooking.find({
      carId,
      status: "Booked",
      $or: [{ startDate: { $lte: e }, endDate: { $gte: s } }]
    });

    if (conflict.length > 0) {
      return res.status(400).json({ success: false, msg: "Car already booked for selected dates" });
    }

    const booking = await CarBooking.create({
      userName, email, contact, carId,
      carName, modelYear, image,
      startDate: s, endDate: e, totalDays, totalPrice,
      status: "Pending"
    });

    res.status(201).json({ success: true, msg: "Booking submitted ✅", booking });

  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
});

/* ✅ Get All Bookings */
router.get("/", async (req, res) => {
  try {
    const bookings = await CarBooking.find().sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
});

/* ✅ Approve Booking */
router.put("/approve/:id", async (req, res) => {
  try {
    const booking = await CarBooking.findById(req.params.id);
    if (!booking) return res.status(404).json({ msg: "Booking not found" });

    booking.status = "Booked";
    await booking.save();

    try {
      await sendEmail({
        to: booking.email,
        subject: `Booking Confirmed ✅ — ${booking.carName}`,
        html: `
          <h2>Booking Confirmed ✅</h2>
          <p>Dear ${booking.userName},</p>
          <p>Your booking for <b>${booking.carName}</b> is approved.</p>
          <p><b>From:</b> ${new Date(booking.startDate).toLocaleDateString()}</p>
          <p><b>To:</b> ${new Date(booking.endDate).toLocaleDateString()}</p>
          <p>Total Price: PKR ${booking.totalPrice}</p>
        `
      });
    } catch (emailError) {
      console.error("📧 Email Failed:", emailError.message);
    }

    res.json({ msg: "Booking Approved ✅ Email Sent", booking });

  } catch (err) {
    console.error("❌ Approve Error:", err);
    res.status(500).json({ msg: err.message });
  }
});

/* ✅ Reject Booking */
router.put("/reject/:id", async (req, res) => {
  try {
    const { reason } = req.body;
    const booking = await CarBooking.findById(req.params.id);
    if (!booking) return res.status(404).json({ msg: "Booking not found" });

    booking.status = "Rejected";
    booking.rejectionReason = reason || "No reason provided";
    await booking.save();

    try {
      await sendEmail({
        to: booking.email,
        subject: `Booking Rejected ❌ — ${booking.carName}`,
        html: `
          <h3>Booking Rejected ❌</h3>
          <p>Dear ${booking.userName},</p>
          <p>Your booking request could not be approved.</p>
          <p><b>Reason:</b> ${reason}</p>
        `
      });
    } catch (emailErr) {
      console.error("📧 Email Failed:", emailErr.message);
    }

    res.json({ msg: "Booking Rejected ❌ Email Sent", booking });

  } catch (err) {
    console.error("❌ Reject Error:", err);
    res.status(500).json({ msg: err.message });
  }
});

/* ✅ Delete Booking */
router.delete("/delete/:id", async (req, res) => {
  try {
    const booking = await CarBooking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ success: false, msg: "Booking not found" });

    res.json({ success: true, msg: "Booking deleted ✅" });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
});

// ✅ Export as default for ES Modules
export default router;
