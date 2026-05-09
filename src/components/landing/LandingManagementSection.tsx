const POINTS = [
  "Entradas y salidas con trazabilidad",
  "Ventas en contexto operativo",
  "Control de inventario alineado con la sala",
  "Gestión de staff y permisos",
  "Multi-sucursal con criterio unificado",
] as const;

export function LandingManagementSection() {
  return (
    <section className="border-b border-stone-200/80 bg-[#faf8f5] px-4 py-16 sm:py-20 dark:border-stone-800 dark:bg-[#141018]">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center font-serif text-2xl font-medium tracking-tight text-wine-950 dark:text-[#f5ebe3] sm:text-3xl">
          Gestión del restaurante, sin perder el pulso
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-[15px] leading-relaxed text-stone-600 dark:text-stone-400">
          Herramientas para quien lleva números, cava y equipo bajo una misma lógica.
        </p>
        <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-stone-200 bg-white/90 px-6 py-10 dark:border-stone-700 dark:bg-[#1c1419]/70 sm:px-10">
          <ul className="space-y-4">
            {POINTS.map((text) => (
              <li key={text} className="flex gap-4 text-[15px] leading-relaxed text-stone-700 dark:text-stone-300">
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-[#c9a962] to-wine-700"
                  aria-hidden
                />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
