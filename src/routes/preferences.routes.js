import { Router } from "express";
import {
  getPreferences,
  savePreferences
} from "../controllers/preferences.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", requireAuth, getPreferences);
router.post("/", requireAuth, savePreferences);

export default router;