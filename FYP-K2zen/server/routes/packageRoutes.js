import express from "express";
import multer from "multer";
import path from "path";
import { addPackage, getPackages, deletePackage } from "../controllers/packageController.js";

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

// Routes
router.get("/", getPackages);
router.post("/", upload.single("image"), addPackage);
router.delete("/:id", deletePackage);

export default router;
