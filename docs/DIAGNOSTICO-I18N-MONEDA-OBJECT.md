# Diagnóstico: i18n + [object Object] + formato moneda

**Repo:** cellarium-visualizador-web  
**Fecha:** Inspección del código actual.

---

## A) Búsqueda en el repo — archivo y línea exacta

| Búsqueda | Archivo | Línea | Nota |
|----------|---------|-------|------|
| **"Vino de"** | *(no aparece)* | — | No existe en el código. El título de la card es solo `wine.name` (WineCard.tsx). |
| **"wine of"** | *(no aparece)* | — | No existe. |
| **"object Object"** | `docs/REPORTE-MENU-IMAGENES-UX.md` | 33, 35, 41, 141, 156 | Solo en documentación; no en código de la app. |
| **Intl.NumberFormat** | `src/components/WineCard.tsx` | 15 | Único lugar donde se formatea precio. |
| **"EUR"** | `src/components/WineCard.tsx` | 17 | Dentro de `formatPrice()`. |
| **"currency"** | `src/components/WineCard.tsx` | 15, 16 | `style: "currency"` y `currency: "EUR"`. |

**Conclusión:** El texto "Vino de" **no se renderiza** en ninguna parte. Lo que se muestra como título de vino es `toText(wine.name)` en **WineCard.tsx línea 101**. El único formateo de moneda está en **WineCard.tsx líneas 13–18** (`formatPrice` con `es-ES` y `EUR`).

---

## B) Shape real de `wines[0]` (menuApi.ts)

- **Dónde se inspecciona:** `src/lib/menuApi.ts` líneas 59–71: tras `res.json()`, si `res.ok && data?.wines?.length > 0`, se hace:
  - `console.log("[public-menu debug] wines[0] keys:", Object.keys(w))`
  - `console.log("[public-menu debug] wines[0] (recortado):", JSON.stringify(sample))`  
  (sample recorta strings > 80 caracteres).

- **Cómo obtener un ejemplo real:** Ejecutar `npm run dev`, abrir `/menu/<token>` o `/qr?data=...` con un token válido y revisar la **terminal del servidor Next** (no la del navegador). Ahí aparecen las keys y el objeto recortado.

- **Ejemplo representativo** (shape esperado según tipos; si la API devuelve objetos i18n, se verá algo así):

```json
{
  "id": "uuid",
  "name": "Nombre del vino",
  "winery": "Bodega X",
  "grape_variety": "Tempranillo",
  "region": "Rioja",
  "country": "España",
  "vintage": "2020",
  "type": "red",
  "description": "Descripción...",
  "image_url": "https://...",
  "body_level": 3,
  "sweetness_level": 1,
  "acidity_level": 4,
  "intensity_level": 3,
  "fizziness_level": null,
  "stock_quantity": 10,
  "price_by_glass": 7.5,
  "price_by_bottle": 65
}
```

- **Si un campo llega como objeto** (origen de `[object Object]`), en el log verás algo como:
  - `"region": { "es": "Rioja", "en": "Rioja" }`  
  - `"grape_variety": { "id": "...", "name": "Tempranillo" }`  

  En ese caso, las keys de `wines[0]` incluirán ese nombre de campo y el valor será un objeto. El helper `toText` ya contempla `v?.name`, `v?.es`, `v?.en` y `String(v)` como fallback; si aun así aparece `[object Object]`, es que el objeto tiene otra forma (p. ej. solo `id`) y habría que ampliar `toText` o normalizar en la API.

---

## C) WineCard y campos que pueden ser string u objeto

### Dónde se arma región/país/uva

- **WineCard.tsx**
  - **regionCountry:** líneas 54–56 → `[toText(wine.region), toText(wine.country)].filter(Boolean).join(", ")`
  - **wineryLine:** 57–59 → `[toText(wine.winery), regionCountry].filter(Boolean).join(" · ")`
  - **metaLine:** 60–62 → `[toText(wine.vintage), toText(wine.grape_variety)].filter(Boolean).join(" · ")`
  - **Título (equivalente a “nombre del vino”):** línea 101 → `{toText(wine.name)}` — **no hay literal "Vino de"**; es solo el nombre del vino.

- **MenuView.tsx**  
  - Filtro/búsqueda usa `toText` en: `wine.name`, `wine.winery`, `wine.grape_variety`, `wine.region`, `wine.country`, `wine.vintage`, `wine.type` (líneas 62–67, 76).

### Campos que pueden ser string u objeto (según API)

- **name, winery, grape_variety, region, country, vintage, type, description, image_url**  
  En el tipo están como `string | null`, pero si la API devuelve objetos (p. ej. `{ es, en }` o `{ id, name }`), son los candidatos a provocar `[object Object]` si no se pasan por `toText`.

### Uso de `toText` en el “título” del vino

- **Sí:** el texto que hace de título de la card es **solo** `toText(wine.name)` (WineCard.tsx línea 101). No hay frase "Vino de ..." en el código; si en algún entorno se viera "Vino de", sería porque `wine.name` literalmente contiene ese string o porque hay otra versión del código no inspeccionada aquí.

### Resumen

