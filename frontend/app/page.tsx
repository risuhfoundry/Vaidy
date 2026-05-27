import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import UploadPreview from "@/components/UploadPreview";
import ExplainDemo from "@/components/ExplainDemo";
import HealthTimeline from "@/components/HealthTimeline";
import FeatureCards from "@/components/FeatureCards";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-bg-void text-white">
      <Navbar />
      <Hero />
      <UploadPreview />
      <ExplainDemo />
      <HealthTimeline />
      <FeatureCards />
      <FinalCTA />
      <Footer />
    </main>
  );
}
