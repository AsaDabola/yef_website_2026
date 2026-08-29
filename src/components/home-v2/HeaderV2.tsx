"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "@/components/ui/LocaleLink";
import { CountryPicker } from "@/components/i18n/SitePicker";
import { ChevronDownIcon } from "@/components/ui/SocialIcons";
import { useT } from "@/lib/i18n/client";
import { useScrolled } from "@/lib/useScrolled";
import { getInvolvedLinks, whoWeAreLinks } from "@/lib/sectionNav";

const navLinks = [
  { label: "Who we are", href: "/who-we-are", subLinks: whoWeAreLinks },
  { label: "Get Involved", href: "/get-involved", subLinks: getInvolvedLinks },
  { label: "Chapters", href: "/network" },
  { label: "Stories", href: "/submit-your-story" },
  { label: "Resources", href: "/resources" },
];

export default function HeaderV2() {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const scrolled = useScrolled();

  return (
    // Fixed rather than absolute, so it rides the page down. At rest it sits
    // exactly where it did, over the hero; once the page has moved it takes the
    // brand blue as a ground, since white nav over white content reads as
    // nothing at all.
    <header
      className={`font-body fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled ? "bg-yef-primary/95 shadow-lg backdrop-blur-sm" : ""
      }`}
    >
      {/* The frame insets the logo 76px from the left and the GIVE button 48px
          from the right, and groups the nav beside GIVE rather than centring
          it between the two. */}
      <div className={`mx-auto flex max-w-[1920px] items-center justify-between px-6 transition-[padding] duration-300 sm:px-10 lg:pr-12 lg:pl-19 ${
          scrolled ? "py-3" : "py-6"
        }`}>
        <Link
          href="/"
          className="relative h-8 w-[88px] shrink-0 sm:h-[60px] sm:w-42"
        >
          <Image
            src="/images/icons/logo-yef.svg"
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
        <nav className="fixed inset-x-6 top-[88px] z-40 flex max-h-[calc(100vh-120px)] flex-col gap-1 overflow-y-auto rounded-2xl border border-white/15 bg-v2-navy/95 p-4 font-medium text-base text-white/90 shadow-xl backdrop-blur-sm sm:inset-x-10 lg:hidden">
          {navLinks.map((link) => (
            <div key={link.label}>
              <div className="flex items-center">
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-lg px-3 py-3 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {t(link.label)}
                </Link>
                {link.subLinks && (
                  <button
                    type="button"
                    onClick={() =>
                      setExpanded((cur) => (cur === link.label ? null : link.label))
                    }
                    aria-expanded={expanded === link.label}
                    aria-label={t("Toggle submenu")}
                    className="flex size-10 shrink-0 items-center justify-center rounded-lg transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <ChevronDownIcon
                      className={`size-4 shrink-0 transition-transform ${
                        expanded === link.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                )}
              </div>
              {link.subLinks && expanded === link.label && (
                <ul className="mb-1 ml-3 flex flex-col gap-0.5 border-white/15 border-l pl-3">
                  {link.subLinks.map((sub) => (
                    <li key={sub.label}>
                      <Link
                        href={sub.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-lg px-3 py-2 text-sm text-white/75 transition-colors hover:bg-white/10 hover:text-white"
                      >
                        {t(sub.label)}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <div className="mt-2 flex flex-wrap items-center gap-2 border-white/15 border-t pt-3">
            <CountryPicker />
          </div>
        </nav>
      )}
    </header>
  );
}
