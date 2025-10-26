import mongoose from "mongoose";

const packageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Package title is required"],
      trim: true,
    },
    days: {
      type: Number,
      required: [true, "Number of days is required"],
      min: 1,
    },
    destinationName: {
      type: String,
      required: [true, "Destination name is required"],
      trim: true,
    },
    location: {
      type: String,
      default: "",
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    image: {
      type: String, // multer will store relative path like "uploads/1728734.jpg"
      required: true,
    },
    places: {
      type: [String],
      default: [], // dynamic chip input values from frontend
    },
    status: {
      type: String,
      enum: ["Available", "Unavailable"],
      default: "Available",
    },
  },
  { timestamps: true }
);

const Package = mongoose.model("Package", packageSchema);
export default Package;
