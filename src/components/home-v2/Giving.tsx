import Image from "next/image";
import Link from "@/components/ui/LocaleLink";
import Reveal from "@/components/ui/Reveal";
import { getT } from "@/lib/i18n/server";

export default async function Giving() {
  const t = await getT();
  return (
    <section className="font-body bg-v2-bg">
      {/* 1920x750 frame: a 1440 column at x=240, holding a 640 text column
          and a 700 image 100 apart. 32fr/35fr is that 640:700 split. */}
      <div className="mx-auto max-w-[1440px] px-6 py-24 sm:px-10 lg:pt-[110px] lg:pb-[120px] 2xl:px-0">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[32fr_35fr] lg:items-center lg:gap-[100px]">
          <Reveal>
            <p className="font-semibold text-[11px] text-v2-muted tracking-[2.42px] uppercase">
              {t("Giving")}
            </p>
            <h2 className="mt-5 font-display font-bold text-4xl text-v2-navy tracking-[-0.4px] sm:text-5xl lg:text-[54px]">
              {t("Support the")}{" "}
              <span className="font-instrument-serif font-normal italic text-v2-accent">
                mission
              </span>
              .
            </h2>
            <p className="mt-5 text-[16px] text-v2-muted-dark leading-[1.8]">
              {t(
                "Every Bible study, training, mission trip, and new campus fellowship is made possible through people who pray, serve, and give. Your partnership helps students hear the Gospel, grow in the Word, and be equipped to serve others.",
              )}
            </p>
            <p className="mt-4 text-[16px] text-v2-muted-dark leading-[1.8]">
              {t(
                "Together, we can strengthen campus ministries and help carry the Gospel to new students, new campuses, and new nations.",
              )}
            </p>

            <div className="mt-9 flex flex-wrap gap-3.5">
              <Link
                href="/donate"
                className="inline-flex items-center justify-center rounded-full bg-yef-primary px-8 py-4 font-semibold text-xs text-white tracking-[1.92px] uppercase transition-transform duration-200 hover:scale-105 hover:opacity-90"
              >
                {t("Give Now")}
              </Link>
              <Link
                href="/donate#support-a-student"
                className="inline-flex items-center justify-center rounded-full border border-v2-navy px-8 py-4 font-semibold text-xs text-v2-navy tracking-[1.92px] uppercase transition-all duration-200 hover:scale-105 hover:bg-v2-navy hover:text-white"
              >
                {t("Support a Student")}
              </Link>
            </div>
          </Reveal>

          <Reveal
            delay={150}
            className="group relative aspect-[700/520] w-full cursor-pointer overflow-hidden"
          >
            <Image
              src="/images/home-v2/giving-bg.png"
              alt={t(
                "An aerial forest canopy forming the shape of a world map",
              )}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <p className="absolute bottom-3.5 left-3.5 font-normal text-[10.5px] text-white tracking-[1.05px]">
              {t("Donate YEF")}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
