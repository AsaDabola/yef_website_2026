import Image from "next/image";
import Link from "@/components/ui/LocaleLink";
import HoverGroup from "@/components/ui/HoverGroup";
import Reveal from "@/components/ui/Reveal";
import { getT } from "@/lib/i18n/server";

const cards = [
  {
    eyebrow: "What Is Mission School?",
    title: "Curriculum",
    cta: "SEE THE PROGRAM",
    href: "/yef-mission-school#curriculum",
    image: "/images/mission-school/curriculum.png",
    alt: "A student studying the Bible",
  },
  {
    eyebrow: "Learning Mission",
    title: "Apply Now",
    cta: "START YOUR APPLICATION",
    href: "/yef-mission-school#apply",
    image: "/images/mission-school/apply-now.png",
    alt: "Graduation caps thrown in the air",
  },
];

export default async function MissionSchoolCta() {
  const t = await getT();
  return (
    <section className="font-body bg-gradient-to-b from-yef-primary to-yef-primary-light">
      <div className="mx-auto max-w-[1440px] px-6 py-20 sm:px-10 lg:px-12 xl:pt-[79px] xl:pb-[52px]">
        <div className="flex flex-col gap-14 xl:flex-row xl:items-center xl:justify-between xl:gap-0">
          <Reveal className="xl:w-[35.3%]">
            <h2 className="font-display font-extrabold text-4xl text-white leading-[50px] tracking-[-0.8px] sm:text-5xl lg:text-[54.4px]">
              {t("YEF Mission School")}
            </h2>
            <Link
              href="/yef-mission-school"
              className="mt-6 inline-flex items-center gap-2 font-semibold text-[15px] text-white leading-[20px] transition-opacity hover:opacity-80 lg:mt-[31px]"
            >
              {t("Learn about the Mission School")}
              <Image
                src="/images/icons/icon-arrow-right-24-white.svg"
                alt=""
                width={24}
                height={24}
                aria-hidden="true"
              />
            </Link>
            <p className="mt-6 font-medium text-lg text-white leading-[30px] lg:mt-[23px] lg:text-[19.2px]">
              {t(
                "We strive to equip young believers to know the Gospel, grow as disciples, and participate in mission. Through Bible study, prayer, evangelism, and practical ministry training, participants are prepared to share God’s Word, serve others, and carry the Gospel to campuses and nations.",
              )}
            </p>
          </Reveal>

          <Reveal delay={150} className="xl:w-[49.4%]">
            <HoverGroup className="grid grid-cols-2 gap-6">
              {cards.map((card) => (
                <Link
                  key={card.title}
                  href={card.href}
                  className="group relative flex aspect-[320/533] flex-col justify-between overflow-hidden rounded-[20px] bg-[#1a1e22] p-[26px]"
                >
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    sizes="(min-width: 1024px) 320px, 45vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(14,18,22,0.94)] from-[4%] via-[rgba(14,18,22,0.35)] via-[46%] to-[rgba(14,18,22,0.05)]" />
                  <div className="absolute inset-0 bg-white/0 transition-colors duration-300 group-hover:bg-white/10" />

                  <p className="relative max-w-[110px] font-semibold text-[11px] text-white/85 leading-[16.5px] tracking-[1.6045px] uppercase">
                    {t(card.eyebrow)}
                  </p>

                  <div className="relative">
                    <p className="font-extrabold text-[34px] text-white leading-[34px] tracking-[-0.2899px]">
                      {t(card.title)}
                    </p>
                    <span className="mt-[39px] inline-flex items-center gap-[7px] rounded-full bg-[#6abbff] px-[18px] py-2.5 font-bold text-xs text-[#06222b] leading-[18px] tracking-[0.72px] uppercase">
                      {t(card.cta)}
                      <Image
                        src="/images/icons/icon-arrow-right-24-white.svg"
                        alt=""
                        width={24}
                        height={24}
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              ))}
            </HoverGroup>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
