import Image from "next/image";
import Link from "next/link";
import HoverGroup from "@/components/ui/HoverGroup";
import Reveal from "@/components/ui/Reveal";

const cards = [
  {
    eyebrow: ["NEW TO YEF?", "START YOUR", "JOURNEY HERE"],
    title: "Welcome",
    cta: "START HERE",
    href: "/who-we-are/welcome",
    image:
      "https://www.figma.com/api/mcp/asset/852aad3b-8c8a-411c-9229-9f29eb88c78f.png",
    alt: "Youth Evangelical Fellowship building",
  },
  {
    eyebrow: ["READY TO", "JOIN THE", "FELLOWSHIP"],
    title: "Membership",
    cta: "JOIN US",
    href: "/who-we-are/membership",
    image:
      "https://www.figma.com/api/mcp/asset/c99860a7-bbe0-4181-b564-3d6fbc0aa39e.png",
    alt: "Students smiling together outdoors",
  },
  {
    eyebrow: ["WHAT WE", "BELIEVE AND", "TEACH"],
    title: "Statement of Faith",
    cta: "READ MORE",
    href: "/who-we-are/statement-of-faith",
    image:
      "https://www.figma.com/api/mcp/asset/0efb6c97-5175-4567-90d9-157233c1a8be.png",
    alt: "An open Bible beside a wooden cross",
  },
];

export default function IntroCards() {
  return (
    <section className="font-body bg-white">
      <div className="mx-auto max-w-[1920px] px-6 py-24 sm:px-10 lg:px-19">
        <Reveal className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="font-semibold text-xs text-[#626973] tracking-[2.64px] uppercase">
              Who we are
            </p>
            <h2 className="mt-3 font-display font-extrabold text-4xl text-[#0e1216] tracking-[-1px] sm:text-5xl">
              Youth Evangelical Fellowship
            </h2>
          </div>
          <p className="max-w-sm text-[#626973] leading-relaxed">
            YEF exists to bring the Gospel into daily life, transform
            communities, and reach the world with the good news.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <HoverGroup className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {cards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="group relative flex aspect-[344/573] flex-col justify-between overflow-hidden rounded-[20px] bg-[#1a1e22] p-6"
              >
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, 90vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1216] from-5% via-[#0e1216]/35 via-45% to-[#0e1216]/5" />
                <div className="absolute inset-0 bg-v2-accent/0 transition-colors duration-300 group-hover:bg-v2-accent/15" />

                <p className="relative font-semibold text-[11px] text-white/85 tracking-[1.6px] uppercase">
                  {card.eyebrow.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>

                <div className="relative">
                  <p className="font-display font-extrabold text-3xl text-white tracking-[-0.3px]">
                    {card.title}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#6abbff] px-4.5 py-2.5 font-bold text-[11px] text-[#06222b] tracking-[0.72px] uppercase">
                    {card.cta}
                    <span aria-hidden="true">&rarr;</span>
                  </span>
                </div>
              </Link>
            ))}
          </HoverGroup>
        </Reveal>
      </div>
    </section>
  );
}
