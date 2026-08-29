"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "@/components/ui/LocaleLink";
import { useT } from "@/lib/i18n/client";
import { getInvolvedLinks as groups } from "@/lib/sectionNav";
import { stripLocalePath } from "@/lib/i18n/paths";
import { useDismiss } from "@/lib/useDismiss";
import { ChevronDownIcon } from "@/components/ui/SocialIcons";

/**
 * The Get Involved section nav, nested one level deep (stage -> its actual
 * program pages) so a visitor sees the whole JOIN/GROW/REACH/TRAIN/SERVE tree
 * at once, on the listing page and every individual program page alike.
 * Custom-built rather than the shared SectionSubMenu, which only handles a
 * flat list of links.
 */
export default function GetInvolvedSubMenu() {
  const t = useT();
  // usePathname() includes the /<country>/<locale> prefix; the nav's own
  // hrefs and activePaths are bare, so strip it before comparing.
  const pathname = stripLocalePath(usePathname());
  const [open, setOpen] = useState(false);
  const ref = useDismiss<HTMLDivElement>(() => setOpen(false));

  const isItemActive = (href: string) => !href.includes("#") && pathname === href;
  const current = groups.flatMap((group) => group.items).find((item) => isItemActive(item.href));

  return (
    <nav
      aria-label={t("Get Involved section navigation")}
      className="font-body w-full lg:max-w-[237px]"
    >
      <p className="font-bold text-[15px] leading-[16.62px] text-yef-primary">
        {t("Get Involved")}
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
          <span className="truncate">{t(current?.label ?? "Get Involved")}</span>
          <ChevronDownIcon
            className={`size-4 shrink-0 text-yef-primary transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>

        {open && (
          <div
            role="menu"
            className="absolute inset-x-0 top-full z-20 mt-2 max-h-[60vh] overflow-y-auto rounded-xl border border-black/10 bg-white p-2 shadow-2xl"
          >
            {groups.map((group) => (
              <div key={group.label} className="py-1">
                <p className="px-3 py-1.5 font-semibold text-[12px] text-yef-primary tracking-[1.2px] uppercase">
                  {t(group.label)}
                </p>
                {group.items.map((item) => {
                  const active = isItemActive(item.href);
                  return (
                    <Link
                      key={item.label}
                      role="menuitem"
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`block rounded-lg px-3 py-2.5 text-base transition-colors ${
                        active
                          ? "bg-yef-primary/10 font-medium text-yef-primary"
                          : "text-black hover:bg-black/5"
                      }`}
                    >
                      {t(item.label)}
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Nested sidebar, lg and up: stage heading, then its program pages. */}
      <div className="hidden lg:mt-[47px] lg:block lg:space-y-[26px]">
        {groups.map((group) => {
          const groupActive = group.activePaths?.includes(pathname) ?? false;
          return (
            <div key={group.label}>
              <Link
                href={group.href}
                className={`block border-b pb-[5px] font-medium text-xl leading-[20.8px] uppercase tracking-[0.5px] transition-colors ${
                  groupActive
                    ? "border-yef-primary text-yef-primary"
                    : "border-yef-primary text-black hover:text-yef-primary"
                }`}
              >
                {t(group.label)}
              </Link>
              <ul className="mt-3 space-y-[10px]">
                {group.items.map((item) => {
                  const active = isItemActive(item.href);
                  return (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className={`block text-[15px] leading-[19px] transition-colors ${
                          active
                            ? "font-medium text-yef-primary"
                            : "text-black/60 hover:text-yef-primary"
                        }`}
                      >
                        {t(item.label)}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
