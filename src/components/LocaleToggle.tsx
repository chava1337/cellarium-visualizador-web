"use client";

import { useLocale } from "@/src/i18n/LocaleContext";
import type { Locale } from "@/src/i18n/translations";

const TOGGLE_LOCALES: { id: Locale; label: string; ariaLabel: string }[] = [
  { id: "es", label: "ES", ariaLabel: "Español" },
  { id: "en", label: "EN", ariaLabel: "English" },
  { id: "pt-BR", label: "PT", ariaLabel: "Português (Brasil)" },
];

export function LocaleToggle() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="flex rounded-full border border-gray-200 bg-gray-100 p-0.5 dark:border-gray-600 dark:bg-gray-700">
      {TOGGLE_LOCALES.map(({ id, label, ariaLabel }) => (
        <button
          key={id}
          type="button"
          onClick={() => setLocale(id)}
          className={`rounded-full px-2 py-1 text-xs font-medium transition-colors sm:px-2.5 ${
            locale === id
              ? "bg-white text-gray-900 shadow-sm dark:bg-gray-800 dark:text-white"
              : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          }`}
          aria-label={ariaLabel}
          aria-pressed={locale === id}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
