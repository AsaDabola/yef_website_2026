export type NewsArticle = {
  slug: string;
  tag: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
};

export const newsArticles: NewsArticle[] = [
  {
    slug: "campus-missionaries-philippines",
    tag: "News",
    title: "Meet a New Generation of Campus Missionaries in the Philippines",
    excerpt:
      "A growing YEF chapter in Manila is reaching students one conversation at a time. Meet the young leaders carrying the Gospel to their campus.",
    image: "/images/news/article-philippines.png",
    date: "Aug 21 2026",
  },
  {
    slug: "story-only-i-can-tell-ana",
    tag: "Story",
    title: "The Story Only I Can Tell: Meet Ana Restrepo",
    excerpt:
      "Ana is a YEF Colombia staff member who spends her days documenting the stories of students and families across the region. But she has her own story to tell too.",
    image: "/images/news/article-colombia.png",
    date: "Aug 18 2026",
  },
  {
    slug: "finding-refuge-uganda",
    tag: "Story",
    title: "Finding Family: A Mother's Journey to Faith in Uganda",
    excerpt:
      "After fleeing conflict, one mother and her son found more than shelter in a YEF-supported community in Uganda — they found a new family in Christ.",
    image: "/images/news/article-uganda-refuge.png",
    date: "Aug 14 2026",
  },
  {
    slug: "reaching-the-next-generation-thailand",
    tag: "News",
    title: "Reaching the Next Generation in Thailand",
    excerpt:
      "From village Bible studies to city campuses, YEF Thailand is discipling a new generation of young believers across the country.",
    image: "/images/news/article-thailand.png",
    date: "Aug 10 2026",
  },
  {
    slug: "encourage-a-student-on-mission",
    tag: "News",
    title: "6 Ways to Encourage a Student on Mission",
    excerpt:
      "A letter, a care package, a simple message — small gestures go a long way for students serving far from home. Here's how to support them well.",
    image: "/images/news/article-letters.png",
    date: "Aug 6 2026",
  },
  {
    slug: "day-in-the-life-tanzania",
    tag: "Event",
    title: "Breaking the Cycle: A Day in the Life of YEF Tanzania",
    excerpt:
      "Local chapters are breaking cycles of hopelessness in Tanzania. Come see how they're helping students grow into thriving followers of Jesus in Iringa.",
    image: "/images/news/article-tanzania.png",
    date: "Aug 2 2026",
  },
  {
    slug: "walking-alongside-the-displaced",
    tag: "News",
    title: "Walking Alongside Refugees, Migrants, and the Displaced",
    excerpt:
      "We have many terms for people moving from place to place. Learn what Scripture says about God's tender heart for the displaced and vulnerable.",
    image: "/images/news/article-malawi.png",
    date: "Jul 28 2026",
  },
  {
    slug: "jesus-feeds-the-5000",
    tag: "News",
    title: "Jesus Feeds the 5,000: What We Can Learn From This Miracle",
    excerpt:
      "In John, Jesus feeds the 5,000 — one of the many incredible miracles he performed. Through it, we learn how Jesus cares for us and the power of faith.",
    image: "/images/news/article-jesus-feeds.png",
    date: "Jul 24 2026",
  },
  {
    slug: "what-does-the-bible-say-about-refugees",
    tag: "News",
    title: "What Does the Bible Say About Refugees?",
    excerpt:
      "Although the word “refugee” isn’t used in the Bible, God’s Word still has a lot to say about those forced to flee for safety.",
    image: "/images/news/article-refugees-bible.png",
    date: "Jul 20 2026",
  },
  {
    slug: "why-clean-water-matters",
    tag: "News",
    title: "Why Clean Water Matters on the Mission Field",
    excerpt:
      "Clean water is essential for life and ministry. Learn why access to safe water shapes how YEF teams serve communities on mission trips.",
    image: "/images/news/article-water.png",
    date: "Jul 16 2026",
  },
  {
    slug: "forgiveness-in-the-bible",
    tag: "Story",
    title: "Forgiveness in the Bible: Verses & a Deeper Look",
    excerpt:
      "What does it mean to truly forgive? Here, we explore forgiveness in the Bible and what it looks like to forgive those who hurt us.",
    image: "/images/news/forgiveness-hero.png",
    date: "Jul 1 2026",
  },
  {
    slug: "creation-care-is-christlike-love",
    tag: "News",
    title: "Creation Care Is Christlike Love for God's Creation",
    excerpt:
      "Creation care means caring for and protecting the world God has given us. In caring for creation, we also care for the vulnerable who depend on it.",
    image: "/images/news/article-creation-care.png",
    date: "Jun 27 2026",
  },
];

export function getArticleBySlug(slug: string) {
  return newsArticles.find((article) => article.slug === slug);
}
