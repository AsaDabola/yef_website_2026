import Reveal from "@/components/ui/Reveal";
import { getT } from "@/lib/i18n/server";

export default async function MissionStatement() {
  const t = await getT();
  return (
    <section className="font-body bg-gradient-to-br from-v2-navy via-v2-blue to-v2-navy">
      <div className="mx-auto max-w-[1920px] px-6 py-24 sm:px-10 lg:px-19">
        <Reveal>
          <p className="font-semibold text-[11px] text-white/50 tracking-[2.42px] uppercase">
            {t("Mission Statement")}
          </p>
          <p className="mt-8 max-w-4xl font-display font-bold text-4xl text-[#f2f6fb] leading-[1.12] tracking-[-1.8px] sm:text-5xl lg:text-[60px]">
            {t(
              "Your people will offer themselves freely on the day of your power; young people will come to",
            )}{" "}
            <span className="font-instrument-serif font-normal italic">
              {t("you like the morning dew.")}
            </span>
          </p>
          <p className="mt-6 font-semibold text-base text-white/45 tracking-[2.88px] uppercase">
            {t("Psalm 110:3")}
          </p>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-12 grid grid-cols-1 gap-10 border-t border-white/[0.18] pt-10 lg:grid-cols-2 lg:gap-16">
            <p className="text-white/70 leading-[1.8]">
              {t(
                "We exist to raise a generation that knows Jesus Christ deeply and makes Him known boldly. Not eventually — now, in the years when conviction is forming and the calendar is still open.",
              )}
            </p>
            <p className="text-white/70 leading-[1.8]">
              {t(
                "That work happens in ordinary places: a campus dining hall, a study room at midnight, a plane to a country whose language we are still learning. We gather in the Word, we send each other out, and we testify to the eternal love of the Lord wherever we land.",
              )}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
