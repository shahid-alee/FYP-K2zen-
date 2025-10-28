// routes/bookingRoutes.js
import express from "express";
import Booking from "../models/packageBooking.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Create booking
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      packageId,
      packageName,
      packagePrice,
      packageDays,
      destinationName,
      bookingDate,
    } = req.body;

    const user = req.user; // from token

    const newBooking = new Booking({
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      userContact: req.body.userContact || "",
      packageId,
      packageName,
      packagePrice,
      packageDays,
      destinationName,
      bookingDate,
    });

    await newBooking.save();
    res.status(201).json({ message: "Booking successful!", booking: newBooking });
  } catch (error) {
    res.status(500).json({ message: "Booking failed", error: error.message });
  }
});

// ✅ Get all bookings (for dashboard)
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error: error.message });
  }
});

export default router;
