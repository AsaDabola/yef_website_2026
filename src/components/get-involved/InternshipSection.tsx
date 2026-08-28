import GetInvolvedFeature from "@/components/get-involved/GetInvolvedFeature";
import { getT } from "@/lib/i18n/server";

const pillars = [
  {
    icon: "/images/icons/icon-christ.svg",
    title: "Hands-On Ministry:",
    body: "You won't just observe — you'll carry real responsibility on real projects, from video and design to events and communications, all in service of the Gospel going out.",
  },
  {
    icon: "/images/icons/icon-church.svg",
    title: "Mentorship:",
    body: "A trained staff member walks alongside you, not just teaching a skill but discipling you in how to steward it for the Kingdom.",
  },
  {
    icon: "/images/icons/icon-child.svg",
    title: "Sent, Not Just Trained:",
    body: "An internship at YEF HQ prepares you to carry what you've learned back to your own campus and chapter, equipped to serve and lead.",
  },
];

export default async function InternshipSection() {
  const t = await getT();
  return (
    <GetInvolvedFeature
      id="internship"
      title={t("Internship")}
      intro="Work under a trained professional in any field and learn the ropes from them! Internships at YEF HQ are open to YEF members from local chapters who have finished their leadership training and are willing to serve in building the ministry together. You can intern in video making, web design, technology, event-planning, communications, and more."
      image="/images/get-involved/internship-cross-bible.png"
      alt={t("A cross silhouetted above an open Bible at sunset")}
      items={pillars}
      inlineItems
      link={{
        label: "I'm Interested in an Internship",
        href: "/get-involved/apply",
      }}
    />
  );
}
