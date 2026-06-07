// src/middleware/auth.middleware.js

import { supabase } from "../config/supabase.js";

// FIX: the original had no try/catch — any network or Supabase error would
// propagate as an unhandled promise rejection and crash the server.
// Now catches exceptions and returns 401 uniformly.
export const requireAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.user = data.user;
    next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    return res.status(401).json({ error: "Unauthorized" });
  }
};