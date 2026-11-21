"use client";

import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from "react";
import catalogData from "@/lib/verifiedCatalog.json";

export interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  album?: string;
  coverUrl: string;
  audioUrl?: string;
  era?: string;
}

interface CatalogEntry {
  title: string;
  artist: string;
  album?: string;
  previewUrl: string;
  artworkUrl: string;
  audioUrl?: string;
  coverUrl?: string;
}

export const PREVIEW_TRACKS_CATALOG: Record<string, CatalogEntry> = catalogData as Record<string, CatalogEntry>;

// Provide aliases for keys with or without hyphens
Object.keys(catalogData).forEach((key) => {
  const normalizedKey = key.replace(/-/g, "");
  if (!PREVIEW_TRACKS_CATALOG[normalizedKey]) {
    PREVIEW_TRACKS_CATALOG[normalizedKey] = (catalogData as any)[key];
  }
});

interface AudioPlayerContextType {
  currentTrack: AudioTrack | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  progress: number;
  volume: number;
  isLoading: boolean;
  playTrack: (track: AudioTrack) => void;
  pauseTrack: () => void;
  togglePlay: () => void;
  seek: (progressFraction: number) => void;
  setVolume: (vol: number) => void;
  closePlayer: () => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

export function AudioPlayerProvider({ children }: { children: React.ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(30);
  const [volume, setVolumeState] = useState(0.9);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const audio = new Audio();
      audio.volume = volume;
      audio.preload = "auto";
      audioRef.current = audio;

      const handleTimeUpdate = () => {
        setCurrentTime(audio.currentTime);
        if (audio.duration && !isNaN(audio.duration)) {
          setDuration(audio.duration);
        }
      };

      const handleEnded = () => {
        setIsPlaying(false);
        setCurrentTime(0);
      };

      const handlePlay = () => {
        setIsPlaying(true);
        setIsLoading(false);
      };

      const handleWaiting = () => {
        setIsLoading(true);
      };

      const handlePlaying = () => {
        setIsLoading(false);
        setIsPlaying(true);
      };

      const handleError = (e: any) => {
        console.warn("[AudioPlayer] Erro na reprodução da faixa:", e);
        setIsLoading(false);
        setIsPlaying(false);
      };

      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("ended", handleEnded);
      audio.addEventListener("play", handlePlay);
      audio.addEventListener("playing", handlePlaying);
      audio.addEventListener("waiting", handleWaiting);
      audio.addEventListener("error", handleError);

      return () => {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("ended", handleEnded);
        audio.removeEventListener("play", handlePlay);
        audio.removeEventListener("playing", handlePlaying);
        audio.removeEventListener("waiting", handleWaiting);
        audio.removeEventListener("error", handleError);
        audio.pause();
      };
    }
  }, []);

  const playTrack = useCallback(
    (track: AudioTrack) => {
      if (!audioRef.current) return;

      // Se clicar na mesma faixa que já está tocando, pausa/despausa
      if (currentTrack?.id === track.id && audioRef.current.src) {
        if (audioRef.current.paused) {
          audioRef.current
            .play()
            .then(() => setIsPlaying(true))
            .catch((err) => console.warn("[AudioPlayer] Erro ao retomar áudio:", err));
        } else {
          audioRef.current.pause();
          setIsPlaying(false);
        }
        return;
      }

      setIsLoading(true);

      // Normaliza identificadores
      const idSlug = (track.id || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

      const titleSlug = (track.title || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

      // Busca no catálogo verificado
      const catalogHit: CatalogEntry | undefined =
        PREVIEW_TRACKS_CATALOG[idSlug] ||
        PREVIEW_TRACKS_CATALOG[titleSlug] ||
        (Object.values(PREVIEW_TRACKS_CATALOG).find(
          (item) =>
            item.title.toLowerCase().includes(track.title.toLowerCase()) ||
            track.title.toLowerCase().includes(item.title.toLowerCase().replace(/ \([^)]*\)/, ""))
        ) as CatalogEntry | undefined) ||
        PREVIEW_TRACKS_CATALOG["leao"];

      // Determina URL de áudio permanente
      let finalAudioUrl =
        track.audioUrl && !track.audioUrl.includes("p.scdn.co")
          ? track.audioUrl
          : catalogHit?.previewUrl || catalogHit?.audioUrl || PREVIEW_TRACKS_CATALOG["leao"].previewUrl;

      // Determina capa de alta resolução
      let finalCoverUrl =
        track.coverUrl && !track.coverUrl.includes("i.scdn.co")
          ? track.coverUrl
          : catalogHit?.artworkUrl || catalogHit?.coverUrl || PREVIEW_TRACKS_CATALOG["leao"].artworkUrl;

      const updatedTrack: AudioTrack = {
        ...track,
        audioUrl: finalAudioUrl,
        coverUrl: finalCoverUrl || track.coverUrl,
      };

      setCurrentTrack(updatedTrack);

      // Toca o áudio de forma SÍNCRONA no contexto do clique
      audioRef.current.src = finalAudioUrl;
      audioRef.current.currentTime = 0;
      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setIsLoading(false);
          })
          .catch((err) => {
            console.warn("[AudioPlayer] Reprodução bloqueada pelo navegador:", err);
            setIsPlaying(false);
            setIsLoading(false);
          });
      }
    },
    [currentTrack]
  );

  const pauseTrack = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.warn("[AudioPlayer] Erro ao alternar play:", e));
    }
  }, [isPlaying]);

  const seek = useCallback((fraction: number) => {
    if (!audioRef.current) return;
    const targetTime = fraction * (audioRef.current.duration || 30);
    audioRef.current.currentTime = targetTime;
    setCurrentTime(targetTime);
  }, []);

  const setVolume = useCallback((val: number) => {
    const clamped = Math.max(0, Math.min(1, val));
    setVolumeState(clamped);
    if (audioRef.current) {
      audioRef.current.volume = clamped;
    }
  }, []);

  const closePlayer = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
    setCurrentTrack(null);
  }, []);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <AudioPlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        currentTime,
        duration,
        progress,
        volume,
        isLoading,
        playTrack,
        pauseTrack,
        togglePlay,
        seek,
        setVolume,
        closePlayer,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
}

export function useAudioPlayer() {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error("useAudioPlayer deve ser usado dentro de um AudioPlayerProvider");
  }
  return context;
}
