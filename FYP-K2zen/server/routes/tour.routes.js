import express from "express";
import { getTours, createTour, deleteTour, updateTour } from "../controllers/tourController.js";

const router = express.Router();

router.get("/", getTours);       // GET all tours
router.post("/", createTour);    // Create new tour
router.delete("/:id", deleteTour); // Delete a tour
router.put("/:id", updateTour);    // Update a tour

export default router;
