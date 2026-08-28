"use client";

import Link from "@/components/ui/LocaleLink";
import { usePathname } from "next/navigation";
import { useT } from "@/lib/i18n/client";
import { stripLocalePath } from "@/lib/i18n/paths";
import { whoWeAreLinks as links } from "@/lib/sectionNav";

export default function WhoWeAreSubMenu() {
  const t = useT();
  // usePathname() keeps the /<country>/<locale> prefix; the hrefs below do
  // not, so compare the stripped path or nothing is ever marked active.
  const pathname = stripLocalePath(usePathname());

  return (
    <nav
      aria-label={t("Who We Are section navigation")}
      className="font-body w-full lg:max-w-[237px]"
    >
      <p className="font-bold text-[15px] leading-[16.62px] text-yef-primary">
        {t("Who We Are")}
      </p>
      <ul className="mt-6 flex gap-7 overflow-x-auto whitespace-nowrap pb-2 lg:mt-[47px] lg:flex-col lg:gap-0 lg:space-y-[30px] lg:overflow-visible lg:whitespace-normal lg:pb-0">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <li key={link.label} className="shrink-0">
              <Link
                href={link.href}
                className={`block border-b border-yef-primary pb-[5px] text-xl leading-[20.8px] transition-colors ${
                  active
                    ? "font-medium text-yef-primary"
                    : "text-black hover:text-yef-primary"
                }`}
              >
                {t(link.label)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
