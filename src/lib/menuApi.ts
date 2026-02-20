import type {
  MenuResponse,
  MenuApiErrorCode,
  MenuApiError,
} from "@/src/types/menu";

const MENU_FETCH_TIMEOUT_MS = 10_000;

function safeTokenLog(token: string): string {
  if (!token || token.length < 6) return "[short]";
  return `${token.slice(0, 6)}…`;
}

/**
 * Obtiene el menú desde el backend (Supabase Edge Function public-menu).
 * GET ${NEXT_PUBLIC_MENU_API_URL}?token=${token}
 * - Timeout 10s.
 * - Caching con revalidate 30s (cuando se usa desde Server Component con fetch de Next).
 * - Envía Authorization y apikey con SUPABASE_ANON_KEY (solo servidor).
 */
export async function fetchMenu(token: string): Promise<MenuResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_MENU_API_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;

  if (!baseUrl) {
    throw new MenuApiErrorClass("server_error", 500);
  }
  if (!anonKey) {
    const err = new MenuApiErrorClass("server_error", 500);
    err.message = "SUPABASE_ANON_KEY is not set";
    throw err;
  }

  const url = `${baseUrl.replace(/\/$/, "")}?token=${encodeURIComponent(token)}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), MENU_FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      method: "GET",
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${anonKey}`,
        apikey: anonKey,
      },
      next: { revalidate: 30 },
    });
    clearTimeout(timeoutId);

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      const code = (data as MenuApiError).error as MenuApiErrorCode | undefined;
      const message = code ?? "server_error";
      throw new MenuApiErrorClass(message, res.status);
    }

    return data as MenuResponse;
  } catch (err) {
    clearTimeout(timeoutId);
    if (err instanceof MenuApiErrorClass) throw err;
    if (err instanceof Error) {
      if (err.name === "AbortError") {
        throw new MenuApiErrorClass("timeout", 408);
      }
      throw new MenuApiErrorClass("network_error", 0);
    }
    throw new MenuApiErrorClass("server_error", 500);
  }
}

export class MenuApiErrorClass extends Error {
  constructor(
    public readonly code: MenuApiErrorCode,
    public readonly status: number
  ) {
    super(code);
    this.name = "MenuApiError";
  }
}

/**
 * Mensaje amigable para el usuario según código de error.
 */
export function getErrorMessage(code: MenuApiErrorCode): string {
  switch (code) {
    case "invalid_token":
      return "El enlace del menú no es válido.";
    case "not_guest":
      return "Este QR no es para comensales.";
    case "token_expired":
      return "Este enlace ha caducado.";
    case "not_found":
      return "No encontramos este menú.";
    case "rate_limited":
      return "Demasiadas solicitudes. Intenta en un momento.";
    case "server_error":
      return "Error en el servidor. Intenta más tarde.";
    case "network_error":
      return "No hay conexión. Revisa tu red e intenta de nuevo.";
    case "timeout":
      return "La solicitud tardó demasiado. Intenta de nuevo.";
    case "invalid_qr":
      return "QR no es para comensales o es inválido.";
    default:
      return "Algo salió mal. Intenta de nuevo.";
  }
}
