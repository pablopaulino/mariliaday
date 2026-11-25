"use client";

import { Film, MapPin, Star, Heart, Mic2, Sparkles, Radio, Users } from "lucide-react";

interface LegacyItem {
  icon: React.ReactNode;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  accentColor: string;
}

const LEGACY_ITEMS: LegacyItem[] = [
  {
    icon: <Film className="w-5 h-5" />,
    badge: "PRIME VIDEO • OUT 2026",
    title: "Marília Mendonça: Sentimento Louco",
    subtitle: "Série Documental Oficial — 4 Episódios",
    description:
      "Produzida pela Chatrone e Kromaki em coprodução com a Amazon MGM Studios, a série mergulhou no maior acervo íntimo já aberto sobre a cantora.",
    details: [
      "Dirigida por Susanna Lira (lançada em 16/10/2026)",
      "Acervo inédito: 530 mil fotos, 50 mil vídeos, áudios, mensagens e diários pessoais",
      "Depoimentos de Dona Ruth, irmãos, Maiara & Maraisa, Zezé Di Camargo e Paula Fernandes",
    ],
    accentColor: "blue",
  },
  {
    icon: <Star className="w-5 h-5" />,
    badge: "AMAZON • PREVISÃO 2027",
    title: "Marília — O Filme",
    subtitle: "Longa-Metragem de Ficção Biográfico",
    description:
      "O filme retratará a trajetória da menina nascida em Cristianópolis (GO) até se tornar a maior estrela da música brasileira.",
    details: [
      "Protagonista: atriz e cantora Marina Versos interpretando Marília",
      "Elenco: Hermila Guedes, Klara Castanho, Marcelo Serrado e Sophia Valverde",
      "Estreia prevista nos cinemas e streaming para 2027",
    ],
    accentColor: "amber",
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    badge: "MIS SÃO PAULO • 2026",
    title: "Exposição Imersiva: Sentimento Louco",
    subtitle: "Museu da Imagem e do Som — 2 Andares",
    description:
      "Em paralelo à estreia da série documental, São Paulo recebeu uma grande exposição oficial ocupando dois andares inteiros do MIS.",
    details: [
      "Figurinos icônicos de shows, turnês e DVDs históricos",
      "Objetos pessoais preservados pela família e instalações interativas",
      "Tributos musicais Amazon Music Originals e especiais na TV (Globo)",
    ],
    accentColor: "purple",
  },
  {
    icon: <Mic2 className="w-5 h-5" />,
    badge: "LANÇAMENTO PÓSTUMO • NOV 2026",
    title: "Manuscritos — Capítulos I e II",
    subtitle: "Projeto Póstumo de Lives Históricas (2021)",
    description:
      "Dando continuidade ao resgate iniciado com 'Decretos Reais', família e gravadora lançaram em novembro de 2026 novos registros audiovisuais de 2021.",
    details: [
      "Capítulos I e II extraídos de apresentações e registros ao vivo de 2021",
      "Destaques incluem interpretações emocionantes como 'Foi por Conveniência'",
      "Lançamento simultâneo nas plataformas de áudio e videoclipes no YouTube",
    ],
    accentColor: "emerald",
  },
];

const CURIOSITIES = [
  { icon: "✍️", text: "Começou a compor aos 12 anos — coescreveu \"Minha Herança\" para João Neto & Frederico ainda adolescente." },
  { icon: "🍝", text: "Contrariando o estereótipo sertanejo, Marília não gostava de churrasco e preferia massas e comida caseira (também não era fã de doces)." },
  { icon: "✨", text: "Era apaixonada por perfumaria e colecionava fragrâncias — seu favorito era o Coco Mademoiselle Intense, da Chanel." },
  { icon: "🚭", text: "Aos 24 anos tomou a decisão de parar de fumar, marco pessoal que celebrava como uma de suas maiores vitórias de saúde." },
  { icon: "🎤", text: "Na turnê Todos os Cantos, fazia questão de panfletar ela mesma em praças e calçadões convidando moradores para os shows surpresa." },
  { icon: "🍽️", text: "Recusava o isolamento da fama: fazia questão de almoçar em restaurantes abertos de shoppings e sair para bares com os amigos." },
  { icon: "👶", text: "Léo Dias Mendonça Huff nasceu em 16/12/2019 em Goiânia, de parto normal prematuro de 8 meses — transformando todas as prioridades da cantora." },
  { icon: "💑", text: "Conheceu Murilo Huff graças à música \"Transplante\" (composta por ele e gravada por Marília com Bruno & Marrone)." },
  { icon: "📺", text: "Na live recorde de 08/04/2020 (da sala de casa), errou a letra de 'De Quem É a Culpa?' pedindo pra recomeçar e trocou o tênis por chinelo no meio do show." },
  { icon: "🎵", text: "Além do sertanejo, compôs sucessos gravados no forró, arrocha e axé para Wesley Safadão, Joelma, Gabriel Diniz, Márcia Fellipe e Mara Pavanelly." },
];

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  blue: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/30" },
  amber: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/30" },
  purple: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/30" },
  emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/30" },
};

