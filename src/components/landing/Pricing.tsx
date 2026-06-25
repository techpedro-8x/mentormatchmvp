type Plan = {
  name: string;
  price: string;
  priceNote?: string;
  desc: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
  institutional?: boolean;
  badge?: string;
};

const plans: Plan[] = [
  {
    name: "Encontro",
    price: "Gratuito",
    desc: "Mentorias abertas com universitários voluntários. Ideal para começar a explorar caminhos.",
    features: ["1 sessão por mês", "Match por interesse", "Chat na plataforma"],
    cta: "Começar agora",
  },
  {
    name: "Trajeto",
    price: "Premium",
    priceNote: "Sob consulta",
    desc: "Mentorias remuneradas com mentores especializados, focadas em curso, vestibular ou bolsa.",
    features: ["Sessões ilimitadas", "Mentor dedicado", "Trilha personalizada", "Materiais de apoio"],
    cta: "Começar agora",
    highlighted: true,
    badge: "Mais escolhido",
  },
  {
    name: "Escolar",
    price: "Instituições",
    priceNote: "Plano sob medida",
    desc: "Levamos o programa de mentoria para toda a rede da sua escola, ONG ou universidade, com acompanhamento dedicado.",
    features: [
      "Licenças ilimitadas para alunos",
      "Painel de gestão para a coordenação",
      "Relatórios de engajamento e impacto",
      "Mentores curados para o perfil da rede",
      "Onboarding e treinamento da equipe",
      "Suporte prioritário e SLA dedicado",
    ],
    cta: "Falar com nosso time",
    highlighted: true,
    badge: "Institucional",
  },
];

export const Pricing = () => {
  return (
    <section className="py-20 sm:py-24 md:py-32 px-5 sm:px-6 md:px-10 bg-softgray border-y border-ink/5">
      <div className="max-w-[1240px] mx-auto">
        <div className="text-center mb-12 sm:mb-16 max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.18em] font-semibold text-hotpink mb-6">Planos</p>
          <h2 className="font-display font-bold text-[clamp(2rem,8vw,3rem)] sm:text-5xl md:text-6xl tracking-[-0.04em] text-ink leading-[0.95] text-balance">
            Mentoria no seu <span className="text-electric">ritmo.</span>
          </h2>
          <p className="text-ink/70 mt-5 sm:mt-6 leading-relaxed text-base">
            Comece de graça e, se quiser ir mais fundo, escolha um mentor para uma jornada contínua.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-6xl mx-auto items-stretch">
          {plans.map((p) => {
            const isDark = p.highlighted;
            const isInst = p.institutional;
            const cardClasses = isDark
              ? "bg-ink text-paper border-ink shadow-editorial relative overflow-hidden"
              : isInst
                ? "bg-paper border-ink/15 hover:border-hotpink relative overflow-hidden"
                : "bg-paper border-ink/10 hover:border-electric";
            const accent = isDark ? "text-hotpink" : isInst ? "text-hotpink" : "text-electric";
            return (
              <article
                key={p.name}
                className={`p-7 sm:p-9 rounded-3xl border transition-all duration-300 flex flex-col ${cardClasses}`}
              >
                {isDark && (
                  <div className="absolute -top-20 -right-20 size-56 bg-electric rounded-full blur-3xl opacity-40" aria-hidden />
                )}
                {isInst && (
                  <div className="absolute -bottom-24 -left-16 size-56 bg-hotpink rounded-full blur-3xl opacity-10" aria-hidden />
                )}
                {p.badge && (
                  <span className="absolute top-5 right-5 text-[10px] uppercase tracking-[0.16em] font-semibold bg-hotpink text-paper px-2.5 py-1 rounded-full">
                    {p.badge}
                  </span>
                )}
                {isInst && (
                  <span className="relative inline-flex items-center self-start text-[10px] uppercase tracking-[0.18em] font-semibold bg-ink text-paper px-2.5 py-1 rounded-full mb-4">
                    Para instituições
                  </span>
                )}
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2 relative">
                  <h3 className="font-display font-bold text-2xl sm:text-3xl tracking-tight">{p.name}</h3>
                  <span className={`text-[11px] sm:text-xs uppercase tracking-[0.18em] font-semibold ${accent}`}>
                    {p.price}
                  </span>
                </div>
                {p.priceNote && (
                  <p className={`text-xs font-medium relative ${isDark ? "text-paper/60" : "text-ink/50"}`}>
                    {p.priceNote}
                  </p>
                )}
                <p className={`mt-3 text-[15px] leading-relaxed relative ${isDark ? "text-paper/75" : "text-ink/70"}`}>
                  {p.desc}
                </p>
                <ul className="mt-7 space-y-3 flex-1 relative">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <span className={accent}>●</span>
                      <span className={isDark ? "text-paper/85" : "text-ink/75"}>{f}</span>
                    </li>
                  ))}
                </ul>
                {isInst && (
                  <div className="mt-7 pt-5 border-t border-ink/10 relative grid grid-cols-3 gap-3 text-center">
                    <div>
                      <p className="font-display font-bold text-xl text-ink">+50</p>
                      <p className="text-[10px] uppercase tracking-wider text-ink/55 mt-1">Instituições</p>
                    </div>
                    <div>
                      <p className="font-display font-bold text-xl text-ink">+5k</p>
                      <p className="text-[10px] uppercase tracking-wider text-ink/55 mt-1">Alunos</p>
                    </div>
                    <div>
                      <p className="font-display font-bold text-xl text-ink">98%</p>
                      <p className="text-[10px] uppercase tracking-wider text-ink/55 mt-1">Satisfação</p>
                    </div>
                  </div>
                )}
                <button type="button" className="cssbuttons-io mt-8 relative self-stretch sm:self-start justify-center">
                  <span>{p.cta}</span>
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};