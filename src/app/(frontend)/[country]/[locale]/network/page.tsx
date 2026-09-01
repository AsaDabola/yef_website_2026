import type { Metadata } from "next";
import HeaderV2 from "@/components/home-v2/HeaderV2";
import Breadcrumb from "@/components/Breadcrumb";
import ChapterMap from "@/components/network/ChapterMap";
import CountryDirectory from "@/components/network/CountryDirectory";
import NetworkGlobe from "@/components/network/NetworkGlobe";
import Footer from "@/components/Footer";
import { getT } from "@/lib/i18n/server";
import { applyRequestLocale, type LocaleParams } from "@/lib/i18n/request";

export const metadata: Metadata = {
  title: "Network | Youth Evangelical Fellowship",
};

export default async function NetworkPage({ params }: { params: LocaleParams }) {
  await applyRequestLocale(params);
  const t = await getT();
  return (
    <>
      <main>
        {/* A real, rotating D3 globe of the actual world carries the hero —
            every chapter country plotted at its real coordinates, arcing out
            from Orlando headquarters. */}
        <section
          className="relative grid min-h-[738px] grid-cols-1 items-center gap-12 overflow-hidden px-6 pt-32 pb-14 sm:px-10 lg:grid-cols-[minmax(0,0.86fr)_minmax(420px,1.14fr)] lg:px-[92px] lg:pt-[134px]"
          style={{
            background:
              "radial-gradient(circle at 75% 8%, rgba(104,201,255,0.20), transparent 23%), linear-gradient(180deg, #1777b8 0%, #70c9f2 9%, #ddf3ff 21%, #f8fcff 29%, #ffffff 36%, #ffffff 100%)",
          }}
        >
          <HeaderV2 />

          <div className="relative z-[2] max-w-[550px]">
            <p className="mb-5 font-semibold text-[#356a93] text-xs tracking-[0.19em] uppercase">

{t("Youth Evangelical Fellowship International")}
</p>
            <h1 className="font-display text-[#062a51] text-[46px] leading-[0.98] tracking-[-0.05em] sm:text-6xl lg:text-[78px]">

{t("Our Global")}
<br />
<em className="font-serif font-normal text-[#48a8ff] not-italic">{t("Network.")}</em>
</h1>
            <div className="mt-[26px] max-w-[470px] space-y-4 text-[#365675] text-[17px] leading-[1.7]">
              <p>

{t("YEF is a growing global fellowship of young people seeking to know Christ, grow together in His Word, and make Him known in their communities.")}
</p>
              <p>

{t("From college campuses to cities around the world, every chapter is united by one faith, one hope, and one mission.")}
</p>
            </div>
            <a
              href="#chapters"
              className="mt-[30px] inline-flex items-center gap-3.5 rounded-full border border-[#0b4f91] px-[21px] py-[13px] font-semibold text-[#07335d] text-xs tracking-[0.1em] hover:bg-[#0b4f91] hover:text-white"
            >

{t("FIND A CHAPTER")}
<span aria-hidden="true">&rarr;</span>
</a>
          </div>

          <NetworkGlobe />
        </section>

        <section id="chapters" className="mx-auto max-w-[1800px] px-6 py-16 lg:px-16">
          <Breadcrumb label={t("Network")} />
          <h1 className="mt-6 max-w-2xl font-display font-bold text-4xl text-v2-navy tracking-[-1px] sm:text-5xl">

{t("Find a chapter near you.")}
</h1>
          <p className="mt-4 max-w-xl text-v2-muted-dark leading-relaxed">

{t("YEF chapters meet on campuses around the world. Search the list or drop a pin to see who’s leading a fellowship near you.")}
</p>

          <div className="mt-10">
            <ChapterMap />
          </div>
        </section>

        <CountryDirectory />
      </main>
      <Footer />
    </>
  );
}
