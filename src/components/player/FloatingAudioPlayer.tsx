"use client";

import { useAudioPlayer } from "@/context/AudioPlayerContext";
import { Play, Pause, X, Volume2, VolumeX, Disc3, Sparkles } from "lucide-react";
import Image from "next/image";

function formatSeconds(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

export function FloatingAudioPlayer() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    progress,
    volume,
    togglePlay,
    seek,
    setVolume,
    closePlayer,
  } = useAudioPlayer();

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-[420px] z-50 animate-slideUp">
      <div className="relative rounded-2xl border border-white/15 bg-[#121215]/85 backdrop-blur-2xl backdrop-saturate-150 p-3.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18),0_20px_50px_-10px_rgba(0,0,0,0.85)] overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />

        {/* Top Info Bar */}
        <div className="flex items-center gap-3">
          {/* Cover Art with rotating vinyl effect */}
          <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-white/10 shadow-md bg-zinc-900 group">
            <Image
              src={currentTrack.coverUrl}
              alt={currentTrack.title}
              fill
              className={`object-cover transition-transform duration-700 ${
                isPlaying ? "scale-105" : "scale-100"
              }`}
              sizes="48px"
            />
            {isPlaying && (
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <Disc3 className="w-5 h-5 text-amber-400 animate-spin" />
              </div>
            )}
          </div>

          {/* Title & Artist & Equalizer */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-xs uppercase font-extrabold tracking-wider text-amber-400 truncate">
                Prévia Oficial (30s)
              </span>
              {currentTrack.era && (
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/5 border border-white/10 text-zinc-400 shrink-0">
                  {currentTrack.era}
                </span>
              )}
            </div>

            <h4 className="text-sm font-bold text-white truncate tracking-tight">
              {currentTrack.title}
            </h4>
            <p className="text-[11px] text-zinc-400 truncate">{currentTrack.artist}</p>
          </div>

          {/* Sound Wave Equalizer Bars */}
          {isPlaying && (
            <div className="flex items-end gap-0.5 h-4 px-1.5">
              <span className="w-0.5 h-3.5 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-0.5 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-0.5 h-4 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              <span className="w-0.5 h-1.5 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: "100ms" }} />
              <span className="w-0.5 h-3 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: "200ms" }} />
            </div>
          )}

          {/* Controls: Play/Pause & Close */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={togglePlay}
              className="w-9 h-9 rounded-full bg-gradient-to-r from-amber-500 to-gold-500 text-black flex items-center justify-center shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all"
              aria-label={isPlaying ? "Pausar" : "Tocar"}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black ml-0.5" />}
            </button>

            <button
              onClick={closePlayer}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Fechar player"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress Scrub Bar */}
        <div className="mt-2.5 space-y-1">
          <div
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const fraction = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
              seek(fraction);
            }}
            className="relative h-1.5 w-full bg-zinc-800/80 rounded-full cursor-pointer group overflow-hidden"
          >
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
            <span>{formatSeconds(currentTime)}</span>
            <span>{formatSeconds(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
