"use client";

import { useLocale } from "@/src/i18n/LocaleContext";

export function LocaleToggle() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="flex rounded-full border border-gray-200 bg-gray-100 p-0.5 dark:border-gray-600 dark:bg-gray-700">
      {(["es", "en"] as const).map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => setLocale(loc)}
          className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
            locale === loc
              ? "bg-white text-gray-900 shadow-sm dark:bg-gray-800 dark:text-white"
              : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          }`}
          aria-label={loc === "es" ? "Español" : "English"}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
