# 👑 Marília Day — Portal de Inteligência de Dados, Legado & Hub de Fãs

> **Portal oficial de monitoramento de dados de streaming diário, charts, marcos históricos e comunidade da Rainha da Sofrência, Marília Mendonça.**

---

## 🌟 Visão Geral

O **Marília Day** combina o rigor estatístico de plataformas como *Kworb* e *ChartMasters* com o apelo visual, emotivo e compartilhável do *Spotify Wrapped*.

- **Design System:** Obsidian Black (`#09090B`), Dourado Marília (`#D4AF37`), Verde Esmeralda (`#10B981`) e Vermelho (`#EF4444`).
- **Framework:** Next.js 14 (App Router), React, TypeScript, Tailwind CSS, Lucide React e Framer Motion.
- **Banco de Dados:** Supabase (PostgreSQL) com schema robusto em `supabase/schema.sql` e fallback resiliente em memória.
- **Pipeline de Ingestão:** Coletores modulares em TypeScript (`scripts/collectors`) integrados ao Spotify Web API, YouTube Data API v3, Deezer e cálculo automático de marcos.
- **Automação Diária:** GitHub Actions (`.github/workflows/daily-update.yml`) programado diariamente para as 15:00 BRT (18:00 UTC).
- **Cards para Redes Sociais:** Gerador nativo em Canvas nos formatos Stories (9:16 - 1080x1920) e Feed (4:5 - 1080x1350) com download PNG de alta resolução e sem erro de CORS.

---

## 🚀 Como Executar Localmente

### 1. Instalação das dependências
```bash
npm install
```

### 2. Configurar variáveis de ambiente (Opcional para iniciar)
Copie o arquivo de exemplo:
```bash
cp .env.example .env.local
```
*(A aplicação já vem equipada com um dataset histórico realista dos últimos 7 dias da Marília Mendonça, funcionando perfeitamente mesmo antes de preencher as chaves externas).*

### 3. Executar o servidor de desenvolvimento
```bash
npm run dev
```
Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

---

## 🗄️ Banco de Dados (Supabase)

O arquivo `supabase/schema.sql` contém a definição de todas as tabelas:
1. `artist_daily_stats`: Ouvintes mensais, seguidores, deltas 24h, views diárias e inscritos no YouTube.
2. `tracks`: Catálogo mestre com Spotify IDs, YouTube IDs, Eras, capas e metadados.
3. `track_daily_metrics`: Métricas diárias por música (`hoje - ontem`, posições no chart, deltas).
4. `milestones`: Metas de 100M, 300M, 500M, 1B com médias móveis de 7 dias e projeções de datas.
5. `fan_messages`: Mural "Cartas para a Rainha" com moderação.
6. `ephemerides`: Fatos históricos de cada data da carreira.

### Para popular o Supabase com dados iniciais:
```bash
npm run seed
```

---

## 🔄 Pipeline de Coleta Diária

Você pode rodar os coletores individualmente ou todos de uma vez:

```bash
# Rodar todos os coletores em sequência
npm run collect:all

# Coletores individuais:
npm run collect:spotify      # Spotify Web API + cálculo D-1
npm run collect:youtube      # YouTube Data API v3 em lote
npm run collect:deezer       # Deezer Top Tracks
npm run collect:milestones   # Projeção de datas dos marcos
```

---

## 📱 Funcionalidades Principais

1. **Dashboard Principal (`/`):**
   - KPIs Globais (Ouvintes Mensais, variação 24h, consumo diário somado, YouTube total).
   - **Cápsula do Dia:** Destaque editorial com botão **"Baixar Card do Dia"** gerando PNG nos formatos Stories (9:16) ou Feed (4:5) com a marca d'água `mariliaday.com.br`.
   - **Top 10 Spotify & YouTube Lado a Lado:** Com indicadores de variação (`▲ 2`, `▼ 1`, `=`), capas e streams diários.
   - **Banner Neste Dia na História:** Efeméride da data (ex: Grammy Latino, live histórica com 3.31M de pessoas).

2. **Radar de Marcos (`/marcos`):**
   - Músicas próximas de bater placas de streaming com barra de progresso, porcentagem e dias restantes calculados.
   - Botão **"Compartilhar Mutirão"** para postar no X (Twitter) e convocar fã-clubes.

3. **Discografia & Eras (`/discografia`):**
   - Filtro por Eras (*Todos os Cantos*, *Decretos Reais*, *Patroas 35%*, *Realidade*, *Ao Vivo 2016*).
   - Acumulado de streams de cada disco e ranking interno faixa a faixa.

4. **Mural "Cartas para a Rainha" (`/mensagens`):**
   - Feed em alvenaria (masonry) com homenagens dos fãs de todo o Brasil.
   - Formulário com publicação instantânea e validação anti-spam.

5. **Sobre o Projeto (`/sobre`):**
   - Transparência metodológica, manifesto do legado, horários de coleta e canais de contato.

---

👑 **Marília Mendonça (1995–2021) — A Rainha é Eterna.**
