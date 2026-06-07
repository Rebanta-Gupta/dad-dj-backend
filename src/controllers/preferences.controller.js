import { getUserPreferences, saveUserPreferences } from "../services/preferences.service.js";

export const getPreferences = async (req, res) => {
  const prefs = await getUserPreferences(req.user.id);
  res.json(prefs);
};

export const savePreferences = async (req, res) => {
  const prefs = await saveUserPreferences(req.user.id, req.body);
  res.json(prefs);
};