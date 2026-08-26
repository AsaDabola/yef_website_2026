"use client";

import Image from "next/image";
import Link from "@/components/ui/LocaleLink";
import { useEffect, useState } from "react";
import HeaderV2 from "./HeaderV2";
import { useT } from "@/lib/i18n/client";
import SiteName from "@/components/ui/SiteName";

export type HeroSlide = {
  image: string;
  alt: string;
  heading: string;
  body: string;
};

const defaultSlides: HeroSlide[] = [
  {
    image: "/images/home-v2/hero-headquarters.webp",
    alt: "Youth Evangelical Fellowship headquarters building",
    heading: "Join Us\nToday",
    body: "Be part of YEF, Become True Disciples of Christ.",
  },
  {
    image: "/images/home-v2/slide-2-students.png",
    alt: "Students smiling together on a mission trip",
    heading: "Grow Together\nin Christ.",
    body: "Join YEF Campus Chapter, Fellowship in Christ",
  },
  {
    image: "/images/home-v2/hero-fire.png",
    alt: "Youth gathered around a bonfire at dusk",
    heading: "To Know Christ.\nTo Make Him Known.",
    body: "For we do not preach ourselves but Jesus Christ as Lord",
  },
];

const SLIDE_DURATION = 6500;

export default function Hero({ slides: fromCms }: { slides?: HeroSlide[] }) {
  const slides = fromCms?.length ? fromCms : defaultSlides;
  const t = useT();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="font-body relative flex min-h-[640px] items-center overflow-hidden bg-v2-navy lg:min-h-screen">
      {slides.map((slide, index) => (
        <div
          key={slide.image}
          aria-hidden={index !== active}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === active ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-black/50" />
          {/* The copy sits in the left column, and a bright slide leaves the
              white heading barely legible against it, so shade that side. */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent" />
        </div>
      ))}

      <HeaderV2 />

      <div className="relative z-10 mx-auto w-full max-w-[1920px] px-6 pb-24 pt-40 sm:px-10 lg:px-19 lg:pb-32">
        <div className="max-w-3xl">
          {slides.map((slide, index) => (
            <div
              key={slide.image}
              className={`transition-opacity duration-1000 ${
                index === active ? "opacity-100" : "absolute inset-0 opacity-0"
              }`}
              aria-hidden={index !== active}
            >
              <h1 className="whitespace-pre-line font-display font-extrabold text-6xl leading-[0.98] tracking-[-2.4px] text-white sm:text-7xl lg:text-8xl">
                {t(slide.heading)}
              </h1>
              <p className="mt-8 max-w-lg text-lg text-white/85 leading-relaxed">
                {t(slide.body)}
              </p>
              <Link
                href="/who-we-are"
                className="mt-10 inline-flex items-center justify-center rounded-full border border-white/55 px-8 py-4 font-semibold text-xs tracking-[1.92px] text-white transition-colors hover:bg-white hover:text-v2-navy"
              >
                {t("LEARN MORE")}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-16 flex items-center gap-3">
          {slides.map((slide, index) => (
            <button
              key={slide.image}
              type="button"
              aria-label={`Show slide ${index + 1}`}
              onClick={() => setActive(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === active ? "w-8 bg-white" : "w-1.5 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      <p className="absolute bottom-10 left-1/2 -translate-x-1/2 text-xs tracking-[2.2px] text-white/80 uppercase">
        <SiteName />
      </p>
    </section>
  );
}
