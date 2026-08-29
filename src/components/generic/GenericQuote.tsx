import { getT } from "@/lib/i18n/server";

export default async function GenericQuote({
  quote,
  reference,
}: {
  quote: string;
  reference?: string;
}) {
  const t = await getT();
  return (
    <section className="mx-auto max-w-[849px] px-6 py-16 text-center lg:py-20">
      <p className="font-semibold text-2xl text-[#609efa] italic leading-[40px] tracking-[-0.8px] lg:text-[33px] lg:leading-[50px]">
        {t(quote)}
      </p>
      {reference ? (
        <p className="mt-4 font-medium text-[#4b5565] text-base">{t(reference)}</p>
      ) : null}
    </section>
  );
}
