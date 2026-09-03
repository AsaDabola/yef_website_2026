"use client";

import Image from "next/image";
import Link from "@/components/ui/LocaleLink";
import { useState } from "react";
import type { NewsArticle } from "@/lib/news";
import type { PhotoEvent } from "@/lib/photoEvents";
import HoverGroup from "@/components/ui/HoverGroup";
import PhotoEventsGrid from "@/components/news/PhotoEventsGrid";
import { useT } from "@/lib/i18n/client";

const tabs = ["View All", "News", "Photo News"];
const PAGE_SIZE = 12;

/** 1, 2, …, current-1, current, current+1, …, last — never a run of dots
 *  next to the number it would have replaced. */
function pageList(current: number, total: number): (number | "…")[] {
  const pages = new Set([1, total, current - 1, current, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const out: (number | "…")[] = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - (sorted[i - 1] as number) > 1) out.push("…");
    out.push(p);
  });
  return out;
}

export default function NewsGrid({
  posts,
  photoEvents,
}: {
  posts: NewsArticle[];
  photoEvents: PhotoEvent[];
}) {
  const t = useT();
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [page, setPage] = useState(1);

  const filtered =
    activeTab === "View All"
      ? posts
      : posts.filter((article) => article.tag === activeTab);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const articles = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const selectTab = (tab: string) => {
    setActiveTab(tab);
    setPage(1);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-6 border-b border-[#dcdfe5]">
        <div className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => selectTab(tab)}
              className={`border-b-2 pb-3 font-semibold text-[15px] transition-colors ${
                tab === activeTab
                  ? "border-v2-blue text-v2-blue"
                  : "border-transparent text-v2-muted-dark-2 hover:text-v2-navy"
              }`}
            >
              {t(tab)}
            </button>
          ))}
        </div>
        {activeTab !== "Photo News" && (
          <div className="flex gap-3 pb-3 text-sm text-v2-muted-dark-2">
            <span className="flex items-center gap-1.5 rounded-lg border border-v2-border px-4 py-2">
              {t("Newest")}
              <span aria-hidden="true">&#9662;</span>
            </span>
            <span className="flex items-center gap-1.5 rounded-lg border border-v2-border px-4 py-2">
              12
              <span aria-hidden="true">&#9662;</span>
            </span>
          </div>
        )}
      </div>

      {activeTab === "Photo News" ? (
        <PhotoEventsGrid events={photoEvents} />
      ) : (
        <HoverGroup className="mt-10 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/news/${article.slug}`}
              className="group"
            >
              <div className="relative aspect-[312/234] w-full overflow-hidden rounded-2xl">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <p className="mt-6 font-semibold text-[13px] text-v2-blue">
                {t(article.tag)}
              </p>
              <div className="mt-2 flex items-start justify-between gap-3">
                <h3 className="font-display font-bold text-xl text-black leading-snug">
                  {t(article.title)}
                </h3>
                <span
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-xl text-black transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                >
                  &#8599;
                </span>
              </div>
              <p className="mt-3 text-[15px] text-v2-muted-dark-2 leading-relaxed">
                {t(article.excerpt)}
              </p>
            </Link>
          ))}
        </HoverGroup>
      )}

      {activeTab !== "Photo News" && pageCount > 1 && (
        <div className="mt-16 flex items-center justify-between border-t border-v2-border pt-6">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="flex items-center gap-2 font-semibold text-sm text-v2-muted-dark-2 disabled:opacity-40"
          >
            <span aria-hidden="true">&larr;</span> {t("Previous")}
          </button>
          <div className="flex gap-2">
            {pageList(currentPage, pageCount).map((page, i) =>
              page === "…" ? (
                <span
                  key={`gap-${i}`}
                  className="flex size-12 items-center justify-center font-semibold text-v2-muted-dark-2"
                >
                  …
                </span>
              ) : (
                <button
                  key={page}
                  type="button"
                  onClick={() => setPage(page)}
                  className={`flex size-12 items-center justify-center rounded-lg border font-semibold text-v2-blue ${
                    page === currentPage
                      ? "border-v2-blue bg-[#eff5ff]"
                      : "border-transparent"
                  }`}
                >
                  {page}
                </button>
              ),
            )}
          </div>
          <button
            type="button"
            disabled={currentPage === pageCount}
            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
            className="flex items-center gap-2 font-semibold text-sm text-v2-navy disabled:opacity-40"
          >
            {t("Next")} <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      )}
    </div>
  );
}
