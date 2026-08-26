"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useI18n, useT } from "@/lib/i18n/client";
import {
  countriesByRegion,
  defaultLocaleFor,
  getCountry,
} from "@/lib/i18n/countries";
import { getLocale, locales } from "@/lib/i18n/locales";
import { INTERNATIONAL } from "@/lib/i18n/constants";
import { stripLocalePath } from "@/lib/i18n/paths";
import { countryName, flag } from "@/lib/i18n/display";

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

/** Closes the menu on an outside click or Escape. */
function useDismiss(onDismiss: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onDismiss();
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onDismiss();
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [onDismiss]);
  return ref;
}

type Tone = "light" | "dark";

/** Which way the menu opens — footer pickers have no room below them. */
type Placement = "down" | "up";

const menu = (placement: Placement) =>
  placement === "up" ? "bottom-full mb-2" : "top-full mt-2";

const trigger = (tone: Tone) =>
  tone === "light"
    ? "border-white/50 text-white hover:bg-white/10"
    : "border-black/15 text-v2-navy hover:bg-black/5";

/**
 * Country picker. Choosing a country moves the visitor to that country's site
 * at the same page, in that country's own language.
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
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useDismiss(() => setOpen(false));

  const current = getCountry(country);
  const rest = stripLocalePath(pathname);

  const go = (code: string) => {
    setOpen(false);
    const locale = code === INTERNATIONAL ? "en" : defaultLocaleFor(code);
    router.push(`/${code}/${locale}${rest === "/" ? "" : rest}`);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-medium text-sm transition-colors ${trigger(tone)}`}
      >
        {current ? (
          <span aria-hidden="true">{flag(current.code)}</span>
        ) : (
          <Globe />
        )}
        <span className="hidden sm:inline">
          {current ? countryName(current, locale) : t("International")}
        </span>
        <Chevron />
      </button>

      {open && (
        <div
          role="menu"
          className={`absolute end-0 z-50 max-h-[70vh] w-[min(92vw,640px)] overflow-y-auto rounded-2xl border border-black/10 bg-white p-3 shadow-2xl ${menu(placement)}`}
        >
          <button
            type="button"
            role="menuitem"
            onClick={() => go(INTERNATIONAL)}
            className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-start text-sm hover:bg-black/5 ${
              country === INTERNATIONAL
                ? "font-semibold text-yef-primary"
                : "text-v2-navy"
            }`}
          >
            <Globe />
            {t("International")}
          </button>

          {countriesByRegion().map(([region, list]) => (
            <div key={region} className="mt-2">
              <p className="px-3 pt-2 pb-1 font-semibold text-[11px] text-black/45 uppercase tracking-[0.08em]">
                {t(region)}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2">
                {list.map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    role="menuitem"
                    onClick={() => go(c.code)}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-start text-sm hover:bg-black/5 ${
                      c.code === country
                        ? "font-semibold text-yef-primary"
                        : "text-v2-navy"
                    }`}
                  >
                    <span aria-hidden="true">{flag(c.code)}</span>
                    <span className="truncate">{countryName(c, locale)}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Language picker. It lists only the languages the current country's site is
 * published in — the headquarters site offers all of them.
 */
export function LanguagePicker({
  tone = "light",
  placement = "down",
}: {
  tone?: Tone;
  placement?: Placement;
}) {
  const { country, locale } = useI18n();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useDismiss(() => setOpen(false));

  const offered =
    country === INTERNATIONAL
      ? locales
      : (getCountry(country)?.locales ?? ["en"]).map(getLocale);
  const rest = stripLocalePath(pathname);

  const go = (code: string) => {
    setOpen(false);
    router.push(`/${country}/${code}${rest === "/" ? "" : rest}`);
  };

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
        <span>{getLocale(locale).name}</span>
        <Chevron />
      </button>

      {open && (
        <div
          role="menu"
          className={`absolute end-0 z-50 max-h-[70vh] w-[min(92vw,420px)] overflow-y-auto rounded-2xl border border-black/10 bg-white p-3 shadow-2xl ${menu(placement)}`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {offered.map((l) => (
              <button
                key={l.code}
                type="button"
                role="menuitem"
                onClick={() => go(l.code)}
                lang={l.code}
                dir={l.dir}
                className={`rounded-lg px-3 py-2 text-start text-sm hover:bg-black/5 ${
                  l.code === locale
                    ? "font-semibold text-yef-primary"
                    : "text-v2-navy"
                }`}
              >
                {l.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
