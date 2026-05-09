import Link from "next/link";

export function LandingSiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[#c9a962]/10 bg-[#0c0709] px-4 py-12 text-stone-500">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 sm:flex-row sm:justify-between sm:gap-4">
        <div className="text-center sm:text-left">
          <p className="text-sm font-medium text-stone-400">Cellarium</p>
          <p className="mt-1 text-xs text-stone-600">Catálogo digital para restaurantes · © {year}</p>
        </div>
        <nav
          className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-stone-500"
          aria-label="Pie de página"
        >
          <Link
            href="/privacy"
            className="transition hover:text-[#c9a962]"
          >
            Privacidad
          </Link>
          <Link href="/terms" className="transition hover:text-[#c9a962]">
            Términos
          </Link>
          <Link href="/support" className="transition hover:text-[#c9a962]">
            Soporte
          </Link>
          <Link href="/" className="transition hover:text-[#c9a962]">
            Inicio
          </Link>
        </nav>
      </div>
    </footer>
  );
}
