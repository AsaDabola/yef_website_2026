"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useI18n, useT } from "@/lib/i18n/client";
import { countriesByRegion } from "@/lib/i18n/countries";
import { INTERNATIONAL } from "@/lib/i18n/constants";
import { stripLocalePath } from "@/lib/i18n/paths";
import { countryName, flag } from "@/lib/i18n/display";
import { useDismiss } from "@/lib/useDismiss";

function Chevron() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3.5 shrink-0"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function Globe() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className="size-4 shrink-0"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18" />
    </svg>
  );
}

type Tone = "light" | "dark";

/** Which way the menu opens — footer pickers have no room below them. */
type Placement = "down" | "up";

/**
 * On a phone the menu is far wider than the trigger, so anchoring its right
 * edge to the trigger's pushes it off the left of the screen. Below `sm` it
 * becomes a sheet pinned to the viewport instead; from `sm` up it is the
 * dropdown it looks like.
 */
const menu = (placement: Placement, width: string) =>
  [
    "fixed inset-x-3 sm:absolute sm:inset-x-auto sm:end-0",
    width,
    placement === "up"
      ? "bottom-4 sm:bottom-full sm:mb-2"
      : "top-24 sm:top-full sm:mt-2",
  ].join(" ");

const trigger = (tone: Tone) =>
  tone === "light"
    ? "border-white/50 text-white hover:bg-white/10"
    : "border-black/15 text-v2-navy hover:bg-black/5";

/**
 * A way back to headquarters, shown in place of the picker on a country site.
 *
 * The countries are sealed from each other, but the hub is not another
 * country — it is where the directory of all of them lives, so without this
 * a visitor who was sent to their own country's site by the front door would
 * have no route to it.
 */
function InternationalLink({ tone }: { tone: Tone }) {
  const t = useT();
  const pathname = usePathname();
  const rest = stripLocalePath(pathname);
  return (
    <a
      href={`/${INTERNATIONAL}${rest === "/" ? "" : rest}`}
      className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-medium text-sm transition-colors ${trigger(tone)}`}
    >
      <Globe />
      <span className="hidden sm:inline">{t("International")}</span>
    </a>
  );
}

/**
 * Country picker, shown only on the headquarters site.
 *
 * Each country site is presented as its own entity: from inside one there is
 * no country switch, only a link back to headquarters. Choosing a country
 * opens it in a new tab rather than navigating away, so the reader keeps the
 * site they were on and lands on the new one fresh.
 */
export function CountryPicker({
  tone = "light",
  placement = "down",
}: {
  tone?: Tone;
  placement?: Placement;
}) {
  const t = useT();
  const { country, locale } = useI18n();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useDismiss<HTMLDivElement>(() => setOpen(false));

  const rest = stripLocalePath(pathname);

  // A country site never offers other countries — only the way home.
  if (country !== INTERNATIONAL) return <InternationalLink tone={tone} />;

  const href = (code: string) => `/${code}${rest === "/" ? "" : rest}`;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-medium text-sm transition-colors ${trigger(tone)}`}
      >
        <Globe />
        <span className="hidden sm:inline">{t("International")}</span>
        <Chevron />
      </button>

      {open && (
        <div
          role="menu"
          className={`z-50 max-h-[70vh] overflow-y-auto rounded-2xl border border-black/10 bg-white p-3 shadow-2xl ${menu(placement, "sm:w-[min(92vw,640px)]")}`}
        >
          <p className="flex w-full items-center gap-2 rounded-lg px-3 py-2 font-semibold text-sm text-yef-primary">
            <Globe />
            {t("International")}
          </p>

          {countriesByRegion().map(([region, list]) => (
            <div key={region} className="mt-2">
              <p className="px-3 pt-2 pb-1 font-semibold text-[11px] text-black/45 uppercase tracking-[0.08em]">
                {t(region)}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2">
                {list.map((c) => (
                  <a
                    key={c.code}
                    role="menuitem"
                    href={href(c.code)}
                    target="_blank"
                    rel="noopener"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-start text-sm text-v2-navy hover:bg-black/5"
                  >
                    <span aria-hidden="true">{flag(c.code)}</span>
                    <span className="truncate">{countryName(c, locale)}</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
