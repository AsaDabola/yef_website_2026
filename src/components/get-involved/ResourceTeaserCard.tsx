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
      <div className="absolute inset-0 bg-gradient-to-t from-[#0e1216] from-5% via-[#0e1216]/25 via-45% to-[#0e1216]/5" />
      <p className="absolute left-6 top-6 font-semibold text-[11px] text-white/85 tracking-[1.6px] uppercase">
        Get Involved
      </p>
      <p className="absolute bottom-6 left-6 font-display font-extrabold text-2xl text-white tracking-[-0.3px]">
        {title}
      </p>
    </a>
  );
}
