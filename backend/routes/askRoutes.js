import express from "express";
import { askQuestion } from "../controllers/askController.js";

const router = express.Router();

// POST /api/ask
router.post("/ask", askQuestion);

export default router;