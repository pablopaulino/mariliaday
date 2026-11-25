/**
 * Marília Day - Milestone Calculator Oficial
 * Calcula projeções com base nas métricas reais salvas no Supabase
 */

import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config();

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function runMilestoneCalculator() {
  console.log("=================================================");
  console.log("🎯 MILESTONE CALCULATOR — RADAR DE METAS SUPABASE");
  console.log("=================================================");

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error("❌ Supabase não configurado.");
    return;
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  const { data: milestones, error } = await supabase
    .from("milestones")
    .select("*, track:tracks(id, title)")
    .eq("is_completed", false);

  if (error || !milestones) {
    console.error("❌ Erro ao buscar marcos:", error);
    return;
  }

  console.log(`📊 Recalculando projeções matemáticas para ${milestones.length} metas pendentes...`);

  for (const m of milestones) {
    const { data: recentMetrics } = await supabase
      .from("track_daily_metrics")
      .select("spotify_daily_streams, youtube_daily_views, date")
      .eq("track_id", m.track_id)
      .order("date", { ascending: false })
      .limit(7);

    let dailyAverage = m.daily_average || 350000;

    if (recentMetrics && recentMetrics.length > 0) {
      const sum = recentMetrics.reduce((acc, row) => {
        const val = m.platform === "spotify" ? row.spotify_daily_streams : row.youtube_daily_views;
        return acc + (val || 0);
      }, 0);
      dailyAverage = Math.round(sum / recentMetrics.length);
    }

    const { data: latestTrackMetric } = await supabase
      .from("track_daily_metrics")
      .select("spotify_total_streams, youtube_total_views")
      .eq("track_id", m.track_id)
      .order("date", { ascending: false })
      .limit(1)
      .single();

    const liveCurrent =
      m.platform === "spotify"
        ? latestTrackMetric?.spotify_total_streams || m.current_value
        : latestTrackMetric?.youtube_total_views || m.current_value;

    const remaining = m.target_value - liveCurrent;
    if (remaining <= 0) {
      const todayBRT = new Date().toLocaleDateString("en-CA", { timeZone: "America/Sao_Paulo" });
      await supabase
        .from("milestones")
        .update({
          current_value: liveCurrent,
          is_completed: true,
          completion_date: todayBRT,
          updated_at: new Date().toISOString(),
        })
        .eq("id", m.id);
      console.log(`🎉 MARCO ALCANÇADO: ${m.track?.title} bateu ${m.target_value.toLocaleString("pt-BR")} na plataforma ${m.platform}!`);
    } else {
      const days = Math.ceil(remaining / (dailyAverage > 0 ? dailyAverage : 10000));
      const projectedDate = new Date();
      projectedDate.setDate(projectedDate.getDate() + days);
      const estimatedStr = projectedDate.toLocaleDateString("en-CA", { timeZone: "America/Sao_Paulo" });

      await supabase
        .from("milestones")
        .update({
          current_value: liveCurrent,
          daily_average: dailyAverage,
          estimated_completion_date: estimatedStr,
          updated_at: new Date().toISOString(),
        })
        .eq("id", m.id);

      console.log(`📈 [${m.track?.title}] -> ${m.platform.toUpperCase()} Meta: ${m.target_value.toLocaleString("pt-BR")} | Atual: ${liveCurrent.toLocaleString("pt-BR")} | Faltam: ${remaining.toLocaleString("pt-BR")} (~${days} dias a ${dailyAverage.toLocaleString("pt-BR")}/dia -> ${estimatedStr})`);
    }
  }

  console.log("✨ Todos os marcos foram recalculados com sucesso!");
}

if (require.main === module) {
  runMilestoneCalculator().catch(console.error);
}
