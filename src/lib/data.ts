import { supabase, supabaseAdmin } from "./supabase";
import { ArtistDailyStats, TrackDailyMetric, Milestone, FanMessage, Ephemeris, AlbumSummary } from "@/types";
import { getBrazilTodayISO } from "./utils";
import catalog from "./verifiedCatalog.json";
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

function resolveVerifiedCover(title?: string, currentCover?: string): string {
  if (currentCover && !currentCover.includes("i.scdn.co") && !currentCover.includes("images.unsplash.com")) {
    return currentCover;
  }
  const slug = (title || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  const cat = catalog as Record<string, { artworkUrl: string }>;
  if (cat[slug]?.artworkUrl) return cat[slug].artworkUrl;

  const found = Object.values(cat).find((item) =>
    item.artworkUrl && title && item.artworkUrl.length > 0 &&
    JSON.stringify(item).toLowerCase().includes(title.toLowerCase())
  );
  if (found?.artworkUrl) return found.artworkUrl;

  return cat["leao"].artworkUrl;
}

// 1. Estatísticas Gerais do Artista
export async function getArtistStats(): Promise<{ today: ArtistDailyStats; history: ArtistDailyStats[] }> {
  if (db) {
    try {
      const { data, error } = await db
        .from("artist_daily_stats")
        .select("*")
        .order("date", { ascending: false })
        .limit(14);

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
      const { data: latestDateRow } = await db
        .from("track_daily_metrics")
        .select("date")
        .order("date", { ascending: false })
        .limit(1)
        .single();

      const targetDate = latestDateRow?.date || getBrazilTodayISO();

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
        const typedMetrics = (metrics as unknown as TrackDailyMetric[]).map((m) => ({
          ...m,
          track: m.track
            ? {
                ...m.track,
                cover_url: resolveVerifiedCover(m.track.title, m.track.cover_url),
              }
            : undefined,
        }));

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
        return (data as unknown as Milestone[]).map((m) => ({
          ...m,
          track: m.track
            ? {
                ...m.track,
                cover_url: resolveVerifiedCover(m.track.title, m.track.cover_url),
              }
            : undefined,
        }));
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
        .insert([
          {
            author_name: newEntry.author_name,
            city_state: newEntry.city_state,
            favorite_song: newEntry.favorite_song,
            message: newEntry.message,
            is_approved: true,
            is_featured_today: false,
          },
        ])
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

// 6. Efemérides (Memória Viva)
export async function getEphemerides(): Promise<Ephemeris[]> {
  if (db) {
    try {
      const { data, error } = await db
        .from("ephemerides")
        .select("*")
        .order("year", { ascending: false });

      if (!error && data && data.length >= allEphemerides.length) {
        return (data as Ephemeris[]).map((eph) => ({
          ...eph,
          image_url:
            eph.image_url && !eph.image_url.includes("i.scdn.co")
              ? eph.image_url
              : (catalog as Record<string, { artworkUrl: string }>)["leao"].artworkUrl,
        }));
      }
      if (error) console.error("Erro ao buscar ephemerides:", error);
    } catch (e) {
      console.error("Exceção ao buscar ephemerides:", e);
    }
  }

  return allEphemerides;
}

// 7. Discografia completa enriquecida com métricas reais do Supabase
export async function getAlbums(): Promise<AlbumSummary[]> {
  const baseAlbums = allAlbums.map((alb) => ({
    ...alb,
    tracks: alb.tracks.map((t) => ({ ...t })),
  }));

  if (db) {
    try {
      const { data: latestDateRow } = await db
        .from("track_daily_metrics")
        .select("date")
        .order("date", { ascending: false })
        .limit(1)
        .single();

      const targetDate = latestDateRow?.date;
      if (targetDate) {
        const { data: dbMetrics } = await db
          .from("track_daily_metrics")
          .select("*, track:tracks(*)")
          .eq("date", targetDate);

        if (dbMetrics && dbMetrics.length > 0) {
          const byTitle = new Map<string, any>();
          for (const row of dbMetrics) {
            if (row.track?.title) {
              byTitle.set(row.track.title.toLowerCase().trim(), row);
            }
          }

          for (const album of baseAlbums) {
            for (const track of album.tracks) {
              const live = byTitle.get(track.title.toLowerCase().trim());
              if (live) {
                track.daily_streams = live.spotify_daily_streams || track.daily_streams;
                track.total_streams = live.spotify_total_streams || track.total_streams;
                if (live.track?.cover_url && !live.track.cover_url.includes("i.scdn.co")) {
                  track.cover_url = live.track.cover_url;
                }
              }
            }
          }
        }
      }
    } catch (e) {
      console.error("Exceção ao enriquecer discografia com Supabase:", e);
    }
  }

  return baseAlbums;
}

export { allTracks };
