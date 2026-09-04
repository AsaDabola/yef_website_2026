import Image from "next/image";
import { getT } from "@/lib/i18n/server";
import { backgroundClasses, type BackgroundValue } from "@/components/generic/background";

export default async function GenericPhotoGrid({
  eyebrow,
  heading,
  people,
  background,
}: {
  eyebrow?: string;
  heading?: string;
  people: { image: string; name: string; title?: string }[];
  background?: BackgroundValue;
}) {
  const t = await getT();
  const bg = backgroundClasses(background);
  return (
    <section className={`${bg.section} px-6 py-16 lg:py-20`}>
      <div className="mx-auto max-w-[1391px]">
        {eyebrow ? (
          <p className={`font-semibold text-sm uppercase tracking-[1.6px] ${bg.eyebrow}`}>
            {t(eyebrow)}
          </p>
        ) : null}
        {heading ? (
          <h2
            className={`mt-3 font-display font-bold text-3xl tracking-[-0.64px] sm:text-4xl ${bg.heading}`}
          >
            {t(heading)}
          </h2>
        ) : null}
        <div
          className={`grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-4 ${heading || eyebrow ? "mt-10" : ""}`}
        >
          {people.map((person) => (
            <div key={person.name}>
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-[#f7f7f7]">
                <Image
                  src={person.image}
                  alt={person.name}
                  fill
                  sizes="(min-width: 1024px) 319px, (min-width: 640px) 30vw, 45vw"
                  className="object-cover"
                />
              </div>
              <p className={`mt-4 font-sans font-extrabold text-[16px] leading-[24px] ${bg.heading}`}>
                {t(person.name)}
              </p>
              {person.title ? (
                <p className={`font-sans text-[16px] italic leading-[24px] ${bg.body}`}>
                  {t(person.title)}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
