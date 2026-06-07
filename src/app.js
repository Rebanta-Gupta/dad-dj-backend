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
app.use("/auth", authRoutes);
app.use("/spotify", spotifyRoutes);
app.use("/segments", segmentRoutes);
app.use("/playlist", playlistRoutes);
app.use("/preferences", preferencesRoutes);
app.use("/persona", personaRoutes);
app.use(errorHandler);
export default app;