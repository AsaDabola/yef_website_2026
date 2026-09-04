import { getT } from "@/lib/i18n/server";
import Link from "@/components/ui/LocaleLink";
import { backgroundClasses, type BackgroundValue } from "@/components/generic/background";

export default async function GenericCta({
  heading,
  body,
  button,
  background,
}: {
  heading: string;
  body?: string;
  button: { label: string; href: string };
  background?: BackgroundValue;
}) {
  const t = await getT();
  const bg = backgroundClasses(background);
  return (
    <section className={`${bg.section} px-6 py-20 text-center lg:py-[100px]`}>
      <div className="mx-auto max-w-[1391px]">
        <h2
          className={`font-display font-semibold text-3xl sm:text-[34px] sm:leading-[37.4px] ${bg.heading}`}
        >
          {t(heading)}
        </h2>
        {body ? (
          <p className={`mx-auto mt-5 max-w-[640px] text-[16.6px] leading-[27.2px] ${bg.body}`}>
            {t(body)}
          </p>
        ) : null}
        <Link
          href={button.href}
          className="mt-9 inline-block rounded-full bg-[#0066cf] px-10 py-4 font-semibold text-xs text-white tracking-[1.92px] uppercase transition-transform duration-200 hover:scale-[1.02]"
        >
          {t(button.label)}
        </Link>
      </div>
    </section>
  );
}
