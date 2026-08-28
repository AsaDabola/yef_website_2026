import GetInvolvedFeature from "@/components/get-involved/GetInvolvedFeature";
import { getT } from "@/lib/i18n/server";

const steps = [
  {
    icon: "/images/icons/icon-christ.svg",
    title: "01. Step Out & Share",
    body: "Step beyond your comfort zone and experience the joy of sharing the Gospel with fellow students, right where they already are.",
  },
  {
    icon: "/images/icons/icon-church.svg",
    title: "02. Engage & Grow",
    body: "Follow up with the students you meet through Bible study and discipleship, so a single conversation grows into a lasting walk with Christ.",
  },
  {
    icon: "/images/icons/icon-child.svg",
    title: "03. Equip & Go",
    body: "Receive Biblical and practical training and take your next step into campus evangelism.",
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
        href: "/get-involved/campus-evangelism",
      }}
    />
  );
}
