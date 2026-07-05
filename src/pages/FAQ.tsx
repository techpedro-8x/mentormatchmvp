import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/landing/Navbar";
import { ChevronDown, HelpCircle } from "lucide-react";

const groups = [
  {
    title: "Sobre a plataforma",
    items: [
      {
        q: "O que é o MentorMatch?",
        a: "Uma plataforma que conecta estudantes do ensino médio com universitários reais para conversar sobre curso, rotina, vestibular e escolha de carreira — sem romantizar nada.",
      },
      {
        q: "É gratuito?",
        a: "Existem mentorias gratuitas com voluntários e mentorias pagas com mentores especializados. Você escolhe o plano que combina com o seu momento.",
      },
      {
        q: "Essa versão é uma demonstração?",
        a: "Sim. Esta é uma versão de teste — você pode explorar todas as áreas sem criar conta ou fazer login. Basta clicar em Entrar e escolher se quer navegar como aluno ou como mentor.",
      },
    ],
  },
  {
    title: "Para alunos",
    items: [
      {
        q: "Como encontro um mentor?",
        a: "No painel do aluno você vê a lista de mentores disponíveis com curso, universidade e avaliações. Clique em um mentor para ver os horários abertos e reservar em um clique.",
      },
      {
        q: "Preciso pagar para conversar com um mentor?",
        a: "Depende do mentor. Cada card indica se a mentoria é Gratuita ou Paga. Mentorias gratuitas costumam ter uma sessão por mês; as pagas oferecem acompanhamento contínuo.",
      },
      {
        q: "Posso remarcar?",
        a: "Sim. Você consegue cancelar uma reserva no seu painel e escolher outro horário do mesmo mentor ou de outro.",
      },
    ],
  },
  {
    title: "Para mentores",
    items: [
      {
        q: "Como me torno mentor?",
        a: "Basta ser universitário e ter vontade de compartilhar sua experiência. Na versão final você criará seu perfil com curso, universidade, bio e áreas em que quer ajudar.",
      },
      {
        q: "Recebo por mentorar?",
        a: "Mentores voluntários acumulam horas complementares e podem baixar certificados. Mentores pagos definem seu valor e recebem pela plataforma.",
      },
      {
        q: "Como funciona minha agenda?",
        a: "Você cadastra horários no seu painel e os alunos podem reservar diretamente. Pedidos pendentes ficam visíveis para você aceitar ou recusar.",
      },
    ],
  },
];

const FAQ = () => {
  return (
    <main className="bg-paper text-ink min-h-screen">
      <Navbar />
      <section className="pt-32 sm:pt-40 pb-20 px-5 sm:px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] font-semibold text-electric bg-electric/10 px-3 py-1.5 rounded-full mb-6">
            <HelpCircle className="size-3.5" /> Perguntas frequentes
          </div>
          <h1 className="font-display font-bold text-4xl sm:text-6xl leading-[0.95] tracking-[-0.04em] mb-5">
            Ficou com alguma <span className="text-electric">dúvida?</span>
          </h1>
          <p className="text-ink/65 text-base sm:text-lg max-w-xl">
            Aqui reunimos as perguntas mais comuns de alunos, famílias e mentores. Se não encontrar o que procura, fale com a gente.
          </p>

          <div className="mt-14 space-y-12">
            {groups.map((g) => (
              <div key={g.title}>
                <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-hotpink mb-5">
                  {g.title}
                </p>
                <div className="space-y-3">
                  {g.items.map((it) => (
                    <FaqItem key={it.q} question={it.q} answer={it.a} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-softgray rounded-3xl p-8 sm:p-10 text-center">
            <h3 className="font-display font-bold text-2xl sm:text-3xl tracking-tight mb-3">
              Ainda tem dúvidas?
            </h3>
            <p className="text-ink/65 mb-6 max-w-lg mx-auto">
              Escreva para <a href="mailto:contato@mentormatch.com" className="text-electric font-semibold">contato@mentormatch.com</a> ou volte para a página inicial e conheça a plataforma.
            </p>
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-ink text-paper text-xs uppercase tracking-[0.16em] font-semibold hover:bg-electric transition-colors"
            >
              Voltar ao início
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

const FaqItem = ({ question, answer }: { question: string; answer: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-paper border border-ink/10 rounded-2xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 hover:bg-softgray/50 transition-colors"
      >
        <span className="font-semibold text-ink">{question}</span>
        <ChevronDown
          className={`size-5 text-ink/50 transition-transform shrink-0 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-5 pb-5 text-sm text-ink/70 leading-relaxed">{answer}</div>
      )}
    </div>
  );
};

export default FAQ;