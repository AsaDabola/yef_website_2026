import { INTERNATIONAL } from "./constants";
import { countryCodes, singleLocaleFor } from "./countries";
import { localeCodes } from "./locales";

const countrySet = new Set([INTERNATIONAL, ...countryCodes]);
const localeSet = new Set(localeCodes);

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

  let i = 0;
  if (countrySet.has(parts[i])) {
    i++;
    if (i < parts.length && localeSet.has(parts[i])) {
      i++;
    }
  } else if (localeSet.has(parts[i])) {
    i++;
  }

  const rest = parts.slice(i).join("/");
  return rest ? `/${rest}` : "/";
}

export { INTERNATIONAL };

