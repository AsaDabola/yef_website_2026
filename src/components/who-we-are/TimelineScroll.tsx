"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Draws the timeline's rail as the reader scrolls.
 *
 * The rail is two lines stacked: a faint full-height track, and a coloured
 * fill whose height follows the scroll position. Each entry underneath is
 * revealed as it reaches the fill, and its dot lights up with it — so the line
 * appears to be drawing the history as you read down it.
 *
 * The entries themselves stay server-rendered; this only measures them and
 * toggles a class, so none of the translated copy moves to the client.
 */
export default function TimelineScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [fill, setFill] = useState(0);
  // The hidden-until-revealed state is scoped to this class, which only
  // appears once the effect has run. Without it a reader with no JavaScript
  // would get an empty timeline rather than a plain one.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const entries = Array.from(
      root.querySelectorAll<HTMLElement>("[data-timeline-entry]"),
    );
    setReady(true);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setFill(100);
      for (const el of entries) el.classList.add("is-active");
      return;
    }

    let frame = 0;
    const measure = () => {
      frame = 0;
      const box = root.getBoundingClientRect();
      // The rail fills to wherever the reader's eye is, a little above the
      // middle of the window.
      const line = window.innerHeight * 0.55;
      const progress = (line - box.top) / box.height;
      setFill(Math.min(100, Math.max(0, progress * 100)));

      for (const el of entries) {
        const dot = el.getBoundingClientRect().top + 12;
        el.classList.toggle("is-active", dot < line);
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className={`relative mt-16 ${ready ? "yef-timeline-ready" : ""}`}
      ref={ref}
    >
      <div
        aria-hidden="true"
        className="absolute top-0 bottom-0 left-4 w-px bg-black/12 sm:left-1/2 sm:-translate-x-1/2"
      />
      <div
        aria-hidden="true"
        className="absolute top-0 left-4 w-px bg-gradient-to-b from-yef-primary to-v2-accent transition-[height] duration-150 ease-out sm:left-1/2 sm:-translate-x-1/2"
        style={{ height: `${fill}%` }}
      />
      {children}
    </div>
  );
}
