// src/services/preferences.service.js
import { Queries } from "../db/queries.js";

export const getUserPreferences = async (userId) => {
  try {
    const prefs = await Queries.getPreferences(userId);
    return prefs || {
      favorite_artists: [],
      favorite_genres: [],
      default_mood: "nostalgia",
      default_segment_style: "classic"
    };
  } catch (err) {
    console.error("Error fetching preferences:", err);
    throw new Error("Failed to load preferences");
  }
};

export const saveUserPreferences = async (userId, prefs) => {
  try {
    await Queries.savePreferences(userId, prefs);
    return { success: true };
  } catch (err) {
    console.error("Error saving preferences:", err);
    throw new Error("Failed to save preferences");
  }
};