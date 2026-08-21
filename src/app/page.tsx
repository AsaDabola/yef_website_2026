import Hero from "@/components/home-v2/Hero";
import FindYourCampus from "@/components/home-v2/FindYourCampus";
import AboutUs from "@/components/home-v2/AboutUs";
import MissionStatement from "@/components/home-v2/MissionStatement";
import WhyTheYoung from "@/components/home-v2/WhyTheYoung";
import GetInvolved from "@/components/home-v2/GetInvolved";
import Testimonials from "@/components/home-v2/Testimonials";
import Giving from "@/components/home-v2/Giving";
import AroundMovement from "@/components/home-v2/AroundMovement";
import SignUp from "@/components/home-v2/SignUp";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <FindYourCampus />
        <AboutUs />
        <MissionStatement />
        <WhyTheYoung />
        <GetInvolved />
        <Testimonials />
        <Giving />
        <AroundMovement />
        <SignUp />
      </main>
      <Footer />
    </>
  );
}
