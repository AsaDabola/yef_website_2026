import FlowingBackground from "./FlowingBackground";
import Reveal from "@/components/ui/Reveal";
import Rich from "@/components/ui/Rich";
import { getT } from "@/lib/i18n/server";

type ProofItem = { number?: string; name: string; body: string };

const defaultItems: ProofItem[] = [
  {
    name: "The Best of\nTimes",
    body: "The days of youth are when we can meet God first, and meet Him deepest.",
  },
  {
    name: "A Calling That\nComes Now",
    body: "God does not wait for the perfect moment. He is calling, right now, in the midst of this youth.",
  },
  {
    name: "Grace for\nThose Who Seek",
    body: "For those who sought Him in their youth, revival has always come in abundance.",
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
      <div className="relative mx-auto max-w-[1920px] px-6 py-24 sm:px-10 lg:px-19">
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
          <div className="mt-14 grid grid-cols-1 gap-y-10 border-t border-v2-border pt-12 sm:grid-cols-3 sm:gap-y-0">
            {proof.map((item, index) => (
              <div
                key={item.name}
                className={
                  index > 0
                    ? "border-v2-border pb-8 sm:border-l sm:pl-10"
                    : "pb-8 sm:pr-10"
                }
              >
                {item.number && (
                  <p className="font-display font-bold text-5xl text-yef-primary tracking-[-1.92px] lg:text-[64px]">
                    {item.number}
                  </p>
                )}
                <p className="whitespace-pre-line font-display font-bold text-[21px] text-v2-navy leading-[1.24]">
                  {t(item.name)}
                </p>
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
