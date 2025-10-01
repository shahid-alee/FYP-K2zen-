import { validationResult } from "express-validator";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register
export const Register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { username, email, password, firstName, lastName, ...rest } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ status: false, message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      ...rest,
    });

    await user.save();

    res.status(201).json({
      status: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Error creating user", error: err.message });
  }
};

// Login
export const Login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ status: false, message: "Email not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ status: false, message: "Invalid password" });

    const payload = { userId: user._id, role: user.roles[0] };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("access_token", token, { httpOnly: true });
    res.status(200).json({
      status: true,
      message: "Login successful",
      user: { id: user._id, username: user.username, email: user.email, role: user.roles[0] },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Error logging in", error: err.message });
  }
};
