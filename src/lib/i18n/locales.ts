/**
 * Every language the 60-country platform serves, derived from the language
 * column of the Fellowship Websites country list.
 *
 * `code` is BCP-47 and is what appears in a URL; `name` is the language's own
 * name, which is what a visitor scanning the picker is looking for.
 */
export type Locale = {
  code: string;
  /** Endonym — shown in the language picker. */
  name: string;
  /** English name — used in admin screens and alt text. */
  english: string;
  dir?: "rtl";
};

export const locales: Locale[] = [
  { code: "en", name: "English", english: "English" },
  { code: "es", name: "Español", english: "Spanish" },
  { code: "fr", name: "Français", english: "French" },
  { code: "de", name: "Deutsch", english: "German" },
  { code: "pt", name: "Português", english: "Portuguese" },
  { code: "ko", name: "한국어", english: "Korean" },
  { code: "ja", name: "日本語", english: "Japanese" },
  { code: "zh", name: "中文", english: "Chinese (Mandarin)" },
  { code: "it", name: "Italiano", english: "Italian" },
  { code: "ru", name: "Русский", english: "Russian" },
  { code: "tr", name: "Türkçe", english: "Turkish" },
  { code: "id", name: "Bahasa Indonesia", english: "Indonesian" },
  { code: "nl", name: "Nederlands", english: "Dutch" },
  { code: "pl", name: "Polski", english: "Polish" },
  { code: "uk", name: "Українська", english: "Ukrainian" },
  { code: "cs", name: "Čeština", english: "Czech" },
  { code: "sk", name: "Slovenčina", english: "Slovak" },
  { code: "el", name: "Ελληνικά", english: "Greek" },
  { code: "hu", name: "Magyar", english: "Hungarian" },
  { code: "ro", name: "Română", english: "Romanian" },
  { code: "sv", name: "Svenska", english: "Swedish" },
  { code: "ar", name: "العربية", english: "Arabic", dir: "rtl" },
  { code: "he", name: "עברית", english: "Hebrew", dir: "rtl" },
  { code: "ur", name: "اردو", english: "Urdu", dir: "rtl" },
  { code: "hi", name: "हिन्दी", english: "Hindi" },
  { code: "bn", name: "বাংলা", english: "Bengali" },
  { code: "ta", name: "தமிழ்", english: "Tamil" },
  { code: "ne", name: "नेपाली", english: "Nepali" },
  { code: "si", name: "සිංහල", english: "Sinhala" },
  { code: "my", name: "မြန်မာ", english: "Burmese" },
  { code: "th", name: "ไทย", english: "Thai" },
  { code: "vi", name: "Tiếng Việt", english: "Vietnamese" },
  { code: "fil", name: "Filipino", english: "Filipino" },
  { code: "ms", name: "Bahasa Melayu", english: "Malay" },
  { code: "mn", name: "Монгол", english: "Mongolian" },
  { code: "kk", name: "Қазақша", english: "Kazakh" },
  { code: "sw", name: "Kiswahili", english: "Swahili" },
  { code: "am", name: "አማርኛ", english: "Amharic" },
  { code: "af", name: "Afrikaans", english: "Afrikaans" },
  { code: "zu", name: "isiZulu", english: "Zulu" },
  { code: "xh", name: "isiXhosa", english: "Xhosa" },
  { code: "rw", name: "Ikinyarwanda", english: "Kinyarwanda" },
  { code: "rn", name: "Ikirundi", english: "Kirundi" },
  { code: "mg", name: "Malagasy", english: "Malagasy" },
  { code: "ht", name: "Kreyòl Ayisyen", english: "Haitian Creole" },
  { code: "fj", name: "Na Vosa Vakaviti", english: "Fijian" },
  { code: "hif", name: "Fiji Hindi", english: "Fiji Hindi" },
  { code: "rm", name: "Rumantsch", english: "Romansh" },
];

export const defaultLocale = "en";

export const localeCodes = locales.map((l) => l.code);

const byCode = new Map(locales.map((l) => [l.code, l]));

export function getLocale(code: string | undefined | null): Locale {
  return (code && byCode.get(code)) || byCode.get(defaultLocale)!;
}

export function isRtl(code: string): boolean {
  return getLocale(code).dir === "rtl";
}
