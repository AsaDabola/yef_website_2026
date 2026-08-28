import Image from "next/image";
import HeaderV2 from "@/components/home-v2/HeaderV2";
import { getT } from "@/lib/i18n/server";
import SiteName from "@/components/ui/SiteName";

export default async function GetInvolvedHero() {
  const t = await getT();
  return (
    <section className="relative flex min-h-[560px] items-center overflow-hidden bg-[#00203f] lg:min-h-[61vw]">
      <Image
        src="/images/get-involved/hero-beach.png"
        alt={t("Aerial view of waves washing onto a sandy shore")}
        fill
        priority
        sizes="100vw"
        // The photograph is still, so the water is given a very slow drift
        // and swell — enough that the surf reads as moving, slow enough that
        // it never pulls the eye off the copy.
        className="yef-tide object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/63 from-[14.5%] to-transparent to-[46.2%]" />
      {/* The frame's 176px band, carrying the white nav over the bright surf. */}
      <div className="absolute inset-x-0 top-0 h-[176px] bg-gradient-to-b from-black/20 via-black/20 via-50% to-transparent" />

      <HeaderV2 />

      <div className="relative z-10 mx-auto grid w-full max-w-[1920px] grid-cols-1 gap-14 px-6 pt-40 pb-16 sm:px-10 lg:grid-cols-2 lg:gap-10 lg:px-[8.33%] lg:pt-[17.7%] lg:pb-[12.4%]">
        <div className="max-w-[600px]">
          <h1 className="font-display font-extrabold text-6xl leading-[0.98] tracking-[-2.4px] text-white sm:text-7xl xl:text-[96px]">
            {t("Get Involved")}
          </h1>
          <p className="mt-8 font-medium text-lg text-white leading-[30px] xl:mt-[31px] xl:text-[19px]">
            {t(
              "YEF is a global movement to inspire young generations to become purpose-driven leaders, who seek to follow the passionate life of Jesus Christ and transform the lives of others as well as their own. By creating an evangelical and witnessing community on campus among students, YEF is hoping to create a seedbed of great revival through the youth across the world, that would ignite the passion and love for Christ into people’s heart.",
            )}
          </p>
          <p className="font-medium text-lg text-white leading-[30px] xl:text-[19px]">
            {t(
              "Across the world, the YEF staff, volunteers and members are dedicated to using their talents and youth for kingdom building works. Our main activities for basic operation include:",
            )}
          </p>
        </div>

        <div className="relative aspect-[655/492] w-full self-center overflow-hidden rounded-[16px] lg:justify-self-end xl:max-w-[655px]">
          <Image
            src="/images/get-involved/hero-inset-student.png"
            alt={t("A smiling student wearing a backpack on a wooded trail")}
            fill
            sizes="(min-width: 1280px) 35vw, 90vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 from-[14%] to-transparent to-[39%]" />
          <p className="absolute bottom-[8%] left-[6%] w-[181px] max-w-[45%] font-semibold text-[13px] text-white leading-[16.5px] tracking-[1.6045px] uppercase">
            {t(
              "“YEF is a global movement empowering purpose-driven young leaders to ignite revival across campuses around the world.”",
            )}
          </p>
        </div>
      </div>

      <p className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap text-center text-[11px] tracking-[2.2px] text-white uppercase lg:bottom-[5.5%]">
        <SiteName />
      </p>
    </section>
  );
}
