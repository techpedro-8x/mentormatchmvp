import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, GraduationCap, LogIn, Sparkles, UserPlus } from "lucide-react";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get("mode") === "login" ? "login" : "signup";
  return (
    <main className="min-h-screen w-full bg-paper relative overflow-hidden flex flex-col">
      <div className="absolute inset-0 bg-gradient-warm pointer-events-none" aria-hidden />
      <div className="absolute -top-32 -left-32 size-[28rem] rounded-full blur-3xl opacity-40 bg-electric animate-blob pointer-events-none" aria-hidden />
      <div className="absolute -bottom-40 -right-32 size-[32rem] rounded-full blur-3xl opacity-30 bg-hotpink animate-blob pointer-events-none" style={{ animationDelay: "3s" }} aria-hidden />

      <header className="relative z-10 px-5 sm:px-6 md:px-10 py-5 sm:py-6 max-w-[1440px] mx-auto w-full">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl sm:text-2xl tracking-tight text-ink">
          <img
            src="/logo.png"
            alt="MentorMatch"
            width={36}
            height={36}
            className="h-8 w-8 sm:h-9 sm:w-9"
          />
          <span>MentorMatch<span className="text-hotpink">.</span></span>
        </Link>
      </header>

      <section className="relative z-10 flex-1 flex items-center justify-center px-5 sm:px-6 py-8 sm:py-12">
        <div className="max-w-5xl w-full mx-auto">
          <div className="text-center mb-10 sm:mb-14 animate-fade-up">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] font-semibold text-electric bg-electric/10 px-3 py-1.5 rounded-full mb-6">
              <span className="size-1.5 rounded-full bg-electric animate-pulse" />
              Bem-vindo
            </div>
            <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] sm:leading-[0.9] tracking-[-0.04em] text-ink mb-4 sm:mb-5">
              Como você quer{" "}
              <span className="text-electric">começar</span>
              <span className="text-hotpink">?</span>
            </h1>
            <p className="text-base sm:text-lg text-ink/65 max-w-xl mx-auto leading-relaxed">
              Escolha o caminho que combina com você. Você pode mudar depois.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 animate-fade-up" style={{ animationDelay: "120ms" }}>
            <RoleCard
              initialMode={initialMode}
              signupTo="/app/aluno"
              loginTo="/app/aluno"
              icon={<GraduationCap className="size-7" />}
              tag="Sou aluno"
              title="Encontrar um mentor"
              description="Converse com universitários que já passaram por onde você está agora."
              accent="electric"
            />
            <RoleCard
              initialMode={initialMode}
              signupTo="/app/mentor"
              loginTo="/app/mentor"
              icon={<Sparkles className="size-7" />}
              tag="Sou mentor"
              title="Quero ser mentor"
              description="Compartilhe sua experiência e ajude estudantes a tomarem decisões melhores."
              accent="hotpink"
            />
          </div>
        </div>
      </section>
    </main>
  );
};

const RoleCard = ({
  initialMode = "signup",
  signupTo,
  loginTo,
  icon,
  tag,
  title,
  description,
  accent,
}: {
  initialMode?: "signup" | "login";
  signupTo: string;
  loginTo: string;
  icon: React.ReactNode;
  tag: string;
  title: string;
  description: string;
  accent: "electric" | "hotpink";
}) => {
  const [mode, setMode] = useState<"signup" | "login">(initialMode);
  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);
  const accentBg = accent === "electric" ? "bg-electric" : "bg-hotpink";
  const accentText = accent === "electric" ? "text-electric" : "text-hotpink";
  const accentBgSoft = accent === "electric" ? "bg-electric/10" : "bg-hotpink/10";

  const isSignup = mode === "signup";
  const ctaTo = isSignup ? signupTo : loginTo;
  const ctaLabel = isSignup ? "Criar conta" : "Entrar";
  const CtaIcon = isSignup ? UserPlus : LogIn;
  const switchLabel = isSignup ? "Já tenho conta" : "Não tem conta?";
  const switchAction = isSignup ? "Entrar" : "Cadastre-se";

  return (
    <div className="group relative bg-paper rounded-3xl p-6 sm:p-8 border border-ink/8 shadow-soft hover:shadow-editorial transition-all duration-500 hover:-translate-y-1 overflow-hidden">
      <div
        className={`absolute -top-24 -right-24 size-48 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-700 ${accentBg}`}
        aria-hidden
      />
      <div className="relative z-10 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div className={`size-14 rounded-2xl ${accentBgSoft} ${accentText} flex items-center justify-center`}>
            {icon}
          </div>
          <span className={`text-[10px] uppercase tracking-[0.18em] font-semibold ${accentText}`}>
            {tag}
          </span>
        </div>

        <h3 className="font-display font-bold text-2xl sm:text-3xl tracking-[-0.03em] text-ink">
          {title}
        </h3>
        <p className="text-ink/65 leading-relaxed text-sm sm:text-base">{description}</p>

        <Link
          key={mode}
          to={ctaTo}
          className={`mt-4 inline-flex items-center justify-between gap-3 px-5 py-4 rounded-2xl ${accentBg} text-paper font-semibold text-sm uppercase tracking-[0.16em] hover:opacity-90 transition-all animate-fade-up`}
        >
          <span className="inline-flex items-center gap-2">
            <CtaIcon className="size-4" />
            {ctaLabel}
          </span>
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>

        <button
          type="button"
          onClick={() => setMode(isSignup ? "login" : "signup")}
          className="text-sm text-ink/60 hover:text-ink text-center transition-colors"
        >
          {switchLabel}{" "}
          <span className={`font-semibold underline-offset-4 hover:underline ${accentText}`}>
            {switchAction}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Auth;