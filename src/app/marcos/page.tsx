import { getMilestones } from "@/lib/data";
import { MilestonesList } from "@/components/milestones/MilestonesList";
import { Target } from "lucide-react";

export const metadata = {
  title: "Radar de Marcos & Metas — Marília Day",
  description: "Acompanhe as próximas metas de streaming (100M, 450M, 600M, 700M) e participe dos mutirões dos fãs.",
};

export const revalidate = 60;

export default async function MarcosPage() {
  const milestones = await getMilestones();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
      {/* Header Moderno */}
      <div className="border-b border-zinc-800/80 pb-6 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          <Target className="h-3.5 w-3.5" />
          <span>Radar de Recordes &amp; Metas</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Próximos <span className="text-gold-gradient">Marcos Históricos</span>
        </h1>
        <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed">
          Monitoramento em tempo real do progresso das músicas de Marília Mendonça rumo às placas de 100M, 450M, 600M e 700 Milhões de reproduções no Spotify e YouTube.
        </p>
      </div>

      <MilestonesList milestones={milestones} />
    </div>
  );
}
