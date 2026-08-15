import About from "@/components/home/About";
import Hero from "@/components/home/Hero";
import LiveOnMission from "@/components/home/LiveOnMission";
import News from "@/components/home/News";
import OurValues from "@/components/home/OurValues";
import ProgramsTabs from "@/components/home/ProgramsTabs";
import Quote from "@/components/home/Quote";
import QuickLinks from "@/components/home/QuickLinks";
import Testimonials from "@/components/home/Testimonials";
import WorldMap from "@/components/home/WorldMap";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <QuickLinks />
        <About />
        <ProgramsTabs />
        <Quote />
        <News />
        <OurValues />
        <Testimonials />
        <WorldMap />
        <LiveOnMission />
      </main>
      <Footer />
    </>
  );
}
