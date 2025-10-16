import Destination from "../models/destination.js";
import Package from "../models/package.js";

// ✅ Add new destination
export const addDestination = async (req, res) => {
  try {
    const { name, location, description } = req.body;
    const image = req.file ? req.file.path : null;

    // Check if destination already exists
    const existingDestination = await Destination.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") },
    });

    if (existingDestination) {
      return res.status(400).json({ message: "Destination already exists" });
    }

    const newDestination = new Destination({
      name,
      location,
      description,
      image,
    });

    await newDestination.save();
    res.status(201).json({
      message: "Destination added successfully",
      destination: newDestination,
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding destination", error });
  }
};

// ✅ Get all destinations (with their packages)
export const getAllDestinations = async (req, res) => {
  try {
    // Populate packages related to each destination
    const destinations = await Destination.find().lean();

    // For each destination, find related packages
    const destinationsWithPackages = await Promise.all(
      destinations.map(async (dest) => {
        const packages = await Package.find({ destination: dest._id });
        return { ...dest, packages };
      })
    );

    res.status(200).json(destinationsWithPackages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching destinations", error });
  }
};

// ✅ Get single destination by name (with its packages)
export const getDestinationByName = async (req, res) => {
  try {
    const { name } = req.params;

    const destination = await Destination.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") },
    });

    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }

    const packages = await Package.find({ destination: destination._id });

    res.status(200).json({ ...destination.toObject(), packages });
  } catch (error) {
    res.status(500).json({ message: "Error fetching destination", error });
  }
};

// ✅ Delete destination (and optionally its packages)
export const deleteDestination = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete destination
    const deletedDestination = await Destination.findByIdAndDelete(id);

    if (!deletedDestination) {
      return res.status(404).json({ message: "Destination not found" });
    }

    // Optional: Delete related packages too
    await Package.deleteMany({ destination: id });

    res.status(200).json({ message: "Destination and its packages deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting destination", error });
  }
};
