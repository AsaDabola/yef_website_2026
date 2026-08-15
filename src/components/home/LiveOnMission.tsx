import Image from "next/image";
import Link from "next/link";

const steps = [
  {
    title: "Interested in Baptism?",
    subtitle: "Take the next step in your faith.",
    href: "/get-involved",
  },
  {
    title: "Join a Life Group",
    subtitle: "Find community and grow together.",
    href: "/get-involved",
  },
  {
    title: "Join a Serve Team",
    subtitle: "Use your gifts to serve others.",
    href: "/get-involved",
  },
];

export default function LiveOnMission() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-[1800px] grid-cols-1 gap-12 px-6 py-16 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16 lg:px-16 lg:py-20">
        <div className="relative aspect-[1104/762] w-full overflow-hidden rounded-2xl">
          <Image
            src="https://www.figma.com/api/mcp/asset/ed116305-4424-47fd-9078-8f4ba0f8d5fa.png"
            alt="Students sharing the Gospel on campus"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div>
          <h2 className="font-bold text-4xl leading-tight text-yef-primary sm:text-5xl">
            Faith moves
            <br />
            forward.
          </h2>

          <div className="mt-8 divide-y divide-black/10 border-t border-black/10">
            {steps.map((step) => (
              <Link
                key={step.title}
                href={step.href}
                className="group flex items-center justify-between gap-6 py-6"
              >
                <div>
                  <p className="font-bold text-lg text-yef-navy-deep">
                    {step.title}
                  </p>
                  <p className="mt-1 text-sm text-yef-navy-deep/60">
                    {step.subtitle}
                  </p>
                </div>
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-yef-gray-light font-bold text-yef-primary transition-colors group-hover:bg-yef-primary group-hover:text-white">
                  &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
