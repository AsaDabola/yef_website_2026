import { getT } from "@/lib/i18n/server";
export default async function ContinuingMission() {
  const t = await getT();
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-3xl px-6 py-20 text-center lg:px-16">
        <h2 className="font-black text-4xl text-black sm:text-5xl">
          {t("Continuing the Mission")}
        </h2>
        <div className="mt-8 space-y-4 text-left text-lg text-black/70">
          <p>
            {t(
              "From its early roots in campus ministry to an international fellowship reaching across continents, YEF’s history is a testimony to God’s grace and faithfulness.",
            )}
          </p>
          <p>
            {t(
              "What began as a small seed has continued to grow through Bible studies, campus evangelism, retreats, mission centers, leadership conferences, international partnerships, missionary training, and the dedication of young believers who have answered God’s call.",
            )}
          </p>
          <p>
            {t(
              "Today, YEF continues looking toward the future with a vision for more campuses, cities, mission centers, and nations. As chapters are established and strengthened across more than 60 nations, YEF desires to raise young people who will not only receive the gospel but also become disciples, leaders, and missionaries who carry it to others.",
            )}
          </p>
        </div>

        <h3 className="mt-14 font-medium text-3xl text-black/70">
          {t("Our History Is Still Being Written")}
        </h3>
        <div className="mt-6 space-y-4 text-left italic text-black/70">
          <p>
            {t(
              "Every student reached, every Bible study opened, every leader raised, every missionary sent, every campus pioneered, and every nation reached becomes another chapter in the story of God’s work through YEF.",
            )}
          </p>
          <p>
            {t(
              "From a small mustard seed to a growing international mission, YEF continues forward in faith—raising the next generation to love Christ, serve His Church, and carry the gospel to the nations.",
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
