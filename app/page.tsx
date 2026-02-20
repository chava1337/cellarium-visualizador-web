import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 dark:bg-gray-900">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Menú de vinos
      </h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        Escanea el código QR del establecimiento para ver el menú.
      </p>
      <p className="mt-4 text-sm text-gray-500 dark:text-gray-500">
        Si tienes un enlace directo:{" "}
        <Link
          href="/qr"
          className="text-wine-600 hover:underline dark:text-wine-400"
        >
          /qr?data=...
        </Link>{" "}
        o{" "}
        <Link
          href="/menu/tu-token"
          className="text-wine-600 hover:underline dark:text-wine-400"
        >
          /menu/[token]
        </Link>
      </p>
    </div>
  );
}
