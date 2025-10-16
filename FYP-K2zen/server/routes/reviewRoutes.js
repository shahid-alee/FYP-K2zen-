import express from "express";
import Review from "../models/review.js";

const router = express.Router();

// ✅ Add a new review
router.post("/", async (req, res) => {
  try {
    const { name, message, rating } = req.body;

    if (!name || !message || !rating) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newReview = new Review({ name, message, rating });
    const savedReview = await newReview.save();

    res.status(201).json(savedReview);
  } catch (err) {
    console.error("❌ Error saving review:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
});

// ✅ Get all reviews
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    console.error("❌ Error fetching reviews:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
});

// ✅ Delete review by ID
router.delete("/:id", async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: "Review deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete review", error: err });
  }
});

export default router;
