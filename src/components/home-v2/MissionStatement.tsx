import ConvergenceLines from "./ConvergenceLines";
import Reveal from "@/components/ui/Reveal";
import { getT } from "@/lib/i18n/server";

const defaults = {
  eyebrow: "Mission Statement",
  verse:
    "Your people will offer themselves freely on the day of your power; young people will come to",
  verseAccent: "you like the morning dew.",
  reference: "Psalm 110:3",
  columns: [
    "We exist to raise a generation that knows Jesus Christ deeply and makes Him known boldly. Not eventually — now, in the years when conviction is forming and the calendar is still open.",
    "That work happens in ordinary places: a campus dining hall, a study room at midnight, a plane to a country whose language we are still learning. We gather in the Word, we send each other out, and we testify to the eternal love of the Lord wherever we land.",
  ],
};

export type MissionContent = Partial<typeof defaults>;

export default async function MissionStatement({
  content,
}: {
  content?: MissionContent;
}) {
  const t = await getT();
  const c = { ...defaults, ...content };
  const columns = c.columns?.length ? c.columns : defaults.columns;
  return (
    <section className="font-body relative overflow-hidden bg-gradient-to-br from-v2-navy via-v2-blue to-v2-navy">
      <ConvergenceLines />
      <div className="relative mx-auto max-w-[1920px] px-6 py-24 sm:px-10 lg:px-19">
        <Reveal>
          <p className="font-semibold text-[11px] text-white/50 tracking-[2.42px] uppercase">
            {t(c.eyebrow)}
          </p>
          <p className="mt-8 max-w-4xl font-display font-bold text-4xl text-[#f2f6fb] leading-[1.12] tracking-[-1.8px] sm:text-5xl lg:text-[60px]">
            {t(c.verse)}{" "}
            <span className="font-instrument-serif font-normal italic">
              {t(c.verseAccent)}
            </span>
          </p>
          <p className="mt-6 font-semibold text-base text-white/45 tracking-[2.88px] uppercase">
            {t(c.reference)}
          </p>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-12 grid grid-cols-1 gap-10 border-t border-white/[0.18] pt-10 lg:grid-cols-2 lg:gap-16">
            {columns.map((body) => (
              <p key={body} className="text-white/70 leading-[1.8]">
                {t(body)}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
