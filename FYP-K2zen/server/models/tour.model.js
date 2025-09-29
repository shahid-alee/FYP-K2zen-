import mongoose from "mongoose";

const TourSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ["Available", "Booked"], default: "Available" },
    price: { type: Number, required: true },
    description: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Tour", TourSchema);
