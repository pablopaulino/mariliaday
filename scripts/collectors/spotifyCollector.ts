/**
 * Marília Day - Spotify Collector Oficial
 * Utiliza o módulo compartilhado liveCollector (Spotify SSR + Kworb + YouTube + Milestones)
 */

import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config();

import { createClient } from "@supabase/supabase-js";
import { getEffectiveBrazilDateISO, syncLiveDailyData } from "../../src/lib/liveCollector";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function runSpotifyCollector(targetDateOverride?: string) {
  console.log("=================================================");
  console.log("🎵 SPOTIFY + KWORB COLLECTOR — MARÍLIA MENDONÇA");
  console.log("=================================================");

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.warn("⚠️ Supabase não configurado. Finalizando.");
    return;
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });

  const targetDate = targetDateOverride || getEffectiveBrazilDateISO();
  const result = await syncLiveDailyData(supabase, {
    targetDate,
    refreshTracksArtwork: true,
  });

  console.log(`✨ Dados ao vivo sincronizados para ${result.date} (BRT):`);
  console.log(`   • Ouvintes Mensais: ${result.artistStats.spotify_monthly_listeners.toLocaleString("pt-BR")} (Delta 24h: ${result.artistStats.spotify_listeners_delta >= 0 ? "+" : ""}${result.artistStats.spotify_listeners_delta.toLocaleString("pt-BR")})`);
  console.log(`   • Seguidores Oficiais: ${result.artistStats.spotify_followers.toLocaleString("pt-BR")}`);
  console.log(`   • Streams Diários (Spotify): ${result.artistStats.spotify_daily_streams.toLocaleString("pt-BR")}`);
  if (result.artistStats.spotify_catalog_total) {
    console.log(`   • Streams Totais no Catálogo: ${result.artistStats.spotify_catalog_total.toLocaleString("pt-BR")}`);
  }
  console.log(`   • YouTube Views: ${result.artistStats.youtube_total_views.toLocaleString("pt-BR")} (+${result.artistStats.youtube_daily_views.toLocaleString("pt-BR")}/dia)`);
  console.log(`   • Faixas atualizadas: ${result.tracksUpdated} | Metas recalculadas: ${result.milestonesUpdated}`);
}

if (require.main === module) {
  runSpotifyCollector().catch(console.error);
}
