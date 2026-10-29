/**
 * TinaCloud rewrites media fields to assets.tina.io, including images that are
 * actually checked into this site's public/images directory. Keep those files
 * on the site origin so they are served by Next/Vercel instead of a missing
 * TinaCloud upload. Genuine Tina uploads (for example /uploads/tina/...) stay
 * on the Tina asset CDN.
 */
export function resolveTinaImageUrl(value: string): string {
  try {
    const url = new URL(value);
    if (url.hostname !== "assets.tina.io") return value;

    const localImagePath = url.pathname.match(/\/images\/.*$/)?.[0];
    return localImagePath ? `${localImagePath}${url.search}${url.hash}` : value;
  } catch {
    return value;
  }
}

export function resolveTinaImageUrls<T>(value: T): T {
  if (typeof value === "string") return resolveTinaImageUrl(value) as T;
  if (Array.isArray(value)) return value.map(resolveTinaImageUrls) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, nestedValue]) => [key, resolveTinaImageUrls(nestedValue)]),
    ) as T;
  }
  return value;
}
