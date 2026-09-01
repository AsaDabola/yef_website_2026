import { archiveNewsArticles } from "@/lib/newsArchive";

export type NewsArticle = {
  slug: string;
  tag: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  /** Shown under the title in place of the excerpt — e.g. a chapter byline. */
  subtitle?: string;
  /** Overrides the default three-tag row when a story carries a single label. */
  tags?: string[];
  /** Plain-prose body for stories that are not built from a bespoke layout. */
  paragraphs?: string[];
};

/**
 * A set of hand-authored "articles" used to live here — invented placeholder
 * stories with fabricated bylines (there was never a real "Ana Restrepo" or
 * "Amil of Bujumbura") fronted by uncredited stock photography, including at
 * least one photo of a real person wearing a third party's branded shirt.
 * They were never genuine YEF content, so they've been removed outright
 * rather than patched. src/middleware.ts answers their old URLs with 410
 * Gone rather than a plain 404, since they specifically used to exist.
 */
export const REMOVED_ARTICLE_SLUGS = [
  "campus-missionaries-philippines",
  "story-only-i-can-tell-ana",
  "finding-refuge-uganda",
  "reaching-the-next-generation-thailand",
  "encourage-a-student-on-mission",
  "day-in-the-life-tanzania",
  "walking-alongside-the-displaced",
  "jesus-feeds-the-5000",
  "what-does-the-bible-say-about-refugees",
  "why-clean-water-matters",
  "forgiveness-in-the-bible",
  "my-experience-with-yef",
  "creation-care-is-christlike-love",
] as const;

// Newest first.
export const newsArticles: NewsArticle[] = [...archiveNewsArticles].sort(
  (a, b) => Date.parse(b.date) - Date.parse(a.date),
);

export function getArticleBySlug(slug: string) {
  return newsArticles.find((article) => article.slug === slug);
}
