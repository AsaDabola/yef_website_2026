import { getT } from "@/lib/i18n/server";

export default async function GenericStats({
  eyebrow,
  heading,
  stats,
}: {
  eyebrow?: string;
  heading?: string;
  stats: { value: string; label: string }[];
}) {
  const t = await getT();
  return (
    <section className="mx-auto max-w-[1391px] px-6 py-16 lg:py-20">
      {eyebrow ? (
        <p className="text-center font-semibold text-sm text-yef-primary uppercase tracking-[1.6px]">
          {t(eyebrow)}
        </p>
      ) : null}
      {heading ? (
        <h2 className="mt-3 text-center font-display font-bold text-3xl text-black tracking-[-0.64px] sm:text-4xl">
          {t(heading)}
        </h2>
      ) : null}
      <div
        className={`grid grid-cols-2 gap-x-8 gap-y-10 text-center sm:grid-cols-4 ${heading || eyebrow ? "mt-12" : ""}`}
      >
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="font-display font-extrabold text-4xl text-yef-primary sm:text-5xl">
              {t(stat.value)}
            </p>
            <p className="mt-2 font-medium text-[#4b5565] text-sm">{t(stat.label)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
