"use client";

import { usePathname } from "next/navigation";
import { useT } from "@/lib/i18n/client";
import { getInvolvedLinks as links } from "@/lib/sectionNav";
import { stripLocalePath } from "@/lib/i18n/paths";
import SectionSubMenu from "@/components/SectionSubMenu";

export default function GetInvolvedSubMenu() {
  const t = useT();
  // usePathname() includes the /<country>/<locale> prefix; the sidebar's own
  // hrefs and activePaths are bare, so strip it before comparing.
  const pathname = stripLocalePath(usePathname());

  return (
    <SectionSubMenu
      title="Get Involved"
      ariaLabel={t("Get Involved section navigation")}
      links={links}
      isActive={(href) =>
        links.find((link) => link.href === href)?.activePaths?.includes(pathname) ?? false
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
