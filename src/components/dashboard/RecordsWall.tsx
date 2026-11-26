"use client";

import { ArtistDailyStats } from "@/types";
import { formatCompactNumber } from "@/lib/utils";
import { Trophy, Zap, Radio, Eye, Users, Music, Mic2, Gem, Award, MapPin } from "lucide-react";

interface RecordsWallProps {
  stats?: ArtistDailyStats;
}

interface RecordItem {
  icon: React.ReactNode;
  value: string;
  label: string;
  detail: string;
  accentColor: string;
}

const GRAMMY_HISTORY = [
  { year: "2017", album: "Realidade (Ao Vivo em Manaus)", status: "Indicada", won: false },
  { year: "2019", album: "Em Todos os Cantos", status: "Vencedora", won: true },
  { year: "2021", album: "Patroas (c/ Maiara & Maraisa)", status: "Indicada", won: false },
  { year: "2022", album: "Patroas 35% (c/ Maiara & Maraisa)", status: "Indicada", won: false },
  { year: "2023", album: "Decretos Reais (Póstumo)", status: "Vencedora", won: true },
];

const colorMap: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/30", glow: "shadow-emerald-500/10" },
  rose: { bg: "bg-rose-500/10", text: "text-rose-400", border: "border-rose-500/30", glow: "shadow-rose-500/10" },
  amber: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/30", glow: "shadow-amber-500/10" },
  blue: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/30", glow: "shadow-blue-500/10" },
  purple: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/30", glow: "shadow-purple-500/10" },
  cyan: { bg: "bg-cyan-500/10", text: "text-cyan-400", border: "border-cyan-500/30", glow: "shadow-cyan-500/10" },
};

