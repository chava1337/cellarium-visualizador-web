import type { QrDataPayload } from "@/src/types/menu";
import { fetchMenu, MenuApiErrorClass } from "@/src/lib/menuApi";
import { MenuView } from "@/src/components/MenuView";
import { ErrorState } from "@/src/components/ErrorState";
import type { MenuApiErrorCode } from "@/src/types/menu";

const GUEST_TYPE = "guest";

function parseQrData(dataParam: string | undefined): {
  token: string;
  encodedData: string;
} | { error: MenuApiErrorCode } {
  if (!dataParam || typeof dataParam !== "string") {
    return { error: "invalid_qr" };
  }

  let payload: unknown;
  try {
    payload = JSON.parse(decodeURIComponent(dataParam)) as unknown;
  } catch {
    return { error: "invalid_qr" };
  }

  if (!payload || typeof payload !== "object" || !("token" in payload)) {
    return { error: "invalid_qr" };
  }

  const { type, token } = payload as QrDataPayload;
  if (type !== GUEST_TYPE) {
    return { error: "invalid_qr" };
  }
  if (typeof token !== "string" || !token.trim()) {
    return { error: "invalid_qr" };
  }

  return { token: token.trim(), encodedData: dataParam };
}

type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function QrPage({ searchParams }: PageProps) {
  const dataParam =
    typeof searchParams?.data === "string"
      ? searchParams.data
      : Array.isArray(searchParams?.data)
        ? searchParams.data[0]
        : undefined;

  const parsed = parseQrData(dataParam);

  if ("error" in parsed) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <ErrorState code={parsed.error} />
      </div>
    );
  }

  const { token, encodedData } = parsed;

  try {
    const menuData = await fetchMenu(token);
    return <MenuView data={menuData} encodedData={encodedData} />;
  } catch (err) {
    const code: MenuApiErrorCode =
      err instanceof MenuApiErrorClass ? err.code : "server_error";
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <ErrorState code={code} />
      </div>
    );
  }
}
