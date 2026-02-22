"use client";

import { useState } from "react";
import type { Wine } from "@/src/types/menu";
import { useLocale } from "@/src/i18n/LocaleContext";

interface WineCardProps {
  wine: Wine;
}

const toText = (v: unknown): string =>
  typeof v === "string" ? v : (v as { name?: string; es?: string; en?: string })?.name ?? (v as { name?: string; es?: string; en?: string })?.es ?? (v as { name?: string; es?: string; en?: string })?.en ?? (v != null ? String(v) : "");

function formatPrice(value: number | null): string {
  if (value == null) return "—";
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 2,
  }).format(value);
}

function formatStock(stock: number): "available" | "out" {
  return stock > 0 ? "available" : "out";
}

function SensoryBar({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  const pct = Math.min(5, Math.max(0, value)) * 20;
  return (
    <div className="flex items-center gap-2">
      <span className="w-16 shrink-0 text-xs text-gray-500 dark:text-gray-400">
        {label}
      </span>
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-600">
        <div
          className="h-full rounded-full bg-wine-500 dark:bg-wine-400"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function WineCard({ wine }: WineCardProps) {
  const { t } = useLocale();
  const [imgError, setImgError] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const showImg = !!toText(wine.image_url) && !imgError;

  const stockStatus = formatStock(wine.stock_quantity);
  const regionCountry = [toText(wine.region), toText(wine.country)]
    .filter(Boolean)
    .join(", ");
  const wineryLine = [toText(wine.winery), regionCountry]
    .filter(Boolean)
    .join(" · ");
  const metaLine = [toText(wine.vintage), toText(wine.grape_variety)]
    .filter(Boolean)
    .join(" · ");
  const description = toText(wine.description);

  const hasPrimarySensory =
    wine.body_level != null ||
    wine.acidity_level != null ||
    wine.sweetness_level != null;
  const hasExtraSensory =
    wine.intensity_level != null || wine.fizziness_level != null;
  const hasSensory = hasPrimarySensory || hasExtraSensory;

  return (
    <article
      className="flex gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
      data-wine-id={wine.id}
    >
      {/* Columna izquierda: imagen o placeholder */}
      <div className="shrink-0">
        {showImg ? (
          <img
            src={toText(wine.image_url)}
            alt=""
            className="h-[140px] w-[84px] rounded-lg border border-gray-100 object-contain shadow-sm dark:border-gray-600"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="flex h-[140px] w-[84px] items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-3xl dark:border-gray-600 dark:bg-gray-700/50"
            aria-hidden
          >
            🍷
          </div>
        )}
      </div>

      {/* Columna derecha: textos y precios */}
      <div className="min-w-0 flex-1 flex flex-col gap-1.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold leading-tight text-gray-900 dark:text-white">
            {toText(wine.name)}
          </h3>
          <span
            className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
              stockStatus === "available"
                ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300"
                : "bg-gray-200 text-gray-600 dark:bg-gray-600 dark:text-gray-400"
            }`}
          >
            {stockStatus === "available" ? t("wine.available") : t("wine.soldOut")}
          </span>
        </div>

        {wineryLine && (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {wineryLine}
          </p>
        )}

        {metaLine && (
          <p className="text-xs text-gray-500 dark:text-gray-500">{metaLine}</p>
        )}

        {description && (
          <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
            {description}
          </p>
        )}

        {/* Precios destacados */}
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-0.5 text-sm">
          {wine.price_by_glass != null && (
            <span className="font-medium text-gray-800 dark:text-gray-200">
              {t("wine.glass")}: {formatPrice(wine.price_by_glass)}
            </span>
          )}
          {wine.price_by_bottle != null && (
            <span className="font-medium text-gray-800 dark:text-gray-200">
              {t("wine.bottle")}: {formatPrice(wine.price_by_bottle)}
            </span>
          )}
          {wine.price_by_glass == null && wine.price_by_bottle == null && (
            <span className="text-gray-500">—</span>
          )}
        </div>

        {/* Barras sensoriales: 3 por defecto, resto al expandir */}
        {hasSensory && (
          <div className="mt-2 flex flex-col gap-1">
            {wine.body_level != null && (
              <SensoryBar label={t("wine.body")} value={wine.body_level} />
            )}
            {wine.acidity_level != null && (
              <SensoryBar label={t("wine.acidity")} value={wine.acidity_level} />
            )}
            {wine.sweetness_level != null && (
              <SensoryBar label={t("wine.sweetness")} value={wine.sweetness_level} />
            )}
            {showMore && wine.intensity_level != null && (
              <SensoryBar label={t("wine.intensity")} value={wine.intensity_level} />
            )}
            {showMore && wine.fizziness_level != null && (
              <SensoryBar label={t("wine.fizziness")} value={wine.fizziness_level} />
            )}
            {hasExtraSensory && (
              <button
                type="button"
                onClick={() => setShowMore((v) => !v)}
                className="mt-1 self-start text-xs text-wine-600 hover:underline dark:text-wine-400"
              >
                {showMore ? t("wine.hideProfile") : t("wine.showProfile")}
              </button>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
