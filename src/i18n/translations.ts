export type Locale = "es" | "en";

export type TranslationKeys = {
  "search.placeholder": string;
  "filters.all": string;
  "filters.red": string;
  "filters.white": string;
  "filters.sparkling": string;
  "filters.glass": string;
  "filters.bottle": string;
  "wine.available": string;
  "wine.soldOut": string;
  "wine.glass": string;
  "wine.bottle": string;
  "wine.showProfile": string;
  "wine.hideProfile": string;
  "wine.showMore": string;
  "wine.showLess": string;
  "wine.body": string;
  "wine.acidity": string;
  "wine.sweetness": string;
  "wine.intensity": string;
  "wine.fizziness": string;
  "empty.noResults": string;
  "empty.noWines": string;
  "section.red": string;
  "section.white": string;
  "section.rose": string;
  "section.sparkling": string;
  "section.other": string;
  "admin.title": string;
  "admin.branchLabel": string;
  "admin.message": string;
  "admin.openInApp": string;
  "admin.storeHint": string;
  "admin.appStore": string;
  "admin.playStore": string;
  "adminInvite.registerTitle": string;
  "adminInvite.subtitle": string;
  "adminInvite.nameLabel": string;
  "adminInvite.usernameLabel": string;
  "adminInvite.emailLabel": string;
  "adminInvite.passwordLabel": string;
  "adminInvite.signup": string;
  "adminInvite.signin": string;
  "adminInvite.submit": string;
  "adminInvite.sending": string;
  "adminInvite.sendRequest": string;
  "adminInvite.requestSentTitle": string;
  "adminInvite.requestSentBody": string;
  "adminInvite.errors.invalid_token": string;
  "adminInvite.errors.token_expired": string;
  "adminInvite.errors.token_used": string;
  "adminInvite.errors.token_max_uses_reached": string;
  "adminInvite.errors.branch_not_found": string;
  "adminInvite.errors.not_authenticated": string;
  "adminInvite.errors.already_registered": string;
  "adminInvite.errors.generic": string;
  "adminInvite.confirmEmailTitle": string;
  "adminInvite.confirmEmailBody": string;
};

