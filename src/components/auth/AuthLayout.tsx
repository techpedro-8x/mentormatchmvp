import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  badge: string;
  children: ReactNode;
  footer?: ReactNode;
  accent?: "electric" | "hotpink";
}

export const AuthLayout = ({
  title,
  subtitle,
  badge,
  children,
  footer,
  accent = "electric",
}: AuthLayoutProps) => {
  const accentColor = accent === "electric" ? "bg-electric" : "bg-hotpink";
  const accentText = accent === "electric" ? "text-electric" : "text-hotpink";

  return (
    <main className="min-h-screen w-full bg-paper relative overflow-hidden">
      {/* Decorative background */}
      <div
        className="absolute inset-0 bg-gradient-warm pointer-events-none"
        aria-hidden
      />
      <div
        className={`absolute -top-32 -left-32 size-[28rem] rounded-full blur-3xl opacity-40 ${accentColor} animate-blob pointer-events-none`}
        aria-hidden
      />
      <div
        className="absolute -bottom-40 -right-32 size-[32rem] rounded-full blur-3xl opacity-30 bg-electric animate-blob pointer-events-none"
        style={{ animationDelay: "3s" }}
        aria-hidden
      />

      <div className="relative z-10 min-h-screen grid grid-cols-1 lg:grid-cols-2">
        {/* Left brand panel */}
        <aside className="hidden lg:flex flex-col justify-between p-12 xl:p-16 relative">
          <Link
            to="/"
            className="font-display font-bold text-2xl tracking-tight text-ink"
          >
            MentorMatch<span className="text-hotpink">.</span>
          </Link>

          <div className="space-y-8 animate-fade-up">
            <div
              className={`inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] font-semibold ${accentText} ${accent === "electric" ? "bg-electric/10" : "bg-hotpink/10"} px-3 py-1.5 rounded-full`}
            >
              <span className={`size-1.5 rounded-full ${accentColor} animate-pulse`} />
              {badge}
            </div>
            <h2 className="font-display font-bold text-5xl xl:text-6xl leading-[0.95] tracking-[-0.04em] text-ink">
              O futuro não
              <br />
              precisa ser um{" "}
              <span className={accentText}>mistério</span>
              <span className="text-hotpink">.</span>
            </h2>
            <p className="text-base text-ink/70 max-w-md leading-relaxed">
              Conexões reais entre estudantes e universitários para conversas
              honestas sobre cursos, faculdade e carreira.
            </p>
          </div>

          <p className="text-xs uppercase tracking-[0.18em] font-medium text-ink/50">
            +400 mentores ativos · 12 universidades
          </p>
        </aside>

        {/* Right form panel */}
        <section className="flex items-center justify-center px-5 py-8 sm:p-10 lg:p-12">
          <div className="w-full max-w-md animate-fade-up">
            <Link
              to="/"
              className="lg:hidden font-display font-bold text-xl tracking-tight text-ink mb-10 inline-block"
            >
              MentorMatch<span className="text-hotpink">.</span>
            </Link>

            <div
              className={`inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] font-semibold ${accentText} ${accent === "electric" ? "bg-electric/10" : "bg-hotpink/10"} px-3 py-1.5 rounded-full mb-6`}
            >
              {badge}
            </div>

            <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-[0.95] tracking-[-0.04em] text-ink mb-3">
              {title}
            </h1>
            <p className="text-ink/65 text-sm sm:text-base mb-8 sm:mb-10 leading-relaxed">
              {subtitle}
            </p>

            {children}

            {footer && (
              <div className="mt-8 text-sm text-ink/65 text-center">
                {footer}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};