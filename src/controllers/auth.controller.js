// src/controllers/auth.controller.js

import { spotifyConfig } from "../config/spotify.js";
import { config } from "../config/env.js";
import { exchangeCodeForTokens } from "../services/spotify.service.js";
import { saveSpotifyTokens } from "../services/token.service.js";

export const login = (req, res) => {
  const userId = req.query.state;

  if (!userId) {
    return res.status(400).json({ error: "Missing state param (Supabase user ID)" });
  }

  const scope = spotifyConfig.scopes.join(" ");
  const redirect = `${spotifyConfig.authorizeUrl}?client_id=${config.SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(config.SPOTIFY_REDIRECT_URI)}&scope=${encodeURIComponent(scope)}&state=${encodeURIComponent(userId)}`;

  res.redirect(redirect);
};

export const callback = async (req, res, next) => {
  try {
    const code = req.query.code;
    const userId = req.query.state; // Supabase user ID

    if (!code || !userId) {
      return res.status(400).json({ error: "Missing code or state param" });
    }

    const tokens = await exchangeCodeForTokens(code);
    await saveSpotifyTokens(userId, tokens);

    // FIX: was hardcoded to "https://your-frontend-url.com/dj".
    // Now reads from FRONTEND_URL env var with a safe fallback.
    res.redirect(`${config.FRONTEND_URL}/dj`);
  } catch (err) {
    console.error("Error in callback:", err);
    next(err);
  }
};