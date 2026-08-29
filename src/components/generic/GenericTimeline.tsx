import { getT } from "@/lib/i18n/server";

export default async function GenericTimeline({
  eyebrow,
  heading,
  items,
}: {
  eyebrow?: string;
  heading?: string;
  items: { year: string; title: string; body: string }[];
}) {
  const t = await getT();
  return (
    <section className="mx-auto max-w-[1126px] px-6 py-16 lg:py-20">
      {eyebrow ? (
        <p className="font-semibold text-sm text-yef-primary uppercase tracking-[1.6px]">
          {t(eyebrow)}
        </p>
      ) : null}
      {heading ? (
        <h2 className="mt-3 font-display font-bold text-3xl text-black tracking-[-0.64px] sm:text-4xl">
          {t(heading)}
        </h2>
      ) : null}
      <div
        className={`space-y-12 border-yef-primary/20 border-l-2 pl-8 ${heading || eyebrow ? "mt-12" : ""}`}
      >
        {items.map((item) => (
          <div key={`${item.year}-${item.title}`} className="relative">
            <span className="-left-[41px] absolute top-1 size-4 rounded-full border-4 border-white bg-yef-primary" />
            <p className="font-bold text-sm text-yef-primary tracking-[1.2px]">
              {t(item.year)}
            </p>
            <p className="mt-1 font-display font-semibold text-black text-xl">
              {t(item.title)}
            </p>
            <p className="mt-2 text-[#4b5565] text-base leading-[27px]">
              {t(item.body)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
