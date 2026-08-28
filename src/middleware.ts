import { NextResponse, type NextRequest } from "next/server";
import { countries, countryCodes, defaultLocaleFor } from "@/lib/i18n/countries";
import { defaultLocale, localeCodes } from "@/lib/i18n/locales";
import { INTERNATIONAL } from "@/lib/i18n/constants";

const countrySet = new Set([INTERNATIONAL, ...countryCodes]);
const localeSet = new Set(localeCodes);

/** Paths that are not part of the localized site. */
const PASSTHROUGH =
  /^\/(_next|api|admin|images|data|media|favicon\.ico|icon\.svg|apple-icon\.png|robots\.txt|sitemap\.xml)(\/|$)/;

/** Picks the best country/language for a first-time visitor. */
function preferred(request: NextRequest): { country: string; locale: string } {
  const saved = request.cookies.get("yef-site")?.value;
  if (saved) {
    const [country, locale] = saved.split("/");
    if (countrySet.has(country) && localeSet.has(locale)) return { country, locale };
  }

  // Vercel resolves the visitor's country; fall back to Accept-Language.
  const geo = request.headers.get("x-vercel-ip-country")?.toLowerCase();
  if (geo && countrySet.has(geo)) {
    return { country: geo, locale: defaultLocaleFor(geo) };
  }

  const accepted = (request.headers.get("accept-language") ?? "")
    .split(",")
    .map((part) => part.split(";")[0].trim().toLowerCase());
  for (const tag of accepted) {
    const base = tag.split("-")[0];
    if (localeSet.has(tag)) return { country: INTERNATIONAL, locale: tag };
    if (localeSet.has(base)) return { country: INTERNATIONAL, locale: base };
  }

  return { country: INTERNATIONAL, locale: defaultLocale };
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  if (PASSTHROUGH.test(pathname)) return NextResponse.next();

  const segments = pathname.split("/").filter(Boolean);
  const [first, second] = segments;

  // Already addressed as /<country>/<language>/...
  if (countrySet.has(first) && localeSet.has(second)) {
    const country = countries.find((c) => c.code === first);
    // A country only serves its own languages; anything else is a typo or an
    // old link, so send it to that country's default rather than 404.
    if (country && !country.locales.includes(second)) {
      const url = request.nextUrl.clone();
      url.pathname = `/${first}/${defaultLocaleFor(first)}/${segments.slice(2).join("/")}`;
      return NextResponse.redirect(url);
    }
    const response = NextResponse.next();
    response.cookies.set("yef-site", `${first}/${second}`, {
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
      path: "/",
    });
    return response;
  }

  // Anything else — "/" or a link written before the country sites existed —
  // is sent to the visitor's site with the rest of the path intact.
  const { country, locale } = preferred(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${country}/${locale}${pathname === "/" ? "" : pathname}`;
  url.search = search;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
