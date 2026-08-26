import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { getT } from "@/lib/i18n/server";

const defaults = {
  eyebrow: "Stay Up to Date",
  heading: "News from the campuses.",
  body: "Field reports, training dates, and stories from students around the world.",
  buttonLabel: "Sign Up",
};

export type SignUpContent = Partial<typeof defaults>;

export default async function SignUp({
  content,
}: {
  content?: SignUpContent;
}) {
  const t = await getT();
  const c = { ...defaults, ...content };
  return (
    <section
      id="signup"
      className="font-body relative overflow-hidden bg-v2-blue"
    >
      {/* The map is light line-art on a navy ground, so it screens onto the
          band: the ground drops out and only the lines carry over, keeping
          the section's blue instead of turning it navy. */}
      <Image
        src="/images/home-v2/signup-world-map.jpg"
        alt=""
        width={4096}
        height={1738}
        sizes="100vw"
        priority={false}
        className="yef-pulse absolute inset-0 size-full object-cover opacity-75 mix-blend-screen"
      />
      <div className="relative mx-auto max-w-[1920px] px-6 py-24 text-center sm:px-10 lg:px-19">
        <Reveal>
          <p className="font-semibold text-[11px] text-white/45 tracking-[2.42px] uppercase">
            {t(c.eyebrow)}
          </p>
          <h2 className="mt-4 font-display font-bold text-4xl text-[#f2f6fb] tracking-[-1px] sm:text-5xl">
            {t(c.heading)}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-white/60">
            {t(c.body)}
          </p>

          <form className="mx-auto mt-8 flex max-w-lg flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <label className="sr-only" htmlFor="signup-email">
              {t("Email address")}
            </label>
            <input
              id="signup-email"
              type="email"
              placeholder={t("Email address")}
              className="w-full rounded-full border border-white/20 bg-transparent px-6 py-4 text-sm text-white placeholder:text-white/40 focus:border-white/50 focus:outline-none sm:w-[340px]"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-yef-primary px-8 py-4 font-semibold text-xs text-white tracking-[1.92px] uppercase transition-transform duration-200 hover:scale-105"
            >
              {t(c.buttonLabel)}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
