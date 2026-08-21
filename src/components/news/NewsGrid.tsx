"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { newsArticles } from "@/lib/news";
import HoverGroup from "@/components/ui/HoverGroup";

const tabs = ["View All", "News", "Story", "Event"];

export default function NewsGrid() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const articles =
    activeTab === "View All"
      ? newsArticles
      : newsArticles.filter((article) => article.tag === activeTab);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-6 border-b border-[#dcdfe5]">
        <div className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`border-b-2 pb-3 font-semibold text-[15px] transition-colors ${
                tab === activeTab
                  ? "border-v2-blue text-v2-blue"
                  : "border-transparent text-v2-muted-dark-2 hover:text-v2-navy"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex gap-3 pb-3 text-sm text-v2-muted-dark-2">
          <span className="flex items-center gap-1.5 rounded-lg border border-v2-border px-4 py-2">
            Newest
            <span aria-hidden="true">&#9662;</span>
          </span>
          <span className="flex items-center gap-1.5 rounded-lg border border-v2-border px-4 py-2">
            12
            <span aria-hidden="true">&#9662;</span>
          </span>
        </div>
      </div>

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
              <div className="absolute inset-0 bg-v2-accent/0 transition-colors duration-300 group-hover:bg-v2-accent/15" />
            </div>
            <p className="mt-6 font-semibold text-[13px] text-v2-blue">
              {article.tag}
            </p>
            <div className="mt-2 flex items-start justify-between gap-3">
              <h3 className="font-display font-bold text-xl text-black leading-snug">
                {article.title}
              </h3>
              <span
                aria-hidden="true"
                className="mt-1 shrink-0 text-xl text-black transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              >
                &#8599;
              </span>
            </div>
            <p className="mt-3 text-[15px] text-v2-muted-dark-2 leading-relaxed">
              {article.excerpt}
            </p>
          </Link>
        ))}
      </HoverGroup>

      <div className="mt-16 flex items-center justify-between border-t border-v2-border pt-6">
        <button
          type="button"
          className="flex items-center gap-2 font-semibold text-sm text-v2-muted-dark-2"
        >
          <span aria-hidden="true">&larr;</span> Previous
        </button>
        <div className="flex gap-2">
          {["1", "2", "…", "32"].map((page) => (
            <span
              key={page}
              className={`flex size-12 items-center justify-center rounded-lg font-semibold text-v2-blue ${
                page === "1"
                  ? "border border-v2-blue bg-[#eff5ff]"
                  : page === "…"
                    ? "text-v2-muted-dark-2"
                    : "border border-transparent"
              }`}
            >
              {page}
            </span>
          ))}
        </div>
        <button
          type="button"
          className="flex items-center gap-2 font-semibold text-sm text-v2-navy"
        >
          Next <span aria-hidden="true">&rarr;</span>
        </button>
      </div>
    </div>
  );
}
