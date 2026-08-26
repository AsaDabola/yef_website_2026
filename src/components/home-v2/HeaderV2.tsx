"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "@/components/ui/LocaleLink";
import { CountryPicker, LanguagePicker } from "@/components/i18n/SitePicker";
import { useT } from "@/lib/i18n/client";

const navLinks = [
  { label: "Who we are", href: "/who-we-are" },
  { label: "Get Involved", href: "/get-involved" },
  { label: "News", href: "/news" },
  { label: "Network", href: "/network" },
];

export default function HeaderV2() {
  const t = useT();
  const [open, setOpen] = useState(false);

  return (
    <header className="font-body absolute inset-x-0 top-0 z-30">
      {/* The frame insets the logo 76px from the left and the GIVE button 48px
          from the right, and groups the nav beside GIVE rather than centring
          it between the two. */}
      <div className="mx-auto flex max-w-[1920px] items-center justify-between px-6 py-6 sm:px-10 lg:pr-12 lg:pl-19">
        <Link
          href="/"
          className="relative h-8 w-[88px] shrink-0 sm:h-[60px] sm:w-42"
        >
          <Image
            src="/images/icons/logo-yef-white-compact.svg"
            alt={t("Youth Evangelical Fellowship")}
            fill
            sizes="168px"
            className="object-contain object-left"
            priority
          />
        </Link>

        <div className="flex items-center gap-3 lg:gap-[68px]">
          <nav className="hidden items-center gap-[38px] font-medium text-base text-white/90 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-white"
              >
                {t(link.label)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 lg:flex">
              <CountryPicker />
              <LanguagePicker />
            </div>

            <Link
              href="/donate"
              className="rounded-full border border-white/50 px-3.5 py-1.5 font-semibold text-xs text-white tracking-[1.5px] transition-colors hover:bg-white hover:text-v2-navy sm:px-[26px] sm:py-[11px] sm:text-base sm:tracking-[2.56px]"
            >
              {t("GIVE")}
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={t("Toggle menu")}
              className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/50 text-white lg:hidden"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                className="size-5"
                aria-hidden="true"
              >
                {open ? (
                  <path d="M6 6l12 12M18 6 6 18" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <nav className="fixed inset-x-6 top-[88px] z-40 flex flex-col gap-1 rounded-2xl border border-white/15 bg-v2-navy/95 p-4 font-medium text-base text-white/90 shadow-xl backdrop-blur-sm sm:inset-x-10 lg:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 transition-colors hover:bg-white/10 hover:text-white"
            >
              {t(link.label)}
            </Link>
          ))}
          <div className="mt-2 flex flex-wrap items-center gap-2 border-white/15 border-t pt-3">
            <CountryPicker />
            <LanguagePicker />
          </div>
        </nav>
      )}
    </header>
  );
}
