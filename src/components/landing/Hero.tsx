import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-mentoring.jpg";

export const Hero = () => {
  return (
    <header className="relative pt-36 md:pt-44 pb-20 md:pb-28">
      <div
        className="absolute inset-y-0 left-0 right-0 bg-gradient-warm pointer-events-none -z-0"
        style={{
          left: "calc(50% - 50vw)",
          right: "calc(50% - 50vw)",
        }}
        aria-hidden
      />

      <div className="px-6 md:px-10 max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center relative">
        <div className="lg:col-span-6 flex flex-col gap-10 animate-fade-up">
          <div className="inline-flex items-center gap-2 self-start text-[11px] uppercase tracking-[0.18em] font-semibold text-electric bg-electric/10 px-3 py-1.5 rounded-full">
            <span className="size-1.5 rounded-full bg-electric animate-pulse" />
            Mentoria entre estudantes
          </div>

          <h1 className="font-display font-bold text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] leading-[0.9] tracking-[-0.04em] text-balance text-ink">
            O futuro não
            <br />
            precisa ser um{" "}
            <span className="text-electric">mistério</span>
            <span className="text-hotpink">.</span>
          </h1>

          <p className="text-lg md:text-xl leading-relaxed text-ink/75 max-w-[48ch] text-pretty">
            Conectamos estudantes do ensino médio com universitários reais para
            conversas honestas sobre cursos, faculdade e o que vem depois.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <a href="#estudantes" className="cssbuttons-io self-start">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 2l2.39 4.84L20 7.66l-4 3.9.94 5.5L12 14.77l-4.94 2.6L8 11.56l-4-3.9 5.61-.82L12 2z" />
                </svg>
                Encontrar um mentor
              </span>
            </a>
            <Button asChild variant="editorialOutline" size="editorial">
              <a href="#mentores">Quero ser mentor</a>
            </Button>
          </div>

          <div className="flex items-center gap-6 pt-6 text-xs uppercase tracking-[0.18em] font-medium text-ink/60">
            <div className="flex -space-x-2">
              {["bg-electric", "bg-hotpink", "bg-ink", "bg-electric/70"].map((c, i) => (
                <div
                  key={i}
                  className={`size-8 rounded-full ${c} border-2 border-paper flex items-center justify-center text-paper text-xs font-semibold`}
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <span>+ de 400 mentores ativos</span>
          </div>
        </div>

        <div className="lg:col-span-6 relative animate-fade-up" style={{ animationDelay: "120ms" }}>
          <div className="aspect-[4/5] w-full rounded-[2rem] overflow-hidden bg-softgray relative z-10 shadow-editorial">
            <img
              src={heroImage}
              alt="Estudante e mentor universitário conversando em uma cafeteria"
              width={1200}
              height={1500}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1500ms] ease-out"
            />
          </div>

          <div className="absolute -bottom-8 -left-8 size-56 bg-electric rounded-full blur-3xl opacity-50 animate-blob" aria-hidden />
          <div className="absolute -top-12 -right-12 size-72 bg-hotpink rounded-full blur-3xl opacity-50 animate-blob" aria-hidden style={{ animationDelay: "3s" }} />

          <div className="absolute -bottom-6 right-4 md:right-8 bg-paper rounded-2xl p-5 shadow-soft border border-ink/8 max-w-[260px] z-20">
            <p className="text-[10px] uppercase tracking-[0.18em] font-semibold text-electric mb-2">● Próxima sessão</p>
            <p className="font-display font-semibold text-base leading-tight text-ink">
              Engenharia na USP — quinta, 19h
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};