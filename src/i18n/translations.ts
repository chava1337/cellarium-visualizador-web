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
  },
};
