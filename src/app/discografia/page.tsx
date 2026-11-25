import { getAlbums } from "@/lib/data";
import { DiscographyViewer } from "@/components/discography/DiscographyViewer";
import { Disc } from "lucide-react";

export const metadata = {
  title: "Discografia Completa & Eras — Marília Day",
  description:
    "Explore toda a discografia de Marília Mendonça: álbuns ao vivo, projeto Patroas, EPs, singles, Decretos Reais e Manuscritos (2026).",
};

export const revalidate = 60;

export default async function DiscografiaPage() {
  const albums = await getAlbums();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
      {/* Header Moderno */}
      <div className="border-b border-zinc-800/80 pb-6 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          <Disc className="h-3.5 w-3.5" />
          <span>Catálogo Completo (2014 – 2026)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Discografia &amp; <span className="text-gold-gradient">Eras Musicais</span>
        </h1>
        <p className="text-sm text-zinc-400 max-w-3xl leading-relaxed">
          Do EP homônimo de estreia (2014) e o marco &apos;Todos os Cantos&apos; (2019) ao projeto &apos;Patroas&apos;, o bicampeonato no Grammy Latino com &apos;Decretos Reais&apos; (2023) e os capítulos póstumos de &apos;Manuscritos&apos; (novembro de 2026) — ouça prévias oficiais e explore certificações e números.
        </p>
      </div>

      <DiscographyViewer albums={albums} />
    </div>
  );
}
