import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.js";
import rentCarRoutes from "./routes/rentCarRoute.js";
import packageRoutes from "./routes/packageRoutes.js";
import packageBookingRoutes from "./routes/packageBookingRoutes.js"
import destinationRoutes from "./routes/destinationRoutes.js";
import hotelRoutes from "./routes/hotelRoutes.js";
import hotelBookingRoutes from "./routes/hotelBookingRoutes.js";
import carBookingRoutes from "./routes/carBookingRoutes.js";
import customizePackageRoutes from "./routes/customizePackageRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";



dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  })
);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(" MongoDB Connected Successfully"))
  .catch((err) => console.error(" MongoDB Connection Error:", err.message));

app.use("/api/auth", authRoutes);
app.use("/api/rentcar", rentCarRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/packageBooking", packageBookingRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/bookings", hotelBookingRoutes);
app.use("/api/carBooking", carBookingRoutes);
app.use("/api/customizePackages", customizePackageRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/contact", contactRoutes);





app.get("/", (req, res) => {
  res.send(" Server is running successfully...");
});

app.use((err, req, res, next) => {
  console.error(" Server Error:", err.stack);
  res
    .status(err.status || 500)
    .json({ message: "Something went wrong!", error: err.message });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(` Server running at: http://localhost:${PORT}`)
);
  