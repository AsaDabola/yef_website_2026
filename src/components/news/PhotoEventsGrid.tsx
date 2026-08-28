"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { PhotoEvent } from "@/lib/photoEvents";
import HoverGroup from "@/components/ui/HoverGroup";
import { useT } from "@/lib/i18n/client";

/**
 * A grid of photo batches, each a cover tile with a title. Clicking one opens
 * a lightbox showing every photo in that batch — there is no separate detail
 * page, since a batch carries only images and a title, not an article.
 */
export default function PhotoEventsGrid({ events }: { events: PhotoEvent[] }) {
  const t = useT();
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const openEvent = events.find((event) => event.slug === openSlug) ?? null;

  useEffect(() => {
    if (!openEvent) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenSlug(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openEvent]);

  if (events.length === 0) {
    return (
      <p className="mt-10 text-[15px] text-v2-muted-dark-2">
        {t("No photo batches have been posted yet.")}
      </p>
    );
  }

  return (
    <>
      <HoverGroup className="mt-10 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
        {events.map((event) => (
          <button
            key={event.slug}
            type="button"
            onClick={() => setOpenSlug(event.slug)}
            className="group text-left"
          >
            <div className="relative aspect-[312/234] w-full overflow-hidden rounded-2xl">
              <Image
                src={event.cover}
                alt={event.title}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <span className="absolute right-3 bottom-3 rounded-full bg-black/60 px-3 py-1 font-semibold text-white text-xs">
                {event.photos.length} {t("photos")}
              </span>
            </div>
            <p className="mt-6 font-semibold text-[13px] text-v2-blue">
              {event.date}
            </p>
            <div className="mt-2 flex items-start justify-between gap-3">
              <h3 className="font-display font-bold text-xl text-black leading-snug">
                {t(event.title)}
              </h3>
              <span
                aria-hidden="true"
                className="mt-1 shrink-0 text-xl text-black transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              >
                &#8599;
              </span>
            </div>
          </button>
        ))}
      </HoverGroup>

      {openEvent && (
        <div
          className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-black/90 p-6"
          onClick={() => setOpenSlug(null)}
        >
          <div
            className="mx-auto w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-6 py-6">
              <div>
                <h2 className="font-display font-bold text-2xl text-white">
                  {t(openEvent.title)}
                </h2>
                <p className="mt-1 text-sm text-white/60">{openEvent.date}</p>
              </div>
              <button
                type="button"
                onClick={() => setOpenSlug(null)}
                aria-label={t("Close")}
                className="shrink-0 rounded-full border border-white/30 px-4 py-2 font-semibold text-sm text-white hover:bg-white/10"
              >
                {t("Close")}
              </button>
            </div>
            <div className="grid grid-cols-1 gap-6 pb-12 sm:grid-cols-2 lg:grid-cols-3">
              {openEvent.photos.map((photo, i) => (
                <div key={`${photo.url}-${i}`}>
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-white/5">
                    <Image
                      src={photo.url}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  {photo.caption && (
                    <p className="mt-2 text-sm text-white/70">{photo.caption}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
