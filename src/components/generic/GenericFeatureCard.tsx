import { getT } from "@/lib/i18n/server";
import FeatureCard from "@/components/who-we-are/FeatureCard";
import { backgroundClasses, type BackgroundValue } from "@/components/generic/background";

/**
 * Body copy beside the 344x573 photo card the Who We Are subpages share.
 * The card itself is the existing FeatureCard, so this cannot drift from the
 * design — only its words and its picture come from the CMS.
 */
export default async function GenericFeatureCard({
  paragraphs,
  image,
  imageAlt,
  cardEyebrow,
  cardEyebrowLine2,
  cardTitle,
  cardSide = "right",
  background,
}: {
  paragraphs: string[];
  image: string;
  imageAlt?: string;
  cardEyebrow: string;
  cardEyebrowLine2?: string;
  cardTitle: string;
  cardSide?: "left" | "right";
  background?: BackgroundValue;
}) {
  const t = await getT();
  const bg = backgroundClasses(background);

  return (
    <section className={bg.section}>
      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
        <div
          className={`space-y-6 text-lg ${bg.heading} ${cardSide === "left" ? "lg:order-2" : ""}`}
        >
          {paragraphs.map((body) => (
            <p key={body}>{t(body)}</p>
          ))}
        </div>

        <FeatureCard
          image={image}
          alt={t(imageAlt || "")}
          eyebrow={
            cardEyebrowLine2 ? (
              <>
                {t(cardEyebrow)}
                <span className="block font-normal">{t(cardEyebrowLine2)}</span>
              </>
            ) : (
              t(cardEyebrow)
            )
          }
          title={t(cardTitle)}
          className={`justify-self-center ${cardSide === "left" ? "lg:justify-self-start" : "lg:justify-self-end"}`}
        />
      </div>
    </section>
  );
}
