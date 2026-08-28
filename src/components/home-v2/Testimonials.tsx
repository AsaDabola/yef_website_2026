import Image from "next/image";
import HoverGroup from "@/components/ui/HoverGroup";
import Reveal from "@/components/ui/Reveal";
import Rich from "@/components/ui/Rich";
import { getT } from "@/lib/i18n/server";

const testimonials = [
  {
    quote:
      "I grew up knowing about God the way you know about a city you've never visited. Bible study was the first time someone asked what I actually believed — and waited for the answer.",
    name: "Tamara Hollis",
    place: "Orlando, United States",
    image: "/images/home-v2/testimonial-tamara.webp",
  },
  {
    quote:
      "I joined for the free dinner. I stayed because someone read Romans with me every week for a year and never once made me feel behind.",
    name: "James Wong",
    place: "Hong Kong",
    image: "/images/home-v2/testimonial-james.png",
  },
  {
    quote:
      "Before YEF my faith was something I inherited. Now it is something I carry — to my campus, to my family, to the students coming after me.",
    name: "Esther Niyonzima",
    place: "Bujumbura, Burundi",
    image: "/images/home-v2/testimonial-esther.png",
  },
];

export default async function Testimonials() {
  const t = await getT();
  return (
    <section className="font-body border-t border-v2-border bg-white">
      <div className="mx-auto max-w-[1440px] px-6 py-24 sm:px-10 lg:pt-[131px] lg:pb-[112px] 2xl:px-0">
        <Reveal>
          <p className="text-center font-semibold text-[11px] text-v2-muted tracking-[2.42px] uppercase">
            {t("Testimonials")}
          </p>
          <h2 className="mt-4 text-center font-display font-bold text-4xl text-v2-navy tracking-[-1.45px] sm:text-5xl lg:text-[58px]">
            <Rich
              text={t("From Students **to Disciples**.")}
              emphasis="font-instrument-serif font-normal italic text-v2-accent"
            />
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <HoverGroup className="mt-16 grid grid-cols-1 divide-y divide-v2-border overflow-hidden sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {/* h-full keeps every card the height of its cell so the rules
                between them run the full height whatever the quotes reflow to. */}
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="h-full bg-white px-10 pt-[46px] pb-10"
              >
                <p className="font-instrument-serif text-4xl text-yef-primary">
                  &ldquo;
                </p>
                <p className="mt-4 text-base text-v2-navy leading-[1.7]">
                  {t(testimonial.quote)}
                </p>
                <div className="mt-8 flex items-center gap-3.5 border-t border-v2-border pt-5">
                  <div className="group relative size-12 shrink-0 cursor-pointer overflow-hidden rounded-full">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      sizes="48px"
                      className="object-cover transition-transform duration-500 group-hover:scale-125"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-[14.5px] text-v2-navy">
                      {t(testimonial.name)}
                    </p>
                    <p className="text-[12.5px] text-v2-muted">
                      {testimonial.place}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </HoverGroup>
        </Reveal>
      </div>
    </section>
  );
}
