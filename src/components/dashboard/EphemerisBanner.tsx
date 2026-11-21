"use client";

import { Ephemeris } from "@/types";
import { Calendar, Award, Sparkles } from "lucide-react";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

interface EphemerisBannerProps {
  ephemerides: Ephemeris[];
}

export function EphemerisBanner({ ephemerides }: EphemerisBannerProps) {
  if (!ephemerides || ephemerides.length === 0) return null;

  const currentMonthDay = "11-14";
  const todayEphemeris = ephemerides.find((e) => e.month_day === currentMonthDay) || ephemerides[0];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/60 backdrop-blur-xl p-6 sm:p-8">
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 sm:gap-8">
        {/* Foto */}
        <div className="relative w-full md:w-56 h-48 sm:h-52 shrink-0 rounded-2xl overflow-hidden border border-amber-500/30 shadow-xl bg-zinc-900">
          <ImageWithFallback
            src={todayEphemeris.image_url || "https://i.scdn.co/image/ab6761610000e5ebe6395f30987a29e4bec7de11"}
            alt={todayEphemeris.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 240px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500 text-black text-xs font-bold">
            <Award className="h-3.5 w-3.5" />
            <span>Ano {todayEphemeris.year}</span>
          </div>
        </div>

        {/* Texto */}
        <div className="flex-1 space-y-3 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <Calendar className="h-3.5 w-3.5" />
            <span>Neste Dia na História da Rainha</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            {todayEphemeris.title}
          </h3>

          <p className="text-sm text-zinc-300 leading-relaxed">
            {todayEphemeris.description}
          </p>

          <div className="pt-1 flex items-center justify-center md:justify-start gap-1 text-xs text-amber-400 font-medium">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Marco gravado para sempre na música popular brasileira</span>
          </div>
        </div>
      </div>
    </div>
  );
}
