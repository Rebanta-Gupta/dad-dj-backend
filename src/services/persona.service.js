// src/services/persona.service.js
import Groq from "groq-sdk";
import { Queries } from "../db/queries.js";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

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