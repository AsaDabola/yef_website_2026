import Image from "next/image";
import { getT } from "@/lib/i18n/server";
import Link from "@/components/ui/LocaleLink";
import HoverGroup from "@/components/ui/HoverGroup";
import { backgroundClasses, type BackgroundValue } from "@/components/generic/background";

export default async function GenericLinkCards({
  eyebrow,
  heading,
  cards,
  background,
}: {
  eyebrow?: string;
  heading?: string;
  cards: { image: string; imageAlt?: string; title: string; body?: string; href: string }[];
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
            className={`mt-3 font-display font-bold text-3xl tracking-[-0.64px] sm:text-4xl ${bg.heading}`}
          >
            {t(heading)}
          </h2>
        ) : null}
        <HoverGroup
          className={`grid grid-cols-1 gap-[25px] sm:grid-cols-3 ${heading || eyebrow ? "mt-10" : ""}`}
        >
          {cards.map((card) => (
            <Link key={card.title} href={card.href} className="group block">
              <div className="relative aspect-[431/242] w-full overflow-hidden rounded-2xl">
                <Image
                  src={card.image}
                  alt={t(card.imageAlt || "")}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h3
                className={`mt-6 font-semibold text-[22.6px] leading-[30px] ${bg.heading}`}
              >
                {t(card.title)}
              </h3>
              {card.body ? (
                <p className={`mt-2 text-[15px] leading-[24px] ${bg.body}`}>{t(card.body)}</p>
              ) : null}
            </Link>
          ))}
        </HoverGroup>
      </div>
    </section>
  );
}
