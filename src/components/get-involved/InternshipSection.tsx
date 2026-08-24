import GetInvolvedFeature from "@/components/get-involved/GetInvolvedFeature";

const pillars = [
  {
    icon: "/images/icons/icon-christ.svg",
    title: "Christ-centered:",
    body: "Jesus is at the center of everything we do, so every intern hears the gospel and sees it in action through local church pastors, volunteers and partners around the world.",
  },
  {
    icon: "/images/icons/icon-church.svg",
    title: "Church-driven:",
    body: "We empower local churches on campuses to serve students in need. These churches become consistent sources of light and hope, representing Christ, making disciples and caring for students as they grow.",
  },
  {
    icon: "/images/icons/icon-child.svg",
    title: "Student-focused:",
    body: "We care for each student's unique right-now and long-term needs. Given the care they need, students become thriving followers of Jesus, transforming their families, communities and nations.",
  },
];

export default function InternshipSection() {
  return (
    <GetInvolvedFeature
      id="internship"
      title="Internship"
      intro="Work under a trained professional in any field and learn the ropes from them! Internships at YEF HQ are open to the YEF members from local chapters who have finished their leadership training and are willing to serve in building the ministry together. As with volunteering, you have the option to intern in video making, Web design, technology, event-planning, communication and more."
      image="/images/who-we-are/vision-mission-bible.png"
      alt="A cross silhouetted above an open Bible at sunset"
      items={pillars}
      inlineItems
      link={{
        label: "Learn more about how we’re different",
        href: "/who-we-are/mission",
      }}
    />
  );
}
