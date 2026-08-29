import Image from "next/image";
import Link from "@/components/ui/LocaleLink";
import HoverGroup from "@/components/ui/HoverGroup";
import Reveal from "@/components/ui/Reveal";
import WhoWeAreSubMenu from "@/components/WhoWeAreSubMenu";
import { getT } from "@/lib/i18n/server";

const defaultCards = [
  {
    eyebrow: "NEW TO YEF?\nSTART YOUR\nJOURNEY HERE",
    title: "Welcome",
    cta: "START HERE",
    href: "/who-we-are/welcome",
    image: "/images/who-we-are/intro-welcome.png",
    alt: "Youth Evangelical Fellowship building",
  },
  {
    eyebrow: "READY TO\nJOIN THE\nFELLOWSHIP",
    title: "Membership",
    cta: "JOIN US",
    href: "/who-we-are/membership",
    image: "/images/who-we-are/intro-membership.png",
    alt: "Three students smiling together outdoors on a mission trip",
  },
  {
    eyebrow: "WHAT WE\nBELIEVE AND\nTEACH",
    title: "Statement of Faith",
    cta: "READ MORE",
    href: "/who-we-are/statement-of-faith",
    image: "/images/who-we-are/intro-statement-of-faith.png",
    alt: "A wooden cross resting on an open Bible before a world map",
  },
];

const defaults = {
  eyebrow: "Who we are",
  heading: "Youth Evangelical Fellowship",
};

export type IntroCard = {
  eyebrow?: string;
  title?: string;
  cta?: string;
  image?: string;
};

export type IntroCardsContent = Partial<typeof defaults> & {
  cards?: IntroCard[];
};

/**
 * The three cards keep their bundled destinations (`href`) and alt text
 * regardless of what an editor saves — they are fixed navigation to the
 * three pages beneath Who We Are, not free content.
 */
export default async function IntroCards({
  content,
}: {
  content?: IntroCardsContent;
}) {
  const t = await getT();
  const c = { ...defaults, ...content };
  const cards = defaultCards.map((card, i) => ({
    ...card,
    ...(content?.cards?.[i] ?? {}),
  }));
  return (
    <section className="font-body bg-white">
      <div className="mx-auto max-w-[1920px] px-6 pt-20 pb-16 sm:px-10 lg:px-[4.27%] lg:pt-[155px] lg:pb-[116px]">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-[13.85%]">
          <div className="shrink-0 lg:sticky lg:top-32 lg:w-[237px] lg:self-start">
            <WhoWeAreSubMenu />
          </div>

          <div className="min-w-0 flex-1 lg:max-w-[1120px] lg:px-6">
            <Reveal>
              <p className="font-semibold text-xs text-[#626973] leading-[18px] tracking-[2.64px] uppercase">
                {t(c.eyebrow)}
              </p>
              <h2 className="mt-3.5 font-display font-extrabold text-4xl text-[#0e1216] leading-[1] tracking-[-1.5906px] sm:text-5xl lg:text-[54.4px] 2xl:whitespace-nowrap">
                {t(c.heading)}
              </h2>
            </Reveal>

            <Reveal delay={120}>
              <HoverGroup className="mt-[46px] grid grid-cols-1 gap-5 sm:grid-cols-3">
                {cards.map((card) => (
                  <Link
                    key={card.title}
                    href={card.href}
                    className="group relative flex aspect-[344/573] flex-col justify-between overflow-hidden rounded-[20px] bg-[#1a1e22] p-[26px]"
                  >
                    <Image
                      src={card.image}
                      alt={t(card.alt)}
                      fill
                      sizes="(min-width: 1024px) 344px, 90vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(14,18,22,0.94)] from-[4%] via-[rgba(14,18,22,0.35)] via-[46%] to-[rgba(14,18,22,0.05)]" />

                    <p className="relative max-w-[110px] whitespace-pre-line font-semibold text-[11px] text-white/85 leading-[16.5px] tracking-[1.6045px] uppercase">
                      {t(card.eyebrow)}
                    </p>

                    <div className="relative">
                      <p className="font-extrabold text-[34px] text-white leading-[34px] tracking-[-0.2899px]">
                        {t(card.title)}
                      </p>
                      <span className="mt-[48.5px] inline-flex items-center gap-[7px] rounded-full bg-[#6abbff] px-[18px] py-2.5 font-bold text-xs text-[#06222b] leading-[18px] tracking-[0.72px] uppercase">
                        {t(card.cta)}
                        <span aria-hidden="true">&rarr;</span>
                      </span>
                    </div>
                  </Link>
                ))}
              </HoverGroup>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
