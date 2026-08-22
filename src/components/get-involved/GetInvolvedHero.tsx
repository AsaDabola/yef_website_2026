import Image from "next/image";
import HeaderV2 from "@/components/home-v2/HeaderV2";

export default function GetInvolvedHero() {
  return (
    <section className="relative flex min-h-[560px] items-center overflow-hidden bg-gradient-to-b from-[#00203f] via-[#0656a5] via-[55%] to-[#00142a] lg:min-h-[700px]">
      <Image
        src="https://www.figma.com/api/mcp/asset/dfdd648a-988d-422c-8f15-930009587da6.png"
        alt="Waves breaking on a beach"
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#00203f]/70 via-[#0656a5]/20 to-[#00142a]/80" />

      <HeaderV2 />

      <div className="relative z-10 mx-auto grid w-full max-w-[1920px] grid-cols-1 gap-14 px-6 pb-16 pt-40 sm:px-10 lg:grid-cols-2 lg:gap-10 lg:px-19">
        <div className="max-w-xl">
          <h1 className="font-display font-extrabold text-6xl leading-[0.98] tracking-[-2.4px] text-white sm:text-7xl">
            Get Involved
          </h1>
          <p className="mt-8 text-lg text-white/90 leading-relaxed">
            YEF is a global movement to inspire young generations to become
            purpose-driven leaders, who seek to follow the passionate life of
            Jesus Christ and transform the lives of others as well as their
            own. By creating an evangelical and witnessing community on
            campus among students, YEF is hoping to create a seedbed of
            great revival through the youth across the world, that would
            ignite the passion and love for Christ into people&rsquo;s heart.
          </p>
          <p className="mt-4 text-lg text-white/90 leading-relaxed">
            With more than 40 countries across the world, the YEF staff,
            volunteers and members are dedicated to using their talents and
            youth for kingdom building works.
          </p>
        </div>

        <div className="relative aspect-[4/3] w-full self-center overflow-hidden rounded-2xl lg:max-w-md lg:justify-self-end">
          <Image
            src="https://www.figma.com/api/mcp/asset/25415170-f9aa-4169-9c56-f56556786626.png"
            alt="A student laughing with friends outdoors"
            fill
            sizes="(min-width: 1024px) 35vw, 90vw"
            className="object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-6 pb-6 pt-16">
            <p className="font-semibold text-[13px] uppercase leading-[1.27] tracking-[1.6045px] text-white">
              &ldquo;YEF is a global movement empowering purpose-driven young
              leaders to ignite revival across campuses in 40+
              countries.&rdquo;
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
