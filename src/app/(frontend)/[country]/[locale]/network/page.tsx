import type { Metadata } from "next";
import HeaderV2 from "@/components/home-v2/HeaderV2";
import Breadcrumb from "@/components/Breadcrumb";
import ChapterMap from "@/components/network/ChapterMap";
import CountryDirectory from "@/components/network/CountryDirectory";
import NetworkGlobe from "@/components/network/NetworkGlobe";
import Footer from "@/components/Footer";
import { getT } from "@/lib/i18n/server";
import { applyRequestLocale, type LocaleParams } from "@/lib/i18n/request";
import SiteName from "@/components/ui/SiteName";

export const metadata: Metadata = {
  title: "Network | Youth Evangelical Fellowship",
};

export default async function NetworkPage({ params }: { params: LocaleParams }) {
  await applyRequestLocale(params);
  const t = await getT();
  return (
    <>
      <main>
        {/* Same frame as every other category page's hero — only the photo
            slot is swapped for the interactive globe, and the band itself
            is the light blue-to-white gradient instead of a dark photo band,
            so the globe (and its own light theme) reads naturally. */}
        <section
          className="relative flex min-h-[640px] flex-col overflow-hidden lg:h-[1173px]"
          style={{
            background:
              "linear-gradient(180deg, #1777b8 0%, #70c9f2 9%, #ddf3ff 21%, #f8fcff 29%, #ffffff 36%, #ffffff 100%)",
          }}
        >
          <HeaderV2 />

          <div className="relative mx-auto flex w-full max-w-[1920px] flex-1 items-center px-6 pt-32 pb-24 sm:px-10 lg:px-[196px] lg:pt-0 lg:pb-0">
            <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-[572px_653px] lg:justify-between lg:gap-0">
              <div>
                <h1 className="font-display font-extrabold text-5xl text-v2-navy leading-[1.05] tracking-[-1.5px] sm:text-6xl lg:text-[72px]">

{t("Our Global")}
<br />

{t("Network")}
</h1>
                <div className="mt-8 max-w-[572px] space-y-6 text-[17px] text-v2-muted-dark leading-[30px] lg:text-[19px]">
                  <p>

{t("YEF is a growing global fellowship of young people who are seeking to know Christ, grow together in His Word, and make Him known in their communities.")}
</p>
                  <p>

{t("From college campuses to cities around the world, each YEF chapter is a local expression of the same vision: to raise a generation of young people who live for Christ and bring the Gospel to others.")}
</p>
                  <p>

{t("Our chapters connect students and young adults through Bible study, fellowship, discipleship, prayer, leadership training, and mission. While every chapter has its own local culture and community, we are united by one faith, one hope, and one mission.")}
</p>
                </div>
              </div>

              <div className="relative w-full">
                <NetworkGlobe />
              </div>
            </div>
          </div>

          <p className="relative pb-8 text-center font-semibold text-[11px] text-v2-muted-dark tracking-[3px] uppercase">

<SiteName />
</p>
        </section>

        <section className="mx-auto max-w-[1800px] px-6 py-16 lg:px-16">
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
