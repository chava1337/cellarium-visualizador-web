"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import {
  translations,
  type Locale,
  type TranslationKey,
} from "@/src/i18n/translations";

const STORAGE_KEY = "cellarium-locale";

const LOCALES: Locale[] = ["es", "en", "pt-BR"];

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function isLocale(value: string | null): value is Locale {
  return value !== null && LOCALES.includes(value as Locale);
}

function getStoredLocale(): Locale {
  if (typeof window === "undefined") return "es";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (isLocale(stored)) return stored;
  return "es";
}

/** Fallback UI: pt-BR → en → es → key; en → es → key; es → key */
function translate(key: TranslationKey, locale: Locale): string {
  if (locale === "pt-BR") {
    return (
      translations["pt-BR"][key] ??
      translations.en[key] ??
      translations.es[key] ??
      key
    );
  }
  if (locale === "en") {
    return translations.en[key] ?? translations.es[key] ?? key;
  }
  return translations.es[key] ?? key;
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("es");

  useEffect(() => {
    setLocaleState(getStoredLocale());
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, next);
    }
  }, []);

  const t = useCallback(
    (key: TranslationKey) => translate(key, locale),
    [locale]
  );

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}
