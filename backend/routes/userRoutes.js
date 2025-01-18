// backend/routes/userRoutes.js
import express from "express";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";
import { getUsers, updateUserRoles } from "../controllers/userController.js";

const router = express.Router();

// Protect all routes with verifyToken middleware
router.use(verifyToken);

// @route   GET /api/users
// @desc    Get all users
// @access  Private/Admin
router.get("/", isAdmin, getUsers);

// @route   PUT /api/users/:userId/roles
// @desc    Update user roles
// @access  Private/Admin
router.put("/:userId/roles", isAdmin, updateUserRoles);

export default router;