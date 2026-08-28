"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "@/components/ui/LocaleLink";
import { CountryPicker } from "@/components/i18n/SitePicker";
import {
  FacebookIcon,
  InstagramIcon,
  SearchIcon,
  XIcon,
} from "@/components/ui/SocialIcons";
import { useT } from "@/lib/i18n/client";
import { useScrolled } from "@/lib/useScrolled";

const navLinks = [
  { label: "Who We Are", href: "/who-we-are" },
  { label: "Get Involved", href: "/get-involved" },
  { label: "News", href: "/news" },
  { label: "Network", href: "/network" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/youthevangelicalfellowship/",
    Icon: FacebookIcon,
  },
  { label: "X", href: "https://x.com/YEF_Intl", Icon: XIcon },
  {
    label: "Instagram",
    href: "https://www.instagram.com/yef_international/",
    Icon: InstagramIcon,
  },
];

export default function Header() {
  const t = useT();
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled();

  return (
    // Fixed rather than absolute, so it rides the page down. At rest it sits
    // exactly where it did, over the banner; once the page has moved it takes
    // the brand blue as a ground, since white nav over white content reads
    // as nothing at all.
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled ? "bg-yef-primary/95 shadow-lg backdrop-blur-sm" : ""
      }`}
    >
      <div className={`mx-auto flex max-w-[1800px] flex-wrap items-center justify-between gap-6 px-6 transition-[padding] duration-300 lg:px-16 ${
          scrolled ? "py-3" : "py-8"
        }`}>
        {/* The same box as the home header and the footer, so one logo size
            serves the whole site. */}
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

        <div className="flex flex-1 flex-wrap items-center justify-end gap-8">
          <nav className="hidden items-center gap-9 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-medium text-lg text-white transition-opacity hover:opacity-80"
              >
                {t(link.label)}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            {socialLinks.map(({ label, href, Icon }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t(label)}
                className="text-white transition-opacity hover:opacity-80"
              >
                <Icon className="size-[18px]" />
              </Link>
            ))}
          </div>

          <button
            type="button"
            className="hidden items-center gap-2 border-b border-white/0 font-medium text-lg text-white transition-opacity hover:opacity-80 md:flex"
          >
            {t("Search")}
            <SearchIcon className="size-[15px]" />
          </button>

          <div className="hidden items-center gap-2 lg:flex">
            <CountryPicker />
          </div>

          <Link
            href="/donate"
            className="rounded-full border border-white px-4 py-2 font-semibold text-sm text-white transition-colors hover:bg-white hover:text-yef-primary sm:px-7 sm:py-3.5 sm:text-lg"
          >
            {t("Give")}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={t("Toggle menu")}
            className="flex size-12 shrink-0 items-center justify-center rounded-full border border-white text-white lg:hidden"
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

      {open && (
        <nav className="fixed inset-x-6 top-[104px] z-40 flex flex-col gap-1 rounded-2xl border border-white/15 bg-yef-navy/95 p-4 shadow-xl backdrop-blur-sm lg:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 font-medium text-lg text-white transition-colors hover:bg-white/10"
            >
              {t(link.label)}
            </Link>
          ))}
          <div className="mt-2 flex flex-wrap items-center gap-2 border-t border-white/15 px-3 pt-4">
            <CountryPicker />
          </div>
          <div className="flex items-center gap-4 px-3 pt-2">
            {socialLinks.map(({ label, href, Icon }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t(label)}
                className="text-white transition-opacity hover:opacity-80"
              >
                <Icon className="size-[18px]" />
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
