import { spotifyConfig } from "../config/spotify.js";
import { config } from "../config/env.js";
import { exchangeCodeForTokens } from "../services/spotify.service.js";
import { saveSpotifyTokens } from "../services/token.service.js";

export const login = (req, res) => {
  const scope = spotifyConfig.scopes.join(" ");
  const redirect = `${spotifyConfig.authorizeUrl}?client_id=${config.SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(config.SPOTIFY_REDIRECT_URI)}&scope=${encodeURIComponent(scope)}`;

  res.redirect(redirect);
};

export const callback = async (req, res) => {
  const code = req.query.code;
  const userId = req.query.state; // Supabase user ID

  const tokens = await exchangeCodeForTokens(code);
  await saveSpotifyTokens(userId, tokens);

  res.redirect("https://your-frontend-url.com/dj");
};