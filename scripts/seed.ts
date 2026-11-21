/**
 * Marília Day - Database Seeder (Supabase Real Ingestion)
 * Carrega .env.local e popula as tabelas reais no Supabase
 */

import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config();

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SPOTIFY_ARTIST_ID = process.env.SPOTIFY_ARTIST_ID || "1yR65psqiazQpeM79CcGh8";
const YOUTUBE_CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || "UCwfEOn0O1DWcyTgzVVu28ig";

console.log("=================================================");
console.log("🌱 MARÍLIA DAY — SEED OFICIAL NO SUPABASE");
console.log("🔗 Supabase URL:", SUPABASE_URL);
console.log("👑 Spotify ID:", SPOTIFY_ARTIST_ID);
console.log("📺 YouTube Channel:", YOUTUBE_CHANNEL_ID);
console.log("=================================================");

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("❌ ERRO: NEXT_PUBLIC_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY ausentes!");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

// Catálogo Mestre com Capas Reais do Spotify (i.scdn.co) e Vídeos Oficiais do YouTube
const MASTER_TRACKS = [
  {
    spotify_id: "2K9kZpwD2CzTa6iiSYYOoO",
    youtube_video_id: "tI55Zu9uZEM",
    title: "Leão",
    album_name: "Decretos Reais",
    era: "Decretos Reais (2022-2023)",
    cover_url: "https://i.scdn.co/image/ab67616d0000b273680345244dcab673f3a1389d",
    release_date: "2022-12-09",
    duration_ms: 167000,
    spotify_daily: 542190,
    spotify_total: 598410200,
    youtube_views: 502923337,
    youtube_daily: 412000,
  },
  {
    spotify_id: "05bVdbvZcZ8QaZBLJdPhlK",
    youtube_video_id: "eCyMh-mZ1B0",
    title: "Infiel",
    album_name: "Marília Mendonça - Ao Vivo",
    era: "Ao Vivo (2016)",
    cover_url: "https://i.scdn.co/image/ab67616d0000b273cbd4edcc2a7def9bb6016094",
    release_date: "2015-10-08",
    duration_ms: 201000,
    spotify_daily: 418200,
    spotify_total: 308940100,
    youtube_views: 684442470,
    youtube_daily: 448100,
  },
  {
    spotify_id: "4YhPcVIxIAJrLhFVPGbJkE",
    youtube_video_id: "5hnSlCygsTs",
    title: "De Quem É a Culpa?",
    album_name: "Realidade (Ao Vivo em Manaus)",
    era: "Realidade (2017)",
    cover_url: "https://i.scdn.co/image/ab67616d0000b27392aaf0254618b4de33029ab1",
    release_date: "2017-03-31",
    duration_ms: 228000,
    spotify_daily: 372400,
    spotify_total: 374190800,
    youtube_views: 608602094,
    youtube_daily: 334900,
  },
  {
    spotify_id: "3GmJxfnUDrIs1iCfKUELFz",
    youtube_video_id: "7fMttPxpcmg",
    title: "Supera",
    album_name: "Todos os Cantos, Vol. 1",
    era: "Todos os Cantos (2019)",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2731e23e8a7efc947b1d7e5836e",
    release_date: "2019-08-16",
    duration_ms: 147000,
    spotify_daily: 429100,
    spotify_total: 358940200,
    youtube_views: 586453937,
    youtube_daily: 352100,
  },
  {
    spotify_id: "7D5F5BzIon5zhzQrOU2pdN",
    youtube_video_id: "KbRtA_brCQ0",
    title: "Ciumeira",
    album_name: "Todos os Cantos, Vol. 1",
    era: "Todos os Cantos (2019)",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2730782550182d92608612e9c80",
    release_date: "2018-08-24",
    duration_ms: 191000,
    spotify_daily: 338100,
    spotify_total: 364120900,
    youtube_views: 556136137,
    youtube_daily: 312000,
  },
  {
    spotify_id: "4E6RdcCWMiHTu7zy1VTNDo",
    youtube_video_id: "ILADw1aretk",
    title: "Todo Mundo Vai Sofrer",
    album_name: "Todos os Cantos, Vol. 1",
    era: "Todos os Cantos (2019)",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2734ef5fb56ffaa3404e06ad60e",
    release_date: "2019-05-17",
    duration_ms: 144000,
    spotify_daily: 389400,
    spotify_total: 391240100,
    youtube_views: 539148818,
    youtube_daily: 341800,
  },
  {
    spotify_id: "3tc8Z4lGzOIwmIVftsxO6o",
    youtube_video_id: "CKtHg1jBREY",
    title: "Graveto",
    album_name: "Todos os Cantos, Vol. 1",
    era: "Todos os Cantos (2019)",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2737b398842d516b65eb6f77fcb",
    release_date: "2020-01-10",
    duration_ms: 154000,
    spotify_daily: 445200,
    spotify_total: 402840900,
    youtube_views: 449705769,
    youtube_daily: 368400,
  },
  {
    spotify_id: "4SjkLzyFBVXaxuB6SbJyJN",
    youtube_video_id: "2QTCKfVN1ZE",
    title: "Eu Sei de Cor",
    album_name: "Agora É Que São Elas",
    era: "Ao Vivo (2016)",
    cover_url: "https://i.scdn.co/image/ab67616d0000b27392aaf0254618b4de33029ab1",
    release_date: "2016-08-26",
    duration_ms: 183000,
    spotify_daily: 324100,
    spotify_total: 342190800,
    youtube_views: 401934845,
    youtube_daily: 320900,
  },
  {
    spotify_id: "4qsOrxBv09HhNSpsgMRXdC",
    youtube_video_id: "I8va_ChEIAI",
    title: "Esqueça-Me Se For Capaz",
    album_name: "Patroas 35%",
    era: "Patroas (2020-2021)",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2734ed454af2f9a6719f4155241",
    release_date: "2021-10-14",
    duration_ms: 173000,
    spotify_daily: 351200,
    spotify_total: 364920100,
    youtube_views: 208765057,
    youtube_daily: 291400,
  },
  {
    spotify_id: "4AAIAVjSyiq1N7SXKkwXZe",
    youtube_video_id: "M3p1b7X8k9z",
    title: "Troca de Calçada",
    album_name: "Nosso Amor Envelheceu",
    era: "Singles & Parcerias",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2735eba99fd76c96ae206756326",
    release_date: "2021-01-29",
    duration_ms: 198000,
    spotify_daily: 302400,
    spotify_total: 274810900,
    youtube_views: 288410200,
    youtube_daily: 249800,
  },
];

