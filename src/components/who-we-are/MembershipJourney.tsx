import { getT } from "@/lib/i18n/server";

/**
 * Five coordinated stops on one path rather than five unrelated ranks — the
 * copy is deliberately relational (connect, commit, serve, lead, minister)
 * rather than titles on an org chart. Each stage gets its own color so the
 * progression reads at a glance; yef-primary anchors the middle of it so the
 * site's brand blue still carries the section.
 */
const stages = [
  {
    number: "01",
    label: "Connect",
    title: "Start Your Journey",
    body: "Discover YEF through Bible study, fellowship, and community.",
    color: "#3D9BE9",
  },
  {
    number: "02",
    label: "Commit",
    title: "Grow in Community",
    body: "Become a committed member, grow in God's Word, and live out YEF's Statement of Faith.",
    color: "#0066CF",
  },
  {
    number: "03",
    label: "Serve",
    title: "Serve with Purpose",
    body: "Use your gifts and time to serve Christ and contribute to the YEF community.",
    color: "#2F5FA8",
  },
  {
    number: "04",
    label: "Lead",
    title: "Lead Others",
    body: "Develop as a servant leader and help others grow in Christ.",
    color: "#5B4B8A",
  },
  {
    number: "05",
    label: "Ministry",
    title: "Live Your Calling",
    body: "Explore God's calling and pursue a life of ministry and service.",
    color: "#B4823C",
  },
];

export default async function MembershipJourney() {
  const t = await getT();
  return (
    <section className="mt-16 rounded-2xl border border-v2-border bg-[#f7f9fc] px-6 py-10 sm:px-10 sm:py-12">
      <p className="font-semibold text-[11px] text-yef-primary tracking-[1.92px] uppercase">
        {t("The Membership Journey")}
      </p>
      <h2 className="mt-2 font-display font-extrabold text-[28px] text-black tracking-[-0.5px]">
        {t("How You Grow at YEF")}
      </h2>

      {/* Desktop / tablet: one connected horizontal line running through
          every numbered stage, each segment picking up that stage's color. */}
      <div className="mt-10 hidden md:flex md:items-start">
        {stages.map((stage, index) => (
          <div key={stage.label} className="flex flex-1 flex-col items-center text-center">
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
              {t(stage.label)}
            </p>
            <h3 className="mt-1 font-display font-bold text-[15px] text-black lg:text-base">
              {t(stage.title)}
            </h3>
            <p className="mt-2 max-w-[190px] text-[#4b5565] text-[12.5px] leading-[18px] lg:max-w-[210px]">
              {t(stage.body)}
            </p>
          </div>
        ))}
      </div>

      {/* Mobile: the same journey as a vertical connected timeline, never
          five stacked cards. */}
      <div className="mt-10 flex flex-col md:hidden">
        {stages.map((stage, index) => (
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
            <div className={index < stages.length - 1 ? "pb-7" : undefined}>
              <p
                className="font-semibold text-[11px] tracking-[1.92px] uppercase"
                style={{ color: stage.color }}
              >
                {t(stage.label)}
              </p>
              <h3 className="mt-1 font-display font-bold text-base text-black">
                {t(stage.title)}
              </h3>
              <p className="mt-1.5 max-w-[420px] text-[#4b5565] text-sm leading-[21px]">
                {t(stage.body)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
