import quoteImage from "@/assets/quote-banner.jpg";

export const QuoteBanner = () => {
  return (
    <section className="py-16 md:py-24 px-6 md:px-10">
      <div className="max-w-[1440px] mx-auto">
        <div className="relative w-full h-[55vh] min-h-[460px] rounded-[2rem] overflow-hidden bg-clay">
          <img
            src={quoteImage}
            alt="Estudantes universitários no campus"
            loading="lazy"
            width={1920}
            height={1024}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-ink/60 via-ink/30 to-transparent" />
          <div className="absolute bottom-10 left-8 md:bottom-14 md:left-14 max-w-3xl">
            <p className="font-serif text-3xl md:text-5xl text-paper leading-[1.05] text-balance drop-shadow-sm">
              "Foi como conversar com a irmã mais velha que eu não tenho — só que ela cursava exatamente Arquitetura na FAU."
            </p>
            <p className="text-paper/85 mt-6 text-xs font-medium tracking-[0.22em] uppercase">
              — Mariana T., 17 anos · São Paulo
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};