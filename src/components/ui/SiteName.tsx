"use client";

import { getCountry } from "@/lib/i18n/countries";
import { countryName } from "@/lib/i18n/display";
import { useI18n, useT } from "@/lib/i18n/client";

/**
 * The organisation's name for the site being served, in the reader's
 * language — "Youth Evangelical Fellowship International" at headquarters,
 * "Youth Evangelical Fellowship Brasil" on the Brazilian site.
 *
 * The captions along the bottom of the large banner photos all name the site,
 * so they follow the country the same way the footer sign-off does. Rendering
 * it as text rather than a fixed string means the CSS decides the casing.
 */
export default function SiteName() {
  const t = useT();
  const { country, locale } = useI18n();
  const site = getCountry(country);
  return (
    <>
      {site
        ? `${t("Youth Evangelical Fellowship")} ${countryName(site, locale)}`
        : t("Youth Evangelical Fellowship International")}
    </>
  );
}
