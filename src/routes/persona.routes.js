// src/routes/persona.routes.js

import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import {
  getPersona,
  savePersona,
  generatePersonaLine
} from "../controllers/persona.controller.js";

const router = Router();

// Get saved persona (or defaults)
router.get("/", requireAuth, getPersona);

// Save/update persona
router.post("/", requireAuth, savePersona);

// Optional: Groq-powered dynamic DJ line
router.post("/generate-line", requireAuth, generatePersonaLine);

export default router;