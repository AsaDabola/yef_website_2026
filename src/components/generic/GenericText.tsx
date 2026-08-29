import { getT } from "@/lib/i18n/server";

export default async function GenericText({
  eyebrow,
  heading,
  paragraphs,
}: {
  eyebrow?: string;
  heading?: string;
  paragraphs: string[];
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
        className={`space-y-[27px] text-[20px] text-black leading-[27.2px] ${heading || eyebrow ? "mt-10" : ""}`}
      >
        {paragraphs.map((body) => (
          <p key={body}>{t(body)}</p>
        ))}
      </div>
    </section>
  );
}
