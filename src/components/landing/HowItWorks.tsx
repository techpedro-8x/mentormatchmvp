const steps = [
  {
    n: "01",
    title: "Crie seu perfil",
    body: "Conte o que você estuda, quais cursos te interessam ou, se for mentor, sua área e universidade.",
  },
  {
    n: "02",
    title: "Receba um match",
    body: "Cruzamos interesses, perfil e disponibilidade para sugerir conexões com sentido — não é sorteio.",
  },
  {
    n: "03",
    title: "Agende a sessão",
    body: "Escolha um horário no calendário do mentor. Vídeo, chat ou áudio — como ficar mais confortável.",
  },
  {
    n: "04",
    title: "Continue o diálogo",
    body: "Mantenha o vínculo, marque novas sessões e acompanhe sua trilha de descobertas dentro da plataforma.",
  },
];

export const HowItWorks = () => {
  return (
    <section id="como-funciona" className="py-20 sm:py-24 md:py-32 px-5 sm:px-6 md:px-10 bg-softgray">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12 sm:mb-16">
          <div className="lg:col-span-5">
            <p className="text-xs uppercase tracking-[0.18em] font-semibold text-hotpink mb-6">
              Como funciona
            </p>
            <h2 className="font-display font-bold text-[clamp(2rem,8vw,3rem)] sm:text-5xl md:text-6xl tracking-[-0.04em] leading-[0.95] text-ink text-balance">
              Quatro passos.
              <br />
              <span className="text-electric">Zero burocracia.</span>
            </h2>
          </div>
          <p className="lg:col-span-6 lg:col-start-7 text-ink/70 text-base sm:text-lg leading-relaxed self-end">
            Construímos uma experiência leve para você focar no que importa:
            uma boa conversa com alguém que já viveu o que você está prestes
            a viver.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s, i) => {
            const colors = ["text-electric", "text-hotpink", "text-electric", "text-hotpink"];
            return (
              <div
                key={s.n}
                className="bg-paper border border-ink/10 rounded-3xl p-8 md:p-10 hover:border-ink hover:-translate-y-1 transition-all duration-300 min-h-[260px] flex flex-col justify-between"
              >
                <span className={`font-display font-bold text-4xl ${colors[i]}`}>{s.n}</span>
                <div className="mt-12">
                  <h3 className="font-display font-semibold text-2xl text-ink mb-3 tracking-tight">
                    {s.title}
                  </h3>
                  <p className="text-ink/65 text-sm leading-relaxed text-pretty">
                    {s.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};