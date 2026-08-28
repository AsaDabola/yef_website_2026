import FlowingBackground from "./FlowingBackground";
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
    "In the days of your youth, before the days of trouble come, **remember your Creator**.",
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
    <section className="font-body relative overflow-hidden bg-[#eef1f7]">
      <FlowingBackground />
      <div className="relative mx-auto max-w-[1920px] px-6 py-24 sm:px-10 sm:pb-0 lg:px-19">
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
                // Each column is padded on both sides: a gutter only on the
                // side the divider sits kept the middle column's text running
                // right up against the next column's rule. The deep bottom
                // padding is the section's, moved inside the columns so the
                // dividers reach the rule that closes the section.
                className={[
                  "pb-8 sm:row-span-2 sm:grid sm:grid-rows-subgrid sm:pt-18 sm:pb-24",
                  index > 0 && "sm:border-l sm:border-v2-border sm:pl-10",
                  index < proof.length - 1 && "sm:pr-10",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <div>
                  {item.number && (
                    <p className="font-display font-bold text-5xl text-yef-primary tracking-[-1.92px] lg:text-[64px]">
                      {item.number}
                    </p>
                  )}
                  <p className="whitespace-pre-line font-display font-bold text-[21px] text-v2-navy uppercase leading-[1.24]">
                    {t(item.name)}
                  </p>
                </div>
                <p className="mt-4 text-[14px] text-v2-muted-dark leading-[1.65]">
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
