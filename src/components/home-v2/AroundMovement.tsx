import Image from "next/image";
import Link from "@/components/ui/LocaleLink";
import HoverGroup from "@/components/ui/HoverGroup";
import Reveal from "@/components/ui/Reveal";
import { getMovementItems } from "@/lib/posts";
import { getT } from "@/lib/i18n/server";

export default async function AroundMovement() {
  const t = await getT();
  const items = await getMovementItems();

  return (
    <section className="font-body bg-[#f2f6fb]">
      {/* 1920x750 frame: a 1440 column at x=240, y=49, with the three 469
          cards on a 496 row from y=118. */}
      <div className="mx-auto max-w-[1440px] px-6 py-24 sm:px-10 lg:pt-[49px] lg:pb-[94px] 2xl:px-0">
        <Reveal>
          <h2 className="font-display font-bold text-4xl text-v2-navy tracking-[-0.4px] sm:text-5xl lg:text-[54px]">
            {t("Around the")}{" "}
            <span className="font-instrument-serif font-normal italic text-v2-accent">
              {t("Movement")}
            </span>
          </h2>
        </Reveal>

        <Reveal delay={120} className="mt-14">
          <HoverGroup className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {items.map((item) => {
              const tile = (
                <div className="group relative aspect-[469/496] w-full cursor-pointer overflow-hidden">
                  <Image
                    src={item.image}
                    alt={t(item.alt)}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {item.title && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      {/* The frame sets the caption 30 in from each side and
                          55 up from the foot of the 496 card. */}
                      <div className="absolute right-[30px] bottom-[55px] left-[30px] text-white">
                        <p className="font-semibold text-[11px] text-white/60 tracking-[2.42px] uppercase">
                          {t(item.tag)}
                        </p>
                        <p className="mt-[11px] font-display font-bold text-[23px] leading-[28px] tracking-[-0.46px]">
                          {t(item.title)}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              );

              return item.href ? (
                <Link key={item.title} href={item.href} className="block">
                  {tile}
                </Link>
              ) : (
                <div key={item.title}>{tile}</div>
              );
            })}
          </HoverGroup>
        </Reveal>
      </div>
    </section>
  );
}
