import type { Metadata } from "next";
import Image from "next/image";
import SubPageHero from "@/components/SubPageHero";
import Breadcrumb from "@/components/Breadcrumb";
import WhoWeAreSubMenu from "@/components/WhoWeAreSubMenu";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Welcome | Youth Evangelical Fellowship",
};

export default function WelcomePage() {
  return (
    <>
      <main>
        <SubPageHero />
        <section className="mx-auto max-w-[1800px] px-6 py-16 lg:px-16">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
            <div className="shrink-0 lg:w-[237px]">
              <WhoWeAreSubMenu />
            </div>

            <div className="flex-1">
              <Breadcrumb label="Welcome" />
              <p className="mt-6 max-w-2xl font-normal text-3xl text-black sm:text-4xl">
                YEF is dedicated to revealing the Gospel of Jesus Christ in
                our daily lives, transforming our communities, and bringing
                the good news to all people. As creative and committed
                Christians, we work daily to quench the spiritual drought in
                our cities and restore the hearts of many around the world.
              </p>

              <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
                <div className="space-y-6 text-lg text-black">
                  <p>
                    Youth Evangelical Fellowship is a group of proactive,
                    outreaching Christians, whose youth and passion are spent
                    on bringing glory to God&rsquo;s name. We want to see the
                    Great Commission of Jesus fulfilled in each and every
                    major city in the world as he promised in his prayer,
                    &ldquo;thy kingdom come, thy will be done on earth as it
                    is in heaven.&rdquo; (Matthew 6:10) YEF has been a symbol
                    of revival in urban mission since its establishment,
                    working to redeem college campuses for the greater cause
                    of Jesus Christ.
                  </p>
                  <p>
                    You are about to dive into the deep Word of God with our
                    members at your local fellowships and university
                    campuses. I sincerely pray that YEF will strengthen you
                    spiritually and that you will be fully equipped in spirit
                    and truth while you walk on this faith journey. We thank
                    you for your continued prayers for YEF as we work to make
                    meaningful changes in the lives of many.
                  </p>
                  <p>
                    Welcome to the beginning of an amazing journey with God!
                    We are excited to help you on your journey of faith to
                    grow closer to God!
                  </p>
                </div>

                <div className="relative aspect-[344/573] w-full max-w-[344px] justify-self-center overflow-hidden rounded-[20px] bg-[#1a1e22] lg:justify-self-end">
                  <Image
                    src="https://www.figma.com/api/mcp/asset/b8e34bde-e9bb-4a6c-853c-71147a428f3c.png"
                    alt="Sunset over the ocean"
                    fill
                    sizes="(min-width: 1024px) 25vw, 90vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(14,18,22,0.94)] from-[4%] via-[rgba(14,18,22,0.35)] via-[46%] to-[rgba(14,18,22,0.05)]" />
                  <div className="absolute inset-0 flex flex-col justify-between p-[26px]">
                    <p className="w-[110px] font-semibold text-[11px] text-white/85 leading-[16.5px] tracking-[1.6045px] uppercase">
                      Thy kingdom come, thy will be done on earth as it is in
                      heaven.
                      <span className="block font-normal">Matthew 6:10</span>
                    </p>
                    <div>
                      <p className="font-extrabold text-[34px] text-white leading-[34px] tracking-[-0.2899px]">
                        Welcome
                      </p>
                      <div className="h-[48.5px]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
