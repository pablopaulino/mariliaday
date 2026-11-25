"use client";

import { useState } from "react";
import { Milestone } from "@/types";
import { formatCompactNumber, formatDatePT, calculateDaysRemaining } from "@/lib/utils";
import { Trophy, Flame, Play } from "lucide-react";
import { MutiraoModal } from "./MutiraoModal";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { useAudioPlayer, PREVIEW_TRACKS_CATALOG } from "@/context/AudioPlayerContext";

interface MilestonesListProps {
  milestones: Milestone[];
}

export function MilestonesList({ milestones }: MilestonesListProps) {
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  const [filterPlatform, setFilterPlatform] = useState<"all" | "spotify" | "youtube">("all");
  const { playTrack } = useAudioPlayer();

  const getTrackCover = (title?: string, fallbackUrl?: string) => {
    const slug = (title || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    const catalogHit = PREVIEW_TRACKS_CATALOG[slug];
    if (catalogHit?.artworkUrl) return catalogHit.artworkUrl;
    if (fallbackUrl && !fallbackUrl.includes("i.scdn.co")) return fallbackUrl;
    return PREVIEW_TRACKS_CATALOG["leao"].artworkUrl;
  };

  const filtered = milestones.filter((m) => {
    if (filterPlatform === "all") return true;
    return m.platform === filterPlatform;
  });

  return (
    <>
      <div className="space-y-6">
        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 p-1 rounded-xl bg-zinc-900 border border-zinc-800 text-xs">
            <button
              onClick={() => setFilterPlatform("all")}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                filterPlatform === "all" ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" : "text-zinc-400 hover:text-white"
              }`}
            >
              Todos ({milestones.length})
            </button>
            <button
              onClick={() => setFilterPlatform("spotify")}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                filterPlatform === "spotify" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "text-zinc-400 hover:text-white"
              }`}
            >
              Spotify
            </button>
            <button
              onClick={() => setFilterPlatform("youtube")}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                filterPlatform === "youtube" ? "bg-rose-500/20 text-rose-400 border border-rose-500/30" : "text-zinc-400 hover:text-white"
              }`}
            >
              YouTube
            </button>
          </div>

          <span className="text-xs text-zinc-400 font-mono">
            Projeções calculadas com base na média móvel do Supabase
          </span>
        </div>

        {/* Milestones Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((ms) => {
            const percentage = Math.min(100, (ms.current_value / ms.target_value) * 100);
            const remaining = Math.max(0, ms.target_value - ms.current_value);
            const daysLeft = calculateDaysRemaining(ms.estimated_completion_date);
            const isSpotify = ms.platform === "spotify";

            return (
              <div
                key={ms.id}
                className="rounded-2xl border border-white/10 bg-zinc-900/60 backdrop-blur-xl p-6 hover:border-amber-500/40 transition-all flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="space-y-4">
                  {/* Top row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                          isSpotify
                            ? "bg-[#1DB954]/15 text-[#1DB954] border border-[#1DB954]/30"
                            : "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                        }`}
                      >
                        {isSpotify ? "Spotify" : "YouTube"}
                      </span>
                      <span className="text-xs font-semibold text-zinc-400">
                        Meta: <strong className="text-white font-mono">{formatCompactNumber(ms.target_value)}</strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-mono font-bold text-amber-400">
                      <Trophy className="h-3.5 w-3.5" />
                      <span>{percentage.toFixed(1)}%</span>
                    </div>
                  </div>

                  {/* Track info */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="relative h-14 w-14 shrink-0 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-md">
                        <ImageWithFallback
                          src={getTrackCover(ms.track?.title, ms.track?.cover_url)}
                          alt={ms.track?.title || "Capa"}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                          sizes="56px"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors truncate">
                          {ms.track?.title}
                        </h4>
                        <p className="text-xs text-zinc-400 truncate">{ms.track?.album_name}</p>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        playTrack({
                          id: ms.track?.title || ms.track_id,
                          title: ms.track?.title || "Música Oficial",
                          artist: "Marília Mendonça",
                          album: ms.track?.album_name,
                          coverUrl: getTrackCover(ms.track?.title, ms.track?.cover_url),
                          era: ms.track?.era,
                        })
                      }
                      className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 hover:bg-amber-500 hover:text-black transition-all shrink-0"
                      title="Ouvir prévia de 30s"
                    >
                      <Play className="h-4 w-4 fill-current" />
                    </button>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1.5 pt-2">
                    <div className="h-2.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-amber-500 via-gold-500 to-amber-300 transition-all duration-700"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                      <span>Atual: {formatCompactNumber(ms.current_value)}</span>
                      <span>Faltam: {formatCompactNumber(remaining)}</span>
                    </div>
                  </div>

                  {/* Projeção */}
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-zinc-800/60 text-xs">
                    <div>
                      <span className="text-zinc-500 block">Média Diária:</span>
                      <span className="font-mono font-semibold text-zinc-200">
                        +{formatCompactNumber(ms.daily_average)}/dia
                      </span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block">Previsão Oficial:</span>
                      <span className="font-mono font-semibold text-amber-300">
                        {daysLeft > 0 ? `~${daysLeft} dias (${formatDatePT(ms.estimated_completion_date)})` : "Hoje!"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Mutirão Button */}
                <div className="pt-5">
                  <button
                    onClick={() => setSelectedMilestone(ms)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold transition-all"
                  >
                    <Flame className="h-4 w-4 text-amber-400" />
                    <span>Compartilhar Mutirão (#FocoNoStream)</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <MutiraoModal
        milestone={selectedMilestone}
        onClose={() => setSelectedMilestone(null)}
      />
    </>
  );
}
