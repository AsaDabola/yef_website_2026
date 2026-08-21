"use client";

import Image from "next/image";
import { useRef } from "react";
import HoverGroup from "@/components/ui/HoverGroup";
import Reveal from "@/components/ui/Reveal";

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
    title: "Mission Trips",
    body: "Local and overseas. The fastest way to learn what mission actually costs — and what it is actually worth.",
    image: "/images/home-v2/get-involved-mission-trips.png",
  },
];

export default function GetInvolved() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: direction * 406, behavior: "smooth" });
  };

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1920px] px-6 py-24 sm:px-10 lg:px-19">
        <Reveal className="flex items-end justify-between">
          <div>
            <p className="font-semibold text-[11px] text-v2-muted tracking-[2.42px] uppercase">
              Get Involved
            </p>
            <h2 className="mt-4 font-display font-bold text-4xl text-v2-navy tracking-[-1.45px] sm:text-5xl">
              Four ways in.
            </h2>
          </div>
          <div className="hidden gap-3 sm:flex">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Previous"
              className="flex size-[50px] items-center justify-center rounded-full border border-v2-border text-v2-navy transition-colors hover:border-v2-navy"
            >
              &larr;
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Next"
              className="flex size-[50px] items-center justify-center rounded-full border border-v2-border text-v2-navy transition-colors hover:border-v2-navy"
            >
              &rarr;
            </button>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div
            ref={scrollerRef}
            className="mt-13 overflow-x-auto pb-4 [scrollbar-width:none]"
          >
            <HoverGroup className="flex w-max gap-[26px]">
              {cards.map((card) => (
                <div key={card.title} className="w-[300px] sm:w-[380px]">
                  <div className="group relative aspect-[380/507] w-full cursor-pointer overflow-hidden rounded-xl bg-v2-navy">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      sizes="380px"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-v2-accent/0 transition-colors duration-300 group-hover:bg-v2-accent/25" />
                  </div>
                  <p className="mt-6 font-medium text-[11px] text-v2-muted tracking-[1.98px] uppercase">
                    {card.tag}
                  </p>
                  <h3 className="mt-2 font-display font-bold text-2xl text-v2-navy tracking-[-0.6px]">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-[14.5px] text-v2-muted-dark-2 leading-relaxed">
                    {card.body}
                  </p>
                </div>
              ))}
            </HoverGroup>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
