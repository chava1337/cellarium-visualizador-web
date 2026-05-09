import { LandingHeroCarousel } from "@/src/components/landing/LandingHeroCarousel";
import { LandingStoreButtons } from "@/src/components/landing/LandingStoreButtons";

type LandingHeroProps = {
  androidUrl: string;
  iosUrl: string;
};

export function LandingHero({ androidUrl, iosUrl }: LandingHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-[#c9a962]/10 bg-gradient-to-b from-[#140c10] via-[#1a1115] to-[#120a0d] px-4 pb-16 pt-14 sm:pb-20 sm:pt-20 lg:pb-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `radial-gradient(ellipse 80% 50% at 50% -20%, rgba(201, 169, 98, 0.18), transparent),
            radial-gradient(ellipse 60% 40% at 100% 50%, rgba(118, 66, 66, 0.12), transparent),
            radial-gradient(ellipse 50% 60% at 0% 80%, rgba(80, 40, 48, 0.15), transparent)`,
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.35em] text-[#c9a962]/85 sm:text-left">
          Cellarium
        </p>
        <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <div className="text-center sm:text-left">
            <h1 className="font-serif text-[1.75rem] font-medium leading-[1.15] tracking-tight text-[#faf6f0] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
              Moderniza la experiencia de tu restaurante
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-stone-400 sm:mx-0 sm:text-lg lg:max-w-[30rem]">
              Cellarium es el catálogo digital premium para vinos y cocteles, diseñado para
              restaurantes, wine bars y sommeliers.
            </p>
            <LandingStoreButtons
              androidUrl={androidUrl}
              iosUrl={iosUrl}
              primaryPlay
              className="mt-9 justify-center sm:justify-start"
            />
          </div>
          <div className="flex min-w-0 justify-center lg:justify-end">
            <LandingHeroCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}
