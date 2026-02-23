# Reporte técnico: Staff registration 100% web (Supabase, sin deep linking)

**Objetivo:** Permitir que el staff se registre 100% desde la web, creando una solicitud `pending` para que owner/manager apruebe desde la app y se asigne rol staff.

**Repos:**  
- **Repo 1 (App):** Cellarium (Expo/React Native)  
- **Repo 2 (Web):** cellarium-visualizador-web (Next.js)

---

## 1) Deep Linking / QR (App)

### Archivos y rutas donde se configura linking

| Archivo | Descripción |
|---------|-------------|
| **App.tsx** | `LinkingOptions` con `linkingPrefixes` y `config.screens`. Rutas: `QrProcessor: 'qr/:qrData?'`, `QrGeneration: 'admin/qr'`, etc. |
| **app.config.js** | `expo.scheme: "cellarium"`, `prefixes: ["cellarium://"]`, `pathPrefix: "/qr"` en intent filters. |
| **BootstrapScreen.tsx** | Lee URL inicial con `Linking.getInitialURL()`, extrae segmento QR con regex `cellarium:\/\/\/?qr\/([^?#]+)` o `cellarium:\/\/qr\/([^?#]+)`, navega a `QrProcessor` con `qrData`. |
| **QrProcessorScreen.tsx** | Recibe params `qrData`/`token`; también parsea URL con `extractQrPayloadFromUrl` (path o `?data=`); fallback AsyncStorage `qrData`; llama `validateQrToken(token)`. |
| **QrGenerationScreen.tsx** | Genera URL con `generateUniversalQrUrl({ type, token, branchId, branchName })`; tipo UI `guest` \| `admin`; para BD se usa `admin_invite`. |

### Prefixes y hosts configurados

- **Prefixes (App.tsx):** `cellarium://`, `cellarium:///`, `Linking.createURL('/')`, `https://cellarium.app`, `https://www.cellarium.app`
- **Rutas de deep link:** `qr/:qrData?`, `admin/qr`, `admin/register`, `admin/dashboard`, etc.
- **Auth callback (AuthScreen.tsx):** `redirectTo: 'cellarium://auth-callback'` y `'cellarium://auth-callback'` en OAuth.

### Dónde se genera el QR staff y payload exacto

- **Archivo:** `Cellarium/src/screens/QrGenerationScreen.tsx`
- **Flujo:** Tipo "admin" → `handleGenerateAdminQr` → `generateQrToken({ type: 'admin_invite', branchId, createdBy, ownerId, maxUses: 1 })` (QrGenerationService: insert en qr_tokens; token viene de RPC `generate_qr_token()`). Luego la URL que se pone en el QR es `generateUniversalQrUrl(...)` (QrTokenService).
- **Payload codificado (QrTokenService.generateUniversalQrUrl):**  
  `{ type: 'admin', token, branchId, branchName }`  
  (en BD `qr_tokens.type` es `admin_invite`; en el JSON del QR se usa `type: 'admin'` para compatibilidad web.)
- **URL final:** `https://cellarium-visualizador-web.vercel.app/qr?data=${encodeURIComponent(JSON.stringify({ type, token, branchId, branchName }))}`

### Dónde se valida el token en la app

- **Archivo:** `Cellarium/src/screens/QrProcessorScreen.tsx` (aprox. líneas 168–176).
- **Servicio:** `Cellarium/src/services/QrTokenService.ts` → `validateQrToken(token)`.
- **Lógica:** SELECT en `qr_tokens` con join a `branches` (`.eq('token', token).single()`); comprueba `expires_at`, `used` (admin_invite), `current_uses` vs `max_uses`; INSERT en `qr_scans`; UPDATE `qr_tokens` (current_uses, used, used_at). Devuelve `type: qrToken.type === 'admin_invite' ? 'admin' : 'guest'`, `branchId`, `branchName`.

### Funciones/servicios usados

- **QrTokenService.ts:** `validateQrToken(token)`, `generateUniversalQrUrl(qrData)`, `generateDeepLink(qrData)`, `markQrAsUsed(token)`.
- **QrGenerationService.ts:** `createGuestQrToken(branchId, duration, maxUses)`, `generateQrToken(data)`, `getUserQrTokens(userId)`, `revokeQrToken(tokenId)`, `getTokenScanStats(tokenId)`.
- **Linking (expo-linking):** `Linking.getInitialURL()`, `Linking.addEventListener('url', handler)`.

