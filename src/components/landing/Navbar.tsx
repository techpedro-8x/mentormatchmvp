import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Para Estudantes", href: "#estudantes" },
  { label: "Para Mentores", href: "#mentores" },
  { label: "Para Escolas", href: "#escolas" },
  { label: "Como Funciona", href: "#como-funciona" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-paper/85 backdrop-blur-md border-b border-ink/5 py-3 md:py-4"
          : "bg-transparent py-4 md:py-6"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-6 md:px-10 flex items-center justify-between gap-4">
        <a href="#" className="font-display font-bold text-xl sm:text-2xl tracking-tight text-ink">
          MentorMatch<span className="text-hotpink">.</span>
        </a>

        <div className="hidden lg:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs uppercase tracking-[0.16em] font-semibold text-ink/65 hover:text-electric transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden sm:flex items-center gap-3">
          <Link
            to="/auth?mode=login"
            className="text-xs uppercase tracking-[0.16em] font-semibold text-ink/70 hover:text-electric transition-colors"
          >
            Entrar
          </Link>
          <Button asChild variant="editorial" size="editorial" className="!py-3 !text-[10px] !bg-electric hover:!bg-hotpink">
            <Link to="/auth">Cadastre-se</Link>
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          className="sm:hidden inline-flex items-center justify-center size-10 rounded-full border border-ink/10 text-ink hover:bg-softgray transition-colors"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="sm:hidden mx-4 mt-3 rounded-2xl bg-paper border border-ink/10 shadow-soft p-5 flex flex-col gap-4 animate-fade-up">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-xs uppercase tracking-[0.16em] font-semibold text-ink/75"
            >
              {l.label}
            </a>
          ))}
          <div className="h-px bg-ink/10 my-1" />
          <Link
            to="/auth?mode=login"
            onClick={() => setOpen(false)}
            className="text-xs uppercase tracking-[0.16em] font-semibold text-ink/70"
          >
            Entrar
          </Link>
          <Button asChild variant="editorial" size="editorial" className="!py-3 !text-[10px] !bg-electric">
            <Link to="/auth" onClick={() => setOpen(false)}>Cadastre-se</Link>
          </Button>
        </div>
      )}
    </nav>
  );
};