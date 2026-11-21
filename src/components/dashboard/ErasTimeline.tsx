"use client";

import { useState } from "react";
import { Disc, Play, Sparkles, Calendar, Trophy, Heart } from "lucide-react";
import { useAudioPlayer, PREVIEW_TRACKS_CATALOG } from "@/context/AudioPlayerContext";
import Image from "next/image";

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
    id: "era-2016",
    period: "2015 – 2016",
    title: "Ao Vivo em Goiânia",
    subtitle: "A Explosão do Feminejo",
    signatureTrack: "Infiel",
    trackKey: "infiel",
    description: "Com apenas 20 anos, Marília subiu ao palco em Goiânia e revolucionou o sertanejo dominado por homens, transformando 'Infiel' na 2ª música mais tocada do mundo no YouTube em 2016.",
    milestone: "🏆 Álbum de Diamante e Consagração Nacional",
    coverUrl: "https://i.scdn.co/image/ab67616d0000b273b378037a544c4e09f58c70fa",
    badge: "O Início da Era de Ouro",
  },
  {
    id: "era-2017",
    period: "2017",
    title: "Realidade (Ao Vivo)",
    subtitle: "No Sambódromo de Manaus",
    signatureTrack: "De Quem É a Culpa?",
    trackKey: "de-quem-e-a-culpa",
    description: "Para mais de 40 mil pessoas na Amazônia, Marília entregou interpretações viscerais como 'Amante Não Tem Lar' e 'Eu Sei De Cor', quebrando recordes de rádio em todo o território nacional.",
    milestone: "👑 Recordista Absoluta de Arrecadação e Streaming",
    coverUrl: "https://i.scdn.co/image/ab67616d0000b273e9788f6114e91fc8a38b1e42",
    badge: "Consagração nos Estádios",
  },
  {
    id: "era-2019",
    period: "2018 – 2019",
    title: "Todos os Cantos",
    subtitle: "O Maior Projeto Itinerante do Brasil",
    signatureTrack: "Ciumeira",
    trackKey: "ciumeira",
    description: "Panfletando ela mesma nas ruas das capitais, Marília fez shows surpresa e gratuitos em praças de todas as regiões brasileiras, gerando hinos como Ciumeira, Supera, Graveto e Bebaça.",
    milestone: "🥇 Álbum Brasileiro Mais Ouvido na História do Spotify (+3,8B)",
    coverUrl: "https://i.scdn.co/image/ab67616d0000b27303c7ea07c082531da1f7df2b",
    badge: "Patrimônio Cultural",
  },
  {
    id: "era-2020",
    period: "2020 – 2021",
    title: "Patroas",
    subtitle: "A Maior Live da História do Planeta",
    signatureTrack: "Todo Mundo Vai Sofrer",
    trackKey: "todo-mundo-vai-sofrer",
    description: "Durante a pandemia, Marília e a dupla Maiara & Maraisa uniram forças no projeto 'Patroas'. No dia 8 de abril de 2020, Marília atingiu 3,31 milhões de espectadores simultâneos no YouTube, recorde mundial imbatível.",
    milestone: "✨ Recorde Mundial do Guinness (3,31M simultâneos)",
    coverUrl: "https://i.scdn.co/image/ab67616d0000b2734ed454af2f9a6719f4155241",
    badge: "Recorde Mundial",
  },
  {
    id: "era-2023",
    period: "2022 – 2023",
    title: "Decretos Reais",
    subtitle: "Grammy Latino & Legado Eterno",
    signatureTrack: "Leão",
    trackKey: "leao",
    description: "Mesmo após sua partida, seu legado alcançou novas alturas cósmicas: 'Leão' tornou-se a música em língua portuguesa mais reproduzida em um único dia no Spotify Global e o projeto conquistou o Grammy Latino.",
    milestone: "🏆 Vencedor do Grammy Latino de Melhor Álbum Sertanejo",
    coverUrl: "https://i.scdn.co/image/ab67616d0000b2737604f56fba11b012678da47f",
    badge: "Eternidade & Grammy",
  },
];

export function ErasTimeline() {
  const [selectedEra, setSelectedEra] = useState<EraInfo>(ERAS[4]); // Defaults to Decretos Reais
  const { playTrack, currentTrack, isPlaying } = useAudioPlayer();

  const handlePlayEra = (era: EraInfo) => {
    const catalogItem = PREVIEW_TRACKS_CATALOG[era.trackKey];
    playTrack({
      id: era.trackKey,
      title: era.signatureTrack,
      artist: "Marília Mendonça",
      album: era.title,
      coverUrl: era.coverUrl,
      audioUrl: catalogItem?.audioUrl || "",
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
            <span>Linha do Tempo das Eras</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>A Trajetória da Rainha (2015 – 2023)</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Navegue pelos momentos que redefiniram a história da música brasileira e ouça as faixas assinatura de cada fase.
          </p>
        </div>

        <div className="text-xs font-mono text-amber-400 bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20 self-start sm:self-auto font-bold">
          5 Grandes Eras Catalogadas
        </div>
      </div>

      {/* Eras Horizontal Stepper / Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {ERAS.map((era) => {
          const isSelected = selectedEra.id === era.id;
          return (
            <button
              key={era.id}
              onClick={() => setSelectedEra(era)}
              className={`p-3.5 rounded-2xl text-left transition-all border ${
                isSelected
                  ? "bg-amber-500/15 border-amber-500/40 text-white shadow-lg shadow-amber-500/10"
                  : "bg-black/30 border-white/5 text-zinc-400 hover:text-white hover:bg-zinc-800/40"
              }`}
            >
              <span className="text-[11px] font-mono block text-amber-400 font-bold">{era.period}</span>
              <span className="text-xs sm:text-sm font-bold block truncate mt-1 text-white">{era.title}</span>
              <span className="text-[10px] text-zinc-500 block truncate">{era.badge}</span>
            </button>
          );
        })}
      </div>

      {/* Featured Era Spotlight Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-black/60 via-zinc-900/60 to-black/80 border border-white/10 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/2 -right-20 -translate-y-1/2 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Cover Art */}
          <div className="md:col-span-4 flex justify-center md:justify-start">
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-3xl overflow-hidden shadow-2xl border border-white/15 bg-zinc-900 group">
              <Image
                src={selectedEra.coverUrl}
                alt={selectedEra.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="256px"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono font-bold text-amber-400">
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
