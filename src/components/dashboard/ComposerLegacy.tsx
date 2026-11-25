"use client";

import { useState } from "react";
import { Feather, Sparkles, Play, ChevronDown, ChevronUp, Music2 } from "lucide-react";
import { useAudioPlayer, PREVIEW_TRACKS_CATALOG } from "@/context/AudioPlayerContext";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

interface ComposedHit {
  id: string;
  title: string;
  recordedBy: string;
  category: "henrique_juliano" | "maiara_maraisa" | "outros";
  year: number;
  coWriters: string;
  totalStreams: string;
  story: string;
  coverUrl: string;
  audioUrl?: string;
}

const COMPOSED_HITS: ComposedHit[] = [
  {
    id: "cuida-bem-dela",
    title: "Cuida Bem Dela",
    recordedBy: "Henrique & Juliano",
    category: "henrique_juliano",
    year: 2014,
    coWriters: "Marília Mendonça / Juliano Tchula / Maraisa",
    totalStreams: "+1,2 Bilhão",
    story: "Um dos maiores clássicos da música brasileira moderna, liderou rádios por mais de 6 meses ininterruptos.",
    coverUrl: PREVIEW_TRACKS_CATALOG["cuida-bem-dela"]?.artworkUrl || "/marilia-crown-banner.jpg",
    audioUrl: PREVIEW_TRACKS_CATALOG["cuida-bem-dela"]?.previewUrl,
  },
  {
    id: "flor-e-o-beija-flor",
    title: "Flor e o Beija-Flor",
    recordedBy: "Henrique & Juliano (c/ Marília)",
    category: "henrique_juliano",
    year: 2015,
    coWriters: "Marília Mendonça / Juliano Tchula",
    totalStreams: "+1,1 Bilhão",
    story: "Composição poética assinada com Juliano Tchula no DVD 'Novas Histórias', onde Marília também brilhou nos vocais.",
    coverUrl: PREVIEW_TRACKS_CATALOG["flor-e-o-beija-flor"]?.artworkUrl || "/marilia-crown-banner.jpg",
    audioUrl: PREVIEW_TRACKS_CATALOG["flor-e-o-beija-flor"]?.previewUrl,
  },
  {
    id: "ate-voce-voltar",
    title: "Até Você Voltar",
    recordedBy: "Henrique & Juliano",
    category: "henrique_juliano",
    year: 2014,
    coWriters: "Marília Mendonça / Juliano Tchula",
    totalStreams: "+980 Milhões",
    story: "Hino visceral de saudade que consolidou Henrique & Juliano no topo do país e mostrou a força autoral de Marília.",
    coverUrl: PREVIEW_TRACKS_CATALOG["ate-voce-voltar"]?.artworkUrl || "/marilia-crown-banner.jpg",
    audioUrl: PREVIEW_TRACKS_CATALOG["ate-voce-voltar"]?.previewUrl,
  },
  {
    id: "e-com-ela-que-eu-estou",
    title: "É Com Ela Que Eu Estou",
    recordedBy: "Cristiano Araújo",
    category: "outros",
    year: 2014,
    coWriters: "Marília Mendonça / Frederico / Cristiano Araújo / Juliano Tchula",
    totalStreams: "+750 Milhões",
    story: "Um dos maiores hinos da carreira eterna de Cristiano Araújo. Letra sincera e arrebatadora.",
    coverUrl: PREVIEW_TRACKS_CATALOG["e-com-ela-que-eu-estou"]?.artworkUrl || "/marilia-crown-banner.jpg",
    audioUrl: PREVIEW_TRACKS_CATALOG["e-com-ela-que-eu-estou"]?.previewUrl,
  },
  {
    id: "calma",
    title: "Calma",
    recordedBy: "Jorge & Mateus",
    category: "outros",
    year: 2014,
    coWriters: "Marília Mendonça / Élcio di Carvalho / Daniel Rodrigues / Ednan Willian",
    totalStreams: "+680 Milhões",
    story: "Gravada pela maior dupla do país no álbum 'Os Anjos Cantam', revelando a maturidade precoce de Marília como autora.",
    coverUrl: PREVIEW_TRACKS_CATALOG["calma"]?.artworkUrl || "/marilia-crown-banner.jpg",
    audioUrl: PREVIEW_TRACKS_CATALOG["calma"]?.previewUrl,
  },
  {
    id: "minha-heranca",
    title: "Minha Herança (Aos 12 Anos!)",
    recordedBy: "João Neto & Frederico",
    category: "outros",
    year: 2007,
    coWriters: "Marília Mendonça / Frederico",
    totalStreams: "Marco Inaugural",
    story: "Coescrita quando Marília tinha apenas 12 anos de idade! Foi a porta de entrada da compositora prodígio no mercado sertanejo.",
    coverUrl: PREVIEW_TRACKS_CATALOG["minha-heranca"]?.artworkUrl || "/marilia-crown-banner.jpg",
    audioUrl: PREVIEW_TRACKS_CATALOG["minha-heranca"]?.previewUrl,
  },
  {
    id: "impasse",
    title: "Impasse",
    recordedBy: "Marília Mendonça feat. Henrique & Juliano",
    category: "henrique_juliano",
    year: 2015,
    coWriters: "Marília Mendonça",
    totalStreams: "+260 Milhões",
    story: "Composta e gravada por Marília ao lado dos amigos Henrique & Juliano — faixa que impulsionou sua transição para os palcos.",
    coverUrl: PREVIEW_TRACKS_CATALOG["impasse"]?.artworkUrl || "/marilia-crown-banner.jpg",
    audioUrl: PREVIEW_TRACKS_CATALOG["impasse"]?.previewUrl,
  },
  {
    id: "mudou-a-estacao",
    title: "Mudou a Estação",
    recordedBy: "Henrique & Juliano (c/ Marília)",
    category: "henrique_juliano",
    year: 2017,
    coWriters: "Marília Mendonça",
    totalStreams: "+290 Milhões",
    story: "Mais uma parceria visceral da safra dourada de Goiânia entre Marília e a dupla Henrique & Juliano.",
    coverUrl: PREVIEW_TRACKS_CATALOG["mudou-a-estacao"]?.artworkUrl || "/marilia-crown-banner.jpg",
    audioUrl: PREVIEW_TRACKS_CATALOG["mudou-a-estacao"]?.previewUrl,
  },
  {
    id: "no-dia-do-seu-casamento",
    title: "No Dia do Seu Casamento",
    recordedBy: "Maiara & Maraisa",
    category: "maiara_maraisa",
    year: 2015,
    coWriters: "Marília Mendonça / Juliano Tchula / Maraisa",
    totalStreams: "+310 Milhões",
    story: "Hit avassalador da amizade histórica das Patroas em Goiânia antes mesmo do projeto conjunto existir.",
    coverUrl: PREVIEW_TRACKS_CATALOG["no-dia-do-seu-casamento"]?.artworkUrl || "/marilia-crown-banner.jpg",
    audioUrl: PREVIEW_TRACKS_CATALOG["no-dia-do-seu-casamento"]?.previewUrl,
  },
  {
    id: "dois-idiotas",
    title: "Dois Idiotas",
    recordedBy: "Maiara & Maraisa",
    category: "maiara_maraisa",
    year: 2015,
    coWriters: "Marília Mendonça",
    totalStreams: "+180 Milhões",
    story: "Composição marcante da fase inicial de Maiara & Maraisa escrita em parceria com a Rainha da Sofrência.",
    coverUrl: PREVIEW_TRACKS_CATALOG["dois-idiotas"]?.artworkUrl || "/marilia-crown-banner.jpg",
    audioUrl: PREVIEW_TRACKS_CATALOG["dois-idiotas"]?.previewUrl,
  },
  {
    id: "show-completo",
    title: "Show Completo",
    recordedBy: "Maiara & Maraisa",
    category: "maiara_maraisa",
    year: 2016,
    coWriters: "Marília Mendonça",
    totalStreams: "+160 Milhões",
    story: "Faixa icônica do DVD 'Ao Vivo em Goiânia' que ajudou a consolidar a revolução feminina no sertanejo.",
    coverUrl: PREVIEW_TRACKS_CATALOG["show-completo"]?.artworkUrl || "/marilia-crown-banner.jpg",
    audioUrl: PREVIEW_TRACKS_CATALOG["show-completo"]?.previewUrl,
  },
  {
    id: "incerteza",
    title: "Ser Humano Ou Anjo (Álbum 'Incerteza' / Na Praia)",
    recordedBy: "Matheus & Kauan",
    category: "outros",
    year: 2015,
    coWriters: "Marília Mendonça (também coautora de 'Incerteza')",
    totalStreams: "+510 Milhões",
    story: "Parceria poética de Marília com Matheus & Kauan, incluindo os sucessos românticos que marcaram 'Na Praia'.",
    coverUrl: PREVIEW_TRACKS_CATALOG["incerteza"]?.artworkUrl || "/marilia-crown-banner.jpg",
    audioUrl: PREVIEW_TRACKS_CATALOG["incerteza"]?.previewUrl,
  },
  {
    id: "muito-gelo-e-pouco-uisque",
    title: "Muito Gelo e Pouco Uísque",
    recordedBy: "Wesley Safadão",
    category: "outros",
    year: 2015,
    coWriters: "Marília Mendonça",
    totalStreams: "+420 Milhões",
    story: "Mostrando versatilidade fora do sertanejo, Marília emplacou este megahit do forró elétrico e vaquejadas em todo o Brasil.",
    coverUrl: PREVIEW_TRACKS_CATALOG["muito-gelo-e-pouco-uisque"]?.artworkUrl || "/marilia-crown-banner.jpg",
    audioUrl: PREVIEW_TRACKS_CATALOG["muito-gelo-e-pouco-uisque"]?.previewUrl,
  },
  {
    id: "gago",
    title: "Gago",
    recordedBy: "Lucas Lucco",
    category: "outros",
    year: 2014,
    coWriters: "Marília Mendonça / Juliano Tchula / Gregory Castro",
    totalStreams: "+120 Milhões",
    story: "Um dos grandes sucessos românticos gravados por Lucas Lucco (ao lado de 'Saudade Idiota', também de Marília).",
    coverUrl: PREVIEW_TRACKS_CATALOG["gago"]?.artworkUrl || "/marilia-crown-banner.jpg",
    audioUrl: PREVIEW_TRACKS_CATALOG["gago"]?.previewUrl,
  },
  {
    id: "preferencia",
    title: "Preferência",
    recordedBy: "Cleber & Cauan",
    category: "outros",
    year: 2015,
    coWriters: "Marília Mendonça",
    totalStreams: "+95 Milhões",
    story: "Clássico goiano composto por Marília que virou destaque obrigatório nas noites e rodeios do Centro-Oeste.",
    coverUrl: PREVIEW_TRACKS_CATALOG["preferencia"]?.artworkUrl || "/marilia-crown-banner.jpg",
    audioUrl: PREVIEW_TRACKS_CATALOG["preferencia"]?.previewUrl,
  },
  {
    id: "vai-ter-balanga",
    title: "Vai Ter Balanga",
    recordedBy: "João Neto & Frederico",
    category: "outros",
    year: 2014,
    coWriters: "Marília Mendonça",
    totalStreams: "+80 Milhões",
    story: "Lado descontraído e dançante da caneta de Marília gravado pelos primeiros incentivadores de sua carreira.",
    coverUrl: PREVIEW_TRACKS_CATALOG["vai-ter-balanga"]?.artworkUrl || "/marilia-crown-banner.jpg",
    audioUrl: PREVIEW_TRACKS_CATALOG["vai-ter-balanga"]?.previewUrl,
  },
];