---

## 2) QR Web flow (Next.js)

### Rutas y archivos involucrados

| Archivo | Función |
|---------|---------|
| **app/qr/page.tsx** | Lee `searchParams.data`, llama `decodeQrData(dataParam)`; si `type` admin/admin_invite → `AdminInviteView`; si guest → `fetchMenu(token)` + `MenuView` o `ErrorState`. |
| **src/lib/qrData.ts** | `decodeQrData(dataParam)`: decodeURIComponent + JSON.parse, valida `type` y `token` (string); devuelve `{ ok, payload: { type, token, branchId?, branchName?, encodedData } }` o `{ ok: false, error: 'invalid_qr' }`. |
| **src/lib/menuApi.ts** | `fetchMenu(token)`: GET a `NEXT_PUBLIC_MENU_API_URL?token=`, headers `Authorization` y `apikey` con `SUPABASE_ANON_KEY`; timeout 10s; revalidate 30. |
| **src/components/AdminInviteView.tsx** | Vista staff: branchName, mensaje, botón "Abrir en la app" → `cellarium://qr/${encodedData}`, enlaces App Store / Play Store; header con LocaleToggle. |
| **src/components/MenuView.tsx** | Vista menú guest: búsqueda, chips filtro, carrusel/lista, WineCard. |

### Lógica actual

- **type === 'guest':** Se llama `fetchMenu(token)` (public-menu). Si OK → `MenuView`; si error → `ErrorState` con código de API.
- **type === 'admin' o 'admin_invite':** No se llama a public-menu. Se renderiza `AdminInviteView` con `branchName` y `encodedData`. El botón "Abrir en la app" hace `window.location.href = cellarium://qr/<encoded>` (deep link); no hay registro en web todavía.

### Auth en web

- **No existe** cliente Supabase en el repo Next.js (cellarium-visualizador-web).
- No hay `signIn`, `signUp`, magic link ni uso de `@supabase/supabase-js` en el front. Solo se usa `SUPABASE_ANON_KEY` en el servidor para llamar a la Edge Function public-menu.

### i18n en web

- **Clave locale:** `localStorage` `"cellarium-locale"` (`"es"` \| `"en"`); por defecto `"es"` (LocaleContext).
- **Archivos:** `src/i18n/translations.ts` (diccionarios `es`/`en`), `src/i18n/LocaleContext.tsx` (Provider, `useLocale()`, `t(key)`).
- **UI:** `LocaleToggle` (ES/EN) en TopBar (menú) y en header de AdminInviteView (staff invite).
- **Keys admin:** `admin.title`, `admin.branchLabel`, `admin.message`, `admin.openInApp`, `admin.storeHint`, `admin.appStore`, `admin.playStore`.

---

## 3) Supabase Data Model (desde el código)

### Tablas y columnas referenciadas

| Tabla | Columnas usadas | Dónde (archivo / contexto) |
|-------|------------------|----------------------------|
| **users** | id, email, name, username, role, status, branch_id, owner_id, subscription_plan, stripe_customer_id, subscription_active, subscription_id, created_at, updated_at | App: AuthContext, AdminRegistrationScreen, SubscriptionsScreen, user-created Edge Function, update-subscription, stripe-webhook, create-checkout-session, delete-user-account (RPC). Tipos: `User` en types/index.ts con role = owner \| gerente \| sommelier \| supervisor \| personal; status = pending \| active \| inactive \| loading. |
| **branches** | id, name, address, owner_id, is_main, created_at, updated_at, phone, email | App: BranchContext (select * eq owner_id), QrGenerationService (join en qr_tokens), WineCatalogScreen, user-created (insert sucursal principal). Web: public-menu devuelve branch { id, name, address }. |
| **qr_tokens** | id, token, type, branch_id, created_by, owner_id, expires_at, max_uses, current_uses, used, used_at | App: QrTokenService (validateQrToken, markQrAsUsed), QrGenerationService (insert, select con branches); AdminRegistrationScreen (select owner_id por token). user-created: select owner_id, branch_id por token. type en BD: 'guest' \| 'admin_invite'. |
| **qr_scans** | qr_token_id, success, scanned_at | App: QrTokenService.validateQrToken (insert); QrGenerationService.getTokenScanStats (select). |
| **subscriptions** (o equivalente) | owner_id, stripe_subscription_id, status, current_period_end, etc. | App: stripe-webhook, update-subscription; SubscriptionsScreen. |
| **wine_branch_stock** / **wines** | (menú) | public-menu: from wine_branch_stock, select con wines(...); filtros branch_id, wines.owner_id. |

