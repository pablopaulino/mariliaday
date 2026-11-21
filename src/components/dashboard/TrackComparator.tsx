"use client";

import { useState } from "react";
import { Swords, Play, Trophy, Sparkles, TrendingUp, Music2 } from "lucide-react";
import { formatCompactNumber, formatNumber } from "@/lib/utils";
import { useAudioPlayer, PREVIEW_TRACKS_CATALOG } from "@/context/AudioPlayerContext";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

interface TrackCompareItem {
  id: string;
  title: string;
  album: string;
  year: number;
  spotifyStreams: number;
  youtubeViews: number;
  dailyStreams: number;
  allTimeRank: number;
  certification: string;
  nextMilestone: { target: number; daysRemaining: number };
  coverUrl: string;
}

const COMPARABLE_TRACKS: TrackCompareItem[] = [
  {
    id: "leao",
    title: "Leão",
    album: "Decretos Reais, Vol. 2",
    year: 2022,
    spotifyStreams: 598410200,
    youtubeViews: 504268788,
    dailyStreams: 542190,
    allTimeRank: 1,
    certification: "Diamante Triplo 💎💎💎",
    nextMilestone: { target: 600000000, daysRemaining: 3 },
    coverUrl: PREVIEW_TRACKS_CATALOG["leao"]?.artworkUrl || "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/ed/f6/a7/edf6a74f-15fa-1b0e-f172-6c99841d1c32/7891430726072.jpg/600x600bb.jpg",
  },
  {
    id: "infiel",
    title: "Infiel",
    album: "Marília Mendonça: Ao Vivo",
    year: 2016,
    spotifyStreams: 442190800,
    youtubeViews: 684902498,
    dailyStreams: 448100,
    allTimeRank: 2,
    certification: "Diamante Quádruplo 💎💎💎💎",
    nextMilestone: { target: 700000000, daysRemaining: 34 },
    coverUrl: PREVIEW_TRACKS_CATALOG["infiel"]?.artworkUrl || "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/1e/68/40/1e684061-025d-60a4-28d6-16cb4e0b37b7/7891430399023.jpg/600x600bb.jpg",
  },
  {
    id: "graveto",
    title: "Graveto",
    album: "Todos os Cantos",
    year: 2020,
    spotifyStreams: 402840900,
    youtubeViews: 450224153,
    dailyStreams: 445200,
    allTimeRank: 3,
    certification: "Diamante Duplo 💎💎",
    nextMilestone: { target: 450000000, daysRemaining: 106 },
    coverUrl: PREVIEW_TRACKS_CATALOG["graveto"]?.artworkUrl || "https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/39/6f/f2/396ff221-0d64-8631-f465-04008eecd687/7891430449575.jpg/600x600bb.jpg",
  },
  {
    id: "de-quem-e-a-culpa",
    title: "De Quem É a Culpa?",
    album: "Realidade (Ao Vivo)",
    year: 2017,
    spotifyStreams: 395120400,
    youtubeViews: 608602094,
    dailyStreams: 334900,
    allTimeRank: 4,
    certification: "Diamante Triplo 💎💎💎",
    nextMilestone: { target: 650000000, daysRemaining: 124 },
    coverUrl: PREVIEW_TRACKS_CATALOG["de-quem-e-a-culpa"]?.artworkUrl || "https://is1-ssl.mzstatic.com/image/thumb/Music111/v4/0f/a4/be/0fa4be68-1e48-15f0-f1c0-fb5022b98564/7891430141875.jpg/600x600bb.jpg",
  },
  {
    id: "ciumeira",
    title: "Ciumeira",
    album: "Todos os Cantos",
    year: 2018,
    spotifyStreams: 388900100,
    youtubeViews: 556136137,
    dailyStreams: 312000,
    allTimeRank: 5,
    certification: "Diamante Duplo 💎💎",
    nextMilestone: { target: 600000000, daysRemaining: 141 },
    coverUrl: PREVIEW_TRACKS_CATALOG["ciumeira"]?.artworkUrl || "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/75/06/e3/7506e3f1-0bdb-1c7c-22a0-52f3d8026750/7891430355579.jpg/600x600bb.jpg",
  },
  {
    id: "supera",
    title: "Supera",
    album: "Todos os Cantos",
    year: 2019,
    spotifyStreams: 374820100,
    youtubeViews: 586453937,
    dailyStreams: 352100,
    allTimeRank: 6,
    certification: "Diamante Duplo 💎💎",
    nextMilestone: { target: 600000000, daysRemaining: 39 },
    coverUrl: PREVIEW_TRACKS_CATALOG["supera"]?.artworkUrl || "https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/28/88/8a/28888ad9-7027-56d0-2094-66c5c8e91021/7891430413873.jpg/600x600bb.jpg",
  },
  {
    id: "todo-mundo-vai-sofrer",
    title: "Todo Mundo Vai Sofrer",
    album: "Todos os Cantos",
    year: 2019,
    spotifyStreams: 368140900,
    youtubeViews: 539660283,
    dailyStreams: 320400,
    allTimeRank: 7,
    certification: "Diamante Duplo 💎💎",
    nextMilestone: { target: 550000000, daysRemaining: 32 },
    coverUrl: PREVIEW_TRACKS_CATALOG["todo-mundo-vai-sofrer"]?.artworkUrl || "https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/02/50/58/025058b0-d15e-041e-7b27-f88705e44c14/7891430385873.jpg/600x600bb.jpg",
  },
  {
    id: "eu-sei-de-cor",
    title: "Eu Sei De Cor",
    album: "Agora É Que São Elas",
    year: 2016,
    spotifyStreams: 342980100,
    youtubeViews: 403470187,
    dailyStreams: 298100,
    allTimeRank: 8,
    certification: "Diamante 💎",
    nextMilestone: { target: 450000000, daysRemaining: 156 },
    coverUrl: PREVIEW_TRACKS_CATALOG["eu-sei-de-cor"]?.artworkUrl || "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/9f/1b/6b/9f1b6b0e-3ff7-d727-f79a-46d35e59d8f9/7891430121877.jpg/600x600bb.jpg",
  },
];

