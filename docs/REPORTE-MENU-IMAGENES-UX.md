# Reporte: Menú con imágenes y diagnóstico UX (Cellarium)

**Fecha:** Inspección del repo visualizador-web + referencia a public-menu.  
**Repos:** A = cellarium (Expo/RN), B = cellarium-visualizador-web (Next.js 14).  
**Nota:** Repo A no está en el workspace actual; la sección B se rellenó con “N/A” y checklist para inspección manual.

---

## 1) Repo Web (cellarium-visualizador-web)

### 1.1 Archivos clave

| Qué | Archivo / Ubicación |
|-----|----------------------|
| Ruta que renderiza `/menu/[token]` | `app/menu/[token]/page.tsx` |
| Ruta que renderiza `/qr?data=...` | `app/qr/page.tsx` |
| Fetch a public-menu | `src/lib/menuApi.ts` → `fetchMenu(token)` |
| Componente lista/cards de vinos | `src/components/MenuView.tsx` (agrupa por tipo) → `src/components/WineCard.tsx` (cada vino) |
| Header | `src/components/TopBar.tsx` → `src/components/AppActions.tsx` |
| Filtros | No existen (solo agrupación por `wine.type`) |

### 1.2 Variables de entorno

- **`NEXT_PUBLIC_MENU_API_URL`**: se usa en `src/lib/menuApi.ts` como base del `fetch` (ej. `https://<project>.supabase.co/functions/v1/public-menu`). Es pública (prefijo `NEXT_PUBLIC`).
- **`SUPABASE_ANON_KEY`**: solo servidor (sin `NEXT_PUBLIC`). Se usa en `menuApi.ts` en headers `Authorization: Bearer ${anonKey}` y `apikey: anonKey`.
- **`SUPABASE_URL`**: no se usa en este repo.

### 1.3 next.config.js

- Contenido actual: `const nextConfig = {}; module.exports = nextConfig;`
- No hay `images.domains` ni `images.remotePatterns`. Si se usan imágenes remotas (p. ej. Supabase Storage), habrá que configurar el dominio.

### 1.4 Diagnóstico “[object Object]”

- No hay texto literal “Vino de …” en el código. Los textos que se renderizan con datos del vino son:
  - **Nombre:** `wine.name` (línea 31 de `WineCard.tsx`).
  - **Bodega / región:** `[wine.winery, regionCountry].filter(Boolean).join(" · ")` con `regionCountry = [wine.region, wine.country].filter(Boolean).join(", ")` (líneas 21, 44–46).
  - **Añada / variedad:** `[wine.vintage, wine.grape_variety].filter(Boolean).join(" · ")` (líneas 50–52).
  - **Descripción:** `wine.description` (líneas 56–58).

- **Causa probable de `[object Object]`:** si la API devuelve algún campo como **objeto** (p. ej. `grape_variety`, `region`, `country`, `type` o `description` como `{ id, name }` o array) y se usa en un `join()` o se mete en JSX como texto, React muestra `[object Object]`.
- **Recomendación:** asegurar que en el backend esos campos lleguen como `string | null`; si vienen de relaciones (FK), hacer `.single()` o mapear a string (ej. `row.region?.name ?? null`).

### 1.5 Log de debug añadido (temporal)

- En `src/lib/menuApi.ts`, justo después de `response.json()` y del log “Response body”, se añadió (solo para debug local, no prod):
  - `console.log("[public-menu debug] wines[0] keys:", Object.keys(w))`
  - `console.log("[public-menu debug] wines[0] (recortado):", JSON.stringify(sample))`  
  con `sample` recortando strings > 80 caracteres.

- **Ejemplo de forma esperada** (según tipo `Wine` en `src/types/menu.ts`):

```json
{
  "id": "uuid",
  "name": "string",
  "winery": "string | null",
  "grape_variety": "string | null",
  "region": "string | null",
  "country": "string | null",
  "vintage": "string | null",
  "type": "string",
  "description": "string | null",
  "image_url": "string | null",
  "body_level": 1-5 | null,
  "sweetness_level": 1-5 | null,
  "acidity_level": 1-5 | null,
  "intensity_level": 1-5 | null,
  "fizziness_level": 1-5 | null,
  "stock_quantity": 0,
  "price_by_glass": number | null,
  "price_by_bottle": number | null
}
```

- Para obtener un **ejemplo real**: ejecutar `npm run dev`, abrir `/menu/<token>` o `/qr?data=...` con un token válido y revisar la salida en la terminal del servidor Next (ahí aparecerán `wines[0] keys` y `wines[0] (recortado)`).

### 1.6 Imágenes en el visualizador

- **Campo en tipo:** en `src/types/menu.ts`, el tipo `Wine` incluye `image_url: string | null`.
- **Uso en UI:** en `WineCard.tsx` **no** se usa `image_url` ni ningún otro campo de imagen; no se muestran fotos de vino.
- **next/image:** no se usa en este repo (solo la referencia en `next-env.d.ts`). No hay `images.domains` ni `images.remotePatterns` en `next.config.js`.
- **Conclusión:** el contrato ya contempla `image_url`, pero el front no lo pinta y no hay configuración de dominios remotos para imágenes.

---

## 2) Repo App (cellarium — Expo / RN)

