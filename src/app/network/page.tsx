import type { Metadata } from "next";
import Image from "next/image";
import HeaderV2 from "@/components/home-v2/HeaderV2";
import Breadcrumb from "@/components/Breadcrumb";
import ChapterMap from "@/components/network/ChapterMap";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Network | Youth Evangelical Fellowship",
};

export default function NetworkPage() {
  return (
    <>
      <main>
        <section className="relative h-[220px] overflow-hidden bg-v2-navy sm:h-[320px] lg:h-[378px]">
          <Image
            src="/images/get-involved/banner-crowd.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
          <HeaderV2 />
        </section>

        <section className="mx-auto max-w-[1800px] px-6 py-16 lg:px-16">
          <Breadcrumb label="Network" />
          <h1 className="mt-6 max-w-2xl font-display font-bold text-4xl text-v2-navy tracking-[-1px] sm:text-5xl">
            Find a chapter near you.
          </h1>
          <p className="mt-4 max-w-xl text-v2-muted-dark leading-relaxed">
            YEF chapters meet on campuses in more than 40 countries. Search
            the list or drop a pin to see who&rsquo;s leading a fellowship
            near you.
          </p>

          <div className="mt-10">
            <ChapterMap />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
