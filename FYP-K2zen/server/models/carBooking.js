import mongoose from "mongoose";

const carBookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true },
    carName: { type: String, required: true },
    modelYear: { type: String, required: true },
    totalDays: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, default: "Pending" },
    image: { type: String }, // optional car image path
  },
  { timestamps: true }
);

export default mongoose.model("CarBooking", carBookingSchema);
