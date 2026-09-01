import { NextResponse, type NextRequest } from "next/server";
import { countryCodes, defaultLocaleFor, getCountry } from "@/lib/i18n/countries";
import { localeCodes } from "@/lib/i18n/locales";
import { INTERNATIONAL } from "@/lib/i18n/constants";
import { REMOVED_ARTICLE_SLUGS } from "@/lib/news";

const countrySet = new Set([INTERNATIONAL, ...countryCodes]);
const localeSet = new Set(localeCodes);
const removedArticleSlugSet = new Set<string>(REMOVED_ARTICLE_SLUGS);

/**
 * These article URLs specifically used to exist — invented placeholder
 * stories with fabricated bylines and uncredited stock photography, removed
 * for good — so a plain 404 would undersell it: the page isn't merely
 * missing, it was intentionally taken down and isn't coming back.
 */
function isRemovedArticlePath(pathname: string): boolean {
  const segments = pathname.split("/").filter(Boolean);
  const newsIndex = segments.indexOf("news");
  if (newsIndex === -1) return false;
  const slug = segments[newsIndex + 1];
  return slug != null && removedArticleSlugSet.has(slug);
}

/** Paths that are not part of the localized site. */
const PASSTHROUGH =
  /^\/(_next|api|admin|images|data|media|favicon\.ico|icon\.svg|apple-icon\.png|robots\.txt|sitemap\.xml)(\/|$)/;

/** The languages a site may resolve to — every one of them for the
 *  headquarters site, just the country's own short list everywhere else. */
function localesFor(country: string): string[] {
  if (country === INTERNATIONAL) return localeCodes;
  return getCountry(country)?.locales ?? [defaultLocaleFor(country)];
}

/**
 * The language a site renders in, decided without ever touching the URL:
 * a remembered choice first, then the browser's own language list narrowed
 * to what that site offers, then the site's own default.
 */
function resolveLocale(request: NextRequest, country: string): string {
  const allowed = localesFor(country);

  const saved = request.cookies.get("yef-site")?.value;
  if (saved) {
    const [savedCountry, savedLocale] = saved.split("/");
    if (savedCountry === country && allowed.includes(savedLocale)) return savedLocale;
  }

  const accepted = (request.headers.get("accept-language") ?? "")
    .split(",")
    .map((part) => part.split(";")[0].trim().toLowerCase());
  for (const tag of accepted) {
    const base = tag.split("-")[0];
    if (allowed.includes(tag)) return tag;
    if (allowed.includes(base)) return base;
  }

  return defaultLocaleFor(country);
}

/** Picks the best site for a first-time visitor with no country in the URL. */
function preferredCountry(request: NextRequest): string {
  const saved = request.cookies.get("yef-site")?.value;
  if (saved) {
    const [country] = saved.split("/");
    if (countrySet.has(country)) return country;
  }

  // Vercel resolves the visitor's country; fall back to the headquarters
  // site, which offers every language, so a browser's language always lands
  // somewhere sensible even when its country doesn't have its own site.
  const geo = request.headers.get("x-vercel-ip-country")?.toLowerCase();
  if (geo && countrySet.has(geo)) return geo;

  return INTERNATIONAL;
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  if (PASSTHROUGH.test(pathname)) return NextResponse.next();

  if (isRemovedArticlePath(pathname)) {
    return new NextResponse(
      "<!doctype html><title>410 Gone</title><h1>410 Gone</h1><p>This article has been permanently removed.</p>",
      { status: 410, headers: { "content-type": "text/html; charset=utf-8" } },
    );
  }

  const segments = pathname.split("/").filter(Boolean);
  const [first, second] = segments;

  // Every site routes on its country code alone — there is no language
  // segment in a URL a visitor sees, ever. The page tree underneath still
  // lives at /<country>/<language>/..., so a request is rewritten to that
  // internal path rather than redirected: the address bar keeps the short
  // form while Next resolves the route it actually has. The language comes
  // from resolveLocale() alone — a remembered cookie, then Accept-Language,
  // then the site's default — never from anything in the URL.
  if (countrySet.has(first)) {
    // An old-style /<country>/<language>/... link collapses onto the short
    // form instead of 404ing or double-counting the language.
    if (localeSet.has(second)) {
      const url = request.nextUrl.clone();
      url.pathname = `/${first}/${segments.slice(2).join("/")}`;
      return NextResponse.redirect(url);
    }

    const locale = resolveLocale(request, first);
    const url = request.nextUrl.clone();
    url.pathname = `/${first}/${locale}/${segments.slice(1).join("/")}`;
    const response = NextResponse.rewrite(url);
    response.cookies.set("yef-site", `${first}/${locale}`, {
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
      path: "/",
    });
    return response;
  }

  // Anything else — "/" or a link written before the country sites existed —
  // is sent to the visitor's site with the rest of the path intact.
  const country = preferredCountry(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${country}${pathname === "/" ? "" : pathname}`;
  url.search = search;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
