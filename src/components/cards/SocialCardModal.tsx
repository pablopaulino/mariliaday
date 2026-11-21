"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { ArtistDailyStats, TrackDailyMetric, FanMessage } from "@/types";
import { formatCompactNumber, formatNumber } from "@/lib/utils";
import { Download, Share2, X, Crown, Check, Sparkles, Palette } from "lucide-react";
import { toPng } from "html-to-image";

interface SocialCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: ArtistDailyStats;
  topSpotify: TrackDailyMetric[];
  topYoutube: TrackDailyMetric[];
  featuredMessage?: FanMessage;
}

type TemplateType = "capsula" | "poster";

interface PosterColor {
  id: string;
  name: string;
  hex: string;
  class: string;
}

const POSTER_COLORS: PosterColor[] = [
  { id: "wine", name: "Vinho Real", hex: "#5C140E", class: "bg-[#5C140E]" },
  { id: "obsidian", name: "Obsidian Gold", hex: "#12100E", class: "bg-[#12100E]" },
  { id: "emerald", name: "Esmeralda", hex: "#0D2B22", class: "bg-[#0D2B22]" },
];

// Helper to convert any image URL to Base64 through our proxy to avoid CORS/blank image issues
async function urlToBase64(url: string): Promise<string> {
  if (!url) return "";
  if (url.startsWith("data:")) return url;

  try {
    const targetUrl = url.startsWith("http")
      ? `/api/image-proxy?url=${encodeURIComponent(url)}`
      : url;

    const res = await fetch(targetUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const blob = await res.blob();
    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  } catch (err) {
    console.warn("Image to Base64 fallback for:", url, err);
    return url;
  }
}

function formatDateModel1(dateStr: string): string {
  try {
    const [year, month, day] = dateStr.split("-");
    const months = [
      "jan.", "fev.", "mar.", "abr.", "mai.", "jun.",
      "jul.", "ago.", "set.", "out.", "nov.", "dez."
    ];
    return `${parseInt(day, 10)} de ${months[parseInt(month, 10) - 1]} de ${year}`;
  } catch {
    return "14 de nov. de 2026";
  }
}

function formatDateModel2(dateStr: string): string {
  try {
    const [, month, day] = dateStr.split("-");
    const months = [
      "JAN.", "FEV.", "MAR.", "ABR.", "MAI.", "JUN.",
      "JUL.", "AGO.", "SET.", "OUT.", "NOV.", "DEZ."
    ];
    return `${parseInt(day, 10)} DE ${months[parseInt(month, 10) - 1]}`;
  } catch {
    return "14 DE NOV.";
  }
}

export function SocialCardModal({
  isOpen,
  onClose,
  stats,
  topSpotify,
  topYoutube,
}: SocialCardModalProps) {
  const [template, setTemplate] = useState<TemplateType>("capsula");
  const [posterColor, setPosterColor] = useState<string>("#5C140E");
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [previewScale, setPreviewScale] = useState(0.28);

  const exportCardRef = useRef<HTMLDivElement | null>(null);

  // Preloaded Base64 images
  const [images, setImages] = useState({
    crownBanner: "/marilia-crown-banner.jpg",
    mariliaCircle: "https://i.scdn.co/image/ab6761610000e5ebe6395f30987a29e4bec7de11",
    albumCover: topSpotify[0]?.track?.cover_url || "https://i.scdn.co/image/ab67616d0000b2737604f56fba11b012678da47f",
  });

  // Calculate dynamic scale for the preview to fit comfortably on all viewports
  useEffect(() => {
    const updateScale = () => {
      if (typeof window === "undefined") return;
      const vh = window.innerHeight;
      const targetHeight = Math.min(560, Math.max(370, vh * 0.52));
      setPreviewScale(targetHeight / 1920);
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  // Preload and convert images to Base64
  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    async function loadAllImages() {
      const coverUrl =
        topSpotify[0]?.track?.cover_url ||
        "https://i.scdn.co/image/ab67616d0000b2737604f56fba11b012678da47f";

      const [bCrown, bCircle, bCover] = await Promise.all([
        urlToBase64("/marilia-crown-banner.jpg"),
        urlToBase64("https://i.scdn.co/image/ab6761610000e5ebe6395f30987a29e4bec7de11"),
        urlToBase64(coverUrl),
      ]);

      if (isMounted) {
        setImages({
          crownBanner: bCrown,
          mariliaCircle: bCircle,
          albumCover: bCover,
        });
      }
    }
    loadAllImages();

    return () => {
      isMounted = false;
    };
  }, [isOpen, topSpotify]);

  // Default track lists
  const defaultSpotify = [
    "Leão",
    "Flor e o Beija-Flor",
    "Infiel",
    "Eu Sei De Cor",
    "Troca de Calçada",
  ];
  const defaultYoutube = [
    "Graveto (Ao Vivo)",
    "Bem Pior Que Eu",
    "Todo Mundo Vai Sofrer",
    "Ciumeira",
    "Supera",
  ];

  const spotifyTracks = useMemo(() => {
    const fromProps = topSpotify
      .map((item) => item.track?.title)
      .filter((t): t is string => Boolean(t));
    return [...fromProps, ...defaultSpotify].slice(0, 5);
  }, [topSpotify]);

  const youtubeTracks = useMemo(() => {
    const fromProps = topYoutube
      .map((item) => item.track?.title)
      .filter((t): t is string => Boolean(t));
    return [...fromProps, ...defaultYoutube].slice(0, 5);
  }, [topYoutube]);

  const combinedStreams =
    (stats.spotify_daily_streams || 6940000) +
    (stats.youtube_daily_views || 5800000);

  // Generate PNG file
  const generatePngDataUrl = async (): Promise<string | null> => {
    if (!exportCardRef.current) return null;
    return await toPng(exportCardRef.current, {
      pixelRatio: 1, // Card is already 1080x1920
      cacheBust: true,
      skipAutoScale: true,
      width: 1080,
      height: 1920,
    });
  };

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const dataUrl = await generatePngDataUrl();
      if (!dataUrl) return;

      const link = document.createElement("a");
      const dateStr = stats.date || new Date().toISOString().split("T")[0];
      link.download = `mariliaday-${template}-${dateStr}.png`;
      link.href = dataUrl;
      link.click();

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error("Export error:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShare = async () => {
    setIsGenerating(true);
    try {
      const dataUrl = await generatePngDataUrl();
      if (!dataUrl) return;

      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], `mariliaday-${template}.png`, {
        type: "image/png",
      });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "Marília Day — Estatísticas Diárias",
          text: "Confira as estatísticas de hoje da Rainha Marília Mendonça no Marília Day!",
        });
      } else if (navigator.share) {
        await navigator.share({
          title: "Marília Day — Estatísticas Diárias",
          text: "Confira as estatísticas de hoje da Rainha Marília Mendonça!",
          url: window.location.href,
        });
      } else {
        // Fallback to download
        const link = document.createElement("a");
        link.download = `mariliaday-${template}.png`;
        link.href = dataUrl;
        link.click();
      }
    } catch (err) {
      console.error("Share error:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-3xl border border-white/15 bg-[#121215] shadow-2xl overflow-hidden my-auto">
        {/* Top Glow Decorator */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-28 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Gerador de Cards para Redes Sociais
              </h3>
              <p className="text-xs text-zinc-400">
                Formato Stories 9:16 (1080x1920px em alta resolução)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Control Bar: Model Selectors & Colors */}
        <div className="px-6 py-3 border-b border-white/10 bg-zinc-900/40 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Modelo:
            </span>
            <div className="grid grid-cols-2 gap-2 flex-1 max-w-xs">
              <button
                onClick={() => setTemplate("capsula")}
                className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all ${
                  template === "capsula"
                    ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20"
                    : "bg-zinc-800/80 text-zinc-300 hover:bg-zinc-800"
                }`}
              >
                1. Cápsula do Dia
              </button>
              <button
                onClick={() => setTemplate("poster")}
                className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all ${
                  template === "poster"
                    ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20"
                    : "bg-zinc-800/80 text-zinc-300 hover:bg-zinc-800"
                }`}
              >
                2. Pôster Editorial
              </button>
            </div>
          </div>

          {/* Color Selector for Model 2 */}
          {template === "poster" && (
            <div className="flex items-center justify-between gap-3 pt-1 border-t border-white/5 animate-fadeIn">
              <span className="text-xs font-medium text-zinc-400 flex items-center gap-1.5">
                <Palette className="h-3.5 w-3.5 text-amber-400" /> Cor de Fundo:
              </span>
              <div className="flex items-center gap-2">
                {POSTER_COLORS.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setPosterColor(c.hex)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                      posterColor === c.hex
                        ? "ring-2 ring-amber-400 text-white font-bold bg-white/10"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-white/30"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Live Preview Area (Scaled proportionally) */}
        <div className="py-4 px-6 flex justify-center items-center bg-[#09090B]">
          <div
            className="relative overflow-hidden rounded-2xl shadow-2xl border border-white/15 bg-black"
            style={{
              width: `${1080 * previewScale}px`,
              height: `${1920 * previewScale}px`,
            }}
          >
            <div
              style={{
                width: "1080px",
                height: "1920px",
                transform: `scale(${previewScale})`,
                transformOrigin: "top left",
                pointerEvents: "none",
              }}
            >
              {template === "capsula" ? (
                <Model1CapsuleCard
                  stats={stats}
                  spotifyTracks={spotifyTracks}
                  youtubeTracks={youtubeTracks}
                  combinedStreams={combinedStreams}
                  images={images}
                />
              ) : (
                <Model2PosterCard
                  stats={stats}
                  spotifyTracks={spotifyTracks}
                  youtubeTracks={youtubeTracks}
                  combinedStreams={combinedStreams}
                  bgColor={posterColor}
                  images={images}
                />
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 sm:p-6 border-t border-white/10 bg-[#121215] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-zinc-400 text-center sm:text-left">
            Pronto para postar nos Stories do Instagram
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={handleShare}
              disabled={isGenerating}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/15 text-zinc-200 text-xs sm:text-sm font-semibold hover:bg-white/10 active:scale-95 transition-all"
            >
              <Share2 className="h-4 w-4" />
              <span>Compartilhar</span>
            </button>

            <button
              onClick={handleDownload}
              disabled={isGenerating}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-gold-500 text-black text-xs sm:text-sm font-bold hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50"
            >
              {isGenerating ? (
                <span>Gerando PNG...</span>
              ) : downloadSuccess ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Baixado!</span>
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  <span>Baixar Imagem (PNG)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* OFF-SCREEN EXPORT DOM NODE (Strict 1080x1920) */}
      <div
        style={{
          position: "fixed",
          left: "-9999px",
          top: 0,
          width: "1080px",
          height: "1920px",
          zIndex: -100,
          overflow: "hidden",
        }}
      >
        <div ref={exportCardRef} style={{ width: "1080px", height: "1920px" }}>
          {template === "capsula" ? (
            <Model1CapsuleCard
              stats={stats}
              spotifyTracks={spotifyTracks}
              youtubeTracks={youtubeTracks}
              combinedStreams={combinedStreams}
              images={images}
            />
          ) : (
            <Model2PosterCard
              stats={stats}
              spotifyTracks={spotifyTracks}
              youtubeTracks={youtubeTracks}
              combinedStreams={combinedStreams}
              bgColor={posterColor}
              images={images}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   MODELO 1: CÁPSULA DO DIA (SPOTIFY MÁQUINA DO TEMPO)
   Strict 1080x1920 Layout
   ========================================================================= */
interface CardProps {
  stats: ArtistDailyStats;
  spotifyTracks: string[];
  youtubeTracks: string[];
  combinedStreams: number;
  images: {
    crownBanner: string;
    mariliaCircle: string;
    albumCover: string;
  };
}

function Model1CapsuleCard({
  stats,
  spotifyTracks,
  youtubeTracks,
  combinedStreams,
  images,
}: CardProps) {
  const formattedDate = formatDateModel1(stats.date);

  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        backgroundColor: "#1C1C1E",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Top 32% (614px): Foto com coroa */}
      <div
        style={{
          height: 614,
          width: 1080,
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#D4AF37",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images.crownBanner}
          alt="Marília Mendonça com Coroa"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top center",
          }}
        />
      </div>

      {/* Linha horizontal sólida dourada (4px solid #D4AF37) */}
      <div style={{ height: 5, width: 1080, backgroundColor: "#D4AF37" }} />

      {/* Corpo 68% (1301px): Fundo grafite fosco */}
      <div
        style={{
          flex: 1,
          padding: "70px 80px 60px 80px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          color: "#FFFFFF",
        }}
      >
        <div>
          {/* Header Interno: Logo + Marília Day à esquerda | Data à direita */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <Crown style={{ width: 34, height: 34, color: "#D4AF37" }} />
              <span
                style={{
                  fontSize: 32,
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  color: "#FFFFFF",
                }}
              >
                Marília <span style={{ color: "#D4AF37" }}>Day</span>
              </span>
            </div>
            <span
              style={{
                fontSize: 26,
                fontWeight: 500,
                color: "#A1A1AA",
              }}
            >
              {formattedDate}
            </span>
          </div>

          {/* Título Principal */}
          <div style={{ marginTop: 45 }}>
            <h1
              style={{
                fontSize: 74,
                fontWeight: 900,
                lineHeight: 1.08,
                letterSpacing: "-0.03em",
                color: "#FFFFFF",
                margin: 0,
              }}
            >
              Cápsula <br /> do Dia
            </h1>
          </div>

          {/* Grid de 2 Colunas: Top 5 Spotify & Top 5 YouTube */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 50,
              marginTop: 55,
            }}
          >
            {/* Coluna 1: Top 5 Spotify */}
            <div>
              <h2
                style={{
                  fontSize: 30,
                  fontWeight: 700,
                  color: "#FFFFFF",
                  margin: "0 0 28px 0",
                  letterSpacing: "-0.01em",
                }}
              >
                Top 5 Spotify
              </h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 18,
                }}
              >
                {spotifyTracks.map((title, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      fontSize: 26,
                      color: "#E4E4E7",
                    }}
                  >
                    <span
                      style={{
                        fontWeight: 700,
                        color: "#A1A1AA",
                        width: 28,
                      }}
                    >
                      {idx + 1}
                    </span>
                    <span
                      style={{
                        fontWeight: 500,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: 380,
                      }}
                    >
                      {title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Coluna 2: Top 5 YouTube */}
            <div>
              <h2
                style={{
                  fontSize: 30,
                  fontWeight: 700,
                  color: "#FFFFFF",
                  margin: "0 0 28px 0",
                  letterSpacing: "-0.01em",
                }}
              >
                Top 5 YouTube
              </h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 18,
                }}
              >
                {youtubeTracks.map((title, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      fontSize: 26,
                      color: "#E4E4E7",
                    }}
                  >
                    <span
                      style={{
                        fontWeight: 700,
                        color: "#A1A1AA",
                        width: 28,
                      }}
                    >
                      {idx + 1}
                    </span>
                    <span
                      style={{
                        fontWeight: 500,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: 380,
                      }}
                    >
                      {title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Rodapé de Impacto */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255, 255, 255, 0.12)",
            paddingTop: 35,
          }}
        >
          <div>
            <p
              style={{
                fontSize: 24,
                fontWeight: 600,
                color: "#D4D4D8",
                margin: "0 0 8px 0",
              }}
            >
              Streams nas últimas 24h
            </p>
            <p
              style={{
                fontSize: 66,
                fontWeight: 900,
                letterSpacing: "-0.03em",
                color: "#1ED760", // Verde Spotify oficial
                margin: 0,
                lineHeight: 1,
              }}
            >
              {formatNumber(combinedStreams)} streams
            </p>
          </div>

          <span
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: "#71717A",
              letterSpacing: "0.05em",
            }}
          >
            mariliaday.com.br
          </span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   MODELO 2: PÔSTER EDITORIAL (SPOTIFY ESTATÍSTICAS MUSICAIS)
   Strict 1080x1920 Layout
   ========================================================================= */
interface PosterProps extends CardProps {
  bgColor: string;
}

function Model2PosterCard({
  stats,
  spotifyTracks,
  youtubeTracks,
  combinedStreams,
  bgColor,
  images,
}: PosterProps) {
  const dateCaps = formatDateModel2(stats.date);

  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        backgroundColor: bgColor,
        padding: "85px 85px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
        color: "#F5EFE6",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* 1. Bloco Superior: Foto Circular à esquerda + Top 5 Spotify à direita */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 50,
        }}
      >
        {/* Foto circular grande de alta nitidez */}
        <div
          style={{
            width: 280,
            height: 280,
            borderRadius: "50%",
            overflow: "hidden",
            flexShrink: 0,
            border: "4px solid rgba(245, 239, 230, 0.25)",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
            backgroundColor: "#000",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images.mariliaCircle}
            alt="Marília Mendonça"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        {/* Top 5 Spotify Hoje */}
        <div style={{ flex: 1, paddingLeft: 10 }}>
          <h2
            style={{
              fontSize: 34,
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "-0.01em",
              color: "#F5EFE6",
              margin: "0 0 22px 0",
            }}
          >
            Top 5 Spotify Hoje
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {spotifyTracks.map((title, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 14,
                  fontSize: idx === 0 ? 30 : 26,
                  fontWeight: idx === 0 ? 900 : 500,
                  color: idx === 0 ? "#F5EFE6" : "rgba(245, 239, 230, 0.88)",
                }}
              >
                <span
                  style={{
                    width: 24,
                    fontWeight: idx === 0 ? 900 : 700,
                    color: idx === 0 ? "#F5EFE6" : "rgba(245, 239, 230, 0.7)",
                  }}
                >
                  {idx + 1}
                </span>
                <span
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: 420,
                  }}
                >
                  {title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Bloco Central: Destaque Tipográfico Gigante */}
      <div style={{ margin: "40px 0" }}>
        <h1
          style={{
            fontSize: 116,
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "-0.04em",
            lineHeight: 0.95,
            color: "#F5EFE6",
            margin: 0,
          }}
        >
          {dateCaps}
        </h1>
        <p
          style={{
            fontSize: 50,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "rgba(245, 239, 230, 0.92)",
            margin: "24px 0 0 0",
          }}
        >
          {formatCompactNumber(combinedStreams)} streams hoje
        </p>
      </div>

      {/* 3. Bloco Inferior: Top 5 YouTube à esquerda + Capa Rotacionada #1 à direita */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          position: "relative",
          minHeight: 380,
        }}
      >
        {/* Top 5 YouTube */}
        <div style={{ flex: 1, zIndex: 10, maxWidth: 540 }}>
          <h2
            style={{
              fontSize: 34,
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "-0.01em",
              color: "#F5EFE6",
              margin: "0 0 22px 0",
            }}
          >
            Top 5 YouTube Hoje
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {youtubeTracks.map((title, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 14,
                  fontSize: idx === 0 ? 30 : 26,
                  fontWeight: idx === 0 ? 900 : 500,
                  color: idx === 0 ? "#F5EFE6" : "rgba(245, 239, 230, 0.88)",
                }}
              >
                <span
                  style={{
                    width: 24,
                    fontWeight: idx === 0 ? 900 : 700,
                    color: idx === 0 ? "#F5EFE6" : "rgba(245, 239, 230, 0.7)",
                  }}
                >
                  {idx + 1}
                </span>
                <span
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: 420,
                  }}
                >
                  {title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Capa quadrada nítida da música/álbum #1 levemente rotacionada sangrando à direita */}
        <div
          style={{
            position: "absolute",
            right: -40,
            bottom: 20,
            width: 360,
            height: 360,
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: "0 35px 70px -15px rgba(0, 0, 0, 0.85)",
            border: "3px solid rgba(245, 239, 230, 0.2)",
            transform: "rotate(-6deg)",
            backgroundColor: "#000",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images.albumCover}
            alt="Álbum #1 do Dia"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      </div>

      {/* 4. Rodapé */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid rgba(245, 239, 230, 0.2)",
          paddingTop: 30,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Crown style={{ width: 32, height: 32, color: "#F5EFE6" }} />
          <span
            style={{
              fontSize: 28,
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "-0.01em",
              color: "#F5EFE6",
            }}
          >
            Marília Day
          </span>
        </div>

        <span
          style={{
            fontSize: 20,
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            color: "rgba(245, 239, 230, 0.8)",
          }}
        >
          ESTATÍSTICAS DIÁRIAS • MARILIADAY.COM.BR
        </span>
      </div>
    </div>
  );
}
