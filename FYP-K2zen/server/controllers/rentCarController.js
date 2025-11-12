import RentCar from "../models/rentCar.js";

// ✅ Add a new car
export const addRentCar = async (req, res) => {
  try {
    const { carName, modelYear, pricePerDay, seats, location, description } = req.body;
    const image = req.file ? req.file.path.replace(/\\/g, "/") : null;

    if (!carName || !modelYear || !pricePerDay || !seats || !location || !description) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    if (!image) {
      return res.status(400).json({ success: false, message: "Image is required" });
    }

    // ✅ Check for duplicate car (Name + Model)
    const existingCar = await RentCar.findOne({ carName, modelYear });
    if (existingCar) {
      return res.status(400).json({ success: false, message: "This car already exists!" });
    }

    const newCar = new RentCar({
      carName,
      modelYear: Number(modelYear),
      pricePerDay: Number(pricePerDay),
      seats: Number(seats),
      location,
      description,
      image,
      status: "Available",
    });

    await newCar.save();
    res.status(201).json({
      success: true,
      message: "Car added successfully ✅",
      data: newCar
    });

  } catch (error) {
    console.error("❌ Error adding car:", error);
    res.status(500).json({
      success: false,
      message: "Error adding car",
      error: error.message
    });
  }
};

// ✅ Get all cars
export const getAllRentCars = async (req, res) => {
  try {
    const cars = await RentCar.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: cars });
  } catch (error) {
    console.error("❌ Error fetching cars:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching cars",
      error: error.message
    });
  }
};

// ✅ Delete a car
export const deleteRentCar = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCar = await RentCar.findByIdAndDelete(id);

    if (!deletedCar) {
      return res.status(404).json({
        success: false,
        message: "Car not found!"
      });
    }

    res.status(200).json({
      success: true,
      message: "Car deleted successfully ✅"
    });

  } catch (error) {
    console.error("❌ Error deleting car:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting car",
      error: error.message
    });
  }
};

// ✅ Update car
export const updateRentCar = async (req, res) => {
  try {
    const { id } = req.params;
    const image = req.file ? req.file.path.replace(/\\/g, "/") : req.body.image;

    const updatedCar = await RentCar.findByIdAndUpdate(
      id,
      { ...req.body, image },
      { new: true }
    );

    if (!updatedCar) {
      return res.status(404).json({
        success: false,
        message: "Car not found!"
      });
    }

    res.status(200).json({
      success: true,
      message: "Car updated successfully ✅",
      data: updatedCar
    });

  } catch (error) {
    console.error("❌ Error updating car:", error);
    res.status(500).json({
      success: false,
      message: "Error updating car",
      error: error.message
    });
  }
};
