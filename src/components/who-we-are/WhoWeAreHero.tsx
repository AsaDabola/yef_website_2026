import Image from "next/image";
import Link from "@/components/ui/LocaleLink";
import HeaderV2 from "@/components/home-v2/HeaderV2";
import { getT } from "@/lib/i18n/server";
import SiteName from "@/components/ui/SiteName";

export default async function WhoWeAreHero() {
  const t = await getT();
  return (
    <section className="font-body relative min-h-[760px] overflow-hidden bg-v2-navy lg:min-h-[61vw]">
      <div className="absolute inset-0 bg-gradient-to-b from-v2-navy via-v2-blue via-55% to-[#00142a]" />
      <Image
        src="/images/who-we-are/hero-mountains.png"
        alt={t("Mountain range at dusk")}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* The frame's 176px band, the same one the sub-banners carry: black
          at 0.2 down to the halfway point, then clear, so the white nav
          reads over the ridge line without dimming the photograph. */}
      <div className="absolute inset-x-0 top-0 h-[176px] bg-gradient-to-b from-black/20 via-black/20 via-50% to-transparent" />

      <HeaderV2 />

      <div className="relative z-10 mx-auto grid max-w-[1920px] grid-cols-1 gap-14 px-6 pt-40 pb-28 sm:px-10 lg:px-[10%] lg:pt-[16.7%] lg:pb-[12%] xl:grid-cols-[39.06fr_42.63fr] xl:justify-between xl:gap-[18.31%]">
        <div>
          <h1 className="font-display font-extrabold text-6xl leading-[0.98] tracking-[-2.4px] text-white sm:text-7xl xl:text-[96px]">
            {t("Who We Are")}
          </h1>
          <p className="mt-8 font-medium text-lg text-white leading-[32px] xl:mt-[53px] xl:text-[19px] xl:leading-[39px]">
            {t(
              "YEF is dedicated to revealing the Gospel of Jesus Christ in our daily lives, transforming our communities, and bringing the good news to all people. As creative and committed Christians, we work daily to quench the spiritual drought in our cities and restore the hearts of many around the world.",
            )}
          </p>
          <Link
            href="/who-we-are/welcome"
            className="mt-8 inline-flex h-[47px] items-center justify-center rounded-full border border-white/55 px-[34px] font-semibold text-xs tracking-[1.92px] text-white transition-colors hover:bg-white hover:text-v2-navy xl:mt-[21px]"
          >
            {t("WELCOME")}
          </Link>

          <p className="mt-10 font-medium text-lg text-white leading-[32px] xl:mt-[55px] xl:text-[19px] xl:leading-[39px]">
            <span className="font-bold">{t("Mission Statement: ")} </span>

            {t(
              "YEF exists to reach and plant the Gospel of Christ’s love into the souls of the youth on campus—those who can bring great, lasting impact to the future of Christian faith.",
            )}
          </p>
        </div>

        <div className="xl:pt-5">
          <div className="relative aspect-[655/492] w-full overflow-hidden rounded-2xl">
            <Image
              src="/images/who-we-are/hero-president-portrait.webp"
              alt={t(
                "Dr. Mark Wagner, President of Youth Evangelical Fellowship",
              )}
              fill
              sizes="(min-width: 1280px) 43vw, 90vw"
              className="object-cover"
            />
            <p className="absolute bottom-[6%] left-[8.5%] w-[181px] max-w-[45%] font-semibold text-[13px] uppercase leading-[16.5px] tracking-[1.6045px] text-white">
              {t(
                "“God has a Great Calling for His people. Walk the journey with faith and you will find true joy and peace”",
              )}
            </p>
          </div>
          <p className="mt-[28px] font-signature capitalize text-[22px] leading-[32.5px] tracking-[0.6px] text-white/85 xl:pl-[26px]">
            {t("- Dr. Mark Wagner, President of Youth Evangelical Fellowship")}
          </p>
        </div>
      </div>

      <p className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap text-center text-[11px] tracking-[2.2px] text-white uppercase lg:bottom-[3.4%]">
        <SiteName />
      </p>
    </section>
  );
}
