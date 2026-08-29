import Reveal from "@/components/ui/Reveal";
import Rich from "@/components/ui/Rich";
import { getT } from "@/lib/i18n/server";

type ProofItem = { number?: string; name: string; body: string };

const defaultItems: ProofItem[] = [
  {
    name: "Know Christ",
    body: "The university years are a formative season when convictions, values, and direction for life are taking shape. YEF calls students to seek Christ and build their lives firmly upon Him.",
  },
  {
    name: "Grow in the\nWord",
    body: "Through Scripture, prayer, fellowship, and discipleship, students deepen their faith, develop a biblical worldview, and learn to follow Christ in every area of life.",
  },
  {
    name: "Live on Mission",
    body: "Faith is meant to be lived and shared. Students are encouraged to serve others, make disciples, and carry the Gospel to their friends, campuses, communities, and beyond.",
  },
];

const defaults = {
  eyebrow: "The Call",
  // ** ** marks the phrase that is set in the italic serif accent.
  heading:
    "In the days of your youth, **remember your Creator**.",
};

export type ProofContent = Partial<typeof defaults> & {
  /** `number` is optional — the columns carry a title alone in this design. */
  items?: ProofItem[];
};

export default async function WhyTheYoung({
  content,
}: {
  content?: ProofContent;
}) {
  const t = await getT();
  const c = { ...defaults, ...content };
  const proof = content?.items?.length ? content.items : defaultItems;
  return (
    <section className="font-body relative overflow-hidden bg-[#f2f6fb]">
      {/* 1920x650 frame: a 1440 column at x=240, y=110, with the rule at 227
          and the three 480 cells from 254. */}
      <div className="relative mx-auto max-w-[1440px] px-6 py-24 sm:px-10 sm:pb-0 lg:pt-[110px] 2xl:px-0">
        <Reveal>
          <p className="font-semibold text-[11px] text-v2-muted tracking-[2.42px] uppercase">
            {t(c.eyebrow)}
          </p>
          <h2 className="mt-4 max-w-3xl font-display font-bold text-4xl text-v2-navy leading-[1.05] tracking-[-1.3px] sm:text-5xl lg:text-[52px]">
            <Rich
              text={t(c.heading)}
              emphasis="font-serif font-normal italic text-v2-accent"
            />
          </h2>
        </Reveal>

        <Reveal delay={120}>
          {/* Two shared rows — title, then body. Each column subscribes to
              them so every body starts on the same line however many lines a
              title runs to, in English or in translation. */}
          <div className="mt-14 grid grid-cols-1 gap-y-10 border-t border-v2-border pt-12 sm:grid-cols-3 sm:grid-rows-[auto_1fr] sm:gap-y-0 sm:pt-7">
            {proof.map((item, index) => (
              <div
                key={item.name}
                // The frame sets each cell's text at x=0, flush against the
                // rule that opens it, and holds it to 280 of the 480 cell so
                // it never reaches the next one. The bottom padding is the
                // section's, carried here so the rules run the cell's height.
                className={[
                  "pb-8 sm:row-span-2 sm:grid sm:grid-rows-subgrid sm:pt-[65px] sm:pb-[52px]",
                  index > 0 && "sm:border-l sm:border-v2-border",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <div className="sm:max-w-[280px]">
                  {item.number && (
                    <p className="font-display font-bold text-5xl text-yef-primary tracking-[-1.92px] lg:text-[64px]">
                      {item.number}
                    </p>
                  )}
                  <p className="whitespace-pre-line font-display font-bold text-[21px] text-v2-navy uppercase leading-[1.24]">
                    {t(item.name)}
                  </p>
                </div>
                <p className="mt-4 text-[14px] text-v2-muted-dark leading-[1.65] sm:max-w-[440px]">
                  {t(item.body)}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
