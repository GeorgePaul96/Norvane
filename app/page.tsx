import Navigation from "@/components/Navigation";
import Hero from "@/components/sections/Hero";
import Credibility from "@/components/sections/Credibility";
import Services from "@/components/sections/Services";
import Methodology from "@/components/sections/Methodology";
import Dashboard from "@/components/sections/Dashboard";
import CaseStudies from "@/components/sections/CaseStudies";
import Philosophy from "@/components/sections/Philosophy";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen dark:bg-surface-900 bg-surface-50">
      <Navigation />
      <Hero />
      <Credibility />
      <Services />
      <Methodology />
      <Dashboard />
      <CaseStudies />
      <Philosophy />
      <FinalCTA />
      <Footer />
    </main>
  );
}
