import express from "express";
import { signup, login, refreshToken, logout } from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// @route   POST /api/auth/signup
// @desc    Register a new user
// @access  Public
router.post("/signup", signup);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post("/login", login);

// @route   POST /api/auth/refresh-token
// @desc    Refresh access token
// @access  Public
router.post("/refresh-token", refreshToken);

// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Private
router.post("/logout", verifyToken, logout);

export default router;