import type { MenuResponse, Wine } from "@/src/types/menu";
import { TopBar } from "@/src/components/TopBar";
import { WineCard } from "@/src/components/WineCard";

const TYPE_ORDER: Record<string, number> = {
  red: 0,
  white: 1,
  rose: 2,
  sparkling: 3,
  other: 4,
};

const TYPE_LABELS: Record<string, string> = {
  red: "Tintos",
  white: "Blancos",
  rose: "Rosados",
  sparkling: "Espumosos",
  other: "Otros",
};

function groupWinesByType(wines: Wine[]): Map<string, Wine[]> {
  const map = new Map<string, Wine[]>();
  for (const wine of wines) {
    const key = (wine.type || "other").toLowerCase();
    const list = map.get(key) ?? [];
    list.push(wine);
    map.set(key, list);
  }
  const keys = Array.from(map.keys()).sort(
    (a, b) =>
      (TYPE_ORDER[a] ?? TYPE_ORDER.other) - (TYPE_ORDER[b] ?? TYPE_ORDER.other)
  );
  const ordered = new Map<string, Wine[]>();
  for (const k of keys) ordered.set(k, map.get(k)!);
  return ordered;
}

interface MenuViewProps {
  data: MenuResponse;
  encodedData: string;
}

export function MenuView({ data, encodedData }: MenuViewProps) {
  const groups = groupWinesByType(data.wines);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <TopBar branch={data.branch} encodedData={encodedData} />

      <main className="mx-auto max-w-2xl px-4 py-6 pb-24">
        {data.wines.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No hay vinos en el menú por ahora.
          </p>
        ) : (
          <div className="space-y-8">
            {Array.from(groups.entries()).map(([typeKey, wines]) => (
              <section key={typeKey}>
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  {TYPE_LABELS[typeKey] ?? typeKey}
                </h2>
                <ul className="space-y-3">
                  {wines.map((wine) => (
                    <li key={wine.id}>
                      <WineCard wine={wine} />
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
