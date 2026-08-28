"use client";

import Link from "@/components/ui/LocaleLink";
import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import { useT } from "@/lib/i18n/client";

const chips = [
  "United States",
  "Korea",
  "Hong Kong",
  "Burundi",
  "Tonga",
  "Ethiopia",
];

export default function FindYourCampus() {
  const t = useT();
  const [active, setActive] = useState(chips[0]);

  return (
    <section id="find-your-campus" className="font-body bg-v2-bg scroll-mt-24">
      {/* 1920x389 frame: a 1440 column at x=240, y=110, 248 tall. */}
      <div className="mx-auto max-w-[1440px] px-6 py-24 text-center sm:px-10 lg:pt-[110px] lg:pb-[41px] 2xl:px-0">
        <Reveal>
          <h2 className="font-display font-bold text-4xl text-v2-navy tracking-[-0.4px] sm:text-5xl lg:text-[58px]">
            {t("Find Your")}{" "}
            <span className="font-instrument-serif font-normal italic text-v2-accent">
              {t("Campus")}
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-[560px] text-v2-muted-dark leading-[1.7]">
            {t(
              "Our mission begins on the university campus, where students live, learn, and form the convictions that shape their lives. Find a YEF chapter or fellowship near you.",
            )}
          </p>
        </Reveal>

        <Reveal
          delay={150}
          className="mt-6 flex flex-wrap items-center justify-center gap-3"
        >
          {chips.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => setActive(chip)}
              className={`rounded-full px-7.5 py-3.5 font-medium text-[13.5px] transition-all duration-200 hover:scale-105 ${
                chip === active
                  ? "bg-v2-navy text-v2-bg"
                  : "border border-v2-navy/13 text-v2-navy hover:border-v2-navy"
              }`}
            >
              {t(chip)}
            </button>
          ))}
          <Link
            href="/network"
            className="rounded-full border border-v2-navy/13 px-7.5 py-3.5 font-medium text-[13.5px] text-v2-navy transition-all duration-200 hover:scale-105 hover:border-v2-navy"
          >
            {t("All Chapters →")}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
