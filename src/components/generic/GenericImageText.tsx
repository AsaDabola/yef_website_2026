import Image from "next/image";
import { getT } from "@/lib/i18n/server";
import Link from "@/components/ui/LocaleLink";

export default async function GenericImageText({
  image,
  imageAlt,
  imageSide = "left",
  heading,
  body,
  button,
}: {
  image: string;
  imageAlt?: string;
  imageSide?: "left" | "right";
  heading: string;
  body: string;
  button?: { label: string; href: string };
}) {
  const t = await getT();
  return (
    <section className="mx-auto max-w-[1391px] px-6 py-16 lg:py-[100px]">
      <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-[#dcdfe5] bg-white lg:grid-cols-[672fr_671fr]">
        <div
          className={`relative min-h-[320px] w-full lg:min-h-[480px] ${imageSide === "right" ? "lg:order-2" : ""}`}
        >
          <Image
            src={image}
            alt={t(imageAlt || "")}
            fill
            sizes="(min-width: 1024px) 672px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center px-8 py-12 lg:py-0 lg:pr-[108px] lg:pl-12">
          <h2 className="font-display font-semibold text-3xl text-black tracking-[-0.64px] lg:text-[40px] lg:leading-[44px]">
            {t(heading)}
          </h2>
          <p className="mt-4 font-medium text-[#4b5565] text-base leading-[30px] lg:text-[18.9px]">
            {t(body)}
          </p>
          {button ? (
            <Link
              href={button.href}
              className="mt-8 inline-block w-fit rounded-full bg-[#0066cf] px-10 py-4 font-semibold text-xs text-white tracking-[1.92px] uppercase transition-transform duration-200 hover:scale-[1.02]"
            >
              {t(button.label)}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
