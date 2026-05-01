import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const links = [
  { label: "Para Estudantes", href: "#estudantes" },
  { label: "Para Mentores", href: "#mentores" },
  { label: "Para Escolas", href: "#escolas" },
  { label: "Como Funciona", href: "#como-funciona" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

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
          ? "bg-paper/85 backdrop-blur-md border-b border-ink/5 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 flex items-center justify-between">
        <a href="#" className="font-display font-bold text-2xl tracking-tight text-ink">
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

        <div className="flex items-center gap-3">
          <Link
            to="/auth"
            className="hidden sm:inline-block text-xs uppercase tracking-[0.16em] font-semibold text-ink/70 hover:text-electric transition-colors"
          >
            Entrar
          </Link>
          <Button asChild variant="editorial" size="editorial" className="!py-3 !text-[10px] !bg-electric hover:!bg-hotpink">
            <Link to="/auth">Cadastre-se</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};