import { Button } from "@/components/ui/button";

export const CTASection = () => {
  return (
    <section id="cadastro" className="py-24 md:py-32 px-6 md:px-10">
      <div className="max-w-[1240px] mx-auto relative rounded-[2.5rem] bg-ink text-paper p-12 md:p-20 overflow-hidden">
        <div className="absolute -top-32 -right-32 size-96 bg-terracotta rounded-full blur-3xl opacity-40 animate-blob" aria-hidden />
        <div className="absolute -bottom-24 -left-24 size-80 bg-sage rounded-full blur-3xl opacity-30 animate-blob" aria-hidden style={{ animationDelay: "4s" }} />

        <div className="relative max-w-3xl">
          <p className="text-xs uppercase tracking-[0.22em] text-terracotta mb-6">
            Comece hoje
          </p>
          <h2 className="font-serif text-5xl md:text-7xl leading-[0.95] tracking-tight text-balance">
            A próxima conversa pode mudar a sua{" "}
            <span className="italic">próxima década.</span>
          </h2>
          <p className="mt-8 text-paper/75 text-lg max-w-[52ch] leading-relaxed">
            Cadastre-se em menos de 2 minutos e receba sugestões de mentores
            no mesmo dia.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <Button variant="editorial" size="editorial" className="!bg-paper !text-ink hover:!bg-terracotta hover:!text-paper">
              Sou estudante
            </Button>
            <Button variant="editorialOutline" size="editorial" className="!border-paper/30 !text-paper hover:!bg-paper/10 hover:!border-paper">
              Quero ser mentor
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};