import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { createPlaylist } from "../controllers/playlist.controller.js";
const router = Router();
router.post("/create", requireAuth, createPlaylist);
export default router;