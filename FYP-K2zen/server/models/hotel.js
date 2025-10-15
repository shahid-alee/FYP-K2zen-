import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    location: { type: String, required: true },
    image: { type: String },
    status: { type: String, default: "Available" },
  },
  { timestamps: true }
);

export default mongoose.model("Hotel", hotelSchema);
