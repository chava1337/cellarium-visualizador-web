import { decodeQrData } from "@/src/lib/qrData";
import { fetchMenu, MenuApiErrorClass } from "@/src/lib/menuApi";
import { MenuView } from "@/src/components/MenuView";
import { ErrorState } from "@/src/components/ErrorState";
import { AdminInviteView } from "@/src/components/AdminInviteView";
import type { MenuApiErrorCode } from "@/src/types/menu";

const GUEST_TYPE = "guest";
const ADMIN_TYPES = ["admin", "admin_invite"];

function isAdminType(type: string): boolean {
  return ADMIN_TYPES.includes(type);
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

  const result = decodeQrData(dataParam);

  if (!result.ok) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <ErrorState code={result.error} />
      </div>
    );
  }

  const { payload } = result;
  const { type, token, encodedData, branchName } = payload;

  if (isAdminType(type)) {
    return (
      <AdminInviteView branchName={branchName} encodedData={encodedData} />
    );
  }

  if (type !== GUEST_TYPE) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <ErrorState code="invalid_qr" />
      </div>
    );
  }

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
