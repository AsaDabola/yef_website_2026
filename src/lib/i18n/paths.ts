import { INTERNATIONAL } from "./constants";

/**
 * Prefixes a site-relative path with the current country, so every link a
 * visitor follows stays inside the site they chose. The language never
 * appears in the URL — it's resolved per-request (a remembered cookie, then
 * the browser's own language, then the site's default), the same way for
 * every country — so `locale` is accepted only to keep call sites simple
 * when they already have both values on hand.
 *
 *   localePath("/news", "kr", "ko")  ->  "/kr/news"
 */
export function localePath(
  path: string,
  country: string,
  _locale: string,
): string {
  if (!path.startsWith("/")) return path;
  if (path.startsWith("//")) return path;
  const rest = path === "/" ? "" : path;
  return `/${country}${rest}`;
}

/** Strips a country prefix back off, for switching sites. */
export function stripLocalePath(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return "/";
  return "/" + parts.slice(1).join("/");
}

export { INTERNATIONAL };
