import mongoose from "mongoose";

const rentCarSchema = new mongoose.Schema(
  {
    carName: { type: String, required: true },
    modelYear: { type: Number, required: true },
    pricePerDay: { type: Number, required: true },
    seats: { type: Number, required: true },
    location: { type: String, required: true },
    status: {
      type: String,
      enum: ["Available", "Booked", "Maintenance"],
      default: "Available",
    },
    description: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

// Prevent OverwriteModelError in dev
const RentCar =
  mongoose.models.RentCar || mongoose.model("RentCar", rentCarSchema);

export default RentCar;
