import { getArtistStats, getDailyTopMetrics, getEphemerides, getFanMessages } from "@/lib/data";
import { HeroKpis } from "@/components/dashboard/HeroKpis";
import { DailyCapsule } from "@/components/dashboard/DailyCapsule";
import { TopTracksComparison } from "@/components/dashboard/TopTracksComparison";
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
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 space-y-10 sm:space-y-12">
      {/* 1. Hero & KPIs Globais */}
      <HeroKpis stats={statsData.today} />

      {/* 2. Cápsula do Dia (Social Card Generator & Interactive Showcase) */}
      <DailyCapsule
        stats={statsData.today}
        topSpotify={metricsData.spotifyTop}
        topYoutube={metricsData.youtubeTop}
        featuredMessage={featuredMessage}
      />

      {/* 3. Top 10 Spotify Hoje & Top 10 YouTube Hoje (Lado a Lado) */}
      <TopTracksComparison
        spotifyTop={metricsData.spotifyTop}
        youtubeTop={metricsData.youtubeTop}
      />

      {/* 4. Banner "Neste Dia na História" (Efeméride) */}
      <EphemerisBanner ephemerides={ephemerides} />
    </div>
  );
}
