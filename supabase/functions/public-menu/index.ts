// Supabase Edge Function: public-menu
// GET /functions/v1/public-menu?token=<qr_tokens.token>
// POST /functions/v1/public-menu with body { "token": "..." }
// Returns branch + wines for guest QR menu. Uses service role internally; never expose to client.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { getCorsHeaders, isPreflight, corsResponse } from "../_shared/cors.ts";
import { safeTokenPrefix } from "../_shared/safeLog.ts";

const GUEST_TYPE = "guest";

type ErrorCode =
  | "invalid_token"
  | "not_guest"
  | "token_expired"
  | "rate_limited"
  | "not_found"
  | "server_error";

function jsonResponse(body: object, status: number, cors: Record<string, string>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...cors,
    },
  });
}

async function getTokenFromRequest(req: Request): Promise<string | null> {
  const url = new URL(req.url);
  const fromQuery = url.searchParams.get("token");
  if (fromQuery?.trim()) return fromQuery.trim();
  if (req.method !== "POST") return null;
  try {
    const ct = req.headers.get("Content-Type") ?? "";
    if (!ct.includes("application/json")) return null;
    const body = (await req.json()) as { token?: unknown };
    const t = body?.token;
    return typeof t === "string" && t.trim() ? t.trim() : null;
  } catch {
    return null;
  }
}

Deno.serve(async (req: Request) => {
  const cors = getCorsHeaders(req);
  if (isPreflight(req)) return corsResponse(req);

  const token = await getTokenFromRequest(req);
  if (!token) {
    return jsonResponse({ error: "invalid_token" }, 400, cors);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) {
    console.error("public-menu: missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    return jsonResponse({ error: "server_error" }, 500, cors);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  try {
    const { data: qrRow, error: qrError } = await supabase
      .from("qr_tokens")
      .select("id, type, branch_id, expires_at, max_uses, current_uses")
      .eq("token", token)
      .maybeSingle();

    if (qrError) {
      console.error("public-menu: qr_tokens error", qrError.message, safeTokenPrefix(token));
      return jsonResponse({ error: "server_error" }, 500, cors);
    }

    if (!qrRow) {
      return jsonResponse({ error: "not_found" }, 404, cors);
    }

    if (qrRow.type !== GUEST_TYPE) {
      return jsonResponse({ error: "not_guest" }, 403, cors);
    }

    const now = new Date().toISOString();
    if (qrRow.expires_at && new Date(qrRow.expires_at) <= new Date(now)) {
      return jsonResponse({ error: "token_expired" }, 410, cors);
    }

    if (
      qrRow.max_uses != null &&
      qrRow.current_uses != null &&
      qrRow.current_uses >= qrRow.max_uses
    ) {
      return jsonResponse({ error: "token_expired" }, 410, cors);
    }

    const branchId = qrRow.branch_id;
    if (!branchId) {
      return jsonResponse({ error: "not_found" }, 404, cors);
    }

    const { data: branchRow, error: branchError } = await supabase
      .from("branches")
      .select("id, name, address, owner_id")
      .eq("id", branchId)
      .maybeSingle();

    if (branchError) {
      console.error("public-menu: branches error", branchError.message);
      return jsonResponse({ error: "server_error" }, 500, cors);
    }

    if (!branchRow) {
      return jsonResponse({ error: "not_found" }, 404, cors);
    }

    const ownerId = branchRow.owner_id;
    if (!ownerId) {
      return jsonResponse({ error: "not_found" }, 404, cors);
    }

    // Opcional: contar visitas. Para evitar race, usar RPC en DB:
    //   UPDATE qr_tokens SET current_uses = COALESCE(current_uses,0) + 1 WHERE token = $1
    // .rpc('increment_qr_guest_uses', { p_token: token })

    const { data: stockRows, error: stockError } = await supabase
      .from("wine_branch_stock")
      .select(
        `
        id,
        wine_id,
        branch_id,
        stock_quantity,
        price_by_glass,
        price_by_bottle,
        wines (
          id,
          name,
          winery,
          grape_variety,
          region,
          country,
          vintage,
          type,
          description,
          image_url,
          body_level,
          sweetness_level,
          acidity_level,
          intensity_level,
          fizziness_level
        )
      `
      )
      .eq("branch_id", branchId)
      .eq("wines.owner_id", ownerId)
      .gte("stock_quantity", 0);

    if (stockError) {
      console.error("public-menu: wine_branch_stock error", stockError.message);
      return jsonResponse({ error: "server_error" }, 500, cors);
    }

    const wines = (stockRows ?? []).map((row: {
      id: string;
      wine_id: string;
      stock_quantity: number;
      price_by_glass: number | null;
      price_by_bottle: number | null;
      wines: {
        id: string;
        name: string;
        winery: string | null;
        grape_variety: string | null;
        region: string | null;
        country: string | null;
        vintage: string | null;
        type: string;
        description: string | null;
        image_url: string | null;
        body_level: number | null;
        sweetness_level: number | null;
        acidity_level: number | null;
        intensity_level: number | null;
        fizziness_level: number | null;
      } | null;
    }) => {
      const w = row.wines;
      if (!w) {
        return {
          id: row.wine_id,
          name: "",
          winery: null,
          grape_variety: null,
          region: null,
          country: null,
          vintage: null,
          type: "other",
          description: null,
          image_url: null,
          body_level: null,
          sweetness_level: null,
          acidity_level: null,
          intensity_level: null,
          fizziness_level: null,
          stock_quantity: row.stock_quantity,
          price_by_glass: row.price_by_glass,
          price_by_bottle: row.price_by_bottle,
        };
      }
      return {
        id: w.id,
        name: w.name,
        winery: w.winery ?? null,
        grape_variety: w.grape_variety ?? null,
        region: w.region ?? null,
        country: w.country ?? null,
        vintage: w.vintage ?? null,
        type: w.type ?? "other",
        description: w.description ?? null,
        image_url: w.image_url ?? null,
        body_level: w.body_level ?? null,
        sweetness_level: w.sweetness_level ?? null,
        acidity_level: w.acidity_level ?? null,
        intensity_level: w.intensity_level ?? null,
        fizziness_level: w.fizziness_level ?? null,
        stock_quantity: row.stock_quantity,
        price_by_glass: row.price_by_glass ?? null,
        price_by_bottle: row.price_by_bottle ?? null,
      };
    });

    const branch = {
      id: branchRow.id,
      name: branchRow.name,
      address: branchRow.address ?? null,
    };

    return jsonResponse(
      {
        branch,
        wines,
      },
      200,
      cors
    );
  } catch (err) {
    console.error("public-menu: unexpected error", err);
    return jsonResponse({ error: "server_error" }, 500, cors);
  }
});
