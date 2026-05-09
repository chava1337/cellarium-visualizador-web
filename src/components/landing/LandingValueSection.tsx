const ITEMS = [
  {
    title: "Catálogo QR en tiempo real",
    body: "Actualiza precios y disponibilidad: lo que editas en la app se refleja al instante para quien escanea tu QR.",
  },
  {
    title: "Presentación elegante para clientes",
    body: "Una lectura clara de vinos y cocteles, pensada para la mesa y para quien quiere descubrir tu oferta con calma.",
  },
  {
    title: "Inventario de vinos",
    body: "Centraliza existencias y evita prometer lo que no tienes en sala. Menos fricción entre barra, cava y servicio.",
  },
  {
    title: "Staff y sucursales",
    body: "Estructura equipos y locales con criterio: misma herramienta, operación coherente en cada sede.",
  },
] as const;

export function LandingValueSection() {
  return (
    <section className="border-b border-stone-200/80 bg-[#faf8f5] px-4 py-16 sm:py-20 dark:border-stone-800 dark:bg-[#141018]">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center font-serif text-2xl font-medium tracking-tight text-wine-950 dark:text-[#f5ebe3] sm:text-3xl">
          Todo lo esencial, con estándar alto
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-[15px] leading-relaxed text-stone-600 dark:text-stone-400">
          Cellarium conecta tu operación diaria con una carta que tus comensales exploran con gusto.
        </p>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:gap-6">
          {ITEMS.map(({ title, body }) => (
            <li
              key={title}
              className="group rounded-2xl border border-stone-200/90 bg-white/80 p-6 shadow-sm transition hover:border-[#c9a962]/35 hover:shadow-md dark:border-stone-700/80 dark:bg-[#1c1419]/80 dark:hover:border-[#c9a962]/25"
            >
              <div className="mb-3 h-px w-12 bg-gradient-to-r from-[#b8860b] to-[#c9a962]/60" />
              <h3 className="text-lg font-semibold text-wine-950 dark:text-[#f0e6dc]">{title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-stone-600 dark:text-stone-400">
                {body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
