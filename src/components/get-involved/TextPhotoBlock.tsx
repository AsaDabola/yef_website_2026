import Image from "next/image";

export default function TextPhotoBlock({
  body,
  heading,
  image,
  alt,
  imageSide = "right",
  card = false,
}: {
  body: React.ReactNode;
  heading?: string;
  image: string;
  alt: string;
  imageSide?: "left" | "right";
  /** Bordered panel with the photo bleeding to its edge, as on Sharing the Gospel. */
  card?: boolean;
}) {
  if (card) {
    return (
      <div className="grid grid-cols-1 overflow-hidden rounded-[16px] border border-[#dcdfe5] bg-white sm:grid-cols-[671fr_672fr]">
        <div
          className={`flex flex-col justify-center px-8 py-12 sm:py-16 lg:px-[82px] ${
            imageSide === "left" ? "sm:order-2 lg:px-12" : ""
          }`}
        >
          {heading && (
            <h3 className="mb-4 font-semibold text-[28px] text-black leading-[40px] tracking-[-0.64px] lg:text-[36px]">
              {heading}
            </h3>
          )}
          <p className="font-medium text-[19px] text-[#4b5565] leading-[30px]">
            {body}
          </p>
        </div>
        <div className="relative min-h-[320px] w-full sm:min-h-[640px]">
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 items-center gap-10 sm:grid-cols-2 sm:gap-16">
      <div className={imageSide === "left" ? "sm:order-2" : ""}>
        {heading && (
          <h3 className="mb-4 font-display font-extrabold text-2xl text-v2-navy sm:text-3xl">
            {heading}
          </h3>
        )}
        <p className="text-lg text-v2-muted-dark-2 leading-relaxed">{body}</p>
      </div>
      <div className="relative aspect-[670/638] w-full overflow-hidden rounded-2xl">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 35vw, 90vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}
