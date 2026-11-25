"use client";

import { useState } from "react";
import { Swords, Play } from "lucide-react";
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
    youtubeViews: 505065879,
    dailyStreams: 542190,
    allTimeRank: 1,
    certification: "10× Diamante 💎 (Pro-Música Brasil)",
    nextMilestone: { target: 600000000, daysRemaining: 3 },
    coverUrl: PREVIEW_TRACKS_CATALOG["leao"]?.artworkUrl || "/marilia-crown-banner.jpg",
  },
  {
    id: "infiel",
    title: "Infiel",
    album: "Marília Mendonça: Ao Vivo",
    year: 2016,
    spotifyStreams: 442190800,
    youtubeViews: 685193227,
    dailyStreams: 448100,
    allTimeRank: 2,
    certification: "2× Diamante 💎💎 (Histórico Múltiplo)",
    nextMilestone: { target: 700000000, daysRemaining: 34 },
    coverUrl: PREVIEW_TRACKS_CATALOG["infiel"]?.artworkUrl || "/marilia-crown-banner.jpg",
  },
  {
    id: "graveto",
    title: "Graveto",
    album: "Todos os Cantos",
    year: 2020,
    spotifyStreams: 402840900,
    youtubeViews: 450515160,
    dailyStreams: 445200,
    allTimeRank: 3,
    certification: "Diamante & Platina Múltipla 💎",
    nextMilestone: { target: 450000000, daysRemaining: 106 },
    coverUrl: PREVIEW_TRACKS_CATALOG["graveto"]?.artworkUrl || "/marilia-crown-banner.jpg",
  },
  {
    id: "de-quem-e-a-culpa",
    title: "De Quem É a Culpa?",
    album: "Realidade (Ao Vivo em Manaus)",
    year: 2017,
    spotifyStreams: 395120400,
    youtubeViews: 609830589,
    dailyStreams: 372400,
    allTimeRank: 4,
    certification: "Diamante & Platina Múltipla 💎",
    nextMilestone: { target: 650000000, daysRemaining: 120 },
    coverUrl: PREVIEW_TRACKS_CATALOG["de-quem-e-a-culpa"]?.artworkUrl || "/marilia-crown-banner.jpg",
  },
  {
    id: "supera",
    title: "Supera",
    album: "Todos os Cantos, Vol. 3",
    year: 2019,
    spotifyStreams: 374820100,
    youtubeViews: 587539192,
    dailyStreams: 429100,
    allTimeRank: 5,
    certification: "8× Diamante 💎 (Pro-Música Brasil)",
    nextMilestone: { target: 600000000, daysRemaining: 36 },
    coverUrl: PREVIEW_TRACKS_CATALOG["supera"]?.artworkUrl || "/marilia-crown-banner.jpg",
  },
  {
    id: "ciumeira",
    title: "Ciumeira",
    album: "Todos os Cantos, Vol. 1",
    year: 2018,
    spotifyStreams: 388900100,
    youtubeViews: 556677836,
    dailyStreams: 338100,
    allTimeRank: 6,
    certification: "2× Diamante 💎💎",
    nextMilestone: { target: 600000000, daysRemaining: 139 },
    coverUrl: PREVIEW_TRACKS_CATALOG["ciumeira"]?.artworkUrl || "/marilia-crown-banner.jpg",
  },
  {
    id: "todo-mundo-vai-sofrer",
    title: "Todo Mundo Vai Sofrer",
    album: "Todos os Cantos, Vol. 2",
    year: 2019,
    spotifyStreams: 391240100,
    youtubeViews: 539962938,
    dailyStreams: 389400,
    allTimeRank: 7,
    certification: "Diamante 💎 (Álbum 4× Diamante)",
    nextMilestone: { target: 550000000, daysRemaining: 30 },
    coverUrl: PREVIEW_TRACKS_CATALOG["todo-mundo-vai-sofrer"]?.artworkUrl || "/marilia-crown-banner.jpg",
  },
  {
    id: "eu-sei-de-cor",
    title: "Eu Sei De Cor",
    album: "Agora É Que São Elas (Acústico)",
    year: 2016,
    spotifyStreams: 342980100,
    youtubeViews: 404379662,
    dailyStreams: 324100,
    allTimeRank: 8,
    certification: "Diamante & Platina 💎",
    nextMilestone: { target: 450000000, daysRemaining: 142 },
    coverUrl: PREVIEW_TRACKS_CATALOG["eu-sei-de-cor"]?.artworkUrl || "/marilia-crown-banner.jpg",
  },
  {
    id: "esqueca-me-se-for-capaz",
    title: "Esqueça-Me Se For Capaz",
    album: "Festa das Patroas 35%",
    year: 2021,
    spotifyStreams: 364920100,
    youtubeViews: 209096862,
    dailyStreams: 351200,
    allTimeRank: 9,
    certification: "3× Diamante (Álbum Patroas 35%) 💎",
    nextMilestone: { target: 400000000, daysRemaining: 100 },
    coverUrl: PREVIEW_TRACKS_CATALOG["esqueca-me-se-for-capaz"]?.artworkUrl || "/marilia-crown-banner.jpg",
  },
  {
    id: "troca-de-calcada",
    title: "Troca de Calçada",
    album: "Nosso Amor Envelheceu",
    year: 2021,
    spotifyStreams: 274810900,
    youtubeViews: 423390031,
    dailyStreams: 302400,
    allTimeRank: 10,
    certification: "Diamante & Platina 💎",
    nextMilestone: { target: 450000000, daysRemaining: 94 },
    coverUrl: PREVIEW_TRACKS_CATALOG["troca-de-calcada"]?.artworkUrl || "/marilia-crown-banner.jpg",
  },
  {
    id: "amante-nao-tem-lar",
    title: "Amante Não Tem Lar",
    album: "Realidade (Ao Vivo em Manaus)",
    year: 2017,
    spotifyStreams: 238000000,
    youtubeViews: 392000000,
    dailyStreams: 245000,
    allTimeRank: 11,
    certification: "2× Diamante 💎💎",
    nextMilestone: { target: 400000000, daysRemaining: 33 },
    coverUrl: PREVIEW_TRACKS_CATALOG["amante-nao-tem-lar"]?.artworkUrl || "/marilia-crown-banner.jpg",
  },
  {
    id: "te-amo-demais",
    title: "Te Amo Demais",
    album: "Decretos Reais",
    year: 2022,
    spotifyStreams: 284000000,
    youtubeViews: 248000000,
    dailyStreams: 295000,
    allTimeRank: 12,
    certification: "2× Diamante (Álbum Decretos Reais) 💎",
    nextMilestone: { target: 300000000, daysRemaining: 55 },
    coverUrl: PREVIEW_TRACKS_CATALOG["te-amo-demais"]?.artworkUrl || "/marilia-crown-banner.jpg",
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
              {COMPARABLE_TRACKS.length} Clássicos
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Compare o histórico, streams, views, certificações e previsões entre quaisquer dois clássicos da Rainha.
          </p>
        </div>

        <div className="text-xs font-mono text-zinc-400 bg-black/40 px-3.5 py-1.5 rounded-full border border-white/10 self-start sm:self-auto">
          Dados Spotify + YouTube 24h
        </div>
      </div>

      {/* Selectors Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        {[
          { track: track1, total: total1, playing: isTrack1Playing },
          { track: track2, total: total2, playing: isTrack2Playing },
        ].map(({ track, total, playing }) => (
          <div
            key={track.id}
            className="p-6 rounded-3xl bg-black/40 border border-white/10 space-y-4 hover:border-amber-500/30 transition-all relative"
          >
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-white/10 shadow-lg bg-zinc-900">
                <ImageWithFallback src={track.coverUrl} alt={track.title} fill className="object-cover" sizes="64px" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold uppercase">
                    #{track.allTimeRank} Histórico
                  </span>
                  <span className="text-xs text-zinc-400">{track.year}</span>
                </div>
                <h3 className="text-xl font-black text-white tracking-tight truncate mt-0.5">{track.title}</h3>
                <p className="text-xs text-zinc-400 truncate">{track.album}</p>
              </div>

              <button
                onClick={() => handlePlay(track)}
                className="p-3 rounded-2xl bg-gradient-to-r from-amber-500 to-gold-500 text-black hover:brightness-110 active:scale-95 transition-all shadow-md shadow-amber-500/20 shrink-0"
                title="Ouvir prévia de 30s"
              >
                <Play className={`w-4 h-4 fill-black ${playing ? "animate-pulse" : ""}`} />
              </button>
            </div>

            <div className="pt-2 border-t border-white/5 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">Total Combinado:</span>
                <strong className="text-lg font-mono font-extrabold text-gold-gradient">
                  {formatCompactNumber(total)}
                </strong>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">Spotify Global:</span>
                <strong className="font-mono text-white">{formatNumber(track.spotifyStreams)}</strong>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">YouTube Oficial:</span>
                <strong className="font-mono text-white">{formatNumber(track.youtubeViews)}</strong>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">Ritmo 24h:</span>
                <strong className="font-mono text-emerald-400 font-bold">+{formatNumber(track.dailyStreams)}/dia</strong>
              </div>

              <div className="flex items-center justify-between text-xs gap-2">
                <span className="text-zinc-400 shrink-0">Certificação:</span>
                <span className="text-zinc-200 font-medium text-right truncate">{track.certification}</span>
              </div>

              <div className="p-3 rounded-xl bg-zinc-800/40 border border-white/5 text-xs flex items-center justify-between">
                <span className="text-zinc-400">Próxima Marca ({formatCompactNumber(track.nextMilestone.target)}):</span>
                <span className="font-mono font-bold text-amber-300">~{track.nextMilestone.daysRemaining} dias</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
