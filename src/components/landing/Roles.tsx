const roles = [
  {
    id: "estudantes",
    number: "01",
    title: "Para Estudantes",
    accent: "text-electric",
    bg: "bg-electric",
    border: "hover:border-electric",
    body:
      "Dúvidas sobre vestibular? Indecisão entre cursos? Encontre um mentor universitário que vive o que você quer estudar e tire suas dúvidas em um papo direto, sem pressão.",
    cta: "Sou estudante",
  },
  {
    id: "mentores",
    number: "02",
    title: "Para Universitários",
    accent: "text-hotpink",
    bg: "bg-hotpink",
    border: "hover:border-hotpink",
    body:
      "Compartilhe sua vivência, ajude quem está onde você esteve e valide horas complementares. Mentorias podem ser gratuitas ou remuneradas — você escolhe.",
    cta: "Quero ser mentor",
  },
  {
    id: "escolas",
    number: "03",
    title: "Para Escolas",
    accent: "text-ink",
    bg: "bg-ink",
    border: "hover:border-ink",
    body:
      "Ofereça aos seus alunos do terceirão acesso a uma rede curada de universitários reais. Acompanhe sessões e engajamento por turma.",
    cta: "Falar com a equipe",
  },
];

export const Roles = () => {
  return (
    <section className="py-20 sm:py-24 md:py-32 px-5 sm:px-6 md:px-10 bg-softgray border-t border-ink/5">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-16 md:mb-20 gap-6 md:gap-8">
          <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[-0.04em] max-w-[14ch] leading-[0.95] text-ink">
            Espaço para{" "}
            <span className="text-electric">todos</span> os{" "}
            <span className="text-hotpink">caminhos.</span>
          </h2>
          <p className="text-ink/65 max-w-[34ch] text-base leading-relaxed">
            Acreditamos que clareza vem do diálogo. Escolha como participar
            da nossa comunidade.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {roles.map((r) => (
            <article
              key={r.id}
              id={r.id}
              className={`group bg-paper p-7 sm:p-10 rounded-3xl border border-ink/8 ${r.border} hover:shadow-editorial transition-all duration-300 flex flex-col justify-between min-h-[360px] sm:min-h-[420px]`}
            >
              <div>
                <div className={`size-12 rounded-2xl ${r.bg} flex items-center justify-center text-paper font-display font-bold text-base mb-8`}>
                  {r.number}
                </div>
                <h3 className="text-2xl font-display font-semibold tracking-tight mb-4 text-ink transition-colors">
                  {r.title}
                </h3>
                <p className="text-ink/70 leading-relaxed text-[15px] text-pretty">
                  {r.body}
                </p>
              </div>
              <a
                href="#cadastro"
                className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] ${r.accent} mt-12 group-hover:gap-3 transition-all`}
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