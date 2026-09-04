import Image from "next/image";
import { getT } from "@/lib/i18n/server";
import Link from "@/components/ui/LocaleLink";
import { backgroundClasses, type BackgroundValue } from "@/components/generic/background";

export default async function GenericFeature({
  heading,
  intro,
  image,
  imageAlt,
  items,
  button,
  background,
}: {
  heading: string;
  intro: string;
  image: string;
  imageAlt?: string;
  items: { icon?: string; title: string; body: string }[];
  button?: { label: string; href: string };
  background?: BackgroundValue;
}) {
  const t = await getT();
  const bg = backgroundClasses(background);
  return (
    <section className={`${bg.section} px-6 py-16 lg:py-20`}>
      <div className="mx-auto max-w-[1391px] rounded-[24px] bg-[#f1f6ff] px-8 py-12 sm:px-12 sm:py-16 lg:px-12 lg:py-24">
        <h2
          className={`font-display font-extrabold text-3xl leading-[1.1] tracking-[-0.8px] sm:text-4xl lg:text-[46px] lg:leading-[50px] ${bg.heading}`}
        >
          {t(heading)}
        </h2>
        <p className={`mt-[34px] max-w-[734px] font-medium text-[18.9px] leading-[30px] ${bg.body}`}>
          {t(intro)}
        </p>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
          <div className="relative aspect-[640/492] w-full min-w-0 overflow-hidden rounded-[16px]">
            <Image
              src={image}
              alt={t(imageAlt || "")}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="min-w-0">
            <div className="space-y-8">
              {items.map((item) => (
                <div key={item.title} className="flex gap-8">
                  {item.icon ? (
                    <div className="flex h-[56px] w-[40px] shrink-0 items-start justify-center rounded-[16px] bg-white pt-4">
                      <Image src={item.icon} alt="" width={24} height={24} aria-hidden="true" />
                    </div>
                  ) : null}
                  <p className={`text-[15.1px] leading-[24px] ${bg.body}`}>
                    <span className={`font-semibold ${bg.heading}`}>{t(item.title)}</span>
                    <br />
                    {t(item.body)}
                  </p>
                </div>
              ))}
            </div>

            {button ? (
              <Link
                href={button.href}
                className="mt-12 inline-flex items-center gap-2 font-semibold text-[15.3px] text-[#1d46d8] leading-[20px] transition-opacity hover:opacity-80"
              >
                {t(button.label)}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
