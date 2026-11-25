"use client";

import { useState } from "react";
import { Award, Disc, ChevronDown, ChevronUp, Gem, ShieldCheck } from "lucide-react";

interface Certification {
  title: string;
  artist?: string;
  type: "single" | "album";
  level: "Diamante" | "Platina";
  multiplier: number;
  note?: string;
  icon: string;
}

const SINGLE_CERTS: Certification[] = [
  { title: "Leão", type: "single", level: "Diamante", multiplier: 10, note: "3M+ unidades equivalentes (recorde)", icon: "💎" },
  { title: "Supera", type: "single", level: "Diamante", multiplier: 8, note: "2,4M+ unidades equivalentes", icon: "💎" },
  { title: "Infiel", type: "single", level: "Diamante", multiplier: 2, note: "Registros históricos de diamante múltiplo", icon: "💎" },
  { title: "Amante Não Tem Lar", type: "single", level: "Diamante", multiplier: 2, icon: "💎" },
  { title: "Ciumeira", type: "single", level: "Diamante", multiplier: 2, icon: "💎" },
  { title: "Transplante", artist: "c/ Bruno & Marrone", type: "single", level: "Diamante", multiplier: 2, icon: "💎" },
  { title: "A Culpa É Dele", artist: "c/ Maiara & Maraisa", type: "single", level: "Diamante", multiplier: 1, icon: "💎" },
  { title: "Graveto", type: "single", level: "Diamante", multiplier: 1, note: "Múltiplas certificações de Platina & Diamante", icon: "💎" },
  { title: "De Quem É a Culpa?", type: "single", level: "Diamante", multiplier: 1, note: "Múltiplas certificações de Platina & Diamante", icon: "💎" },
];

const ALBUM_CERTS: Certification[] = [
  { title: "Todos os Cantos, Vol. 1", type: "album", level: "Diamante", multiplier: 4, note: "Álbum vencedor do Grammy Latino 2019", icon: "💎" },
  { title: "Festa das Patroas 35%", artist: "c/ Maiara & Maraisa", type: "album", level: "Diamante", multiplier: 3, icon: "💎" },
  { title: "Decretos Reais", type: "album", level: "Diamante", multiplier: 2, note: "Álbum vencedor do Grammy Latino 2023", icon: "💎" },
  { title: "Festa das Patroas", artist: "c/ Maiara & Maraisa", type: "album", level: "Diamante", multiplier: 2, icon: "💎" },
  { title: "Todos os Cantos, Vol. 2", type: "album", level: "Diamante", multiplier: 1, icon: "💎" },
  { title: "Todos os Cantos, Vol. 3", type: "album", level: "Platina", multiplier: 3, icon: "🏅" },
  { title: "Patroas (2020/2021)", artist: "c/ Maiara & Maraisa", type: "album", level: "Platina", multiplier: 2, icon: "🏅" },
];

