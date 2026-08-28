"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { useT } from "@/lib/i18n/client";

const cards = [
  {
    title: "Bible Studies",
    body: "Weekly Bible studies — one-on-one or in small groups — where students open Scripture together and learn to feed themselves on the Word.",
    icon: "/images/icons/icon-four-spiritual-laws.svg",
  },
  {
    title: "Discipleship Training",
    body: "Mentoring students through God's Word phase by phase, so they grow from being cared for into someone who can care for others.",
    icon: "/images/icons/icon-way-of-the-cross.svg",
  },
  {
    title: "Campus Evangelism",
    body: "Equipping students to share the Gospel with their fellow students, right where they already are.",
    icon: "/images/icons/icon-romans.svg",
  },
  {
    title: "Summer Training",
    body: "A season set apart each year for students from around the world to train in the Word, build fellowship, and put mission into practice.",
    icon: "/images/icons/icon-christ.svg",
  },
  {
    title: "Short-term Mission",
    body: "Sending teams of students to evangelize, disciple, and serve local churches during school breaks — near and far.",
    icon: "/images/icons/icon-church.svg",
  },
  {
    title: "Leadership Training",
    body: "Forming students who've grown through discipleship into teachers and missionaries who can lead and shepherd others.",
    icon: "/images/icons/icon-providing-education.svg",
  },
  {
    title: "Volunteering",
    body: "Everyday gifts — administration, hospitality, media, prayer, and more — put to work building the ministry in a local chapter.",
    icon: "/images/icons/icon-child.svg",
  },
  {
    title: "Internship",
    body: "Hands-on ministry experience and mentorship at YEF HQ, for members ready to carry what they've learned back to their campus.",
    icon: "/images/icons/icon-providing-education.svg",
  },
  {
    title: "Chapter Affiliation",
    body: "Connecting a campus or church fellowship to YEF's wider network of chapters, resources, and leadership.",
    icon: "/images/icons/icon-church.svg",
  },
];

export default function CarouselWhatWeDo() {
  const t = useT();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  /** A little slack so sub-pixel scroll positions don't leave a button
   *  looking enabled when there's nowhere left to scroll. */
  const updateScrollState = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanScrollPrev(el.scrollLeft > 4);
    setCanScrollNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateScrollState();
    const el = scrollerRef.current;
    if (!el) return;
    const onResize = () => updateScrollState();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

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
          onScroll={updateScrollState}
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
          disabled={!canScrollPrev}
          aria-label={t("Previous")}
          className={`flex size-[46px] items-center justify-center rounded-full border bg-white transition-colors ${
            canScrollPrev
              ? "border-[#8996a7] hover:border-v2-navy"
              : "cursor-not-allowed border-[#d0d5dc]"
          }`}
        >
          <Image
            src={
              canScrollPrev
                ? "/images/icons/icon-chevron-left-dark.svg"
                : "/images/icons/icon-chevron-left.svg"
            }
            alt=""
            width={20}
            height={20}
            aria-hidden="true"
          />
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          disabled={!canScrollNext}
          aria-label={t("Next")}
          className={`flex size-[46px] items-center justify-center rounded-full border bg-white transition-colors ${
            canScrollNext
              ? "border-[#8996a7] hover:border-v2-navy"
              : "cursor-not-allowed border-[#d0d5dc]"
          }`}
        >
          <Image
            src={
              canScrollNext
                ? "/images/icons/icon-chevron-right.svg"
                : "/images/icons/icon-chevron-right-light.svg"
            }
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
