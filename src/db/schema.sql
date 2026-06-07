create extension if not exists "uuid-ossp";

create table if not exists spotify_tokens (
    user_id uuid primary key references auth.users(id) on delete cascade,
    spotify_user_id text, access_token text, refresh_token text,
    expires_at bigint, updated_at timestamp default now()
);
create table if not exists preferences (
    user_id uuid primary key references auth.users(id) on delete cascade,
    favorite_artists jsonb, favorite_genres jsonb,
    default_mood text, default_segment_style text, updated_at timestamp default now()
);
create table if not exists past_playlists (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references auth.users(id) on delete cascade,
    spotify_playlist_id text, name text, segments_used jsonb, created_at timestamp default now()
);
create table if not exists dj_persona (
    user_id uuid primary key references auth.users(id) on delete cascade,
    voice_style text, intro_template text, transition_template text, outro_template text, updated_at timestamp default now()
);

alter table spotify_tokens enable row level security;
alter table preferences enable row level security;
alter table past_playlists enable row level security;
alter table dj_persona enable row level security;

create policy "select_own_tokens" on spotify_tokens for select using (auth.uid() = user_id);
create policy "insert_own_tokens" on spotify_tokens for insert with check (auth.uid() = user_id);
create policy "update_own_tokens" on spotify_tokens for update using (auth.uid() = user_id);
create policy "select_own_preferences" on preferences for select using (auth.uid() = user_id);
create policy "insert_own_preferences" on preferences for insert with check (auth.uid() = user_id);
create policy "update_own_preferences" on preferences for update using (auth.uid() = user_id);
create policy "select_own_playlists" on past_playlists for select using (auth.uid() = user_id);
create policy "insert_own_playlists" on past_playlists for insert with check (auth.uid() = user_id);
create policy "select_own_persona" on dj_persona for select using (auth.uid() = user_id);
create policy "insert_own_persona" on dj_persona for insert with check (auth.uid() = user_id);
create policy "update_own_persona" on dj_persona for update using (auth.uid() = user_id);