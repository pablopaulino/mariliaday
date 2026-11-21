import { getFanMessages } from "@/lib/data";
import { FanWall } from "@/components/messages/FanWall";
import { MessageSquareHeart } from "lucide-react";

export const metadata = {
  title: "Cartas para a Rainha — Marília Day",
  description: "Mural interativo de homenagens e cartas deixadas por fãs de todo o Brasil para Marília Mendonça.",
};

export const revalidate = 30;

export default async function MensagensPage() {
  const fanMessages = await getFanMessages();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
      {/* Header Moderno */}
      <div className="border-b border-zinc-800/80 pb-6 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          <MessageSquareHeart className="h-3.5 w-3.5" />
          <span>Comunidade &amp; Memória Viva</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Cartas para a <span className="text-gold-gradient">Rainha</span>
        </h1>
        <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed">
          Um espaço sagrado para os fãs compartilharem histórias, gratidão e o amor eterno por Marília Mendonça. Cada palavra aqui mantém viva a chama da sua arte.
        </p>
      </div>

      <FanWall initialMessages={fanMessages} />
    </div>
  );
}
