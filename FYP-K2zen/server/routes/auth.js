import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
const router = express.Router();

// ✅ REGISTER USER
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, contact } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ status: false, message: "All fields required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ status: false, message: "Email already registered" });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hash, contact });

    res.status(201).json({
      status: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Server error" });
  }
});


// ✅ LOGIN USER
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ status: false, message: "All fields required" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ status: false, message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ status: false, message: "Invalid email or password" });
    }

    // ✅ Login success
    res.status(200).json({
      status: true,
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ status: false, message: "Server error" });
  }
});


// ✅ GET ALL USERS (For Dashboard)
router.get("/all", async (req, res) => {
  try {
    const users = await User.find({}, "username email contact createdAt");
    res.status(200).json({ status: true, users });
  } catch (err) {
    res.status(500).json({ status: false, message: "Error fetching users" });
  }
});


// ✅ DELETE USER
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user)
      return res.status(404).json({ status: false, message: "User not found" });

    res.status(200).json({ status: true, message: "User deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ status: false, message: "Server error" });
  }
});

export default router;
