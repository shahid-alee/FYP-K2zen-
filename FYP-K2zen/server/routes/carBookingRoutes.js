import express from "express";
import CarBooking from "../models/carBooking.js";

const router = express.Router();

// ✅ Create new booking
router.post("/", async (req, res) => {
  try {
    const booking = new CarBooking(req.body);
    await booking.save();
    res.status(201).json({ message: "Car booking created successfully", booking });
  } catch (error) {
    console.error("❌ Error creating booking:", error);
    res.status(400).json({ message: "Failed to create booking", error: error.message });
  }
});

// ✅ Get all bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await CarBooking.find().sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    console.error("❌ Error fetching bookings:", error);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});

// ✅ Delete booking
router.delete("/:id", async (req, res) => {
  try {
    await CarBooking.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting booking:", error);
    res.status(500).json({ message: "Failed to delete booking" });
  }
});

export default router;
