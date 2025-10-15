import express from "express";
import { getTours, createTour, deleteTour, updateTour } from "../controllers/tour.controller.js";

const router = express.Router();

router.get("/", getTours);      
router.post("/", createTour);    
router.delete("/:id", deleteTour); 
router.put("/:id", updateTour);    

export default router;
