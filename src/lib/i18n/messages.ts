import { defaultLocale } from "./locales";

export type Messages = Record<string, string>;

/**
 * Catalogs are keyed by their English source text, so a missing translation
 * falls back to readable English rather than a key like `hero.title`.
 */
const catalogs = new Map<string, Messages>();

export async function loadMessages(locale: string): Promise<Messages> {
  const cached = catalogs.get(locale);
  if (cached) return cached;

  let messages: Messages = {};
  if (locale !== defaultLocale) {
    try {
      messages = (await import(`@/messages/${locale}.json`)).default as Messages;
    } catch {
      // No catalog yet for this language — English is the fallback.
      messages = {};
    }
  }
  catalogs.set(locale, messages);
  return messages;
}

export function translate(messages: Messages, english: string): string {
  return messages[english] ?? english;
}