function CertBadge({ cert }: { cert: Certification }) {
  const isDiamond = cert.level === "Diamante";
  return (
    <div
      className={`p-4 rounded-2xl border transition-all ${
        isDiamond
          ? "bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 border-cyan-500/30 hover:border-cyan-400/50"
          : "bg-gradient-to-br from-amber-500/10 to-yellow-500/5 border-amber-500/20 hover:border-amber-400/40"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-xl shrink-0">{cert.icon}</span>
          <div className="min-w-0">
            <h4 className="text-sm font-bold text-white truncate">{cert.title}</h4>
            {cert.artist && <p className="text-[11px] text-zinc-400 truncate">{cert.artist}</p>}
            {cert.note && <p className="text-[10px] text-cyan-300/80 truncate mt-0.5">{cert.note}</p>}
          </div>
        </div>
        <div
          className={`shrink-0 px-2.5 py-1 rounded-lg text-xs font-black font-mono ${
            isDiamond
              ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
              : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
          }`}
        >
          {cert.multiplier > 1 ? `${cert.multiplier}× ` : ""}
          {cert.level}
        </div>
      </div>
    </div>
  );
}

export function CertificationsShowcase() {
  const [showAllSingles, setShowAllSingles] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "singles" | "albums">("all");

  const diamondPlaquesSingles = SINGLE_CERTS.filter((c) => c.level === "Diamante").reduce(
    (sum, c) => sum + c.multiplier,
    0
  );
  const diamondPlaquesAlbums = ALBUM_CERTS.filter((c) => c.level === "Diamante").reduce(
    (sum, c) => sum + c.multiplier,
    0
  );

  const displayedSingles = showAllSingles ? SINGLE_CERTS : SINGLE_CERTS.slice(0, 6);
  const items =
    activeTab === "singles"
      ? displayedSingles
      : activeTab === "albums"
      ? ALBUM_CERTS
      : [...SINGLE_CERTS.slice(0, 4), ...ALBUM_CERTS.slice(0, 4)];

  return (
    <div className="rounded-3xl border border-white/10 bg-zinc-900/60 backdrop-blur-xl p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-6 border-b border-zinc-800/80">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Gem className="h-3.5 w-3.5" />
            <span>Certificações Oficiais Pro-Música Brasil</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Placas de Diamante &amp; Platina
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Certificações pela metodologia TEA (vendas físicas, downloads e streaming de áudio e vídeo) emitidas pela Pro-Música Brasil (antiga ABPD).
          </p>
        </div>

        {/* Summary Boxes */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <div className="px-4 py-3 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-blue-500/10 border border-cyan-500/30 text-center">
            <span className="text-2xl font-black font-mono text-cyan-300">
              {diamondPlaquesSingles + diamondPlaquesAlbums}+
            </span>
            <p className="text-[10px] text-cyan-400 font-bold uppercase mt-0.5">
              Placas de Diamante
            </p>
          </div>
          <div className="px-4 py-3 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-transparent border border-cyan-500/20 text-center">
            <span className="text-2xl font-black font-mono text-white">10×</span>
            <p className="text-[10px] text-zinc-400 font-bold uppercase mt-0.5">Leão (recorde)</p>
          </div>
          <div className="px-4 py-3 rounded-2xl bg-gradient-to-r from-amber-500/15 to-transparent border border-amber-500/25 text-center">
            <span className="text-2xl font-black font-mono text-amber-300">8×</span>
            <p className="text-[10px] text-zinc-400 font-bold uppercase mt-0.5">Supera (single)</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "all"
                ? "bg-cyan-500/20 border border-cyan-500/40 text-cyan-300"
                : "bg-black/30 border border-white/5 text-zinc-400 hover:text-white"
            }`}
          >
            Destaques
          </button>
          <button
            onClick={() => setActiveTab("singles")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "singles"
                ? "bg-cyan-500/20 border border-cyan-500/40 text-cyan-300"
                : "bg-black/30 border border-white/5 text-zinc-400 hover:text-white"
            }`}
          >
            <Disc className="inline w-3.5 h-3.5 mr-1.5" />
            Singles ({SINGLE_CERTS.length})
          </button>
          <button
            onClick={() => setActiveTab("albums")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "albums"
                ? "bg-cyan-500/20 border border-cyan-500/40 text-cyan-300"
                : "bg-black/30 border border-white/5 text-zinc-400 hover:text-white"
            }`}
          >
            <Award className="inline w-3.5 h-3.5 mr-1.5" />
            Álbuns ({ALBUM_CERTS.length})
          </button>
        </div>

        <span className="inline-flex items-center gap-1.5 text-[11px] text-zinc-400">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          Base Oficial: Pro-Música Brasil / Som Livre
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {items.map((cert, i) => (
          <CertBadge key={`${cert.title}-${i}`} cert={cert} />
        ))}
      </div>

      {/* Show more (singles only) */}
      {activeTab === "singles" && SINGLE_CERTS.length > 6 && (
        <div className="flex justify-center pt-2">
          <button
            onClick={() => setShowAllSingles(!showAllSingles)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-xs font-medium text-zinc-400 hover:text-white transition-all"
          >
            {showAllSingles ? (
              <>
                <ChevronUp className="w-3.5 h-3.5" />
                <span>Ver menos</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5" />
                <span>Ver todas ({SINGLE_CERTS.length} faixas em destaque)</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
