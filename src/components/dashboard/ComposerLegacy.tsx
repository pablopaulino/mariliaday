"use client";

import { Feather, Sparkles, Music, Play, ExternalLink, Flame } from "lucide-react";
import { useAudioPlayer, PREVIEW_TRACKS_CATALOG } from "@/context/AudioPlayerContext";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

interface ComposedHit {
  id: string;
  title: string;
  recordedBy: string;
  year: number;
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
    year: 2014,
    totalStreams: "+1,2 Bilhão",
    story: "Composta por Marília aos 18 anos, tornou-se o maior clássico de término e desapego da música brasileira moderna, liderando rádios por mais de 6 meses ininterruptos.",
    coverUrl: PREVIEW_TRACKS_CATALOG["cuida-bem-dela"]?.artworkUrl || "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/b7/41/9c/b7419cae-9f05-be20-46f3-ac901e027c73/00602438992638_Cover.jpg/600x600bb.jpg",
    audioUrl: PREVIEW_TRACKS_CATALOG["cuida-bem-dela"]?.previewUrl,
  },
  {
    id: "ate-voce-voltar",
    title: "Até Você Voltar",
    recordedBy: "Henrique & Juliano",
    year: 2014,
    totalStreams: "+980 Milhões",
    story: "Um dos maiores hinos de saudade do sertanejo. A canção consolidou Henrique & Juliano no topo do Brasil e provou a força da poesia visceral de Marília.",
    coverUrl: PREVIEW_TRACKS_CATALOG["ate-voce-voltar"]?.artworkUrl || "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/30/4e/32/304e3292-d4e1-05c1-2158-6e14b5ab6cef/7891430363123.jpg/600x600bb.jpg",
    audioUrl: PREVIEW_TRACKS_CATALOG["ate-voce-voltar"]?.previewUrl,
  },
  {
    id: "calma",
    title: "Calma",
    recordedBy: "Jorge & Mateus",
    year: 2014,
    totalStreams: "+680 Milhões",
    story: "Gravada pela maior dupla do país no DVD 'Os Anjos Cantam', revelou ao mercado o talento maduro e emocionante de Marília Mendonça como autora.",
    coverUrl: PREVIEW_TRACKS_CATALOG["calma"]?.artworkUrl || "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/de/b1/13/deb1133a-2388-c753-a5ad-4d4659cef9f9/7891430378028.jpg/600x600bb.jpg",
    audioUrl: PREVIEW_TRACKS_CATALOG["calma"]?.previewUrl,
  },
  {
    id: "e-com-ela-que-eu-estou",
    title: "É Com Ela Que Eu Estou",
    recordedBy: "Cristiano Araújo",
    year: 2014,
    totalStreams: "+750 Milhões",
    story: "Um dos maiores sucessos da carreira inesquecível de Cristiano Araújo. A letra sincera e direta conquistou o país e permanece como um clássico eterno.",
    coverUrl: PREVIEW_TRACKS_CATALOG["e-com-ela-que-eu-estou"]?.artworkUrl || "https://is1-ssl.mzstatic.com/image/thumb/Music3/v4/29/7d/48/297d4822-dc9b-3da3-f08c-97994a920c33/7891430371425.jpg/600x600bb.jpg",
    audioUrl: PREVIEW_TRACKS_CATALOG["e-com-ela-que-eu-estou"]?.previewUrl,
  },
  {
    id: "muito-gelo-e-pouco-uisque",
    title: "Muito Gelo e Pouco Uísque",
    recordedBy: "Wesley Safadão",
    year: 2015,
    totalStreams: "+420 Milhões",
    story: "Marília expandiu seu domínio para o forró e a música de balada, compondo este hit histórico que tocou em todos os carnavais e vaquejadas do país.",
    coverUrl: PREVIEW_TRACKS_CATALOG["muito-gelo-e-pouco-uisque"]?.artworkUrl || "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/6b/61/3e/6b613eef-d2af-b237-0336-5b214527317e/889845933281.jpg/600x600bb.jpg",
    audioUrl: PREVIEW_TRACKS_CATALOG["muito-gelo-e-pouco-uisque"]?.previewUrl,
  },
  {
    id: "incerteza",
    title: "Ser Humano Ou Anjo",
    recordedBy: "Matheus & Kauan",
    year: 2015,
    totalStreams: "+510 Milhões",
    story: "Composição poética de Marília gravada no histórico álbum 'Na Praia', tornando-se hino romântico que tocou milhões de corações em todo o Brasil.",
    coverUrl: PREVIEW_TRACKS_CATALOG["incerteza"]?.artworkUrl || "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/52/a5/aa/52a5aa33-ec6b-1c52-fd57-73a183f587b0/191773483616.jpg/600x600bb.jpg",
    audioUrl: PREVIEW_TRACKS_CATALOG["incerteza"]?.previewUrl,
  },
];

export function ComposerLegacy() {
  const { playTrack, currentTrack, isPlaying } = useAudioPlayer();

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
            <span>O Legado Autoral da Rainha</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Marília Compositora</span>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
              A Caneta Mais Valiosa do Brasil
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Antes e durante sua consagração nos palcos, Marília assinou os maiores hinos cantados por outras lendas da música.
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
            <span className="text-[10px] text-zinc-500">em vozes de terceiros</span>
          </div>
        </div>
      </div>

      {/* Grid of Composition Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {COMPOSED_HITS.map((hit) => {
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
                    title="Ouvir prévia"
                  >
                    <Play className={`w-3.5 h-3.5 fill-current ${isCurrentPlaying ? "animate-pulse" : ""}`} />
                  </button>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                  {hit.story}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-zinc-500">Consumo Acumulado:</span>
                <strong className="font-mono font-bold text-amber-300">{hit.totalStreams}</strong>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
