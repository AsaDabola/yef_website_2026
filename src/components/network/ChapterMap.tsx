"use client";

import Image from "next/image";
import { useState } from "react";
import { chapters } from "@/lib/chapters";

export default function ChapterMap() {
  const [selectedId, setSelectedId] = useState(chapters[0].id);
  const [query, setQuery] = useState("");

  const filtered = chapters.filter((chapter) =>
    `${chapter.name} ${chapter.region}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );

  const selected = chapters.find((chapter) => chapter.id === selectedId);

  return (
    <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-v2-border lg:grid-cols-[360px_1fr]">
      <div className="max-h-[640px] overflow-y-auto border-b border-v2-border bg-white lg:max-h-[640px] lg:border-b-0 lg:border-r">
        <div className="sticky top-0 z-10 border-b border-v2-border bg-white p-4">
          <label className="sr-only" htmlFor="chapter-search">
            Search chapters
          </label>
          <input
            id="chapter-search"
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search chapters or regions"
            className="w-full rounded-full border border-v2-border px-4 py-2.5 text-sm text-v2-navy placeholder:text-v2-muted focus:border-v2-accent focus:outline-none"
          />
          <p className="mt-3 text-sm text-v2-muted">
            Showing {filtered.length} chapter{filtered.length === 1 ? "" : "s"}
          </p>
        </div>

        <ul>
          {filtered.map((chapter) => (
            <li key={chapter.id} className="border-b border-v2-border">
              <button
                type="button"
                onClick={() => setSelectedId(chapter.id)}
                className={`flex w-full items-center gap-3 p-4 text-left transition-colors ${
                  chapter.id === selectedId ? "bg-v2-bg" : "hover:bg-v2-bg/60"
                }`}
              >
                <div className="relative size-14 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={chapter.image}
                    alt={chapter.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-v2-navy">{chapter.name}</p>
                  <p className="truncate text-[13px] text-v2-muted">
                    {chapter.address}
                  </p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative min-h-[420px] overflow-hidden bg-v2-navy lg:min-h-[640px]">
        <Image
          src="/images/home-v2/signup-bg.png"
          alt=""
          fill
          sizes="(min-width: 1024px) 65vw, 100vw"
          className="object-cover opacity-45 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-v2-navy/40 via-transparent to-v2-navy/60" />

        {chapters.map((chapter) => {
          const isSelected = chapter.id === selectedId;
          return (
            <button
              key={chapter.id}
              type="button"
              onClick={() => setSelectedId(chapter.id)}
              aria-label={chapter.name}
              style={{ left: `${chapter.position.x}%`, top: `${chapter.position.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-full"
            >
              <span
                className={`block size-4 rounded-full border-2 border-white shadow-md transition-transform duration-200 ${
                  isSelected
                    ? "scale-125 bg-yef-primary"
                    : "bg-v2-accent hover:scale-110"
                }`}
              />
            </button>
          );
        })}

        {selected && (
          <div className="absolute bottom-4 left-4 right-4 max-w-sm rounded-2xl bg-white p-5 shadow-xl sm:right-auto">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-xs text-v2-muted tracking-[1.5px] uppercase">
                  {selected.region}
                </p>
                <p className="mt-1 font-display font-bold text-xl text-v2-navy">
                  {selected.name}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedId("")}
                aria-label="Close"
                className="flex size-8 shrink-0 items-center justify-center rounded-full border border-v2-border text-v2-muted transition-colors hover:border-v2-navy hover:text-v2-navy"
              >
                &times;
              </button>
            </div>
            <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden rounded-xl">
              <Image
                src={selected.image}
                alt={selected.name}
                fill
                sizes="320px"
                className="object-cover"
              />
            </div>
            <p className="mt-4 text-sm text-v2-muted-dark">
              {selected.address}
            </p>
            <div className="mt-4 flex items-center gap-3 border-t border-v2-border pt-4">
              <div className="relative size-10 shrink-0 overflow-hidden rounded-full">
                <Image
                  src={selected.image}
                  alt={selected.leader}
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-[14.5px] text-v2-navy">
                  {selected.leader}
                </p>
                <p className="text-[12.5px] text-v2-muted">{selected.role}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
