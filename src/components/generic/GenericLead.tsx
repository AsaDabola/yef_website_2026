import { getT } from "@/lib/i18n/server";
import { backgroundClasses, type BackgroundValue } from "@/components/generic/background";

/**
 * The large opening paragraph a Who We Are page leads with. "medium" is Our
 * Mission's setting, which runs a little smaller than Welcome's and carries
 * the highlighted name in front of it.
 */
export default async function GenericLead({
  highlight,
  body,
  size = "large",
  background,
}: {
  highlight?: string;
  body: string;
  size?: "large" | "medium";
  background?: BackgroundValue;
}) {
  const t = await getT();
  const bg = backgroundClasses(background);

  const sizing =
    size === "medium"
      ? "mt-8 max-w-[815px] text-[26px] leading-[36px] lg:text-[32.8px] lg:leading-[44.2px]"
      : "mt-6 max-w-2xl font-normal text-3xl sm:text-4xl";

  return (
    <section className={bg.section}>
      <p className={`${sizing} ${bg.heading}`}>
        {highlight ? (
          <span className="text-yef-primary">{t(highlight)} </span>
        ) : null}
        {t(body)}
      </p>
    </section>
  );
}
