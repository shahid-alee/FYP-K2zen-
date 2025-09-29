import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/auth.routes.js";

const app = express();

// Load environment variables
dotenv.config();

// Middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// MongoDB Connection
const DatabaseConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
  }
};

// Connection status listeners
mongoose.connection.on("connected", () => {
  console.log("MongoDB Connected!");
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB Disconnected!");
});

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Hello from Backend!" });
});

app.use("/api/auth", router)

// Error handling middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

// Server Listen
const port = process.env.PORT || 5000;
app.listen(port, () => {
  DatabaseConnection();
  console.log(`Server running on port ${port}`);
});
