import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { getPersona, savePersona, generatePersonaLine } from "../controllers/persona.controller.js";
const router = Router();
router.get("/", requireAuth, getPersona);
router.post("/", requireAuth, savePersona);
router.post("/generate-line", requireAuth, generatePersonaLine);
export default router;