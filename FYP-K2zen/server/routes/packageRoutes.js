import express from "express";
import multer from "multer";
import Package from "../models/package.js";

const router = express.Router();

// ✅ Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// ✅ Get all or by destination
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

// ✅ Add new package
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
      image: req.file ? req.file.path : null,
      places,
      status: data.status,
    });

    await newPackage.save();
    res.status(201).json(newPackage);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Delete a package
router.delete("/:id", async (req, res) => {
  try {
    await Package.findByIdAndDelete(req.params.id);
    res.json({ message: "Package deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
