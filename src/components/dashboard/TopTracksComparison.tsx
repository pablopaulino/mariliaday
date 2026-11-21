"use client";

import { useState } from "react";
import { TrackDailyMetric } from "@/types";
import { formatNumber, formatCompactNumber } from "@/lib/utils";
import { Flame, PlaySquare, ArrowUp, ArrowDown, Minus } from "lucide-react";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

interface TopTracksComparisonProps {
  spotifyTop: TrackDailyMetric[];
  youtubeTop: TrackDailyMetric[];
}

export function TopTracksComparison({
  spotifyTop,
  youtubeTop,
}: TopTracksComparisonProps) {
  const [activeTab, setActiveTab] = useState<"both" | "spotify" | "youtube">("both");

  return (
    <div className="space-y-6">
      {/* Header e Filtro */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span>Rankings Diários</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium">
              Top 10 Oficial
            </span>
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Músicas e clipes com maior consumo nas últimas 24 horas.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-zinc-900 border border-zinc-800 text-xs">
          <button
            onClick={() => setActiveTab("both")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              activeTab === "both"
                ? "bg-zinc-800 text-white shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Lado a Lado
          </button>
          <button
            onClick={() => setActiveTab("spotify")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              activeTab === "spotify"
                ? "bg-[#1DB954]/20 text-[#1DB954] border border-[#1DB954]/30"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Spotify
          </button>
          <button
            onClick={() => setActiveTab("youtube")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              activeTab === "youtube"
                ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            YouTube
          </button>
        </div>
      </div>

      {/* Grid Lado a Lado */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Table 1: Spotify Top 10 */}
        {(activeTab === "both" || activeTab === "spotify") && (
          <div className="rounded-2xl border border-white/10 bg-zinc-900/60 backdrop-blur-xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-[#1DB954]/10 text-[#1DB954]">
                  <Flame className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Top 10 Spotify Hoje</h3>
                  <p className="text-[11px] text-zinc-400">Streams acumulados nas últimas 24 horas</p>
                </div>
              </div>
              <span className="text-xs font-mono font-semibold text-emerald-400">
                24h Streams
              </span>
            </div>

            <div className="divide-y divide-zinc-800/50">
              {spotifyTop.slice(0, 10).map((row, index) => {
                const delta = row.spotify_chart_delta || 0;
                return (
                  <div
                    key={`sp-${row.track_id || row.id || index}`}
                    className="py-3 flex items-center justify-between gap-3 group hover:bg-zinc-800/30 px-2 rounded-xl transition-colors"
                  >
                    {/* Rank & Delta */}
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-mono text-sm font-bold w-5 text-center text-zinc-300">
                        {index + 1}
                      </span>
                      <div className="w-5 flex justify-center">
                        {delta > 0 && (
                          <span className="flex items-center text-[11px] font-bold text-emerald-400 font-mono">
                            <ArrowUp className="h-3 w-3" />
                            {delta}
                          </span>
                        )}
                        {delta < 0 && (
                          <span className="flex items-center text-[11px] font-bold text-rose-400 font-mono">
                            <ArrowDown className="h-3 w-3" />
                            {Math.abs(delta)}
                          </span>
                        )}
                        {delta === 0 && (
                          <span className="text-zinc-600">
                            <Minus className="h-3 w-3" />
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Cover & Title */}
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-zinc-700/80 bg-zinc-900 shadow-md">
                        <ImageWithFallback
                          src={row.track?.cover_url || "https://i.scdn.co/image/ab67616d0000b273680345244dcab673f3a1389d"}
                          alt={row.track?.title || "Capa"}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                          sizes="44px"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-sm text-white truncate group-hover:text-amber-300 transition-colors">
                          {row.track?.title}
                        </p>
                        <p className="text-[11px] text-zinc-400 truncate">
                          {row.track?.album_name}
                        </p>
                      </div>
                    </div>

                    {/* Stats Numbers */}
                    <div className="text-right shrink-0 font-mono">
                      <div className="text-xs sm:text-sm font-bold text-emerald-400">
                        +{formatNumber(row.spotify_daily_streams)}
                      </div>
                      <div className="text-[10px] text-zinc-400">
                        Total: {formatCompactNumber(row.spotify_total_streams)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Table 2: YouTube Top 10 */}
        {(activeTab === "both" || activeTab === "youtube") && (
          <div className="rounded-2xl border border-white/10 bg-zinc-900/60 backdrop-blur-xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400">
                  <PlaySquare className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Top 10 YouTube Hoje</h3>
                  <p className="text-[11px] text-zinc-400">Visualizações no canal oficial em 24h</p>
                </div>
              </div>
              <span className="text-xs font-mono font-semibold text-rose-400">
                24h Views
              </span>
            </div>

            <div className="divide-y divide-zinc-800/50">
              {youtubeTop.slice(0, 10).map((row, index) => {
                return (
                  <div
                    key={`yt-${row.track_id || row.id || index}`}
                    className="py-3 flex items-center justify-between gap-3 group hover:bg-zinc-800/30 px-2 rounded-xl transition-colors"
                  >
                    {/* Rank */}
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-mono text-sm font-bold w-5 text-center text-zinc-300">
                        {index + 1}
                      </span>
                      <div className="w-5 flex justify-center">
                        <span className="text-zinc-600">
                          <Minus className="h-3 w-3" />
                        </span>
                      </div>
                    </div>

                    {/* Cover & Title */}
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-zinc-700/80 bg-zinc-900 shadow-md">
                        <ImageWithFallback
                          src={row.track?.cover_url || "https://i.scdn.co/image/ab67616d0000b273cbd4edcc2a7def9bb6016094"}
                          alt={row.track?.title || "Capa"}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                          sizes="44px"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-sm text-white truncate group-hover:text-rose-300 transition-colors">
                          {row.track?.title}
                        </p>
                        <p className="text-[11px] text-zinc-400 truncate">
                          {row.track?.album_name}
                        </p>
                      </div>
                    </div>

                    {/* Stats Numbers */}
                    <div className="text-right shrink-0 font-mono">
                      <div className="text-xs sm:text-sm font-bold text-rose-400">
                        +{formatNumber(row.youtube_daily_views)}
                      </div>
                      <div className="text-[10px] text-zinc-400">
                        Total: {formatCompactNumber(row.youtube_total_views)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
