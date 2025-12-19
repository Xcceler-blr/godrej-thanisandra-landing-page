import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "./ContactForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      image: "/Assets/Project-Highlights/thanisandra bangalore.webp"
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
      title: "Fabulous Clubhouse",
      description: "Whether you're hosting, relaxing or recharging, the clubhouse is sure to become your everyday escape. With elegant lounges, a fully equipped gym, wellness amenities and spaces that are perfect to rejuvenate you, a fabulous future is waiting to indulge you.",
      image: "/Assets/Project-Highlights/club house.webp"
    },
    // {
    //   title: "On-Site Commercial Amenities",
    //   description: "Integrated retail and convenience spaces within the development, offering everyday essentials at your doorstep.",
    //   image: "/Assets/Project-Highlights/commercial.webp"
    // }
  ];

  return (
    <>
      <section ref={ref} className={`pt-16 pb-16 bg-[#F9F6F3] transition-opacity duration-700 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="text-primary">Godrej Woods</span>
              <br />Project Highlights
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Discover the exceptional features that make Godrej Woods Thanisandra the perfect choice
              for your dream home in North Bangalore.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {highlights.map((highlight, index) => (
              <Card key={index} className="border-none shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                <CardHeader className="p-0">
                  <div className="h-48 overflow-hidden bg-secondary/10">
                    <img
                      src={highlight.image}
                      alt={highlight.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-xl font-bold text-primary mb-3 leading-tight">
                    {highlight.title}
                  </CardTitle>
                  <p className="text-muted-foreground leading-relaxed">
                    {highlight.description}
                  </p>
                </CardContent>
              </Card>
            ))}
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
                className="border-white text-white !text-[24px] !h-[68px]"
                style={{ background: '#B9105E', border: 'none' }}
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