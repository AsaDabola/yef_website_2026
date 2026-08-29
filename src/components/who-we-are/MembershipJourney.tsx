import { getT } from "@/lib/i18n/server";
import JourneyTimeline from "@/components/ui/JourneyTimeline";

/**
 * Five coordinated stops on one path rather than five unrelated ranks — the
 * copy is deliberately relational (connect, commit, serve, lead, minister)
 * rather than titles on an org chart. Each stage gets its own color so the
 * progression reads at a glance; yef-primary anchors the middle of it so the
 * site's brand blue still carries the section.
 */
const stages = [
  {
    number: "01",
    label: "Connect",
    title: "Start Your Journey",
    body: "Discover YEF through Bible study, fellowship, and community.",
    color: "#3D9BE9",
  },
  {
    number: "02",
    label: "Commit",
    title: "Grow in Community",
    body: "Become a committed member, grow in God's Word, and live out YEF's Statement of Faith.",
    color: "#0066CF",
  },
  {
    number: "03",
    label: "Serve",
    title: "Serve with Purpose",
    body: "Use your gifts and time to serve Christ and contribute to the YEF community.",
    color: "#2F5FA8",
  },
  {
    number: "04",
    label: "Lead",
    title: "Lead Others",
    body: "Develop as a servant leader and help others grow in Christ.",
    color: "#5B4B8A",
  },
  {
    number: "05",
    label: "Ministry",
    title: "Live Your Calling",
    body: "Explore God's calling and pursue a life of ministry and service.",
    color: "#B4823C",
  },
];

export default async function MembershipJourney() {
  const t = await getT();
  return (
    <div className="mt-16">
      <JourneyTimeline
        eyebrow={t("The Membership Journey")}
        heading={t("How You Grow at YEF")}
        stages={stages.map((stage) => ({
          ...stage,
          label: t(stage.label),
          title: t(stage.title),
          body: t(stage.body),
        }))}
      />
    </div>
  );
}
