import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ProjectHighlights } from "@/components/ProjectHighlights";
import { MasterPlanSectionDirect } from "@/components/MasterPlanSectionDirect";
import { AmenitiesSection } from "@/components/AmenitiesSection";
import { FloorPlanSectionDirect } from "@/components/FloorPlanSectionDirect";
import { LocationSection } from "@/components/LocationSection";
import { FAQSection } from "@/components/FAQSection";
import Footer from "@/components/Footer";
import SEOMetaTags from "@/components/SEOMetaTags";

const GodrejWoods = () => {
    return (
        <div className="min-h-screen">
            <SEOMetaTags
                title="Premium Apartments at Godrej Properties Thanisandra Bangalore"
                description="Godrej Properties Thanisandra presents luxurious residential apartments in Bangalore's growing corridor. Modern amenities, strategic location & trusted brand."
                canonical="https://www.godrejpropertiez.in/godrejwoods"
                ogTitle="Premium Apartments at Godrej Properties Thanisandra Bangalore"
                ogDescription="Discover luxury living at Godrej Thanisandra - Premium 2-3 BHK apartments in North Bangalore with world-class amenities starting from ₹1.53 Cr*"
                ogUrl="https://www.godrejpropertiez.in/godrejwoods"
            />
            <HeroSection />
            <AboutSection />
            <MasterPlanSectionDirect />
            <FloorPlanSectionDirect />
            <ProjectHighlights />
            <AmenitiesSection />
            <LocationSection />
            <FAQSection />
            <Footer />
        </div>
    );
};

export default GodrejWoods;
