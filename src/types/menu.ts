/**
 * Tipos para el contrato del Menu API (backend).
 * GET ${MENU_API_URL}?token=<token>
 */

export interface Branch {
  id: string;
  name: string;
  address: string | null;
}

export type WineType = "red" | "white" | "rose" | "sparkling" | "other";

export interface Wine {
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
  stock_quantity: number;
  price_by_glass: number | null;
  price_by_bottle: number | null;
}

export interface MenuResponse {
  branch: Branch;
  wines: Wine[];
}

export type MenuApiErrorCode =
  | "invalid_token"
  | "not_guest"
  | "token_expired"
  | "not_found"
  | "rate_limited"
  | "server_error"
  | "network_error"
  | "timeout"
  | "invalid_qr";

export interface MenuApiError {
  error: MenuApiErrorCode;
}

/**
 * Payload decodificado del query ?data= (QR actual).
 */
export interface QrDataPayload {
  type: string;
  token: string;
  branchId?: string;
  branchName?: string;
}
