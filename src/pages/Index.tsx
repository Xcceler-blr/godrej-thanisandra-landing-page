import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ProjectHighlights } from "@/components/ProjectHighlights";
import { MasterPlanSection } from "@/components/MasterPlanSection";
import { AmenitiesSection } from "@/components/AmenitiesSection";
import { FloorPlanSection } from "@/components/FloorPlanSection";
import { LocationSection } from "@/components/LocationSection";
import PrivacyPolicy from "./PrivacyPolicy";
import { Routes, Route } from "react-router-dom";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <Routes>
      <Route path="/" element={
        <div className="min-h-screen">
          <HeroSection />
          <AboutSection />
          <MasterPlanSection />
          <FloorPlanSection />
          <ProjectHighlights />
          <AmenitiesSection />
          <LocationSection />
          <Footer />
        </div>
      } />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    </Routes>
  );
};

export default Index;
