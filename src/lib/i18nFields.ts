import type { Locale } from "@/src/i18n/translations";
import { safeText } from "@/src/lib/text";

/** Claves JSON en campos i18n del backend (public-menu). */
export type JsonLocaleKey = "es" | "en" | "pt";

/** Mapa string por idioma (country_i18n, region_i18n, etc.). */
export interface I18nStringMap {
  es?: string | null;
  en?: string | null;
  pt?: string | null;
}

/** Mapa array de strings por idioma (flavors_i18n, pairing_i18n). */
export interface I18nStringArrayMap {
  es?: string[] | null;
  en?: string[] | null;
  pt?: string[] | null;
}

const JSON_FALLBACK_ORDER: JsonLocaleKey[] = ["pt", "en", "es"];

/**
 * UI locale → clave JSON del backend.
 * pt-BR → pt
 */
export function toJsonLocaleKey(locale: Locale): JsonLocaleKey {
  if (locale === "pt-BR") return "pt";
  return locale;
}

function fallbackJsonKeys(locale: Locale): JsonLocaleKey[] {
  const primary = toJsonLocaleKey(locale);
  const rest = JSON_FALLBACK_ORDER.filter((k) => k !== primary);
  return [primary, ...rest];
}

function readI18nString(map: I18nStringMap | null | undefined, locale: Locale): string {
  if (!map || typeof map !== "object" || Array.isArray(map)) return "";
  for (const key of fallbackJsonKeys(locale)) {
    const val = map[key];
    if (typeof val === "string") {
      const trimmed = val.trim();
      if (trimmed) return trimmed;
    }
  }
  return "";
}

function readI18nStringArray(
  map: I18nStringArrayMap | null | undefined,
  locale: Locale
): string[] {
  if (!map || typeof map !== "object" || Array.isArray(map)) return [];
  for (const key of fallbackJsonKeys(locale)) {
    const val = map[key];
    if (!Array.isArray(val)) continue;
    const items = val
      .map((item) => safeText(item, ""))
      .filter(Boolean);
    if (items.length > 0) return items;
  }
  return [];
}

/**
 * Resuelve un campo i18n + legacy con fallback pt → en → es → legacy.
 * Nunca devuelve "[object Object]".
 */
export function resolveField(
  i18n: I18nStringMap | null | undefined,
  legacy: unknown,
  locale: Locale
): string {
  const fromI18n = readI18nString(i18n, locale);
  if (fromI18n) return fromI18n;
  return safeText(legacy, "");
}

/**
 * Resuelve listas i18n (flavors, pairings) con la misma cadena de fallback.
 */
export function resolveArrayField(
  i18n: I18nStringArrayMap | null | undefined,
  legacy: unknown,
  locale: Locale
): string[] {
  const fromI18n = readI18nStringArray(i18n, locale);
  if (fromI18n.length > 0) return fromI18n;

  if (Array.isArray(legacy)) {
    const items = legacy.map((item) => safeText(item, "")).filter(Boolean);
    if (items.length > 0) return items;
  }

  const legacyText = safeText(legacy, "");
  if (!legacyText) return [];
  return legacyText
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}
