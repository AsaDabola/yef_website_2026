import { getT } from "@/lib/i18n/server";
import { backgroundClasses, type BackgroundValue } from "@/components/generic/background";

export default async function GenericQuote({
  quote,
  reference,
  background,
}: {
  quote: string;
  reference?: string;
  background?: BackgroundValue;
}) {
  const t = await getT();
  const bg = backgroundClasses(background);
  return (
    <section className={`${bg.section} px-6 py-16 text-center lg:py-20`}>
      <div className="mx-auto max-w-[849px]">
        <p className="font-semibold text-2xl text-[#609efa] italic leading-[40px] tracking-[-0.8px] lg:text-[33px] lg:leading-[50px]">
          {t(quote)}
        </p>
        {reference ? <p className={`mt-4 text-base font-medium ${bg.body}`}>{t(reference)}</p> : null}
      </div>
    </section>
  );
}