- Todos los campos usados como texto en WineCard y en el filtro de MenuView pasan por `toText`.
- Si aun así aparece `[object Object]`, revisar en el log de `menuApi` el valor real de ese campo (objeto con estructura distinta a `name`/`es`/`en`) y adaptar `toText` o la API.

---

## D) Moneda

### Formatter actual

- **Archivo:** `src/components/WineCard.tsx`  
- **Líneas:** 13–18  

```ts
function formatPrice(value: number | null): string {
  if (value == null) return "—";
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}
```

### Diff recomendado para MXN (es-MX)

Reemplazar locale y moneda fijas por parámetros (o por env/contexto). Ejemplo mínimo para pasar a **es-MX + MXN**:

```diff
--- a/src/components/WineCard.tsx
+++ b/src/components/WineCard.tsx
@@ -12,9 +12,9 @@ const toText = (v: unknown): string =>
 function formatPrice(value: number | null): string {
   if (value == null) return "—";
   return new Intl.NumberFormat("es-MX", {
     style: "currency",
-    currency: "EUR",
+    currency: "MXN",
   }).format(value);
 }
```

Si se quiere **configurable** (p. ej. por branch o env):

- Opción 1: **Env**  
  - `NEXT_PUBLIC_CURRENCY=MXN` y `NEXT_PUBLIC_LOCALE=es-MX`, y en `formatPrice` usar `process.env.NEXT_PUBLIC_CURRENCY ?? "MXN"` y locale equivalente (o un mapa locale por moneda).

- Opción 2: **Payload del branch**  
  - Ver siguiente punto.

### ¿El branch trae `currency`?

- **No.** En `src/types/menu.ts`, `Branch` es `{ id, name, address }`. No hay campo `currency`.
- **Sugerencia:**  
  - Si la moneda es por sucursal: ampliar el contrato del API y el tipo `Branch` con `currency?: string` (ej. `"MXN"` | `"EUR"`) y opcionalmente `locale?: string`. En el cliente, usar `branch.currency ?? "MXN"` y un locale por moneda (ej. `es-MX` para MXN, `es-ES` para EUR) dentro de `formatPrice`.  
  - Si la moneda es global para la app: usar env (ej. `NEXT_PUBLIC_CURRENCY`) y dejar `Branch` como está.

---

## E) Recomendación i18n ES/EN (selector con localStorage)

### Strings de UI a traducir (dónde están)

| Texto | Archivo | Uso |
|-------|---------|-----|
| "Disponible" / "Agotado" | WineCard.tsx ~110 | Badge stock |
| "Copa:" / "Botella:" | WineCard.tsx ~134, 139 | Precios |
| "Ver perfil completo" / "Ocultar perfil" | WineCard.tsx ~172 | Botón sensorial |
| "Cuerpo", "Acidez", "Dulzor", "Aroma", "Burbujas" | WineCard.tsx ~151–163 | Labels barras |
| "Todos", "Tinto", "Blanco", "Espumoso", "Por copa", "Por botella" | MenuView.tsx ~27–31 | Chips filtro |
| "Buscar vino, uva, región…" | MenuView.tsx ~118 | Placeholder búsqueda |
| "No hay resultados para esta búsqueda o filtro." | MenuView.tsx ~137 | Sin resultados |
| "No hay vinos en el menú por ahora." | MenuView.tsx ~54 | Menú vacío |
| "Abrir en la app", "App Store", "Play Store" | AppActions.tsx | TopBar |
| Mensajes de error | menuApi.ts `getErrorMessage()` | ErrorState |

### Base para selector ES/EN con localStorage

1. **Clave de idioma:** p. ej. `cellarium-locale` en `localStorage`; valores `"es"` | `"en"`.
2. **Dónde guardar:**  
   - Crear un contexto de idioma (ej. `LocaleContext`) que lee `localStorage.getItem("cellarium-locale")` al montar, expone `locale` y `setLocale`, y al cambiar `setLocale` escribe `localStorage.setItem("cellarium-locale", ...)`.
3. **Dónde usar:**  
   - Componentes que muestran los textos de la tabla anterior (WineCard, MenuView, AppActions, y el consumidor de `getErrorMessage` si se traducen errores) leen `locale` del contexto.
4. **Mapa de strings:**  
   - Un objeto por idioma, ej. `translations.es` y `translations.en`, con las mismas keys (ej. `wine.available`, `wine.glass`, `filters.all`, `search.placeholder`, …) y valores en ES/EN. En cada componente, en lugar del string literal, usar `t("wine.available")` (o similar) según el `locale` actual.
5. **Datos del API (name, region, etc.):**  
   - Si la API envía objetos `{ es, en }`, usar en el cliente `toText` con el idioma actual: p. ej. `locale === "en" ? (v?.en ?? v?.es ?? toText(v)) : (v?.es ?? v?.en ?? toText(v))`, y seguir usando ese resultado en región/país/uva/descripción para evitar `[object Object]` y aprovechar i18n del backend.

Con esto se tiene la base para un selector ES/EN que persiste en `localStorage` y la lista concreta de archivos y líneas donde están "Vino de" (no existe; título = `wine.name`), formato de precio (WineCard) y campos que pueden ser objeto.
