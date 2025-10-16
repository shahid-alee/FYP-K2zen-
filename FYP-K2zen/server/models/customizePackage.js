import mongoose from "mongoose";

const customizePackageSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  numberOfPeople: Number,
  durationDays: Number,
  destinationPlaces: [String],
  accommodationType: String,
  transportType: String,
  startDate: String,
  mealsIncluded: Boolean,
  specialRequests: String,
});

export default mongoose.model("CustomizePackage", customizePackageSchema);