No se encontraron referencias a **branches_users** ni **branch_users** en el código revisado. La relación staff–branch parece estar en **users.branch_id** y **users.owner_id**.

**Migraciones referenciadas (repo App):**  
`20260222150000_create_guest_qr_token_rpc.sql`, `20260222120000_users_subscription_active_default_false.sql`, `20250122130100_reconcile_branch_locks_business_base.sql`, `20250122120000_fix_reconcile_branch_locks.sql`, `20250122140000_delete_user_account_exception_debug.sql`, entre otras en `Cellarium/supabase/migrations/`. RLS/policies: ver `docs/audit_snippets/rls_branches_users_subscriptions.sql` (referenciado en AUDIT_PROJECT_TOTAL.md).

### Roles existentes

- **En tipos (App):** `User['role']` = `'owner' | 'gerente' | 'sommelier' | 'supervisor' | 'personal'`. `normalizeRole` convierte `'staff'` a `'personal'`.
- **En user-created:** se asigna `role: 'owner'` o `role: 'staff'`; `status: 'active'` o `status: 'pending'` (staff con qrToken → pending).
- **Decisión de rol:** En Edge Function user-created: si hay `qrToken` → role = staff, status = pending; si no, owner. En la app, el rol “por branch” se deduce de `user.branch_id` y `user.owner_id`; no hay tabla explícita branches_users en el código.

---

## 4) Supabase RPC / Edge Functions

### Llamadas a supabase.rpc(...) (App)

| RPC | Args (ejemplo) | Archivo |
|-----|----------------|--------|
| create_guest_qr_token | p_branch_id, p_duration, p_max_uses | QrGenerationService.ts |
| generate_qr_token | (ninguno; devuelve token string único) | QrGenerationService.ts (generateUniqueToken) |
| get_user_email_by_username | p_username | AuthScreen.tsx |
| create_staff_user | p_user_id, p_email, p_name, p_username?, p_qr_token | AdminRegistrationScreen.tsx (fallback cuando user-created falla o sin sesión) |
| enforce_subscription_expiry | (ninguno) | SubscriptionsScreen.tsx |
| delete_user_account | (según delete-user-account) | delete-user-account Edge Function |

### Edge Functions invocadas (App / backend)

| Función | Uso | Payload / contrato |
|---------|-----|--------------------|
| **user-created** | Tras signUp (AuthScreen owner o AdminRegistrationScreen staff). | Body: `{ qrToken?, invitationType?: 'admin_invite' \| 'owner_register', branchId?, name?, username? }`. Requiere Authorization (sesión). Si qrToken: busca owner_id/branch_id en qr_tokens; asigna role='staff', status='pending'. Crea fila en public.users. |
| **rate-limiter** | Antes de registro (AuthScreen, AdminRegistrationScreen). | body: `{ action: 'register', identifier: string }`. |
| **update-subscription** | Cambio de plan / addons. | (interno con session). RPC `reconcile_branch_locks(p_owner_id)` desde la Edge. |
| **create-payment-intent** / **confirm-payment** | Pagos (PaymentService). | (Stripe). |
| **cancel-subscription** / **create-checkout-session** | Suscripciones (SubscriptionService, Stripe). | (Stripe). |

### public-menu (Web)

- **Invocación:** Desde Next.js con `fetch(MENU_API_URL?token=...)` y headers Authorization/apikey (SUPABASE_ANON_KEY). No es `functions.invoke` desde el cliente.
- **Contrato:** GET con query `token`. Respuesta 200: `{ branch: { id, name, address }, wines: [...] }`. Errores 4xx/5xx: `{ error: "invalid_token" | "token_expired" | "not_found" | "rate_limited" | "server_error" }`. public-menu solo acepta tokens con type guest; admin devuelve 403 not_guest.

---

## 5) Source of truth

