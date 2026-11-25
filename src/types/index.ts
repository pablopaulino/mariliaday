export interface ArtistDailyStats {
  id?: string;
  date: string;
  spotify_monthly_listeners: number;
  spotify_listeners_delta: number;
  spotify_followers: number;
  spotify_daily_streams: number;
  youtube_subscribers: number;
  youtube_total_views: number;
  youtube_daily_views: number;
  created_at?: string;
}

export type MusicEra =
  | "Início & Estreia (2014-2015)"
  | "Ao Vivo (2016)"
  | "Realidade (2017)"
  | "Todos os Cantos (2019)"
  | "Patroas (2020-2021)"
  | "Decretos Reais (2022-2025)"
  | "Manuscritos & Eternidade (2026)"
  | "Singles & Parcerias";

export interface Track {
  id: string;
  spotify_id: string;
  youtube_video_id: string;
  title: string;
  album_name: string;
  era: MusicEra;
  cover_url: string;
  release_date: string;
  duration_ms?: number;
}

export interface TrackDailyMetric {
  id?: string;
  track_id: string;
  date: string;
  spotify_total_streams: number;
  spotify_daily_streams: number;
  spotify_chart_position?: number | null;
  spotify_chart_delta?: number;
  youtube_total_views: number;
  youtube_daily_views: number;
  youtube_chart_position?: number | null;
  deezer_rank?: number | null;
  apple_music_rank?: number | null;
  track?: Track;
}

export interface Milestone {
  id: string;
  track_id: string;
  platform: "spotify" | "youtube" | "deezer";
  target_value: number;
  current_value: number;
  daily_average: number;
  estimated_completion_date: string;
  is_completed: boolean;
  completion_date?: string | null;
  track?: Track;
}

export interface FanMessage {
  id: string;
  author_name: string;
  city_state: string;
  favorite_song: string;
  message: string;
  is_approved: boolean;
  is_featured_today: boolean;
  created_at: string;
}

export interface Ephemeris {
  id: string;
  month_day: string; // 'MM-DD'
  year: number;
  title: string;
  description: string;
  image_url?: string;
}

export interface AlbumSummary {
  name: string;
  era: MusicEra;
  release_year: number;
  release_date?: string;
  album_type?: "ao_vivo" | "colaborativo" | "postumo" | "ep" | "singles";
  certification?: string;
  award?: string;
  description?: string;
  cover_url: string;
  total_spotify_streams: number;
  total_youtube_views: number;
  track_count: number;
  tracks: Array<Track & { daily_streams: number; total_streams: number }>;
}
