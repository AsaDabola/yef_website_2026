import { getCountry } from "@/lib/i18n/countries";
import { countryName } from "@/lib/i18n/display";
import { getRequestLocale } from "@/lib/i18n/request";
import { getT } from "@/lib/i18n/server";

/**
 * The organisation's name for the site being served, in the reader's
 * language — "Youth Evangelical Fellowship International" at headquarters,
 * "Youth Evangelical Fellowship Brasil" on the Brazilian site.
 *
 * The footer sign-off and the caption sitting on the large banner photos both
 * name the site, so they say the same thing from the same place.
 */
export async function getSiteName(): Promise<string> {
  const t = await getT();
  const { country, locale } = getRequestLocale();
  const site = getCountry(country);
  return site
    ? `${t("Youth Evangelical Fellowship")} ${countryName(site, locale)}`
    : t("Youth Evangelical Fellowship International");
}

/** The caption that sits along the bottom of a full-bleed banner photo. */
export default async function SiteWordmark({
  className = "",
}: {
  className?: string;
}) {
  return <>{await getSiteName()}</>;
}
