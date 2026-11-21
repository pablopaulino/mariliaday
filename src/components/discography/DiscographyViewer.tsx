"use client";

import { useState } from "react";
import { AlbumSummary } from "@/types";
import { formatCompactNumber } from "@/lib/utils";
import { ChevronDown, ChevronUp, Music } from "lucide-react";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

interface DiscographyViewerProps {
  albums: AlbumSummary[];
}

export function DiscographyViewer({ albums }: DiscographyViewerProps) {
  const [selectedEra, setSelectedEra] = useState<string>("all");
  const [expandedAlbums, setExpandedAlbums] = useState<Record<string, boolean>>({
    "Todos os Cantos, Vol. 1": true,
    "Decretos Reais": true,
  });

  const eras = [
    { id: "all", label: "Todas as Eras" },
    { id: "Todos os Cantos (2019)", label: "Todos os Cantos" },
    { id: "Decretos Reais (2022-2023)", label: "Decretos Reais" },
    { id: "Patroas (2020-2021)", label: "Patroas 35%" },
    { id: "Realidade (2017)", label: "Realidade" },
    { id: "Ao Vivo (2016)", label: "Ao Vivo (2016)" },
  ];

  const filteredAlbums = albums.filter((album) => {
    if (selectedEra === "all") return true;
    return album.era === selectedEra;
  });

  const toggleExpand = (albumName: string) => {
    setExpandedAlbums((prev) => ({
      ...prev,
      [albumName]: !prev[albumName],
    }));
  };

  return (
    <div className="space-y-8">
      {/* Era filter bar */}
      <div className="flex flex-wrap items-center gap-2 pb-2">
        {eras.map((era) => {
          const isActive = selectedEra === era.id;
          return (
            <button
              key={era.id}
              onClick={() => setSelectedEra(era.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                isActive
                  ? "bg-gradient-to-r from-amber-500 to-gold-500 text-black shadow-lg shadow-amber-500/20"
                  : "bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800"
              }`}
            >
              {era.label}
            </button>
          );
        })}
      </div>

      {/* Albums list */}
      <div className="space-y-6">
        {filteredAlbums.map((album) => {
          const isExpanded = expandedAlbums[album.name] ?? false;

          return (
            <div
              key={album.name}
              className="rounded-3xl border border-white/10 bg-zinc-900/60 backdrop-blur-xl overflow-hidden transition-all"
            >
              {/* Album Card Header */}
              <div
                onClick={() => toggleExpand(album.name)}
                className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer hover:bg-zinc-800/20 transition-colors"
              >
                <div className="flex items-center gap-5">
                  <div className="relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 rounded-2xl overflow-hidden border border-zinc-700 shadow-xl bg-zinc-900">
                    <ImageWithFallback
                      src={album.cover_url || "https://i.scdn.co/image/ab67616d0000b273680345244dcab673f3a1389d"}
                      alt={album.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                      {album.era} • {album.release_year}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                      {album.name}
                    </h3>
                    <p className="text-xs text-zinc-400">
                      {album.track_count} faixas oficiais catalogadas
                    </p>
                  </div>
                </div>

                {/* KPI metrics for Album */}
                <div className="flex items-center justify-between md:justify-end gap-6 sm:gap-8 pt-4 md:pt-0 border-t md:border-t-0 border-zinc-800">
                  <div>
                    <span className="text-[11px] text-zinc-400 block">Total Spotify:</span>
                    <span className="text-base sm:text-lg font-bold font-mono text-emerald-400">
                      {formatCompactNumber(album.total_spotify_streams)}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-zinc-400 block">Total YouTube:</span>
                    <span className="text-base sm:text-lg font-bold font-mono text-rose-400">
                      {formatCompactNumber(album.total_youtube_views)}
                    </span>
                  </div>
                  <button
                    className="p-2 rounded-xl bg-zinc-800/80 text-zinc-300 hover:text-white"
                    aria-label="Expandir Faixas"
                  >
                    {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Expanded Tracks List */}
              {isExpanded && (
                <div className="border-t border-zinc-800/80 bg-zinc-950/40 p-6 sm:p-8 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-1.5">
                    <Music className="h-4 w-4 text-amber-400" />
                    <span>Desempenho Individual das Faixas</span>
                  </h4>

                  <div className="divide-y divide-zinc-800/50">
                    {album.tracks.map((track, i) => (
                      <div
                        key={track.id || i}
                        className="py-3 flex items-center justify-between gap-4 hover:bg-zinc-900/40 px-3 rounded-xl transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="font-mono text-xs font-bold text-zinc-400 w-5 text-center">
                            {i + 1}
                          </span>
                          <div className="truncate">
                            <p className="font-semibold text-sm text-white truncate">
                              {track.title}
                            </p>
                            <p className="text-[11px] text-zinc-400">
                              Lançamento: {track.release_date}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-6 font-mono text-right shrink-0">
                          <div>
                            <span className="text-xs font-bold text-emerald-400 block">
                              +{formatCompactNumber(track.daily_streams)}
                            </span>
                            <span className="text-[10px] text-zinc-400">
                              24h streams
                            </span>
                          </div>
                          <div className="hidden sm:block">
                            <span className="text-xs font-semibold text-white block">
                              {formatCompactNumber(track.total_streams)}
                            </span>
                            <span className="text-[10px] text-zinc-400">
                              Total acumulado
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
