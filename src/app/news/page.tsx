import type { Metadata } from "next";
import SubPageHero from "@/components/SubPageHero";
import Breadcrumb from "@/components/Breadcrumb";
import NewsGrid from "@/components/news/NewsGrid";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "News | Youth Evangelical Fellowship",
};

export default function NewsPage() {
  return (
    <>
      <main>
        <SubPageHero />
        <section className="mx-auto max-w-[1800px] px-6 py-16 lg:px-16">
          <Breadcrumb label="News" />
          <NewsGrid />
        </section>
      </main>
      <Footer />
    </>
  );
}
