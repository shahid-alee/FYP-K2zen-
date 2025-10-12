import express from "express";
import multer from "multer";
import path from "path";
import RentCar from "../models/RentCar.js";

const router = express.Router();

// ✅ Multer setup for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // uploads folder must exist
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// ✅ Add new car
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { carName, model, description, driverName, location, status } = req.body;

    // Check if file is uploaded
    const image = req.file ? req.file.path : null;

    const newCar = new RentCar({
      carName,
      model,
      description,
      driverName,
      location,
      status,
      image,
    });

    await newCar.save();
    res.status(201).json({ message: "Car added successfully!", car: newCar });
  } catch (err) {
    console.error("Error saving car:", err);
    res.status(500).json({ message: "Error saving car", error: err.message });
  }
});

// ✅ Fetch all cars
router.get("/", async (req, res) => {
  try {
    const cars = await RentCar.find();
    res.status(200).json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
