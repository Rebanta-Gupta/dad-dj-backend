// src/services/segment.service.js

import axios from "axios";
import { Queries } from "../db/queries.js";
import { refreshAccessToken } from "./spotify.service.js";
import { getPersonaForUser, generateDynamicPersonaLine } from "./persona.service.js";
import { getUserPreferences } from "./preferences.service.js";

const SPOTIFY_API = "https://api.spotify.com/v1";

export const generateSegmentForUser = async (userId) => {
  const prefs = await getUserPreferences(userId);
  const persona = await getPersonaForUser(userId);
  const accessToken = await refreshAccessToken(userId);

  // Fetch top tracks directly instead of using /recommendations
  const topTracks = await axios.get(
    `${SPOTIFY_API}/me/top/tracks?limit=12&time_range=medium_term`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );

  if (!topTracks.data.items.length) {
    throw new Error("No top tracks found for this user");
  }

  const tracks = topTracks.data.items;
  const seedArtist = tracks[0].artists[0].name;

  // Generate DJ intro line
  let intro;
  try {
    intro = await generateDynamicPersonaLine(
      userId,
      `intro for a segment inspired by ${seedArtist}`
    );
  } catch {
    intro = persona.intro_template;
  }

  const mood = prefs.default_mood || "nostalgia";

  return {
    intro,
    mood,
    seed_artist: seedArtist,
    tracks
  };
};