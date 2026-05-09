/**
 * URLs de tiendas para la landing (solo home).
 * Respeta env en Vercel/local; si falta o viene vacío, usa fallbacks del producto.
 */
export const DEFAULT_ANDROID_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.cellarium.winecatalog";

export const DEFAULT_IOS_STORE_URL =
  "https://apps.apple.com/app/id6761282276";

export function getLandingStoreUrls(): {
  androidUrl: string;
  iosUrl: string;
} {
  const android =
    process.env.NEXT_PUBLIC_ANDROID_STORE_URL?.trim() || DEFAULT_ANDROID_STORE_URL;
  const ios = process.env.NEXT_PUBLIC_IOS_STORE_URL?.trim() || DEFAULT_IOS_STORE_URL;
  return { androidUrl: android, iosUrl: ios };
}
