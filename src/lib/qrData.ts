/**
 * Decodifica el payload ?data= del QR.
 * ENCODED = encodeURIComponent(JSON.stringify({ type, token, branchId?, branchName? }))
 */

export type QrPayload = {
  type: string;
  token: string;
  branchId?: string;
  branchName?: string;
  encodedData: string;
};

export type DecodeQrDataError = "invalid_qr";

export type DecodeQrDataResult =
  | { ok: true; payload: QrPayload }
  | { ok: false; error: DecodeQrDataError };

/**
 * Lee ?data=, decodifica y valida. Mínimo: { type, token }.
 */
export function decodeQrData(dataParam: string | undefined): DecodeQrDataResult {
  if (!dataParam || typeof dataParam !== "string") {
    return { ok: false, error: "invalid_qr" };
  }

  let raw: unknown;
  try {
    raw = JSON.parse(decodeURIComponent(dataParam));
  } catch {
    return { ok: false, error: "invalid_qr" };
  }

  if (!raw || typeof raw !== "object" || !("type" in raw) || !("token" in raw)) {
    return { ok: false, error: "invalid_qr" };
  }

  const obj = raw as Record<string, unknown>;
  const type = obj.type;
  const token = obj.token;

  if (typeof type !== "string" || typeof token !== "string" || !token.trim()) {
    return { ok: false, error: "invalid_qr" };
  }

  const branchId = typeof obj.branchId === "string" ? obj.branchId : undefined;
  const branchName = typeof obj.branchName === "string" ? obj.branchName : undefined;

  return {
    ok: true,
    payload: {
      type,
      token: token.trim(),
      branchId,
      branchName,
      encodedData: dataParam,
    },
  };
}
