/**
 * Helpers para normalizar valores a string en UI.
 * Nunca devuelven "[object Object]", "undefined" ni "null".
 */

function clean(result: string, fallback: string): string {
  if (!result) return fallback;
  if (
    result === "undefined" ||
    result === "null" ||
    result === "[object Object]" ||
    result.includes("[object Object]")
  )
    return fallback;
  return result;
}

export function safeText(v: unknown, fallback = ""): string {
  if (v === null || v === undefined) return fallback;
  if (typeof v === "string") return clean(v.trim(), fallback);
  if (typeof v === "number" || typeof v === "boolean")
    return clean(String(v), fallback);
  if (Array.isArray(v)) {
    const joined = v.map((x) => safeText(x, "")).filter(Boolean).join(", ");
    return clean(joined, fallback) || fallback;
  }
  if (typeof v === "object") {
    const o = v as Record<string, unknown>;
    const candidates = ["name", "label", "title", "es", "en", "value"];
    for (const key of candidates) {
      const val = o[key];
      if (typeof val === "string") {
        const s = val.trim();
        if (s) return clean(s, fallback);
      }
    }
    return fallback;
  }
  return clean(String(v), fallback);
}

export function safeJoin(parts: unknown[], sep: string): string {
  return parts
    .map((p) => safeText(p, ""))
    .filter(Boolean)
    .join(sep);
}
