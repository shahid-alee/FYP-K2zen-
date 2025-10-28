// server/controllers/bookingController.js
import Booking from "../models/packageBooking.js";
import Package from "../models/package.js";

export const createBooking = async (req, res) => {
  try {
    const {
      packageId,
      packageTitle,
      packagePrice,
      packageDays,
      userId,
      userName,
      userEmail,
      userPhone,
      bookingDate,
    } = req.body;

    // optionally validate package exists
    const pkg = await Package.findById(packageId);
    if (!pkg) return res.status(404).json({ message: "Package not found" });

    const booking = new Booking({
      packageId,
      packageTitle,
      packagePrice,
      packageDays,
      userId,
      userName,
      userEmail,
      userPhone,
      bookingDate,
      status: "pending",
    });

    await booking.save();
    res.status(201).json({ message: "Booking created", booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    // optionally add filters, pagination
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getBookingsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const bookings = await Booking.find({ userId }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
