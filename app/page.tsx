import Navigation from "@/components/Navigation";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Philosophy from "@/components/sections/Philosophy";
import Services from "@/components/sections/Services";
import DiagnosticTool from "@/components/sections/DiagnosticTool";
import DiagnosticProgram from "@/components/sections/DiagnosticProgram";
import Methodology from "@/components/sections/Methodology";
import Dashboard from "@/components/sections/Dashboard";
import CaseStudies from "@/components/sections/CaseStudies";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen dark:bg-surface-900 bg-surface-50 transition-colors duration-300">
      <Navigation />
      <Hero />
      <Problem />
      <Dashboard />
      <Philosophy />
      <Services />
      <CaseStudies />
      <Methodology />
      <DiagnosticTool />
      <DiagnosticProgram />
      <FinalCTA />
      <Footer />
    </main>
  );
}
