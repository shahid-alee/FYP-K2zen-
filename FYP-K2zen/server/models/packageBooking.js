// models/Booking.js
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    userContact: { type: String },
    packageId: { type: mongoose.Schema.Types.ObjectId, ref: "Package", required: true },
    packageName: { type: String, required: true },
    packagePrice: { type: Number, required: true },
    packageDays: { type: String },
    destinationName: { type: String },
    bookingDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
