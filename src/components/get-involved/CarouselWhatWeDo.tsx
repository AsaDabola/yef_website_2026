"use client";

import { useRef } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

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
    title: "Providing Education",
    body: "Each student receives Biblical and practical training, empowering them to reach their dreams and become thriving disciples.",
    icon: "/images/icons/icon-providing-education.svg",
  },
];

export default function CarouselWhatWeDo() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: 1 | -1) => {
    scrollerRef.current?.scrollBy({
      left: direction * 320,
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
          What We Do
        </h2>
      </Reveal>

      <Reveal delay={120}>
        <div
          ref={scrollerRef}
          className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {cards.map((card) => (
            <div
              key={card.title}
              className="w-[280px] shrink-0 snap-start rounded-2xl border border-v2-border bg-[#f6f7f9] p-6 transition-transform duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02]"
            >
              <div className="flex size-10 items-center justify-center rounded-2xl bg-white">
                <Image
                  src={card.icon}
                  alt=""
                  width={24}
                  height={24}
                  aria-hidden="true"
                />
              </div>
              <p className="mt-8 font-semibold text-lg text-v2-navy">
                {card.title}
              </p>
              <p className="mt-3 text-[15px] text-v2-muted-dark-2 leading-relaxed">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </Reveal>

      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          aria-label="Previous"
          className="flex size-[46px] items-center justify-center rounded-full border border-v2-border bg-white transition-colors hover:border-v2-navy"
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
          aria-label="Next"
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
