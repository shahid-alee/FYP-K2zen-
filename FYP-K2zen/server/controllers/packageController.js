import Package from "../models/package.js";
import Destination from "../models/destination.js";
import path from "path";
import fs from "fs";

export const getPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.status(200).json(packages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addPackage = async (req, res) => {
  try {
    const {
      title,
      days,
      destinationName,
      location,
      price,
      description,
      places,
      status,
    } = req.body;

    const image = req.file ? `uploads/${req.file.filename}` : null;
    const placesArray = places ? places.split(",").map((p) => p.trim()) : [];

    const newPackage = await Package.create({
      title,
      days,
      destinationName,
      location,
      price,
      description,
      places: placesArray,
      image,
      status,
    });

    // Find or create the destination
    let destination = await Destination.findOne({ name: destinationName });
    if (!destination) {
      destination = await Destination.create({
        name: destinationName,
        description: `${destinationName} is a beautiful tourist destination.`,
      });
    }

    // Add this package to destination
    destination.packages.push(newPackage._id);
    await destination.save();

    res.status(201).json(newPackage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deletePackage = async (req, res) => {
  try {
    const pkg = await Package.findByIdAndDelete(req.params.id);
    if (!pkg) return res.status(404).json({ message: "Package not found" });

    await Destination.updateMany(
      { packages: pkg._id },
      { $pull: { packages: pkg._id } }
    );

    res.status(200).json({ message: "Package deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
