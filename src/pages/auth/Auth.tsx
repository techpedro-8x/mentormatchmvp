import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap, Sparkles } from "lucide-react";

const Auth = () => {
  return (
    <main className="min-h-screen w-full bg-paper relative overflow-hidden flex flex-col">
      <div className="absolute inset-0 bg-gradient-warm pointer-events-none" aria-hidden />
      <div className="absolute -top-32 -left-32 size-[28rem] rounded-full blur-3xl opacity-40 bg-electric animate-blob pointer-events-none" aria-hidden />
      <div className="absolute -bottom-40 -right-32 size-[32rem] rounded-full blur-3xl opacity-30 bg-hotpink animate-blob pointer-events-none" style={{ animationDelay: "3s" }} aria-hidden />

      <header className="relative z-10 px-6 md:px-10 py-6 max-w-[1440px] mx-auto w-full">
        <Link to="/" className="font-display font-bold text-2xl tracking-tight text-ink">
          MentorMatch<span className="text-hotpink">.</span>
        </Link>
      </header>

      <section className="relative z-10 flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-5xl w-full mx-auto">
          <div className="text-center mb-14 animate-fade-up">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] font-semibold text-electric bg-electric/10 px-3 py-1.5 rounded-full mb-6">
              <span className="size-1.5 rounded-full bg-electric animate-pulse" />
              Bem-vindo
            </div>
            <h1 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl leading-[0.9] tracking-[-0.04em] text-ink mb-5">
              Como você quer{" "}
              <span className="text-electric">começar</span>
              <span className="text-hotpink">?</span>
            </h1>
            <p className="text-lg text-ink/65 max-w-xl mx-auto leading-relaxed">
              Escolha o caminho que combina com você. Você pode mudar depois.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-up" style={{ animationDelay: "120ms" }}>
            <RoleCard
              to="/cadastro/aluno"
              loginTo="/login/aluno"
              icon={<GraduationCap className="size-7" />}
              tag="Sou aluno"
              title="Encontrar um mentor"
              description="Converse com universitários que já passaram por onde você está agora."
              accent="electric"
            />
            <RoleCard
              to="/cadastro/mentor"
              loginTo="/login/mentor"
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
  to,
  loginTo,
  icon,
  tag,
  title,
  description,
  accent,
}: {
  to: string;
  loginTo: string;
  icon: React.ReactNode;
  tag: string;
  title: string;
  description: string;
  accent: "electric" | "hotpink";
}) => {
  const accentBg = accent === "electric" ? "bg-electric" : "bg-hotpink";
  const accentText = accent === "electric" ? "text-electric" : "text-hotpink";
  const accentBgSoft = accent === "electric" ? "bg-electric/10" : "bg-hotpink/10";

  return (
    <div className="group relative bg-paper rounded-3xl p-8 border border-ink/8 shadow-soft hover:shadow-editorial transition-all duration-500 hover:-translate-y-1 overflow-hidden">
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

        <h3 className="font-display font-bold text-3xl tracking-[-0.03em] text-ink">
          {title}
        </h3>
        <p className="text-ink/65 leading-relaxed">{description}</p>

        <Link
          to={to}
          className={`mt-4 inline-flex items-center justify-between gap-3 px-5 py-4 rounded-2xl ${accentBg} text-paper font-semibold text-sm uppercase tracking-[0.16em] hover:opacity-90 transition-all`}
        >
          <span>Criar conta</span>
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>

        <Link
          to={loginTo}
          className="text-sm text-ink/60 hover:text-ink text-center transition-colors"
        >
          Já tenho conta · <span className="font-semibold underline-offset-4 hover:underline">Entrar</span>
        </Link>
      </div>
    </div>
  );
};

export default Auth;