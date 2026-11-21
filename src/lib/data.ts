import { supabase, supabaseAdmin, isSupabaseConfigured } from "./supabase";
import { ArtistDailyStats, TrackDailyMetric, Milestone, FanMessage, Ephemeris, AlbumSummary, Track } from "@/types";
import {
  initialArtistStats,
  historicalArtistStats,
  allTracks,
  todayMetrics,
  allMilestones,
  allFanMessages,
  allEphemerides,
  allAlbums,
} from "./mockData";

const db = supabaseAdmin || supabase;

// 1. Estatísticas Gerais do Artista
export async function getArtistStats(): Promise<{ today: ArtistDailyStats; history: ArtistDailyStats[] }> {
  if (db) {
    try {
      const { data, error } = await db
        .from("artist_daily_stats")
        .select("*")
        .order("date", { ascending: false })
        .limit(7);

      if (!error && data && data.length > 0) {
        return {
          today: data[0] as ArtistDailyStats,
          history: (data as ArtistDailyStats[]).reverse(),
        };
      }
      if (error) console.error("Erro ao buscar artist_daily_stats no Supabase:", error);
    } catch (e) {
      console.error("Exceção ao consultar Supabase:", e);
    }
  }

  return {
    today: initialArtistStats,
    history: historicalArtistStats,
  };
}

// 2. Rankings Diários (Top 10 Spotify & YouTube)
export async function getDailyTopMetrics(): Promise<{ spotifyTop: TrackDailyMetric[]; youtubeTop: TrackDailyMetric[] }> {
  if (db) {
    try {
      // Pega a data mais recente
      const { data: latestDateRow } = await db
        .from("track_daily_metrics")
        .select("date")
        .order("date", { ascending: false })
        .limit(1)
        .single();

      const targetDate = latestDateRow?.date || new Date().toISOString().split("T")[0];

      const { data: metrics, error } = await db
        .from("track_daily_metrics")
        .select(`
          id,
          track_id,
          date,
          spotify_total_streams,
          spotify_daily_streams,
          spotify_chart_position,
          spotify_chart_delta,
          youtube_total_views,
          youtube_daily_views,
          youtube_chart_position,
          deezer_rank,
          apple_music_rank,
          track:tracks(
            id,
            spotify_id,
            youtube_video_id,
            title,
            album_name,
            era,
            cover_url,
            release_date,
            duration_ms
          )
        `)
        .eq("date", targetDate);

      if (!error && metrics && metrics.length > 0) {
        // Ordena para Top Spotify e Top YouTube
        const typedMetrics = metrics as unknown as TrackDailyMetric[];
        const spotifyTop = [...typedMetrics].sort(
          (a, b) => (b.spotify_daily_streams || 0) - (a.spotify_daily_streams || 0)
        );
        const youtubeTop = [...typedMetrics].sort(
          (a, b) => (b.youtube_daily_views || 0) - (a.youtube_daily_views || 0)
        );

        return { spotifyTop, youtubeTop };
      }
      if (error) console.error("Erro ao buscar track_daily_metrics:", error);
    } catch (e) {
      console.error("Exceção ao buscar métricas diárias:", e);
    }
  }

  const spotifyTop = [...todayMetrics].sort((a, b) => b.spotify_daily_streams - a.spotify_daily_streams);
  const youtubeTop = [...todayMetrics].sort((a, b) => b.youtube_daily_views - a.youtube_daily_views);
  return { spotifyTop, youtubeTop };
}

// 3. Radar de Metas & Marcos
export async function getMilestones(): Promise<Milestone[]> {
  if (db) {
    try {
      const { data, error } = await db
        .from("milestones")
        .select(`
          id,
          track_id,
          platform,
          target_value,
          current_value,
          daily_average,
          estimated_completion_date,
          is_completed,
          completion_date,
          track:tracks(
            id,
            spotify_id,
            youtube_video_id,
            title,
            album_name,
            era,
            cover_url,
            release_date
          )
        `)
        .eq("is_completed", false)
        .order("target_value", { ascending: true });

      if (!error && data && data.length > 0) {
        return data as unknown as Milestone[];
      }
      if (error) console.error("Erro ao buscar milestones:", error);
    } catch (e) {
      console.error("Exceção ao buscar milestones:", e);
    }
  }

  return allMilestones;
}

