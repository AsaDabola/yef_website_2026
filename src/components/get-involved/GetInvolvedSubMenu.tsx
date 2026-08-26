"use client";

import Link from "@/components/ui/LocaleLink";
import { usePathname } from "next/navigation";
import { useT } from "@/lib/i18n/client";

const links = [
  { label: "Bible Studies", href: "/get-involved#bible-studies" },
  { label: "Summer Training", href: "/get-involved#summer-training" },
  { label: "Mission Trip", href: "/get-involved/mission-trip" },
  {
    label: "Volunteer/Short-term Projects",
    href: "/get-involved#short-term-mission",
  },
  { label: "Internship", href: "/get-involved#internship" },
  { label: "Discipleship", href: "/get-involved#discipleship" },
  { label: "Large Group", href: "/get-involved" },
  { label: "Leadership Training", href: "/get-involved#leadership-training" },
  { label: "Volunteer", href: "/get-involved#volunteering" },
];

export default function GetInvolvedSubMenu() {
  const t = useT();
  const pathname = usePathname();

  return (
    <nav
      aria-label={t("Get Involved section navigation")}
      className="w-full max-w-[237px]"
    >
      <p className="font-bold text-sm text-yef-primary">{t("Get Involved")}</p>
      <ul className="mt-4">
        {links.map((link) => {
          const active = link.href.startsWith("/get-involved/")
            ? pathname === link.href
            : pathname === "/get-involved" && link.href === "/get-involved";
          return (
            <li key={link.label}>
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
