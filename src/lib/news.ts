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

const curatedNewsArticles: NewsArticle[] = [];

// Newest first, across both sets — a couple of archive dates land inside the
// hand-authored stories' date range, so a plain append wouldn't stay sorted.
export const newsArticles: NewsArticle[] = [
  ...curatedNewsArticles,
  ...archiveNewsArticles,
].sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

export function getArticleBySlug(slug: string) {
  return newsArticles.find((article) => article.slug === slug);
}
