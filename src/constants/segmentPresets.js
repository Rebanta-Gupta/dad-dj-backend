// src/constants/segmentPresets.js

export const segmentPresets = {
  nostalgia: {
    description: "Warm, memory‑triggering tracks with mellow energy.",
    min_energy: 0.2,
    max_energy: 0.6,
    min_valence: 0.3,
    max_valence: 0.8
  },

  vibe_boost: {
    description: "High‑energy, feel‑good tracks to lift the mood.",
    min_energy: 0.6,
    max_energy: 1.0,
    min_valence: 0.5,
    max_valence: 1.0
  },

  emotional_close: {
    description: "Soft, emotional tracks for winding down.",
    min_energy: 0.0,
    max_energy: 0.4,
    min_valence: 0.1,
    max_valence: 0.5
  }
};