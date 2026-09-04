import { getT } from "@/lib/i18n/server";
import { backgroundClasses, type BackgroundValue } from "@/components/generic/background";

export default async function GenericStats({
  eyebrow,
  heading,
  stats,
  background,
}: {
  eyebrow?: string;
  heading?: string;
  stats: { value: string; label: string }[];
  background?: BackgroundValue;
}) {
  const t = await getT();
  const bg = backgroundClasses(background);
  return (
    <section className={`${bg.section} px-6 py-16 lg:py-20`}>
      <div className="mx-auto max-w-[1391px]">
        {eyebrow ? (
          <p className={`text-center font-semibold text-sm uppercase tracking-[1.6px] ${bg.eyebrow}`}>
            {t(eyebrow)}
          </p>
        ) : null}
        {heading ? (
          <h2
            className={`mt-3 text-center font-display font-bold text-3xl tracking-[-0.64px] sm:text-4xl ${bg.heading}`}
          >
            {t(heading)}
          </h2>
        ) : null}
        <div
          className={`grid grid-cols-2 gap-x-8 gap-y-10 text-center sm:grid-cols-4 ${heading || eyebrow ? "mt-12" : ""}`}
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <p
                className={`font-display font-extrabold text-4xl sm:text-5xl ${bg.dark ? "text-white" : "text-yef-primary"}`}
              >
                {t(stat.value)}
              </p>
              <p className={`mt-2 text-sm font-medium ${bg.body}`}>{t(stat.label)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
