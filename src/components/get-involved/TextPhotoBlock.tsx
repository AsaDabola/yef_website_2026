import Image from "next/image";

export default function TextPhotoBlock({
  body,
  image,
  alt,
  imageSide = "right",
}: {
  body: string;
  image: string;
  alt: string;
  imageSide?: "left" | "right";
}) {
  return (
    <div className="grid grid-cols-1 items-center gap-10 sm:grid-cols-2 sm:gap-16">
      <p
        className={`text-lg text-v2-muted-dark-2 leading-relaxed ${
          imageSide === "left" ? "sm:order-2" : ""
        }`}
      >
        {body}
      </p>
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
