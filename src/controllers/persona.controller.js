// src/controllers/persona.controller.js

import {
  getPersonaForUser,
  savePersonaForUser,
  generateDynamicPersonaLine
} from "../services/persona.service.js";

//
// GET /persona
// Returns the user's saved DJ persona (or defaults)
//
export const getPersona = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const persona = await getPersonaForUser(userId);

    res.json({
      success: true,
      persona
    });
  } catch (err) {
    console.error("Error in getPersona:", err);
    next(err);
  }
};

//
// POST /persona
// Saves or updates the user's DJ persona
//
export const savePersona = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const persona = req.body;

    await savePersonaForUser(userId, persona);

    res.json({
      success: true,
      message: "Persona updated successfully"
    });
  } catch (err) {
    console.error("Error in savePersona:", err);
    next(err);
  }
};

//
// POST /persona/generate-line
// Optional: Generate a dynamic DJ line using Groq (if enabled)
//
export const generatePersonaLine = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { context } = req.body;

    if (!context) {
      return res.status(400).json({
        success: false,
        error: "Missing 'context' field"
      });
    }

    const line = await generateDynamicPersonaLine(userId, context);

    res.json({
      success: true,
      line
    });
  } catch (err) {
    console.error("Error in generatePersonaLine:", err);
    next(err);
  }
};