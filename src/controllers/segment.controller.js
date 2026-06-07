// src/controllers/segment.controller.js
import { generateSegmentForUser } from "../services/segment.service.js";
import { getPersonaForUser } from "../services/persona.service.js";
import { getUserPreferences } from "../services/preferences.service.js";

export const generateSegment = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const persona = await getPersonaForUser(userId);
    const preferences = await getUserPreferences(userId);
    const segment = await generateSegmentForUser(userId);
    res.json({ success: true, persona, preferences, segment });
  } catch (err) {
    console.error("Error in generateSegment:", err);
    next(err);
  }
};