import type { Wine } from "@/src/types/menu";

interface WineCardProps {
  wine: Wine;
}

function formatPrice(value: number | null): string {
  if (value == null) return "—";
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

function formatStock(stock: number): "available" | "out" {
  return stock > 0 ? "available" : "out";
}

export function WineCard({ wine }: WineCardProps) {
  const stockStatus = formatStock(wine.stock_quantity);
  const regionCountry = [wine.region, wine.country].filter(Boolean).join(", ");

  return (
    <article
      className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
      data-wine-id={wine.id}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {wine.name}
          </h3>
          <span
            className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
              stockStatus === "available"
                ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300"
                : "bg-gray-200 text-gray-600 dark:bg-gray-600 dark:text-gray-400"
            }`}
          >
            {stockStatus === "available" ? "Disponible" : "Agotado"}
          </span>
        </div>

        {(wine.winery || regionCountry) && (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {[wine.winery, regionCountry].filter(Boolean).join(" · ")}
          </p>
        )}

        {(wine.vintage || wine.grape_variety) && (
          <p className="text-xs text-gray-500 dark:text-gray-500">
            {[wine.vintage, wine.grape_variety].filter(Boolean).join(" · ")}
          </p>
        )}

        {wine.description && (
          <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
            {wine.description}
          </p>
        )}

        <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
          {wine.price_by_glass != null && (
            <span className="text-gray-700 dark:text-gray-300">
              Copa: {formatPrice(wine.price_by_glass)}
            </span>
          )}
          {wine.price_by_bottle != null && (
            <span className="text-gray-700 dark:text-gray-300">
              Botella: {formatPrice(wine.price_by_bottle)}
            </span>
          )}
          {wine.price_by_glass == null && wine.price_by_bottle == null && (
            <span className="text-gray-500">—</span>
          )}
        </div>
      </div>
    </article>
  );
}
