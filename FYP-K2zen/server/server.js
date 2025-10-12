import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.js";
import rentCarRoutes from "./routes/rentCarRoute.js"; // ✅ New RentCar route

// Load environment variables
dotenv.config();

const app = express();

// ✅ Path fix for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Middleware
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // serve uploaded images

// ✅ Allow frontend requests
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"], // allow frontend dev ports
    credentials: true,
  })
);

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ API Routes
app.use("/api/auth", authRoutes);      // Authentication routes
app.use("/api/rentcar", rentCarRoutes); // RentCar routes

// ✅ Default Route
app.get("/", (req, res) => {
  res.send("🚀 Server is running...");
});

// ✅ Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
