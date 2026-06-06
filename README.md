# 🎧 Dad DJ — Backend  
Backend service powering **Dad DJ**, a Spotify‑connected, DJ‑style playlist generator built as a personalized Father’s Day gift.

---

## 📝 What This Backend Is  
This backend is the **core engine** behind the Dad DJ experience.  
It handles everything that requires security, authentication, or server‑side logic — especially anything that cannot safely run in the browser.

It acts as the bridge between:

- Your **React frontend**, and  
- **Spotify’s Web API**, plus  
- Your **persistent memory system** for storing Dad‑specific preferences.

---

## 🎯 Purpose of This Backend  
The backend exists to provide three major capabilities:

---

## 1. **Secure Spotify Authentication (OAuth 2.0)**  
Spotify requires a **server** to safely handle:

- Client secrets  
- Authorization code exchange  
- Refresh tokens  
- Access token rotation  

The backend ensures:

- Your secrets stay private  
- Your frontend never exposes sensitive keys  
- Users can log in with Spotify safely  

Without this backend, the app **cannot** authenticate with Spotify.

---

## 2. **Playlist Generation & Music Intelligence**  
The backend is responsible for:

- Fetching Dad’s top artists, tracks, and genres  
- Generating playlists based on mood, theme, or nostalgia  
- Creating playlists directly in Dad’s Spotify account  
- Returning track data to the frontend  

This is where the “DJ‑style” logic lives — the backend builds the musical context the frontend uses.

---

## 3. **Persistent Memory & Personalization**  
To make the experience feel personal, the backend stores:

- Dad’s favorite artists  
- Past playlists you generated  
- Themes used (e.g., “Roadtrip”, “Nostalgia”, “Chill”)  
- Mood preferences  
- DJ segment history  

This memory allows the app to:

- Improve recommendations over time  
- Generate callbacks in DJ segments  
- Avoid repeating themes  
- Build a sense of continuity  

It’s the “heart” of the personalization layer.

---

## 🧠 Why Persistent Memory Matters  
Dad DJ isn’t just a playlist generator — it’s meant to feel like a **custom DJ who knows your dad**.

The backend’s memory system enables:

- “Welcome back — last time you picked a Chill mood.”  
- “I noticed your dad likes 80s rock, adding more of that.”  
- “Here’s a new playlist based on the artists he played most this week.”  

This transforms the app from a tool into an experience.

---

## 🏗 Why This Needs a Backend  
A backend is required because:

- Spotify OAuth cannot run in the browser  
- Secrets must be protected  
- Tokens must be refreshed securely  
- Memory must persist across sessions  
- Playlist creation requires server‑side calls  
- DJ segment generation needs structured data processing  

The frontend alone cannot safely or reliably do these things.

---

## 🧩 How It Fits Into the Whole System  
**Frontend (React + Vite)**  
- UI  
- User interactions  
- Displays playlists, segments, and messages  

**Backend (this repo)**  
- Auth  
- Data fetching  
- Playlist creation  
- Memory  
- DJ logic  

**Spotify API**  
- Music data  
- User profile  
- Playlist creation  

Together, they form the full Dad DJ experience.

---

## ❤️ Why This Exists  
This backend was built to support a **unique, emotional Father’s Day gift** — a personalized DJ that:

- Knows your dad’s taste  
- Speaks in a fun DJ persona  
- Generates playlists that feel meaningful  
- Remembers past interactions  
- Feels like a real companion experience  

It’s not just code — it’s a gift powered by music, memory, and personalization.