"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { chapters } from "@/lib/chapters";
import { useT } from "@/lib/i18n/client";

/** Marks each row in the list, standing in for the thumbnails. */
function PinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ChapterMapContent() {
  const t = useT();
  const searchParams = useSearchParams();
  const countryParam = searchParams.get("country");
  const cityParam = searchParams.get("city");
  const chapterParam = searchParams.get("chapter");

  const [selectedId, setSelectedId] = useState(chapters[0].id);
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("All");
  const [city, setCity] = useState("All");

  const countries = useMemo(
    () => ["All", ...Array.from(new Set(chapters.map((c) => c.country)))],
    [],
  );

  useEffect(() => {
    if (countryParam) {
      const matchedCountry = countries.find(
        (c) => c.toLowerCase() === countryParam.toLowerCase(),
      );
      if (matchedCountry) {
        setCountry(matchedCountry);
        const match = chapters.find(
          (c) => c.country.toLowerCase() === countryParam.toLowerCase(),
        );
        if (match) setSelectedId(match.id);
      }
    }
    if (cityParam) {
      setCity(cityParam);
    }
    if (chapterParam) {
      const match = chapters.find(
        (c) =>
          c.id === chapterParam ||
          c.name.toLowerCase().includes(chapterParam.toLowerCase()),
      );
      if (match) {
        setSelectedId(match.id);
        setCountry(match.country);
      }
    }
  }, [countryParam, cityParam, chapterParam, countries]);

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
            {t("Search chapters")}
          </label>
          <input
            id="chapter-search"
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t("Search chapters")}
            className="w-full rounded-full border border-v2-border px-4 py-2.5 text-sm text-v2-navy placeholder:text-v2-muted focus:border-v2-accent focus:outline-none"
          />

          <div className="grid grid-cols-2 gap-2">
            <label className="block">
              <span className="sr-only">{t("Country")}</span>
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
                    {option === "All" ? t("All Countries") : option}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="sr-only">{t("City")}</span>
              <select
                value={city}
                onChange={(event) => setCity(event.target.value)}
                className="w-full rounded-full border border-v2-border bg-white px-3 py-2 text-[13px] text-v2-navy focus:border-v2-accent focus:outline-none"
              >
                {cities.map((option) => (
                  <option key={option} value={option}>
                    {option === "All" ? t("All Cities") : option}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <p className="text-sm text-v2-muted">
            {t(
              filtered.length === 1
                ? "Showing {count} chapter"
                : "Showing {count} chapters",
            ).replace("{count}", String(filtered.length))}
          </p>
        </div>

        <ul>
          {filtered.map((chapter) => (
            <li key={chapter.id} className="border-b border-v2-border">
              <button
                type="button"
                onClick={() => setSelectedId(chapter.id)}
                className={`flex w-full items-start gap-3 p-4 text-left transition-colors ${
                  chapter.id === selectedId ? "bg-v2-bg" : "hover:bg-v2-bg/60"
                }`}
              >
                <PinIcon
                  className={`mt-0.5 size-4 shrink-0 ${
                    chapter.id === selectedId
                      ? "text-v2-accent"
                      : "text-v2-muted"
                  }`}
                />
                <div className="min-w-0">
                  <p className="font-semibold text-v2-navy">
                    {t(chapter.name)}
                  </p>
                  <p className="truncate text-[13px] text-v2-muted">
                    {chapter.address}
                  </p>
                </div>
              </button>
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="p-6 text-center text-sm text-v2-muted">
              {t("No chapters match that search.")}
            </li>
          )}
        </ul>
      </div>

      <div className="relative min-h-[420px] lg:min-h-[640px]">
        {selected ? (
          <iframe
            key={selected.id}
            title={`Map showing ${selected.name}`}
            src={`https://www.google.com/maps?q=${selected.lat},${selected.lng}&z=16&output=embed`}
            className="absolute inset-0 size-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-v2-bg text-sm text-v2-muted">
            {t("Select a chapter to see it on the map.")}
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
                    {t(selected.name)}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-sm text-v2-muted-dark">
                {selected.address}
              </p>
              <div className="mt-4 flex items-center gap-3 border-t border-v2-border pt-4">
                <div>
                  <p className="font-semibold text-[14.5px] text-v2-navy">
                    {selected.leader}
                  </p>
                  <p className="text-[12.5px] text-v2-muted">
                    {t(selected.role)}
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

export default function ChapterMap() {
  return (
    <Suspense
      fallback={
        <div className="h-[640px] w-full animate-pulse rounded-2xl bg-v2-bg" />
      }
    >
      <ChapterMapContent />
    </Suspense>
  );
}

