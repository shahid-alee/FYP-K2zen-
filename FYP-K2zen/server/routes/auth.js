import express from "express";
import { register, login } from "../controllers/authController.js";
import { registerValidator, loginValidator } from "../utils/validators.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerValidator, register);
router.post("/login", loginValidator, login);
router.get("/me", authMiddleware, (req, res) => {
  res.json({ message: "Protected route accessed", user: req.user });
});

export default router;
