import Image from "next/image";
import HoverGroup from "@/components/ui/HoverGroup";
import Reveal from "@/components/ui/Reveal";

const testimonials = [
  {
    quote:
      "I grew up knowing about God the way you know about a city you've never visited. Bible study was the first time someone asked what I actually believed — and waited for the answer.",
    name: "Tamara Hollis",
    place: "Orlando, United States",
    image: "/images/home-v2/testimonial-tamara.png",
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

export default function Testimonials() {
  return (
    <section className="border-t border-v2-border bg-white">
      <div className="mx-auto max-w-[1920px] px-6 py-24 sm:px-10 lg:px-19">
        <Reveal>
          <p className="text-center font-semibold text-[11px] text-v2-muted tracking-[2.42px] uppercase">
            Testimonials
          </p>
          <h2 className="mt-4 text-center font-display font-bold text-4xl text-v2-navy tracking-[-1.45px] sm:text-5xl">
            You are the Christ, the Son of the{" "}
            <span className="font-instrument-serif font-normal italic text-v2-accent">
              living God
            </span>
            .
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <HoverGroup className="mt-16 grid grid-cols-1 gap-px overflow-hidden border-y border-v2-navy/15 bg-v2-navy/15 sm:grid-cols-3 sm:border-x">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-white px-10 pb-10 pt-11"
              >
                <p className="font-instrument-serif text-4xl text-v2-blue">
                  &ldquo;
                </p>
                <p className="mt-4 text-base text-v2-navy leading-relaxed">
                  {testimonial.quote}
                </p>
                <div className="mt-8 flex items-center gap-3.5 border-t border-v2-navy/15 pt-5">
                  <div className="group relative size-12 shrink-0 cursor-pointer overflow-hidden rounded-full">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      sizes="48px"
                      className="object-cover transition-transform duration-500 group-hover:scale-125"
                    />
                    <div className="absolute inset-0 rounded-full bg-v2-accent/0 transition-colors duration-300 group-hover:bg-v2-accent/25" />
                  </div>
                  <div>
                    <p className="font-semibold text-[14.5px] text-v2-navy">
                      {testimonial.name}
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
