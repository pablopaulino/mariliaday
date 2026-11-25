"use client";

import { useState } from "react";
import { Ephemeris } from "@/types";
import { formatMonthDayPT } from "@/lib/utils";
import { Award, Sparkles, ChevronLeft, ChevronRight, History } from "lucide-react";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

interface EphemerisBannerProps {
  ephemerides: Ephemeris[];
}

export function EphemerisBanner({ ephemerides }: EphemerisBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!ephemerides || ephemerides.length === 0) return null;

  const currentEphemeris = ephemerides[currentIndex % ephemerides.length];
  const currentYear = 2026;
  const yearsAgo = currentEphemeris.year ? currentYear - currentEphemeris.year : 0;
  const formattedFullDate = formatMonthDayPT(currentEphemeris.month_day, currentEphemeris.year);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? ephemerides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % ephemerides.length);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/60 backdrop-blur-xl p-6 sm:p-8 space-y-5">
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 sm:gap-8">
        {/* Foto */}
        <div className="relative w-full md:w-56 h-48 sm:h-52 shrink-0 rounded-2xl overflow-hidden border border-amber-500/30 shadow-xl bg-zinc-900">
          <ImageWithFallback
            src={currentEphemeris.image_url || "/marilia-crown-banner.jpg"}
            alt={currentEphemeris.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 240px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500 text-black text-xs font-bold">
            <Award className="h-3.5 w-3.5" />
            <span>{formattedFullDate}</span>
          </div>
        </div>

        {/* Texto */}
        <div className="flex-1 space-y-3 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-between flex-wrap gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <History className="h-3.5 w-3.5" />
              <span>
                {yearsAgo > 0
                  ? `Memória Viva • Há ${yearsAgo} ${yearsAgo === 1 ? "ano" : "anos"} (${currentEphemeris.year})`
                  : `Marco Recente (${currentEphemeris.year})`}
              </span>
            </div>

            {ephemerides.length > 1 && (
              <div className="flex items-center gap-1">
                <button
                  onClick={handlePrev}
                  className="p-1.5 rounded-lg bg-black/40 border border-white/10 hover:border-amber-400 text-zinc-300 hover:text-white transition-all"
                  title="Marco anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-[11px] font-mono text-zinc-400 px-1.5">
                  {currentIndex + 1}/{ephemerides.length}
                </span>
                <button
                  onClick={handleNext}
                  className="p-1.5 rounded-lg bg-black/40 border border-white/10 hover:border-amber-400 text-zinc-300 hover:text-white transition-all"
                  title="Próximo marco"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            {currentEphemeris.title}
          </h3>

          <p className="text-sm text-zinc-300 leading-relaxed">
            {currentEphemeris.description}
          </p>

          <div className="pt-1 flex items-center justify-center md:justify-start gap-1.5 text-xs text-amber-400 font-medium">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Navegue pelos {ephemerides.length} marcos históricos de 1995 a 2026</span>
          </div>
        </div>
      </div>

      {/* Quick timeline year jumper */}
      {ephemerides.length > 3 && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-2 border-t border-white/5">
          {ephemerides.map((eph, idx) => (
            <button
              key={eph.id}
              onClick={() => setCurrentIndex(idx)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold shrink-0 transition-all ${
                idx === currentIndex
                  ? "bg-amber-500 text-black"
                  : "bg-black/30 text-zinc-400 hover:text-white border border-white/5"
              }`}
              title={eph.title}
            >
              {eph.year}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
