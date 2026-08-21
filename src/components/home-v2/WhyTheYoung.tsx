import Reveal from "@/components/ui/Reveal";

const proof = [
  {
    number: "21",
    name: "Hudson Taylor",
    body: "Left for China at twenty-one and became the father of modern Chinese mission.",
  },
  {
    number: "26",
    name: "John Calvin",
    body: "Wrote the Institutes of the Christian Religion at twenty-six, reshaping Christian thought.",
  },
  {
    number: "20s",
    name: "The Disciples",
    body: "Most were in their twenties when they began the movement that reached the world.",
  },
];

export default function WhyTheYoung() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1920px] px-6 py-24 sm:px-10 lg:px-19">
        <Reveal>
          <p className="font-semibold text-[11px] text-v2-muted tracking-[2.42px] uppercase">
            Why The Young
          </p>
          <h2 className="mt-4 max-w-3xl font-display font-bold text-4xl text-v2-navy leading-tight tracking-[-1px] sm:text-5xl">
            Revival has always arrived early &mdash; carried by people the
            world called{" "}
            <span className="font-instrument-serif italic text-v2-accent">
              too young.
            </span>
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-12 grid grid-cols-1 gap-10 border-t border-v2-border pt-10 sm:grid-cols-3">
            {proof.map((item) => (
              <div key={item.name}>
                <p className="font-display font-bold text-5xl text-v2-blue">
                  {item.number}
                </p>
                <p className="mt-4 font-semibold text-lg text-v2-navy">
                  {item.name}
                </p>
                <p className="mt-2 text-v2-muted-dark-2 leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
