import { supabase } from "../config/supabase.js";

export const requireAuth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  req.user = data.user;
  next();
};