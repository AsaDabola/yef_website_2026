import Image from "next/image";

export default function MinistrySection({
  id,
  title,
  body,
  resourceColumns,
  image,
  alt,
  ctas,
}: {
  id: string;
  title: string;
  body: string;
  resourceColumns?: string[][];
  image: string;
  alt: string;
  ctas?: { label: string; href: string; primary?: boolean }[];
}) {
  return (
    <section id={id} className="scroll-mt-32 border-t border-black/10 py-16 first:border-t-0 first:pt-0">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_344px] lg:gap-16">
        <div>
          <h2 className="font-display font-extrabold text-3xl text-v2-navy tracking-[-0.5px] sm:text-4xl">
            {title}
          </h2>
          <p className="mt-6 max-w-xl text-v2-muted-dark-2 leading-relaxed">
            {body}
          </p>

          {ctas && ctas.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-4">
              {ctas.map((cta) => (
                <a
                  key={cta.label}
                  href={cta.href}
                  className={
                    cta.primary
                      ? "inline-flex items-center justify-center rounded-full bg-yef-primary px-8 py-4 font-semibold text-xs text-white tracking-[1px] uppercase transition-transform duration-200 hover:scale-105 hover:opacity-90"
                      : "inline-flex items-center justify-center rounded-full border border-v2-border px-8 py-4 font-semibold text-xs text-v2-navy tracking-[1px] uppercase transition-all duration-200 hover:scale-105 hover:border-v2-navy"
                  }
                >
                  {cta.label}
                </a>
              ))}
            </div>
          )}

          {resourceColumns && resourceColumns.length > 0 && (
            <div className="mt-10">
              <p className="font-semibold text-xs text-v2-muted tracking-[1.6px] uppercase">
                Top Resources
              </p>
              <div className="mt-4 flex flex-wrap gap-x-16 gap-y-2">
                {resourceColumns.map((column, i) => (
                  <ul key={i} className="space-y-2.5">
                    {column.map((item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className="font-medium text-v2-navy underline decoration-v2-border underline-offset-4 transition-colors hover:text-yef-primary hover:decoration-yef-primary"
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="relative aspect-[344/573] w-full overflow-hidden rounded-[20px] bg-v2-navy lg:justify-self-end">
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 25vw, 90vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1216] from-5% via-[#0e1216]/25 via-45% to-[#0e1216]/5" />
          <p className="absolute left-6 top-6 font-semibold text-[11px] text-white/85 tracking-[1.6px] uppercase">
            Get Involved
          </p>
          <p className="absolute bottom-6 left-6 font-display font-extrabold text-2xl text-white tracking-[-0.3px]">
            {title}
          </p>
        </div>
      </div>
    </section>
  );
}
