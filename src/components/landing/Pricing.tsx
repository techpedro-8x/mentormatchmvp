const plans = [
  {
    name: "Encontro",
    price: "Gratuito",
    desc: "Mentorias abertas com universitários voluntários. Ideal para começar a explorar caminhos.",
    features: ["1 sessão por mês", "Match por interesse", "Chat na plataforma"],
    variant: "editorialOutline" as const,
  },
  {
    name: "Trajeto",
    price: "Sob consulta",
    desc: "Mentorias remuneradas com mentores especializados, focadas em curso, vestibular ou bolsa.",
    features: ["Sessões ilimitadas", "Mentor dedicado", "Trilha personalizada", "Materiais de apoio"],
    variant: "editorial" as const,
    highlighted: true,
  },
];

export const Pricing = () => {
  return (
    <section className="py-20 sm:py-24 md:py-32 px-5 sm:px-6 md:px-10 bg-softgray border-y border-ink/5">
      <div className="max-w-[1240px] mx-auto">
        <div className="text-center mb-12 sm:mb-16 max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.18em] font-semibold text-hotpink mb-6">Planos</p>
          <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl tracking-[-0.04em] text-ink leading-[0.95] text-balance">
            Mentoria no seu <span className="text-electric">ritmo.</span>
          </h2>
          <p className="text-ink/70 mt-5 sm:mt-6 leading-relaxed text-base">
            Comece de graça e, se quiser ir mais fundo, escolha um mentor para uma jornada contínua.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 max-w-4xl mx-auto">
          {plans.map((p) => (
            <article
              key={p.name}
              className={`p-7 sm:p-10 rounded-3xl border transition-all duration-300 flex flex-col ${
                p.highlighted
                  ? "bg-ink text-paper border-ink shadow-editorial relative overflow-hidden"
                  : "bg-paper border-ink/10 hover:border-electric"
              }`}
            >
              {p.highlighted && (
                <div className="absolute -top-20 -right-20 size-56 bg-electric rounded-full blur-3xl opacity-40" aria-hidden />
              )}
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                <h3 className="font-display font-bold text-2xl sm:text-3xl tracking-tight relative">{p.name}</h3>
                <span className={`text-[11px] sm:text-xs uppercase tracking-[0.18em] font-semibold relative ${p.highlighted ? "text-hotpink" : "text-electric"}`}>
                  {p.price}
                </span>
              </div>
              <p className={`mt-2 text-[15px] leading-relaxed relative ${p.highlighted ? "text-paper/75" : "text-ink/70"}`}>
                {p.desc}
              </p>
              <ul className="mt-8 space-y-3 flex-1 relative">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span className={p.highlighted ? "text-hotpink" : "text-electric"}>●</span>
                    <span className={p.highlighted ? "text-paper/85" : "text-ink/75"}>{f}</span>
                  </li>
                ))}
              </ul>
              <button type="button" className="cssbuttons-io mt-8 sm:mt-10 relative self-stretch sm:self-start justify-center">
                <span>Começar agora</span>
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};