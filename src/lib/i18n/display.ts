import { type Country } from "./countries";

/**
 * A country's name in the reader's language. The browser and Node both know
 * all 68 of them in all 48 languages, so they do not need translating by hand.
 */
export function countryName(country: Country, locale: string): string {
  if (country.ownName) return country.name;
  try {
    return (
      new Intl.DisplayNames([locale], { type: "region" }).of(
        country.code.toUpperCase(),
      ) ?? country.name
    );
  } catch {
    return country.name;
  }
}

/** The flag emoji for an ISO 3166-1 alpha-2 code. */
export function flag(code: string): string {
  return String.fromCodePoint(
    ...[...code.toUpperCase()].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65),
  );
}
