/**
 * The constrained set of section backgrounds every generic block can pick
 * from — built entirely from the site's existing brand tokens (globals.css)
 * so an editor can't produce an off-brand or unreadable combination.
 */
export const BACKGROUND_OPTIONS = [
  { label: "White (default)", value: "white" },
  { label: "Light gray", value: "light" },
  { label: "Navy", value: "navy" },
  { label: "Blue", value: "blue" },
  { label: "Gradient — navy to blue", value: "gradient-navy-blue" },
  { label: "Gradient — blue to accent", value: "gradient-blue-accent" },
] as const;

export type BackgroundValue = (typeof BACKGROUND_OPTIONS)[number]["value"];

const BG_CLASSES: Record<BackgroundValue, string> = {
  white: "bg-white",
  light: "bg-v2-bg",
  navy: "bg-v2-navy",
  blue: "bg-v2-blue",
  "gradient-navy-blue": "bg-gradient-to-br from-v2-navy to-v2-blue",
  "gradient-blue-accent": "bg-gradient-to-br from-v2-blue to-v2-accent",
};

const DARK_BACKGROUNDS = new Set<BackgroundValue>([
  "navy",
  "blue",
  "gradient-navy-blue",
  "gradient-blue-accent",
]);

/** A dark background needs light text — everything else keeps the block's
 *  normal (dark-on-light) text colors. */
export function backgroundClasses(background?: BackgroundValue) {
  const value = background ?? "white";
  const dark = DARK_BACKGROUNDS.has(value);
  return {
    section: BG_CLASSES[value] ?? BG_CLASSES.white,
    dark,
    heading: dark ? "text-white" : "text-black",
    body: dark ? "text-white/80" : "text-[#4b5565]",
    eyebrow: dark ? "text-white/90" : "text-yef-primary",
  };
}
