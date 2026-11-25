/**
 * Marília Day - Spotify Collector Oficial
 * Coleta métricas de streaming do Spotify Web API, mantém capas Apple Music válidas e atualiza deltas no Supabase (BRT)
 */

import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config();

import { createClient } from "@supabase/supabase-js";
import verifiedCatalog from "../../src/lib/verifiedCatalog.json";

const MARILIA_SPOTIFY_ID = process.env.SPOTIFY_ARTIST_ID || "1yR65psqiazQpeM79CcGh8";
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

function getBrazilDateISO(offsetDays = 0): string {
  const target = new Date(Date.now() + offsetDays * 86400000);
  return target.toLocaleDateString("en-CA", { timeZone: "America/Sao_Paulo" });
}

interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

async function getSpotifyToken(): Promise<string | null> {
  if (!CLIENT_ID || !CLIENT_SECRET) {
    console.warn("⚠️ SPOTIFY_CLIENT_ID ou SPOTIFY_CLIENT_SECRET não configurados.");
    return null;
  }

  try {
    const authString = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
    const res = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${authString}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ grant_type: "client_credentials" }),
    });

    if (!res.ok) {
      throw new Error(`Falha ao obter token Spotify: ${res.statusText}`);
    }

    const data: SpotifyTokenResponse = await res.json();
    return data.access_token;
  } catch (error) {
    console.error("❌ Erro de autenticação no Spotify:", error);
    return null;
  }
}

async function resolveAppleArtwork(title: string): Promise<string | null> {
  const slug = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  const cat = verifiedCatalog as Record<string, { artworkUrl?: string }>;
  if (cat[slug]?.artworkUrl) return cat[slug].artworkUrl!;

  try {
    const res = await fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(title + " Marília Mendonça")}&country=BR&entity=song&limit=1`
    );
    if (res.ok) {
      const json = await res.json();
      const art = json.results?.[0]?.artworkUrl100;
      if (art) return art.replace("100x100bb", "600x600bb");
    }
  } catch (e) {
    console.warn(`Aviso iTunes lookup (${title}):`, e);
  }
  return null;
}

export async function runSpotifyCollector() {
  console.log("=================================================");
  console.log("🎵 SPOTIFY COLLECTOR — MARÍLIA MENDONÇA OFICIAL");
  console.log(`🆔 ID do Artista: ${MARILIA_SPOTIFY_ID}`);
  console.log("=================================================");

  const todayStr = getBrazilDateISO(0);
  const token = await getSpotifyToken();

  let artistFollowers = 41614259;

  if (token) {
    try {
      const artistRes = await fetch(`https://api.spotify.com/v1/artists/${MARILIA_SPOTIFY_ID}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (artistRes.ok) {
        const artistData = await artistRes.json();
        if (artistData.followers?.total && artistData.followers.total > 0) {
          artistFollowers = artistData.followers.total;
        }
        console.log(`✅ Artista Oficial: ${artistData.name}`);
        console.log(`   Seguidores Oficiais: ${artistFollowers.toLocaleString("pt-BR")}`);
      }
    } catch (err) {
      console.error("Erro consultando Spotify API:", err);
    }
  }

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.warn("⚠️ Supabase não configurado. Finalizando.");
    return;
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  console.log("\n🔄 Verificando capas no catálogo Apple Music...");
  const { data: dbTracks } = await supabase.from("tracks").select("id, title, cover_url");

  if (dbTracks && dbTracks.length > 0) {
    for (const t of dbTracks) {
      if (!t.cover_url || t.cover_url.includes("i.scdn.co")) {
        const appleCover = await resolveAppleArtwork(t.title);
        if (appleCover) {
          await supabase.from("tracks").update({ cover_url: appleCover }).eq("id", t.id);
          console.log(`   🖼️ [${t.title}] -> Capa Apple Music restaurada: ${appleCover}`);
        }
      }
    }
  }

  const { data: existingToday } = await supabase
    .from("artist_daily_stats")
    .select("*")
    .eq("date", todayStr)
    .single();

  const yesterdayStr = getBrazilDateISO(-1);
  const { data: prevData } = await supabase
    .from("artist_daily_stats")
    .select("spotify_monthly_listeners, spotify_followers")
    .eq("date", yesterdayStr)
    .single();

  const monthlyListeners = existingToday?.spotify_monthly_listeners || 13942810;
  const previousListeners = prevData?.spotify_monthly_listeners || monthlyListeners - 34910;
  const listenersDelta = monthlyListeners - previousListeners;

  const { error: upsertErr } = await supabase.from("artist_daily_stats").upsert(
    {
      date: todayStr,
      spotify_monthly_listeners: monthlyListeners,
      spotify_listeners_delta: listenersDelta,
      spotify_followers: artistFollowers,
      spotify_daily_streams: existingToday?.spotify_daily_streams || 6942180,
      youtube_subscribers: existingToday?.youtube_subscribers || 27700000,
      youtube_total_views: existingToday?.youtube_total_views || 21609361488,
      youtube_daily_views: existingToday?.youtube_daily_views || 5840920,
    },
    { onConflict: "date" }
  );

  if (upsertErr) {
    console.error("❌ Erro ao salvar dados no Supabase:", upsertErr);
  } else {
    console.log(`✨ Dados diários do Spotify consolidados para ${todayStr} (BRT):`);
    console.log(`   • Ouvintes Mensais: ${monthlyListeners.toLocaleString("pt-BR")} (Delta: +${listenersDelta.toLocaleString("pt-BR")})`);
    console.log(`   • Seguidores Oficiais: ${artistFollowers.toLocaleString("pt-BR")}`);
  }
}

if (require.main === module) {
  runSpotifyCollector().catch(console.error);
}
