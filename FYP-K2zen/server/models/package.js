import mongoose from "mongoose";

const packageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination", // must match model name
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

// 🛡️ Prevent OverwriteModelError
const Package =
  mongoose.models.Package || mongoose.model("Package", packageSchema);

export default Package;
