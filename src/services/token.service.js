// src/services/token.service.js

import { Queries } from "../db/queries.js";
import { encrypt, decrypt } from "../utils/crypto.js";

//
// Save tokens securely
//
export const saveSpotifyTokens = async (userId, tokens) => {
  await Queries.saveSpotifyTokens(userId, {
    spotify_user_id: tokens.spotify_user_id,
    access_token: encrypt(tokens.access_token),
    refresh_token: encrypt(tokens.refresh_token),
    expires_at: tokens.expires_at
  });
};

//
// Get + decrypt tokens
//
export const getSpotifyTokens = async (userId) => {
  const data = await Queries.getSpotifyTokens(userId);

  return {
    ...data,
    access_token: decrypt(data.access_token),
    refresh_token: decrypt(data.refresh_token)
  };
};

//
// Update access token only
//
export const updateAccessToken = async (userId, accessToken) => {
  await Queries.updateAccessToken(userId, encrypt(accessToken));
};