import express from "express";
import HotelBooking from "../models/hotelBooking.js";

const router = express.Router();

// ✅ Add new hotel booking
router.post("/hotels", async (req, res) => {
  try {
    const booking = new HotelBooking(req.body);
    await booking.save();
    res.status(201).json({ message: "Booking saved successfully", booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Get all hotel bookings
router.get("/hotels", async (req, res) => {
  try {
    const bookings = await HotelBooking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Delete booking
router.delete("/hotels/:id", async (req, res) => {
  try {
    await HotelBooking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
