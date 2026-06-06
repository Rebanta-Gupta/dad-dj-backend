// src/routes/segment.routes.js

import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { generateSegment } from "../controllers/segment.controller.js";

const router = Router();

// Generate a DJ segment
router.post("/generate", requireAuth, generateSegment);

export default router;