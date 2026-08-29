import { INTERNATIONAL } from "./constants";
import { singleLocaleFor } from "./countries";

/**
 * Prefixes a site-relative path with the current country and language, so
 * every link a visitor follows stays inside the site they chose.
 *
 *   localePath("/news", "kr", "ko")  ->  "/kr/ko/news"
 *
 * A country with only one language drops the language segment — there is
 * nothing for it to disambiguate, so its whole site routes on the country
 * code alone:
 *
 *   localePath("/news", "de", "de")  ->  "/de/news"
 */
export function localePath(
  path: string,
  country: string,
  locale: string,
): string {
  if (!path.startsWith("/")) return path;
  if (path.startsWith("//")) return path;
  const rest = path === "/" ? "" : path;
  const only = singleLocaleFor(country);
  return only ? `/${country}${rest}` : `/${country}/${locale}${rest}`;
}

/** Strips a country/language prefix back off, for switching either of them. */
export function stripLocalePath(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return "/";
  const skip = singleLocaleFor(parts[0]) ? 1 : 2;
  return "/" + parts.slice(skip).join("/");
}

export { INTERNATIONAL };
