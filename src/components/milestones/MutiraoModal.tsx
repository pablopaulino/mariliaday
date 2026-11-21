"use client";

import { useState } from "react";
import { Milestone } from "@/types";
import { formatNumber, formatCompactNumber, calculateDaysRemaining } from "@/lib/utils";
import { X, Copy, Check } from "lucide-react";

interface MutiraoModalProps {
  milestone: Milestone | null;
  onClose: () => void;
}

export function MutiraoModal({ milestone, onClose }: MutiraoModalProps) {
  const [copied, setCopied] = useState(false);

  if (!milestone) return null;

  const targetStr = formatCompactNumber(milestone.target_value);
  const remaining = milestone.target_value - milestone.current_value;
  const platformName = milestone.platform === "spotify" ? "Spotify" : "YouTube";
  const daysLeft = calculateDaysRemaining(milestone.estimated_completion_date);

  const tweetText = `MUTIRÃO MARÍLIA DAY • ${milestone.track?.title?.toUpperCase()}\n\nFalta pouco para "${milestone.track?.title}" atingir ${targetStr} no ${platformName}!\n\nRestante: ${formatNumber(remaining)} ${milestone.platform === "spotify" ? "streams" : "views"}\nPrevisão: ~${daysLeft} dias\n\nAcompanhe ao vivo em: https://mariliaday.com.br/marcos`;

  const handleCopy = () => {
    navigator.clipboard.writeText(tweetText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-2xl p-6 sm:p-8 border border-white/10 bg-[#0B0B0E] text-white shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-zinc-400 hover:text-white"
          aria-label="Fechar"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center space-y-1 mb-6">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#C6A87C] font-medium block">
            CONVOCAÇÃO DE FÃS
          </span>
          <h3 className="font-serif text-2xl font-normal text-white">
            Mutirão: {milestone.track?.title}
          </h3>
          <p className="text-xs text-zinc-400 font-light">
            Meta de {targetStr} no {platformName}
          </p>
        </div>

        {/* Text preview card */}
        <div className="p-4 rounded-xl bg-black/60 border border-white/5 text-xs text-zinc-300 whitespace-pre-line leading-relaxed font-mono mb-6">
          {tweetText}
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleCopy}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border border-white/10 text-white font-medium text-xs uppercase tracking-[0.15em] hover:bg-white/5 transition-all"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-[#C6A87C]" />
                <span>Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>Copiar Mensagem</span>
              </>
            )}
          </button>

          <button
            onClick={handleTwitterShare}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border border-[#C6A87C] text-[#C6A87C] hover:bg-[#C6A87C] hover:text-black font-medium text-xs uppercase tracking-[0.15em] transition-all"
          >
            Publicar no X
          </button>
        </div>
      </div>
    </div>
  );
}
