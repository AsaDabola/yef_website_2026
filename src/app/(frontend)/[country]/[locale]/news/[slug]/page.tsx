import type { Metadata } from "next";
import Image from "next/image";
import Link from "@/components/ui/LocaleLink";
import { notFound } from "next/navigation";
import SubPageHero from "@/components/SubPageHero";
import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { getArticle, getNewsArticles } from "@/lib/posts";
import { ShareIcon } from "@/components/ui/SocialIcons";
import { getT } from "@/lib/i18n/server";
import { applyRequestLocale } from "@/lib/i18n/request";

// Editors publish through /admin, so re-read the CMS rather than baking each
// article in at deploy time.
export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string; locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const found = await getArticle(slug);
  return {
    title: found
      ? `${found.article.title} | Youth Evangelical Fellowship`
      : "News",
  };
}

function ShareButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="flex items-center gap-2 rounded-lg border border-[#8996a7] px-3.5 py-2 font-semibold text-[13px] text-[#353b45] shadow-sm"
    >
      <ShareIcon className="size-[18px]" />
      {label}
    </button>
  );
}

function TagRow({ tags, t }: { tags: string[]; t: (s: string) => string }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full border border-[#8996a7] px-3.5 py-1.5 font-semibold text-[13px] text-[#353b45]"
        >
          {t(tag)}
        </span>
      ))}
    </div>
  );
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ country: string; locale: string; slug: string }>;
}) {
  await applyRequestLocale(params);
  const t = await getT();
  const { slug } = await params;
  const found = await getArticle(slug);
  if (!found) notFound();
  const { article, body } = found;

  const related = (await getNewsArticles())
    .filter((item) => item.slug !== slug)
    .slice(0, 3);

  const tags = article.tags ?? [article.tag, "Christian Faith", "Discipleship"];

  return (
    <>
      <main>
        <SubPageHero />
        <article className="mx-auto max-w-[1800px] px-6 py-16 lg:px-16">
          <Breadcrumb label={`${t("News")} / ${t(article.title)}`} />

          {/* The frame sets the article head at 13.3/17.5, 44.8/60 and
              18.9/30 — the headline is semibold, not the extrabold the
              landing pages use. */}
          <p className="mt-6 font-semibold text-[13.3px] text-[#4b5565] leading-[17.5px]">
            {article.date}
          </p>
          <h1 className="mt-2 max-w-3xl font-display font-semibold text-[32px] text-black leading-[42px] tracking-[-0.96px] sm:text-[38px] sm:leading-[50px] lg:text-[44.8px] lg:leading-[60px]">
            {t(article.title)}
          </h1>
          <p className="mt-4 max-w-3xl font-medium text-[17px] text-[#4b5565] leading-[27px] lg:text-[18.9px] lg:leading-[30px]">
            {t(article.subtitle ?? article.excerpt)}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <TagRow tags={tags} t={t} />
            <ShareButton label={t("Share")} />
          </div>

          <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-2xl">
            <Image
              src={article.image}
              alt={article.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>

          <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
            <div className="max-w-2xl space-y-6 text-lg text-black leading-relaxed">
              {body ? (
                <RichText data={body as SerializedEditorState} />
              ) : article.paragraphs ? (
                article.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{t(paragraph)}</p>
                ))
              ) : (
                <>
                  <p>{t(article.excerpt)}</p>
                  <p>
                    
{t("Stories like this one are part of what YEF gets to witness every day — young believers stepping out in faith, sharing the Gospel, and building communities that point back to Christ. Keep praying for the students, staff, and volunteers carrying this work forward around the world.")}
</p>
                </>
              )}

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#dcdfe5] pt-6">
                <TagRow tags={tags} t={t} />
                <ShareButton label={t("Share")} />
              </div>
            </div>

            <aside className="h-fit">

              <p className="mt-6 font-semibold text-[19px] text-[#4b5565]">
                
{t("Join YEF International Subscribers!")}
</p>
              <form className="mt-4 space-y-3">
                <label className="block">
                  <span className="text-[13px] font-medium text-[#353b45]">
                    
{t("Email")}<span className="text-[#f97066]">*</span>
                  </span>
                  <input
                    type="email"
                    required
                    placeholder={t("Email Address")}
                    className="mt-1.5 w-full rounded-lg border border-[#8996a7] bg-white px-3 py-2.5 text-[15px] text-v2-navy shadow-sm placeholder:text-[#757575] focus:border-v2-accent focus:outline-none"
                  />
                </label>
                <label className="block">
                  <span className="text-[13px] font-medium text-[#353b45]">
                    
{t("First name")}<span className="text-[#f97066]">*</span>
                  </span>
                  <input
                    type="text"
                    required
                    placeholder={t("First Name")}
                    className="mt-1.5 w-full rounded-lg border border-[#8996a7] bg-white px-3 py-2.5 text-[15px] text-v2-navy shadow-sm placeholder:text-[#757575] focus:border-v2-accent focus:outline-none"
                  />
                </label>
                <label className="block">
                  <span className="text-[13px] font-medium text-[#353b45]">
                    
{t("Last name")}<span className="text-[#f97066]">*</span>
                  </span>
                  <input
                    type="text"
                    required
                    placeholder={t("Last Name")}
                    className="mt-1.5 w-full rounded-lg border border-[#8996a7] bg-white px-3 py-2.5 text-[15px] text-v2-navy shadow-sm placeholder:text-[#757575] focus:border-v2-accent focus:outline-none"
                  />
                </label>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-v2-blue py-3 font-semibold text-[15px] text-white transition-opacity hover:opacity-90"
                >
                  
{t("Subscribe")}
</button>
              </form>
            </aside>
          </div>
        </article>

        <section className="bg-v2-bg py-16">
          <div className="mx-auto max-w-[1800px] px-6 lg:px-16">
            <h2 className="font-display font-bold text-2xl text-black">
              
{t("Related Content")}
</h2>
            <div className="mt-8 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/news/${item.slug}`}
                  className="group"
                >
                  <div className="relative aspect-[312/234] w-full overflow-hidden rounded-2xl">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <p className="mt-4 font-semibold text-[13px] text-[#1d46d8]">
                    {t(item.tag)}
                  </p>
                  <div className="mt-2 flex items-start justify-between gap-4">
                    <h3 className="font-display font-bold text-lg text-black leading-snug">
                      {t(item.title)}
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
