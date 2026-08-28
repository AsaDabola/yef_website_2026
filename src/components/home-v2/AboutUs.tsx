import Image from "next/image";
import Link from "@/components/ui/LocaleLink";
import Reveal from "@/components/ui/Reveal";
import { getT } from "@/lib/i18n/server";

const defaults = {
  image: "/images/home-v2/about-us-photo.png",
  imageAlt: "Students celebrating together on campus",
  eyebrow: "About Us",
  heading: "A global campus",
  headingAccent: "fellowship",
  lead: "YEF is a global evangelical fellowship where university students encounter Christ, grow in the Word, and learn to share the Gospel with others.",
  body: "Founded in New York City in 2009, YEF began with students gathering around Scripture, prayer, and campus evangelism. As disciples were raised and new leaders were sent out, the fellowship expanded across cities and nations, united by the same Gospel and mission.",
  stats: [
    { value: "WORD", label: "ROOTED IN SCRIPTURE" },
    { value: "MISSION", label: "FROM CAMPUS TO NATIONS" },
  ],
};

export type AboutUsContent = Partial<typeof defaults>;

/**
 * Content comes from the page's About block when a country has published one,
 * and from `defaults` otherwise — so every country inherits the design until
 * it chooses to say something of its own.
 */
export default async function AboutUs({ content }: { content?: AboutUsContent }) {
  const t = await getT();
  const c = { ...defaults, ...content };
  const stats = c.stats?.length ? c.stats : defaults.stats;
  return (
    <section className="font-body bg-white">
      <div className="mx-auto max-w-[1920px] px-6 py-24 sm:px-10 lg:px-19">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          <Reveal className="group relative aspect-[620/700] w-full cursor-pointer overflow-hidden transition-transform duration-300 hover:-translate-y-1">
            <Image
              src={c.image}
              alt={t(c.imageAlt)}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </Reveal>

          <Reveal delay={120}>
            <p className="font-semibold text-[11px] text-v2-muted tracking-[2.42px] uppercase">
              {t(c.eyebrow)}
            </p>
            <h2 className="mt-5 font-display font-bold text-4xl text-v2-navy leading-none tracking-[-1.35px] sm:text-5xl lg:text-[54px]">
              {t(c.heading)}{" "}
              <span className="font-instrument-serif font-normal italic text-v2-accent tracking-[-0.4px]">
                {t(c.headingAccent)}
              </span>
              .
            </h2>
            <p className="mt-5 font-medium text-[20px] text-v2-navy leading-[1.6]">
              {t(c.lead)}
            </p>
            <p className="mt-5 text-[15.5px] text-v2-muted-dark leading-[1.8]">
              {t(c.body)}
            </p>

            <div className="mt-6 flex flex-wrap gap-14 pb-3.5 pt-6">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display font-bold text-[44px] text-v2-accent tracking-[-1.32px]">
                    {stat.value}
                  </p>
                  <p className="mt-2 font-semibold text-xs text-v2-muted tracking-[1.56px] uppercase">
                    {t(stat.label)}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="/who-we-are"
              className="mt-4 inline-flex items-center justify-center rounded-full border border-v2-navy px-8.5 py-4 font-semibold text-xs text-v2-navy tracking-[1.92px] uppercase transition-colors hover:bg-v2-navy hover:text-white"
            >
              {t("Our Mission")}
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
