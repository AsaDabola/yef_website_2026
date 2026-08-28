import type { PageBlock } from "@/lib/pages";
import AboutUs, { type AboutUsContent } from "@/components/home-v2/AboutUs";
import AroundMovement from "@/components/home-v2/AroundMovement";
import FindYourCampus from "@/components/home-v2/FindYourCampus";
import GetInvolved from "@/components/home-v2/GetInvolved";
import Giving from "@/components/home-v2/Giving";
import Hero, { type HeroSlide } from "@/components/home-v2/Hero";
import MissionStatement, {
  type MissionContent,
} from "@/components/home-v2/MissionStatement";
import SignUp, { type SignUpContent } from "@/components/home-v2/SignUp";
import Testimonials from "@/components/home-v2/Testimonials";
import WhyTheYoung, {
  type ProofContent,
} from "@/components/home-v2/WhyTheYoung";
import WhoWeAreHero, {
  type WhoWeAreHeroContent,
} from "@/components/who-we-are/WhoWeAreHero";
import IntroCards, {
  type IntroCard,
  type IntroCardsContent,
} from "@/components/who-we-are/IntroCards";
import VisionMission, {
  type VisionMissionContent,
} from "@/components/who-we-are/VisionMission";
import StoriesNews from "@/components/who-we-are/StoriesNews";
import MissionSchoolCta from "@/components/who-we-are/MissionSchoolCta";

/** A media upload as Payload returns it once populated. */
type Upload = { url?: string | null; alt?: string | null } | number | null;

const imageOf = (value: Upload): string | undefined =>
  typeof value === "object" && value?.url ? value.url : undefined;

const altOf = (value: Upload): string | undefined =>
  typeof value === "object" && value?.alt ? value.alt : undefined;

/**
 * Renders a saved layout. Each block names a section; unknown block types are
 * skipped rather than throwing, so a layout saved against a newer set of
 * blocks degrades instead of taking the page down.
 */
export default function RenderBlocks({ layout }: { layout: PageBlock[] }) {
  return (
    <>
      {layout.map((block, index) => {
        const key = `${block.blockType}-${index}`;
        switch (block.blockType) {
          case "hero": {
            const rows = (block.slides ?? []) as {
              image: Upload;
              heading: string;
              body: string;
              buttonLabel?: string;
              buttonHref?: string;
            }[];
            const slides: HeroSlide[] = rows
              .map((row) => ({
                image: imageOf(row.image) ?? "",
                alt: altOf(row.image) ?? "",
                heading: row.heading,
                body: row.body,
                button:
                  row.buttonLabel && row.buttonHref
                    ? { label: row.buttonLabel, href: row.buttonHref }
                    : undefined,
              }))
              .filter((slide) => slide.image);
            return <Hero key={key} slides={slides.length ? slides : undefined} />;
          }
          case "about": {
            const stats = (block.stats ?? []) as {
              value: string;
              label: string;
            }[];
            const content: AboutUsContent = {
              image: imageOf(block.image as Upload),
              imageAlt: altOf(block.image as Upload),
              eyebrow: block.eyebrow as string,
              heading: block.heading as string,
              headingAccent: block.headingAccent as string,
              lead: block.lead as string,
              body: block.body as string,
              stats: stats.length ? stats : undefined,
            };
            return <AboutUs key={key} content={prune(content)} />;
          }
          case "mission": {
            const columns = (block.columns ?? []) as { body: string }[];
            const content: MissionContent = {
              eyebrow: block.eyebrow as string,
              verse: block.verse as string,
              verseAccent: block.verseAccent as string,
              reference: block.reference as string,
              columns: columns.length ? columns.map((c) => c.body) : undefined,
            };
            return <MissionStatement key={key} content={prune(content)} />;
          }
          case "proof": {
            const content: ProofContent = {
              eyebrow: block.eyebrow as string,
              heading: block.heading as string,
              items: (block.items ?? []) as ProofContent["items"],
            };
            return <WhyTheYoung key={key} content={prune(content)} />;
          }
          case "signup": {
            const content: SignUpContent = {
              eyebrow: block.eyebrow as string,
              heading: block.heading as string,
              body: block.body as string,
              buttonLabel: block.buttonLabel as string,
            };
            return <SignUp key={key} content={prune(content)} />;
          }
          case "campusFinder":
            return <FindYourCampus key={key} />;
          case "getInvolved":
            return <GetInvolved key={key} />;
          case "testimonials":
            return <Testimonials key={key} />;
          case "giving":
            return <Giving key={key} />;
          case "movement":
            return <AroundMovement key={key} />;
          case "whoWeAreHero": {
            const content: WhoWeAreHeroContent = {
              image: imageOf(block.image as Upload),
              heading: block.heading as string,
              body: block.body as string,
              missionBody: block.missionBody as string,
              portrait: imageOf(block.portrait as Upload),
              portraitAlt: altOf(block.portrait as Upload),
              quote: block.quote as string,
              signature: block.signature as string,
            };
            return <WhoWeAreHero key={key} content={prune(content)} />;
          }
          case "introCards": {
            const rows = (block.cards ?? []) as {
              image: Upload;
              eyebrow: string;
              title: string;
              cta: string;
            }[];
            const cards: IntroCard[] = rows.map((row) => ({
              image: imageOf(row.image),
              eyebrow: row.eyebrow,
              title: row.title,
              cta: row.cta,
            }));
            const content: IntroCardsContent = {
              eyebrow: block.eyebrow as string,
              heading: block.heading as string,
              cards: cards.length ? cards : undefined,
            };
            return <IntroCards key={key} content={prune(content)} />;
          }
          case "visionMission": {
            const pillars = (block.pillars ?? []) as {
              title: string;
              body: string;
            }[];
            const content: VisionMissionContent = {
              heading: block.heading as string,
              body: block.body as string,
              image: imageOf(block.image as Upload),
              pillars: pillars.length ? pillars : undefined,
            };
            return <VisionMission key={key} content={prune(content)} />;
          }
          case "storiesNews":
            return <StoriesNews key={key} />;
          case "missionSchoolCta":
            return <MissionSchoolCta key={key} />;
          default:
            return null;
        }
      })}
    </>
  );
}

/**
 * Drops empty fields so a section falls back to its bundled copy field by
 * field. An editor who fills in only the heading keeps the rest of the
 * design rather than blanking it.
 */
function prune<T extends object>(content: T): T {
  return Object.fromEntries(
    Object.entries(content).filter(
      ([, value]) =>
        value !== undefined && value !== null && value !== "",
    ),
  ) as T;
}
