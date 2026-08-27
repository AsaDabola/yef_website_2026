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
      messages = (await import(`@/messages/${locale}.json`))
        .default as Messages;
    } catch {
      // No catalog yet for this language — English is the fallback.
      messages = {};
    }
  }
  catalogs.set(locale, messages);
  return messages;
}

/**
 * The subset of the catalog that client components need. Sending the whole
 * catalog would put every page's prose into the HTML of every page.
 */
export async function loadClientMessages(locale: string): Promise<Messages> {
  const [messages, keys] = await Promise.all([
    loadMessages(locale),
    import("@/messages/_client-keys.json").then((m) => m.default as string[]),
  ]);
  const subset: Messages = {};
  for (const key of keys) if (messages[key]) subset[key] = messages[key];
  return subset;
}

export function translate(messages: Messages, english: string): string {
  return messages[english] ?? english;
}
