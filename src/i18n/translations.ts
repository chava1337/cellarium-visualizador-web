export type Locale = "es" | "en" | "pt-BR";

export type TranslationKeys = {
  "search.placeholder": string;
  "search.placeholderCocktails": string;
  "search.ariaLabel": string;
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
  "wine.tannin": string;
  "wine.fizziness": string;
  "empty.noResults": string;
  "empty.noWines": string;
  "empty.noCocktails": string;
  "tab.wines": string;
  "tab.cocktails": string;
  "loading.menu": string;
  "error.loadTitle": string;
  "error.retry": string;
  "error.invalid_token": string;
  "error.not_guest": string;
  "error.token_expired": string;
  "error.not_found": string;
  "error.rate_limited": string;
  "error.server_error": string;
  "error.network_error": string;
  "error.timeout": string;
  "error.invalid_qr": string;
  "error.generic": string;
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
  "adminInvite.confirmEmailLabel": string;
  "adminInvite.passwordLabel": string;
  "adminInvite.confirmPasswordLabel": string;
  "adminInvite.signup": string;
  "adminInvite.signin": string;
  "adminInvite.submit": string;
  "adminInvite.sending": string;
  "adminInvite.processing": string;
  "adminInvite.sendRequest": string;
  "adminInvite.requestSentTitle": string;
  "adminInvite.requestSentBody": string;
  "adminInvite.errors.invalid_token": string;
  "adminInvite.errors.token_expired": string;
  "adminInvite.errors.token_used": string;
  "adminInvite.errors.token_used_staff": string;
  "adminInvite.errors.token_max_uses_reached": string;
  "adminInvite.errors.token_max_uses_reached_staff": string;
  "adminInvite.errors.branch_not_found": string;
  "adminInvite.errors.not_authenticated": string;
  "adminInvite.errors.no_session_after_signup": string;
  "adminInvite.errors.already_registered": string;
  "adminInvite.errors.email_mismatch": string;
  "adminInvite.errors.password_mismatch": string;
  "adminInvite.errors.too_many_pending": string;
  "adminInvite.errors.generic": string;
  "adminInvite.confirmEmailTitle": string;
  "adminInvite.confirmEmailBody": string;
};

/** Clave de traducción (nombre del string en el diccionario). */
export type TranslationKey = keyof TranslationKeys;

