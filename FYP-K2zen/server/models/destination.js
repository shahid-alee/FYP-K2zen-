import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    location: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

// 🛡️ Prevent OverwriteModelError
const Destination =
  mongoose.models.Destination || mongoose.model("Destination", destinationSchema);

export default Destination;
