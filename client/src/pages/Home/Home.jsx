import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/sections/Hero";
import ServicesPreview from "../../components/sections/ServicesPreview";
import FeaturedProjects from "../../components/sections/FeaturedProjects";
import ProcessTimeline from "../../components/sections/ProcessTimeline";
import Testimonials from "../../components/sections/Testimonials";
import TechStack from "../../components/sections/TechStack";
import FAQ from "../../components/sections/FAQ";
import ContactCTA from "../../components/sections/ContactCTA";
import Footer from "../../components/layout/Footer";

import Reveal from "../../animations/Reveal";

const Home = () => {
  return (
    <div className="min-h-screen">

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="pt-20">

        <Reveal>
          <Hero />
        </Reveal>

        <Reveal delay={0.05}>
          <ServicesPreview />
        </Reveal>

        <Reveal delay={0.05}>
          <FeaturedProjects />
        </Reveal>

        <Reveal delay={0.05}>
          <ProcessTimeline />
        </Reveal>

        <Reveal delay={0.05}>
          <Testimonials />
        </Reveal>

        <Reveal delay={0.05}>
          <TechStack />
        </Reveal>

        <Reveal delay={0.05}>
          <FAQ />
        </Reveal>

        <Reveal delay={0.05}>
          <ContactCTA />
        </Reveal>

        <Reveal delay={0.05}>
          <Footer />
        </Reveal>

      </main>

    </div>
  );
};

export default Home;