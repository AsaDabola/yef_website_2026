import type { Metadata } from "next";
import Image from "next/image";
import HeaderV2 from "@/components/home-v2/HeaderV2";
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
        <section className="relative h-[220px] overflow-hidden bg-v2-navy sm:h-[320px] lg:h-[378px]">
          <Image
            src="https://www.figma.com/api/mcp/asset/e1a64f46-76ec-4178-8bef-9bbda8e6fc37.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />
          <HeaderV2 />
        </section>
        <section className="mx-auto max-w-[1800px] px-6 py-16 lg:px-16">
          <Breadcrumb label="News" />
          <NewsGrid />
        </section>
      </main>
      <Footer />
    </>
  );
}