export function TrackComparator() {
  const [track1Id, setTrack1Id] = useState<string>("leao");
  const [track2Id, setTrack2Id] = useState<string>("infiel");
  const { playTrack, currentTrack, isPlaying } = useAudioPlayer();

  const track1 = COMPARABLE_TRACKS.find((t) => t.id === track1Id) || COMPARABLE_TRACKS[0];
  const track2 = COMPARABLE_TRACKS.find((t) => t.id === track2Id) || COMPARABLE_TRACKS[1];

  const handlePlay = (track: TrackCompareItem) => {
    const catalogItem = PREVIEW_TRACKS_CATALOG[track.id];
    playTrack({
      id: track.id,
      title: track.title,
      artist: "Marília Mendonça",
      album: track.album,
      coverUrl: track.coverUrl,
      audioUrl: catalogItem?.previewUrl || catalogItem?.audioUrl || "",
      era: track.album,
    });
  };

  const isTrack1Playing = currentTrack?.id === track1.id && isPlaying;
  const isTrack2Playing = currentTrack?.id === track2.id && isPlaying;

  // Comparison totals
  const total1 = track1.spotifyStreams + track1.youtubeViews;
  const total2 = track2.spotifyStreams + track2.youtubeViews;

  return (
    <div className="rounded-3xl border border-white/10 bg-zinc-900/60 backdrop-blur-xl p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-zinc-800/80">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Swords className="h-3.5 w-3.5" />
            <span>Métrica x Métrica</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Comparador de Sucessos</span>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
              Duelo de Gigantes
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Compare o histórico, streams, views e estimativas entre quaisquer dois clássicos da Rainha.
          </p>
        </div>

        <div className="text-xs font-mono text-zinc-400 bg-black/40 px-3.5 py-1.5 rounded-full border border-white/10 self-start sm:self-auto">
          Dados Spotify + YouTube 24h
        </div>
      </div>

      {/* Selectors Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Track 1 Dropdown */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <span>Faixa 1 (Lado A)</span>
          </label>
          <select
            value={track1Id}
            onChange={(e) => setTrack1Id(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-black/60 border border-white/15 text-white font-bold text-sm focus:outline-none focus:border-amber-400 transition-all cursor-pointer"
          >
            {COMPARABLE_TRACKS.map((t) => (
              <option key={t.id} value={t.id} disabled={t.id === track2Id}>
                {t.title} ({t.album} - {t.year})
              </option>
            ))}
          </select>
        </div>

        {/* Track 2 Dropdown */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <span>Faixa 2 (Lado B)</span>
          </label>
          <select
            value={track2Id}
            onChange={(e) => setTrack2Id(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-black/60 border border-white/15 text-white font-bold text-sm focus:outline-none focus:border-amber-400 transition-all cursor-pointer"
          >
            {COMPARABLE_TRACKS.map((t) => (
              <option key={t.id} value={t.id} disabled={t.id === track1Id}>
                {t.title} ({t.album} - {t.year})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Side-by-Side Visual Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {/* Track 1 Card */}
        <div className="p-6 rounded-3xl bg-black/40 border border-white/10 space-y-4 hover:border-amber-500/30 transition-all relative">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-white/10 shadow-lg bg-zinc-900">
              <ImageWithFallback src={track1.coverUrl} alt={track1.title} fill className="object-cover" sizes="64px" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold uppercase">
                  #{track1.allTimeRank} Histórico
                </span>
                <span className="text-xs text-zinc-400">{track1.year}</span>
              </div>
              <h3 className="text-xl font-black text-white tracking-tight truncate mt-0.5">{track1.title}</h3>
              <p className="text-xs text-zinc-400 truncate">{track1.album}</p>
            </div>

            <button
              onClick={() => handlePlay(track1)}
              className="p-3 rounded-2xl bg-gradient-to-r from-amber-500 to-gold-500 text-black hover:brightness-110 active:scale-95 transition-all shadow-md shadow-amber-500/20 shrink-0"
              title="Ouvir prévia de 30s"
            >
              <Play className={`w-4 h-4 fill-black ${isTrack1Playing ? "animate-pulse" : ""}`} />
            </button>
          </div>

          <div className="pt-2 border-t border-white/5 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-400">Total Combinado:</span>
              <strong className="text-lg font-mono font-extrabold text-gold-gradient">
                {formatCompactNumber(total1)}
              </strong>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-400">Spotify Global:</span>
              <strong className="font-mono text-white">{formatNumber(track1.spotifyStreams)}</strong>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-400">YouTube Oficial:</span>
              <strong className="font-mono text-white">{formatNumber(track1.youtubeViews)}</strong>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-400">Ritmo 24h:</span>
              <strong className="font-mono text-emerald-400 font-bold">+{formatNumber(track1.dailyStreams)}/dia</strong>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-400">Certificação:</span>
              <span className="text-zinc-200 font-medium">{track1.certification}</span>
            </div>

            <div className="p-3 rounded-xl bg-zinc-800/40 border border-white/5 text-xs flex items-center justify-between">
              <span className="text-zinc-400">Próxima Marca ({formatCompactNumber(track1.nextMilestone.target)}):</span>
              <span className="font-mono font-bold text-amber-300">~{track1.nextMilestone.daysRemaining} dias</span>
            </div>
          </div>
        </div>

        {/* Track 2 Card */}
        <div className="p-6 rounded-3xl bg-black/40 border border-white/10 space-y-4 hover:border-amber-500/30 transition-all relative">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-white/10 shadow-lg bg-zinc-900">
              <ImageWithFallback src={track2.coverUrl} alt={track2.title} fill className="object-cover" sizes="64px" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold uppercase">
                  #{track2.allTimeRank} Histórico
                </span>
                <span className="text-xs text-zinc-400">{track2.year}</span>
              </div>
              <h3 className="text-xl font-black text-white tracking-tight truncate mt-0.5">{track2.title}</h3>
              <p className="text-xs text-zinc-400 truncate">{track2.album}</p>
            </div>

            <button
              onClick={() => handlePlay(track2)}
              className="p-3 rounded-2xl bg-gradient-to-r from-amber-500 to-gold-500 text-black hover:brightness-110 active:scale-95 transition-all shadow-md shadow-amber-500/20 shrink-0"
              title="Ouvir prévia de 30s"
            >
              <Play className={`w-4 h-4 fill-black ${isTrack2Playing ? "animate-pulse" : ""}`} />
            </button>
          </div>

          <div className="pt-2 border-t border-white/5 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-400">Total Combinado:</span>
              <strong className="text-lg font-mono font-extrabold text-gold-gradient">
                {formatCompactNumber(total2)}
              </strong>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-400">Spotify Global:</span>
              <strong className="font-mono text-white">{formatNumber(track2.spotifyStreams)}</strong>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-400">YouTube Oficial:</span>
              <strong className="font-mono text-white">{formatNumber(track2.youtubeViews)}</strong>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-400">Ritmo 24h:</span>
              <strong className="font-mono text-emerald-400 font-bold">+{formatNumber(track2.dailyStreams)}/dia</strong>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-400">Certificação:</span>
              <span className="text-zinc-200 font-medium">{track2.certification}</span>
            </div>

            <div className="p-3 rounded-xl bg-zinc-800/40 border border-white/5 text-xs flex items-center justify-between">
              <span className="text-zinc-400">Próxima Marca ({formatCompactNumber(track2.nextMilestone.target)}):</span>
              <span className="font-mono font-bold text-amber-300">~{track2.nextMilestone.daysRemaining} dias</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
