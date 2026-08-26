import { INTERNATIONAL } from "./constants";

/**
 * Prefixes a site-relative path with the current country and language, so
 * every link a visitor follows stays inside the site they chose.
 *
 *   localePath("/news", "kr", "ko")  ->  "/kr/ko/news"
 */
export function localePath(
  path: string,
  country: string,
  locale: string,
): string {
  if (!path.startsWith("/")) return path;
  if (path.startsWith("//")) return path;
  const rest = path === "/" ? "" : path;
  return `/${country}/${locale}${rest}`;
}

/** Strips a country/language prefix back off, for switching either of them. */
export function stripLocalePath(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length >= 2) return "/" + parts.slice(2).join("/");
  return "/";
}

export { INTERNATIONAL };
