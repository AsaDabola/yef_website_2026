"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const regions = [
  "US & Canada",
  "CAC",
  "South America",
  "Europe",
  "CIS",
  "MENA",
  "Africa",
  "Oceania",
  "China",
  "Asia Pacific",
  "South Asia",
  "Southeast Asia",
];

const countries = [
  "Australia",
  "Australia",
  "Australia",
  "Australia",
  "Australia",
  "Australia",
];

export default function WorldMap() {
  const [activeRegion, setActiveRegion] = useState("US & Canada");

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1800px] px-6 py-16 lg:px-16 lg:py-20">
        <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-x-8 gap-y-3">
          {regions.map((region) => (
            <button
              key={region}
              type="button"
              onClick={() => setActiveRegion(region)}
              className={`font-bold text-sm transition-colors ${
                region === activeRegion
                  ? "text-[#848484]"
                  : "text-[#4f4f4f] hover:text-yef-primary"
              }`}
            >
              {region}
            </button>
          ))}
        </div>

        <div className="relative mx-auto mt-14 aspect-[1013/507] w-full max-w-4xl">
          <Image
            src="https://www.figma.com/api/mcp/asset/e9cb190b-f739-46e1-a8f9-cd4d39dc3302.png"
            alt="Map of YEF's global network regions"
            fill
            sizes="(min-width: 1024px) 900px, 100vw"
            className="object-contain"
          />
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3">
          {countries.map((country, i) => (
            <Link
              key={`${country}-${i}`}
              href="/network"
              className="rounded-full border-2 border-yef-primary py-3.5 text-center font-bold text-sm uppercase tracking-[2.6px] text-yef-primary transition-colors hover:bg-yef-primary hover:text-white"
            >
              {country}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
