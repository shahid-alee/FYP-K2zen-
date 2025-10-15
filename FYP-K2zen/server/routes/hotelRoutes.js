import express from "express";
import multer from "multer";
import Hotel from "../models/hotel.js";

const router = express.Router();

// ✅ Setup multer storage for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // store images in /uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ✅ Get all hotels
router.get("/", async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Add new hotel with image
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, description, location, status } = req.body;
    const image = req.file ? req.file.path.replace(/\\/g, "/") : "";

    const newHotel = new Hotel({
      name,
      description,
      location,
      status,
      image,
    });

    await newHotel.save();
    res.status(201).json(newHotel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ✅ Update hotel (optionally with new image)
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, description, location, status } = req.body;
    let updateData = { name, description, location, status };

    if (req.file) {
      updateData.image = req.file.path.replace(/\\/g, "/");
    }

    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updatedHotel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ✅ Delete hotel
router.delete("/:id", async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.json({ message: "Hotel deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
