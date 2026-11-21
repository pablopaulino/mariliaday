"use client";

import { useState } from "react";
import { ArtistDailyStats, TrackDailyMetric, FanMessage } from "@/types";
import { formatDatePT, formatCompactNumber, formatNumber } from "@/lib/utils";
import { Sparkles, Download, Flame, PlaySquare, MessageSquareHeart } from "lucide-react";
import { SocialCardModal } from "@/components/cards/SocialCardModal";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

interface DailyCapsuleProps {
  stats: ArtistDailyStats;
  topSpotify: TrackDailyMetric[];
  topYoutube: TrackDailyMetric[];
  featuredMessage?: FanMessage;
}

export function DailyCapsule({
  stats,
  topSpotify,
  topYoutube,
  featuredMessage,
}: DailyCapsuleProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const top3Spotify = topSpotify.slice(0, 3);
  const top1Youtube = topYoutube[0];

  return (
    <>
      <div className="rounded-3xl border border-white/10 bg-zinc-900/60 backdrop-blur-xl p-6 sm:p-8 space-y-6">
        {/* Header da Cápsula */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-zinc-800/80">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Cápsula Diária de Inteligência</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex flex-wrap items-center gap-2">
              <span>Edição Oficial</span>
              <span className="text-amber-400 font-medium text-base sm:text-lg">
                ({formatDatePT(stats.date)})
              </span>
            </h2>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-gold-500 text-black font-bold text-xs sm:text-sm hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-amber-500/20"
          >
            <Download className="h-4 w-4" />
            <span>Baixar Card do Dia (PNG)</span>
          </button>
        </div>

        {/* 3 Colunas de Destaque */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Coluna 1: Top 3 Spotify */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <Flame className="h-4 w-4" />
              <span>Top 3 Spotify Hoje</span>
            </div>
            <div className="space-y-2">
              {top3Spotify.map((item, idx) => (
                <div
                  key={item.track_id || idx}
                  className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/80 border border-zinc-800/80 text-sm"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                        idx === 0
                          ? "bg-amber-400 text-black"
                          : "bg-zinc-800 text-zinc-300"
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <div className="relative h-8 w-8 shrink-0 rounded-md overflow-hidden bg-zinc-800 border border-zinc-700">
                      <ImageWithFallback
                        src={item.track?.cover_url || "https://i.scdn.co/image/ab67616d0000b273680345244dcab673f3a1389d"}
                        alt={item.track?.title || "Capa"}
                        fill
                        className="object-cover"
                        sizes="32px"
                      />
                    </div>
                    <div className="truncate">
                      <p className="font-semibold text-white truncate text-xs sm:text-sm">
                        {item.track?.title}
                      </p>
                      <p className="text-[11px] text-zinc-400 truncate">
                        {item.track?.album_name}
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0 font-mono text-xs pl-2">
                    <span className="text-emerald-400 font-bold">
                      +{formatCompactNumber(item.spotify_daily_streams)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Coluna 2: Clipe #1 YouTube */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-400">
              <PlaySquare className="h-4 w-4" />
              <span>Clipe #1 no YouTube</span>
            </div>
            {top1Youtube && (
              <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800/80 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 shrink-0 rounded-lg overflow-hidden border border-rose-500/30 bg-zinc-800">
                    <ImageWithFallback
                      src={top1Youtube.track?.cover_url || "https://i.scdn.co/image/ab67616d0000b273cbd4edcc2a7def9bb6016094"}
                      alt={top1Youtube.track?.title || "Clipe"}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-white text-sm truncate">
                      {top1Youtube.track?.title}
                    </h4>
                    <p className="text-xs text-zinc-400 truncate">
                      {top1Youtube.track?.album_name}
                    </p>
                  </div>
                </div>
                <div className="pt-2 border-t border-zinc-800/60 flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-400">24h views:</span>
                  <span className="text-rose-400 font-bold">
                    +{formatNumber(top1Youtube.youtube_daily_views)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>Total Acumulado:</span>
                  <span className="text-white font-semibold">
                    {formatCompactNumber(top1Youtube.youtube_total_views)}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Coluna 3: Carta dos Fãs */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
              <MessageSquareHeart className="h-4 w-4" />
              <span>Carta em Destaque</span>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-b from-amber-500/5 to-zinc-900/80 border border-amber-500/20 space-y-3">
              {featuredMessage ? (
                <>
                  <p className="text-xs text-zinc-300 italic leading-relaxed line-clamp-3">
                    &quot;{featuredMessage.message}&quot;
                  </p>
                  <div className="pt-2 border-t border-amber-500/15 flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-amber-300">
                      {featuredMessage.author_name}
                    </span>
                    <span className="text-zinc-400">
                      {featuredMessage.city_state}
                    </span>
                  </div>
                </>
              ) : (
                <p className="text-xs text-zinc-400 italic">
                  &quot;Marília cantou tudo que a gente sentia e não sabia falar. Rainha eterna.&quot;
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <SocialCardModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        stats={stats}
        topSpotify={topSpotify}
        topYoutube={topYoutube}
        featuredMessage={featuredMessage}
      />
    </>
  );
}
