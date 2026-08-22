"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { chapters } from "@/lib/chapters";

export default function ChapterMap() {
  const [selectedId, setSelectedId] = useState(chapters[0].id);
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("All");
  const [city, setCity] = useState("All");

  const countries = useMemo(
    () => ["All", ...Array.from(new Set(chapters.map((c) => c.country)))],
    [],
  );

  const cities = useMemo(() => {
    const pool =
      country === "All"
        ? chapters
        : chapters.filter((c) => c.country === country);
    return ["All", ...Array.from(new Set(pool.map((c) => c.city)))];
  }, [country]);

  const filtered = chapters.filter((chapter) => {
    const matchesQuery = `${chapter.name} ${chapter.country} ${chapter.city}`
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchesCountry = country === "All" || chapter.country === country;
    const matchesCity = city === "All" || chapter.city === city;
    return matchesQuery && matchesCountry && matchesCity;
  });

  const selected =
    chapters.find((chapter) => chapter.id === selectedId) ?? filtered[0];

  return (
    <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-v2-border lg:grid-cols-[380px_1fr]">
      <div className="max-h-[640px] overflow-y-auto border-b border-v2-border bg-white lg:max-h-[640px] lg:border-b-0 lg:border-r">
        <div className="sticky top-0 z-10 space-y-3 border-b border-v2-border bg-white p-4">
          <label className="sr-only" htmlFor="chapter-search">
            Search chapters
          </label>
          <input
            id="chapter-search"
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search chapters"
            className="w-full rounded-full border border-v2-border px-4 py-2.5 text-sm text-v2-navy placeholder:text-v2-muted focus:border-v2-accent focus:outline-none"
          />

          <div className="grid grid-cols-2 gap-2">
            <label className="block">
              <span className="sr-only">Country</span>
              <select
                value={country}
                onChange={(event) => {
                  setCountry(event.target.value);
                  setCity("All");
                }}
                className="w-full rounded-full border border-v2-border bg-white px-3 py-2 text-[13px] text-v2-navy focus:border-v2-accent focus:outline-none"
              >
                {countries.map((option) => (
                  <option key={option} value={option}>
                    {option === "All" ? "All Countries" : option}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="sr-only">City</span>
              <select
                value={city}
                onChange={(event) => setCity(event.target.value)}
                className="w-full rounded-full border border-v2-border bg-white px-3 py-2 text-[13px] text-v2-navy focus:border-v2-accent focus:outline-none"
              >
                {cities.map((option) => (
                  <option key={option} value={option}>
                    {option === "All" ? "All Cities" : option}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <p className="text-sm text-v2-muted">
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
          {filtered.length === 0 && (
            <li className="p-6 text-center text-sm text-v2-muted">
              No chapters match that search.
            </li>
          )}
        </ul>
      </div>

      <div className="relative min-h-[420px] lg:min-h-[640px]">
        {selected ? (
          <iframe
            key={selected.id}
            title={`Map showing ${selected.name}`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(selected.address)}&output=embed`}
            className="absolute inset-0 size-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-v2-bg text-sm text-v2-muted">
            Select a chapter to see it on the map.
          </div>
        )}

        {selected && (
          <div className="pointer-events-none absolute bottom-4 left-4 right-4 max-w-sm sm:right-auto">
            <div className="pointer-events-auto rounded-2xl bg-white p-5 shadow-xl">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-xs text-v2-muted tracking-[1.5px] uppercase">
                    {selected.country}
                  </p>
                  <p className="mt-1 font-display font-bold text-xl text-v2-navy">
                    {selected.name}
                  </p>
                </div>
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
                  <p className="text-[12.5px] text-v2-muted">
                    {selected.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
