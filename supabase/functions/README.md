# Supabase Edge Functions

## public-menu

Endpoint para que el visualizador web (guest) obtenga el menú por token QR.

- **GET** `/functions/v1/public-menu?token=<qr_tokens.token>`
- **POST** `/functions/v1/public-menu` con body `{ "token": "..." }` (Content-Type: application/json)

### Respuesta 200

```json
{
  "branch": {
    "id": "uuid",
    "name": "string",
    "address": "string|null"
  },
  "wines": [
    {
      "id": "uuid",
      "name": "string",
      "winery": "string|null",
      "grape_variety": "string|null",
      "region": "string|null",
      "country": "string|null",
      "vintage": "string|null",
      "type": "string",
      "description": "string|null",
      "image_url": "string|null",
      "body_level": number|null,
      "sweetness_level": number|null,
      "acidity_level": number|null,
      "intensity_level": number|null,
      "fizziness_level": number|null,
      "stock_quantity": number,
      "price_by_glass": number|null,
      "price_by_bottle": number|null
    }
  ]
}
```

### Errores

| Status | Body | Descripción |
|--------|------|-------------|
| 400 | `{ "error": "invalid_token" }` | Token faltante o formato incorrecto |
| 403 | `{ "error": "not_guest" }` | Token existe pero no es tipo `guest` |
| 404 | `{ "error": "not_found" }` | Token no existe o branch no existe |
| 410 | `{ "error": "token_expired" }` | `expires_at` pasado o `current_uses >= max_uses` |
| 429 | `{ "error": "rate_limited" }` | Rate limit (si se implementa) |
| 500 | `{ "error": "server_error" }` | Error interno |

### Validación del token (qr_tokens)

1. Buscar fila por `token` exacto.
2. No existe → 404 `not_found`.
3. `type !== 'guest'` → 403 `not_guest`.
4. `expires_at <= now()` → 410 `token_expired`.
5. `max_uses != null` y `current_uses >= max_uses` → 410 `token_expired`.

No se marca `used = true` para guest (multi-uso). Opcional: incrementar `current_uses` por request (contar visitas).

### Seguridad

- La función usa **service role** solo en el servidor (Edge); nunca se expone al cliente.
- No se relajan políticas RLS.
- No se loguea el token completo (solo primeros 6 caracteres).

### CORS

- GET/POST permitidos desde cualquier origen por defecto.
- Configurable con env `ALLOW_ORIGIN` (ej. `*` o `https://tu-app.vercel.app`).

---

## Tests manuales

Sustituye `<project>` por tu project ref y `XXXXX` por un token guest válido.

### Éxito (200)

```bash
curl -i "https://<project>.supabase.co/functions/v1/public-menu?token=XXXXX"
```

Con POST:

```bash
curl -i -X POST "https://<project>.supabase.co/functions/v1/public-menu" \
  -H "Content-Type: application/json" \
  -d '{"token":"XXXXX"}'
```

### Ejemplos de error

Token faltante (400):

```bash
curl -i "https://<project>.supabase.co/functions/v1/public-menu"
# Esperado: 400 { "error": "invalid_token" }
```

Token inexistente (404):

```bash
curl -i "https://<project>.supabase.co/functions/v1/public-menu?token=token-que-no-existe"
# Esperado: 404 { "error": "not_found" }
```

Token no guest (403): usar un token con `type = 'admin_invite'` (si tienes uno):

```bash
curl -i "https://<project>.supabase.co/functions/v1/public-menu?token=ADMIN_TOKEN"
# Esperado: 403 { "error": "not_guest" }
```

Preflight CORS:

```bash
curl -i -X OPTIONS "https://<project>.supabase.co/functions/v1/public-menu" \
  -H "Access-Control-Request-Method: GET"
# Esperado: 204 con headers CORS
```
