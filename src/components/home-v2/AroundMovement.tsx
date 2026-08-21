import Image from "next/image";
import HoverGroup from "@/components/ui/HoverGroup";
import Reveal from "@/components/ui/Reveal";

const items = [
  {
    tag: "",
    title: "",
    image: "/images/home-v2/get-involved-bible-study.png",
    alt: "Summer Training 2027",
  },
  {
    tag: "FIELD REPORT",
    title: "YEF Africa Grows",
    image: "/images/home-v2/movement-africa.png",
    alt: "YEF Africa field team",
  },
  {
    tag: "NEW CHAPTER",
    title: "YEF Europe Summer Camp",
    image: "/images/home-v2/movement-europe.png",
    alt: "YEF Europe summer camp students jumping for a photo",
  },
];

export default function AroundMovement() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1920px] px-6 py-24 sm:px-10 lg:px-19">
        <Reveal>
          <h2 className="font-display font-bold text-4xl text-v2-navy tracking-[-1px] sm:text-5xl">
            Around the{" "}
            <span className="font-instrument-serif font-normal italic text-v2-accent">
              Movement
            </span>
          </h2>
        </Reveal>

        <Reveal delay={120} className="mt-14">
          <HoverGroup className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {items.map((item) => (
              <div
                key={item.alt}
                className="group relative aspect-[469/496] w-full cursor-pointer overflow-hidden"
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-v2-accent/0 transition-colors duration-300 group-hover:bg-v2-accent/20" />
                {item.title && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-8 left-8 right-8 text-white">
                      <p className="font-semibold text-[11px] tracking-[1.98px] uppercase text-white/80">
                        {item.tag}
                      </p>
                      <p className="mt-2 font-display font-bold text-2xl">
                        {item.title}
                      </p>
                    </div>
                  </>
                )}
              </div>
            ))}
          </HoverGroup>
        </Reveal>
      </div>
    </section>
  );
}
