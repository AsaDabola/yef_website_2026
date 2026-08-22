import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

const stats = [
  { value: "40+", label: "COUNTRIES REACHED" },
  { value: "2009", label: "FOUNDED IN NYC" },
  { value: "1", label: "NAME WE CARRY" },
];

export default function AboutUs() {
  return (
    <section className="font-body bg-white">
      <div className="mx-auto max-w-[1920px] px-6 py-24 sm:px-10 lg:px-19">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          <Reveal className="group relative aspect-[620/700] w-full cursor-pointer overflow-hidden transition-transform duration-300 hover:-translate-y-1">
            <Image
              src="/images/home-v2/about-us-photo.png"
              alt="Students celebrating together on campus"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </Reveal>

          <Reveal delay={120}>
            <p className="font-semibold text-[11px] text-v2-muted tracking-[2.42px] uppercase">
              About Us
            </p>
            <h2 className="mt-5 font-display font-bold text-4xl text-v2-navy leading-none tracking-[-1.35px] sm:text-5xl lg:text-[54px]">
              We are a fellowship of the{" "}
              <span className="font-instrument-serif font-normal italic text-v2-accent tracking-[-0.4px]">
                young
              </span>
              .
            </h2>
            <p className="mt-5 font-medium text-[20px] text-v2-navy leading-[1.6]">
              YEF is a group of proactive, outreaching Christians whose youth
              and passion are spent bringing glory to God&rsquo;s name.
            </p>
            <p className="mt-5 text-[15.5px] text-v2-muted-dark leading-[1.8]">
              It began in 2009 with a handful of students in New York City
              who wanted more than a Sunday faith. They opened their Bibles
              between classes, prayed in dorm rooms, and invited whoever
              would come. What started on two campuses has become a
              fellowship present in more than forty countries.
            </p>

            <div className="mt-6 flex flex-wrap gap-14 pb-3.5 pt-6">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display font-bold text-[44px] text-v2-accent tracking-[-1.32px]">
                    {stat.value}
                  </p>
                  <p className="mt-2 font-semibold text-xs text-v2-muted tracking-[1.56px] uppercase">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="/who-we-are"
              className="mt-4 inline-flex items-center justify-center rounded-full border border-v2-navy px-8.5 py-4 font-semibold text-xs text-v2-navy tracking-[1.92px] uppercase transition-colors hover:bg-v2-navy hover:text-white"
            >
              Our Mission
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
