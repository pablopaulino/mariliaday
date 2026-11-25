import { NextResponse } from "next/server";
import { supabase, supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

function getBrazilDateTimeParts(): { dateStr: string; hour: number } {
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-CA", { timeZone: "America/Sao_Paulo" });
  const hourStr = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Sao_Paulo",
    hour: "2-digit",
    hour12: false,
  }).format(now);
  return { dateStr, hour: parseInt(hourStr, 10) || 0 };
}

async function syncDailyIfNeeded(latestDate: string | null): Promise<{ synced: boolean; targetDate: string | null }> {
  const { dateStr: todayBRT, hour: hourBRT } = getBrazilDateTimeParts();

  // Respeita a janela das 15:00 BRT (apenas cria o registro do dia após 15h no horário de Brasília)
  if (hourBRT < 15) {
    return { synced: false, targetDate: latestDate };
  }

  if (latestDate && latestDate >= todayBRT) {
    return { synced: false, targetDate: latestDate };
  }

  const db = supabaseAdmin;
  const ytKey = process.env.YOUTUBE_API_KEY;
  const ytChannelId = process.env.YOUTUBE_CHANNEL_ID || "UCwfEOn0O1DWcyTgzVVu28ig";
  const spArtistId = process.env.SPOTIFY_ARTIST_ID || "1yR65psqiazQpeM79CcGh8";
  const spClientId = process.env.SPOTIFY_CLIENT_ID;
  const spClientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!db || !process.env.SUPABASE_SERVICE_ROLE_KEY || !ytKey) {
    return { synced: false, targetDate: latestDate };
  }

  try {
    // 1. Buscar snapshot anterior de artista
    const { data: prevArtist } = await db
      .from("artist_daily_stats")
      .select("*")
      .lt("date", todayBRT)
      .order("date", { ascending: false })
      .limit(1)
      .single();

    let subscribers = prevArtist?.youtube_subscribers || 27700000;
    let totalViews = prevArtist?.youtube_total_views || 21609361488;
    let dailyViews = prevArtist?.youtube_daily_views || 5840920;

    // 2. Coletar canal oficial do YouTube
    const chRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${ytChannelId}&key=${ytKey}`
    );
    if (chRes.ok) {
      const chJson = await chRes.json();
      const stats = chJson.items?.[0]?.statistics;
      if (stats) {
        subscribers = parseInt(stats.subscriberCount, 10) || subscribers;
        const liveTotal = parseInt(stats.viewCount, 10);
        if (liveTotal > 0) {
          if (prevArtist?.youtube_total_views && liveTotal > prevArtist.youtube_total_views && prevArtist.date) {
            const d1 = new Date(`${prevArtist.date}T12:00:00Z`).getTime();
            const d2 = new Date(`${todayBRT}T12:00:00Z`).getTime();
            const daysDiff = Math.max(1, Math.round((d2 - d1) / 86400000));
            dailyViews = Math.round((liveTotal - prevArtist.youtube_total_views) / daysDiff);
          }
          totalViews = liveTotal;
        }
      }
    }

    // 3. Tentar seguidores do Spotify (se disponível)
    let followers = prevArtist?.spotify_followers || 41614259;
    if (spClientId && spClientSecret) {
      try {
        const auth = Buffer.from(`${spClientId}:${spClientSecret}`).toString("base64");
        const tkRes = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ grant_type: "client_credentials" }),
        });
        if (tkRes.ok) {
          const tk = await tkRes.json();
          const artRes = await fetch(`https://api.spotify.com/v1/artists/${spArtistId}`, {
            headers: { Authorization: `Bearer ${tk.access_token}` },
          });
          if (artRes.ok) {
            const art = await artRes.json();
            if (art.followers?.total > 0) followers = art.followers.total;
          }
        }
      } catch {
        // Ignora erro não-crítico do Spotify
      }
    }

    await db.from("artist_daily_stats").upsert(
      {
        date: todayBRT,
        spotify_monthly_listeners: prevArtist?.spotify_monthly_listeners || 13942810,
        spotify_listeners_delta: prevArtist?.spotify_listeners_delta || 34910,
        spotify_followers: followers,
        spotify_daily_streams: prevArtist?.spotify_daily_streams || 6942180,
        youtube_subscribers: subscribers,
        youtube_total_views: totalViews,
        youtube_daily_views: dailyViews,
      },
      { onConflict: "date" }
    );

    // 4. Atualizar track_daily_metrics com views reais dos vídeos
    const { data: latestTrackDateRow } = await db
      .from("track_daily_metrics")
      .select("date")
      .order("date", { ascending: false })
      .limit(1)
      .single();

    const prevMetricDate = latestTrackDateRow?.date;
    const { data: prevMetrics } = prevMetricDate
      ? await db.from("track_daily_metrics").select("*").eq("date", prevMetricDate)
      : { data: [] as any[] };
    const { data: dbTracks } = await db.from("tracks").select("id, youtube_video_id");

    if (dbTracks && dbTracks.length > 0 && prevMetricDate !== todayBRT) {
      const prevByTrack = new Map((prevMetrics || []).map((m: any) => [m.track_id, m]));
      const videoIds = dbTracks.map((t: any) => t.youtube_video_id).filter(Boolean);
      const ytMap = new Map<string, number>();

      if (videoIds.length > 0) {
        const vRes = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds.slice(0, 50).join(",")}&key=${ytKey}`
        );
        if (vRes.ok) {
          const vData = await vRes.json();
          for (const v of vData.items || []) {
            ytMap.set(v.id, parseInt(v.statistics?.viewCount || "0", 10));
          }
        }
      }

      const d1 = prevMetricDate ? new Date(`${prevMetricDate}T12:00:00Z`).getTime() : Date.now() - 86400000;
      const d2 = new Date(`${todayBRT}T12:00:00Z`).getTime();
      const daysDiff = Math.max(1, Math.round((d2 - d1) / 86400000));

      for (const t of dbTracks) {
        const prev = prevByTrack.get(t.id);
        const liveV = t.youtube_video_id ? ytMap.get(t.youtube_video_id) : undefined;
        if (!prev && !liveV) continue;

        let ytDaily = prev?.youtube_daily_views || 250000;
        if (liveV && prev?.youtube_total_views && liveV > prev.youtube_total_views) {
          const computed = Math.round((liveV - prev.youtube_total_views) / daysDiff);
          if (computed > 0 && computed < 2_000_000) {
            ytDaily = computed;
          }
        }

        await db.from("track_daily_metrics").upsert(
          {
            track_id: t.id,
            date: todayBRT,
            spotify_total_streams: prev?.spotify_total_streams || 250000000,
            spotify_daily_streams: prev?.spotify_daily_streams || 300000,
            spotify_chart_position: prev?.spotify_chart_position || null,
            spotify_chart_delta: prev?.spotify_chart_delta || 0,
            youtube_total_views: liveV || prev?.youtube_total_views || 0,
            youtube_daily_views: ytDaily,
            youtube_chart_position: prev?.youtube_chart_position || null,
            deezer_rank: prev?.deezer_rank || null,
            apple_music_rank: prev?.apple_music_rank || null,
          },
          { onConflict: "track_id,date" }
        );
      }
    }

    return { synced: true, targetDate: todayBRT };
  } catch (err) {
    console.warn("[Keep-Alive] Aviso ao sincronizar coleta automática:", err);
    return { synced: false, targetDate: latestDate };
  }
}

export async function GET() {
  try {
    const startTime = Date.now();

    if (!supabase) {
      return NextResponse.json(
        {
          success: false,
          error: "Supabase não configurado ou variáveis de ambiente ausentes",
          timestamp: new Date().toISOString(),
        },
        { status: 503 }
      );
    }

    // Consulta rápida no Supabase para manter o banco acordado
    const { data, error } = await supabase
      .from("artist_daily_stats")
      .select("date, spotify_monthly_listeners, spotify_followers")
      .order("date", { ascending: false })
      .limit(1);

    if (error) {
      console.error("[Keep-Alive] Erro ao consultar Supabase:", error);
      return NextResponse.json(
        {
          success: false,
          error: error.message,
          timestamp: new Date().toISOString(),
        },
        { status: 500 }
      );
    }

    const latestDate = data?.[0]?.date || null;
    const syncResult = await syncDailyIfNeeded(latestDate);
    const durationMs = Date.now() - startTime;

    return NextResponse.json({
      success: true,
      status: "active",
      message: syncResult.synced
        ? "Supabase ativo e métricas diárias sincronizadas via YouTube API!"
        : "Supabase mantido ativo com sucesso!",
      syncedToday: syncResult.synced,
      durationMs,
      latestDate: syncResult.targetDate,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error("[Keep-Alive] Exceção crítica:", err);
    return NextResponse.json(
      {
        success: false,
        error: err.message || "Erro interno",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
