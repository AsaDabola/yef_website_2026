import type { ReactNode } from "react";
import Image from "next/image";

type FeatureItem = {
  icon: string;
  title: string;
  body: ReactNode;
};

type GetInvolvedFeatureProps = {
  id: string;
  title: string;
  intro: string;
  image: string;
  alt: string;
  items: FeatureItem[];
  /** Run each item's title and body together on one line rather than stacking them. */
  inlineItems?: boolean;
  link: { label: string; href: string };
};

/**
 * The two-column band the Get Involved sections share: heading and intro over a
 * photo on the left, icon-led points and a text link on the right.
 */
export default function GetInvolvedFeature({
  id,
  title,
  intro,
  image,
  alt,
  items,
  inlineItems = false,
  link,
}: GetInvolvedFeatureProps) {
  return (
    <section id={id} className="scroll-mt-32 rounded-[24px] bg-[#f1f6ff]">
      <div className="px-8 py-12 sm:px-12 sm:py-16 lg:px-12 lg:py-24">
        <h2 className="font-display font-extrabold text-3xl text-black leading-[1.1] tracking-[-0.8px] sm:text-4xl lg:text-[46px] lg:leading-[50px]">
          {title}
        </h2>
        <p className="mt-[34px] max-w-[734px] font-medium text-[18.9px] text-[#4b5565] leading-[30px]">
          {intro}
        </p>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
          <div className="relative aspect-[640/492] w-full min-w-0 overflow-hidden rounded-[16px]">
            <Image
              src={image}
              alt={alt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="min-w-0">
            <div className="space-y-8">
              {items.map((item) => (
                <div key={item.title} className="flex gap-8">
                  <div className="flex h-[56px] w-[40px] shrink-0 items-start justify-center rounded-[16px] bg-white pt-4">
                    <Image
                      src={item.icon}
                      alt=""
                      width={24}
                      height={24}
                      aria-hidden="true"
                    />
                  </div>
                  <p className="text-[15.1px] text-[#4b5565] leading-[24px]">
                    <span className="font-semibold text-black">
                      {item.title}
                    </span>
                    {inlineItems ? " " : <br />}
                    {item.body}
                  </p>
                </div>
              ))}
            </div>

            <a
              href={link.href}
              className="mt-12 ml-[72px] inline-flex items-center gap-2 font-semibold text-[15.3px] text-[#1d46d8] leading-[20px] transition-opacity hover:opacity-80"
            >
              {link.label}
              <Image
                src="/images/icons/icon-arrow-right-24-blue.svg"
                alt=""
                width={24}
                height={24}
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
