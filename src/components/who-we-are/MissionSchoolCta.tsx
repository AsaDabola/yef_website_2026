import Image from "next/image";
import Link from "next/link";
import HoverGroup from "@/components/ui/HoverGroup";
import Reveal from "@/components/ui/Reveal";

const cards = [
  {
    eyebrow: "What Is Mission School?",
    title: "Curriculum",
    cta: "SEE THE PROGRAM",
    href: "/yef-mission-school#curriculum",
    image:
      "https://www.figma.com/api/mcp/asset/aeea7846-bae9-4c22-880b-e6224b605808.png",
    alt: "A student studying the Bible",
  },
  {
    eyebrow: "Learning Mission",
    title: "Apply Now",
    cta: "START YOUR APPLICATION",
    href: "/yef-mission-school#apply",
    image:
      "https://www.figma.com/api/mcp/asset/92309262-73f7-4f49-9633-ebdb8924b8f6.png",
    alt: "Graduation caps thrown in the air",
  },
];

export default function MissionSchoolCta() {
  return (
    <section className="font-body bg-gradient-to-b from-yef-primary to-yef-primary-light">
      <div className="mx-auto max-w-[1920px] px-6 py-24 sm:px-10 lg:px-19">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <h2 className="font-display font-extrabold text-4xl text-white tracking-[-0.8px] sm:text-5xl">
              YEF Mission School
            </h2>
            <Link
              href="/yef-mission-school"
              className="mt-4 inline-flex items-center gap-2 font-semibold text-white transition-opacity hover:opacity-80"
            >
              Learn about the Mission School
              <span aria-hidden="true">&rarr;</span>
            </Link>
            <p className="mt-6 max-w-xl text-lg text-white leading-relaxed">
              We strive to equip young believers to know the Gospel, grow as
              disciples, and participate in mission. Through Bible study,
              prayer, evangelism, and practical ministry training,
              participants are prepared to share God&rsquo;s Word, serve
              others, and carry the Gospel to campuses and nations.
            </p>
          </Reveal>

          <Reveal delay={150}>
            <HoverGroup className="grid grid-cols-2 gap-5">
              {cards.map((card) => (
                <Link
                  key={card.title}
                  href={card.href}
                  className="group relative flex aspect-[320/533] flex-col justify-between overflow-hidden rounded-[20px] bg-[#1a1e22] p-6"
                >
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    sizes="(min-width: 1024px) 20vw, 45vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e1216] from-5% via-[#0e1216]/35 via-45% to-[#0e1216]/5" />
                  <div className="absolute inset-0 bg-white/0 transition-colors duration-300 group-hover:bg-white/10" />

                  <p className="relative font-semibold text-[11px] text-white/85 tracking-[1.6px] uppercase">
                    {card.eyebrow}
                  </p>

                  <div className="relative">
                    <p className="font-display font-extrabold text-2xl text-white tracking-[-0.3px] sm:text-3xl">
                      {card.title}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#6abbff] px-4 py-2.5 font-bold text-[11px] text-[#06222b] tracking-[0.72px] uppercase">
                      {card.cta}
                      <span aria-hidden="true">&rarr;</span>
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
