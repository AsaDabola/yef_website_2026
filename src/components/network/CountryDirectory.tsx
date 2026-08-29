import Reveal from "@/components/ui/Reveal";
import { countriesByRegion, countries, defaultLocaleFor } from "@/lib/i18n/countries";
import { countryName, flag } from "@/lib/i18n/display";
import { localePath } from "@/lib/i18n/paths";
import { getRequestLocale } from "@/lib/i18n/request";
import { getT } from "@/lib/i18n/server";

/**
 * Every country site, grouped by region. Unlike the header picker this is a
 * flat directory the reader can scan and link into, so it lists the whole
 * platform rather than a scrolling menu. Shown on every site, not just
 * headquarters — a visitor on any country's own site can still find the rest
 * of the network from here.
 */
export default async function CountryDirectory() {
  const t = await getT();
  const { locale } = getRequestLocale();

  const groups = countriesByRegion();

  return (
    <section className="font-body bg-white">
      <div className="mx-auto max-w-[1400px] px-6 py-24 sm:px-10 lg:px-16">
        <Reveal className="text-center">
          <p className="font-semibold text-[11px] text-v2-accent tracking-[2.42px] uppercase">
            {t("Every Country")}
          </p>
          <h2 className="mt-4 font-display font-bold text-4xl text-v2-navy tracking-[-1px] sm:text-5xl">
            {t("Choose your country")}
          </h2>
          <p className="mt-4 text-v2-muted-dark">
            {t("{count} country sites around the world").replace(
              "{count}",
              String(countries.length),
            )}
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-16">
          {/* Regions differ wildly in length, so they flow down columns
              instead of sitting on a grid row that a short region would
              leave half empty. */}
          <div className="gap-x-12 md:columns-2 lg:columns-3">
            {groups.map(([region, list]) => (
              <div key={region} className="mb-12 break-inside-avoid">
                <h3 className="border-b-2 border-v2-accent pb-3 font-display font-bold text-lg text-v2-navy">
                  {t(region)}
                </h3>
                <ul className="mt-5 space-y-1">
                  {list.map((c) => (
                    <li key={c.code}>
                      <a
                        href={localePath("/", c.code, defaultLocaleFor(c.code))}
                        target="_blank"
                        rel="noopener"
                        className="-mx-3 flex items-center gap-3 rounded-lg px-3 py-2 text-[15px] text-v2-muted-dark transition-colors hover:bg-v2-bg hover:text-yef-primary"
                      >
                        <span
                          aria-hidden="true"
                          className="w-6 shrink-0 text-base leading-none"
                        >
                          {flag(c.code)}
                        </span>
                        <span>{countryName(c, locale)}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
