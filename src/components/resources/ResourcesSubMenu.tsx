"use client";

import Link from "@/components/ui/LocaleLink";
import CategoryIcon from "@/components/resources/CategoryIcon";
import { useT } from "@/lib/i18n/client";
import type { Resource } from "@/payload-types";

const categories: { key: Resource["category"]; label: string }[] = [
  { key: "policy", label: "Policy" },
  { key: "training", label: "Training Resources" },
  { key: "forms", label: "Forms" },
  { key: "worship", label: "Worship & Order" },
  { key: "media", label: "Media" },
];

/** The same left-column pattern as GetInvolvedSubMenu, jumping to each category's section on this one page. */
export default function ResourcesSubMenu() {
  const t = useT();
  return (
    <nav
      aria-label={t("Resource categories")}
      className="w-full max-w-[237px] lg:sticky lg:top-32 lg:self-start"
    >
      <p className="font-bold text-sm text-yef-primary">{t("Resources")}</p>
      <ul className="mt-4">
        {categories.map((category) => (
          <li key={category.key}>
            <Link
              href={`/resources#${category.key}`}
              className="flex items-center gap-3 border-black/10 border-b py-3 text-lg text-black transition-colors hover:border-yef-primary hover:text-yef-primary"
            >
              <CategoryIcon category={category.key} className="size-[18px] shrink-0 text-yef-primary" />
              {t(category.label)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
