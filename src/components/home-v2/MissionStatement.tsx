import ConvergenceLines from "./ConvergenceLines";
import Reveal from "@/components/ui/Reveal";
import Rich from "@/components/ui/Rich";
import { getT } from "@/lib/i18n/server";

const defaults = {
  eyebrow: "Mission Statement",
  // The frame sets the verse in three lines; the breaks are placed here
  // rather than left to the container width, which lands on four.
  verse:
    "Your people will offer themselves freely on\nthe day of your power; young people will\ncome to",
  verseAccent: "you like the morning dew.",
  reference: "Psalm 110:3",
  columns: [
    "We exist to help students **know Jesus Christ deeply, build their lives on the Word of God,** and **grow into mature disciples** whose faith shapes every part of life.",
    "From campus evangelism and Bible study to discipleship and leadership, YEF equips students to **share the Gospel, serve others**, and **carry Christ’s mission into the world.**",
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
      {/* The frame is 1920x740 with its content 1440 wide at x=240 — so the
          column is capped at 1440 and the 240px margin is what is left over
          at that width, rather than a padding that would shrink it further. */}
      <div className="relative mx-auto max-w-[1440px] px-6 py-24 sm:px-10 lg:pt-[150px] lg:pb-[164px] 2xl:px-0">
        <Reveal>
          <p className="font-semibold text-[11px] text-white/50 tracking-[2.42px] uppercase">
            {t(c.eyebrow)}
          </p>
          <p className="mt-[26px] max-w-[1143px] whitespace-pre-line font-display font-bold text-4xl text-[#f2f6fb] leading-[1.12] tracking-[-1.8px] sm:text-5xl lg:text-[60px]">
            {t(c.verse)}{" "}
            <span className="font-instrument-serif font-normal italic">
              {t(c.verseAccent)}
            </span>
          </p>
          <p className="mt-[26px] font-semibold text-base text-white/45 tracking-[2.88px] uppercase">
            {t(c.reference)}
          </p>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-[26px] grid grid-cols-1 gap-10 border-t border-white/[0.18] pt-14 lg:grid-cols-2 lg:gap-[70px]">
            {columns.map((body) => (
              <p key={body} className="text-white/70 leading-[1.8]">
                <Rich text={t(body)} emphasis="font-bold text-white" />
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
