import Image from "next/image";
import FeatureCard from "@/components/who-we-are/FeatureCard";
import { getT } from "@/lib/i18n/server";

export default async function MinistrySection({
  id,
  title,
  body,
  resourceColumns,
  image,
  alt,
  ctas,
}: {
  id: string;
  title: string;
  body: string;
  resourceColumns?: string[][];
  image: string;
  alt: string;
  ctas?: { label: string; href: string; primary?: boolean }[];
}) {
  const t = await getT();
  return (
    <section
      id={id}
      className="scroll-mt-32 border-black/10 border-t pt-16 pb-16 first:border-t-0 first:pt-0"
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_344px] lg:gap-16">
        <div className="min-w-0">
          <span
            aria-hidden="true"
            className="block h-[3px] w-[40px] bg-[#0066cf]"
          />
          <h2 className="mt-7 font-display font-extrabold text-3xl text-black leading-[1.1] tracking-[-0.5px] lg:text-[34px] lg:leading-[37.4px]">
            {title}
          </h2>
          <p className="mt-8 max-w-[556px] text-[16.6px] text-black leading-[27.2px]">
            {body}
          </p>

          {ctas && ctas.length > 0 && (
            <div className="mt-9 flex flex-wrap gap-4">
              {ctas.map((cta) => (
                <a
                  key={cta.label}
                  href={cta.href}
                  className={
                    cta.primary
                      ? "inline-flex items-center justify-center rounded-full bg-[#0066cf] px-[34px] py-4 font-semibold text-[12px] text-white tracking-[1.92px] uppercase transition-transform duration-200 hover:scale-105 hover:opacity-90"
                      : "inline-flex items-center justify-center rounded-full border border-[#00203f] px-[34px] py-4 font-semibold text-[12px] text-[#00203f] tracking-[1.92px] transition-transform duration-200 hover:scale-105"
                  }
                >
                  {t(cta.label)}
                </a>
              ))}
            </div>
          )}

          {resourceColumns && resourceColumns.length > 0 && (
            <div className="mt-12">
              <p className="font-semibold text-[15.1px] text-black leading-[16.62px]">
                {t("YEF Resources")}
              </p>
              <div className="mt-6 flex flex-wrap gap-x-16 gap-y-2">
                {resourceColumns.map((column, i) => (
                  <ul key={i} className="space-y-[9px]">
                    {column.map((item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className="inline-flex items-center gap-2 text-[15.8px] text-black leading-[20.8px] transition-opacity hover:opacity-70"
                        >
                          <Image
                            src="/images/icons/icon-arrow-right-blue.svg"
                            alt=""
                            width={18}
                            height={18}
                            aria-hidden="true"
                            className="shrink-0"
                          />
                          <span className="border-[#0066cf] border-b pb-[2px]">
                            {item}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          )}
        </div>

        <FeatureCard
          image={image}
          alt={alt}
          eyebrow={t("Get Involved")}
          title={title}
          className="justify-self-center lg:justify-self-end"
        />
      </div>
    </section>
  );
}
