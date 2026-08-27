import "server-only";
import { cache } from "react";
import { defaultLocale, localeCodes } from "./locales";
import { countryCodes, defaultLocaleFor } from "./countries";
import { INTERNATIONAL } from "./constants";

export { INTERNATIONAL };

export type RequestLocale = { country: string; locale: string };

/**
 * React's cache() gives one object per request, which is how the locale
 * reaches shared components without being threaded through every prop. Each
 * page segment writes to it in its layout; anything rendered below reads it.
 *
 * This is deliberately not headers() — reading headers would opt every page
 * out of static rendering, and there are ~3,000 country/language/page
 * combinations to generate.
 */
const store = cache((): RequestLocale => ({
  country: INTERNATIONAL,
  locale: defaultLocale,
}));

/** The route params every page under [country]/[locale] receives. */
export type LocaleParams = Promise<{ country: string; locale: string }>;

/**
 * Publishes a page's country and language for the rest of its render.
 *
 * The layout does this too, but React may start rendering a page before its
 * layout has resolved, so each page sets it as well rather than depending on
 * that ordering. Both write the same value, so the duplication is harmless.
 */
export async function applyRequestLocale(params: LocaleParams): Promise<void> {
  const { country, locale } = await params;
  setRequestLocale(country, resolveLocale(country, locale));
}

export function setRequestLocale(country: string, locale: string): void {
  const s = store();
  s.country = country;
  s.locale = locale;
}

export function getRequestLocale(): RequestLocale {
  return store();
}

export function getLocale(): string {
  return store().locale;
}

export function getCountryCode(): string {
  return store().country;
}

/** Valid country segments, including the headquarters site. */
export function isCountrySegment(value: string): boolean {
  return value === INTERNATIONAL || countryCodes.includes(value);
}

export function isLocaleSegment(value: string): boolean {
  return localeCodes.includes(value);
}

/**
 * The language a segment pair should resolve to: the requested one when that
 * country offers it, otherwise the country's own default.
 */
export function resolveLocale(country: string, locale: string): string {
  if (!isLocaleSegment(locale)) {
    return country === INTERNATIONAL
      ? defaultLocale
      : defaultLocaleFor(country);
  }
  return locale;
}
