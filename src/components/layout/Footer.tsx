import Link from "next/link";
import { Crown, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800/80 bg-[#09090B] mt-20">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Tribute */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400">
                <Crown className="h-4 w-4" />
              </div>
              <span className="text-base font-bold text-white">
                Marília <span className="text-amber-400">Day</span>
              </span>
            </div>
            <p className="text-sm text-zinc-400 max-w-md leading-relaxed">
              Portal independente e memorial vivo dedicado a monitorar o impacto cultural, os números de streaming e a imortalidade artística de Marília Mendonça (1995–2021).
            </p>
            <p className="text-xs text-zinc-400 italic">
              &quot;O que temos pra hoje é saudade, mas o que ela deixou é eternidade.&quot;
            </p>
          </div>

          {/* Navegação Rápida */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-3">
              Navegação
            </h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>
                <Link href="/" className="hover:text-amber-300 transition-colors">
                  Dashboard Diário
                </Link>
              </li>
              <li>
                <Link href="/marcos" className="hover:text-amber-300 transition-colors">
                  Radar de Marcos
                </Link>
              </li>
              <li>
                <Link href="/discografia" className="hover:text-amber-300 transition-colors">
                  Discografia &amp; Eras
                </Link>
              </li>
              <li>
                <Link href="/mensagens" className="hover:text-amber-300 transition-colors">
                  Mural de Cartas
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="hover:text-amber-300 transition-colors">
                  Metodologia &amp; Sobre
                </Link>
              </li>
            </ul>
          </div>

          {/* Dados & Fontes */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-3">
              Fontes Oficiais
            </h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>Spotify Web API (Deltas D-1)</li>
              <li>YouTube Data API v3 Oficial</li>
              <li>Deezer Public Catalog</li>
              <li className="pt-2 text-xs text-zinc-400">
                Sincronização diária às 15:00 BRT
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <p className="flex items-center gap-1.5">
            Feito com <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500 inline" /> por e para os fãs de Marília Mendonça.
          </p>
          <p>© {new Date().getFullYear()} Marília Day. Memória, arte e inteligência de dados.</p>
        </div>
      </div>
    </footer>
  );
}
