import About from "@/components/home/About";
import Hero from "@/components/home/Hero";
import ProgramsTabs from "@/components/home/ProgramsTabs";
import QuickLinks from "@/components/home/QuickLinks";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <About />
        <ProgramsTabs />
        <QuickLinks />
      </main>
      <Footer />
    </>
  );
}
