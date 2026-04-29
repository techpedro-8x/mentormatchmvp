import { Button } from "@/components/ui/button";

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
    <section className="py-24 md:py-32 px-6 md:px-10 bg-clay/30 border-y border-ink/5">
      <div className="max-w-[1240px] mx-auto">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.22em] text-terracotta mb-6">Planos</p>
          <h2 className="font-serif text-5xl md:text-6xl tracking-tight text-ink leading-[0.95] text-balance">
            Mentoria no seu <span className="italic text-sage">ritmo.</span>
          </h2>
          <p className="text-ink/70 mt-6 leading-relaxed">
            Comece de graça e, se quiser ir mais fundo, escolha um mentor para uma jornada contínua.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {plans.map((p) => (
            <article
              key={p.name}
              className={`p-10 rounded-3xl border transition-all duration-500 flex flex-col ${
                p.highlighted
                  ? "bg-ink text-paper border-ink shadow-editorial"
                  : "bg-paper border-ink/8 hover:border-ink/20"
              }`}
            >
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="font-serif text-3xl tracking-tight">{p.name}</h3>
                <span className={`text-xs uppercase tracking-[0.2em] ${p.highlighted ? "text-paper/60" : "text-ink/50"}`}>
                  {p.price}
                </span>
              </div>
              <p className={`mt-2 text-[15px] leading-relaxed ${p.highlighted ? "text-paper/75" : "text-ink/70"}`}>
                {p.desc}
              </p>
              <ul className="mt-8 space-y-3 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span className={p.highlighted ? "text-terracotta" : "text-sage"}>✦</span>
                    <span className={p.highlighted ? "text-paper/85" : "text-ink/75"}>{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant={p.highlighted ? "editorialOutline" : "editorial"}
                size="editorial"
                className={`mt-10 ${p.highlighted ? "!border-paper/30 !text-paper hover:!bg-paper hover:!text-ink" : ""}`}
              >
                Começar agora
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};