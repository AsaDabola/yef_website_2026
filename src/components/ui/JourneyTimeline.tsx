export type JourneyStage = {
  number: string;
  label: string;
  title: string;
  body: string;
  color: string;
  /** When set, the whole stage becomes a plain anchor (e.g. "#grow") rather
   *  than static text — used for a same-page journey overview. */
  href?: string;
};

/**
 * A connected, numbered, color-coded journey — one continuous line running
 * through every stage on desktop/tablet, and the same line turned vertical
 * on mobile. Shared by the Get Involved overview and the Membership Journey
 * so both "at a glance" diagrams read as one visual language.
 */
export default function JourneyTimeline({
  stages,
  eyebrow,
  heading,
}: {
  stages: JourneyStage[];
  eyebrow?: string;
  heading?: string;
}) {
  return (
    <section className="rounded-2xl border border-v2-border bg-[#f7f9fc] px-6 py-10 sm:px-10 sm:py-12">
      {(eyebrow || heading) && (
        <div className="mb-2">
          {eyebrow && (
            <p className="font-semibold text-[11px] text-yef-primary tracking-[1.92px] uppercase">
              {eyebrow}
            </p>
          )}
          {heading && (
            <h2 className="mt-2 font-display font-extrabold text-[28px] text-black tracking-[-0.5px]">
              {heading}
            </h2>
          )}
        </div>
      )}

      {/* Desktop / tablet: one connected horizontal line running through
          every numbered stage, each segment picking up that stage's color. */}
      <div className={`hidden md:flex md:items-start ${eyebrow || heading ? "mt-10" : ""}`}>
        {stages.map((stage, index) => {
          const Tag = stage.href ? "a" : "div";
          return (
            <Tag
              key={stage.label}
              {...(stage.href ? { href: stage.href } : {})}
              className={`flex flex-1 flex-col items-center text-center ${
                stage.href ? "group transition-opacity hover:opacity-80" : ""
              }`}
            >
              <div className="flex w-full items-center">
                <div
                  className="h-[2px] flex-1"
                  style={{
                    background: index === 0 ? "transparent" : stages[index - 1].color,
                  }}
                />
                <div
                  className="flex size-12 shrink-0 items-center justify-center rounded-full font-display font-bold text-sm text-white lg:size-14 lg:text-base"
                  style={{ background: stage.color }}
                >
                  {stage.number}
                </div>
                <div
                  className="h-[2px] flex-1"
                  style={{
                    background: index === stages.length - 1 ? "transparent" : stage.color,
                  }}
                />
              </div>

              <p
                className="mt-4 font-semibold text-[11px] tracking-[1.92px] uppercase"
                style={{ color: stage.color }}
              >
                {stage.label}
              </p>
              <h3 className="mt-1 font-display font-bold text-[15px] text-black lg:text-base">
                {stage.title}
              </h3>
              <p className="mt-2 max-w-[190px] text-[#4b5565] text-[12.5px] leading-[18px] lg:max-w-[210px]">
                {stage.body}
              </p>
            </Tag>
          );
        })}
      </div>

      {/* Mobile: the same journey as a vertical connected timeline, never
          stacked cards. */}
      <div className={`flex flex-col md:hidden ${eyebrow || heading ? "mt-10" : ""}`}>
        {stages.map((stage, index) => {
          const Tag = stage.href ? "a" : "div";
          return (
            <div key={stage.label} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className="flex size-11 shrink-0 items-center justify-center rounded-full font-display font-bold text-sm text-white"
                  style={{ background: stage.color }}
                >
                  {stage.number}
                </div>
                {index < stages.length - 1 && (
                  <div
                    className="my-1 w-[2px] flex-1"
                    style={{ background: stage.color, minHeight: "28px" }}
                  />
                )}
              </div>
              <Tag
                {...(stage.href ? { href: stage.href } : {})}
                className={index < stages.length - 1 ? "pb-7" : undefined}
              >
                <p
                  className="font-semibold text-[11px] tracking-[1.92px] uppercase"
                  style={{ color: stage.color }}
                >
                  {stage.label}
                </p>
                <h3 className="mt-1 font-display font-bold text-base text-black">
                  {stage.title}
                </h3>
                <p className="mt-1.5 max-w-[420px] text-[#4b5565] text-sm leading-[21px]">
                  {stage.body}
                </p>
              </Tag>
            </div>
          );
        })}
      </div>
    </section>
  );
}
