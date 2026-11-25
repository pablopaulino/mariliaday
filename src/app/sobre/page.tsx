import { Info, Database, Clock, ShieldCheck, Mail, Crown, Award, BookOpen } from "lucide-react";

export const metadata = {
  title: "Sobre o Projeto & Biografia — Marília Day",
  description:
    "Conheça a biografia resumida de Marília Mendonça, a metodologia de coleta de dados estatísticos e o manifesto do Marília Day.",
};

export default function SobrePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-8 space-y-12">
      {/* Header */}
      <div className="border-b border-zinc-800/80 pb-6 space-y-3 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          <Info className="h-3.5 w-3.5" />
          <span>Metodologia, Biografia &amp; Transparência</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Sobre o <span className="text-gold-gradient">Marília Day</span>
        </h1>
        <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed">
          O Marília Day é uma plataforma independente, cultural e estatística criada por admiradores da Rainha da Sofrência com o compromisso de documentar a história, os recordes e o impacto diário contínuo da sua obra.
        </p>
      </div>

      {/* Biografia Essencial */}
      <div className="rounded-3xl border border-white/10 p-6 sm:p-8 bg-zinc-900/60 backdrop-blur-xl space-y-4">
        <div className="flex items-center gap-3 text-amber-400">
          <BookOpen className="h-6 w-6" />
          <h2 className="text-xl font-bold text-white">Biografia &amp; Trajetória (1995–2021)</h2>
        </div>
        <p className="text-sm text-zinc-300 leading-relaxed">
          <strong>Marília Dias Mendonça</strong> (Cristianópolis, GO, 22 de julho de 1995 — Piedade de Caratinga, MG, 5 de novembro de 2021) cresceu em Goiânia, começou cantando em corais de igreja e passou a compor profissionalmente aos <strong>12 anos</strong>. Antes de subir aos palcos, assinou clássicos gravados por Henrique &amp; Juliano, Jorge &amp; Mateus, Cristiano Araújo, Maiara &amp; Maraisa, João Neto &amp; Frederico, Matheus &amp; Kauan e Wesley Safadão.
        </p>
        <p className="text-sm text-zinc-300 leading-relaxed">
          Como cantora, liderou a revolução do <em>feminejo</em> a partir do DVD de 2016 (&quot;Infiel&quot;), atravessou o país com o projeto gratuito <em>Te Vejo em Todos os Cantos</em> (~1 milhão de espectadores), bateu o recorde mundial de live no YouTube em 2020 (3,31 milhões simultâneos) e deixou um legado póstumo celebrado em projetos como <em>Decretos Reais</em> (Grammy Latino 2023), <em>Manuscritos</em> (2026) e a série documental <em>Sentimento Louco</em> (Prime Video, 2026).
        </p>
      </div>

      {/* Manifesto */}
      <div className="rounded-3xl border border-white/10 p-6 sm:p-8 bg-zinc-900/60 backdrop-blur-xl space-y-4">
        <div className="flex items-center gap-3 text-amber-400">
          <Crown className="h-6 w-6" />
          <h2 className="text-xl font-bold text-white">Nosso Manifesto</h2>
        </div>
        <p className="text-sm text-zinc-300 leading-relaxed">
          Marília Mendonça não foi apenas um fenômeno passageiro; ela redefiniu a história da música brasileira, quebrou a hegemonia masculina no sertanejo, deu voz a milhões de mulheres e ultrapassou <strong>15 bilhões de streams no Spotify</strong> e <strong>21 bilhões de views no YouTube</strong>.
        </p>
        <p className="text-sm text-zinc-300 leading-relaxed">
          Mesmo após sua partida prematura aos 26 anos, o Brasil continua ouvindo, chorando, superando e celebrando através de suas composições. O <strong>Marília Day</strong> existe para que cada número, cada certificação e cada conquista dessa trajetória sejam preservados com dignidade e precisão.
        </p>
      </div>

      {/* Metodologia de Coleta */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Database className="h-5 w-5 text-amber-400" />
          <span>Metodologia Técnica &amp; Fontes Verificadas</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-white/10 p-5 bg-zinc-900/60 backdrop-blur-xl space-y-2">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Clock className="h-4 w-4" />
              <span>Sincronização Diária (Horário de Brasília)</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              O pipeline captura métricas oficiais via YouTube Data API v3, Spotify Web API e catálogo Deezer/Apple Music utilizando estritamente o fuso horário <code className="font-mono text-amber-400">America/Sao_Paulo</code> para evitar viradas antecipadas de data em UTC.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 p-5 bg-zinc-900/60 backdrop-blur-xl space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4" />
              <span>Cálculo de Deltas &amp; Certificações</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Cada registro é confrontado com o snapshot anterior (<code className="font-mono text-amber-400">hoje - ontem</code>) para calcular ganhos diários, enquanto certificações e premiações seguem os registros públicos da <strong>Pro-Música Brasil</strong>, <strong>Latin Recording Academy</strong> e <strong>Ecad</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Contato & Sugestões */}
      <div className="rounded-3xl border border-white/10 p-6 sm:p-8 bg-zinc-900/60 backdrop-blur-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
            <Mail className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Contato &amp; Fã-Clubes</h3>
            <p className="text-xs text-zinc-400">Tem sugestões de métricas, correções ou quer integrar seu fã-clube?</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
            <span className="text-zinc-400 block mb-1">E-mail Comunitário:</span>
            <strong className="text-white text-sm font-mono">contato@mariliaday.com.br</strong>
          </div>
          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
            <span className="text-zinc-400 block mb-1">Hashtag Oficial:</span>
            <strong className="text-amber-400 text-sm font-mono">#MariliaDay #RainhaDaSofrencia</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
