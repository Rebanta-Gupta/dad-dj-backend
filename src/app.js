// src/app.js
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import spotifyRoutes from "./routes/spotify.routes.js";
import segmentRoutes from "./routes/segment.routes.js";
import playlistRoutes from "./routes/playlist.routes.js";
import preferencesRoutes from "./routes/preferences.routes.js";
import personaRoutes from "./routes/persona.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();
app.use(cors());
app.use(express.json());
app.get("/health", (req, res) => res.json({ status: "ok" }));
app.get("/debug", (req, res) => {
  res.json({
    supabase_url: process.env.SUPABASE_URL,
    has_service_key: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    key_preview: process.env.SUPABASE_SERVICE_ROLE_KEY?.slice(0, 20)
  });
});
app.get("/debug-db", async (req, res) => {
  try {
    const { supabase } = await import("./config/supabase.js");
    const { data, error } = await supabase
      .from("spotify_tokens")
      .select("*");
    res.json({ data, error });
  } catch (err) {
    res.json({ caught: err.message });
  }
});
app.use("/auth", authRoutes);
app.use("/spotify", spotifyRoutes);
app.use("/segments", segmentRoutes);
app.use("/playlist", playlistRoutes);
app.use("/preferences", preferencesRoutes);
app.use("/persona", personaRoutes);
app.use(errorHandler);
export default app;