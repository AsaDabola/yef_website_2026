import Image from "next/image";
import Link from "next/link";
import HeaderV2 from "@/components/home-v2/HeaderV2";

export default function WhoWeAreHero() {
  return (
    <section className="font-body relative flex min-h-[560px] items-center overflow-hidden bg-v2-navy lg:min-h-[650px]">
      <Image
        src="https://www.figma.com/api/mcp/asset/9d522f15-766c-4b95-997d-0b0baf91be2a.png"
        alt="Mountain range at dusk"
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-v2-navy/70 via-v2-blue/30 to-v2-navy/80" />

      <HeaderV2 />

      <div className="relative z-10 mx-auto grid w-full max-w-[1920px] grid-cols-1 gap-14 px-6 pb-16 pt-40 sm:px-10 lg:grid-cols-2 lg:gap-10 lg:px-19 lg:pb-20">
        <div className="max-w-xl">
          <h1 className="font-display font-extrabold text-6xl leading-[0.98] tracking-[-2.4px] text-white sm:text-7xl">
            Who We Are
          </h1>
          <p className="mt-8 text-lg text-white/90 leading-relaxed">
            YEF is dedicated to revealing the Gospel of Jesus Christ in our
            daily lives, transforming our communities, and bringing the good
            news to all people. As creative and committed Christians, we work
            daily to quench the spiritual drought in our cities and restore
            the hearts of many around the world.
          </p>
          <Link
            href="/who-we-are/welcome"
            className="mt-8 inline-flex items-center justify-center rounded-full border border-white/55 px-8 py-4 font-semibold text-xs tracking-[1.92px] text-white transition-colors hover:bg-white hover:text-v2-navy"
          >
            WELCOME
          </Link>

          <p className="mt-12 max-w-lg text-lg text-white/90 leading-relaxed">
            <span className="font-bold">Mission Statement: </span>
            YEF exists to reach and plant the Gospel of Christ&rsquo;s love
            into the souls of the youth on campus&mdash;those who can bring
            great, lasting impact to the future of Christian faith.
          </p>
        </div>

        <div className="relative aspect-[4/3] w-full self-center overflow-hidden rounded-2xl lg:max-w-md lg:justify-self-end">
          <Image
            src="https://www.figma.com/api/mcp/asset/853c6712-feed-4077-9e8e-0d5fe838eacd.png"
            alt="Dr. Mark Wagner, President of Youth Evangelical Fellowship"
            fill
            sizes="(min-width: 1024px) 35vw, 90vw"
            className="object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-6 pb-6 pt-16">
            <p className="font-instrument-serif text-xl italic leading-snug text-white">
              &ldquo;God has a Great Calling for His people. Walk the journey
              with faith and you will find true joy and peace&rdquo;
            </p>
            <p className="mt-2 font-signature text-2xl capitalize tracking-[0.6px] text-white/85">
              - Dr. Mark Wagner, President of Youth Evangelical Fellowship
            </p>
          </div>
        </div>
      </div>

      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs tracking-[2.2px] text-white/70">
        YOUTH EVANGELICAL FELLOWSHIP INTERNATIONAL
      </p>
    </section>
  );
}
