import { getArtistStats, getDailyTopMetrics, getEphemerides, getFanMessages } from "@/lib/data";
import { HeroKpis } from "@/components/dashboard/HeroKpis";
import { EvolutionChart } from "@/components/dashboard/EvolutionChart";
import { DailyCapsule } from "@/components/dashboard/DailyCapsule";
import { TopTracksComparison } from "@/components/dashboard/TopTracksComparison";
import { TrackComparator } from "@/components/dashboard/TrackComparator";
import { WhereBrazilCries } from "@/components/dashboard/WhereBrazilCries";
import { ComposerLegacy } from "@/components/dashboard/ComposerLegacy";
import { ErasTimeline } from "@/components/dashboard/ErasTimeline";
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

      {/* 3. Cápsula do Dia (Social Card Generator & Interactive Showcase) */}
      <DailyCapsule
        stats={statsData.today}
        topSpotify={metricsData.spotifyTop}
        topYoutube={metricsData.youtubeTop}
        featuredMessage={featuredMessage}
      />

      {/* 4. Top 10 Spotify Hoje & Top 10 YouTube Hoje (Com Áudio Preview 30s) */}
      <TopTracksComparison
        spotifyTop={metricsData.spotifyTop}
        youtubeTop={metricsData.youtubeTop}
      />

      {/* 5. Comparador Métrica x Métrica (Duelo de Sucessos) */}
      <TrackComparator />

      {/* 6. Geointeligência: Onde o Brasil Chora */}
      <WhereBrazilCries />

      {/* 7. Marília Compositora (O Legado Autoral) */}
      <ComposerLegacy />

      {/* 8. Linha do Tempo das Eras (2015 – 2023) */}
      <ErasTimeline />

      {/* 9. Banner "Neste Dia na História" (Efeméride) */}
      <EphemerisBanner ephemerides={ephemerides} />
    </div>
  );
}
