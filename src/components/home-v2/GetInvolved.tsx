"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import HoverGroup from "@/components/ui/HoverGroup";
import Reveal from "@/components/ui/Reveal";
import { useT } from "@/lib/i18n/client";

const CARD_GAP = 26;
/** How fast the row creeps, in pixels per second. */
const DRIFT_SPEED = 34;

const cards = [
  {
    tag: "Ongoing",
    title: "Campus Evangelism",
    body: "Every campus is a mission field — Campus Evangelism exists to ignite that faith right where students already are.",
    image: "/images/home-v2/get-involved-campus-evangelism.webp",
  },
  {
    tag: "Weekly",
    title: "Bible Study",
    body: "Study Scripture personally and together, building a faith firmly grounded in the Gospel.",
    image: "/images/home-v2/get-involved-bible-study.png",
  },
  {
    tag: "By Invitation",
    title: "Leadership Training",
    body: "Learn to teach the Word, care for others, lead fellowship, and make disciples.",
    image: "/images/home-v2/get-involved-leadership-training.png",
  },
  {
    tag: "Each Summer",
    title: "Summer Training",
    body: "Grow through focused Bible study, prayer, fellowship, evangelism, and mission training.",
    image: "/images/home-v2/get-involved-summer-training.png",
  },
  {
    tag: "Each Summer",
    title: "Short-term Mission",
    body: "Three to seven days in the US and Korea. Word, prayer, and long meals with students who came from the other side of the world.",
    image: "/images/home-v2/get-involved-short-term-mission.webp",
  },
  {
    tag: "Growth",
    title: "Discipleship Training",
    body: "A hands-on training to grow as a disciple and step into leadership — becoming a missionary to the campus you already call home.",
    image: "/images/home-v2/get-involved-discipleship-training.webp",
  },
  {
    tag: "Serve",
    title: "Volunteering",
    body: "Show up for one another and your community through small, consistent acts of service.",
    image: "/images/home-v2/get-involved-volunteering.png",
  },
];

export default function GetInvolved() {
  const t = useT();
  const trackRef = useRef<HTMLDivElement>(null);

  /** One card plus its gap — what an arrow press moves by. */
  const pitchOf = (el: HTMLElement) => {
    const first = el.firstElementChild as HTMLElement | null;
    return first ? first.offsetWidth + CARD_GAP : el.clientWidth;
  };

  /**
   * Suppresses the drift for a moment so a smooth scroll can land — the
   * drift writes scrollLeft every frame and would otherwise fight it.
   */
  const nudged = useRef(0);

  const page = useCallback((direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const pitch = pitchOf(el);
    const perView = Math.max(1, Math.floor(el.clientWidth / pitch));
    nudged.current = Date.now() + 700;
    el.scrollBy({ left: direction * pitch * perView, behavior: "smooth" });
  }, []);

  /**
   * Turns continuously rather than stepping card to card: the row creeps at a
   * constant speed and never comes to rest.
   *
   * The cards are rendered twice, so once the drift passes the end of the
   * first copy it can jump back by exactly that distance and land on an
   * identical frame — the seam is invisible and the row reads as endless.
   *
   * It holds while the pointer is over the row or a card has keyboard focus,
   * so it never moves out from under someone reading or tabbing through, and
   * it does not run at all for a reader who has asked for reduced motion.
   */
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let held = false;
    let last = 0;
    let frame = 0;

    const step = (now: number) => {
      const dt = last ? Math.min(now - last, 100) : 0;
      last = now;
      if (!held && Date.now() > nudged.current) {
        el.scrollLeft += (DRIFT_SPEED * dt) / 1000;
      }
      // One lap is the distance from the first card to its duplicate. Half
      // the scroll width is not the same thing — it lands half a gap short,
      // which would jog the row every time it wrapped.
      const first = el.children[0] as HTMLElement | undefined;
      const repeat = el.children[cards.length] as HTMLElement | undefined;
      const lap = first && repeat ? repeat.offsetLeft - first.offsetLeft : 0;
      if (lap > 0 && el.scrollLeft >= lap) el.scrollLeft -= lap;
      frame = requestAnimationFrame(step);
    };

    const hold = () => {
      held = true;
    };
    const release = () => {
      held = false;
    };

    frame = requestAnimationFrame(step);
    el.addEventListener("pointerenter", hold);
    el.addEventListener("pointerleave", release);
    el.addEventListener("focusin", hold);
    el.addEventListener("focusout", release);
    return () => {
      cancelAnimationFrame(frame);
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
              aria-label={t("Previous ways to get involved")}
              className="flex size-[50px] items-center justify-center rounded-full border border-[rgba(0,42,85,0.13)] text-[15px] text-black transition-opacity hover:opacity-70"
            >
              &larr;
            </button>
            <button
              type="button"
              onClick={() => page(1)}
              aria-label={t("More ways to get involved")}
              className="flex size-[50px] items-center justify-center rounded-full border border-[rgba(0,42,85,0.13)] text-[15px] text-black transition-opacity hover:opacity-70"
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
            className="-my-4 mt-9 flex gap-[26px] overflow-x-auto py-4 [-ms-overflow-style:none] [scrollbar-width:none] lg:mt-12 [&::-webkit-scrollbar]:hidden"
            itemClassName="w-[74%] shrink-0 sm:w-[43%] lg:w-[26%]"
          >
            {/* Twice through: the drift wraps at the halfway mark onto an
                identical frame, so the row has no visible seam or end. */}
            {[...cards, ...cards].map((card, index) => (
              <div
                key={`${card.title}-${index}`}
                aria-hidden={index >= cards.length}
              >
                <div className="group relative aspect-[380/507] w-full cursor-pointer overflow-hidden bg-v2-navy">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    // The cards are a share of the row now, not fixed pixels, so the
                    // hint follows suit — it decides which width Next serves.
                    sizes="(min-width: 1024px) 26vw, (min-width: 640px) 43vw, 74vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
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
