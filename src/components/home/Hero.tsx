import Image from "next/image";
import Link from "next/link";
import Header from "./Header";

export default function Hero() {
  return (
    <section className="relative flex min-h-[640px] items-end overflow-hidden bg-yef-navy-deep lg:min-h-[900px]">
      <Image
        src="https://www.figma.com/api/mcp/asset/d75a4bad-e2d4-4754-b3e9-ce160ebe3425.png"
        alt="Youth gathered around a bonfire at dusk"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      <Header />

      <div className="relative z-10 mx-auto w-full max-w-[1800px] px-6 pb-20 pt-40 lg:px-16 lg:pb-28">
        <div className="max-w-2xl">
          <p className="font-bold text-xl uppercase tracking-[0.4px] text-white">
            Programs
          </p>
          <h1 className="mt-3 font-bold text-5xl uppercase leading-[1.05] tracking-[-0.72px] text-white sm:text-6xl lg:text-[72px]">
            To Know Christ,
            <br />
            To Make Him Known
          </h1>
          <p className="mt-6 font-medium text-xl text-white sm:text-2xl">
            For we do not preach ourselves but Jesus Christ as Lord
          </p>
          <Link
            href="/get-involved"
            className="mt-10 inline-flex items-center justify-center rounded-2xl border border-white px-8 py-4 font-semibold text-lg uppercase tracking-wide text-white transition-colors hover:bg-white hover:text-yef-primary"
          >
            Start Your Journey
          </Link>
        </div>
      </div>
    </section>
  );
}
