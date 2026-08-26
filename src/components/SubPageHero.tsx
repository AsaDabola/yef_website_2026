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
      {/* The frame's 176px band: black at 0.2 down to the halfway point, then
          clear — it carries the white nav over a bright photograph without
          darkening the rest of the picture. */}
      <div className="absolute inset-x-0 top-0 h-[176px] bg-gradient-to-b from-black/20 via-black/20 via-50% to-transparent" />
      <Header />
    </section>
  );
}
