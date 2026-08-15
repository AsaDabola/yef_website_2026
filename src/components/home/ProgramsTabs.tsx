"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Tab = {
  id: string;
  label: string;
  heading: string;
  body: string;
  image: string;
  imageAlt: string;
  href: string;
};

const tabs: Tab[] = [
  {
    id: "sharing-the-gospel",
    label: "Sharing the Gospel",
    heading:
      "We join together for the betterment of this world through the Word of God, evangelism, and the deep study of the Word and constant prayer. It is part of the outworking of the love we see on the cross.",
    body: "We join together for the betterment of this world through the Word of God, evangelism, and the deep study of the Word and constant prayer. It is part of the outworking of the love we see on the cross.",
    image:
      "https://www.figma.com/api/mcp/asset/cb08f933-dbb3-4572-9538-ba19d8c1ade5.png",
    imageAlt: "YEF fellowship group in front of a church building",
    href: "/sharing-the-gospel",
  },
  {
    id: "reaching-the-campus",
    label: "Reaching the Campus",
    heading:
      "We go where students already are — dorms, quads, and clubs — building genuine friendships that open the door to the Gospel.",
    body: "Campus chapters host outreach events, Bible studies, and one-on-one discipleship to help students encounter Christ where they live and learn.",
    image:
      "https://www.figma.com/api/mcp/asset/cb08f933-dbb3-4572-9538-ba19d8c1ade5.png",
    imageAlt: "Students fellowshipping on a college campus",
    href: "/reaching-the-campus",
  },
  {
    id: "raising-disciples",
    label: "Raising Disciples",
    heading:
      "We invest in leaders through mentorship, mission trips, and biblical training that shapes character for a lifetime of faithfulness.",
    body: "From summer training to international leadership retreats, YEF walks alongside young believers as they grow into disciples who make disciples.",
    image:
      "https://www.figma.com/api/mcp/asset/cb08f933-dbb3-4572-9538-ba19d8c1ade5.png",
    imageAlt: "YEF leaders training a new generation of disciples",
    href: "/raising-disciples",
  },
];

export default function ProgramsTabs() {
  const [activeId, setActiveId] = useState(tabs[0].id);
  const active = tabs.find((tab) => tab.id === activeId) ?? tabs[0];

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1800px] px-6 py-10 lg:px-16 lg:py-16">
        <div
          role="tablist"
          aria-label="Our programs"
          className="mx-auto flex w-full max-w-3xl flex-wrap justify-center gap-1 rounded-3xl bg-yef-gray-light p-2"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={tab.id === activeId}
              onClick={() => setActiveId(tab.id)}
              className={`flex-1 rounded-2xl px-6 py-4 text-center font-medium text-lg transition-colors sm:text-2xl ${
                tab.id === activeId
                  ? "bg-yef-primary text-white"
                  : "text-yef-navy-deep/60 hover:text-yef-navy-deep"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 items-center gap-10 rounded-3xl bg-gradient-to-br from-yef-primary to-yef-primary-light p-8 lg:grid-cols-2 lg:gap-16 lg:p-16">
          <div>
            <p className="font-normal text-2xl leading-snug text-white sm:text-3xl">
              {active.heading}
            </p>
            <p className="mt-6 font-normal text-lg text-white/80">
              {active.body}
            </p>
            <Link
              href={active.href}
              className="mt-8 inline-flex items-center justify-center rounded-2xl bg-white px-8 py-4 font-semibold text-lg text-yef-primary transition-opacity hover:opacity-90"
            >
              More
            </Link>
          </div>
          <div className="relative aspect-[680/480] w-full overflow-hidden rounded-3xl">
            <Image
              src={active.image}
              alt={active.imageAlt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
