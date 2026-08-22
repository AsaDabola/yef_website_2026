import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import CarouselWhatWeDo from "@/components/get-involved/CarouselWhatWeDo";
import GetInvolvedHero from "@/components/get-involved/GetInvolvedHero";
import GetInvolvedSubMenu from "@/components/get-involved/GetInvolvedSubMenu";
import InternshipSection from "@/components/get-involved/InternshipSection";
import MinistrySection from "@/components/get-involved/MinistrySection";
import MissionTripPromo from "@/components/get-involved/MissionTripPromo";
import StoriesTrio from "@/components/get-involved/StoriesTrio";
import MissionSchoolCta from "@/components/who-we-are/MissionSchoolCta";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Get Involved | Youth Evangelical Fellowship",
};

export default function GetInvolvedPage() {
  return (
    <>
      <main>
        <GetInvolvedHero />

        <section className="mx-auto max-w-[1800px] px-6 py-16 lg:px-16">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
            <div className="shrink-0 lg:w-[237px]">
              <GetInvolvedSubMenu />
            </div>

            <div className="flex-1">
              <Breadcrumb label="Get Involved" />

              <MinistrySection
                id="bible-studies"
                title="Bible Studies"
                body="Embrace your identity in Christ and live out your calling. Offering individual and group studies, YEF is proud to offer deep and extensive Bible studies. Join us and go deeper in the Word during your college years, which will stay with you for many years to come. The Word of God has the power to change lives and so we aim to give you this great blessing that will surely change your whole life. Transform your lives with the power of His love."
                resourceColumns={[
                  [
                    "The Four Spiritual Laws",
                    "Romans",
                    "The Way of the Cross",
                    "The Way of Faith",
                    "Galatians",
                  ],
                  ["Acts", "1 & 2 Corinthians", "The Sermon on the Mount"],
                ]}
                image="/images/home-v2/get-involved-bible-study.png"
                alt="A student holding a Bible study guide"
                ctas={[
                  { label: "More Info", href: "#bible-studies", primary: true },
                  { label: "Apply Bible Study", href: "/get-involved/apply" },
                ]}
              />

              <CarouselWhatWeDo />

              <StoriesTrio />

              <div className="border-t border-black/10 py-16">
                <MissionTripPromo />
              </div>

              <MinistrySection
                id="summer-training"
                title="Summer Training"
                body="Every year, YEF offers summer training in the U.S. and South Korea. This training of 3 to 7 days, will allow students to be surrounded in the Word and prayer, while in fellowship with others from all around the world. These days usually consist of Bible studies, camping, visiting attractions, as well as, practicum of mission such as evangelism, teaching etc. Stay tuned to our site events, if you're interested! Program may vary each year."
                resourceColumns={[
                  ["Application Form", "Camp Guidelines", "Scholarship Request"],
                  [
                    "Pre-Reading & Scripture Study",
                    "Visa Invitation Letter",
                    "Support Letter Template",
                  ],
                ]}
                image="/images/home-v2/get-involved-summer-training.png"
                alt="Students at YEF summer training"
              />

              <MinistrySection
                id="short-term-mission"
                title="Short-term Mission"
                body="Interested in furthering God's kingdom with the talents God has given you? YEF provides volunteer opportunities that anyone can contribute to building the ministry together. You can share your talents with our campus ministry to reach more of the unreached student on college campuses. Volunteer positions vary from video making, Web design, technology, event-planning, communication and much more."
                resourceColumns={[
                  [
                    "Trip Destinations & Dates",
                    "Application & Requirements",
                    "Support Raising Toolkit",
                    "Travel Prep",
                    "Team Training Schedule",
                  ],
                ]}
                image="/images/get-involved/story-prayer.png"
                alt="A woman leading a classroom in prayer"
              />

              <InternshipSection />

              <MinistrySection
                id="discipleship"
                title="Discipleship Training"
                body={
                  "Discipleship is one of the key focuses of our ministry. Jesus also raised twelve disciples among the many crowds that followed. Those who are willing to follow the life of Jesus, by overcoming all the hindrances of the world were selected and preciously guided with Word of Jesus. YEF is dedicated to raising students on campus into disciples of Jesus with a more adaptable program for campus life. With small group and personal mentoring, the Bible can guide us to know the heart of God and His amazing salvation. Through our program, you can discover the meaning of salvation, the cross, the calling of God in our lives and much more. Yes, just as Jesus said, “Go, make disciples!”"
                }
                resourceColumns={[
                  [
                    "Program Overview",
                    "Start a Bible Study",
                    "Study Materials by Phase",
                    "Meet Your Teacher",
                    "What Comes Next",
                  ],
                ]}
                image="/images/get-involved/discipleship.png"
                alt="A student in discipleship training"
              />

              <MinistrySection
                id="leadership-training"
                title="Leadership Training"
                body="YEF offers leadership training regionally and nationwide to provide rich spiritual foods to the students in need. Leadership Training is open to the students who finished their discipleship program on their campus. During their training, they will be equipped as teachers and missionaries on campus by learning about mission and the practicum for instructing students."
                resourceColumns={[
                  [
                    "Who This Is For",
                    "Training Application",
                    "Leader's Toolkit",
                    "Starting a Chapter",
                    "Ongoing Support",
                  ],
                ]}
                image="/images/home-v2/get-involved-leadership-training.png"
                alt="Students in leadership training"
              />

              <MinistrySection
                id="volunteering"
                title="Volunteering"
                body="As a volunteer with YEF, you will be helping build or start a spiritual movement in your local chapter. Contact your local YEF leader for further information."
                resourceColumns={[
                  [
                    "Sign Up",
                    "Time Commitment",
                    "Recommendation Letter",
                    "Volunteer Stories",
                  ],
                ]}
                image="/images/get-involved/volunteering.png"
                alt="A volunteer serving alongside a student"
              />
            </div>
          </div>
        </section>

        <MissionSchoolCta />
      </main>
      <Footer />
    </>
  );
}
