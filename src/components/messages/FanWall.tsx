"use client";

import { useState } from "react";
import { FanMessage } from "@/types";
import { postFanMessage } from "@/lib/data";
import { MessageSquareHeart, Send, Heart, MapPin, Music2, CheckCircle2, AlertCircle } from "lucide-react";

interface FanWallProps {
  initialMessages: FanMessage[];
}

export function FanWall({ initialMessages }: FanWallProps) {
  const [messages, setMessages] = useState<FanMessage[]>(initialMessages);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [authorName, setAuthorName] = useState("");
  const [cityState, setCityState] = useState("");
  const [favoriteSong, setFavoriteSong] = useState("Leão");
  const [messageText, setMessageText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !cityState.trim() || !messageText.trim()) {
      setFeedback({ type: "error", text: "Por favor, preencha todos os campos obrigatórios." });
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);

    const res = await postFanMessage({
      author_name: authorName,
      city_state: cityState,
      favorite_song: favoriteSong,
      message: messageText,
    });

    setIsSubmitting(false);

    if (res.success && res.data) {
      setMessages([res.data, ...messages]);
      setFeedback({ type: "success", text: res.message });
      setAuthorName("");
      setCityState("");
      setMessageText("");
    } else {
      setFeedback({ type: "error", text: res.message });
    }
  };

  return (
    <div className="space-y-12">
      {/* Form Card */}
      <div className="rounded-3xl border border-white/10 p-6 sm:p-8 bg-zinc-900/60 backdrop-blur-xl max-w-2xl mx-auto shadow-2xl">
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <Heart className="h-3.5 w-3.5 text-rose-400 fill-rose-400" />
            <span>Mural Eterno dos Fãs</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Deixe sua <span className="text-gold-gradient">Carta para a Rainha</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Compartilhe como as músicas e a história de Marília Mendonça transformaram a sua vida.
          </p>
        </div>

        {feedback && (
          <div
            className={`p-4 rounded-xl mb-6 flex items-center gap-3 text-sm ${
              feedback.type === "success"
                ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-300"
                : "bg-rose-500/15 border border-rose-500/30 text-rose-300"
            }`}
          >
            {feedback.type === "success" ? (
              <CheckCircle2 className="h-5 w-5 shrink-0" />
            ) : (
              <AlertCircle className="h-5 w-5 shrink-0" />
            )}
            <span>{feedback.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                Seu Nome *
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Letícia Ribeiro"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                Sua Cidade / Estado *
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Goiânia, GO"
                value={cityState}
                onChange={(e) => setCityState(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              Música Favorita da Vida
            </label>
            <input
              type="text"
              placeholder="Ex: Leão, Infiel, Graveto, Supera..."
              value={favoriteSong}
              onChange={(e) => setFavoriteSong(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              Sua Mensagem de Carinho *
            </label>
            <textarea
              required
              rows={3}
              placeholder="Escreva do coração o que a Marília significa para você..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-gold-500 text-black font-bold text-sm hover:brightness-110 active:scale-98 transition-all shadow-lg shadow-amber-500/25"
          >
            <Send className="h-4 w-4" />
            <span>{isSubmitting ? "Publicando carta..." : "Enviar Carta para o Mural"}</span>
          </button>
        </form>
      </div>

      {/* Feed em Masonry */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <span>Cartas da Comunidade</span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-400">
            {messages.length} mensagens
          </span>
        </h3>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="break-inside-avoid rounded-2xl border border-white/10 p-6 bg-zinc-900/60 backdrop-blur-xl hover:border-amber-500/30 transition-all space-y-4 group"
            >
              <p className="text-sm text-zinc-200 leading-relaxed italic">
                &quot;{msg.message}&quot;
              </p>

              <div className="pt-3 border-t border-zinc-800/80 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-300 group-hover:text-amber-200 transition-colors">
                    {msg.author_name}
                  </span>
                  <span className="text-zinc-500 flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {msg.city_state}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-zinc-400">
                  <span className="flex items-center gap-1 text-zinc-400">
                    <Music2 className="h-3 w-3 text-amber-400" />
                    {msg.favorite_song}
                  </span>
                  {msg.is_featured_today && (
                    <span className="px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/30 text-[10px] font-semibold">
                      Destaque Hoje
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
