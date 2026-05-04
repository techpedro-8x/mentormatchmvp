import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Roles } from "@/components/landing/Roles";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { QuoteBanner } from "@/components/landing/QuoteBanner";
import { Pricing } from "@/components/landing/Pricing";
import { CTASection } from "@/components/landing/CTASection";

const Index = () => {
  return (
    <main className="bg-paper text-ink min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <Roles />
      <HowItWorks />
      <QuoteBanner />
      <Pricing />
      <CTASection />
      <footer className="px-5 sm:px-6 md:px-10 py-8 sm:py-10 border-t border-ink/8 text-[11px] sm:text-xs uppercase tracking-[0.2em] text-ink/50 flex flex-col md:flex-row justify-between gap-4 max-w-[1440px] mx-auto">
        <span>MentorMatch — Protótipo 2026 · Todos os direitos reservados</span>
        <span className="font-serif normal-case tracking-normal text-sm italic text-ink/60">
          Mentoria honesta entre quem viveu e quem está prestes a viver.
        </span>
      </footer>
    </main>
  );
};

export default Index;
