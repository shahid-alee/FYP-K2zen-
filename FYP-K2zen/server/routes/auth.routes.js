import express from "express";
import { check } from "express-validator";
import { Register, Login } from "../controllers/auth.controller.js";
// import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();


const registerValidation = [
  check("username", "Username is required").notEmpty().trim(),
  check("email", "Valid email required").isEmail().normalizeEmail(),
  check("password", "Password must be min 6 chars").isLength({ min: 6 }),
  check("firstName", "First name is required").notEmpty().trim(),
  check("lastName", "Last name is required").notEmpty().trim(),
  check("phone", "Phone number is invalid").optional().isMobilePhone(),
  check("dateOfBirth", "Date of birth is required").notEmpty(),
];

const loginValidation = [
  check("email", "Valid email required").isEmail().normalizeEmail(),
  check("password", "Password must be min 6 chars").isLength({ min: 6 }),
];

// Routes
router.post("/register", registerValidation, Register);
router.post("/login", loginValidation, Login);

router.get("/check-auth", (req, res) => res.send("Authenticated "));
router.get("/check-user/:id", (req, res) => res.send("User route "));
router.get("/check-admin/:id", (req, res) => res.send("Admin route "));

export default router;
