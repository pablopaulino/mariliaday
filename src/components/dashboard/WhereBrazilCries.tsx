"use client";

import { useState } from "react";
import { MapPin, HeartCrack, Play, Flame, Music, Award } from "lucide-react";
import { useAudioPlayer, PREVIEW_TRACKS_CATALOG } from "@/context/AudioPlayerContext";

interface CityData {
  id: string;
  name: string;
  state: string;
  tagline: string;
  sharePercent: number;
  dailyStreams: string;
  favoriteTrack: string;
  trackKey: string;
  sofrenciaIndex: number;
  curiosity: string;
}

const CITIES: CityData[] = [
  {
    id: "goiania",
    name: "Goiânia",
    state: "GO",
    tagline: "O Berço da Sofrência & Onde Tudo Começou",
    sharePercent: 18.4,
    dailyStreams: "~2,35 Milhões",
    favoriteTrack: "Infiel",
    trackKey: "infiel",
    sofrenciaIndex: 99,
    curiosity: "Foi no coração de Goiás que Marília compôs suas primeiras canções aos 12 anos e gravou o DVD acústico que parou o país.",
  },
  {
    id: "sao-paulo",
    name: "São Paulo",
    state: "SP",
    tagline: "A Maior Metrópole Apaixonada",
    sharePercent: 16.8,
    dailyStreams: "~2,15 Milhões",
    favoriteTrack: "Leão",
    trackKey: "leao",
    sofrenciaIndex: 95,
    curiosity: "São Paulo é a cidade no mundo que mais horas de Marília consome em fones de ouvido durante trajetos diários no metrô.",
  },
  {
    id: "belo-horizonte",
    name: "Belo Horizonte",
    state: "MG",
    tagline: "Capital dos Bares & Corações Partidos",
    sharePercent: 12.2,
    dailyStreams: "~1,56 Milhão",
    favoriteTrack: "Graveto",
    trackKey: "graveto",
    sofrenciaIndex: 94,
    curiosity: "A capital dos botecos tem o maior índice per capita de reproduções de 'Graveto' nas noites de sexta e sábado.",
  },
  {
    id: "belem",
    name: "Belém",
    state: "PA",
    tagline: "Onde o Trânsito Parou com 'Ciumeira'",
    sharePercent: 9.8,
    dailyStreams: "~1,25 Milhão",
    favoriteTrack: "Ciumeira",
    trackKey: "ciumeira",
    sofrenciaIndex: 97,
    curiosity: "Em 2018, Marília apareceu de surpresa na Praça do Relógio em Belém e reuniu mais de 30 mil pessoas sem aviso prévio para gravar 'Ciumeira'.",
  },
  {
    id: "brasilia",
    name: "Brasília",
    state: "DF",
    tagline: "O Planalto das Lágrimas",
    sharePercent: 8.7,
    dailyStreams: "~1,11 Milhão",
    favoriteTrack: "De Quem É a Culpa?",
    trackKey: "de-quem-e-a-culpa",
    sofrenciaIndex: 92,
    curiosity: "A gravação surpresa no gramado da Esplanada dos Ministérios reuniu a maior multidão em praça pública de todo o projeto 'Todos os Cantos'.",
  },
  {
    id: "fortaleza",
    name: "Fortaleza",
    state: "CE",
    tagline: "A Força do Nordeste Apaixonado",
    sharePercent: 7.9,
    dailyStreams: "~1,01 Milhão",
    favoriteTrack: "Supera",
    trackKey: "supera",
    sofrenciaIndex: 90,
    curiosity: "Marília sempre declarou seu amor pelo público cearense, que transformou 'Supera' no hino oficial de superação amorosa no litoral.",
  },
  {
    id: "salvador",
    name: "Salvador",
    state: "BA",
    tagline: "O Trio Elétrico da Sofrência",
    sharePercent: 6.8,
    dailyStreams: "~870 Mil",
    favoriteTrack: "Todo Mundo Vai Sofrer",
    trackKey: "todo-mundo-vai-sofrer",
    sofrenciaIndex: 89,
    curiosity: "No Pelourinho, os tambores e os arranjos sertanejos se fundiram quando Marília gravou seu hit no coração histórico da Bahia.",
  },
  {
    id: "curitiba",
    name: "Curitiba",
    state: "PR",
    tagline: "O Frio do Sul Aquece na Sofrência",
    sharePercent: 5.4,
    dailyStreams: "~690 Mil",
    favoriteTrack: "Eu Sei De Cor",
    trackKey: "eu-sei-de-cor",
    sofrenciaIndex: 86,
    curiosity: "A capital paranaense lidera os índices de audição contínua dos álbuns completos no Spotify durante os meses de outono e inverno.",
  },
];

