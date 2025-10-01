import Tour from "../models/Tour.js";

// Get all tours
export const getTours = async (req, res, next) => {
  try {
    const tours = await Tour.find();
    res.status(200).json(tours);
  } catch (err) {
    next(err);
  }
};

// Create new tour
export const createTour = async (req, res, next) => {
  try {
    const newTour = new Tour(req.body);
    await newTour.save();
    res.status(201).json(newTour);
  } catch (err) {
    next(err);
  }
};

// Delete tour
export const deleteTour = async (req, res, next) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Tour deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// Update tour
export const updateTour = async (req, res, next) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedTour);
  } catch (err) {
    next(err);
  }
};
