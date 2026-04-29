const roles = [
  {
    id: "estudantes",
    number: "01",
    title: "Para Estudantes",
    accent: "text-terracotta",
    border: "hover:border-terracotta/30",
    body:
      "Dúvidas sobre vestibular? Indecisão entre cursos? Encontre um mentor universitário que vive o que você quer estudar e tire suas dúvidas em um papo direto, sem pressão.",
    cta: "Sou estudante",
  },
  {
    id: "mentores",
    number: "02",
    title: "Para Universitários",
    accent: "text-sage",
    border: "hover:border-sage/50",
    body:
      "Compartilhe sua vivência, ajude quem está onde você esteve e valide horas complementares. Mentorias podem ser gratuitas ou remuneradas — você escolhe.",
    cta: "Quero ser mentor",
  },
  {
    id: "escolas",
    number: "03",
    title: "Para Escolas",
    accent: "text-ink",
    border: "hover:border-ink/25",
    body:
      "Ofereça aos seus alunos do terceirão acesso a uma rede curada de universitários reais. Acompanhe sessões e engajamento por turma.",
    cta: "Falar com a equipe",
  },
];

export const Roles = () => {
  return (
    <section className="py-24 md:py-32 px-6 md:px-10 bg-clay/40 border-t border-ink/5">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-20 gap-8">
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl tracking-tight max-w-[14ch] leading-[0.95] text-ink">
            Uma mesa com{" "}
            <span className="italic text-sage">espaço para todos.</span>
          </h2>
          <p className="text-ink/65 max-w-[34ch] text-base leading-relaxed">
            Acreditamos que clareza vem do diálogo. Escolha como participar
            da nossa comunidade.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {roles.map((r) => (
            <article
              key={r.id}
              id={r.id}
              className={`group bg-paper p-10 rounded-3xl border border-ink/5 ${r.border} hover:shadow-soft transition-all duration-500 flex flex-col justify-between min-h-[420px]`}
            >
              <div>
                <div className="size-12 rounded-full bg-clay flex items-center justify-center font-serif text-lg mb-8">
                  <span className={r.accent}>{r.number}</span>
                </div>
                <h3 className="text-2xl font-serif tracking-tight mb-4 text-ink transition-colors">
                  {r.title}
                </h3>
                <p className="text-ink/70 leading-relaxed text-[15px] text-pretty">
                  {r.body}
                </p>
              </div>
              <a
                href="#cadastro"
                className={`inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-ink mt-12 group-hover:gap-3 transition-all`}
              >
                {r.cta}
                <span className="text-base leading-none">→</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};