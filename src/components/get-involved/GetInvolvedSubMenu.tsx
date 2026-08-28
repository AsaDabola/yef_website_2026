"use client";

import { usePathname } from "next/navigation";
import { useT } from "@/lib/i18n/client";
import { getInvolvedLinks as links } from "@/lib/sectionNav";
import SectionSubMenu from "@/components/SectionSubMenu";

export default function GetInvolvedSubMenu() {
  const t = useT();
  const pathname = usePathname();

  return (
    <SectionSubMenu
      title="Get Involved"
      ariaLabel={t("Get Involved section navigation")}
      links={links}
      isActive={(href) =>
        href.startsWith("/get-involved/")
          ? pathname === href
          : pathname === "/get-involved" && href === "/get-involved"
      }
      desktopLinkClassName={(active) =>
        `block border-b py-3 text-lg transition-colors ${
          active
            ? "border-yef-primary font-medium text-yef-primary"
            : "border-black/10 text-black hover:border-yef-primary hover:text-yef-primary"
        }`
      }
    />
  );
}
