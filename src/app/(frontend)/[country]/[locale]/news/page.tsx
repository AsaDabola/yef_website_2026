import type { Metadata } from "next";
import Image from "next/image";
import HeaderV2 from "@/components/home-v2/HeaderV2";
import Breadcrumb from "@/components/Breadcrumb";
import NewsGrid from "@/components/news/NewsGrid";
import { getNewsArticles } from "@/lib/posts";
import Footer from "@/components/Footer";
import { getT } from "@/lib/i18n/server";
import { applyRequestLocale, type LocaleParams } from "@/lib/i18n/request";
import SiteName from "@/components/ui/SiteName";

export const metadata: Metadata = {
  title: "News | Youth Evangelical Fellowship",
};

// Editors publish through /admin, so re-read the CMS rather than baking the
// list in at deploy time.
export const revalidate = 60;

export default async function NewsPage({ params }: { params: LocaleParams }) {
  await applyRequestLocale(params);
  const t = await getT();
  const posts = await getNewsArticles();

  return (
    <>
      <main>
        {/* The frame's hero is one full-bleed 1173px band: the lake photo runs
            edge to edge with the copy scrimmed over its left side. */}
        <section className="relative flex min-h-[640px] flex-col overflow-hidden bg-v2-navy lg:h-[1173px]">
          <Image
            src="/images/news/hero-lake-jump.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-black/45 lg:bg-gradient-to-r lg:from-black/75 lg:via-black/30 lg:to-transparent" />

          <HeaderV2 />

          <div className="relative mx-auto flex w-full max-w-[1920px] flex-1 items-center px-6 pt-32 pb-24 sm:px-10 lg:px-[196px] lg:pt-[118px] lg:pb-0">
            <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-[572px_653px] lg:justify-between lg:gap-0">
              <div>
                <h1 className="font-display font-extrabold text-5xl whitespace-pre-line text-white leading-[1.1] tracking-[-1.5px] sm:text-6xl lg:text-[86px] lg:leading-[96px]">
                  {t("Welcome\nNews\nfrom Afar")}
                </h1>
                <p className="mt-6 whitespace-pre-line text-[17px] text-white/85 leading-[38px] lg:text-[20px]">
                  {t("“to a weary soul, so is good news from a distant land.”\n— Proverbs 25:25")}
                </p>
                <p className="mt-8 max-w-[572px] text-[17px] text-white/80 leading-[40px] lg:text-[20px]">
                  
{t("From city campuses to mission fields far away, God is at work. Every testimony and every new chapter is a small taste of that same refreshment — good news carried across the distance. Here, we gather those stories.")}
</p>
              </div>

              <div className="relative aspect-[653/492] w-full overflow-hidden rounded-2xl shadow-[0_30px_80px_rgba(2,8,16,0.55)]">
                <Image
                  src="/images/news/hero-high-five.jpg"
                  alt={t("Students laughing as they meet in a high five")}
                  fill
                  priority
                  sizes="(min-width: 1024px) 653px, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <p className="relative pb-8 text-center font-semibold text-[11px] text-white/40 tracking-[3px] uppercase">
            
<SiteName />
</p>
        </section>

        <section className="mx-auto max-w-[1392px] px-6 pt-[74px] pb-16">
          <Breadcrumb label={t("News")} />
          <div className="mt-[98px]">
            <NewsGrid posts={posts} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
