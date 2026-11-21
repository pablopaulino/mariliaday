"use client";

import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from "react";

export interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  album?: string;
  coverUrl: string;
  audioUrl: string;
  era?: string;
}

interface AudioPlayerContextType {
  currentTrack: AudioTrack | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  progress: number;
  volume: number;
  playTrack: (track: AudioTrack) => void;
  pauseTrack: () => void;
  togglePlay: () => void;
  seek: (progressFraction: number) => void;
  setVolume: (vol: number) => void;
  closePlayer: () => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

// High quality preview audio catalog for Marília Mendonça tracks
export const PREVIEW_TRACKS_CATALOG: Record<string, Partial<AudioTrack>> = {
  leao: {
    title: "Leão",
    artist: "Marília Mendonça",
    album: "Decretos Reais, Vol. 2",
    coverUrl: "https://i.scdn.co/image/ab67616d0000b2737604f56fba11b012678da47f",
    audioUrl: "https://p.scdn.co/mp3-preview/c87d46fc9df9ea0b13cf2d07524e9fb5a28b6d85",
  },
  infiel: {
    title: "Infiel (Ao Vivo)",
    artist: "Marília Mendonça",
    album: "Marília Mendonça: Ao Vivo",
    coverUrl: "https://i.scdn.co/image/ab67616d0000b273b378037a544c4e09f58c70fa",
    audioUrl: "https://p.scdn.co/mp3-preview/a9ffb45dbe7b71360155b1064d4ef701729000a6",
  },
  graveto: {
    title: "Graveto (Ao Vivo)",
    artist: "Marília Mendonça",
    album: "Todos os Cantos",
    coverUrl: "https://i.scdn.co/image/ab67616d0000b27303c7ea07c082531da1f7df2b",
    audioUrl: "https://p.scdn.co/mp3-preview/bd7f0e340a6e9bb3bcda6696b5a32976be651343",
  },
  ciumeira: {
    title: "Ciumeira (Ao Vivo)",
    artist: "Marília Mendonça",
    album: "Todos os Cantos",
    coverUrl: "https://i.scdn.co/image/ab67616d0000b27303c7ea07c082531da1f7df2b",
    audioUrl: "https://p.scdn.co/mp3-preview/0d494fe9577bb2bb22a4d95b5840d21e06fa5278",
  },
  "de-quem-e-a-culpa": {
    title: "De Quem É a Culpa?",
    artist: "Marília Mendonça",
    album: "Realidade (Ao Vivo)",
    coverUrl: "https://i.scdn.co/image/ab67616d0000b273e9788f6114e91fc8a38b1e42",
    audioUrl: "https://p.scdn.co/mp3-preview/bb1507f311c6d36e2f411b439c36209bb10d9da9",
  },
  supera: {
    title: "Supera (Ao Vivo)",
    artist: "Marília Mendonça",
    album: "Todos os Cantos",
    coverUrl: "https://i.scdn.co/image/ab67616d0000b27303c7ea07c082531da1f7df2b",
    audioUrl: "https://p.scdn.co/mp3-preview/4568600d3d376ca32454b6d910a373d32551a0fc",
  },
  "todo-mundo-vai-sofrer": {
    title: "Todo Mundo Vai Sofrer",
    artist: "Marília Mendonça",
    album: "Todos os Cantos",
    coverUrl: "https://i.scdn.co/image/ab67616d0000b27303c7ea07c082531da1f7df2b",
    audioUrl: "https://p.scdn.co/mp3-preview/9f7e5bbf223403a74653606f71d1efd15e2197f2",
  },
  "eu-sei-de-cor": {
    title: "Eu Sei De Cor",
    artist: "Marília Mendonça",
    album: "Agora É Que São Elas",
    coverUrl: "https://i.scdn.co/image/ab67616d0000b273e9788f6114e91fc8a38b1e42",
    audioUrl: "https://p.scdn.co/mp3-preview/5d3151fa1657b98f58c7e1ee5445217bc67a1ca8",
  },
};

export function AudioPlayerProvider({ children }: { children: React.ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(30);
  const [volume, setVolumeState] = useState(0.85);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio();
      audioRef.current.volume = volume;

      const audio = audioRef.current;

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

      const handleError = () => {
        console.warn("[AudioPlayer] Erro na reprodução da faixa, pausando.");
        setIsPlaying(false);
      };

      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("ended", handleEnded);
      audio.addEventListener("error", handleError);

      return () => {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("ended", handleEnded);
        audio.removeEventListener("error", handleError);
        audio.pause();
      };
    }
  }, []);

  const playTrack = useCallback((track: AudioTrack) => {
    if (!audioRef.current) return;

    if (currentTrack?.id === track.id) {
      if (audioRef.current.paused) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
      return;
    }

    setCurrentTrack(track);
    audioRef.current.src = track.audioUrl;
    audioRef.current.currentTime = 0;
    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch((err) => {
        console.warn("[AudioPlayer] Autoplay bloqueado pelo navegador:", err);
        setIsPlaying(false);
      });
  }, [currentTrack]);

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
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
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
    setCurrentTime(0);
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
    throw new Error("useAudioPlayer must be used within an AudioPlayerProvider");
  }
  return context;
}
