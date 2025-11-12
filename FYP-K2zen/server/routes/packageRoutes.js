import express from "express";
import multer from "multer";
import Package from "../models/package.js";

const router = express.Router();

// ✅ Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

/* ---------------------------------------
   📦 1. GET all packages OR filter by destination
------------------------------------------ */
router.get("/", async (req, res) => {
  try {
    const { destination } = req.query;
    const filter = destination ? { destinationName: destination } : {};
    const packages = await Package.find(filter).sort({ createdAt: -1 });
    res.json(packages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ---------------------------------------
   📦 2. GET single package by ID (✅ Added)
------------------------------------------ */
router.get("/:id", async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) {
      return res.status(404).json({ message: "Package not found" });
    }
    res.json(pkg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ---------------------------------------
   📦 3. ADD new package (with image upload)
------------------------------------------ */
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const data = req.body;
    const places = JSON.parse(data.places || "[]");

    const newPackage = new Package({
      title: data.title,
      days: data.days,
      destinationName: data.destinationName,
      location: data.location,
      price: data.price,
      description: data.description, 
      image: req.file ? `uploads/${req.file.filename}` : null,
      places,
      status: data.status,
    });

    await newPackage.save();
    res.status(201).json(newPackage);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* ---------------------------------------
   📦 4. DELETE a package by ID
------------------------------------------ */
router.delete("/:id", async (req, res) => {
  try {
    await Package.findByIdAndDelete(req.params.id);
    res.json({ message: "Package deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
