import mongoose from "mongoose";

const rentCarSchema = new mongoose.Schema(
  {
    carName: { type: String, required: true }, // e.g. Corolla Altis
    modelYear: { type: Number, required: true }, // e.g. 2023
    pricePerDay: { type: Number, required: true }, // daily rent
    seats: { type: Number, required: true }, // number of seats
    image: { type: String, required: true }, // image path from multer
    location: { type: String, required: true }, // pickup or available location
    status: { type: String, enum: ["Available", "Booked", "Maintenance"], default: "Available" },
    description: { type: String }, // short description of the car
  },
  { timestamps: true }
);

export default mongoose.model("RentCar", rentCarSchema);
