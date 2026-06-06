// src/controllers/playlist.controller.js

import { createSpotifyPlaylist } from "../services/spotify.service.js";
import { Queries } from "../db/queries.js";

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

    const playlist = await createSpotifyPlaylist(userId, name, tracks);

    // Save playlist history
    await Queries.savePlaylistHistory(userId, {
      spotify_playlist_id: playlist.playlist_id,
      name,
      segments_used: tracks
    });

    res.json({
      success: true,
      playlist
    });
  } catch (err) {
    console.error("Error in createPlaylist:", err);
    next(err);
  }
};