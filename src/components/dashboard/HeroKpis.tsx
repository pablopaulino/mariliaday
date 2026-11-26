"use client";

import Image from "next/image";
import { ArtistDailyStats } from "@/types";
import { formatNumber, formatCompactNumber, formatDelta, formatDatePT } from "@/lib/utils";
import { Headphones, Flame, PlaySquare, TrendingUp, Crown } from "lucide-react";

interface HeroKpisProps {
  stats: ArtistDailyStats;
}

export function HeroKpis({ stats }: HeroKpisProps) {
  const combinedDailyPlays = stats.spotify_daily_streams + stats.youtube_daily_views;

  return (
    <div className="space-y-6">
      {/* 1. HERO BANNER MODERNO (RETRATO COLORIDO ORIGINAL + NOME DOURADO) */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900/80 via-[#101014] to-[#09090B] p-6 sm:p-10 lg:p-12 shadow-2xl">
        {/* Glow sutil */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-amber-500/10 rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute top-1/2 -right-24 w-80 h-80 bg-gold-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Título Dourado Forte & Moderno */}
          <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold tracking-wider uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
                LEGADO ETERNO • {stats.date ? formatDatePT(stats.date).toUpperCase() : "ATUALIZADO"}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs font-medium">
                <Crown className="h-3.5 w-3.5 text-amber-400" />
                <span>Rainha da Sofrência</span>
              </span>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
                MARÍLIA <br className="hidden sm:inline" />
                <span className="text-gold-gradient">MENDONÇA</span>
              </h1>
              <p className="text-sm sm:text-base text-zinc-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Pioneira do feminejo e a maior voz feminina da história da música brasileira (Cristianópolis, 1995 — Piedade de Caratinga, 2021). Central de inteligência diária, recordes e celebração contínua do seu legado.
              </p>

              {/* Badges de Conquistas Históricas */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-xs font-semibold text-emerald-300">
                  <span>🎧</span>
                  <span>16B+ Streams no Spotify (1ª Brasileira a bater 15B)</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs font-semibold text-amber-300">
                  <span>🏆</span>
                  <span>2× Vencedora do Grammy Latino</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-zinc-300">
                  <span>📺</span>
                  <span>Recorde Mundial Live (3,31M)</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-zinc-300">
                  <span>🎬</span>
                  <span>66 Clipes com 100M+ Views</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Retrato Oficial Original 100% Colorido e Vivo */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-64 h-80 sm:w-72 sm:h-92 rounded-2xl overflow-hidden border border-white/10 shadow-2xl group bg-zinc-900">
              {/* Foto 100% colorida e nítida original */}
              <Image
                src="https://i.scdn.co/image/ab6761610000e5ebe6395f30987a29e4bec7de11"
                alt="Marília Mendonça"
                fill
                priority
                unoptimized
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 280px, 340px"
              />

              {/* Rodapé discreto abaixo da foto */}
              <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-center">
                <p className="text-xs font-mono tracking-widest uppercase text-amber-400 font-bold">
                  1995 — ETERNA
                </p>
                <p className="text-[11px] text-zinc-300 font-medium">
                  Patrimônio Cultural do Brasil
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. OS 4 CARDS DE KPIS MODERNOS E ALINHADOS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Ouvintes Mensais Spotify */}
        <div className="rounded-2xl p-6 bg-zinc-900/60 backdrop-blur-xl border border-white/10 hover:border-amber-500/40 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Ouvintes Mensais (Spotify)
            </span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Headphones className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
              {formatCompactNumber(stats.spotify_monthly_listeners)}
            </div>
            <p className="text-xs text-zinc-400 mt-1 font-mono">
              {formatNumber(stats.spotify_monthly_listeners)} ouvintes ativos
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs">
            <span className="text-zinc-400">Variação 24h:</span>
            <span
              className={`font-mono font-bold px-2 py-0.5 rounded ${
                stats.spotify_listeners_delta >= 0
                  ? "bg-emerald-500/15 text-emerald-400"
                  : "bg-rose-500/15 text-rose-400"
              }`}
            >
              {formatDelta(stats.spotify_listeners_delta)}
            </span>
          </div>
        </div>

        {/* KPI 2: Streams Diários Combinados */}
        <div className="rounded-2xl p-6 bg-zinc-900/60 backdrop-blur-xl border border-white/10 hover:border-amber-500/40 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Streams Diários Combinados
            </span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Flame className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-300 font-mono tracking-tight">
              {formatCompactNumber(combinedDailyPlays)}
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              16,0B+ streams acumulados no Spotify
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
            <span>
              Spotify: <strong className="text-white font-mono font-bold">+{formatCompactNumber(stats.spotify_daily_streams)}</strong>
            </span>
            <span>
              YT: <strong className="text-white font-mono font-bold">+{formatCompactNumber(stats.youtube_daily_views)}</strong>
            </span>
          </div>
        </div>

        {/* KPI 3: YouTube Oficial */}
        <div className="rounded-2xl p-6 bg-zinc-900/60 backdrop-blur-xl border border-white/10 hover:border-amber-500/40 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              YouTube Oficial
            </span>
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400">
              <PlaySquare className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
              {formatCompactNumber(stats.youtube_total_views)}
            </div>
            <p className="text-xs text-zinc-400 mt-1 font-mono">
              {formatCompactNumber(stats.youtube_subscribers)} inscritos no canal
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs">
            <span className="text-zinc-400">Views nas últimas 24h:</span>
            <span className="font-mono font-bold px-2 py-0.5 rounded bg-rose-500/15 text-rose-400">
              +{formatCompactNumber(stats.youtube_daily_views)}
            </span>
          </div>
        </div>

        {/* KPI 4: Seguidores Spotify */}
        <div className="rounded-2xl p-6 bg-zinc-900/60 backdrop-blur-xl border border-white/10 hover:border-amber-500/40 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Seguidores no Spotify
            </span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
              {formatCompactNumber(stats.spotify_followers)}
            </div>
            <p className="text-xs text-zinc-400 mt-1 font-mono">
              {formatNumber(stats.spotify_followers)} fãs oficiais
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs">
            <span className="text-zinc-400">Posição Histórica:</span>
            <span className="font-bold text-amber-400 flex items-center gap-1">
              <Crown className="h-3 w-3" />
              #1 Solo Brasil
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
