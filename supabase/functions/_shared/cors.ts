/**
 * CORS headers for Edge Functions.
 * Allow GET/POST from any origin (configurable via ALLOW_ORIGIN env).
 */

const DEFAULT_ORIGIN = "*";

export function getCorsHeaders(req: Request): Record<string, string> {
  const allowOrigin = Deno.env.get("ALLOW_ORIGIN") ?? DEFAULT_ORIGIN;
  const origin = req.headers.get("Origin");
  const value = allowOrigin === "*" ? "*" : (origin && allowOrigin.includes(origin) ? origin : allowOrigin.split(",")[0] ?? "*");
  return {
    "Access-Control-Allow-Origin": value,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
  };
}

export function isPreflight(req: Request): boolean {
  return req.method === "OPTIONS";
}

export function corsResponse(req: Request): Response {
  return new Response(null, {
    status: 204,
    headers: getCorsHeaders(req),
  });
}
