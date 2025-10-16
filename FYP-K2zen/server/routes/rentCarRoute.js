import express from "express";
import multer from "multer";
import {
  addRentCar,
  getAllRentCars,
  deleteRentCar,
  updateRentCar,
} from "../controllers/rentCarController.js";

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_")),
});
const upload = multer({ storage });

// Routes
router.get("/", getAllRentCars);
router.post("/add", upload.single("image"), addRentCar);
router.delete("/:id", deleteRentCar);
router.put("/:id", upload.single("image"), updateRentCar);

export default router;
