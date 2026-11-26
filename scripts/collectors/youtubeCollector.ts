/**
 * Marília Day - YouTube Collector Oficial
 * Delega ao syncLiveDailyData compartilhado para manter YouTube, Spotify e deltas sempre consistentes
 */

import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config();

import { createClient } from "@supabase/supabase-js";
import { getEffectiveBrazilDateISO, syncLiveDailyData } from "../../src/lib/liveCollector";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function runYoutubeCollector(targetDateOverride?: string) {
  console.log("=================================================");
  console.log("📺 YOUTUBE COLLECTOR — CANAL OFICIAL MARÍLIA MENDONÇA");
  console.log("=================================================");

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) return;
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });

  const targetDate = targetDateOverride || getEffectiveBrazilDateISO();
  const result = await syncLiveDailyData(supabase, { targetDate });

  console.log(`✨ YouTube consolidado para ${result.date} (BRT):`);
  console.log(`   • Inscritos: ${result.artistStats.youtube_subscribers.toLocaleString("pt-BR")}`);
  console.log(`   • Views Totais: ${result.artistStats.youtube_total_views.toLocaleString("pt-BR")}`);
  console.log(`   • Views 24h: +${result.artistStats.youtube_daily_views.toLocaleString("pt-BR")}`);
}

if (require.main === module) {
  runYoutubeCollector().catch(console.error);
}