// 4. Cartas e Homenagens dos Fãs
export async function getFanMessages(): Promise<FanMessage[]> {
  if (db) {
    try {
      const { data, error } = await db
        .from("fan_messages")
        .select("*")
        .eq("is_approved", true)
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        return data as FanMessage[];
      }
      if (error) console.error("Erro ao buscar fan_messages:", error);
    } catch (e) {
      console.error("Exceção ao buscar fan_messages:", e);
    }
  }

  return allFanMessages;
}

// 5. Enviar Nova Carta de Fã
export async function postFanMessage(msg: {
  author_name: string;
  city_state: string;
  favorite_song: string;
  message: string;
}): Promise<{ success: boolean; message: string; data?: FanMessage }> {
  if (!msg.author_name.trim() || !msg.message.trim() || !msg.city_state.trim()) {
    return { success: false, message: "Por favor, preencha todos os campos obrigatórios." };
  }

  const newEntry: FanMessage = {
    id: `msg-${Date.now()}`,
    author_name: msg.author_name.trim(),
    city_state: msg.city_state.trim(),
    favorite_song: msg.favorite_song.trim() || "Leão",
    message: msg.message.trim(),
    is_approved: true,
    is_featured_today: false,
    created_at: new Date().toISOString(),
  };

  if (db) {
    try {
      const { data, error } = await db
        .from("fan_messages")
        .insert([{
          author_name: newEntry.author_name,
          city_state: newEntry.city_state,
          favorite_song: newEntry.favorite_song,
          message: newEntry.message,
          is_approved: true,
          is_featured_today: false,
        }])
        .select()
        .single();

      if (!error && data) {
        return { success: true, message: "Sua carta foi eternizada no Mural da Rainha!", data };
      }
      if (error) console.error("Erro ao salvar mensagem no Supabase:", error);
    } catch (e) {
      console.error("Exceção ao inserir mensagem:", e);
    }
  }

  return { success: true, message: "Sua mensagem foi publicada no Mural da Rainha!", data: newEntry };
}

// 6. Efemérides
export async function getEphemerides(): Promise<Ephemeris[]> {
  if (db) {
    try {
      const { data, error } = await db.from("ephemerides").select("*");
      if (!error && data && data.length > 0) {
        return data as Ephemeris[];
      }
      if (error) console.error("Erro ao buscar ephemerides:", error);
    } catch (e) {
      console.error("Exceção ao buscar ephemerides:", e);
    }
  }

  return allEphemerides;
}

// 7. Discografia e Eras agregadas dinamicamente
export async function getAlbums(): Promise<AlbumSummary[]> {
  if (db) {
    try {
      const { data: dbTracks } = await db.from("tracks").select("*, track_daily_metrics(*)");

      if (dbTracks && dbTracks.length > 0) {
        // Agrupa por álbum
        const albumMap: Record<string, AlbumSummary> = {};

        for (const t of dbTracks) {
          const albumKey = t.album_name || "Singles & Parcerias";
          const latestMetric = t.track_daily_metrics?.[0] || {};
          const daily = latestMetric.spotify_daily_streams || 300000;
          const total = latestMetric.spotify_total_streams || 250000000;

          if (!albumMap[albumKey]) {
            albumMap[albumKey] = {
              name: albumKey,
              era: t.era || "Singles & Parcerias",
              release_year: t.release_date ? parseInt(t.release_date.split("-")[0], 10) : 2019,
              cover_url: t.cover_url,
              total_spotify_streams: 0,
              total_youtube_views: 0,
              track_count: 0,
              tracks: [],
            };
          }

          albumMap[albumKey].total_spotify_streams += total;
          albumMap[albumKey].total_youtube_views += latestMetric.youtube_total_views || 300000000;
          albumMap[albumKey].track_count += 1;
          albumMap[albumKey].tracks.push({
            id: t.id,
            spotify_id: t.spotify_id,
            youtube_video_id: t.youtube_video_id,
            title: t.title,
            album_name: t.album_name,
            era: t.era,
            cover_url: t.cover_url,
            release_date: t.release_date,
            duration_ms: t.duration_ms,
            daily_streams: daily,
            total_streams: total,
          });
        }

        return Object.values(albumMap);
      }
    } catch (e) {
      console.error("Exceção ao agregar discografia:", e);
    }
  }

  return allAlbums;
}
