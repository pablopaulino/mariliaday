"use client";

import { useState } from "react";
import { Disc, Play, Trophy } from "lucide-react";
import { useAudioPlayer, PREVIEW_TRACKS_CATALOG } from "@/context/AudioPlayerContext";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

interface EraInfo {
  id: string;
  period: string;
  title: string;
  subtitle: string;
  signatureTrack: string;
  trackKey: string;
  description: string;
  milestone: string;
  coverUrl: string;
  badge: string;
}

const ERAS: EraInfo[] = [
  {
    id: "era-2014",
    period: "2014 – 2015",
    title: "Início & Estreia",
    subtitle: "Dos Bastidores ao Primeiro EP",
    signatureTrack: "Impasse",
    trackKey: "impasse",
    description:
      "Depois de brilhar desde os 12 anos assinando sucessos para gigantes como Henrique & Juliano, Cristiano Araújo e Jorge & Mateus, Marília lançou em janeiro de 2014 seu EP homônimo de estreia e estourou em 2015 com 'Impasse'.",
    milestone: "✍️ Compositora prodígio aos 12 anos em Goiânia",
    coverUrl: PREVIEW_TRACKS_CATALOG["impasse"]?.artworkUrl || "/marilia-crown-banner.jpg",
    badge: "O Despertar da Voz",
  },
  {
    id: "era-2016",
    period: "2015 – 2016",
    title: "Ao Vivo em Goiânia",
    subtitle: "A Explosão do Feminejo",
    signatureTrack: "Infiel",
    trackKey: "infiel",
    description:
      "Com apenas 20 anos, Marília gravou o DVD em Goiânia (relançado em março de 2016 pela Som Livre) e revolucionou o sertanejo dominado por homens, transformando 'Infiel', 'Sentimento Louco' e 'Alô Porteiro' em hinos nacionais.",
    milestone: "💎 Infiel (2× Diamante) & EP Agora É Que São Elas (2016)",
    coverUrl: PREVIEW_TRACKS_CATALOG["infiel"]?.artworkUrl || "/marilia-crown-banner.jpg",
    badge: "Era de Ouro",
  },
  {
    id: "era-2017",
    period: "2017 – 2018",
    title: "Realidade (Ao Vivo)",
    subtitle: "Sambódromo de Manaus & Gal Costa",
    signatureTrack: "De Quem É a Culpa?",
    trackKey: "de-quem-e-a-culpa",
    description:
      "Para mais de 40 mil pessoas em Manaus, Marília entregou interpretações viscerais como 'De Quem É a Culpa?' e 'Amante Não Tem Lar', além de dividir os vocais de 'Cuidando de Longe' com Gal Costa e 'Transplante' com Bruno & Marrone.",
    milestone: "🏅 1ª Indicação ao Grammy Latino (2017)",
    coverUrl: PREVIEW_TRACKS_CATALOG["de-quem-e-a-culpa"]?.artworkUrl || "/marilia-crown-banner.jpg",
    badge: "Consagração em Arenas",
  },
  {
    id: "era-2019",
    period: "2018 – 2019",
    title: "Todos os Cantos",
    subtitle: "Turnê Surpresa pelas Capitais",
    signatureTrack: "Ciumeira",
    trackKey: "ciumeira",
    description:
      "Panfletando ela mesma nas ruas, Marília fez shows surpresa gratuitos em praças de todo o Brasil (~1 milhão de espectadores; recorde de 50k–100k+ em BH), revelando 'Supera' (8× Diamante), 'Ciumeira' e 'Todo Mundo Vai Sofrer'.",
    milestone: "🏆 Vencedora Grammy Latino 2019 • 💎 Vol. 1 4× Diamante",
    coverUrl: PREVIEW_TRACKS_CATALOG["ciumeira"]?.artworkUrl || "/marilia-crown-banner.jpg",
    badge: "Patrimônio Cultural",
  },
  {
    id: "era-2020",
    period: "2020 – 2021",
    title: "Live Recorde & Patroas",
    subtitle: "3,31M Simultâneos & Times Square",
    signatureTrack: "Esqueça-Me Se For Capaz",
    trackKey: "esqueca-me-se-for-capaz",
    description:
      "Em 08/04/2020, bateu recorde mundial no YouTube com 3,31M simultâneos e 200t+ de doações. Ao lado de Maiara & Maraisa lançou 'Patroas' e 'Patroas 35%' na Times Square. Seu último show ocorreu em Sorocaba em 01/11/2021.",
    milestone: "✨ Recorde Mundial Live (3,31M) • Prêmio Multishow 2020",
    coverUrl: PREVIEW_TRACKS_CATALOG["esqueca-me-se-for-capaz"]?.artworkUrl || "/marilia-crown-banner.jpg",
    badge: "Recorde Mundial",
  },
  {
    id: "era-2023",
    period: "2022 – 2025",
    title: "Decretos Reais",
    subtitle: "Live Serenata, Grammy & 10× Diamante",
    signatureTrack: "Leão",
    trackKey: "leao",
    description:
      "Extraído da live 'Serenata' (maio/2021) com expansão posterior ('Lado B'), 'Decretos Reais' transformou 'Leão' no single 10× Diamante da história brasileira e rendeu o 2º Grammy Latino em 2023.",
    milestone: "🏆 2º Grammy Latino (2023) • 💎 Leão 10× Diamante",
    coverUrl: PREVIEW_TRACKS_CATALOG["leao"]?.artworkUrl || "/marilia-crown-banner.jpg",
    badge: "Eternidade & Grammy",
  },
  {
    id: "era-2026",
    period: "2026 – 2027",
    title: "Manuscritos & 15B",
    subtitle: "Série Prime Video, MIS & Capítulos I e II",
    signatureTrack: "Foi por Conveniência",
    trackKey: "foi-por-conveniencia",
    description:
      "Em março de 2026 ultrapassou 15 bilhões de streams no Spotify. Outubro trouxe a série documental 'Sentimento Louco' no Prime Video e a mostra imersiva no MIS-SP; novembro revelou o álbum póstumo 'Manuscritos — Capítulos I e II', preparando o caminho para o filme 'Marília' (2027).",
    milestone: "🔥 15B+ Spotify (Mar/26) • Manuscritos I e II (Nov/26)",
    coverUrl: PREVIEW_TRACKS_CATALOG["foi-por-conveniencia"]?.artworkUrl || "/marilia-crown-banner.jpg",
    badge: "Era Atual (2026)",
  },
];

