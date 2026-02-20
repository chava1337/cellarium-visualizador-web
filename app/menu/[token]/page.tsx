import { fetchMenu, MenuApiErrorClass } from "@/src/lib/menuApi";
import { MenuView } from "@/src/components/MenuView";
import { ErrorState } from "@/src/components/ErrorState";
import type { MenuApiErrorCode } from "@/src/types/menu";

type PageProps = { params: { token: string } };

export default async function MenuTokenPage({ params }: PageProps) {
  const token = typeof params?.token === "string" ? params.token : undefined;

  if (!token?.trim()) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <ErrorState code="invalid_token" />
      </div>
    );
  }

  try {
    const menuData = await fetchMenu(token.trim());
    const encodedData = encodeURIComponent(
      JSON.stringify({
        type: "guest",
        token: token.trim(),
      })
    );
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
