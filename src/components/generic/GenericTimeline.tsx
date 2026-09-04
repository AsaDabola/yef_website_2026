import { getT } from "@/lib/i18n/server";
import { backgroundClasses, type BackgroundValue } from "@/components/generic/background";

export default async function GenericTimeline({
  eyebrow,
  heading,
  items,
  background,
}: {
  eyebrow?: string;
  heading?: string;
  items: { year: string; title?: string; body: string }[];
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
        <div
          className={`space-y-12 border-l-2 pl-8 ${bg.dark ? "border-white/30" : "border-yef-primary/20"} ${heading || eyebrow ? "mt-12" : ""}`}
        >
          {items.map((item) => (
            <div key={`${item.year}-${item.title ?? item.body}`} className="relative">
              <span
                className={`-left-[41px] absolute top-1 size-4 rounded-full border-4 bg-yef-primary ${bg.dark ? "border-v2-navy" : "border-white"}`}
              />
              <p className="font-bold text-sm text-yef-primary tracking-[1.2px]">
                {t(item.year)}
              </p>
              {item.title ? (
                <p className={`mt-1 font-display font-semibold text-xl ${bg.heading}`}>
                  {t(item.title)}
                </p>
              ) : null}
              <p className={`mt-2 text-base leading-[27px] ${bg.body}`}>{t(item.body)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
