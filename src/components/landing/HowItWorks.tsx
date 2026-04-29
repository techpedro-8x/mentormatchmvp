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
    <section id="como-funciona" className="py-24 md:py-32 px-6 md:px-10">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-5">
            <p className="text-xs uppercase tracking-[0.22em] text-terracotta mb-6">
              Como funciona
            </p>
            <h2 className="font-serif text-5xl md:text-6xl tracking-tight leading-[0.95] text-ink text-balance">
              Quatro passos.
              <br />
              <span className="italic">Zero burocracia.</span>
            </h2>
          </div>
          <p className="lg:col-span-6 lg:col-start-7 text-ink/70 text-lg leading-relaxed self-end">
            Construímos uma experiência leve para você focar no que importa:
            uma boa conversa com alguém que já viveu o que você está prestes
            a viver.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-ink/8 rounded-3xl overflow-hidden border border-ink/5">
          {steps.map((s) => (
            <div
              key={s.n}
              className="bg-paper p-8 md:p-10 hover:bg-clay/40 transition-colors duration-500 min-h-[260px] flex flex-col justify-between"
            >
              <span className="font-serif text-3xl text-terracotta">{s.n}</span>
              <div className="mt-12">
                <h3 className="font-serif text-2xl text-ink mb-3 tracking-tight">
                  {s.title}
                </h3>
                <p className="text-ink/65 text-sm leading-relaxed text-pretty">
                  {s.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};