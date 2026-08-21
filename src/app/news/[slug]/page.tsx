import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SubPageHero from "@/components/SubPageHero";
import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";
import { getArticleBySlug, newsArticles } from "@/lib/news";
import { forgivenessArticleBody } from "@/lib/articleContent";

export function generateStaticParams() {
  return newsArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  return { title: article ? `${article.title} | Youth Evangelical Fellowship` : "News" };
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = newsArticles
    .filter((item) => item.slug !== slug)
    .slice(0, 3);

  const isForgiveness = slug === "forgiveness-in-the-bible";

  return (
    <>
      <main>
        <SubPageHero />
        <article className="mx-auto max-w-[1800px] px-6 py-16 lg:px-16">
          <Breadcrumb label={`News / ${article.title}`} />

          <p className="mt-6 text-sm text-v2-muted">{article.date}</p>
          <h1 className="mt-2 max-w-3xl font-display font-extrabold text-4xl text-black leading-tight sm:text-5xl">
            {article.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-v2-muted-dark-2">
            {article.excerpt}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {[article.tag, "Christian Faith", "Discipleship"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-v2-border px-4 py-1.5 text-sm text-v2-muted-dark-2"
                >
                  {tag}
                </span>
              ))}
            </div>
            <button
              type="button"
              className="flex items-center gap-2 rounded-full border border-v2-border px-4 py-2 text-sm text-v2-navy"
            >
              &#128257; Share
            </button>
          </div>

          <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden">
            <Image
              src={article.image}
              alt={article.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>

          <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_320px]">
            <div className="max-w-2xl space-y-6 text-lg text-black leading-relaxed">
              {isForgiveness ? (
                <>
                  <p>
                    We&rsquo;ve all said the words &ldquo;I forgive
                    you&rdquo; a time or two. But do we truly know what they
                    mean? Let&rsquo;s dive into the meaning of forgiveness in
                    the Bible. Spoiler alert: it&rsquo;s so much more than a
                    polite phrase.
                  </p>

                  <h2
                    id="meaning"
                    className="pt-4 font-display font-bold text-2xl text-black"
                  >
                    Exploring the Meaning of Forgiveness in the Bible
                  </h2>
                  <h3 className="font-display font-semibold text-xl text-black">
                    Forgiveness in the Bible: Hebrew and Greek
                  </h3>
                  <p>
                    In Hebrew (the original language of the Old Testament),
                    there are two main words used for &ldquo;forgive,&rdquo;
                    nasa and salach.
                  </p>
                  <ul className="list-disc space-y-3 pl-6">
                    <li>
                      <span className="font-semibold">Nasa: </span>
                      Nasa is a word that means &ldquo;to lift&rdquo; or
                      &ldquo;to carry.&rdquo; When used in the context of
                      forgiveness, it means to lift away sin and guilt or
                      actively carry them away. This Old Testament word
                      points to the New Testament cross, where Jesus carried
                      our sin and shame on our behalf, bringing us ultimate
                      forgiveness. Beautiful, right?
                    </li>
                    <li>
                      <span className="font-semibold">Salach: </span>
                      Salach translates directly to &ldquo;forgive&rdquo; but
                      can also mean &ldquo;pardon&rdquo; or &ldquo;spare.&rdquo;
                      In the Old Testament, this word is directly linked to
                      God&rsquo;s forgiveness every time it&rsquo;s used.
                      This makes sense because God is the only one who can
                      truly pardon us.
                    </li>
                  </ul>

                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src="/images/news/forgiveness-praying.png"
                      alt="A young woman praying with an open Bible"
                      fill
                      sizes="(min-width: 1024px) 60vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <p className="text-sm text-v2-muted">
                    Photo by: Celia Oropeza
                  </p>

                  <h2
                    id="verses"
                    className="pt-4 font-display font-bold text-2xl text-black"
                  >
                    13 Bible Verses About Forgiveness
                  </h2>
                  <p>
                    Scripture returns to the theme of forgiveness again and
                    again. Here are thirteen verses to carry with you:
                  </p>
                  <ul className="grid list-disc grid-cols-2 gap-x-6 gap-y-2 pl-6 text-base">
                    {forgivenessArticleBody.verses.map((verse) => (
                      <li key={verse}>{verse}</li>
                    ))}
                  </ul>

                  <h2
                    id="practice"
                    className="pt-4 font-display font-bold text-2xl text-black"
                  >
                    How to Practice Biblical Forgiveness
                  </h2>
                  <h3 className="font-display font-semibold text-xl text-black">
                    Repeat These Steps
                  </h3>
                  <p>
                    Forgiveness isn&rsquo;t a one-time thing. Sometimes,
                    you&rsquo;ll need to forgive someone who hurt you over
                    and over again until your heart is freed from the pain
                    they caused. Take heart in knowing this: forgiveness
                    isn&rsquo;t a feeling &mdash; it&rsquo;s a choice. And
                    it&rsquo;s one you might have to make daily.
                  </p>
                  <blockquote className="border-l-4 border-v2-blue pl-6 italic text-v2-navy">
                    Then Peter came to Jesus and asked, &ldquo;Lord, how many
                    times shall my brother or sister sin against me and I
                    forgive them? Up to seven times?&rdquo; Jesus answered,
                    &ldquo;I tell you, not seven times, but seventy-seven
                    times.&rdquo; &mdash; Matthew 18:21-22, NIV
                  </blockquote>
                  <div className="rounded-2xl bg-v2-bg p-6 text-v2-navy">
                    Forgiveness is a life-changing practice that mirrors
                    God&rsquo;s heart. As we remember how he has forgiven
                    us, bring our hurts to him and choose to release others
                    again and again, we step into the freedom we have in
                    Jesus.
                  </div>
                </>
              ) : (
                <>
                  <p>{article.excerpt}</p>
                  <p>
                    Stories like this one are part of what YEF gets to
                    witness every day &mdash; young believers stepping out
                    in faith, sharing the Gospel, and building communities
                    that point back to Christ. Keep praying for the
                    students, staff, and volunteers carrying this work
                    forward around the world.
                  </p>
                </>
              )}

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-v2-border pt-6">
                <div className="flex flex-wrap gap-2">
                  {[article.tag, "Christian Faith", "Discipleship"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-v2-border px-4 py-1.5 text-sm text-v2-muted-dark-2"
                      >
                        {tag}
                      </span>
                    ),
                  )}
                </div>
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-full border border-v2-border px-4 py-2 text-sm text-v2-navy"
                >
                  &#128257; Share
                </button>
              </div>
            </div>

            <aside className="h-fit space-y-8 lg:sticky lg:top-24">
              {isForgiveness && (
                <div>
                  <p className="font-semibold text-sm text-v2-muted uppercase tracking-[1px]">
                    Table of Contents
                  </p>
                  <ul className="mt-4 space-y-3 border-t border-v2-border pt-4">
                    {forgivenessArticleBody.toc.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="text-v2-blue hover:underline"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="rounded-2xl bg-v2-bg p-6">
                <p className="font-display font-bold text-lg text-v2-navy">
                  Join YEF International Subscribers!
                </p>
                <form className="mt-4 space-y-3">
                  <label className="block">
                    <span className="text-sm text-v2-muted-dark-2">
                      Email*
                    </span>
                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      className="mt-1 w-full rounded-lg border border-v2-border bg-white px-3 py-2.5 text-v2-navy placeholder:text-v2-muted focus:border-v2-accent focus:outline-none"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm text-v2-muted-dark-2">
                      First name*
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="First name"
                      className="mt-1 w-full rounded-lg border border-v2-border bg-white px-3 py-2.5 text-v2-navy placeholder:text-v2-muted focus:border-v2-accent focus:outline-none"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm text-v2-muted-dark-2">
                      Last name*
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="Last name"
                      className="mt-1 w-full rounded-lg border border-v2-border bg-white px-3 py-2.5 text-v2-navy placeholder:text-v2-muted focus:border-v2-accent focus:outline-none"
                    />
                  </label>
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-v2-blue py-2.5 font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </aside>
          </div>
        </article>

        <section className="bg-v2-bg py-16">
          <div className="mx-auto max-w-[1800px] px-6 lg:px-16">
            <h2 className="font-display font-bold text-2xl text-black">
              Related Content
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/news/${item.slug}`}
                  className="group"
                >
                  <div className="relative aspect-[312/234] w-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <p className="mt-4 font-semibold text-xs text-v2-muted tracking-[1px] uppercase">
                    {item.tag}
                  </p>
                  <div className="mt-2 flex items-start justify-between gap-4">
                    <h3 className="font-display font-bold text-lg text-black leading-snug">
                      {item.title}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="mt-1 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                    >
                      &#8599;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
