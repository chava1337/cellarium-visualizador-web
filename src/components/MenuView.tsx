"use client";

import { useState, useMemo } from "react";
import type { MenuResponse, Wine } from "@/src/types/menu";
import { TopBar } from "@/src/components/TopBar";
import { WineCard } from "@/src/components/WineCard";
import { useLocale } from "@/src/i18n/LocaleContext";
import type { TranslationKeys } from "@/src/i18n/translations";

const TYPE_ORDER: Record<string, number> = {
  red: 0,
  white: 1,
  rose: 2,
  sparkling: 3,
  other: 4,
};

const TYPE_SECTION_KEYS: Record<string, keyof TranslationKeys> = {
  red: "section.red",
  white: "section.white",
  rose: "section.rose",
  sparkling: "section.sparkling",
  other: "section.other",
};

type FilterKey = "all" | "red" | "white" | "sparkling" | "glass" | "bottle";

const FILTER_KEYS: { key: FilterKey; labelKey: keyof TranslationKeys }[] = [
  { key: "all", labelKey: "filters.all" },
  { key: "red", labelKey: "filters.red" },
  { key: "white", labelKey: "filters.white" },
  { key: "sparkling", labelKey: "filters.sparkling" },
  { key: "glass", labelKey: "filters.glass" },
  { key: "bottle", labelKey: "filters.bottle" },
];

function toText(v: unknown): string {
  if (typeof v === "string") return v;
  const o = v as { name?: string; es?: string; en?: string };
  return o?.name ?? o?.es ?? o?.en ?? (v != null ? String(v) : "");
}

function groupWinesByType(wines: Wine[]): Map<string, Wine[]> {
  const map = new Map<string, Wine[]>();
  for (const wine of wines) {
    const key = toText(wine.type).toLowerCase() || "other";
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

function matchesSearch(wine: Wine, q: string): boolean {
  if (!q.trim()) return true;
  const lower = q.trim().toLowerCase();
  const fields = [
    toText(wine.name),
    toText(wine.winery),
    toText(wine.grape_variety),
    toText(wine.region),
    toText(wine.country),
    toText(wine.vintage),
  ];
  return fields.some((f) => f.toLowerCase().includes(lower));
}

function matchesFilter(wine: Wine, filter: FilterKey): boolean {
  if (filter === "all") return true;
  if (filter === "glass") return wine.price_by_glass != null;
  if (filter === "bottle") return wine.price_by_bottle != null;
  const typeLower = toText(wine.type).toLowerCase();
  if (filter === "red") return typeLower === "red";
  if (filter === "white") return typeLower === "white";
  if (filter === "sparkling") return typeLower === "sparkling";
  return false;
}

interface MenuViewProps {
  data: MenuResponse;
  encodedData: string;
}

export function MenuView({ data, encodedData }: MenuViewProps) {
  const { t } = useLocale();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  const filteredWines = useMemo(() => {
    return data.wines.filter(
      (w) => matchesSearch(w, searchQuery) && matchesFilter(w, activeFilter)
    );
  }, [data.wines, searchQuery, activeFilter]);

  const groups = useMemo(
    () => (activeFilter === "all" ? groupWinesByType(filteredWines) : null),
    [filteredWines, activeFilter]
  );

  const showCarousel =
    activeFilter === "all" &&
    !searchQuery.trim() &&
    groups != null &&
    filteredWines.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <TopBar branch={data.branch} encodedData={encodedData} />

      <main className="mx-auto max-w-2xl px-4 py-6 pb-24">
        {data.wines.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            {t("empty.noWines")}
          </p>
        ) : (
          <>
            {/* Barra búsqueda + chips (sticky) */}
            <div className="sticky top-0 z-10 -mx-4 bg-gray-50/95 px-4 py-3 backdrop-blur dark:bg-gray-900/95">
              <input
                type="search"
                placeholder={t("search.placeholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mb-3 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm placeholder-gray-400 focus:border-wine-500 focus:outline-none focus:ring-1 focus:ring-wine-500 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-500"
                aria-label="Buscar en el menú"
              />
              <div className="flex flex-wrap gap-2">
                {FILTER_KEYS.map(({ key, labelKey }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveFilter(key)}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                      activeFilter === key
                        ? "bg-wine-600 text-white dark:bg-wine-500"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500"
                    }`}
                  >
                    {t(labelKey)}
                  </button>
                ))}
              </div>
            </div>

            {filteredWines.length === 0 ? (
              <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                {t("empty.noResults")}
              </p>
            ) : showCarousel && groups ? (
              /* Carrusel horizontal por sección */
              <div className="mt-6 space-y-6">
                {Array.from(groups.entries()).map(([typeKey, wines]) => {
                  const sectionLabel = TYPE_SECTION_KEYS[typeKey]
                    ? t(TYPE_SECTION_KEYS[typeKey])
                    : typeKey;
                  return (
                    <section key={typeKey}>
                      <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        {sectionLabel} · {wines.length}
                      </h2>
                      <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scroll-pl-4 -mx-4 px-4">
                        {wines.map((wine) => (
                          <div
                            key={wine.id}
                            className="min-w-[88%] sm:min-w-[420px] shrink-0 snap-start"
                          >
                            <WineCard wine={wine} />
                          </div>
                        ))}
                      </div>
                    </section>
                  );
                })}
              </div>
            ) : activeFilter === "all" && groups ? (
              /* Lista vertical por sección (cuando hay búsqueda) */
              <div className="mt-6 space-y-8">
                {Array.from(groups.entries()).map(([typeKey, wines]) => {
                  const sectionLabel = TYPE_SECTION_KEYS[typeKey]
                    ? t(TYPE_SECTION_KEYS[typeKey])
                    : typeKey;
                  return (
                    <section key={typeKey}>
                      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        {sectionLabel}
                      </h2>
                      <ul className="space-y-3">
                        {wines.map((wine) => (
                          <li key={wine.id}>
                            <WineCard wine={wine} />
                          </li>
                        ))}
                      </ul>
                    </section>
                  );
                })}
              </div>
            ) : (
              <ul className="mt-6 space-y-3">
                {filteredWines.map((wine) => (
                  <li key={wine.id}>
                    <WineCard wine={wine} />
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </main>
    </div>
  );
}
