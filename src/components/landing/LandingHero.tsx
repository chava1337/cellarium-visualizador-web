import { LandingHeroCarousel } from "@/src/components/landing/LandingHeroCarousel";
import { LandingStoreButtons } from "@/src/components/landing/LandingStoreButtons";

type LandingHeroProps = {
  androidUrl: string;
  iosUrl: string;
};

export function LandingHero({ androidUrl, iosUrl }: LandingHeroProps) {
  return (
    <section className="relative overflow-x-hidden border-b border-[#c9a962]/10 bg-gradient-to-b from-[#140c10] via-[#1a1115] to-[#120a0d] px-4 pb-12 pt-8 sm:pb-16 sm:pt-10 lg:pb-20 lg:pt-12">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `radial-gradient(ellipse 80% 45% at 50% -15%, rgba(201, 169, 98, 0.2), transparent),
            radial-gradient(ellipse 55% 50% at 85% 40%, rgba(118, 66, 66, 0.1), transparent),
            radial-gradient(ellipse 50% 55% at 15% 75%, rgba(80, 40, 48, 0.14), transparent)`,
        }}
        aria-hidden
      />

      <div className="relative mx-auto flex w-full max-w-5xl min-w-0 flex-col items-center text-center">
        <h1 className="max-w-3xl font-serif text-[1.75rem] font-medium leading-[1.18] tracking-tight text-[#faf6f0] sm:text-4xl lg:text-[2.65rem] lg:leading-[1.14]">
          Moderniza la experiencia de tu restaurante
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-stone-400 sm:mt-4 sm:text-lg">
          Cellarium es el catálogo digital premium para vinos y cocteles, diseñado para restaurantes,
          wine bars y sommeliers.
        </p>

        <LandingStoreButtons
          androidUrl={androidUrl}
          iosUrl={iosUrl}
          primaryPlay
          className="mt-6 justify-center sm:mt-7"
        />

        <div className="mt-8 w-full min-w-0 max-w-full sm:mt-10 lg:mt-11">
          <LandingHeroCarousel />
        </div>
      </div>
    </section>
  );
}
