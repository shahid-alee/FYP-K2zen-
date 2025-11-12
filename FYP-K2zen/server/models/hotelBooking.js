import mongoose from "mongoose";

const hotelBookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    checkIn: { type: String, required: true },
    checkOut: { type: String, required: true },
    guests: { type: Number, required: true },
    price: { type: Number, required: true },
    hotelName: { type: String, required: true },
    hotelImage: { type: String },
    status: { type: String, default: "Pending" } // ✅ NEW
  },
  { timestamps: true }
);

export default mongoose.model("HotelBooking", hotelBookingSchema);
