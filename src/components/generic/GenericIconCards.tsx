"use client";

import Image from "next/image";
import { useT } from "@/lib/i18n/client";
import { backgroundClasses, type BackgroundValue } from "@/components/generic/background";

export default function GenericIconCards({
  eyebrow,
  heading,
  cards,
  background,
}: {
  eyebrow?: string;
  heading?: string;
  cards: { icon?: string; title: string; body: string }[];
  background?: BackgroundValue;
}) {
  const t = useT();
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
        <div
          className={`flex gap-6 overflow-x-auto pb-4 ${heading || eyebrow ? "mt-10" : ""}`}
        >
          {cards.map((card) => (
            <div
              key={card.title}
              className="w-[240px] shrink-0 rounded-2xl border border-v2-border bg-white p-6"
            >
              {card.icon ? (
                <Image src={card.icon} alt="" width={32} height={32} aria-hidden="true" />
              ) : null}
              <h3 className="mt-4 font-display font-semibold text-black text-lg">
                {t(card.title)}
              </h3>
              <p className="mt-2 text-[#4b5565] text-sm leading-[22px]">{t(card.body)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
