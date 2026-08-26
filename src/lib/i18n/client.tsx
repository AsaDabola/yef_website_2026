"use client";

import { createContext, useContext, useMemo } from "react";
import { defaultLocale } from "./locales";
import { translate, type Messages } from "./messages";

type I18nValue = { country: string; locale: string; messages: Messages };

const I18nContext = createContext<I18nValue>({
  country: "int",
  locale: defaultLocale,
  messages: {},
});

export function I18nProvider({
  country,
  locale,
  messages,
  children,
}: I18nValue & { children: React.ReactNode }) {
  const value = useMemo(
    () => ({ country, locale, messages }),
    [country, locale, messages],
  );
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

/** Translator for client components. */
export function useT() {
  const { messages } = useContext(I18nContext);
  return useMemo(
    () => (english: string) => translate(messages, english),
    [messages],
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
