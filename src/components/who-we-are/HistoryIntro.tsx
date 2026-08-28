import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb";
import WhoWeAreSubMenu from "@/components/WhoWeAreSubMenu";
import { getT } from "@/lib/i18n/server";

export default async function HistoryIntro() {
  const t = await getT();
  return (
    <section className="mx-auto max-w-[1800px] px-6 py-16 lg:px-16">
      <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
        <div className="shrink-0 lg:w-[237px]">
          <WhoWeAreSubMenu />
        </div>

        <div className="flex-1">
          <Breadcrumb label={t("History")} />
          <h1 className="mt-[46px] font-display font-extrabold text-4xl text-black leading-[1.1] tracking-[-0.96px] sm:text-5xl lg:text-[54px] lg:leading-[60px]">
            {t("History")}
          </h1>
          <p className="mt-[18px] font-medium text-[18.9px] text-[#4b5565] leading-[30px]">
            {t("Our Story So Far")}
          </p>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-[849fr_477fr]">
            <div className="relative aspect-[849/637] w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/history/hero-large.png"
                alt={t("Youth Evangelical Fellowship headquarters building")}
                fill
                sizes="(min-width: 640px) 45vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col gap-4">
              <div className="relative aspect-[477/311] w-full overflow-hidden rounded-2xl">
                <Image
                  src="/images/history/hero-small-top.png"
                  alt={t("YEF international staff gathered together")}
                  fill
                  sizes="(min-width: 640px) 26vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="group relative aspect-[477/311] w-full overflow-hidden rounded-2xl">
                <Image
                  src="/images/history/hero-small-bottom.png"
                  alt={t("Students on a campus mission trip")}
                  fill
                  sizes="(min-width: 640px) 26vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/60 font-medium text-lg text-white transition-opacity group-hover:bg-black/70">
                  {t("See More")}
                  <Image
                    src="/images/icons/icon-arrow-right-24-white.svg"
                    alt=""
                    width={28}
                    height={28}
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </div>

          <h2 className="mt-16 max-w-3xl font-semibold text-3xl text-black sm:text-4xl">
            {t("From a Small Campus Mission to a Global Youth Fellowship")}
          </h2>

          <div className="mt-8 max-w-3xl space-y-6 text-lg text-black">
            <p>
              {t(
                "Youth Evangelical Fellowship (YEF) traces its roots to 2002, when Apostolos Campus Ministry (ACM) was founded by Dr. David Jang together with students from Olivet Theological College and Seminary (OTCS). In 2003, the ministry began developing into what would become Youth Evangelical Fellowship, carrying a growing vision to reach university students through the Word of God, discipleship, and evangelism.",
              )}
            </p>
            <p>
              {t(
                "A significant new chapter began in New York City in 2009, when YEF was inaugurated with students from Columbia University who were moved by the Holy Spirit to gather for small-group Bible studies and share the gospel of Jesus Christ with their fellow students. From these early gatherings, YEF developed with a clear focus: to reach university students who are thirsty for the Word of God, help them grow as disciples of Jesus Christ, and raise a young generation willing to participate in God’s mission.",
              )}
            </p>
            <p>
              {t(
                "By the grace of God, the ministry continued expanding internationally. By 2015, YEF’s mission had reached campuses across North America, South America, Europe, Africa, Asia Pacific, Southeast Asia, and South Asia. The growth of YEF reflects Jesus’ description of the Kingdom of God:",
              )}
            </p>
            <blockquote className="border-l-4 border-yef-primary pl-6 text-xl italic text-yef-navy">
              {t(
                "“It is like a mustard seed, which, when sown upon the soil, though it is smaller than all the seeds that are upon the soil, yet when it is sown, it grows up and becomes larger than all the garden plants and forms large branches; so that the birds of the air can nest under its shade.” — Mark 4:31–32",
              )}
            </blockquote>
            <p>
              {t(
                "YEF’s commission is to raise a young generation who love the Cross of Jesus Christ, boldly proclaim His sacrifice and the power of His salvation, and dream together for the Kingdom of God. YEF firmly believes in international growth and in equipping young people from diverse backgrounds to devote themselves to Jesus Christ and His Great Commission. Through biblical teaching, discipleship, evangelism, leadership development, retreats, mission conferences, and local fellowship life, YEF seeks to help young believers passionately embody Kingdom-centered lifestyles. Youth Evangelical Fellowship is a member of the World Olivet Assembly and an associate member of the World Evangelical Alliance.",
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
