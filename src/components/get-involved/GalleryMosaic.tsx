import Image from "next/image";

export default function GalleryMosaic({
  images,
}: {
  images: [
    { src: string; alt: string },
    { src: string; alt: string },
    { src: string; alt: string },
  ];
}) {
  const [main, topRight, bottomRight] = images;

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_0.6fr]">
      <div className="relative aspect-[849/637] w-full overflow-hidden rounded-2xl sm:aspect-auto">
        <Image
          src={main.src}
          alt={main.alt}
          fill
          sizes="(min-width: 1024px) 45vw, 90vw"
          className="object-cover"
        />
      </div>
      <div className="grid grid-cols-1 gap-3">
        <div className="relative aspect-[477/311] w-full overflow-hidden rounded-2xl">
          <Image
            src={topRight.src}
            alt={topRight.alt}
            fill
            sizes="(min-width: 1024px) 25vw, 90vw"
            className="object-cover"
          />
        </div>
        <a
          href="#"
          className="group relative aspect-[477/311] w-full overflow-hidden rounded-2xl"
        >
          <Image
            src={bottomRight.src}
            alt={bottomRight.alt}
            fill
            sizes="(min-width: 1024px) 25vw, 90vw"
            className="object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/60 font-medium text-white transition-opacity group-hover:bg-black/70">
            See More
            <span aria-hidden="true">&rarr;</span>
          </div>
        </a>
      </div>
    </div>
  );
}
