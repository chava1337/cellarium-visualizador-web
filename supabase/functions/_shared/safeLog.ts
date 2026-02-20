/**
 * Safe logging: never log full tokens (only first 6 chars).
 */

export function safeTokenPrefix(token: string): string {
  if (!token || typeof token !== "string") return "[empty]";
  if (token.length < 6) return "[short]";
  return `${token.slice(0, 6)}…`;
}
