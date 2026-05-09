import Image from "next/image";
import { LandingHeroCarousel } from "@/src/components/landing/LandingHeroCarousel";
import { LandingStoreButtons } from "@/src/components/landing/LandingStoreButtons";

type LandingHeroProps = {
  androidUrl: string;
  iosUrl: string;
};

export function LandingHero({ androidUrl, iosUrl }: LandingHeroProps) {
  return (
    <section className="relative overflow-x-hidden border-b border-[#c9a962]/10 bg-gradient-to-b from-[#140c10] via-[#1a1115] to-[#120a0d] px-4 pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20">
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
        <div className="flex flex-col items-center">
          <Image
            src="/landing/branding/cellarium-logo.png"
            alt="Cellarium"
            width={200}
            height={52}
            className="h-9 w-auto object-contain opacity-[0.97] sm:h-10 md:h-11"
            priority
          />
          <p className="mt-2.5 text-[10px] font-semibold uppercase tracking-[0.42em] text-[#c9a962]/82 sm:text-[11px] sm:tracking-[0.38em]">
            CELLARIUM
          </p>
        </div>

        <h1 className="mt-10 max-w-3xl font-serif text-[1.75rem] font-medium leading-[1.18] tracking-tight text-[#faf6f0] sm:text-4xl lg:mt-12 lg:text-[2.65rem] lg:leading-[1.14]">
          Moderniza la experiencia de tu restaurante
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-stone-400 sm:text-lg">
          Cellarium es el catálogo digital premium para vinos y cocteles, diseñado para restaurantes,
          wine bars y sommeliers.
        </p>

        <LandingStoreButtons
          androidUrl={androidUrl}
          iosUrl={iosUrl}
          primaryPlay
          className="mt-9 justify-center"
        />

        <div className="mt-14 w-full min-w-0 max-w-full sm:mt-16 lg:mt-[4.25rem]">
          <LandingHeroCarousel />
        </div>
      </div>
    </section>
  );
}
