import Image from "next/image";
import Link from "next/link";

const testimonials = [
  {
    name: "Tamara Hollis",
    place: "YEF United States - Orlando",
    quote: "From Knowing About God to Knowing Him Personally",
    image:
      "https://www.figma.com/api/mcp/asset/4d4da903-cdb0-409b-ba7d-44fb4177520a.png",
    bg: "bg-yef-primary",
  },
  {
    name: "James Wong",
    place: "YEF Hong Kong",
    quote: "Discovering Love and Purpose in Bible Study",
    image:
      "https://www.figma.com/api/mcp/asset/11288bda-e130-4922-b4c9-7a700f16e514.png",
    bg: "bg-[#05417e]",
  },
  {
    name: "Amil",
    place: "YEF Burundi – Bujumbura Chapter",
    quote: "Growing in Faith Through YEF",
    image:
      "https://www.figma.com/api/mcp/asset/101b8ed5-68a0-48f9-bf76-e9ae7aeb539b.png",
    bg: "bg-yef-primary",
  },
  {
    name: "YEF Orlando",
    place: "Multiple Students",
    quote: "Reflection and Renewed Faith Among Students",
    image:
      "https://www.figma.com/api/mcp/asset/199369b6-3435-4876-b1e1-e5c4497ef7e0.png",
    bg: "bg-[#05417e]",
  },
  {
    name: "Luke Héritier",
    place: "YEF Burundi - Gitega Chapter",
    quote: "Growing in Evangelism and Called",
    image:
      "https://www.figma.com/api/mcp/asset/ce6f3058-a610-4156-adfa-87cb9d7f2438.png",
    bg: "bg-yef-primary",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#eef5fe]">
      <div className="mx-auto max-w-[1800px] px-6 py-16 lg:px-16 lg:py-20">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="max-w-3xl font-bold text-4xl leading-tight text-[#02468c] sm:text-5xl lg:text-6xl">
            <span className="font-serif italic">You are the Christ</span>, the
            Son of the <span className="font-serif italic">living God</span>.
          </h2>
          <Link
            href="/news"
            className="flex shrink-0 items-center gap-2 font-bold text-lg text-yef-primary transition-opacity hover:opacity-80"
          >
            All Testimonials
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="flex flex-col">
              <div className="relative aspect-square w-full overflow-hidden rounded-t-lg">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  fill
                  sizes="(min-width: 1024px) 20vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className={`${testimonial.bg} flex-1 rounded-b-lg p-4`}>
                <p className="font-normal text-sm leading-snug text-white">
                  {testimonial.quote}
                </p>
                <p className="mt-3 font-bold text-xs italic text-white">
                  {testimonial.name}
                </p>
                <p className="mt-1 text-[11px] text-white/50">
                  {testimonial.place}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
