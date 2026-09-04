import { getT } from "@/lib/i18n/server";
import InfoCard from "@/components/get-involved/InfoCard";
import { backgroundClasses, type BackgroundValue } from "@/components/generic/background";

export default async function GenericCards({
  eyebrow,
  heading,
  cards,
  background,
}: {
  eyebrow?: string;
  heading?: string;
  cards: { title: string; body: string; quote?: string }[];
  background?: BackgroundValue;
}) {
  const t = await getT();
  const bg = backgroundClasses(background);
  return (
    <section className={`${bg.section} px-6 py-16 lg:py-20`}>
      <div className="mx-auto max-w-[1391px]">
        {eyebrow ? (
          <p className={`font-semibold text-sm uppercase tracking-[1.6px] ${bg.eyebrow}`}>
            {t(eyebrow)}
          </p>
        ) : null}
        {heading ? (
          <h2
            className={`mt-3 font-display font-extrabold text-3xl tracking-[-0.8px] sm:text-[46px] sm:leading-[50px] ${bg.heading}`}
          >
            {t(heading)}
          </h2>
        ) : null}
        <div
          className={`grid grid-cols-1 gap-x-8 gap-y-[39px] lg:grid-cols-2 ${heading || eyebrow ? "mt-10 lg:mt-[49px]" : ""}`}
        >
          {cards.map((card) => (
            <InfoCard
              key={card.title}
              className="lg:min-h-[257px]"
              title={t(card.title)}
              body={t(card.body)}
              quote={card.quote ? t(card.quote) : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
