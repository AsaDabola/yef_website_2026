"use client";

import { usePathname } from "next/navigation";
import { useT } from "@/lib/i18n/client";
import { stripLocalePath } from "@/lib/i18n/paths";
import { whoWeAreLinks as links } from "@/lib/sectionNav";
import SectionSubMenu from "@/components/SectionSubMenu";

export default function WhoWeAreSubMenu() {
  const t = useT();
  // usePathname() keeps the /<country>/<locale> prefix; the hrefs below do
  // not, so compare the stripped path or nothing is ever marked active.
  const pathname = stripLocalePath(usePathname());

  return (
    <SectionSubMenu
      title="Who We Are"
      ariaLabel={t("Who We Are section navigation")}
      links={links}
      isActive={(href) => pathname === href}
    />
  );
}
