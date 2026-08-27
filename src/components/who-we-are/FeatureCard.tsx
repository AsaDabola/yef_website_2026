import type { ReactNode } from "react";
import Image from "next/image";

type FeatureCardProps = {
  image: string;
  alt: string;
  eyebrow: ReactNode;
  title: string;
  className?: string;
};

/**
 * The 344x573 photo card the Who We Are subpages share: a full-bleed image
 * under a bottom-up scrim, a small uppercase caption at the top and the
 * section title at the bottom.
 */
export default function FeatureCard({
  image,
  alt,
  eyebrow,
  title,
  className,
}: FeatureCardProps) {
  return (
    <div
      className={`relative aspect-[344/573] w-full max-w-[344px] overflow-hidden rounded-[20px] bg-[#1a1e22] ${className ?? ""}`}
    >
      <Image
        src={image}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 344px, 90vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(14,18,22,0.94)] from-[4%] via-[rgba(14,18,22,0.35)] via-[46%] to-[rgba(14,18,22,0.05)]" />
      <div className="absolute inset-0 flex flex-col justify-between p-[26px]">
        <p className="w-[110px] font-semibold text-[11px] text-white/85 leading-[16.5px] tracking-[1.6045px] uppercase">
          {eyebrow}
        </p>
        <div>
          <p className="font-extrabold text-[34px] text-white leading-[34px] tracking-[-0.2899px]">
            {title}
          </p>
          <div className="h-[48.5px]" />
        </div>
      </div>
    </div>
  );
}
