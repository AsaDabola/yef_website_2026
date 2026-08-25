import type { Metadata } from "next";
import Image from "next/image";
import HeaderV2 from "@/components/home-v2/HeaderV2";
import Breadcrumb from "@/components/Breadcrumb";
import ChapterMap from "@/components/network/ChapterMap";
import GlobalPulse from "@/components/network/GlobalPulse";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Network | Youth Evangelical Fellowship",
};

export default function NetworkPage() {
  return (
    <>
      <main>
        {/* The frame's hero is one dark 1173px band with the globe running off
            the bottom edge behind the copy. */}
        <section className="relative flex min-h-[640px] flex-col overflow-hidden bg-[#020810] lg:h-[1173px]">
          <div className="absolute inset-0">
            <GlobalPulse />
          </div>
          {/* The copy sits over the dim side of the globe on the frame's wide
              layout; stacked, it lands on the bright dome, so scrim it. */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#020810] via-[#020810]/80 to-transparent lg:bg-gradient-to-r lg:from-[#020810]/85 lg:via-[#020810]/25 lg:to-transparent" />

          <HeaderV2 />

          <div className="relative mx-auto flex w-full max-w-[1920px] flex-1 items-center px-6 pt-32 pb-24 sm:px-10 lg:px-[196px] lg:pt-0 lg:pb-0">
            <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-[572px_653px] lg:justify-between lg:gap-0">
              <div>
                <h1 className="font-display font-extrabold text-5xl text-white leading-[1.05] tracking-[-1.5px] sm:text-6xl lg:text-[72px]">
                  Our Global
                  <br />
                  Network
                </h1>
                <div className="mt-8 max-w-[572px] space-y-6 text-[17px] text-white/80 leading-[30px] lg:text-[19px]">
                  <p>
                    YEF is a growing global fellowship of young people who are
                    seeking to know Christ, grow together in His Word, and make
                    Him known in their communities.
                  </p>
                  <p>
                    From college campuses to cities around the world, each YEF
                    chapter is a local expression of the same vision: to raise a
                    generation of young people who live for Christ and bring the
                    Gospel to others.
                  </p>
                  <p>
                    Our chapters connect students and young adults through Bible
                    study, fellowship, discipleship, prayer, leadership training,
                    and mission. While every chapter has its own local culture
                    and community, we are united by one faith, one hope, and one
                    mission.
                  </p>
                </div>
              </div>

              <div className="relative aspect-[653/492] w-full overflow-hidden rounded-2xl shadow-[0_30px_80px_rgba(2,8,16,0.55)]">
                <Image
                  src="/images/network/hero-global-network.png"
                  alt="A circle of YEF members with their arms around one another in prayer"
                  fill
                  priority
                  sizes="(min-width: 1024px) 653px, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <p className="relative pb-8 text-center font-semibold text-[11px] text-white/40 tracking-[3px] uppercase">
            Youth Evangelical Fellowship International
          </p>
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
