# Cellarium – Visualizador Web del Menú de Vinos por QR

Proyecto **Next.js (App Router)** que sirve el menú de vinos para comensales que escanean un código QR. No usa service role ni acceso directo a base de datos en el cliente; todo pasa por un backend (Menu API).

## Cómo correr

```bash
npm install
cp .env.local.example .env.local
# Editar .env.local y definir NEXT_PUBLIC_MENU_API_URL (y opcionales)
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Variables de entorno

| Variable | Descripción |
|----------|-------------|
| `NEXT_PUBLIC_MENU_API_URL` | **Requerida.** URL base del endpoint del menú (ej. Supabase Edge Function). |
| `NEXT_PUBLIC_APP_DEEPLINK_SCHEME` | Esquema del deep link (default: `cellarium`). |
| `NEXT_PUBLIC_IOS_STORE_URL` | Enlace a App Store (placeholder: `https://apps.apple.com/`). |
| `NEXT_PUBLIC_ANDROID_STORE_URL` | Enlace a Play Store (placeholder: `https://play.google.com/store`). |

Ver `.env.local.example` para el template.

## URLs de la app

- **`/qr?data=<encoded>`** – Compatible con el QR actual. `data` debe ser `encodeURIComponent(JSON.stringify({ type, token, branchId?, branchName? }))`. Solo se acepta `type === "guest"`; si falta `token` o el JSON es inválido se muestra “QR inválido”.
- **`/menu/[token]`** – Acceso directo por token (ej. `/menu/abc123`).
- **`/api/health`** – Healthcheck (JSON `{ status: "ok", ... }`).

### Ejemplos

- Con QR actual:  
  `https://tu-dominio.vercel.app/qr?data=%7B%22type%22%3A%22guest%22%2C%22token%22%3A%22tu-token%22%7D`
- Por token:  
  `https://tu-dominio.vercel.app/menu/tu-token`

## Contrato del backend (Menu API)

- **Request:**  
  `GET ${NEXT_PUBLIC_MENU_API_URL}?token=<token>`
- **Response 200:** JSON con la forma:

```json
{
  "branch": {
    "id": "uuid",
    "name": "string",
    "address": "string | null"
  },
  "wines": [
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
  ]
}
```

- **Errores (4xx/5xx):** cuerpo JSON con un único campo:

```json
{ "error": "invalid_token" | "token_expired" | "not_found" | "rate_limited" | "server_error" }
```

La app muestra mensajes amigables para cada código y maneja también `network_error` y `timeout` en el cliente.

## Estructura relevante

- `app/qr/page.tsx` – Lee `data`, decodifica, valida `guest` + `token`, llama al backend y renderiza menú o error.
- `app/menu/[token]/page.tsx` – Misma lógica usando el token de la URL.
- `src/lib/menuApi.ts` – `fetchMenu(token)` con timeout 10s, caché 30s y manejo de errores.
- `src/types/menu.ts` – Tipos `Branch`, `Wine`, `MenuResponse`, códigos de error.
- `src/components/MenuView.tsx` – Agrupa vinos por `type` y usa `WineCard`, `TopBar`.
- `src/components/TopBar.tsx` – Nombre del local + “Abrir en la app” (deep link) + “Descargar app” (App Store / Play Store).
- Deep link usado: `cellarium://qr/<encodedData>` (configurable con `NEXT_PUBLIC_APP_DEEPLINK_SCHEME`).

## Notas

- **SSR:** Las páginas son Server Components; el fetch del menú se hace en el servidor. Los botones que usan `window.location` (deep link) están en un Client Component (`AppActions`).
- **Seguridad:** No se usa service role en el cliente; el token se envía solo al endpoint público del menú.
- **Caché:** El menú se revalida cada 30 segundos (`next: { revalidate: 30 }`).
