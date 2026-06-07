// src/services/segment.service.js

import axios from "axios";
import { Queries } from "../db/queries.js";
import { refreshAccessToken } from "./spotify.service.js";
import { getPersonaForUser, generateDynamicPersonaLine } from "./persona.service.js";
import { getUserPreferences } from "./preferences.service.js";
// FIX: segmentPresets was defined but never imported or applied.
// Now imported and used to add audio feature filters to the recommendations query.
import { segmentPresets } from "../constants/segmentPresets.js";

const SPOTIFY_API = "https://api.spotify.com/v1";

export const generateSegmentForUser = async (userId) => {
  // 1. Load preferences + persona
  const prefs = await getUserPreferences(userId);
  const persona = await getPersonaForUser(userId);

  // 2. Ensure valid Spotify access token
  const accessToken = await refreshAccessToken(userId);

  // 3. Fetch top artists
  const topArtists = await axios.get(`${SPOTIFY_API}/me/top/artists?limit=5`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  if (!topArtists.data.items.length) {
    throw new Error("No top artists found for this user");
  }

  const seedArtist = topArtists.data.items[0].id;

  // 4. Build recommendation query with mood-based audio feature filters
  const mood = prefs.default_mood || "nostalgia";
  // FIX: fall back to nostalgia preset if the stored mood doesn't match any preset key
  const preset = segmentPresets[mood] || segmentPresets["nostalgia"];

  const recUrl =
    `${SPOTIFY_API}/recommendations?limit=12&seed_artists=${seedArtist}` +
    `&min_energy=${preset.min_energy}&max_energy=${preset.max_energy}` +
    `&min_valence=${preset.min_valence}&max_valence=${preset.max_valence}`;

  const recs = await axios.get(recUrl, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  const tracks = recs.data.tracks;

  // 5. Generate DJ intro line
  let intro;
  try {
    intro = await generateDynamicPersonaLine(
      userId,
      `intro for a segment inspired by ${topArtists.data.items[0].name}`
    );
  } catch {
    intro = persona.intro_template;
  }

  return {
    intro,
    mood,
    seed_artist: topArtists.data.items[0].name,
    tracks
  };
};