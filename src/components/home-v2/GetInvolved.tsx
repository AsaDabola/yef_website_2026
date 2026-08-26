"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import HoverGroup from "@/components/ui/HoverGroup";
import Reveal from "@/components/ui/Reveal";
import { useT } from "@/lib/i18n/client";

const CARD_GAP = 26;
/** How long a card holds before the row moves on. */
const ROTATE_INTERVAL = 5000;

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
    image: "/images/home-v2/get-involved-mission-trip-cross-map.jpg",
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
  const t = useT();
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

  /** One card plus its gap — what the row moves by. */
  const pitchOf = (el: HTMLElement) => {
    const first = el.firstElementChild as HTMLElement | null;
    return first ? first.offsetWidth + CARD_GAP : el.clientWidth;
  };

  // The arrows page by however many cards are on screen, so a slide never
  // comes to rest half out of view.
  const page = useCallback((direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const pitch = pitchOf(el);
    const perView = Math.max(1, Math.floor(el.clientWidth / pitch));
    el.scrollBy({ left: direction * pitch * perView, behavior: "smooth" });
  }, []);

  /**
   * Rotates on its own, a card at a time, wrapping back to the first once the
   * end is reached. It holds while the pointer is over the row or a card has
   * keyboard focus, so it never moves out from under someone reading or
   * tabbing through, and it does not run at all for a reader who has asked
   * for reduced motion.
   */
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let held = false;
    const hold = () => {
      held = true;
    };
    const release = () => {
      held = false;
    };

    const timer = setInterval(() => {
      if (held) return;
      const end = el.scrollLeft >= el.scrollWidth - el.clientWidth - 1;
      // A card at a time on its own, rather than the arrows' whole page —
      // the row drifts instead of jumping.
      if (end) el.scrollTo({ left: 0, behavior: "smooth" });
      else el.scrollBy({ left: pitchOf(el), behavior: "smooth" });
    }, ROTATE_INTERVAL);

    el.addEventListener("pointerenter", hold);
    el.addEventListener("pointerleave", release);
    el.addEventListener("focusin", hold);
    el.addEventListener("focusout", release);
    return () => {
      clearInterval(timer);
      el.removeEventListener("pointerenter", hold);
      el.removeEventListener("pointerleave", release);
      el.removeEventListener("focusin", hold);
      el.removeEventListener("focusout", release);
    };
  }, []);

  return (
    <section className="font-body bg-white">
      {/* A gutter at every width — the row used to run to the viewport
          edge below 1440, leaving the first and last cards flush against it. */}
      <div className="mx-auto max-w-[1440px] px-6 py-24 sm:px-10 lg:px-12 lg:py-[130px]">
        <Reveal className="flex items-end justify-between">
          <div>
            <p className="font-semibold text-[11px] text-v2-muted tracking-[2.42px] uppercase">
              {t("Get Involved")}
            </p>
            <h2 className="mt-4 font-display font-bold text-4xl text-v2-navy tracking-[-1.45px] sm:text-5xl lg:text-[58px] lg:leading-[55.1px]">
              {t("Join the Movement")}
            </h2>
          </div>
          <div className="hidden gap-0 sm:flex">
            <button
              type="button"
              onClick={() => page(-1)}
              disabled={atStart}
              aria-label={t("Previous ways to get involved")}
              className="flex size-[50px] items-center justify-center rounded-full border border-[rgba(0,42,85,0.13)] text-[15px] text-black transition-opacity disabled:opacity-35"
            >
              &larr;
            </button>
            <button
              type="button"
              onClick={() => page(1)}
              disabled={atEnd}
              aria-label={t("More ways to get involved")}
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
            itemClassName="w-[74%] shrink-0 snap-start sm:w-[43%] lg:w-[26%]"
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
                    {t("Video")}
                  </span>
                </div>
                <p className="mt-[22px] font-normal text-[11px] text-v2-muted tracking-[1.98px] uppercase">
                  {t(card.tag)}
                </p>
                <h3 className="mt-2.5 font-display font-bold text-[25px] text-v2-navy leading-[23.75px] tracking-[-0.625px]">
                  {t(card.title)}
                </h3>
                <p className="mt-3 text-[14.5px] text-[#4a6076] leading-[24.65px]">
                  {t(card.body)}
                </p>
              </div>
            ))}
          </HoverGroup>
        </Reveal>
      </div>
    </section>
  );
}
