import Image from "next/image";
import Header from "@/components/Header";

type SubPageHeroProps = {
  /** Banner photo. Defaults to the shared sailboat banner. */
  image?: string;
  alt?: string;
};

export default function SubPageHero({
  image = "/images/shared/subpage-hero-bg.png",
  alt = "",
}: SubPageHeroProps) {
  return (
    <section className="relative h-[220px] overflow-hidden bg-yef-navy-deep sm:h-[320px] lg:h-[450px]">
      <Image
        src={image}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />
      <Header />
    </section>
  );
}
