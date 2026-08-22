import Image from "next/image";

const pillars = [
  {
    title: "Christ-centered",
    body: "Jesus is at the center of everything we do, so every intern hears the gospel and sees it in action through local church pastors, volunteers and partners around the world.",
    icon: "/images/icons/icon-christ.svg",
  },
  {
    title: "Church-driven",
    body: "We empower local churches on campuses to serve students in need. These churches become consistent sources of light and hope, representing Christ, making disciples and caring for students as they grow.",
    icon: "/images/icons/icon-church.svg",
  },
  {
    title: "Student-focused",
    body: "We care for each student's unique right-now and long-term needs. Given the care they need, students become thriving followers of Jesus, transforming their families, communities and nations.",
    icon: "/images/icons/icon-child.svg",
  },
];

export default function InternshipSection() {
  return (
    <section
      id="internship"
      className="scroll-mt-32 border-t border-black/10 py-16"
    >
      <h2 className="font-display font-extrabold text-3xl text-v2-navy tracking-[-0.5px] sm:text-4xl">
        Internship
      </h2>
      <p className="mt-6 max-w-xl text-v2-muted-dark-2 leading-relaxed">
        Work under a trained professional in any field and learn the ropes
        from them! Internships at YEF HQ are open to the YEF members from
        local chapters who have finished their leadership training and are
        willing to serve in building the ministry together. As with
        volunteering, you have the option to intern in video making, Web
        design, technology, event-planning, communication and more.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[492px_1fr] lg:items-center">
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
          <Image
            src="/images/get-involved/story-teacher.png"
            alt="A student practicing as a teacher"
            fill
            sizes="(min-width: 1024px) 35vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="space-y-6">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="flex gap-4">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm">
                <Image
                  src={pillar.icon}
                  alt=""
                  width={24}
                  height={24}
                  aria-hidden="true"
                />
              </div>
              <p className="pt-1 text-v2-navy leading-relaxed">
                <span className="font-semibold">{pillar.title}:</span>{" "}
                <span className="text-v2-muted-dark-2">{pillar.body}</span>
              </p>
            </div>
          ))}
          <a
            href="#"
            className="inline-flex items-center gap-2 font-semibold text-yef-primary transition-opacity hover:opacity-80"
          >
            Learn more about how we&rsquo;re different
            <Image
              src="/images/icons/icon-arrow-right-blue.svg"
              alt=""
              width={18}
              height={18}
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