export function WhereBrazilCries() {
  const [selectedCity, setSelectedCity] = useState<CityData>(CITIES[0]);
  const { playTrack, currentTrack, isPlaying } = useAudioPlayer();

  const handlePlayFavorite = (city: CityData) => {
    const catalogItem = PREVIEW_TRACKS_CATALOG[city.trackKey] || PREVIEW_TRACKS_CATALOG["leao"];
    playTrack({
      id: city.trackKey,
      title: city.favoriteTrack,
      artist: "Marília Mendonça",
      album: catalogItem?.album || "Todos os Cantos",
      coverUrl: catalogItem?.artworkUrl || catalogItem?.coverUrl || PREVIEW_TRACKS_CATALOG["leao"].artworkUrl,
      audioUrl: catalogItem?.previewUrl || catalogItem?.audioUrl || "",
      era: "Todos os Cantos",
    });
  };

  const isCurrentPlaying = currentTrack?.id === selectedCity.trackKey && isPlaying;

  return (
    <div className="rounded-3xl border border-white/10 bg-zinc-900/60 backdrop-blur-xl p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-zinc-800/80">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
            <HeartCrack className="h-3.5 w-3.5 text-amber-400" />
            <span>Geointeligência de Streaming</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Onde o Brasil Chora</span>
            <span className="text-amber-400 font-mono text-sm sm:text-base font-normal">
              (Mapa de Consumo Regional)
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            As capitais e regiões líderes onde a voz de Marília Mendonça mais ecoa todos os dias.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto px-3.5 py-1.5 rounded-full bg-black/40 border border-white/10 text-xs font-mono text-zinc-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>8 Capitais Monitoradas</span>
        </div>
      </div>

      {/* Main Grid: Left List + Right Feature Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive City List */}
        <div className="lg:col-span-7 space-y-2.5">
          {CITIES.map((city, idx) => {
            const isSelected = selectedCity.id === city.id;
            return (
              <div
                key={city.id}
                onClick={() => setSelectedCity(city)}
                className={`flex items-center justify-between p-3.5 sm:p-4 rounded-2xl cursor-pointer transition-all border ${
                  isSelected
                    ? "bg-amber-500/10 border-amber-500/40 shadow-lg shadow-amber-500/5"
                    : "bg-black/30 border-white/5 hover:border-white/20 hover:bg-zinc-800/40"
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <span
                    className={`font-mono font-bold text-sm sm:text-base w-6 text-center ${
                      idx === 0
                        ? "text-amber-400"
                        : idx === 1
                        ? "text-zinc-200"
                        : idx === 2
                        ? "text-amber-600"
                        : "text-zinc-500"
                    }`}
                  >
                    #{idx + 1}
                  </span>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm sm:text-base text-white truncate">
                        {city.name}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/5 border border-white/10 text-zinc-400">
                        {city.state}
                      </span>
                    </div>
                    <span className="text-xs text-zinc-400 truncate block sm:inline">
                      Música #1: <strong className="text-zinc-200">{city.favoriteTrack}</strong>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0 text-right">
                  <div>
                    <span className="text-sm sm:text-base font-extrabold font-mono text-white block">
                      {city.sharePercent}%
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono">do consumo</span>
                  </div>

                  {/* Progress mini bar */}
                  <div className="hidden sm:block w-16 h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full"
                      style={{ width: `${(city.sharePercent / 18.4) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Featured City Detail Card */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-gradient-to-b from-[#18181D] via-[#121215] to-[#0A0A0C] border border-amber-500/30 shadow-2xl space-y-6 relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-44 h-44 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header of selected city */}
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold uppercase tracking-wider mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{selectedCity.name} — {selectedCity.state}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {selectedCity.tagline}
              </h3>
            </div>

            <div className="flex flex-col items-end">
              <span className="text-2xl font-black font-mono text-gold-gradient">
                {selectedCity.sofrenciaIndex}
              </span>
              <span className="text-[9px] uppercase font-bold tracking-widest text-zinc-400">
                Índice de Sofrência
              </span>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-black/50 border border-white/5">
              <span className="text-xs text-zinc-400">Volume Diário Estimado:</span>
              <p className="text-lg font-extrabold text-white font-mono mt-1">
                {selectedCity.dailyStreams}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-black/50 border border-white/5">
              <span className="text-xs text-zinc-400">Fatia do Streaming:</span>
              <p className="text-lg font-extrabold text-amber-400 font-mono mt-1">
                {selectedCity.sharePercent}% total
              </p>
            </div>
          </div>

          {/* Favorite Track Box with Listen Button */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Music className="w-4 h-4 text-amber-400" />
                <span className="text-xs uppercase font-extrabold tracking-wider text-amber-300">
                  Faixa Mais Tocada na Cidade
                </span>
              </div>
              <Award className="w-4 h-4 text-amber-400" />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-extrabold text-white tracking-tight">
                  {selectedCity.favoriteTrack}
                </p>
                <p className="text-xs text-zinc-400">Marília Mendonça</p>
              </div>

              <button
                onClick={() => handlePlayFavorite(selectedCity)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-gold-500 text-black font-bold text-xs hover:brightness-110 active:scale-95 transition-all shadow-md shadow-amber-500/20"
              >
                <Play className={`w-3.5 h-3.5 fill-black ${isCurrentPlaying ? "animate-pulse" : ""}`} />
                <span>{isCurrentPlaying ? "Tocando..." : "Ouvir Prévia"}</span>
              </button>
            </div>
          </div>

          {/* Historical Trivia */}
          <div className="p-4 rounded-2xl bg-black/30 border border-white/5 space-y-1">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>Memória Histórica da Rainha</span>
            </span>
            <p className="text-xs text-zinc-300 leading-relaxed font-normal">
              {selectedCity.curiosity}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
