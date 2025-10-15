import express from "express";
import multer from "multer";
import {
  addDestination,
  getAllDestinations,
  getDestinationByName,
  deleteDestination,
} from "../controllers/destinationController.js";

const router = express.Router();

// ✅ Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder to store uploaded images
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ✅ ROUTES

// ✅ Get all destinations (with related packages)
router.get("/", getAllDestinations);

// ✅ Get a single destination by name (e.g. /api/destinations/Hunza)
router.get("/:name", getDestinationByName);

// ✅ Add a new destination (with image upload)
router.post("/", upload.single("image"), addDestination);

// ✅ Delete a destination by ID (and its packages)
router.delete("/:id", deleteDestination);

export default router;
