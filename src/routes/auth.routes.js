import { Router } from "express";
import { login, callback } from "../controllers/auth.controller.js";
const router = Router();
router.get("/spotify/login", login);
router.get("/spotify/callback", callback);
export default router;