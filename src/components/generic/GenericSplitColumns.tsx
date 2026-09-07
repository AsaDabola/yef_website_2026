import { getT } from "@/lib/i18n/server";
import { backgroundClasses, type BackgroundValue } from "@/components/generic/background";

/**
 * Our Mission's closing section: a blue heading, verse and list on the left,
 * and the paragraphs that answer them on the right. The right-hand column is
 * the part the generic-block conversion dropped altogether, which is why it
 * is a field here rather than something a page is assumed to carry.
 */
export default async function GenericSplitColumns({
  heading,
  quote,
  introBold,
  items = [],
  paragraphs = [],
  background,
}: {
  heading?: string;
  quote?: string;
  introBold?: string;
  items?: string[];
  paragraphs?: { body: string; boldSuffix?: string }[];
  background?: BackgroundValue;
}) {
  const t = await getT();
  const bg = backgroundClasses(background);

  return (
    <section className={bg.section}>
      <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-[6.5%]">
        <div>
          {heading ? (
            <h2 className="max-w-[506px] font-bold text-[26px] text-yef-primary leading-[36px] lg:text-[32.8px] lg:leading-[44.2px]">
              {t(heading)}
            </h2>
          ) : null}
          {quote ? (
            <p className="mt-6 max-w-[482px] text-[20px] text-yef-primary leading-[31px] lg:text-[23.6px] lg:leading-[37.2px]">
              {t(quote)}
            </p>
          ) : null}
          {introBold ? (
            <p className={`mt-12 max-w-[551px] font-bold text-[16.6px] leading-[27.2px] ${bg.heading}`}>
              {t(introBold)}
            </p>
          ) : null}
          {items.length > 0 ? (
            <ul className="mt-8 max-w-[551px] space-y-0 text-[16.6px] text-yef-primary leading-[27.2px]">
              {items.map((item) => (
                <li key={item}>{t(item)}</li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className={`max-w-[596px] space-y-6 text-[19px] leading-[27.2px] ${bg.heading}`}>
          {paragraphs.map((paragraph) => (
            <p key={paragraph.body}>
              {t(paragraph.body)}
              {paragraph.boldSuffix ? (
                <span className="font-semibold">{t(paragraph.boldSuffix)}</span>
              ) : null}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
