import express from "express";
import CustomizePackage from "../models/customizePackage.js";

const router = express.Router();

// ✅ Create new custom package
router.post("/", async (req, res) => {
  try {
    const newPackage = new CustomizePackage(req.body);
    await newPackage.save();
    res.status(201).json({ message: "Custom package created successfully", newPackage });
  } catch (error) {
    res.status(500).json({ message: "Error creating custom package", error });
  }
});

// ✅ Get all custom packages
router.get("/", async (req, res) => {
  try {
    const packages = await CustomizePackage.find();
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching custom packages", error });
  }
});

// ✅ Delete a custom package
router.delete("/:id", async (req, res) => {
  try {
    await CustomizePackage.findByIdAndDelete(req.params.id);
    res.json({ message: "Package deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting package", error });
  }
});

export default router;
