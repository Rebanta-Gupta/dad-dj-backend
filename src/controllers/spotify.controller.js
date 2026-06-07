// src/controllers/spotify.controller.js

import axios from "axios";
import { refreshAccessToken } from "../services/spotify.service.js";

const SPOTIFY_API = "https://api.spotify.com/v1";

export const getUserProfile = async (req, res, next) => {
  try {
    const accessToken = await refreshAccessToken(req.user.id);

    const profile = await axios.get(`${SPOTIFY_API}/me`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    res.json({
      success: true,
      profile: profile.data
    });
  } catch (err) {
    console.error("Error in getUserProfile:", err);
    next(err);
  }
};