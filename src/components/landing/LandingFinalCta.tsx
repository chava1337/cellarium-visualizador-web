import { LandingStoreButtons } from "@/src/components/landing/LandingStoreButtons";

type LandingFinalCtaProps = {
  androidUrl: string;
  iosUrl: string;
};

export function LandingFinalCta({ androidUrl, iosUrl }: LandingFinalCtaProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#1a1115] to-[#0e080b] px-4 py-16 sm:py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 100% 80% at 50% 100%, rgba(201, 169, 98, 0.12), transparent)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-3xl text-center">
        <h2 className="font-serif text-2xl font-medium tracking-tight text-[#faf6f0] sm:text-3xl">
          Da la experiencia Cellarium
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-stone-400 sm:text-base">
          Empieza con una prueba gratis y lleva tu carta de vinos y cocteles a otro nivel.
        </p>
        <LandingStoreButtons
          androidUrl={androidUrl}
          iosUrl={iosUrl}
          primaryPlay
          className="mt-10 justify-center"
        />
      </div>
    </section>
  );
}