**Repo A no está en el workspace actual.** Para completar esta sección hay que abrir el repo `cellarium` (Expo) y revisar:

### 2.1 Archivos a localizar

- Pantalla(s) de catálogo de vinos (ej. `WineCatalogScreen.tsx`, `MenuScreen.tsx`, o similar).
- Componente de card de vino donde se muestre la imagen (nombre del componente y ruta).
- Servicio / query que carga wines (Supabase: `from('wines')` o `from('wine_branch_stock')` + relación con `wines`) y qué campos de imagen se piden.

### 2.2 Qué extraer (cuando inspecciones Repo A)

- Campos de imagen usados: p. ej. `image_url`, `image_path`, `label_url`, `photo_url`, etc.
- Si la app usa **signed URLs**: `supabase.storage.from(...).createSignedUrl(...)` (copiar helper o fragmento).
- Si son **públicas**: bucket público y `getPublicUrl` o equivalente.
- Nombre del bucket (ej. `wine-labels`, `wines`, `cellarium`).
- Formato de paths (ej. `ownerId/branchId/wineId/label.jpg` o `wines/<id>.jpg`).
- Si existe Edge Function o RPC que devuelve URLs de imagen ya resueltas, nombrarla.

### 2.3 Entregable esperado (mapa de imágenes)

- Bucket: nombre.
- Path pattern: ej. `{owner_id}/{wine_id}/label.jpg`.
- Tipo de URL: público vs signed (y duración si es signed).
- Helper: nombre del archivo/función que construye la URL.

---

## 3) Supabase / public-menu

La Edge Function `public-menu` **no está en este repo** (se eliminó de `cellarium-visualizador-web`). La siguiente descripción se basa en la implementación que tuvo este repo y en el contrato acordado.

### 3.1 Origen de los datos

- **Tablas:** `qr_tokens` (validación del token), `branches` (sucursal), `wine_branch_stock` (stock por sucursal) y relación con `wines`.
- **Query:** desde `wine_branch_stock` con `.select(..., wines(...))`, filtros: `branch_id`, `wines.owner_id`, `stock_quantity >= 0`.

### 3.2 Columnas que se seleccionaban (wines)

En el `select` de `wines` se incluía:

- `id`, `name`, `winery`, `grape_variety`, `region`, `country`, `vintage`, `type`, `description`, **`image_url`**, `body_level`, `sweetness_level`, `acidity_level`, `intensity_level`, `fizziness_level`.

Es decir, **sí se incluía un campo de imagen** (`image_url`). Si en la base `wines.image_url` está poblado (URL pública o path), la Edge debería devolverlo.

### 3.3 Shape final de `wines[]` (contrato)

Cada elemento de `wines[]` combina:

- Del stock: `stock_quantity`, `price_by_glass`, `price_by_bottle`.
- De `wines`: las columnas listadas arriba, con `image_url` incluido.

Si en producción la Edge no incluye `image_url`, hay que añadir en el `select` de la relación `wines` la columna `image_url` (y, si aplica, cualquier otro campo de imagen que use la app, p. ej. `label_image_url`).

### 3.4 Posible causa de `[object Object]`

Si en la base `grape_variety`, `region` o `country` son FKs a otras tablas y el cliente Supabase devuelve objetos anidados en lugar de strings, el front verá `[object Object]`. En la Edge hay que mapear a string (ej. `row.wines?.grape_variety?.name ?? row.wines?.grape_variety` si es objeto) o asegurar que el select devuelva una columna de tipo texto.

---

## 4) Checklist de acciones recomendadas

(Sin implementar aún; solo priorizado.)

1. **Mostrar imágenes en web**
   - Confirmar en la API real que `wines[].image_url` (u otro campo acordado) viene como string URL.
   - En `WineCard.tsx`: si hay `image_url`, mostrar con `<img>` o `next/image` (asegurando CORS y dominio permitido).
   - En `next.config.js`: añadir `images.remotePatterns` (o `images.domains`) con el dominio de Supabase Storage (ej. `*.supabase.co` o la URL del bucket).

2. **Corregir `[object Object]`**
   - Revisar en logs del servidor el output de `[public-menu debug] wines[0]` para ver tipos reales de `grape_variety`, `region`, `country`, `type`, `description`.
   - En la Edge Function (o en el origen de datos): devolver esos campos como `string | null`; si vienen de relaciones, mapear a string en la Edge antes de enviar.

3. **URLs accesibles desde el navegador**
   - Si las imágenes están en Supabase Storage: decidir si usar bucket público (URL directa) o signed URLs (duración suficiente, ej. 1h o más, y generarlas en la Edge o en un RPC).
   - Si la app móvil usa signed URLs, replicar la misma lógica en la Edge (o RPC) para el menú web, o exponer un bucket público de solo lectura para etiquetas.

4. **Ajustar next.config para dominios remotos**
   - Añadir el host de Storage en `images.remotePatterns` (Next.js 14) o `images.domains` según versión, para poder usar `next/image` con esas URLs sin error de dominio no permitido.

5. **Quitar logs de debug**
   - Antes de producción, eliminar los `console.log` de `[public-menu debug]` en `src/lib/menuApi.ts`.

---

*Claves privadas/secretas: no se han incluido en el reporte; en ejemplos de env solo se referencian nombres de variables (ej. `SUPABASE_ANON_KEY`).*
