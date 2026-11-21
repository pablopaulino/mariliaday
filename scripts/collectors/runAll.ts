/**
 * Marília Day - Ingestion Master Runner
 * Executa todos os coletores em sequência com tratamento robusto de erros
 */

import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config();

import { runSpotifyCollector } from "./spotifyCollector";
import { runYoutubeCollector } from "./youtubeCollector";
import { runDeezerCollector } from "./deezerCollector";
import { runMilestoneCalculator } from "./milestoneCalculator";

async function main() {
  console.log("=================================================");
  console.log("👑 MARÍLIA DAY — PIPELINE DE INGESTÃO DIÁRIA");
  console.log(`⏱️ Início: ${new Date().toISOString()}`);
  console.log("=================================================");

  try {
    console.log("\n[1/4] Executando Spotify Collector...");
    await runSpotifyCollector();

    console.log("\n[2/4] Executando YouTube Collector...");
    await runYoutubeCollector();

    console.log("\n[3/4] Executando Deezer Collector...");
    await runDeezerCollector();

    console.log("\n[4/4] Executando Milestone Calculator...");
    await runMilestoneCalculator();

    console.log("\n=================================================");
    console.log("✅ Pipeline concluído com sucesso!");
    console.log("=================================================");
  } catch (error) {
    console.error("❌ Falha crítica no pipeline:", error);
    process.exit(1);
  }
}

main();
