"use client";

import { useState } from "react";
import Link from "@/components/ui/LocaleLink";
import { useT } from "@/lib/i18n/client";
import { useDismiss } from "@/lib/useDismiss";
import { ChevronDownIcon } from "@/components/ui/SocialIcons";

type SectionLink = { label: string; href: string };

/**
 * A section's page list (Who We Are, Get Involved) — a vertical sidebar at
 * lg and up, and a dropdown below it. A horizontal scroll of pill links read
 * as a hamburger-adjacent afterthought on a phone; a dropdown that opens on
 * tap and shows the current page reads as a real piece of navigation.
 */
export default function SectionSubMenu({
  title,
  ariaLabel,
  links,
  isActive,
  desktopLinkClassName = (active) =>
    `block border-b pb-[5px] text-xl leading-[20.8px] transition-colors ${
      active
        ? "border-yef-primary font-medium text-yef-primary"
        : "border-yef-primary text-black hover:text-yef-primary"
    }`,
}: {
  title: string;
  ariaLabel: string;
  links: SectionLink[];
  isActive: (href: string) => boolean;
  /** Lets a section keep its own desktop sidebar link styling. */
  desktopLinkClassName?: (active: boolean) => string;
}) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const ref = useDismiss<HTMLDivElement>(() => setOpen(false));
  const current = links.find((link) => isActive(link.href));

  return (
    <nav
      aria-label={ariaLabel}
      className="font-body w-full lg:sticky lg:top-32 lg:max-w-[237px] lg:self-start"
    >
      <p className="font-bold text-[15px] leading-[16.62px] text-yef-primary">
        {t(title)}
      </p>

      {/* Dropdown, below lg. */}
      <div className="relative mt-4 lg:hidden" ref={ref}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-haspopup="menu"
          className="flex w-full items-center justify-between rounded-xl border border-black/15 px-4 py-3 text-left font-medium text-black text-lg"
        >
          <span className="truncate">{t(current?.label ?? title)}</span>
          <ChevronDownIcon
            className={`size-4 shrink-0 text-yef-primary transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>

        {open && (
          <ul
            role="menu"
            className="absolute inset-x-0 top-full z-20 mt-2 max-h-[60vh] overflow-y-auto rounded-xl border border-black/10 bg-white p-2 shadow-2xl"
          >
            {links.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.label}>
                  <Link
                    role="menuitem"
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-lg px-3 py-2.5 text-base transition-colors ${
                      active
                        ? "bg-yef-primary/10 font-medium text-yef-primary"
                        : "text-black hover:bg-black/5"
                    }`}
                  >
                    {t(link.label)}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Vertical sidebar, lg and up. */}
      <ul className="hidden lg:mt-[47px] lg:block lg:space-y-[30px]">
        {links.map((link) => {
          const active = isActive(link.href);
          return (
            <li key={link.label}>
              <Link href={link.href} className={desktopLinkClassName(active)}>
                {t(link.label)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
