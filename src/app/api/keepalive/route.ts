import { NextResponse } from "next/server";
import { supabase, supabaseAdmin } from "@/lib/supabase";
import { getBrazilDateTimeParts, syncLiveDailyData } from "@/lib/liveCollector";

export const dynamic = "force-dynamic";

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
    const { dateStr: todayBRT, hour: hourBRT } = getBrazilDateTimeParts();

    let syncedToday = false;
    let effectiveDate = latestDate;
    let syncDetails: Record<string, any> | undefined;

    // Respeita a janela diária das 15:00 BRT: coleta automaticamente uma vez por dia quando passar das 15h
    if (
      hourBRT >= 15 &&
      (!latestDate || latestDate < todayBRT) &&
      supabaseAdmin &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
    ) {
      const result = await syncLiveDailyData(supabaseAdmin, { targetDate: todayBRT });
      syncedToday = true;
      effectiveDate = result.date;
      syncDetails = {
        spotifyUpdated: result.spotifyUpdated,
        youtubeUpdated: result.youtubeUpdated,
        tracksUpdated: result.tracksUpdated,
        milestonesUpdated: result.milestonesUpdated,
      };
    }

    const durationMs = Date.now() - startTime;

    return NextResponse.json({
      success: true,
      status: "active",
      message: syncedToday
        ? "Supabase ativo e dados diários sincronizados (Spotify + Kworb + YouTube)!"
        : "Supabase mantido ativo com sucesso!",
      syncedToday,
      currentHourBRT: hourBRT,
      nextSyncWindow: "15:00 BRT",
      durationMs,
      latestDate: effectiveDate,
      ...(syncDetails ? { syncDetails } : {}),
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
