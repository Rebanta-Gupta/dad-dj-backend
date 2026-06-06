// src/routes/playlist.routes.js

import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { createPlaylist } from "../controllers/playlist.controller.js";

const router = Router();

// Create a playlist from selected tracks
router.post("/create", requireAuth, createPlaylist);

export default router;