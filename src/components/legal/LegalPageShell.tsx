import Link from "next/link";
import type { ReactNode } from "react";

type LegalPageShellProps = {
  title: string;
  lastUpdatedPlaceholder?: boolean;
  children: ReactNode;
};

/**
 * Contenedor común para páginas legales / soporte público.
 * No depende del flujo del menú ni de QR.
 */
export function LegalPageShell({
  title,
  lastUpdatedPlaceholder = true,
  children,
}: LegalPageShellProps) {
  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-900 dark:bg-[#0a0a0a] dark:text-gray-100">
      <header className="border-b border-gray-200/80 bg-white/90 backdrop-blur dark:border-gray-800 dark:bg-gray-950/90">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-4">
          <Link
            href="/"
            className="text-sm font-semibold tracking-tight text-wine-800 hover:text-wine-700 dark:text-wine-400 dark:hover:text-wine-300"
          >
            Cellarium
          </Link>
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-wine-700 dark:text-gray-400 dark:hover:text-wine-400"
          >
            Inicio
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-wine-700/90 dark:text-wine-500">
          Cellarium
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
          {title}
        </h1>
        {lastUpdatedPlaceholder ? (
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            <span className="rounded bg-amber-50 px-1.5 py-0.5 text-amber-900 dark:bg-amber-950/50 dark:text-amber-200">
              [Última actualización: pendiente de definir]
            </span>
          </p>
        ) : null}

        <div className="prose-legal mt-10 space-y-8 text-[15px] leading-relaxed text-gray-700 dark:text-gray-300">
          {children}
        </div>
      </main>

      <footer className="border-t border-gray-200/80 py-8 dark:border-gray-800">
        <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-x-6 gap-y-2 px-4 text-sm text-gray-500 dark:text-gray-400">
          <Link href="/privacy" className="hover:text-wine-800 dark:hover:text-wine-400">
            Privacidad
          </Link>
          <Link href="/terms" className="hover:text-wine-800 dark:hover:text-wine-400">
            Términos
          </Link>
          <Link href="/support" className="hover:text-wine-800 dark:hover:text-wine-400">
            Soporte
          </Link>
        </div>
        <p className="mt-4 text-center text-xs text-gray-400 dark:text-gray-500">
          © {new Date().getFullYear()} Cellarium
        </p>
      </footer>
    </div>
  );
}
