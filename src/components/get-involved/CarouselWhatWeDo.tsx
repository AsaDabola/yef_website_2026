"use client";

import { useRef } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { useT } from "@/lib/i18n/client";

const cards = [
  {
    title: "The Four Spiritual Laws",
    body: "Discover the essential message of the Gospel—God’s love, our need for salvation, and faith in Jesus Christ.",
    icon: "/images/icons/icon-four-spiritual-laws.svg",
  },
  {
    title: "Romans",
    body: "Explore the Gospel, God’s righteousness, and new life through faith in Jesus Christ.",
    icon: "/images/icons/icon-romans.svg",
  },
  {
    title: "The Way of the Cross",
    body: "Discipleship.",
    icon: "/images/icons/icon-way-of-the-cross.svg",
  },
  {
    title: "The Way of Faith",
    body: "Walk through the foundations of faith—repentance, assurance, and daily trust in the God who keeps His promises.",
    icon: "/images/icons/icon-christ.svg",
  },
  {
    title: "Galatians",
    body: "Stand firm in the freedom Christ won, and learn to live by the Spirit rather than by the law.",
    icon: "/images/icons/icon-romans.svg",
  },
  {
    title: "Acts",
    body: "Follow the early church as the Gospel spreads from Jerusalem to the ends of the earth.",
    icon: "/images/icons/icon-church.svg",
  },
  {
    title: "1 & 2 Corinthians",
    body: "Learn what it means to live as the church—in unity, in love, and in the sufficiency of God’s grace.",
    icon: "/images/icons/icon-romans.svg",
  },
  {
    title: "The Sermon on the Mount",
    body: "Sit under the teaching of Jesus and see what life in the kingdom of God is meant to look like.",
    icon: "/images/icons/icon-four-spiritual-laws.svg",
  },
  {
    title: "Providing Education",
    body: "Each student receives Biblical and practical training, empowering them to reach their dreams and become thriving disciples.",
    icon: "/images/icons/icon-providing-education.svg",
  },
];

export default function CarouselWhatWeDo() {
  const t = useT();
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: 1 | -1) => {
    scrollerRef.current?.scrollBy({
      left: direction * 426,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="what-we-do"
      className="scroll-mt-32 border-t border-black/10 py-16"
    >
      <Reveal>
        <h2 className="font-display font-extrabold text-3xl text-v2-navy tracking-[-0.5px] sm:text-4xl">
          {t("What We Do")}
        </h2>
      </Reveal>

      <Reveal delay={120}>
        <div
          ref={scrollerRef}
          className="mt-10 flex snap-x snap-mandatory gap-8 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {cards.map((card) => (
            <div
              key={card.title}
              className="w-[280px] shrink-0 snap-start rounded-[16px] border border-[#dcdfe5] bg-[#f6f7f9] p-6 transition-transform duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] sm:w-[394px]"
            >
              <div className="flex h-[56px] w-[40px] items-start justify-center rounded-[16px] bg-white pt-4">
                <Image
                  src={card.icon}
                  alt=""
                  width={24}
                  height={24}
                  aria-hidden="true"
                />
              </div>
              <p className="mt-[64px] font-semibold text-[22.7px] text-black leading-[30px]">
                {t(card.title)}
              </p>
              <p className="mt-[7px] text-[15.3px] text-[#4b5565] leading-[24px]">
                {t(card.body)}
              </p>
            </div>
          ))}
        </div>
      </Reveal>

      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          aria-label={t("Previous")}
          className="flex size-[46px] items-center justify-center rounded-full border border-[#d0d5dc] bg-white transition-colors hover:border-v2-navy"
        >
          <Image
            src="/images/icons/icon-chevron-left.svg"
            alt=""
            width={20}
            height={20}
            aria-hidden="true"
          />
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          aria-label={t("Next")}
          className="flex size-[46px] items-center justify-center rounded-full border border-[#8996a7] bg-white transition-colors hover:border-v2-navy"
        >
          <Image
            src="/images/icons/icon-chevron-right.svg"
            alt=""
            width={20}
            height={20}
            aria-hidden="true"
          />
        </button>
      </div>
    </section>
  );
}
