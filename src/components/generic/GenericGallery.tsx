import GalleryMosaic from "@/components/get-involved/GalleryMosaic";
import { getT } from "@/lib/i18n/server";

export default async function GenericGallery({
  images,
}: {
  images: [
    { src: string; alt: string },
    { src: string; alt: string },
    { src: string; alt: string },
  ];
}) {
  const t = await getT();
  return (
    <section className="mx-auto max-w-[1391px] px-6 py-10">
      <GalleryMosaic
        images={
          images.map((image) => ({ ...image, alt: t(image.alt) })) as typeof images
        }
      />
    </section>
  );
}
