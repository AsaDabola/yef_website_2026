import Image from "next/image";

export default function ResourceTeaserCard({
  image,
  alt,
  title,
  href,
}: {
  image: string;
  alt: string;
  title: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="group relative block aspect-[344/573] w-full overflow-hidden rounded-[20px] bg-v2-navy"
    >
      <Image
        src={image}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 25vw, 90vw"
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0e1216]/75 from-4% via-[#0e1216]/28 via-47% to-[#0e1216]/[0.04]" />
      <p className="absolute top-[26px] left-[26px] font-semibold text-[11px] text-white/85 tracking-[1.6px] uppercase">
        Get Involved
      </p>
      <p className="absolute bottom-[48px] left-[26px] font-display font-extrabold text-[34px] text-white leading-[34px] tracking-[-0.29px]">
        {title}
      </p>
    </a>
  );
}
