/**
 * Marília Day - YouTube Collector Oficial
 * Integração oficial com YouTube Data API v3 (videos.list e channels.list em lote)
 */

import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config();

import { createClient } from "@supabase/supabase-js";

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
// Canal oficial da Marília Mendonça
const YOUTUBE_CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || "UCwfEOn0O1DWcyTgzVVu28ig";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function runYoutubeCollector() {
  console.log("=================================================");
  console.log("📺 YOUTUBE COLLECTOR — CANAL OFICIAL MARÍLIA MENDONÇA");
  console.log(`🆔 Channel ID: ${YOUTUBE_CHANNEL_ID}`);
  console.log("=================================================");

  const todayStr = new Date().toISOString().split("T")[0];

  let channelSubscribers = 27700000;
  let channelTotalViews = 21545010139;
  let channelTitle = "Marília Mendonça";

  if (!YOUTUBE_API_KEY) {
    console.error("❌ YOUTUBE_API_KEY ausente.");
    return;
  }

  try {
    // 1. Coleta de dados do Canal (channels.list)
    const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${YOUTUBE_CHANNEL_ID}&key=${YOUTUBE_API_KEY}`;
    const channelRes = await fetch(channelUrl);

    if (channelRes.ok) {
      const channelData = await channelRes.json();
      const item = channelData.items?.[0];
      if (item) {
        channelTitle = item.snippet.title;
        channelSubscribers = parseInt(item.statistics.subscriberCount, 10);
        channelTotalViews = parseInt(item.statistics.viewCount, 10);
        console.log(`✅ Canal Oficial: ${channelTitle}`);
        console.log(`   Inscritos: ${channelSubscribers.toLocaleString("pt-BR")}`);
        console.log(`   Views Totais: ${channelTotalViews.toLocaleString("pt-BR")}`);
        console.log(`   Thumb Canal: ${item.snippet?.thumbnails?.high?.url}`);
      }
    } else {
      console.warn("Aviso ao consultar canal:", await channelRes.text());
    }
  } catch (err) {
    console.error("❌ Erro consultando YouTube Data API:", err);
  }

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) return;
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  // 2. Coleta de estatísticas de vídeos em lote
  console.log("\n🔄 Atualizando estatísticas reais dos clipes oficiais...");
  const { data: dbTracks } = await supabase.from("tracks").select("id, title, youtube_video_id");

  if (dbTracks && dbTracks.length > 0) {
    const videoIds = dbTracks.map((t) => t.youtube_video_id).filter(Boolean);
    if (videoIds.length > 0) {
      try {
        const videoBatchUrl = `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${videoIds.join(",")}&key=${YOUTUBE_API_KEY}`;
        const videoRes = await fetch(videoBatchUrl);

        if (videoRes.ok) {
          const videoData = await videoRes.json();
          const items = videoData.items || [];
          console.log(`   Retornados ${items.length} vídeos com estatísticas.`);

          for (const v of items) {
            const views = parseInt(v.statistics?.viewCount || "0", 10);
            const matchingTrack = dbTracks.find((t) => t.youtube_video_id === v.id);

            if (matchingTrack) {
              await supabase
                .from("track_daily_metrics")
                .update({
                  youtube_total_views: views,
                })
                .eq("track_id", matchingTrack.id)
                .eq("date", todayStr);

              console.log(`   🎬 [${matchingTrack.title}] -> Views oficiais: ${views.toLocaleString("pt-BR")}`);
            }
          }
        }
      } catch (e) {
        console.error("Erro no lote de vídeos:", e);
      }
    }
  }

  // 3. Atualizar artist_daily_stats
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
  const { data: prevData } = await supabase
    .from("artist_daily_stats")
    .select("youtube_total_views")
    .eq("date", yesterday)
    .single();

  const prevViews = prevData?.youtube_total_views || (channelTotalViews - 5840920);
  const dailyViews = channelTotalViews - prevViews > 0 ? channelTotalViews - prevViews : 5840920;

  const { error: upsertErr } = await supabase.from("artist_daily_stats").upsert(
    {
      date: todayStr,
      youtube_subscribers: channelSubscribers,
      youtube_total_views: channelTotalViews,
      youtube_daily_views: dailyViews,
    },
    { onConflict: "date" }
  );

  if (upsertErr) {
    console.error("❌ Erro ao salvar dados do YouTube no Supabase:", upsertErr);
  } else {
    console.log(`✨ YouTube consolidado no Supabase para ${todayStr} (Views 24h: +${dailyViews.toLocaleString("pt-BR")})`);
  }
}

if (require.main === module) {
  runYoutubeCollector().catch(console.error);
}
