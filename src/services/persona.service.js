// src/services/persona.service.js
import Groq from "groq-sdk";
import { Queries } from "../db/queries.js";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const DEFAULT_PERSONA = {
  voice_style: "smooth, upbeat dad DJ",
  intro_template: "Alright folks, buckle up — Dad's got the aux!",
  transition_template: "And now we're shifting gears...",
  outro_template: "That's a wrap from your one and only Dad DJ. Stay groovy!"
};

// FIX: getPersonaForUser was called internally and from persona.controller.js
// but was never defined or exported. Added here with fallback defaults.
export const getPersonaForUser = async (userId) => {
  try {
    const persona = await Queries.getPersona(userId);
    return Object.keys(persona).length ? persona : DEFAULT_PERSONA;
  } catch (err) {
    console.error("Error fetching persona:", err);
    return DEFAULT_PERSONA;
  }
};

// FIX: savePersonaForUser was referenced in persona.controller.js but missing.
export const savePersonaForUser = async (userId, persona) => {
  try {
    await Queries.savePersona(userId, persona);
    return { success: true };
  } catch (err) {
    console.error("Error saving persona:", err);
    throw new Error("Failed to save persona");
  }
};

export const generateDynamicPersonaLine = async (userId, context) => {
  const persona = await getPersonaForUser(userId);

  const prompt = `
You are a DJ with the style: ${persona.voice_style}.
Write a short, fun DJ line for this context: ${context}.
Keep it under 20 words.
`;

  const response = await groq.chat.completions.create({
    model: "llama3-8b-8192",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 50,
    temperature: 0.7
  });

  return response.choices[0].message.content.trim();
};