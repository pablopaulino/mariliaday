"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Crown, Sparkles, Disc, MessageSquareHeart, Target, Info, Menu, X, ExternalLink } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Dashboard", icon: Sparkles },
    { href: "/marcos", label: "Radar de Marcos", icon: Target },
    { href: "/discografia", label: "Discografia & Eras", icon: Disc },
    { href: "/mensagens", label: "Cartas para a Rainha", icon: MessageSquareHeart },
    { href: "/sobre", label: "Sobre o Projeto", icon: Info },
  ];

  return (
    <header className="sticky top-4 z-50 mx-auto max-w-6xl px-4 w-full">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 rounded-2xl bg-[#121215]/60 backdrop-blur-2xl backdrop-saturate-150 border border-white/15 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18),0_20px_40px_-15px_rgba(0,0,0,0.7)]">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 group-hover:scale-105 transition-transform">
            <Crown className="h-4 w-4 fill-amber-400/20" />
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-amber-300 transition-colors">
              Marília <span className="text-amber-400">Day</span>
            </span>
            <span className="text-[9px] uppercase font-semibold tracking-widest text-zinc-400">
              Data &amp; Legacy Hub
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/40"
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? "text-amber-400" : "text-zinc-400"}`} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* External Spotify Quick Link */}
        <div className="flex items-center gap-3">
          <a
            href="https://open.spotify.com/artist/1yR65psqiazQpeM79CcGh8"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#1DB954]/15 border border-[#1DB954]/30 text-[#1DB954] hover:bg-[#1DB954]/25 transition-all"
          >
            <span>Spotify Oficial</span>
            <ExternalLink className="h-3 w-3" />
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800"
            aria-label="Abrir Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 rounded-2xl bg-[#121215]/95 backdrop-blur-2xl border border-white/15 px-4 pt-3 pb-4 space-y-1 shadow-2xl">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold ${
                  isActive
                    ? "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                    : "text-zinc-300 hover:bg-zinc-800"
                }`}
              >
                <Icon className="h-4 w-4 text-amber-400" />
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
