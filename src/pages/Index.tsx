import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { QuoteBanner } from "@/components/landing/QuoteBanner";
import { Pricing } from "@/components/landing/Pricing";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <main className="bg-paper text-ink min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <HowItWorks />
      <QuoteBanner />
      <Pricing />
      <footer className="bg-ink text-paper mt-10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-6 md:px-10 py-14 sm:py-16 grid gap-10 md:grid-cols-3">
          <div>
            <Link to="/" className="flex items-center gap-2 font-display font-bold text-2xl tracking-tight">
              <img
                src="/mentormatchmvp/logo.png"
                alt="MentorMatch"
                width={40}
                height={40}
                className="h-9 w-9"
              />
              <span>MentorMatch<span className="text-hotpink">.</span></span>
            </Link>
            <p className="mt-4 text-sm text-paper/65 leading-relaxed max-w-xs">
              Mentoria honesta entre quem viveu e quem está prestes a viver.
            </p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-electric mb-4">Navegar</p>
            <ul className="space-y-2 text-sm text-paper/75">
              <li><a href="#como-funciona" className="hover:text-paper transition-colors">Como funciona</a></li>
              <li><a href="#planos" className="hover:text-paper transition-colors">Planos</a></li>
              <li><Link to="/faq" className="hover:text-paper transition-colors">FAQ</Link></li>
              <li><Link to="/auth" className="hover:text-paper transition-colors">Entrar</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-hotpink mb-4">Contato</p>
            <ul className="space-y-2 text-sm text-paper/75">
              <li>contato@mentormatch.com</li>
              <li>Rio Grande do Sul, Brasil</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-paper/10">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-6 md:px-10 py-6 flex flex-col sm:flex-row justify-between gap-3 text-[11px] uppercase tracking-[0.2em] text-paper/50">
            <span>© 2026 MentorMatch · Todos os direitos reservados</span>
            <span>Protótipo educacional</span>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Index;
