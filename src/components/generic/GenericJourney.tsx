import { getT } from "@/lib/i18n/server";
import JourneyTimeline from "@/components/ui/JourneyTimeline";
import { backgroundClasses, type BackgroundValue } from "@/components/generic/background";

export default async function GenericJourney({
  eyebrow,
  heading,
  stages,
  background,
}: {
  eyebrow?: string;
  heading?: string;
  stages: { label: string; title: string; body: string; color: string; href?: string }[];
  background?: BackgroundValue;
}) {
  const t = await getT();
  const bg = backgroundClasses(background);
  return (
    <section className={`${bg.section} px-6 py-16 lg:py-20`}>
      <div className="mx-auto max-w-[1391px]">
        <JourneyTimeline
          eyebrow={eyebrow ? t(eyebrow) : undefined}
          heading={heading ? t(heading) : undefined}
          stages={stages.map((stage, index) => ({
            ...stage,
            number: String(index + 1).padStart(2, "0"),
            label: t(stage.label),
            title: t(stage.title),
            body: t(stage.body),
          }))}
        />
      </div>
    </section>
  );
}
