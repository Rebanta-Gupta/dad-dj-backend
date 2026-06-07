// src/config/env.js

import dotenv from "dotenv";
dotenv.config();

export const config = {
  PORT: process.env.PORT,
  SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REDIRECT_URI: process.env.SPOTIFY_REDIRECT_URI,
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  JWT_SECRET: process.env.JWT_SECRET,
  // FIX: FRONTEND_URL was missing — used in auth callback redirect
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",
  // FIX: GROQ_API_KEY was read directly via process.env in persona.service.js
  // but never declared or validated here. Added for consistency and early failure.
  GROQ_API_KEY: process.env.GROQ_API_KEY
};

// Validate required vars at startup so the server fails fast with a clear message
const REQUIRED = [
  "SPOTIFY_CLIENT_ID",
  "SPOTIFY_CLIENT_SECRET",
  "SPOTIFY_REDIRECT_URI",
  "SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
  "JWT_SECRET",
  "GROQ_API_KEY"
];

for (const key of REQUIRED) {
  if (!config[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}