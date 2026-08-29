import { getT } from "@/lib/i18n/server";
import InfoCard from "@/components/get-involved/InfoCard";

export default async function GenericCards({
  eyebrow,
  heading,
  cards,
}: {
  eyebrow?: string;
  heading?: string;
  cards: { title: string; body: string; quote?: string }[];
}) {
  const t = await getT();
  return (
    <section className="mx-auto max-w-[1391px] px-6 py-16 lg:py-20">
      {eyebrow ? (
        <p className="font-semibold text-sm text-yef-primary uppercase tracking-[1.6px]">
          {t(eyebrow)}
        </p>
      ) : null}
      {heading ? (
        <h2 className="mt-3 font-display font-extrabold text-3xl text-black tracking-[-0.8px] sm:text-[46px] sm:leading-[50px]">
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
    </section>
  );
}
