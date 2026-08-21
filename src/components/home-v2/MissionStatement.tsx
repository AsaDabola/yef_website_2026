import Reveal from "@/components/ui/Reveal";

export default function MissionStatement() {
  return (
    <section className="bg-gradient-to-br from-v2-navy via-v2-blue to-v2-navy">
      <div className="mx-auto max-w-[1920px] px-6 py-24 sm:px-10 lg:px-19">
        <Reveal>
          <p className="font-semibold text-[11px] text-white/50 tracking-[2.42px] uppercase">
            Mission Statement
          </p>
          <p className="mt-8 max-w-4xl font-display font-medium text-3xl text-white leading-snug sm:text-4xl">
            Your people will offer themselves freely on the day of your
            power; young people will come to{" "}
            <span className="font-instrument-serif font-normal italic text-v2-accent">
              you like the morning dew
            </span>
            .
          </p>
          <p className="mt-6 font-semibold text-sm text-white/50 tracking-[1px] uppercase">
            Psalm 110:3
          </p>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-12 grid grid-cols-1 gap-10 border-t border-white/15 pt-10 lg:grid-cols-2 lg:gap-16">
            <p className="text-white/75 leading-relaxed">
              We exist to raise a generation that knows Jesus Christ deeply
              and makes Him known boldly. Not eventually &mdash; now, in the
              years when conviction is forming and the calendar is still
              open.
            </p>
            <p className="text-white/75 leading-relaxed">
              That work happens in ordinary places: a campus dining hall, a
              study room at midnight, a plane to a country whose language we
              are still learning. We gather in the Word, we send each other
              out, and we testify to the eternal love of the Lord wherever we
              land.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
