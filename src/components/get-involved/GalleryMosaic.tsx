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
    // 849fr/477fr resolves both columns to the same height: the tall image is
    // 849x637 and the stacked pair is 2 x 477x311 plus the gutter.
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-[849fr_477fr]">
      <div className="relative aspect-[849/637] w-full overflow-hidden rounded-2xl">
        <Image
          src={main.src}
          alt={main.alt}
          fill
          sizes="(min-width: 640px) 45vw, 90vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col gap-4">
        <div className="relative aspect-[477/311] w-full overflow-hidden rounded-2xl">
          <Image
            src={topRight.src}
            alt={topRight.alt}
            fill
            sizes="(min-width: 640px) 26vw, 90vw"
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
            sizes="(min-width: 640px) 26vw, 90vw"
            className="object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/60 font-medium text-lg text-white transition-opacity group-hover:bg-black/70">
            See More
            <Image
              src="/images/icons/icon-arrow-right-24-white.svg"
              alt=""
              width={28}
              height={28}
              aria-hidden="true"
            />
          </div>
        </a>
      </div>
    </div>
  );
}
