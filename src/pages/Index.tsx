import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ProjectHighlights } from "@/components/ProjectHighlights";
import { MasterPlanSection } from "@/components/MasterPlanSection";
import { AmenitiesSection } from "@/components/AmenitiesSection";
import { FloorPlanSection } from "@/components/FloorPlanSection";
import { LocationSection } from "@/components/LocationSection";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "Premium Apartments at Godrej Properties Thanisandra Bangalore";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Godrej Properties Thanisandra presents luxurious residential apartments in Bangalore's growing corridor. Modern amenities, strategic location & trusted brand.");
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = "Godrej Properties Thanisandra presents luxurious residential apartments in Bangalore's growing corridor. Modern amenities, strategic location & trusted brand.";
      document.head.appendChild(meta);
    }
  }, []);
  return (
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
  );
};

export default Index;