export const translations: Record<Locale, TranslationKeys> = {
  es: {
    "search.placeholder": "Buscar vino, uva, región…",
    "filters.all": "Todos",
    "filters.red": "Tinto",
    "filters.white": "Blanco",
    "filters.sparkling": "Espumoso",
    "filters.glass": "Por copa",
    "filters.bottle": "Por botella",
    "wine.available": "Disponible",
    "wine.soldOut": "Agotado",
    "wine.glass": "Copa",
    "wine.bottle": "Botella",
    "wine.showProfile": "Ver perfil completo",
    "wine.hideProfile": "Ocultar perfil",
    "wine.showMore": "Ver más",
    "wine.showLess": "Ver menos",
    "wine.body": "Cuerpo",
    "wine.acidity": "Acidez",
    "wine.sweetness": "Dulzor",
    "wine.intensity": "Aroma",
    "wine.fizziness": "Burbujas",
    "empty.noResults": "No hay resultados para esta búsqueda o filtro.",
    "empty.noWines": "No hay vinos en el menú por ahora.",
    "section.red": "Tintos",
    "section.white": "Blancos",
    "section.rose": "Rosados",
    "section.sparkling": "Espumosos",
    "section.other": "Otros",
    "admin.title": "Invitación de personal",
    "admin.branchLabel": "Sucursal",
    "admin.message": "Abre el enlace en la app de Cellarium para gestionar esta sucursal.",
    "admin.openInApp": "Abrir en la app",
    "admin.storeHint": "Si no se abre, descarga la app:",
    "admin.appStore": "App Store",
    "admin.playStore": "Play Store",
    "adminInvite.registerTitle": "Unirse como personal",
    "adminInvite.subtitle": "Crea una cuenta para enviar tu solicitud de acceso.",
    "adminInvite.nameLabel": "Nombre",
    "adminInvite.usernameLabel": "Usuario (opcional)",
    "adminInvite.emailLabel": "Correo electrónico",
    "adminInvite.passwordLabel": "Contraseña",
    "adminInvite.signup": "Crear cuenta",
    "adminInvite.signin": "Iniciar sesión",
    "adminInvite.submit": "Continuar",
    "adminInvite.sending": "Enviando…",
    "adminInvite.sendRequest": "Enviar solicitud",
    "adminInvite.requestSentTitle": "Solicitud enviada",
    "adminInvite.requestSentBody": "Un administrador revisará tu solicitud en la app y te asignará acceso.",
    "adminInvite.errors.invalid_token": "Código de invitación no válido.",
    "adminInvite.errors.token_expired": "El código de invitación ha expirado.",
    "adminInvite.errors.token_used": "Este código de invitación ya fue utilizado.",
    "adminInvite.errors.token_max_uses_reached": "Este código alcanzó su límite de usos.",
    "adminInvite.errors.branch_not_found": "Sucursal no encontrada.",
    "adminInvite.errors.not_authenticated": "Debes iniciar sesión para enviar la solicitud.",
    "adminInvite.errors.already_registered": "Este correo ya tiene cuenta. Cuando un administrador apruebe tu solicitud, usa la app para entrar.",
    "adminInvite.errors.generic": "Ha ocurrido un error. Inténtalo de nuevo.",
    "adminInvite.confirmEmailTitle": "Cuenta creada",
    "adminInvite.confirmEmailBody": "Confirma tu correo y vuelve a abrir este enlace del QR para enviar la solicitud.",
  },
  en: {
    "search.placeholder": "Search wine, grape, region…",
    "filters.all": "All",
    "filters.red": "Red",
    "filters.white": "White",
    "filters.sparkling": "Sparkling",
    "filters.glass": "By glass",
    "filters.bottle": "By bottle",
    "wine.available": "Available",
    "wine.soldOut": "Sold out",
    "wine.glass": "Glass",
    "wine.bottle": "Bottle",
    "wine.showProfile": "View full profile",
    "wine.hideProfile": "Hide profile",
    "wine.showMore": "Show more",
    "wine.showLess": "Show less",
    "wine.body": "Body",
    "wine.acidity": "Acidity",
    "wine.sweetness": "Sweetness",
    "wine.intensity": "Aroma",
    "wine.fizziness": "Bubbles",
    "empty.noResults": "No results for this search or filter.",
    "empty.noWines": "No wines on the menu at the moment.",
    "section.red": "Reds",
    "section.white": "Whites",
    "section.rose": "Rosés",
    "section.sparkling": "Sparkling",
    "section.other": "Other",
    "admin.title": "Staff invite",
    "admin.branchLabel": "Branch",
    "admin.message": "Open this link in the Cellarium app to manage this branch.",
    "admin.openInApp": "Open in app",
    "admin.storeHint": "If it doesn't open, download the app:",
    "admin.appStore": "App Store",
    "admin.playStore": "Play Store",
    "adminInvite.registerTitle": "Join as staff",
    "adminInvite.subtitle": "Create an account to submit your access request.",
    "adminInvite.nameLabel": "Name",
    "adminInvite.usernameLabel": "Username (optional)",
    "adminInvite.emailLabel": "Email",
    "adminInvite.passwordLabel": "Password",
    "adminInvite.signup": "Create account",
    "adminInvite.signin": "Sign in",
    "adminInvite.submit": "Continue",
    "adminInvite.sending": "Sending…",
    "adminInvite.sendRequest": "Send request",
    "adminInvite.requestSentTitle": "Request sent",
    "adminInvite.requestSentBody": "An administrator will review your request in the app and grant you access.",
    "adminInvite.errors.invalid_token": "Invalid invitation code.",
    "adminInvite.errors.token_expired": "This invitation code has expired.",
    "adminInvite.errors.token_used": "This invitation code has already been used.",
    "adminInvite.errors.token_max_uses_reached": "This code has reached its usage limit.",
    "adminInvite.errors.branch_not_found": "Branch not found.",
    "adminInvite.errors.not_authenticated": "You must sign in to send the request.",
    "adminInvite.errors.already_registered": "This email already has an account. Once an administrator approves your request, use the app to sign in.",
    "adminInvite.errors.generic": "Something went wrong. Please try again.",
    "adminInvite.confirmEmailTitle": "Account created",
    "adminInvite.confirmEmailBody": "Confirm your email and open this QR link again to send the request.",
  },
};
