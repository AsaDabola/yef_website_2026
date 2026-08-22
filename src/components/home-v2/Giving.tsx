import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

export default function Giving() {
  return (
    <section className="font-body bg-v2-bg">
      <div className="mx-auto max-w-[1920px] px-6 py-24 sm:px-10 lg:px-19">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="font-semibold text-[11px] text-v2-muted tracking-[2.42px] uppercase">
              Giving
            </p>
            <h2 className="mt-4 font-display font-bold text-4xl text-v2-navy tracking-[-0.4px] sm:text-5xl lg:text-[54px]">
              Giving is{" "}
              <span className="font-instrument-serif font-normal italic text-v2-accent">
                worship
              </span>
              .
            </h2>
            <p className="mt-8 text-[16px] text-v2-muted-dark leading-[1.8]">
              Every Bible study, every plane ticket, every student who gets to
              spend a summer in the Word instead of a second job &mdash;
              someone gave so that could happen.
            </p>
            <p className="mt-4 text-[16px] text-v2-muted-dark leading-[1.8]">
              We do not think in percentages or obligations. We give because
              He gave first, and because a generation is waiting on the
              other side of it.
            </p>

            <div className="mt-10 flex flex-wrap gap-3.5">
              <Link
                href="/donate"
                className="inline-flex items-center justify-center rounded-full bg-yef-primary px-8 py-4 font-semibold text-xs text-white tracking-[1.92px] uppercase transition-transform duration-200 hover:scale-105 hover:opacity-90"
              >
                Give Now
              </Link>
              <Link
                href="/donate#support-a-student"
                className="inline-flex items-center justify-center rounded-full border border-v2-navy px-8 py-4 font-semibold text-xs text-v2-navy tracking-[1.92px] uppercase transition-all duration-200 hover:scale-105 hover:bg-v2-navy hover:text-white"
              >
                Support a Student
              </Link>
            </div>
          </Reveal>

          <Reveal
            delay={150}
            className="group relative aspect-[700/520] w-full cursor-pointer overflow-hidden"
          >
            <Image
              src="/images/home-v2/giving-bg.png"
              alt="An aerial forest canopy forming the shape of a world map"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <p className="absolute bottom-3.5 left-3.5 font-normal text-[10.5px] text-white tracking-[1.05px]">
              Donate YEF
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
