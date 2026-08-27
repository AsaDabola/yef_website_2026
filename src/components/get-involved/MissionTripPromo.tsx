import GetInvolvedFeature from "@/components/get-involved/GetInvolvedFeature";
import { getT } from "@/lib/i18n/server";

const steps = [
  {
    icon: "/images/icons/icon-christ.svg",
    title: "01. Experience Mission",
    body: "Step Beyond Your Everyday Life and Experience the Joy of Sharing the Gospel",
  },
  {
    icon: "/images/icons/icon-church.svg",
    title: "02. Serve & Grow",
    body: "Serve Alongside Local Believers, Grow in Faith, and Discover Your Calling",
  },
  {
    icon: "/images/icons/icon-child.svg",
    title: "03. Prepare & Go",
    body: "Receive Biblical and Practical Training and Take Your Next Step into Mission",
  },
];

export default async function MissionTripPromo() {
  const t = await getT();
  return (
    <GetInvolvedFeature
      id="mission-trip"
      title={t("Mission Trips")}
      intro="Youth Evangelical Fellowship (YEF) is dedicated to revealing the Gospel of Jesus Christ in our daily lives, transforming our communities, and bringing the good news to all people. As creative and committed Christians, we work daily to quench the spiritual drought in our cities and restore the hearts of many worldwide."
      image="/images/get-involved/mission-trip-street-evangelism.png"
      alt={t("YEF members handing out tracts on a busy street")}
      items={steps}
      link={{
        label: "Learn more about Mission Trip",
        href: "/get-involved/mission-trip",
      }}
    />
  );
}
