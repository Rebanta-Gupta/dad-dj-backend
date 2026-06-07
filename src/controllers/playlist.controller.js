// src/controllers/playlist.controller.js

import { createSpotifyPlaylist } from "../services/spotify.service.js";

export const createPlaylist = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { name, tracks } = req.body;

    if (!name || !tracks || !Array.isArray(tracks)) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: name, tracks[]"
      });
    }

    // FIX: createSpotifyPlaylist already calls Queries.savePlaylistHistory internally.
    // The original controller called it a second time, causing duplicate DB inserts.
    // Removed the redundant Queries.savePlaylistHistory call here.
    const playlist = await createSpotifyPlaylist(userId, name, tracks);

    res.json({
      success: true,
      playlist
    });
  } catch (err) {
    console.error("Error in createPlaylist:", err);
    next(err);
  }
};