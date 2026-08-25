"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import HoverGroup from "@/components/ui/HoverGroup";
import Reveal from "@/components/ui/Reveal";

const CARD_GAP = 26;

const cards = [
  {
    tag: "Weekly",
    title: "Bible Study",
    body: "One-on-one and in groups. A teacher meets you where your schedule allows and walks the text with you — no prior background assumed.",
    image: "/images/home-v2/get-involved-bible-study.png",
  },
  {
    tag: "Each Summer",
    title: "Summer Training",
    body: "Three to seven days in the US and Korea. Word, prayer, and long meals with students who came from the other side of the world.",
    image: "/images/home-v2/get-involved-summer-training.png",
  },
  {
    tag: "By Invitation",
    title: "Leadership Training",
    body: "For those who have finished discipleship and are ready to teach. You become a missionary to the campus you already attend.",
    image: "/images/home-v2/get-involved-leadership-training.png",
  },
  {
    tag: "Short Term",
    title: "Mission Trip",
    body: "Local and overseas. The fastest way to learn what mission actually costs — and what it is actually worth.",
    image: "/images/home-v2/get-involved-mission-trip.png",
  },
  {
    tag: "Each Summer",
    title: "Short-term Mission",
    body: "Three to seven days in the US and Korea. Word, prayer, and long meals with students who came from the other side of the world.",
    image: "/images/home-v2/get-involved-short-term-mission.png",
  },
  {
    tag: "By Invitation",
    title: "Discipleship Training",
    body: "For those who have finished discipleship and are ready to teach. You become a missionary to the campus you already attend.",
    image: "/images/home-v2/get-involved-discipleship-training.png",
  },
  {
    tag: "Year Round",
    title: "Volunteering",
    body: "Help build the movement in your local chapter with the talents you already have — video, design, tech, events, and more.",
    image: "/images/home-v2/get-involved-volunteering.png",
  },
];

export default function GetInvolved() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 1);
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [sync]);

  // Page by whole cards so a slide never comes to rest half out of view.
  const page = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const pitch = first ? first.offsetWidth + CARD_GAP : el.clientWidth;
    const perView = Math.max(1, Math.floor(el.clientWidth / pitch));
    el.scrollBy({ left: direction * pitch * perView, behavior: "smooth" });
  };

  return (
    <section className="font-body bg-white">
      <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-0 lg:py-[130px]">
        <Reveal className="flex items-end justify-between">
          <div>
            <p className="font-semibold text-[11px] text-v2-muted tracking-[2.42px] uppercase">
              Get Involved
            </p>
            <h2 className="mt-4 font-display font-bold text-4xl text-v2-navy tracking-[-1.45px] sm:text-5xl lg:text-[58px] lg:leading-[55.1px]">
              Join the Movement
            </h2>
          </div>
          <div className="hidden gap-0 sm:flex">
            <button
              type="button"
              onClick={() => page(-1)}
              disabled={atStart}
              aria-label="Previous ways to get involved"
              className="flex size-[50px] items-center justify-center rounded-full border border-[rgba(0,42,85,0.13)] text-[15px] text-black transition-opacity disabled:opacity-35"
            >
              &larr;
            </button>
            <button
              type="button"
              onClick={() => page(1)}
              disabled={atEnd}
              aria-label="More ways to get involved"
              className="flex size-[50px] items-center justify-center rounded-full border border-[rgba(0,42,85,0.13)] text-[15px] text-black transition-opacity disabled:opacity-35"
            >
              &rarr;
            </button>
          </div>
        </Reveal>

        <Reveal delay={120}>
          {/* The negative margin gives the hover lift room to breathe: an
              overflow-x scroller also clips vertically. */}
          <HoverGroup
            ref={trackRef}
            onScroll={sync}
            className="-my-4 mt-9 flex snap-x snap-mandatory gap-[26px] overflow-x-auto py-4 [-ms-overflow-style:none] [scrollbar-width:none] lg:mt-12 [&::-webkit-scrollbar]:hidden"
            itemClassName="w-[260px] shrink-0 snap-start sm:w-[320px] lg:w-[380px]"
          >
            {cards.map((card) => (
              <div key={card.title}>
                <div className="group relative aspect-[380/507] w-full cursor-pointer overflow-hidden bg-v2-navy">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(min-width: 1024px) 380px, (min-width: 640px) 320px, 260px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <span className="absolute bottom-3 left-3 rounded-[3px] bg-black/30 px-2 py-1 font-normal text-[9.5px] text-white/45 tracking-[0.95px] uppercase">
                    Video
                  </span>
                </div>
                <p className="mt-[22px] font-normal text-[11px] text-v2-muted tracking-[1.98px] uppercase">
                  {card.tag}
                </p>
                <h3 className="mt-2.5 font-display font-bold text-[25px] text-v2-navy leading-[23.75px] tracking-[-0.625px]">
                  {card.title}
                </h3>
                <p className="mt-3 text-[14.5px] text-[#4a6076] leading-[24.65px]">
                  {card.body}
                </p>
              </div>
            ))}
          </HoverGroup>
        </Reveal>
      </div>
    </section>
  );
}
