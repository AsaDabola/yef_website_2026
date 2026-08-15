import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb";
import WhoWeAreSubMenu from "@/components/WhoWeAreSubMenu";

export default function AboutIntro() {
  return (
    <section className="mx-auto max-w-[1800px] px-6 py-16 lg:px-16">
      <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
        <div className="shrink-0 lg:w-[237px]">
          <WhoWeAreSubMenu />
        </div>

        <div className="flex-1">
          <Breadcrumb label="Who We Are" />
          <h1 className="mt-6 font-semibold text-4xl text-black sm:text-5xl">
            About Youth Evangelical Fellowship
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-[#4b5565]">
            YEF is dedicated to revealing the Gospel of Jesus Christ in our
            daily lives, transforming our communities, and bringing the good
            news to all people. As creative and committed Christians, we work
            daily to quench the spiritual drought in our cities and restore
            the hearts of many around the world.
          </p>

          <div className="relative mt-12 aspect-[1344/644] w-full overflow-hidden rounded-2xl">
            <Image
              src="https://www.figma.com/api/mcp/asset/8e751fb8-cd4e-46ff-9aeb-aeff81a7af6d.png"
              alt="Dr. Mark Wagner, President of Youth Evangelical Fellowship"
              fill
              sizes="(min-width: 1024px) 70vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-6 pb-8 pt-24 sm:px-12">
              <p className="max-w-2xl font-medium text-xl text-white sm:text-2xl">
                &ldquo;God has a Great Calling for His people. Walk the
                journey with faith and you will find true joy and peace&rdquo;
              </p>
              <p className="mt-4 italic text-white">
                -Dr. Mark Wagner, President of Youth Evangelical Fellowship
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
