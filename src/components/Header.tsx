"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FacebookIcon,
  InstagramIcon,
  SearchIcon,
  XIcon,
} from "@/components/ui/SocialIcons";

const navLinks = [
  { label: "Who We Are", href: "/who-we-are" },
  { label: "Get Involved", href: "/get-involved" },
  { label: "News", href: "/news" },
  { label: "Network", href: "/network" },
];

const socialLinks = [
  { label: "Facebook", href: "#", Icon: FacebookIcon },
  { label: "X", href: "#", Icon: XIcon },
  { label: "Instagram", href: "#", Icon: InstagramIcon },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-[1800px] flex-wrap items-center justify-between gap-6 px-6 py-8 lg:px-16">
        <Link href="/" className="relative h-9 w-24 shrink-0 sm:h-20 sm:w-52">
          <Image
            src="/images/icons/logo-yef-white.svg"
            alt="Youth Evangelical Fellowship"
            fill
            sizes="208px"
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
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            {socialLinks.map(({ label, href, Icon }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
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
            Search
            <SearchIcon className="size-[15px]" />
          </button>

          <Link
            href="/donate"
            className="rounded-full border border-white px-4 py-2 font-semibold text-sm text-white transition-colors hover:bg-white hover:text-yef-primary sm:px-7 sm:py-3.5 sm:text-lg"
          >
            Give
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
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
              {link.label}
            </Link>
          ))}
          <div className="mt-2 flex items-center gap-4 border-t border-white/15 px-3 pt-4">
            {socialLinks.map(({ label, href, Icon }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
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
