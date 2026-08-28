import Image from "next/image";
import Link from "@/components/ui/LocaleLink";
import Reveal from "@/components/ui/Reveal";
import { getT } from "@/lib/i18n/server";

const defaultPillars = [
  {
    title: "Reach the Next Generation",
    body: "Share the Gospel with university students and young people, helping them encounter Jesus Christ and build their lives upon God's Word.",
    icon: "/images/icons/icon-christ.svg",
  },
  {
    title: "Raise Disciples and Leaders",
    body: "Nurture young believers through Bible study, fellowship, and spiritual training, equipping them to become faithful disciples who can lead and serve others.",
    icon: "/images/icons/icon-church.svg",
  },
  {
    title: "Advance the Gospel to the Nations",
    body: "Establish and strengthen campus fellowships around the world, raising missionaries and sending the next generation to participate in the Great Commission.",
    icon: "/images/icons/icon-child.svg",
  },
];

const defaults = {
  heading: "Our Vision & Mission",
  body: "Youth Evangelical Fellowship (YEF) is dedicated to revealing the Gospel of Jesus Christ in our daily lives, transforming our communities, and bringing the good news to all people. As creative and committed Christians, we work daily to quench the spiritual drought in our cities and restore the hearts of many worldwide.",
  image: "/images/who-we-are/vision-cross-bible.jpg",
};

export type VisionMissionPillar = { title?: string; body?: string };

export type VisionMissionContent = Partial<typeof defaults> & {
  pillars?: VisionMissionPillar[];
};

/**
 * Each pillar keeps its bundled icon regardless of what an editor saves —
 * icons are a fixed set of three, not a free upload.
 */
export default async function VisionMission({
  content,
}: {
  content?: VisionMissionContent;
}) {
  const t = await getT();
  const c = { ...defaults, ...content };
  const pillars = defaultPillars.map((pillar, i) => ({
    ...pillar,
    ...(content?.pillars?.[i] ?? {}),
  }));
  return (
    <section className="font-body bg-[#f1f6ff]">
      <div className="mx-auto max-w-[1440px] px-6 py-20 sm:px-10 lg:px-12 lg:py-24">
        <Reveal>
          <h2 className="font-display font-extrabold text-4xl text-black leading-[50px] tracking-[-0.8px] sm:text-5xl lg:text-[54.4px]">
            {t(c.heading)}
          </h2>
          <p className="mt-6 max-w-[749px] font-medium text-lg text-[#4b5565] leading-[30px] lg:mt-[34px] lg:text-[18.9px]">
            {t(c.body)}
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-12 grid grid-cols-1 gap-10 lg:mt-[47px] lg:grid-cols-[655fr_627fr] lg:items-start lg:gap-[33px]">
            <div className="group relative aspect-[655/492] w-full cursor-pointer overflow-hidden rounded-2xl">
              <Image
                src={c.image}
                alt={t("A wooden cross resting on an open Bible")}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            <div>
              <div className="space-y-10 lg:space-y-12">
                {pillars.map((pillar, i) => (
                  <div key={i} className="flex gap-[17px]">
                    <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white">
                      <Image
                        src={defaultPillars[i].icon}
                        alt=""
                        width={24}
                        height={24}
                        aria-hidden="true"
                      />
                    </div>
                    <p className="pt-1 text-[15px] text-black leading-[24px]">
                      <span className="font-semibold">{t(pillar.title)} :</span>{" "}
                      <span className="font-medium text-[#4b5565]">
                        {t(pillar.body)}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
              <Link
                href="/who-we-are/welcome"
                className="mt-10 inline-flex items-center gap-2 font-semibold text-[15px] text-[#1d46d8] leading-[20px] transition-opacity hover:opacity-80 lg:mt-[56px]"
              >
                {t("Learn more about how we’re different")}
                <Image
                  src="/images/icons/icon-arrow-right-24-blue.svg"
                  alt=""
                  width={24}
                  height={24}
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
