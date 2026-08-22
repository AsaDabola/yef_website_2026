"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Who we are", href: "/who-we-are" },
  { label: "Get Involved", href: "/get-involved" },
  { label: "News", href: "/news" },
  { label: "Network", href: "/network" },
];

export default function HeaderV2() {
  const [open, setOpen] = useState(false);

  return (
    <header className="font-body absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-[1920px] items-center justify-between px-6 py-6 sm:px-10 lg:px-19">
        <Link href="/" className="relative h-[45px] w-32 shrink-0 sm:h-[60px] sm:w-42">
          <Image
            src="/images/icons/logo-yef-white-compact.svg"
            alt="Youth Evangelical Fellowship"
            fill
            sizes="168px"
            className="object-contain object-left"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-9 font-medium text-base text-white/90 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/donate"
            className="rounded-full border border-white/50 px-6 py-2.5 font-semibold text-sm text-white tracking-[2.56px] transition-colors hover:bg-white hover:text-v2-navy"
          >
            GIVE
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
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

      {open && (
        <nav className="fixed inset-x-6 top-[88px] z-40 flex flex-col gap-1 rounded-2xl border border-white/15 bg-v2-navy/95 p-4 font-medium text-base text-white/90 shadow-xl backdrop-blur-sm sm:inset-x-10 lg:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 transition-colors hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
