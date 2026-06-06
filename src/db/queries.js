import { supabase } from "../config/supabase.js";

export const Queries = {
  // -----------------------------
  // SPOTIFY TOKENS
  // -----------------------------
  getSpotifyTokens: async (userId) => {
    const { data, error } = await supabase
      .from("spotify_tokens")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) throw error;
    return data;
  },

  saveSpotifyTokens: async (userId, tokens) => {
    const { error } = await supabase
      .from("spotify_tokens")
      .upsert({
        user_id: userId,
        spotify_user_id: tokens.spotify_user_id,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        expires_at: tokens.expires_at,
        updated_at: new Date()
      });

    if (error) throw error;
  },

  updateAccessToken: async (userId, accessToken) => {
    const { error } = await supabase
      .from("spotify_tokens")
      .update({
        access_token: accessToken,
        updated_at: new Date()
      })
      .eq("user_id", userId);

    if (error) throw error;
  },

  // -----------------------------
  // PREFERENCES
  // -----------------------------
  getPreferences: async (userId) => {
    const { data, error } = await supabase
      .from("preferences")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error && error.code !== "PGRST116") throw error; // no rows
    return data || {};
  },

  savePreferences: async (userId, prefs) => {
    const { error } = await supabase
      .from("preferences")
      .upsert({
        user_id: userId,
        ...prefs,
        updated_at: new Date()
      });

    if (error) throw error;
  },

  // -----------------------------
  // PAST PLAYLISTS
  // -----------------------------
  savePlaylistHistory: async (userId, playlist) => {
    const { error } = await supabase
      .from("past_playlists")
      .insert({
        user_id: userId,
        spotify_playlist_id: playlist.spotify_playlist_id,
        name: playlist.name,
        segments_used: playlist.segments_used
      });

    if (error) throw error;
  },

  getPlaylistHistory: async (userId) => {
    const { data, error } = await supabase
      .from("past_playlists")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  // -----------------------------
  // DJ PERSONA
  // -----------------------------
  getPersona: async (userId) => {
    const { data, error } = await supabase
      .from("dj_persona")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error && error.code !== "PGRST116") throw error;
    return data || {};
  },

  savePersona: async (userId, persona) => {
    const { error } = await supabase
      .from("dj_persona")
      .upsert({
        user_id: userId,
        ...persona,
        updated_at: new Date()
      });

    if (error) throw error;
  }
};