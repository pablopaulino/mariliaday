import { getArtistStats, getDailyTopMetrics, getEphemerides, getFanMessages } from "@/lib/data";
import { HeroKpis } from "@/components/dashboard/HeroKpis";
import { EvolutionChart } from "@/components/dashboard/EvolutionChart";
import { RecordsWall } from "@/components/dashboard/RecordsWall";
import { DailyCapsule } from "@/components/dashboard/DailyCapsule";
import { TopTracksComparison } from "@/components/dashboard/TopTracksComparison";
import { TrackComparator } from "@/components/dashboard/TrackComparator";
import { CertificationsShowcase } from "@/components/dashboard/CertificationsShowcase";
import { WhereBrazilCries } from "@/components/dashboard/WhereBrazilCries";
import { ComposerLegacy } from "@/components/dashboard/ComposerLegacy";
import { ErasTimeline } from "@/components/dashboard/ErasTimeline";
import { LegacyShowcase } from "@/components/dashboard/LegacyShowcase";
import { EphemerisBanner } from "@/components/dashboard/EphemerisBanner";

export const revalidate = 60; // Revalidate every minute

export default async function HomePage() {
  const [statsData, metricsData, ephemerides, fanMessages] = await Promise.all([
    getArtistStats(),
    getDailyTopMetrics(),
    getEphemerides(),
    getFanMessages(),
  ]);

  const featuredMessage = fanMessages.find((m) => m.is_featured_today) || fanMessages[0];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 space-y-12 sm:space-y-16">
      {/* 1. Hero & KPIs Globais */}
      <HeroKpis stats={statsData.today} />

      {/* 2. Gráficos Interativos de Evolução Diária */}
      <EvolutionChart stats={statsData.today} />

      {/* 3. Hall dos Recordes, Grammy Latino & Turnê Todos os Cantos */}
      <RecordsWall stats={statsData.today} />

      {/* 4. Cápsula do Dia (Social Card Generator & Interactive Showcase) */}
      <DailyCapsule
        stats={statsData.today}
        topSpotify={metricsData.spotifyTop}
        topYoutube={metricsData.youtubeTop}
        featuredMessage={featuredMessage}
      />

      {/* 5. Top 10 Spotify Hoje & Top 10 YouTube Hoje (Com Áudio Preview 30s) */}
      <TopTracksComparison
        spotifyTop={metricsData.spotifyTop}
        youtubeTop={metricsData.youtubeTop}
      />

      {/* 6. Comparador Métrica x Métrica (Duelo de Sucessos) */}
      <TrackComparator />

      {/* 7. Certificações Oficiais Pro-Música Brasil (Diamantes & Platinas) */}
      <CertificationsShowcase />

      {/* 8. Geointeligência: Onde o Brasil Chora & Turnê Todos os Cantos */}
      <WhereBrazilCries />

      {/* 9. Marília Compositora (O Legado Autoral & Ecad) */}
      <ComposerLegacy />

      {/* 10. Linha do Tempo Completa das Eras (2014 – 2026+) */}
      <ErasTimeline />

      {/* 11. Legado Audiovisual, Projetos Póstumos & Curiosidades */}
      <LegacyShowcase />

      {/* 12. Memória Viva (Efemérides & Marcos Históricos) */}
      <EphemerisBanner ephemerides={ephemerides} />
    </div>
  );
}
