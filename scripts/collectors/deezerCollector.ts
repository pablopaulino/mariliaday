/**
 * Marília Day - Deezer Collector Oficial
 */

import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config();

const DEEZER_ARTIST_ID = "7733230";

export async function runDeezerCollector() {
  console.log("=================================================");
  console.log("🎧 DEEZER COLLECTOR — TOP BRASIL");
  console.log("=================================================");

  try {
    const res = await fetch(`https://api.deezer.com/artist/${DEEZER_ARTIST_ID}/top?limit=10`);
    if (!res.ok) {
      throw new Error(`Deezer API retornou status ${res.status}`);
    }

    const data = await res.json();
    const tracks = data.data || [];
    console.log(`✅ Deezer: ${tracks.length} faixas catalogadas.`);

    tracks.slice(0, 5).forEach((t: { title: string; rank: number }, i: number) => {
      console.log(`   #${i + 1} - ${t.title} (Score: ${t.rank})`);
    });
  } catch (error) {
    console.error("❌ Erro ao coletar faixas da Deezer:", error);
  }
}

if (require.main === module) {
  runDeezerCollector().catch(console.error);
}