- **Rol “real”:** En tabla **public.users**: columnas `role` y `status`. No hay tabla separada tipo branches_users en el código; un usuario staff tiene `owner_id` (owner al que pertenece) y `branch_id` (sucursal asignada).
- **owner_id de un staff/manager:** Viene de `qr_tokens.owner_id` al crear el usuario (user-created con qrToken), o de la lógica que rellena el RPC `create_staff_user`. En usuarios ya creados se lee de `users.owner_id`.
- **Branch actual (app):** Para owner: lista de branches con `owner_id = user.id` (BranchContext). Para no-owner: se filtra por `user.branch_id`. No hay tabla N:M explícita; un staff tiene un solo `branch_id` en users.

---

## 6) Recomendaciones para implementar staff join requests (solo análisis)

### Tabla nueva sugerida: staff_join_requests

- **Nombre:** `staff_join_requests` (o `staff_requests`).
- **Propósito:** Solicitudes de staff desde web (sin deep link): el usuario se registra en web con token QR; en lugar de crear directo en users con status pending, se crea una solicitud que un owner/manager aprueba desde la app.
- **Columnas sugeridas:**
  - id (uuid, PK)
  - token (text, FK implícito a qr_tokens.token o qr_token_id)
  - branch_id (uuid, FK branches)
  - email (text) — o auth.users.id si ya existe cuenta
  - name / username (text)
  - status: 'pending' | 'approved' | 'rejected'
  - created_at, updated_at
  - reviewed_by (uuid, FK users) — quien aprobó/rechazó
  - reviewed_at (timestamptz)
- **FKs:** branch_id → branches(id); opcionalmente qr_token_id → qr_tokens(id). Si el registro web crea auth.users + fila en staff_join_requests (sin crear public.users hasta aprobar), entonces también user_id (auth) opcional.

### RPCs sugeridos

- **request_staff_access** (o **create_staff_join_request**):  
  Parámetros: p_qr_token, p_email (o p_user_id si ya logueado), p_name, p_username (opcional).  
  Lógica: Validar qr_tokens (token, type admin_invite, no expirado, no used); insertar en staff_join_requests con status pending. Opcional: no marcar qr_tokens.used hasta aprobar.
- **approve_staff_request**:  
  Parámetros: p_request_id, p_reviewer_id.  
  Lógica: Solo owner/gerente de la branch; actualizar status a approved; crear o actualizar fila en public.users (role staff/personal, branch_id, owner_id, status active); marcar qr_tokens.used si aplica; opcional notificación.
- **reject_staff_request**:  
  Parámetros: p_request_id, p_reviewer_id.  
  Lógica: status rejected, reviewed_by, reviewed_at.

### Pantallas a tocar

- **Web (Next.js):**
  - AdminInviteView: Añadir flujo “Registrarse aquí” (formulario email/nombre/contraseña o magic link) que llame a una Edge Function o RPC `request_staff_access` con el token del QR. Mostrar mensaje “Solicitud enviada; un administrador la revisará”.
  - No llamar a user-created con qrToken desde web si se opta por “solicitud primero”; en su lugar crear fila en staff_join_requests.
- **App (Expo):**
  - Nueva pantalla o sección en UserManagement / BranchManagement: “Solicitudes de personal” (lista de staff_join_requests con status pending para branches del owner/gerente). Acciones: Aprobar / Rechazar.
  - Al aprobar: llamar RPC approve_staff_request (o lógica equivalente que cree users y opcionalmente envíe email de bienvenida).

### Dudas / alternativas

- **Opción A:** Web crea auth.users + public.users con status pending (como hoy en app con user-created) y la “aprobación” en app solo cambia status a active. No hace falta staff_join_requests si se reutiliza el flujo actual y se expone en web signUp + user-created con qrToken.
- **Opción B:** Web solo crea “solicitud” (staff_join_requests); no crea users hasta que la app apruebe. Requiere que la app cree auth.users (invite) o que el staff use el mismo link para “completar registro” tras aprobación.
- **Tabla branches_users:** Si en el futuro un usuario puede tener varias sucursales, convendría branches_users (user_id, branch_id, role). Hoy el modelo es 1 user → 1 branch_id en users; se puede mantener así y más adelante migrar a N:M si hace falta.

---

*Reporte generado a partir de inspección del repo cellarium-visualizador-web y del repo Cellarium (Expo). No se han implementado cambios; QR guest y public-menu se mantienen sin modificar.*
