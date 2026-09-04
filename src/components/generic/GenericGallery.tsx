import GalleryMosaic from "@/components/get-involved/GalleryMosaic";
import { getT } from "@/lib/i18n/server";
import { backgroundClasses, type BackgroundValue } from "@/components/generic/background";

export default async function GenericGallery({
  images,
  background,
}: {
  images: [
    { src: string; alt: string },
    { src: string; alt: string },
    { src: string; alt: string },
  ];
  background?: BackgroundValue;
}) {
  const t = await getT();
  const bg = backgroundClasses(background);
  return (
    <section className={`${bg.section} px-6 py-10`}>
      <div className="mx-auto max-w-[1391px]">
        <GalleryMosaic
          images={
            images.map((image) => ({ ...image, alt: t(image.alt) })) as typeof images
          }
        />
      </div>
    </section>
  );
}
