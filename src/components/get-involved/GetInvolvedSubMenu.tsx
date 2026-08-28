"use client";

import Link from "@/components/ui/LocaleLink";
import { usePathname } from "next/navigation";
import { useT } from "@/lib/i18n/client";
import { getInvolvedLinks as links } from "@/lib/sectionNav";

export default function GetInvolvedSubMenu() {
  const t = useT();
  const pathname = usePathname();

  return (
    <nav
      aria-label={t("Get Involved section navigation")}
      className="w-full lg:max-w-[237px]"
    >
      <p className="font-bold text-sm text-yef-primary">{t("Get Involved")}</p>
      <ul className="mt-4 flex gap-7 overflow-x-auto whitespace-nowrap pb-2 lg:flex-col lg:gap-0 lg:overflow-visible lg:whitespace-normal lg:pb-0">
        {links.map((link) => {
          const active = link.href.startsWith("/get-involved/")
            ? pathname === link.href
            : pathname === "/get-involved" && link.href === "/get-involved";
          return (
            <li key={link.label} className="shrink-0">
              <Link
                href={link.href}
                className={`block border-b py-3 text-lg transition-colors ${
                  active
                    ? "border-yef-primary font-medium text-yef-primary"
                    : "border-black/10 text-black hover:border-yef-primary hover:text-yef-primary"
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
