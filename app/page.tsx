import Navbar from "@/components/Navbar";
import HeroCinematic from "@/components/HeroCinematic";
import About from "@/components/About";
import EventTypes from "@/components/EventTypes";
import Services from "@/components/Services";
import FeaturedEvent from "@/components/FeaturedEvent";
import Gallery from "@/components/Gallery";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroCinematic />
        <About />
        <EventTypes />
        <Services />
        <FeaturedEvent />
        <Gallery />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