export function LegacyShowcase() {
  return (
    <div className="space-y-8">
      {/* Section 1: Audiovisual Legacy */}
      <div className="rounded-3xl border border-white/10 bg-zinc-900/60 backdrop-blur-xl p-6 sm:p-8 space-y-6">
        <div className="pb-6 border-b border-zinc-800/80">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Film className="h-3.5 w-3.5" />
            <span>Legado Audiovisual, Exposições &amp; Música Póstuma</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            O Legado Que Continua Vivo (2022 – 2027)
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Série documental, longa-metragem, exposição no MIS e os projetos musicais póstumos que eternizam a Rainha da Sofrência.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {LEGACY_ITEMS.map((item, i) => {
            const colors = colorMap[item.accentColor] || colorMap.amber;
            return (
              <div
                key={i}
                className={`p-5 rounded-2xl border ${colors.border} bg-black/40 hover:bg-black/60 transition-all space-y-4`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className={`p-2.5 rounded-xl ${colors.bg} ${colors.text} shrink-0`}>
                    {item.icon}
                  </div>
                  <span
                    className={`text-[10px] font-mono font-bold uppercase tracking-wider ${colors.text} px-2 py-0.5 rounded-md ${colors.bg} border ${colors.border}`}
                  >
                    {item.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white">{item.title}</h3>
                  <p className={`text-xs font-semibold ${colors.text} mt-0.5`}>{item.subtitle}</p>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed">{item.description}</p>

                <ul className="space-y-1.5">
                  {item.details.map((detail, j) => (
                    <li key={j} className="flex items-start gap-2 text-[11px] text-zinc-400">
                      <Sparkles className={`w-3 h-3 ${colors.text} shrink-0 mt-0.5`} />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Special Cards: Live Pandemia & Família */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
          <div className="p-5 rounded-2xl bg-gradient-to-br from-rose-500/10 to-black/40 border border-rose-500/25 space-y-3">
            <div className="flex items-center gap-2 text-rose-400">
              <Radio className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">
                08/04/2020 • #LiveLocalMariliaMendonca
              </span>
            </div>
            <h3 className="text-base font-bold text-white">
              A Noite em Que Ela Parou o Planeta da Sala de Casa
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Transmitida diretamente de sua casa em Goiânia com equipe mínima por conta do isolamento social, a live de mais de 3 horas contou com intérprete de Libras em tempo real, arrecadou mais de 200 toneladas de alimentos e atingiu 3,31 milhões de acessos simultâneos — tornando-se a maior live musical do mundo e vencendo o Prêmio Multishow 2020.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 to-black/40 border border-amber-500/25 space-y-3">
            <div className="flex items-center gap-2 text-amber-400">
              <Users className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Raízes, Família &amp; Léo
              </span>
            </div>
            <h3 className="text-base font-bold text-white">
              De Cristianópolis (GO) ao Coração do Brasil
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Nascida em Cristianópolis em 22/07/1995 e criada em Goiânia, começou cantando em corais de igreja. Em 2019 nasceu seu único filho, Léo Dias Mendonça Huff (fruto da relação com Murilo Huff), hoje criado entre o pai e a avó Dona Ruth, que juntos à equipe preservam a obra e a história da cantora para as futuras gerações.
            </p>
          </div>
        </div>
      </div>

      {/* Section 2: Curiosidades */}
      <div className="rounded-3xl border border-white/10 bg-zinc-900/60 backdrop-blur-xl p-6 sm:p-8 space-y-6">
        <div className="pb-6 border-b border-zinc-800/80">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Heart className="h-3.5 w-3.5" />
            <span>Fatos &amp; Curiosidades Íntimas</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Você Sabia? 10 Lados Pouco Conhecidos da Rainha
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Bastidores da vida pessoal, hábitos simples e detalhes curiosos de quem conquistou o país inteiro.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CURIOSITIES.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-3.5 rounded-2xl bg-black/30 border border-white/5 hover:border-rose-500/20 transition-all"
            >
              <span className="text-lg shrink-0">{item.icon}</span>
              <p className="text-xs text-zinc-300 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
