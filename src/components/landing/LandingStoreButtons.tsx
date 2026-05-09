type LandingStoreButtonsProps = {
  androidUrl: string;
  iosUrl: string;
  /** true = Play destacado (estilo primario), App secundario */
  primaryPlay: boolean;
  className?: string;
};

export function LandingStoreButtons({
  androidUrl,
  iosUrl,
  primaryPlay,
  className = "",
}: LandingStoreButtonsProps) {
  const playPrimary =
    "inline-flex w-full min-h-[48px] items-center justify-center rounded-lg border border-[#c9a962]/50 bg-gradient-to-b from-[#b8860b]/20 to-[#8b6914]/15 px-6 py-3 text-center text-sm font-semibold tracking-wide text-[#f5e6c8] shadow-[0_0_0_1px_rgba(201,169,98,0.15)] transition hover:border-[#c9a962]/80 hover:from-[#b8860b]/30 sm:w-auto";
  const playSecondary =
    "inline-flex w-full min-h-[48px] items-center justify-center rounded-lg border border-white/15 bg-white/[0.06] px-6 py-3 text-center text-sm font-medium tracking-wide text-stone-200 transition hover:border-[#c9a962]/35 hover:bg-white/[0.1] sm:w-auto";
  const appPrimary =
    "inline-flex w-full min-h-[48px] items-center justify-center rounded-lg border border-[#c9a962]/50 bg-gradient-to-b from-[#b8860b]/20 to-[#8b6914]/15 px-6 py-3 text-center text-sm font-semibold tracking-wide text-[#f5e6c8] shadow-[0_0_0_1px_rgba(201,169,98,0.15)] transition hover:border-[#c9a962]/80 hover:from-[#b8860b]/30 sm:w-auto";
  const appSecondary =
    "inline-flex w-full min-h-[48px] items-center justify-center rounded-lg border border-white/15 bg-white/[0.06] px-6 py-3 text-center text-sm font-medium tracking-wide text-stone-200 transition hover:border-[#c9a962]/35 hover:bg-white/[0.1] sm:w-auto";

  return (
    <div
      className={`flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center ${className}`}
    >
      <a
        href={androidUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={primaryPlay ? playPrimary : playSecondary}
      >
        Descargar en Google Play
      </a>
      <a
        href={iosUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={primaryPlay ? appSecondary : appPrimary}
      >
        Descargar en App Store
      </a>
    </div>
  );
}
