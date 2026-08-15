"use client";

import { useRef } from "react";

const values = [
  {
    number: "01",
    title: "Know Christ & Make Him Known",
    body: "To know Jesus Christ deeply through His Word, prayer and a growing life of faith, and to boldly share the hope and truth of the Gospel so that others may come to know Him too.",
  },
  {
    number: "02",
    title: "Make Disciples",
    body: "To walk alongside young believers as they grow in faith, helping them become deeply rooted in God's Word and equipping them to follow Christ, serve others, and make disciples themselves.",
  },
  {
    number: "03",
    title: "Live in Community",
    body: "To build Christ-centered communities where young people can belong, worship, pray, study the Bible, serve and encourage one another as they grow together in faith.",
  },
  {
    number: "04",
    title: "Reach the Nations",
    body: "To raise a generation with a heart for the Great Commission, equipping young believers to carry the Gospel beyond their campuses and communities to cities and nations across the world.",
  },
  {
    number: "05",
    title: "Servant Leadership Is Our Identity",
    body: "If you're too big to serve then you are too small to lead. We believe the greatest leadership is service to others. Every leader is a servant first. From the parking lot to the pulpit, everyone serves. Every role is different but they are all important. If you ain't helping, you ain't helping!",
  },
  {
    number: "06",
    title: "Honor Is Our Calling",
    body: "We are vocal with our honor, meaning we are not stingy with our words. We submit to leadership and are thankful for spiritual authority. We choose joyfully to submit to those God has placed over us. We honor and care for those God has placed under us.",
  },
  {
    number: "07",
    title: "Passion Is Our Pursuit",
    body: "Everything we do, we do it with passion. From our worship to our service we do it with Holy Spirit energy. Passion drives us. Passion for Jesus. Passion for people. Passion for his church.",
  },
];

export default function OurValues() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: 1 | -1) => {
    scrollerRef.current?.scrollBy({
      left: direction * 380,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#0a63c9] via-[#4b9cef] via-40% to-[#f0862a]">
      <div className="relative mx-auto max-w-[1800px] px-6 py-16 lg:px-16 lg:py-20">
        <h2 className="font-bold text-5xl text-white sm:text-6xl">
          Our <span className="font-serif italic">Values</span>
        </h2>
        <p className="mt-4 max-w-md font-medium text-white/90">
          Our Core Values are who we are. They are not just what we do, they
          are part of our DNA.
        </p>

        <div
          ref={scrollerRef}
          className="mt-14 flex snap-x snap-mandatory gap-10 overflow-x-auto pb-4 [scrollbar-width:none]"
        >
          {values.map((value) => (
            <div
              key={value.number}
              className="w-[300px] shrink-0 snap-start border-t-4 border-white pt-6"
            >
              <p className="font-semibold text-5xl text-white/30">
                {value.number}
              </p>
              <h3 className="mt-2 font-semibold text-xl uppercase tracking-wide text-white">
                {value.title}
              </h3>
              <p className="mt-4 font-medium text-sm leading-relaxed text-white/90">
                {value.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label="Previous value"
            className="flex size-9 items-center justify-center rounded-full bg-white font-bold text-yef-primary transition-opacity hover:opacity-80"
          >
            &larr;
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label="Next value"
            className="flex size-9 items-center justify-center rounded-full bg-white font-bold text-yef-primary transition-opacity hover:opacity-80"
          >
            &rarr;
          </button>
        </div>
      </div>
    </section>
  );
}
