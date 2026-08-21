import Image from "next/image";

const steps = [
  {
    number: "01",
    title: "Experience Mission",
    body: "Step Beyond Your Everyday Life and Experience the Joy of Sharing the Gospel",
  },
  {
    number: "02",
    title: "Serve & Grow",
    body: "Serve Alongside Local Believers, Grow in Faith, and Discover Your Calling",
  },
  {
    number: "03",
    title: "Prepare & Go",
    body: "Receive Biblical and Practical Training and Take Your Next Step into Mission",
  },
];

export default function MissionTripPromo() {
  return (
    <section id="mission-trip" className="scroll-mt-32 rounded-[24px] bg-v2-bg px-8 py-12 sm:px-12 sm:py-14">
      <h2 className="font-display font-extrabold text-3xl text-v2-navy tracking-[-0.5px]">
        Mission Trips
      </h2>
      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[492px_1fr] lg:items-center">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
          <Image
            src="/images/home-v2/get-involved-mission-trips.png"
            alt="Students on a mission trip"
            fill
            sizes="(min-width: 1024px) 35vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="space-y-7">
          {steps.map((step) => (
            <div key={step.number} className="flex gap-4">
              <p className="font-display font-bold text-lg text-yef-primary">
                {step.number}.
              </p>
              <div>
                <p className="font-semibold text-lg text-v2-navy">
                  {step.title}
                </p>
                <p className="mt-1 text-v2-muted-dark-2 leading-relaxed">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
          <a
            href="#"
            className="inline-flex items-center gap-2 font-semibold text-yef-primary transition-opacity hover:opacity-80"
          >
            Learn more about Mission Trip
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
