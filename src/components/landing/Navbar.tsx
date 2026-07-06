import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const anchorLinks: { label: string; anchor: string }[] = [
  { label: "Como Funciona", anchor: "como-funciona" },
  { label: "Planos", anchor: "planos" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Quando a rota muda para "/" com um hash pendente, faz o scroll
  useEffect(() => {
    if (location.pathname === "/" && location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 80);
      }
    }
  }, [location]);

  const handleAnchor = (anchor: string) => {
    setOpen(false);
    if (location.pathname === "/") {
      // Já está na home, só faz scroll
      const el = document.getElementById(anchor);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      // Navega para a home com o hash
      navigate(`/#${anchor}`);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-paper/85 backdrop-blur-md border-b border-ink/5 py-3 md:py-4"
          : "bg-transparent py-4 md:py-6"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-6 md:px-10 flex items-center justify-between gap-4">
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

        <div className="hidden lg:flex items-center gap-10">
          {anchorLinks.map((l) => (
            <button
              key={l.anchor}
              onClick={() => handleAnchor(l.anchor)}
              className="text-xs uppercase tracking-[0.16em] font-semibold text-ink/65 hover:text-electric transition-colors"
            >
              {l.label}
            </button>
          ))}
          <Link
            to="/faq"
            className="text-xs uppercase tracking-[0.16em] font-semibold text-ink/65 hover:text-electric transition-colors"
          >
            FAQ
          </Link>
        </div>

        <div className="hidden lg:flex items-center gap-3">
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
          className="lg:hidden inline-flex items-center justify-center size-10 rounded-full border border-ink/10 text-ink hover:bg-softgray transition-colors"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden mx-4 mt-3 rounded-2xl bg-paper border border-ink/10 shadow-soft p-5 flex flex-col gap-4 animate-fade-up">
          {anchorLinks.map((l) => (
            <button
              key={l.anchor}
              onClick={() => handleAnchor(l.anchor)}
              className="text-left text-xs uppercase tracking-[0.16em] font-semibold text-ink/75"
            >
              {l.label}
            </button>
          ))}
          <Link
            to="/faq"
            onClick={() => setOpen(false)}
            className="text-xs uppercase tracking-[0.16em] font-semibold text-ink/75"
          >
            FAQ
          </Link>
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