import { getT } from "@/lib/i18n/server";
import { backgroundClasses, type BackgroundValue } from "@/components/generic/background";

export default async function GenericText({
  eyebrow,
  heading,
  paragraphs,
  background,
}: {
  eyebrow?: string;
  heading?: string;
  paragraphs: string[];
  background?: BackgroundValue;
}) {
  const t = await getT();
  const bg = backgroundClasses(background);
  return (
    <section className={`${bg.section} mx-auto px-6 py-16 lg:py-20`}>
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
          className={`space-y-[27px] text-[20px] leading-[27.2px] ${bg.body} ${heading || eyebrow ? "mt-10" : ""}`}
        >
          {paragraphs.map((body) => (
            <p key={body}>{t(body)}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