export function ErasTimeline() {
  const [selectedEra, setSelectedEra] = useState<EraInfo>(ERAS[6]); // Defaults to latest 2026 era
  const { playTrack, currentTrack, isPlaying } = useAudioPlayer();

  const handlePlayEra = (era: EraInfo) => {
    const catalogItem = PREVIEW_TRACKS_CATALOG[era.trackKey];
    playTrack({
      id: era.trackKey,
      title: era.signatureTrack,
      artist: "Marília Mendonça",
      album: era.title,
      coverUrl: era.coverUrl,
      audioUrl: catalogItem?.previewUrl || catalogItem?.audioUrl || "",
      era: era.period,
    });
  };

  const isCurrentPlaying = currentTrack?.id === selectedEra.trackKey && isPlaying;

  return (
    <div className="rounded-3xl border border-white/10 bg-zinc-900/60 backdrop-blur-xl p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-zinc-800/80">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Disc className="h-3.5 w-3.5" />
            <span>Linha do Tempo Completa das Eras</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>A Trajetória da Rainha (2014 – 2026+)</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Navegue por todas as 7 eras que redefiniram a música brasileira — do EP de 2014 até Manuscritos (nov/2026).
          </p>
        </div>

        <div className="text-xs font-mono text-amber-400 bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20 self-start sm:self-auto font-bold">
          {ERAS.length} Eras Catalogadas
        </div>
      </div>

      {/* Eras Horizontal Stepper / Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {ERAS.map((era) => {
          const isSelected = selectedEra.id === era.id;
          return (
            <button
              key={era.id}
              onClick={() => setSelectedEra(era)}
              className={`p-3 rounded-2xl text-left transition-all border ${
                isSelected
                  ? "bg-amber-500/15 border-amber-500/40 text-white shadow-lg shadow-amber-500/10"
                  : "bg-black/30 border-white/5 text-zinc-400 hover:text-white hover:bg-zinc-800/40"
              }`}
            >
              <span className="text-[10px] font-mono block text-amber-400 font-bold">{era.period}</span>
              <span className="text-xs font-bold block truncate mt-1 text-white">{era.title}</span>
              <span className="text-[10px] text-zinc-500 block truncate">{era.badge}</span>
            </button>
          );
        })}
      </div>

      {/* Featured Era Spotlight Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-black/60 via-zinc-900/60 to-black/80 border border-white/10 relative overflow-hidden">
        <div className="absolute top-1/2 -right-20 -translate-y-1/2 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Cover Art */}
          <div className="md:col-span-4 flex justify-center md:justify-start">
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-3xl overflow-hidden shadow-2xl border border-white/15 bg-zinc-900 group">
              <ImageWithFallback
                src={selectedEra.coverUrl}
                alt={selectedEra.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="256px"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono font-bold text-amber-400 z-10">
                {selectedEra.period}
              </div>
            </div>
          </div>

          {/* Details & Audio Play */}
          <div className="md:col-span-8 space-y-4">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400">
                {selectedEra.subtitle}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
                {selectedEra.title}
              </h3>
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed font-normal">
              {selectedEra.description}
            </p>

            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs sm:text-sm font-semibold text-amber-300 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{selectedEra.milestone}</span>
            </div>

            {/* Signature Track Audio Player Trigger */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => handlePlayEra(selectedEra)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-gold-500 text-black font-bold text-xs sm:text-sm hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-amber-500/20"
              >
                <Play className={`w-4 h-4 fill-black ${isCurrentPlaying ? "animate-pulse" : ""}`} />
                <span>{isCurrentPlaying ? "Pausar Prévia" : `Ouvir "${selectedEra.signatureTrack}"`}</span>
              </button>

              <span className="text-xs text-zinc-400 font-mono">
                Faixa Assinatura: <strong className="text-white">{selectedEra.signatureTrack}</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
