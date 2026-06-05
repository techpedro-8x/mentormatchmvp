import quoteImage from "@/assets/quote-banner.jpg";

export const QuoteBanner = () => {
  return (
    <section className="py-12 sm:py-16 md:py-24 px-5 sm:px-6 md:px-10">
      <div className="max-w-[1440px] mx-auto">
        <div className="relative w-full min-h-[380px] sm:min-h-[460px] h-[55vh] rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden bg-clay">
          <img
            src={quoteImage}
            alt="Estudantes universitários no campus"
            loading="lazy"
            width={1920}
            height={1024}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-ink/85 via-electric/40 to-hotpink/30" />
          <div className="absolute bottom-6 left-5 right-5 sm:bottom-10 sm:left-8 sm:right-8 md:bottom-14 md:left-14 md:right-auto max-w-3xl">
            <p className="font-display font-semibold text-[clamp(1.25rem,5.5vw,1.75rem)] sm:text-3xl md:text-5xl text-paper leading-[1.15] sm:leading-[1.05] tracking-[-0.03em] text-balance drop-shadow-sm">
              "Foi como conversar com a irmã mais velha que eu não tenho — só que ela cursava exatamente Arquitetura na FAU."
            </p>
            <p className="text-paper/90 mt-4 sm:mt-6 text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase">
              — Mariana T., 17 anos · São Paulo
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};