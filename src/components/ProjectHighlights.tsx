import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "./ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Car, 
  Wifi, 
  Shield, 
  Trees, 
  Zap, 
  Waves, 
  Dumbbell,
  GraduationCap,
  ShoppingBag
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const ProjectHighlights = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { ref, isVisible } = useScrollAnimation();

  const highlights = [
    {
      title: "Expansive 7-Acre Low-Density Community",
      description: "A thoughtfully designed premium enclave with just 558 residences, ensuring abundant open spaces and enhanced privacy.",
      image: "/Assets/Project-Highlights/Godrej%20-%20Expansive%207-Acre.png"
    },
    {
      title: "Well-Planned 2BHK & 3BHK Homes",
      description: "Generously sized residences featuring large balconies, crafted to offer exceptional comfort, modern amenities, and a prime address near Reva College in North Bangalore.",
      image: "/Assets/Project-Highlights/Godrej%20-%202bhk%203bhk.png"
    },
    {
      title: "Strategic North Bangalore Location",
      description: "Situated in a thriving growth corridor that perfectly blends the vibrancy of city life with the tranquility of suburban living.",
      image: "/Assets/Project-Highlights/Godrej%20-%20Strategic%20North%20Bangalore.png"
    },
    {
      title: "Versatile Floor Plans",
      description: "Luxury 2 BHK and 3 BHK layouts tailored to suit a variety of family lifestyles and requirements.",
      image: "/Assets/Project-Highlights/Godrej%20-%20Versatile%20Floor%20Plans.png"
    },
    {
      title: "Smart, Spacious Design",
      description: "Homes emphasize natural ventilation and daylight, seamlessly blending functionality with comfort.",
      image: "/Assets/Project-Highlights/Godrej%20-%20Smart,%20Spacious%20Design.png"
    },
    {
      title: "Modern Architecture with a Green Touch",
      description: "Contemporary design highlighted by landscaped terraces, merging aesthetics with sustainability.",
      image: "/Assets/Project-Highlights/Godrej%20-%20Modern%20Architecture%20with%20a%20Green%20Touch.png"
    },
    {
      title: "On-Site Commercial Amenities",
      description: "Integrated retail and convenience spaces within the development, offering everyday essentials at your doorstep.",
      image: "/Assets/Project-Highlights/Godrej%20-%20On-Site%20Commercial%20Amenities.png"
    }
  ];

  return (
    <>
      <section ref={ref} className={`pt-16 pb-16 bg-[#F9F6F3] transition-opacity duration-700 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="text-primary">Godrej Thanisandra</span>
              <br />Project Highlights
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Discover the exceptional features that make Godrej Thanisandra the perfect choice 
              for your dream home in North Bangalore.
            </p>
          </div>

          {/* Modern Timeline Highlights Layout */}
          <style>{`
            @keyframes timeline-shimmer {
              0% { background-position: 0% 0%; }
              100% { background-position: 0% 100%; }
            }
            .timeline-animated-line {
              background: linear-gradient(to bottom, #a5b4fc 0%, #f472b6 100%);
              background-size: 100% 200%;
              animation: timeline-shimmer 2s linear infinite alternate;
            }
            .timeline-node-animate {
              animation: timeline-node-pulse 1.2s cubic-bezier(0.4,0,0.2,1) both;
            }
            @keyframes timeline-node-pulse {
              0% { transform: scale(0.7); opacity: 0; }
              60% { transform: scale(1.15); opacity: 1; }
              100% { transform: scale(1); opacity: 1; }
            }
            .timeline-node-border-animate {
              position: relative;
              z-index: 10;
            }
            .timeline-node-border-animate::before {
              content: '';
              position: absolute;
              inset: -4px;
              border-radius: 9999px;
              background: conic-gradient(from 0deg, #B9105E, #3777C5, #56A7E0, #B9105E 100%);
              z-index: -1;
              animation: border-spin 2.5s linear infinite;
            }
            @keyframes border-spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
          <div className="relative max-w-3xl mx-auto mb-12">
            {/* Vertical line for timeline */}
            <div className="absolute left-8 top-0 bottom-0 w-1 rounded-full z-0 timeline-animated-line" />
            <div className="flex flex-col gap-12">
              {highlights.map((highlight, index) => (
                <div key={index} className="relative flex flex-col md:flex-row items-start md:items-center gap-6 z-10">
                  {/* Timeline dot */}
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg z-10 border-4 border-white timeline-node-animate timeline-node-border-animate">
                    <img src={highlight.image} alt={highlight.title} className="w-14 h-14 object-cover rounded-full highlight-image" width="56" height="56" loading="lazy" />
                  </div>
                  <div className="flex-1 bg-white rounded-2xl shadow-md p-6 md:ml-4">
                    <h3 className="text-lg md:text-xl font-bold text-primary mb-2">{highlight.title}</h3>
                    <p className="text-muted-foreground text-base leading-relaxed">{highlight.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 md:p-12 text-white text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Experience Premium Living?
            </h3>
            <p className="text-lg mb-6 text-white/90 max-w-2xl mx-auto">
              Don't miss out on this opportunity to own your dream home in one of 
              Bangalore's most sought-after locations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white" 
                style={{background: '#B9105E', border: 'none'}}
                onMouseOver={e => { e.currentTarget.style.background = '#B9105E'; e.currentTarget.style.color = '#fff'; }}
                onMouseOut={e => { e.currentTarget.style.background = '#B9105E'; e.currentTarget.style.color = '#fff'; }}
                onClick={() => setIsFormOpen(true)}
              >
                Schedule Site Visit
              </Button>
            </div>
          </div>
        </div>
      </section>
      <ContactForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)}
        title="Project Highlights - Schedule Site Visit"
      />
    </>
  );
};