export function RecordsWall({ stats }: RecordsWallProps) {
  const ytViewsDisplay = stats?.youtube_total_views
    ? `${formatCompactNumber(stats.youtube_total_views)}+`
    : "21,6B+";
  const spFollowersDisplay = stats?.spotify_followers
    ? `${formatCompactNumber(stats.spotify_followers)}+`
    : "41,6M+";

  const records: RecordItem[] = [
    {
      icon: <Zap className="w-5 h-5" />,
      value: "16B+",
      label: "Streams no Spotify",
      detail: "16,03 bilhões de streams no catálogo completo (c/ feats) — 1ª brasileira a superar 15B.",
      accentColor: "emerald",
    },
    {
      icon: <Eye className="w-5 h-5" />,
      value: ytViewsDisplay,
      label: "Views no YouTube",
      detail: "Mais de 21 bilhões de visualizações acumuladas no canal oficial @mariliamendoncareal.",
      accentColor: "rose",
    },
    {
      icon: <Radio className="w-5 h-5" />,
      value: "3,31M",
      label: "Live Recorde Mundial",
      detail: "Pico simultâneo no YouTube (08/04/2020), superando Jorge & Mateus (3,24M). Prêmio Multishow.",
      accentColor: "amber",
    },
    {
      icon: <Music className="w-5 h-5" />,
      value: "66",
      label: "Clipes com 100M+ Views",
      detail: "Recorde absoluto no Brasil: 66 videoclipes ultrapassaram a marca de 100 milhões de views.",
      accentColor: "blue",
    },
    {
      icon: <Users className="w-5 h-5" />,
      value: spFollowersDisplay,
      label: "Seguidores no Spotify",
      detail: "A artista solo brasileira mais seguida de todos os tempos na plataforma.",
      accentColor: "emerald",
    },
    {
      icon: <Mic2 className="w-5 h-5" />,
      value: "200t+",
      label: "Alimentos Arrecadados",
      detail: "Mais de 200 toneladas de alimentos doadas durante as 3h+ da #LiveLocalMariliaMendonca.",
      accentColor: "purple",
    },
    {
      icon: <Trophy className="w-5 h-5" />,
      value: "2× 🏆",
      label: "Grammy Latino",
      detail: "5 indicações consecutivas e 2 estatuetas de Melhor Álbum de Música Sertaneja.",
      accentColor: "amber",
    },
    {
      icon: <Gem className="w-5 h-5" />,
      value: "10× 💎",
      label: "Diamante — Leão",
      detail: "\"Leão\" recebeu 10× Diamante da Pro-Música Brasil (3M+ unidades equivalentes).",
      accentColor: "cyan",
    },
  ];

  return (
    <div className="rounded-3xl border border-white/10 bg-zinc-900/60 backdrop-blur-xl p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-zinc-800/80">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Trophy className="h-3.5 w-3.5" />
            <span>Hall dos Recordes &amp; Premiações</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Números &amp; Conquistas que Fizeram História
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Os marcos monumentais no Spotify, YouTube, Grammy Latino e nas praças de todo o Brasil.
          </p>
        </div>

        <span className="text-xs font-mono text-amber-300 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-full self-start sm:self-auto font-bold">
          Artista #1 do Brasil (Spotify 2019–2020)
        </span>
      </div>

      {/* Main 8 Records Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {records.map((record, i) => {
          const colors = colorMap[record.accentColor] || colorMap.amber;
          return (
            <div
              key={i}
              className={`p-5 rounded-2xl border ${colors.border} ${colors.bg} hover:shadow-lg ${colors.glow} transition-all`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-xl ${colors.bg} ${colors.text}`}>
                  {record.icon}
                </div>
              </div>
              <div className={`text-2xl sm:text-3xl font-black font-mono ${colors.text} tracking-tight`}>
                {record.value}
              </div>
              <h4 className="text-sm font-bold text-white mt-1">{record.label}</h4>
              <p className="text-[11px] text-zinc-400 leading-relaxed mt-2">{record.detail}</p>
            </div>
          );
        })}
      </div>

      {/* Sub-Panels: Grammy Latino History + Turnê Todos os Cantos */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-2">
        {/* Grammy Latino */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-black/40 border border-amber-500/20 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Histórico no Grammy Latino (5 Indicações • 2 Vitórias)
              </h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30 font-bold">
              Latin Recording Academy
            </span>
          </div>

          <div className="space-y-2">
            {GRAMMY_HISTORY.map((item) => (
              <div
                key={item.year}
                className={`flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl border ${
                  item.won
                    ? "bg-amber-500/10 border-amber-500/30"
                    : "bg-zinc-900/50 border-white/5"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-mono text-xs font-extrabold text-amber-400 shrink-0">
                    {item.year}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-white truncate">
                    {item.album}
                  </span>
                </div>
                <span
                  className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.won
                      ? "bg-amber-500 text-black"
                      : "bg-white/5 text-zinc-400 border border-white/10"
                  }`}
                >
                  {item.won ? "🏆 Vencedora" : "Indicada"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Turnê Todos os Cantos */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-zinc-900/60 to-black/60 border border-amber-500/25 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-amber-400">
              <MapPin className="w-4 h-4" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Turnê &quot;Te Vejo em Todos os Cantos&quot;
              </h3>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Idealizada pela própria Marília (estreia oficial em Goiânia em 23/05/2019), a turnê percorreu praças públicas com shows gratuitos e surpresa — e a cantora panfletava pessoalmente nas ruas convidando o público.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5 text-xs">
            <div className="p-3 rounded-xl bg-black/50 border border-white/5">
              <span className="text-[10px] text-zinc-400 block">Público Estimado:</span>
              <strong className="text-base font-mono font-black text-amber-300">~1 Milhão</strong>
            </div>
            <div className="p-3 rounded-xl bg-black/50 border border-white/5">
              <span className="text-[10px] text-zinc-400 block">Recorde em BH (2019):</span>
              <strong className="text-base font-mono font-black text-white">50k–100k+</strong>
            </div>
            <div className="p-3 rounded-xl bg-black/50 border border-white/5">
              <span className="text-[10px] text-zinc-400 block">Último Show:</span>
              <strong className="text-xs font-mono font-bold text-zinc-200">Sorocaba (01/11/2021)</strong>
            </div>
            <div className="p-3 rounded-xl bg-black/50 border border-white/5">
              <span className="text-[10px] text-zinc-400 block">Série &amp; Álbum:</span>
              <strong className="text-xs font-mono font-bold text-emerald-400">Globoplay + 3 EPs</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
