// models/carBooking.js
import mongoose from "mongoose";

const carBookingSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true },
    carId: { type: mongoose.Schema.Types.ObjectId, ref: "RentCar", required: true },
    carName: { type: String },
    modelYear: { type: String },
    image: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    totalDays: { type: Number },
    totalPrice: { type: Number },
    status: {
      type: String,
      enum: ["Pending", "Booked", "Rejected"],
      default: "Pending",
    },
    rejectionReason: { type: String },
  },
  { timestamps: true }
);

// Prevent model overwrite in watch mode
const CarBooking = mongoose.models?.CarBooking || mongoose.model("CarBooking", carBookingSchema);

export default CarBooking;
