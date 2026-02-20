import { getErrorMessage } from "@/src/lib/menuApi";
import type { MenuApiErrorCode } from "@/src/types/menu";

interface ErrorStateProps {
  code: MenuApiErrorCode;
  onRetry?: () => void;
}

export function ErrorState({ code, onRetry }: ErrorStateProps) {
  const message = getErrorMessage(code);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-6 py-12 text-center">
      <div
        className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
        aria-hidden
      >
        <svg
          className="h-7 w-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
        No se pudo cargar el menú
      </h2>
      <p className="mt-2 max-w-sm text-gray-600 dark:text-gray-400">
        {message}
      </p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-6 rounded-lg bg-wine-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-wine-800 focus:outline-none focus:ring-2 focus:ring-wine-500 focus:ring-offset-2 dark:bg-wine-600 dark:hover:bg-wine-700"
        >
          Reintentar
        </button>
      )}
    </div>
  );
}
