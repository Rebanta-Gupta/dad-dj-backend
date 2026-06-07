// src/controllers/persona.controller.js
import {
  getPersonaForUser,
  savePersonaForUser,
  generateDynamicPersonaLine
} from "../services/persona.service.js";

export const getPersona = async (req, res, next) => {
  try {
    const persona = await getPersonaForUser(req.user.id);
    res.json({ success: true, persona });
  } catch (err) {
    console.error("Error in getPersona:", err);
    next(err);
  }
};

export const savePersona = async (req, res, next) => {
  try {
    await savePersonaForUser(req.user.id, req.body);
    res.json({ success: true, message: "Persona updated successfully" });
  } catch (err) {
    console.error("Error in savePersona:", err);
    next(err);
  }
};

export const generatePersonaLine = async (req, res, next) => {
  try {
    const { context } = req.body;
    if (!context) {
      return res.status(400).json({ success: false, error: "Missing 'context' field" });
    }
    const line = await generateDynamicPersonaLine(req.user.id, context);
    res.json({ success: true, line });
  } catch (err) {
    console.error("Error in generatePersonaLine:", err);
    next(err);
  }
};