export function LandingClientExperience() {
  return (
    <section className="border-b border-stone-200/80 bg-[#f3f0ea] px-4 py-16 sm:py-20 dark:border-stone-800 dark:bg-[#18121a]">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8b7355] dark:text-[#c9a962]/75">
              Experiencia en sala
            </p>
            <h2 className="mt-3 font-serif text-2xl font-medium tracking-tight text-wine-950 dark:text-[#faf6f0] sm:text-3xl">
              El comensal explora tu mundo en copa
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-stone-700 dark:text-stone-400">
              Desde la mesa, tus invitados recorren vinos y cocteles con una presentación sobria y
              legible: notas, origen y detalle cuando lo necesitan, sin ruido visual. La carta se
              siente actual y cuidada, acorde a un restaurante o wine bar que valora cada servicio.
            </p>
          </div>
          <div className="relative rounded-2xl border border-[#c9a962]/20 bg-gradient-to-br from-[#2a1f24] to-[#140e12] p-8 text-stone-300 dark:from-[#22181c] dark:to-[#0f0a0d]">
            <div className="absolute left-6 top-6 h-16 w-px bg-gradient-to-b from-[#c9a962]/50 to-transparent" />
            <blockquote className="pl-6 font-serif text-lg italic leading-snug text-[#e8dfd4] lg:text-xl">
              &ldquo;Claridad para elegir. Elegancia para disfrutar.&rdquo;
            </blockquote>
            <p className="mt-6 pl-6 text-xs uppercase tracking-[0.2em] text-[#c9a962]/60">
              Cellarium · menú digital
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
