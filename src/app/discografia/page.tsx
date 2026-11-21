import { getAlbums } from "@/lib/data";
import { DiscographyViewer } from "@/components/discography/DiscographyViewer";
import { Disc } from "lucide-react";

export const metadata = {
  title: "Discografia & Eras — Marília Day",
  description: "Explore todos os álbuns, eras históricas e números consolidados de Marília Mendonça.",
};

export default async function DiscografiaPage() {
  const albums = await getAlbums();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
      {/* Header Moderno */}
      <div className="border-b border-zinc-800/80 pb-6 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          <Disc className="h-3.5 w-3.5" />
          <span>Catálogo &amp; Legado Sonoro</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Discografia &amp; <span className="text-gold-gradient">Eras Musicais</span>
        </h1>
        <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed">
          Navegue pelas diferentes fases da carreira de Marília Mendonça — desde a revolução de &apos;Todos os Cantos&apos; até a apoteose dos &apos;Decretos Reais&apos; e a cumplicidade de &apos;Patroas&apos;.
        </p>
      </div>

      <DiscographyViewer albums={albums} />
    </div>
  );
}
