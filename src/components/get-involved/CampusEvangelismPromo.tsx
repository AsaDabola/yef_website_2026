import GetInvolvedFeature from "@/components/get-involved/GetInvolvedFeature";
import { getT } from "@/lib/i18n/server";

const steps = [
  {
    icon: "/images/icons/icon-christ.svg",
    title: "01. Step Out & Share",
    body: "Step Beyond Your Comfort Zone and Experience the Joy of Sharing the Gospel with Fellow Students",
  },
  {
    icon: "/images/icons/icon-church.svg",
    title: "02. Engage & Grow",
    body: "Step Beyond Your Comfort Zone and Experience the Joy of Sharing the Gospel with Fellow Students",
  },
  {
    icon: "/images/icons/icon-child.svg",
    title: "03. Equip & Go",
    body: "Receive Biblical and Practical Training and Take Your Next Step into Campus Evangelism",
  },
];

export default async function CampusEvangelismPromo() {
  const t = await getT();
  return (
    <GetInvolvedFeature
      id="campus-evangelism"
      title={t("Campus Evangelism")}
      intro="Youth Evangelical Fellowship (YEF) is dedicated to sharing the Gospel of Jesus Christ with students, transforming campus culture, and bringing the good news to every corner of university life. As creative and committed Christians, we work daily to reach the spiritually thirsty on campus and awaken the hearts of students worldwide."
      image="/images/get-involved/campus-evangelism-walk.webp"
      alt={t("Students walking together on a sunlit campus path")}
      items={steps}
      link={{
        label: "Learn more about Campus Evangelism",
        href: "/get-involved#campus-evangelism",
      }}
    />
  );
}
