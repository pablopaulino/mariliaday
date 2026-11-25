"use client";

import { useState } from "react";
import { AlbumSummary } from "@/types";
import { formatCompactNumber } from "@/lib/utils";
import { ChevronDown, ChevronUp, Music, Play, Trophy, Gem } from "lucide-react";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { useAudioPlayer, PREVIEW_TRACKS_CATALOG } from "@/context/AudioPlayerContext";

interface DiscographyViewerProps {
  albums: AlbumSummary[];
}

export function DiscographyViewer({ albums }: DiscographyViewerProps) {
  const [selectedEra, setSelectedEra] = useState<string>("all");
  const [expandedAlbums, setExpandedAlbums] = useState<Record<string, boolean>>({
    "Manuscritos — Capítulos I e II": true,
    "Decretos Reais (Álbum Completo & Lado B)": true,
    "Todos os Cantos, Vol. 1, 2 e 3": true,
  });
  const { playTrack, currentTrack, isPlaying } = useAudioPlayer();

  const filters = [
    { id: "all", label: `Todos os Projetos (${albums.length})` },
    { id: "ao_vivo", label: "Álbuns ao Vivo" },
    { id: "colaborativo", label: "Patroas (Colaborativos)" },
    { id: "postumo", label: "Póstumos (2022–2026)" },
    { id: "ep", label: "EPs" },
    { id: "singles", label: "Singles & Parcerias" },
  ];

  const filteredAlbums = albums.filter((album) => {
    if (selectedEra === "all") return true;
    return album.album_type === selectedEra || album.era === selectedEra;
  });

  const toggleExpand = (albumName: string) => {
    setExpandedAlbums((prev) => ({
      ...prev,
      [albumName]: !prev[albumName],
    }));
  };

  const getTrackArtwork = (trackTitle: string, trackCover?: string) => {
    const slug = trackTitle
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    const hit =
      PREVIEW_TRACKS_CATALOG[slug] ||
      Object.values(PREVIEW_TRACKS_CATALOG).find((t) =>
        t.title?.toLowerCase().includes(trackTitle.toLowerCase().split(" (")[0])
      );

    if (hit?.artworkUrl) return hit.artworkUrl;
    if (trackCover && !trackCover.includes("i.scdn.co")) return trackCover;
    return PREVIEW_TRACKS_CATALOG["leao"].artworkUrl;
  };

  const handlePlayAlbumTrack = (track: AlbumSummary["tracks"][number], albumName: string) => {
    const slug = track.title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    const hit =
      PREVIEW_TRACKS_CATALOG[slug] ||
      Object.values(PREVIEW_TRACKS_CATALOG).find((t) =>
        t.title?.toLowerCase().includes(track.title.toLowerCase().split(" (")[0])
      );

    playTrack({
      id: track.id || slug,
      title: track.title,
      artist: "Marília Mendonça",
      album: albumName,
      coverUrl: getTrackArtwork(track.title, track.cover_url),
      audioUrl: hit?.previewUrl || PREVIEW_TRACKS_CATALOG["leao"].previewUrl,
      era: track.era,
    });
  };

  return (
    <div className="space-y-8">
      {/* Category / Era filter bar */}
      <div className="flex flex-wrap items-center gap-2 pb-2">
        {filters.map((f) => {
          const isActive = selectedEra === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setSelectedEra(f.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                isActive
                  ? "bg-gradient-to-r from-amber-500 to-gold-500 text-black shadow-lg shadow-amber-500/20"
                  : "bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800"
              }`}
            >
              {f.label}
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
                className="p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 cursor-pointer hover:bg-zinc-800/20 transition-colors"
              >
                <div className="flex items-start sm:items-center gap-5">
                  <div className="relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 rounded-2xl overflow-hidden border border-zinc-700 shadow-xl bg-zinc-900">
                    <ImageWithFallback
                      src={
                        album.cover_url && !album.cover_url.includes("i.scdn.co")
                          ? album.cover_url
                          : PREVIEW_TRACKS_CATALOG["leao"].artworkUrl
                      }
                      alt={album.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                        {album.era} • {album.release_date || album.release_year}
                      </span>
                      {album.award && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                          <Trophy className="w-3 h-3" />
                          {album.award}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                      {album.name}
                    </h3>
                    {album.description && (
                      <p className="text-xs text-zinc-400 max-w-2xl leading-relaxed">
                        {album.description}
                      </p>
                    )}
                    <div className="flex flex-wrap items-center gap-2 pt-0.5">
                      <span className="text-xs text-zinc-400">
                        {album.track_count} faixas no projeto • {album.tracks.length} destaques com prévia
                      </span>
                      {album.certification && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-300 border border-cyan-500/25">
                          <Gem className="w-3 h-3" />
                          {album.certification}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* KPI metrics for Album */}
                <div className="flex items-center justify-between lg:justify-end gap-6 sm:gap-8 pt-4 lg:pt-0 border-t lg:border-t-0 border-zinc-800 shrink-0">
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
                    <span>Faixas em Destaque &amp; Prévia Oficial 30s</span>
                  </h4>

                  <div className="divide-y divide-zinc-800/50">
                    {album.tracks.map((track, i) => {
                      const playingThis = currentTrack?.title === track.title && isPlaying;
                      return (
                        <div
                          key={track.id || i}
                          className="py-3 flex items-center justify-between gap-4 hover:bg-zinc-900/40 px-3 rounded-xl transition-colors"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span className="font-mono text-xs font-bold text-zinc-400 w-5 text-center shrink-0">
                              {i + 1}
                            </span>
                            <div className="relative h-10 w-10 shrink-0 rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900">
                              <ImageWithFallback
                                src={getTrackArtwork(track.title, track.cover_url)}
                                alt={track.title}
                                fill
                                className="object-cover"
                                sizes="40px"
                              />
                            </div>
                            <div className="truncate">
                              <p className="font-semibold text-sm text-white truncate">
                                {track.title}
                              </p>
                              <p className="text-[11px] text-zinc-400">
                                Lançamento: {track.release_date}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 sm:gap-6 font-mono text-right shrink-0">
                            <div className="hidden xs:block">
                              <span className="text-xs font-bold text-emerald-400 block">
                                +{formatCompactNumber(track.daily_streams)}
                              </span>
                              <span className="text-[10px] text-zinc-400">24h streams</span>
                            </div>
                            <div className="hidden sm:block">
                              <span className="text-xs font-semibold text-white block">
                                {formatCompactNumber(track.total_streams)}
                              </span>
                              <span className="text-[10px] text-zinc-400">Total acumulado</span>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePlayAlbumTrack(track, album.name);
                              }}
                              className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 hover:bg-amber-500 hover:text-black transition-all"
                              title={`Ouvir prévia de ${track.title}`}
                            >
                              <Play className={`h-3.5 w-3.5 fill-current ${playingThis ? "animate-pulse" : ""}`} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
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