export function ComposerLegacy() {
  const { playTrack, currentTrack, isPlaying } = useAudioPlayer();
  const [filter, setFilter] = useState<"all" | "henrique_juliano" | "maiara_maraisa" | "outros">("all");
  const [showAll, setShowAll] = useState(false);

  const filteredHits = COMPOSED_HITS.filter((h) => filter === "all" || h.category === filter);
  const visibleHits = showAll || filter !== "all" ? filteredHits : filteredHits.slice(0, 6);

  const handlePlay = (hit: ComposedHit) => {
    playTrack({
      id: hit.id,
      title: hit.title,
      artist: hit.recordedBy,
      album: `Composta por Marília Mendonça (${hit.year})`,
      coverUrl: hit.coverUrl,
      audioUrl: hit.audioUrl,
      era: "Marília Compositora",
    });
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-zinc-900/60 backdrop-blur-xl p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-6 border-b border-zinc-800/80">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Feather className="h-3.5 w-3.5" />
            <span>O Legado Autoral da Rainha • Catálogo Ecad</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex flex-wrap items-center gap-2">
            <span>Marília Compositora</span>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
              Centenas de Obras Registradas desde os 12 Anos
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Dos 12 aos 19 anos sustentou sua família nos bastidores escrevendo hinos do sertanejo, forró, arrocha e axé para os maiores artistas do país.
          </p>
        </div>

        {/* Big Total Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-gold-500/10 to-transparent border border-amber-500/30 flex items-center gap-4 shrink-0">
          <div className="p-2.5 rounded-xl bg-amber-500 text-black font-black">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-zinc-400 font-medium">Impacto como Autora:</span>
            <div className="text-xl sm:text-2xl font-black font-mono text-white text-gold-gradient">
              +15 Bilhões de Streams
            </div>
            <span className="text-[10px] text-zinc-400">em vozes de dezenas de intérpretes</span>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: "all", label: `Todos os Destaques (${COMPOSED_HITS.length})` },
          { id: "henrique_juliano", label: "Henrique & Juliano" },
          { id: "maiara_maraisa", label: "Maiara & Maraisa" },
          { id: "outros", label: "Outros Gigantes & Ritmos" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as any)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filter === tab.id
                ? "bg-amber-500 text-black shadow-md shadow-amber-500/20"
                : "bg-black/40 border border-white/10 text-zinc-400 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid of Composition Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {visibleHits.map((hit) => {
          const isCurrentPlaying = currentTrack?.id === hit.id && isPlaying;
          return (
            <div
              key={hit.id}
              className="p-5 rounded-2xl bg-black/40 border border-white/10 hover:border-amber-500/30 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-white/10 shadow-md bg-zinc-900">
                    <ImageWithFallback src={hit.coverUrl} alt={hit.title} fill className="object-cover" sizes="48px" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/5 border border-white/10 text-zinc-400">
                      Ano: {hit.year}
                    </span>
                    <h3 className="text-base font-bold text-white tracking-tight truncate mt-0.5">
                      {hit.title}
                    </h3>
                    <p className="text-xs text-amber-400 font-semibold truncate">
                      Voz: {hit.recordedBy}
                    </p>
                  </div>

                  <button
                    onClick={() => handlePlay(hit)}
                    className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 hover:bg-amber-500 hover:text-black transition-all shrink-0"
                    title="Ouvir prévia de 30s"
                  >
                    <Play className={`w-3.5 h-3.5 fill-current ${isCurrentPlaying ? "animate-pulse" : ""}`} />
                  </button>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed font-normal">{hit.story}</p>
                <p className="text-[10px] text-zinc-500 truncate">Autores: {hit.coWriters}</p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-zinc-500">Consumo / Marco:</span>
                <strong className="font-mono font-bold text-amber-300">{hit.totalStreams}</strong>
              </div>
            </div>
          );
        })}
      </div>

      {/* Expand/Collapse button */}
      {filter === "all" && COMPOSED_HITS.length > 6 && (
        <div className="flex justify-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-xs font-bold text-zinc-300 hover:text-white hover:border-amber-500/30 transition-all"
          >
            {showAll ? (
              <>
                <ChevronUp className="w-3.5 h-3.5" />
                <span>Mostrar menos</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5" />
                <span>Ver todas as {COMPOSED_HITS.length} composições com prévia de áudio</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Extra Ecad & Multigenero Footnote */}
      <div className="p-4 rounded-2xl bg-black/30 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-start gap-2.5 text-zinc-300">
          <Music2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>
            <strong className="text-white">Versatilidade Ecad &amp; Outros Ritmos:</strong> Também compôs sucessos como <em>&quot;Abaixa o Som&quot;</em> (Henrique &amp; Juliano), <em>&quot;É Rolo&quot;</em> e <em>&quot;Open Bar&quot;</em> (Maiara &amp; Maraisa), <em>&quot;Saudade Idiota&quot;</em> (Lucas Lucco) e faixas gravadas no forró, arrocha e axé por <strong>Joelma, Gabriel Diniz, Márcia Fellipe</strong> e <strong>Mara Pavanelly</strong>.
          </span>
        </div>
        <span className="text-[11px] font-mono text-zinc-400 shrink-0">Parceiros: Juliano Tchula • Gabriel Agra • Élcio Di Carvalho</span>
      </div>
    </div>
  );
}
