import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <div className="mx-auto max-w-2xl px-4 py-12 sm:py-16 sm:pb-20">
        <header className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-wine-700 dark:text-wine-500">
            Cellarium
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Cellarium
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-gray-600 dark:text-gray-300">
            Gestión inteligente de cartas de vino y coctelería para restaurantes
          </p>
        </header>

        <section className="mt-12 space-y-4 text-center sm:mt-14">
          <p className="text-[15px] leading-relaxed text-gray-700 dark:text-gray-300">
            Cellarium es una plataforma pensada para equipos de sala y gerencia: centraliza la
            carta de vinos y coctelería, alinea precios e inventario entre sucursales y ofrece a
            tus clientes un menú digital claro y actualizado, accesible desde el móvil sin fricción.
          </p>
          <p className="text-[15px] leading-relaxed text-gray-700 dark:text-gray-300">
            Reduce errores en servicio, gana tiempo en el piso y toma decisiones con información
            unificada en un solo lugar.
          </p>
        </section>

        <section className="mt-12 sm:mt-14">
          <h2 className="text-center text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Qué incluye
          </h2>
          <ul className="mt-6 space-y-3 text-left text-[15px] leading-relaxed text-gray-800 dark:text-gray-200">
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-wine-600 dark:bg-wine-500" aria-hidden />
              <span>Gestión de vinos y cócteles</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-wine-600 dark:bg-wine-500" aria-hidden />
              <span>Menú digital con QR</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-wine-600 dark:bg-wine-500" aria-hidden />
              <span>Control de inventario por sucursal</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-wine-600 dark:bg-wine-500" aria-hidden />
              <span>Gestión de personal</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-wine-600 dark:bg-wine-500" aria-hidden />
              <span>Análisis y métricas</span>
            </li>
          </ul>
        </section>

        <section className="mt-12 rounded-2xl border border-gray-200/80 bg-white/80 px-5 py-8 shadow-sm dark:border-gray-800 dark:bg-gray-950/50 sm:mt-14">
          <h2 className="text-center text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Cómo funciona
          </h2>
          <ol className="mt-6 space-y-5 text-left">
            <li className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-wine-100 text-sm font-semibold text-wine-800 dark:bg-wine-950/60 dark:text-wine-300">
                1
              </span>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Configura tu carta</p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Carga productos, precios y disponibilidad según tu operación.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-wine-100 text-sm font-semibold text-wine-800 dark:bg-wine-950/60 dark:text-wine-300">
                2
              </span>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Comparte tu QR</p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Tus comensales acceden al menú digital desde su dispositivo.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-wine-100 text-sm font-semibold text-wine-800 dark:bg-wine-950/60 dark:text-wine-300">
                3
              </span>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Tus clientes visualizan el menú
                </p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Experiencia clara y coherente con la carta que definiste en Cellarium.
                </p>
              </div>
            </li>
          </ol>
        </section>

        <footer className="mt-14 border-t border-gray-200/90 pt-10 text-center dark:border-gray-800">
          <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
            Cellarium © 2026
          </p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Solución digital para restaurantes
          </p>
          <nav
            className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-500 dark:text-gray-400"
            aria-label="Información legal"
          >
            <Link
              href="/privacy"
              className="hover:text-wine-800 dark:hover:text-wine-400"
            >
              Privacidad
            </Link>
            <Link href="/terms" className="hover:text-wine-800 dark:hover:text-wine-400">
              Términos
            </Link>
            <Link href="/support" className="hover:text-wine-800 dark:hover:text-wine-400">
              Soporte
            </Link>
          </nav>
        </footer>
      </div>
    </div>
  );
}
