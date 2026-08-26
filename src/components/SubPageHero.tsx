import Image from "next/image";
import Header from "@/components/Header";

type SubPageHeroProps = {
  /** Banner photo. Defaults to the shared sunrise banner. */
  image?: string;
  alt?: string;
};

export default function SubPageHero({
  image = "/images/shared/banner-sunrise-ridges.jpg",
  alt = "",
}: SubPageHeroProps) {
  return (
    // The frame's sub_banner section is 378 tall, not the 450 of the photo
    // placed inside it — the photo overflows and is cropped. The smaller
    // breakpoints keep the same proportion.
    <section className="relative h-[185px] overflow-hidden bg-yef-navy-deep sm:h-[270px] lg:h-[378px]">
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
