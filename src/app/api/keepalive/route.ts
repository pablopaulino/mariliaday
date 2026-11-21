import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const startTime = Date.now();

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

    const durationMs = Date.now() - startTime;

    return NextResponse.json({
      success: true,
      status: "active",
      message: "Supabase mantido ativo com sucesso!",
      durationMs,
      latestDate: data?.[0]?.date || null,
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
