import { Router } from "express";
import { getUserProfile } from "../controllers/spotify.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
const router = Router();
router.get("/me", requireAuth, getUserProfile);
export default router;