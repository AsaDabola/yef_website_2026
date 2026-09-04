import { getT } from "@/lib/i18n/server";
import { backgroundClasses, type BackgroundValue } from "@/components/generic/background";

export default async function GenericList({
  eyebrow,
  heading,
  items,
  background,
}: {
  eyebrow?: string;
  heading?: string;
  items: string[];
  background?: BackgroundValue;
}) {
  const t = await getT();
  const bg = backgroundClasses(background);
  return (
    <section className={`${bg.section} px-6 py-16 lg:py-20`}>
      <div className="mx-auto max-w-[1126px]">
        {eyebrow ? (
          <p className={`font-semibold text-sm uppercase tracking-[1.6px] ${bg.eyebrow}`}>
            {t(eyebrow)}
          </p>
        ) : null}
        {heading ? (
          <h2
            className={`mt-3 font-display font-bold text-3xl tracking-[-0.64px] sm:text-4xl ${bg.heading}`}
          >
            {t(heading)}
          </h2>
        ) : null}
        <ul
          className={`list-disc space-y-3 pl-6 text-[17px] leading-[27px] ${bg.body} ${heading || eyebrow ? "mt-8" : ""}`}
        >
          {items.map((item) => (
            <li key={item}>{t(item)}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
