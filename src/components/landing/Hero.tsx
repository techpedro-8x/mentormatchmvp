import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-mentoring.jpg";

export const Hero = () => {
  return (
    <header className="relative pt-36 md:pt-44 pb-20 md:pb-28 px-6 md:px-10 max-w-[1440px] mx-auto overflow-hidden">
      <div className="absolute inset-0 bg-gradient-warm pointer-events-none" aria-hidden />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center relative">
        <div className="lg:col-span-6 flex flex-col gap-10 animate-fade-up">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-ink/55">
            <span className="block w-10 h-px bg-ink/30" />
            Mentoria entre estudantes
          </div>

          <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] leading-[0.92] tracking-tight text-balance text-ink">
            O futuro
            <br />
            <span className="italic text-terracotta">não precisa ser</span>
            <br />
            um mistério.
          </h1>

          <p className="text-lg md:text-xl leading-relaxed text-ink/75 max-w-[48ch] text-pretty">
            Sente para um café com quem já esteve no seu lugar. Conectamos estudantes
            do ensino médio a universitários para conversas reais sobre cursos,
            faculdade e o que vem depois.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Button asChild variant="editorial" size="editorial">
              <a href="#estudantes">Encontrar um mentor</a>
            </Button>
            <Button asChild variant="editorialOutline" size="editorial">
              <a href="#mentores">Quero ser mentor</a>
            </Button>
          </div>

          <div className="flex items-center gap-6 pt-6 text-xs uppercase tracking-[0.2em] text-ink/55">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="size-8 rounded-full bg-clay border-2 border-paper flex items-center justify-center font-serif text-ink/70 text-sm"
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <span>+ de 400 mentores ativos</span>
          </div>
        </div>

        <div className="lg:col-span-6 relative animate-fade-up" style={{ animationDelay: "120ms" }}>
          <div className="aspect-[4/5] w-full rounded-[2rem] overflow-hidden bg-clay relative z-10 shadow-editorial">
            <img
              src={heroImage}
              alt="Estudante e mentor universitário conversando em uma cafeteria"
              width={1200}
              height={1500}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1500ms] ease-out"
            />
          </div>

          <div className="absolute -bottom-8 -left-8 size-48 bg-sage rounded-full mix-blend-multiply blur-3xl opacity-60 animate-blob" aria-hidden />
          <div className="absolute -top-12 -right-12 size-64 bg-terracotta rounded-full mix-blend-multiply blur-3xl opacity-40 animate-blob" aria-hidden style={{ animationDelay: "3s" }} />

          <div className="absolute -bottom-6 right-4 md:right-8 bg-paper/95 backdrop-blur-sm rounded-2xl p-5 shadow-soft border border-ink/5 max-w-[240px] z-20">
            <p className="text-xs uppercase tracking-[0.18em] text-ink/55 mb-2">Próxima sessão</p>
            <p className="font-serif text-lg leading-tight text-ink">
              Engenharia na USP — quinta, 19h
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};