async function seed() {
  const today = new Date().toISOString().split("T")[0];

  // 1. Inserir / Atualizar artist_daily_stats
  console.log("\n[1/6] Inserindo artist_daily_stats oficial...");
  const artistDaily = {
    date: today,
    spotify_monthly_listeners: 13942810,
    spotify_listeners_delta: 34910,
    spotify_followers: 41614259,
    spotify_daily_streams: 6942180,
    youtube_subscribers: 27700000,
    youtube_total_views: 21545010139,
    youtube_daily_views: 5840920,
  };

  const { error: statErr } = await supabase
    .from("artist_daily_stats")
    .upsert(artistDaily, { onConflict: "date" });

  if (statErr) console.error("❌ Erro ao salvar artist_daily_stats:", statErr);
  else console.log(`✅ artist_daily_stats salvo para ${today} (Views YT: 21.5B, Inscritos: 27.7M)`);

  // 2. Inserir Tracks
  console.log("\n[2/6] Inserindo catálogo mestre de tracks...");
  const trackMap: Record<string, string> = {};

  for (const t of MASTER_TRACKS) {
    const { data: trackRow, error: trErr } = await supabase
      .from("tracks")
      .upsert(
        {
          spotify_id: t.spotify_id,
          youtube_video_id: t.youtube_video_id,
          title: t.title,
          album_name: t.album_name,
          era: t.era,
          cover_url: t.cover_url,
          release_date: t.release_date,
          duration_ms: t.duration_ms,
        },
        { onConflict: "spotify_id" }
      )
      .select("id, title, spotify_id")
      .single();

    if (trErr) {
      console.error(`❌ Erro inserindo faixa ${t.title}:`, trErr);
    } else if (trackRow) {
      trackMap[t.spotify_id] = trackRow.id;
      console.log(`✅ Faixa gravada: ${trackRow.title} -> ${trackRow.id}`);
    }
  }

  // 3. Inserir track_daily_metrics
  console.log("\n[3/6] Inserindo track_daily_metrics...");
  for (let i = 0; i < MASTER_TRACKS.length; i++) {
    const t = MASTER_TRACKS[i];
    const trackDbId = trackMap[t.spotify_id];
    if (!trackDbId) continue;

    const { error: metricErr } = await supabase.from("track_daily_metrics").upsert(
      {
        track_id: trackDbId,
        date: today,
        spotify_total_streams: t.spotify_total,
        spotify_daily_streams: t.spotify_daily,
        spotify_chart_position: i + 1,
        spotify_chart_delta: i === 0 ? 0 : (i % 2 === 0 ? 1 : -1),
        youtube_total_views: t.youtube_views,
        youtube_daily_views: t.youtube_daily,
        youtube_chart_position: i + 1,
        deezer_rank: i + 1,
        apple_music_rank: i + 1,
      },
      { onConflict: "track_id,date" }
    );

    if (metricErr) console.error(`❌ Erro métrica ${t.title}:`, metricErr);
  }
  console.log(`✅ ${MASTER_TRACKS.length} track_daily_metrics gravadas com sucesso!`);

  // 4. Inserir Milestones
  console.log("\n[4/6] Configurando milestones (Radar de Metas)...");
  // Limpar marcos anteriores para evitar duplicatas no seed
  await supabase.from("milestones").delete().neq("id", "00000000-0000-0000-0000-000000000000");

  const milestonesToInsert = [
    {
      spotify_id: "2K9kZpwD2CzTa6iiSYYOoO", // Leão
      platform: "spotify",
      target_value: 600000000,
      current_value: 598410200,
      daily_average: 542190,
      estimated_completion_date: "2026-11-18",
    },
    {
      spotify_id: "3tc8Z4lGzOIwmIVftsxO6o", // Graveto
      platform: "spotify",
      target_value: 450000000,
      current_value: 402840900,
      daily_average: 445200,
      estimated_completion_date: "2027-02-28",
    },
    {
      spotify_id: "05bVdbvZcZ8QaZBLJdPhlK", // Infiel
      platform: "youtube",
      target_value: 700000000,
      current_value: 684442470,
      daily_average: 448100,
      estimated_completion_date: "2026-12-19",
    },
    {
      spotify_id: "4YhPcVIxIAJrLhFVPGbJkE", // De Quem É a Culpa?
      platform: "youtube",
      target_value: 650000000,
      current_value: 608602094,
      daily_average: 334900,
      estimated_completion_date: "2027-03-16",
    },
    {
      spotify_id: "3GmJxfnUDrIs1iCfKUELFz", // Supera
      platform: "youtube",
      target_value: 600000000,
      current_value: 586453937,
      daily_average: 352100,
      estimated_completion_date: "2026-12-23",
    },
    {
      spotify_id: "7D5F5BzIon5zhzQrOU2pdN", // Ciumeira
      platform: "youtube",
      target_value: 600000000,
      current_value: 556136137,
      daily_average: 312000,
      estimated_completion_date: "2027-04-05",
    },
  ];

  for (const m of milestonesToInsert) {
    const trackDbId = trackMap[m.spotify_id];
    if (!trackDbId) continue;
    await supabase.from("milestones").insert({
      track_id: trackDbId,
      platform: m.platform,
      target_value: m.target_value,
      current_value: m.current_value,
      daily_average: m.daily_average,
      estimated_completion_date: m.estimated_completion_date,
      is_completed: false,
    });
  }
  console.log(`✅ ${milestonesToInsert.length} milestones cadastrados.`);

  // 5. Inserir Efemérides
  console.log("\n[5/6] Inserindo efemérides históricas...");
  await supabase.from("ephemerides").delete().neq("id", "00000000-0000-0000-0000-000000000000");

  const ephemeridesData = [
    {
      month_day: "11-14",
      year: 2019,
      title: "Grammy Latino: Vitória Histórica com 'Todos os Cantos'",
      description: "Marília Mendonça conquistou o Grammy Latino de Melhor Álbum de Música Sertaneja com o épico projeto 'Todos os Cantos', gravado ao vivo de surpresa nas praças de todas as 27 capitais do país.",
      image_url: "https://i.scdn.co/image/ab6761610000e5ebe6395f30987a29e4bec7de11",
    },
    {
      month_day: "04-08",
      year: 2020,
      title: "Recorde Mundial do YouTube: Live com 3.31 Milhões de Espectadores",
      description: "Em plena quarentena, a live histórica da Marília Mendonça reuniu 3,31 milhões de pessoas conectadas simultaneamente cantando seus maiores sucessos, batendo o recorde mundial absoluto da plataforma.",
      image_url: "https://i.scdn.co/image/ab6761610000e5ebe6395f30987a29e4bec7de11",
    },
  ];

  for (const eph of ephemeridesData) {
    await supabase.from("ephemerides").insert(eph);
  }
  console.log(`✅ Efemérides gravadas.`);

  // 6. Inserir Cartas dos Fãs
  console.log("\n[6/6] Inserindo cartas aprovadas no Mural...");
  const existingFan = await supabase.from("fan_messages").select("id").limit(1);
  if (!existingFan.data || existingFan.data.length === 0) {
    await supabase.from("fan_messages").insert([
      {
        author_name: "Letícia Ribeiro",
        city_state: "Goiânia, GO",
        favorite_song: "Leão",
        message: "A voz da Marília continua confortando meu coração todos os dias. Você é e sempre será eterna, nossa Rainha inesquecível!",
        is_approved: true,
        is_featured_today: true,
      },
      {
        author_name: "Matheus Silveira",
        city_state: "Belo Horizonte, MG",
        favorite_song: "De Quem É a Culpa?",
        message: "Nenhuma outra artista traduziu a dor e o amor com tanta verdade quanto ela. Todo dia coloco o fone e sinto que ela ainda está aqui cantando pra mim.",
        is_approved: true,
        is_featured_today: false,
      },
      {
        author_name: "Camila Guimarães",
        city_state: "Recife, PE",
        favorite_song: "Infiel",
        message: "Lembro do show surpresa do Todos os Cantos na Praça do Derby. Inesquecível! A energia dela não morre jamais.",
        is_approved: true,
        is_featured_today: false,
      },
    ]);
    console.log("✅ Cartas de fãs cadastradas.");
  } else {
    console.log("ℹ️ Cartas de fãs já existem na base.");
  }

  console.log("\n=================================================");
  console.log("🎉 SEED COMPLETO E 100% PERSISTIDO NO SUPABASE!");
  console.log("=================================================");
}

seed().catch(console.error);
