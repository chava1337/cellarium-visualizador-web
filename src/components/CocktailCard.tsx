"use client";

import { useState } from "react";
import type { Cocktail, IngredientsBilingual } from "@/src/types/menu";
import { useLocale } from "@/src/i18n/LocaleContext";
import { safeText } from "@/src/lib/text";

interface CocktailCardProps {
  cocktail: Cocktail;
}

function formatPrice(value: number | null): string {
  if (value == null) return "—";
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 2,
  }).format(value);
}

/** Una línea de ingredientes: ingredients_preview > array join > bilingüe por locale. */
function getIngredientsDisplay(
  cocktail: Cocktail,
  locale: "es" | "en"
): string {
  const preview = safeText(cocktail.ingredients_preview);
  if (preview) return preview;
  const ing = cocktail.ingredients;
  if (Array.isArray(ing)) {
    const joined = ing.map((x) => (typeof x === "string" ? x : safeText(x))).filter(Boolean).join(", ");
    return joined.trim() || "";
  }
  if (ing && typeof ing === "object" && !Array.isArray(ing)) {
    const bil = ing as IngredientsBilingual;
    const primary = locale === "es" ? bil.es : bil.en;
    const fallback = locale === "es" ? bil.en : bil.es;
    const s = safeText(primary) || safeText(fallback);
    return s;
  }
  return "";
}

export function CocktailCard({ cocktail }: CocktailCardProps) {
  const { locale } = useLocale();
  const [imgError, setImgError] = useState(false);

  const imageUrl = safeText(cocktail.image_url);
  const showImg = !!imageUrl && !imgError;
  const name = safeText(cocktail.name);
  const description = safeText(cocktail.description);
  const ingredientsLine = getIngredientsDisplay(cocktail, locale);
  const ingredientsList = ingredientsLine
    ? ingredientsLine.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  return (
    <article
      className="flex gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800 overflow-hidden"
      data-cocktail-id={cocktail.id}
    >
      <div className="shrink-0">
        {showImg ? (
          <img
            src={imageUrl}
            alt=""
            className="h-[140px] w-[84px] rounded-lg border border-gray-100 object-contain shadow-sm dark:border-gray-600"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="flex h-[140px] w-[84px] items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-3xl dark:border-gray-600 dark:bg-gray-700/50"
            aria-hidden
          >
            🍸
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1 flex flex-col gap-1.5 overflow-hidden">
        <h3 className="text-base font-semibold leading-tight text-gray-900 dark:text-white min-w-0 truncate">
          {name}
        </h3>

        {cocktail.category ? (
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400 min-w-0">
            {cocktail.category}
          </p>
        ) : null}

        {ingredientsList.length > 0 ? (
          <ul className="text-sm text-gray-600 dark:text-gray-400 list-disc list-inside space-y-0.5 min-w-0">
            {ingredientsList.map((item, i) => (
              <li key={i} className="break-words">
                {item}
              </li>
            ))}
          </ul>
        ) : null}

        {description && description !== ingredientsLine ? (
          <p className="text-sm text-gray-500 dark:text-gray-500 line-clamp-2 min-w-0 break-words">
            {description}
          </p>
        ) : null}

        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-0.5 text-sm min-w-0">
          {cocktail.price != null ? (
            <span className="font-medium text-gray-800 dark:text-gray-200">
              {formatPrice(cocktail.price)}
            </span>
          ) : (
            <span className="text-gray-500">—</span>
          )}
        </div>
      </div>
    </article>
  );
}
