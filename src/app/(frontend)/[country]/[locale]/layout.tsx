import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Bricolage_Grotesque,
  Inter,
  Instrument_Serif,
  La_Belle_Aurore,
  Playfair_Display,
} from "next/font/google";
import { I18nProvider } from "@/lib/i18n/client";
import { loadClientMessages } from "@/lib/i18n/messages";
import { isRtl } from "@/lib/i18n/locales";
import {
  INTERNATIONAL,
  isCountrySegment,
  isLocaleSegment,
  resolveLocale,
  setRequestLocale,
} from "@/lib/i18n/request";
import "../../globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const laBelleAurore = La_Belle_Aurore({
  variable: "--font-la-belle-aurore",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Youth Evangelical Fellowship",
  description:
    "Youth Evangelical Fellowship — To Know Christ, To Make Him Known.",
};

/**
 * Every page lives under /<country>/<language>. The layout resolves that pair,
 * publishes it for the request so shared components can translate without
 * being handed a locale prop, and hands the catalog to client components.
 */
export default async function FrontendLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ country: string; locale: string }>;
}) {
  const { country, locale: requested } = await params;
  if (!isCountrySegment(country) || !isLocaleSegment(requested)) notFound();

  const locale = resolveLocale(country, requested);
  setRequestLocale(country, locale);
  const messages = await loadClientMessages(locale);

  return (
    <html
      lang={locale}
      dir={isRtl(locale) ? "rtl" : undefined}
      className={`${playfairDisplay.variable} ${bricolageGrotesque.variable} ${instrumentSerif.variable} ${inter.variable} ${laBelleAurore.variable} antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <I18nProvider country={country} locale={locale} messages={messages}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}

/**
 * Prerenders the headquarters site and the two pilot countries. The other
 * ~120 country/language pairs render on demand and are then cached.
 */
export function generateStaticParams() {
  return [
    { country: INTERNATIONAL, locale: "en" },
    { country: "us", locale: "en" },
    { country: "kr", locale: "ko" },
  ];
}
