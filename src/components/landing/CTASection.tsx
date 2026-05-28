import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const CTASection = () => {
  return (
    <section id="cadastro" className="py-20 sm:py-24 md:py-32 px-5 sm:px-6 md:px-10">
      <div className="max-w-[1240px] mx-auto relative rounded-[2rem] sm:rounded-[2.5rem] bg-ink text-paper p-8 sm:p-12 md:p-20 overflow-hidden">
        <div className="absolute -top-32 -right-32 size-[28rem] bg-electric rounded-full blur-3xl opacity-50 animate-blob" aria-hidden />
        <div className="absolute -bottom-24 -left-24 size-96 bg-hotpink rounded-full blur-3xl opacity-50 animate-blob" aria-hidden style={{ animationDelay: "4s" }} />

        <div className="relative max-w-3xl">
          <p className="text-xs uppercase tracking-[0.18em] font-semibold text-hotpink mb-6">
            ● Comece hoje
          </p>
          <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-7xl leading-[0.95] tracking-[-0.04em] text-balance">
            A próxima conversa pode mudar a sua{" "}
            <span className="text-electric">próxima década.</span>
          </h2>
          <p className="mt-6 sm:mt-8 text-paper/75 text-base sm:text-lg max-w-[52ch] leading-relaxed">
            Cadastre-se em menos de 2 minutos e receba sugestões de mentores
            no mesmo dia.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 sm:mt-10">
            <Button asChild variant="editorial" size="editorial" className="!bg-paper !text-ink hover:!bg-electric hover:!text-paper w-full sm:w-auto justify-center">
              <Link to="/cadastro/aluno">Sou estudante</Link>
            </Button>
            <Button asChild variant="editorialOutline" size="editorial" className="!border-paper/30 !text-paper hover:!bg-hotpink hover:!border-hotpink hover:!text-paper w-full sm:w-auto justify-center">
              <Link to="/cadastro/mentor">Quero ser mentor</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};