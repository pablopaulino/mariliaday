import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Marília Day — Inteligência de Dados, Legado & Hub de Fãs",
  description:
    "Portal oficial de estatísticas diárias de streaming, charts, marcos históricos e comunidade da Rainha da Sofrência, Marília Mendonça.",
  keywords: [
    "Marília Mendonça",
    "Marília Day",
    "Sertanejo",
    "Spotify Charts",
    "YouTube Views",
    "Rainha da Sofrência",
  ],
  openGraph: {
    title: "Marília Day — Inteligência de Dados & Legado de Marília Mendonça",
    description: "Acompanhe diariamente o impacto contínuo da maior voz da música brasileira.",
    url: "https://mariliaday.com.br",
    siteName: "Marília Day",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${jakarta.variable} ${mono.variable} dark`}>
      <body className="min-h-screen bg-[#09090B] text-zinc-100 antialiased selection:bg-amber-500/30 selection:text-amber-200 font-sans">
        <div className="fixed inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(212,175,55,0.08),transparent_70%)]" />
        <Navbar />
        <main className="flex-1 pt-6 pb-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
