"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { useI18n } from "@/lib/i18n/client";
import { localePath } from "@/lib/i18n/paths";

type Props = Omit<ComponentProps<typeof NextLink>, "href"> & { href: string };

/**
 * next/link with the visitor's country and language kept in the URL, so a
 * reader on /kr/ko never falls back to the headquarters site by following an
 * ordinary internal link. External links, anchors and mailto: pass through.
 */
export default function LocaleLink({ href, ...props }: Props) {
  const { country, locale } = useI18n();
  const isInternal = href.startsWith("/") && !href.startsWith("//");
  return (
    <NextLink
      href={isInternal ? localePath(href, country, locale) : href}
      {...props}
    />
  );
}
