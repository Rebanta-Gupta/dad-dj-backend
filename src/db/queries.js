import { supabase } from "../config/supabase.js";

export const Queries = {
  getSpotifyTokens: async (userId) => {
    const { data, error } = await supabase.from("spotify_tokens").select("*").eq("user_id", userId).single();
    if (error) throw error;
    return data;
  },
  saveSpotifyTokens: async (userId, tokens) => {
    const { error } = await supabase.from("spotify_tokens").upsert({ user_id: userId, ...tokens, updated_at: new Date() });
    if (error) throw error;
  },
  updateAccessToken: async (userId, accessToken) => {
    const { error } = await supabase.from("spotify_tokens").update({ access_token: accessToken, updated_at: new Date() }).eq("user_id", userId);
    if (error) throw error;
  },
  getPreferences: async (userId) => {
    const { data, error } = await supabase.from("preferences").select("*").eq("user_id", userId).single();
    if (error && error.code !== "PGRST116") throw error;
    return data || {};
  },
  savePreferences: async (userId, prefs) => {
    const { error } = await supabase.from("preferences").upsert({ user_id: userId, ...prefs, updated_at: new Date() });
    if (error) throw error;
  },
  savePlaylistHistory: async (userId, playlist) => {
    const { error } = await supabase.from("past_playlists").insert({ user_id: userId, ...playlist });
    if (error) throw error;
  },
  getPlaylistHistory: async (userId) => {
    const { data, error } = await supabase.from("past_playlists").select("*").eq("user_id", userId).order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },
  getPersona: async (userId) => {
    const { data, error } = await supabase.from("dj_persona").select("*").eq("user_id", userId).single();
    if (error && error.code !== "PGRST116") throw error;
    return data || {};
  },
  savePersona: async (userId, persona) => {
    const { error } = await supabase.from("dj_persona").upsert({ user_id: userId, ...persona, updated_at: new Date() });
    if (error) throw error;
  }
};