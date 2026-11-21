-- ====================================================================
-- PROJETO MARÍLIA DAY — SCHEMA DE BANCO DE DADOS (SUPABASE / POSTGRESQL)
-- Arquivo: supabase/schema.sql
-- ====================================================================

-- Habilitar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. artist_daily_stats: Métricas diárias consolidadas do artista
CREATE TABLE IF NOT EXISTS artist_daily_stats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date DATE NOT NULL UNIQUE,
    spotify_monthly_listeners BIGINT NOT NULL DEFAULT 0,
    spotify_listeners_delta BIGINT NOT NULL DEFAULT 0,
    spotify_followers BIGINT NOT NULL DEFAULT 0,
    spotify_daily_streams BIGINT NOT NULL DEFAULT 0,
    youtube_subscribers BIGINT NOT NULL DEFAULT 0,
    youtube_total_views BIGINT NOT NULL DEFAULT 0,
    youtube_daily_views BIGINT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_artist_daily_stats_date ON artist_daily_stats(date DESC);

-- 2. tracks: Catálogo mestre de faixas e metadados
CREATE TABLE IF NOT EXISTS tracks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    spotify_id VARCHAR(64) UNIQUE,
    youtube_video_id VARCHAR(64),
    title VARCHAR(255) NOT NULL,
    album_name VARCHAR(255) NOT NULL,
    era VARCHAR(100) NOT NULL,
    cover_url TEXT NOT NULL,
    release_date DATE,
    duration_ms INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_tracks_spotify_id ON tracks(spotify_id);
CREATE INDEX IF NOT EXISTS idx_tracks_era ON tracks(era);
CREATE INDEX IF NOT EXISTS idx_tracks_album ON tracks(album_name);

-- 3. track_daily_metrics: Métricas diárias por faixa
CREATE TABLE IF NOT EXISTS track_daily_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    track_id UUID NOT NULL REFERENCES tracks(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    spotify_total_streams BIGINT NOT NULL DEFAULT 0,
    spotify_daily_streams BIGINT NOT NULL DEFAULT 0,
    spotify_chart_position INTEGER, -- Posição no Top 200 / Top 50 (null se fora)
    spotify_chart_delta INTEGER DEFAULT 0, -- Variação de posição (+1, -2, 0)
    youtube_total_views BIGINT NOT NULL DEFAULT 0,
    youtube_daily_views BIGINT NOT NULL DEFAULT 0,
    youtube_chart_position INTEGER,
    deezer_rank INTEGER,
    apple_music_rank INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    CONSTRAINT unique_track_date UNIQUE (track_id, date)
);

CREATE INDEX IF NOT EXISTS idx_track_daily_metrics_date ON track_daily_metrics(date DESC);
CREATE INDEX IF NOT EXISTS idx_track_daily_metrics_track_id ON track_daily_metrics(track_id);
CREATE INDEX IF NOT EXISTS idx_track_daily_metrics_spotify_daily ON track_daily_metrics(spotify_daily_streams DESC);

-- 4. milestones: Radar de marcos e metas de streaming
CREATE TABLE IF NOT EXISTS milestones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    track_id UUID NOT NULL REFERENCES tracks(id) ON DELETE CASCADE,
    platform VARCHAR(20) NOT NULL CHECK (platform IN ('spotify', 'youtube', 'deezer')),
    target_value BIGINT NOT NULL, -- Ex: 100000000 (100M), 500000000 (500M), 1000000000 (1B)
    current_value BIGINT NOT NULL DEFAULT 0,
    daily_average BIGINT NOT NULL DEFAULT 0,
    estimated_completion_date DATE,
    is_completed BOOLEAN NOT NULL DEFAULT FALSE,
    completion_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_milestones_track_id ON milestones(track_id);
CREATE INDEX IF NOT EXISTS idx_milestones_platform ON milestones(platform);
CREATE INDEX IF NOT EXISTS idx_milestones_is_completed ON milestones(is_completed);

-- 5. fan_messages: Mural de Cartas para a Rainha
CREATE TABLE IF NOT EXISTS fan_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_name VARCHAR(120) NOT NULL,
    city_state VARCHAR(120) NOT NULL,
    favorite_song VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_approved BOOLEAN NOT NULL DEFAULT TRUE, -- Configurado com moderação básica
    is_featured_today BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_fan_messages_created ON fan_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_fan_messages_approved ON fan_messages(is_approved);
CREATE INDEX IF NOT EXISTS idx_fan_messages_featured ON fan_messages(is_featured_today);

-- 6. ephemerides: Efemérides ("Neste Dia na História")
CREATE TABLE IF NOT EXISTS ephemerides (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    month_day VARCHAR(5) NOT NULL, -- Formato 'MM-DD', ex: '11-05'
    year INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_ephemerides_month_day ON ephemerides(month_day);

-- ====================================================================
-- POLÍTICAS DE SEGURANÇA (ROW LEVEL SECURITY - RLS)
-- ====================================================================

ALTER TABLE artist_daily_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE track_daily_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE fan_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE ephemerides ENABLE ROW LEVEL SECURITY;

-- Leitura pública para tabelas informativas
CREATE POLICY "Public Read artist_daily_stats" ON artist_daily_stats FOR SELECT USING (true);
CREATE POLICY "Public Read tracks" ON tracks FOR SELECT USING (true);
CREATE POLICY "Public Read track_daily_metrics" ON track_daily_metrics FOR SELECT USING (true);
CREATE POLICY "Public Read milestones" ON milestones FOR SELECT USING (true);
CREATE POLICY "Public Read ephemerides" ON ephemerides FOR SELECT USING (true);
CREATE POLICY "Public Read fan_messages" ON fan_messages FOR SELECT USING (is_approved = true);

-- Inserção pública de mensagens de fãs (com moderação automática)
CREATE POLICY "Public Insert fan_messages" ON fan_messages FOR INSERT WITH CHECK (true);

-- ====================================================================
-- VIEWS CONVENIENTES
-- ====================================================================

-- View com o Top 10 mais recente de cada plataforma
CREATE OR REPLACE VIEW v_top_tracks_latest AS
WITH latest_date AS (
    SELECT MAX(date) AS max_date FROM track_daily_metrics
)
SELECT 
    m.id AS metric_id,
    m.date,
    t.id AS track_id,
    t.title,
    t.album_name,
    t.era,
    t.cover_url,
    t.spotify_id,
    t.youtube_video_id,
    m.spotify_daily_streams,
    m.spotify_total_streams,
    m.spotify_chart_position,
    m.spotify_chart_delta,
    m.youtube_daily_views,
    m.youtube_total_views,
    m.youtube_chart_position,
    m.deezer_rank
FROM track_daily_metrics m
JOIN tracks t ON t.id = m.track_id
JOIN latest_date ld ON m.date = ld.max_date;