export const translations: Record<Locale, TranslationKeys> = {
  es: {
    "search.placeholder": "Buscar vino, uva, región…",
    "search.placeholderCocktails": "Buscar coctel, ingrediente…",
    "search.ariaLabel": "Buscar en el menú",
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
    "wine.tannin": "Tanicidad",
    "wine.fizziness": "Burbujas",
    "empty.noResults": "No hay resultados para esta búsqueda o filtro.",
    "empty.noWines": "No hay vinos en el menú por ahora.",
    "empty.noCocktails": "No hay cocteles en el menú por ahora.",
    "tab.wines": "Vinos",
    "tab.cocktails": "Cocteles",
    "loading.menu": "Cargando menú…",
    "error.loadTitle": "No se pudo cargar el menú",
    "error.retry": "Reintentar",
    "error.invalid_token": "El enlace del menú no es válido.",
    "error.not_guest": "Este QR no es para comensales.",
    "error.token_expired": "Este enlace ha caducado.",
    "error.not_found": "No encontramos este menú.",
    "error.rate_limited": "Demasiadas solicitudes. Intenta en un momento.",
    "error.server_error": "Error en el servidor. Intenta más tarde.",
    "error.network_error": "No hay conexión. Revisa tu red e intenta de nuevo.",
    "error.timeout": "La solicitud tardó demasiado. Intenta de nuevo.",
    "error.invalid_qr": "QR no es para comensales o es inválido.",
    "error.generic": "Algo salió mal. Intenta de nuevo.",
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
    "adminInvite.confirmEmailLabel": "Confirmar correo",
    "adminInvite.passwordLabel": "Contraseña",
    "adminInvite.confirmPasswordLabel": "Confirmar contraseña",
    "adminInvite.signup": "Crear cuenta",
    "adminInvite.signin": "Iniciar sesión",
    "adminInvite.submit": "Continuar",
    "adminInvite.sending": "Enviando…",
    "adminInvite.processing": "Procesando…",
    "adminInvite.sendRequest": "Enviar solicitud",
    "adminInvite.requestSentTitle": "Solicitud enviada",
    "adminInvite.requestSentBody": "Tu cuenta fue creada. Cuando el owner o gerente apruebe tu solicitud, inicia sesión desde la app.",
    "adminInvite.errors.invalid_token": "Código de invitación no válido.",
    "adminInvite.errors.token_expired": "El código de invitación ha expirado.",
    "adminInvite.errors.token_used": "Este código de invitación ya fue utilizado.",
    "adminInvite.errors.token_used_staff": "Este código ya fue utilizado. Pide al gerente u owner que genere uno nuevo.",
    "adminInvite.errors.token_max_uses_reached": "Este código alcanzó su límite de usos.",
    "adminInvite.errors.token_max_uses_reached_staff": "Este código ya alcanzó su límite de uso. Pide al gerente u owner que genere uno nuevo.",
    "adminInvite.errors.branch_not_found": "Sucursal no encontrada.",
    "adminInvite.errors.not_authenticated": "Debes iniciar sesión para enviar la solicitud.",
    "adminInvite.errors.no_session_after_signup": "No se pudo iniciar sesión tras crear la cuenta. Inténtalo de nuevo.",
    "adminInvite.errors.already_registered": "Este correo ya tiene cuenta. Cuando un administrador apruebe tu solicitud, usa la app para entrar.",
    "adminInvite.errors.email_mismatch": "Los correos no coinciden.",
    "adminInvite.errors.password_mismatch": "Las contraseñas no coinciden.",
    "adminInvite.errors.too_many_pending": "Hay demasiadas solicitudes pendientes para esta sucursal. Espera a que se aprueben o rechacen.",
    "adminInvite.errors.generic": "Ha ocurrido un error. Inténtalo de nuevo.",
    "adminInvite.confirmEmailTitle": "Cuenta creada",
    "adminInvite.confirmEmailBody": "Confirma tu correo y vuelve a abrir este enlace del QR para enviar la solicitud.",
  },
  en: {
    "search.placeholder": "Search wine, grape, region…",
    "search.placeholderCocktails": "Search cocktail, ingredient…",
    "search.ariaLabel": "Search the menu",
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
    "wine.tannin": "Tannin",
    "wine.fizziness": "Bubbles",
    "empty.noResults": "No results for this search or filter.",
    "empty.noWines": "No wines on the menu at the moment.",
    "empty.noCocktails": "No cocktails on the menu at the moment.",
    "tab.wines": "Wines",
    "tab.cocktails": "Cocktails",
    "loading.menu": "Loading menu…",
    "error.loadTitle": "Could not load the menu",
    "error.retry": "Retry",
    "error.invalid_token": "This menu link is not valid.",
    "error.not_guest": "This QR is not for guests.",
    "error.token_expired": "This link has expired.",
    "error.not_found": "We couldn't find this menu.",
    "error.rate_limited": "Too many requests. Please try again shortly.",
    "error.server_error": "Server error. Please try again later.",
    "error.network_error": "No connection. Check your network and try again.",
    "error.timeout": "The request took too long. Please try again.",
    "error.invalid_qr": "Invalid QR or not for guests.",
    "error.generic": "Something went wrong. Please try again.",
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
    "adminInvite.confirmEmailLabel": "Confirm email",
    "adminInvite.passwordLabel": "Password",
    "adminInvite.confirmPasswordLabel": "Confirm password",
    "adminInvite.signup": "Create account",
    "adminInvite.signin": "Sign in",
    "adminInvite.submit": "Continue",
    "adminInvite.sending": "Sending…",
    "adminInvite.processing": "Processing…",
    "adminInvite.sendRequest": "Send request",
    "adminInvite.requestSentTitle": "Request sent",
    "adminInvite.requestSentBody": "Your account was created. Once the owner or manager approves your request, sign in from the app.",
    "adminInvite.errors.invalid_token": "Invalid invitation code.",
    "adminInvite.errors.token_expired": "This invitation code has expired.",
    "adminInvite.errors.token_used": "This invitation code has already been used.",
    "adminInvite.errors.token_used_staff": "This code has already been used. Ask the manager/owner to generate a new one.",
    "adminInvite.errors.token_max_uses_reached": "This code has reached its usage limit.",
    "adminInvite.errors.token_max_uses_reached_staff": "This code has reached its usage limit. Ask the manager/owner to generate a new one.",
    "adminInvite.errors.branch_not_found": "Branch not found.",
    "adminInvite.errors.not_authenticated": "You must sign in to send the request.",
    "adminInvite.errors.no_session_after_signup": "Could not sign in after creating the account. Please try again.",
    "adminInvite.errors.already_registered": "This email already has an account. Once an administrator approves your request, use the app to sign in.",
    "adminInvite.errors.email_mismatch": "Emails do not match.",
    "adminInvite.errors.password_mismatch": "Passwords do not match.",
    "adminInvite.errors.too_many_pending": "Too many pending requests for this branch. Wait for some to be approved or rejected.",
    "adminInvite.errors.generic": "Something went wrong. Please try again.",
    "adminInvite.confirmEmailTitle": "Account created",
    "adminInvite.confirmEmailBody": "Confirm your email and open this QR link again to send the request.",
  },
  "pt-BR": {
    "search.placeholder": "Buscar vinho, uva, região…",
    "search.placeholderCocktails": "Buscar coquetel, ingrediente…",
    "search.ariaLabel": "Buscar no cardápio",
    "filters.all": "Todos",
    "filters.red": "Tinto",
    "filters.white": "Branco",
    "filters.sparkling": "Espumante",
    "filters.glass": "Por taça",
    "filters.bottle": "Por garrafa",
    "wine.available": "Disponível",
    "wine.soldOut": "Esgotado",
    "wine.glass": "Taça",
    "wine.bottle": "Garrafa",
    "wine.showProfile": "Ver perfil completo",
    "wine.hideProfile": "Ocultar perfil",
    "wine.showMore": "Ver mais",
    "wine.showLess": "Ver menos",
    "wine.body": "Corpo",
    "wine.acidity": "Acidez",
    "wine.sweetness": "Doçura",
    "wine.intensity": "Aroma",
    "wine.tannin": "Tanino",
    "wine.fizziness": "Borbulhas",
    "empty.noResults": "Nenhum resultado para esta busca ou filtro.",
    "empty.noWines": "Não há vinhos no cardápio no momento.",
    "empty.noCocktails": "Não há coquetéis no cardápio no momento.",
    "tab.wines": "Vinhos",
    "tab.cocktails": "Coquetéis",
    "loading.menu": "Carregando cardápio…",
    "error.loadTitle": "Não foi possível carregar o cardápio",
    "error.retry": "Tentar novamente",
    "error.invalid_token": "O link do cardápio não é válido.",
    "error.not_guest": "Este QR não é para clientes.",
    "error.token_expired": "Este link expirou.",
    "error.not_found": "Não encontramos este cardápio.",
    "error.rate_limited": "Muitas solicitações. Tente novamente em instantes.",
    "error.server_error": "Erro no servidor. Tente novamente mais tarde.",
    "error.network_error": "Sem conexão. Verifique sua rede e tente novamente.",
    "error.timeout": "A solicitação demorou demais. Tente novamente.",
    "error.invalid_qr": "QR inválido ou não destinado a clientes.",
    "error.generic": "Algo deu errado. Tente novamente.",
    "section.red": "Tintos",
    "section.white": "Brancos",
    "section.rose": "Rosés",
    "section.sparkling": "Espumantes",
    "section.other": "Outros",
    "admin.title": "Convite de equipe",
    "admin.branchLabel": "Filial",
    "admin.message": "Abra o link no app Cellarium para gerenciar esta filial.",
    "admin.openInApp": "Abrir no app",
    "admin.storeHint": "Se não abrir, baixe o app:",
    "admin.appStore": "App Store",
    "admin.playStore": "Play Store",
    "adminInvite.registerTitle": "Entrar como equipe",
    "adminInvite.subtitle": "Crie uma conta para enviar sua solicitação de acesso.",
    "adminInvite.nameLabel": "Nome",
    "adminInvite.usernameLabel": "Usuário (opcional)",
    "adminInvite.emailLabel": "E-mail",
    "adminInvite.confirmEmailLabel": "Confirmar e-mail",
    "adminInvite.passwordLabel": "Senha",
    "adminInvite.confirmPasswordLabel": "Confirmar senha",
    "adminInvite.signup": "Criar conta",
    "adminInvite.signin": "Entrar",
    "adminInvite.submit": "Continuar",
    "adminInvite.sending": "Enviando…",
    "adminInvite.processing": "Processando…",
    "adminInvite.sendRequest": "Enviar solicitação",
    "adminInvite.requestSentTitle": "Solicitação enviada",
    "adminInvite.requestSentBody":
      "Sua conta foi criada. Quando o proprietário ou gerente aprovar sua solicitação, entre pelo app.",
    "adminInvite.errors.invalid_token": "Código de convite inválido.",
    "adminInvite.errors.token_expired": "Este código de convite expirou.",
    "adminInvite.errors.token_used": "Este código de convite já foi utilizado.",
    "adminInvite.errors.token_used_staff":
      "Este código já foi utilizado. Peça ao gerente ou proprietário para gerar um novo.",
    "adminInvite.errors.token_max_uses_reached": "Este código atingiu o limite de usos.",
    "adminInvite.errors.token_max_uses_reached_staff":
      "Este código já atingiu o limite de uso. Peça ao gerente ou proprietário para gerar um novo.",
    "adminInvite.errors.branch_not_found": "Filial não encontrada.",
    "adminInvite.errors.not_authenticated": "Você precisa entrar para enviar a solicitação.",
    "adminInvite.errors.no_session_after_signup":
      "Não foi possível entrar após criar a conta. Tente novamente.",
    "adminInvite.errors.already_registered":
      "Este e-mail já possui conta. Quando um administrador aprovar sua solicitação, use o app para entrar.",
    "adminInvite.errors.email_mismatch": "Os e-mails não coincidem.",
    "adminInvite.errors.password_mismatch": "As senhas não coincidem.",
    "adminInvite.errors.too_many_pending":
      "Há solicitações pendentes demais para esta filial. Aguarde aprovação ou rejeição.",
    "adminInvite.errors.generic": "Ocorreu um erro. Tente novamente.",
    "adminInvite.confirmEmailTitle": "Conta criada",
    "adminInvite.confirmEmailBody":
      "Confirme seu e-mail e abra novamente este link do QR para enviar a solicitação.",
  },
};
