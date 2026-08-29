import { getT } from "@/lib/i18n/server";
import Link from "@/components/ui/LocaleLink";

export default async function GenericCta({
  heading,
  body,
  button,
}: {
  heading: string;
  body?: string;
  button: { label: string; href: string };
}) {
  const t = await getT();
  return (
    <section className="mx-auto max-w-[1391px] px-6 py-20 text-center lg:py-[100px]">
      <h2 className="font-display font-semibold text-3xl text-black sm:text-[34px] sm:leading-[37.4px]">
        {t(heading)}
      </h2>
      {body ? (
        <p className="mx-auto mt-5 max-w-[640px] text-[16.6px] text-black leading-[27.2px]">
          {t(body)}
        </p>
      ) : null}
      <Link
        href={button.href}
        className="mt-9 inline-block rounded-full bg-[#0066cf] px-10 py-4 font-semibold text-xs text-white tracking-[1.92px] uppercase transition-transform duration-200 hover:scale-[1.02]"
      >
        {t(button.label)}
      </Link>
    </section>
  );
}
