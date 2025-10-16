import RentCar from "../models/rentCar.js";

// ✅ Add a new car
export const addRentCar = async (req, res) => {
  try {
    const { carName, modelYear, pricePerDay, seats, location, status, description } = req.body;
    const image = req.file ? req.file.path : null;

    if (!image) return res.status(400).json({ message: "Image is required" });

    const newCar = new RentCar({
      carName,
      modelYear,
      pricePerDay,
      seats,
      location,
      status,
      description,
      image,
    });

    await newCar.save();
    res.status(201).json({ message: "Car added successfully", newCar });
  } catch (error) {
    res.status(500).json({ message: "Error adding car", error });
  }
};

// ✅ Get all cars
export const getAllRentCars = async (req, res) => {
  try {
    const cars = await RentCar.find().sort({ createdAt: -1 });
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cars", error });
  }
};

// ✅ Delete car
export const deleteRentCar = async (req, res) => {
  try {
    const { id } = req.params;
    await RentCar.findByIdAndDelete(id);
    res.status(200).json({ message: "Car deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting car", error });
  }
};

// ✅ Update car
export const updateRentCar = async (req, res) => {
  try {
    const { id } = req.params;
    const image = req.file ? req.file.path : req.body.image;

    const updatedCar = await RentCar.findByIdAndUpdate(
      id,
      { ...req.body, image },
      { new: true }
    );

    res.status(200).json({ message: "Car updated successfully", updatedCar });
  } catch (error) {
    res.status(500).json({ message: "Error updating car", error });
  }
};
