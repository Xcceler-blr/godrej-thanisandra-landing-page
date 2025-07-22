import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ProjectHighlights } from "@/components/ProjectHighlights";
import { PricingSection } from "@/components/PricingSection";
import { MasterPlanSection } from "@/components/MasterPlanSection";
import { AmenitiesSection } from "@/components/AmenitiesSection";
import { FloorPlanSection } from "@/components/FloorPlanSection";
import { GallerySection } from "@/components/GallerySection";
import { LocationSection } from "@/components/LocationSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <ProjectHighlights />
      <PricingSection />
      <MasterPlanSection />
      <AmenitiesSection />
      <FloorPlanSection />
      <GallerySection />
      <LocationSection />
    </div>
  );
};

export default Index;
