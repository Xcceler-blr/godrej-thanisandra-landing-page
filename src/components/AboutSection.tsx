import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "./ContactForm";
import { Badge } from "@/components/ui/badge";
import { Building, Award, Users, Calendar } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const AboutSection = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { ref, isVisible } = useScrollAnimation();

  const achievements = [
    { icon: Building, label: "125+ Years", desc: "of Trust & Excellence" },
    { icon: Award, label: "Awards", desc: "Multiple Industry Awards" },
    { icon: Users, label: "100K+", desc: "Happy Families" },
    { icon: Calendar, label: "Legacy", desc: "Since 1897" }
  ];

  return (
    <>
      <section ref={ref} className={`pt-16 pb-16 bg-[#F7F8FA] transition-opacity duration-700 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              About <span className="text-primary">Godrej Thanisandra</span>
              <br />North Bangalore
            </h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
            Welcome to Godrej Properties Thanisandra, a pre-launch premium residential development in the heart of North Bangalore. Spanning an expansive 7-acre low-density community, the project is thoughtfully designed to offer the perfect balance of smart architecture, green living, and modern conveniences. 
            </p>
          </div>

          <div className="mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
              Luxury Living Refined
            </h3>
            
            <div className="grid md:grid-cols-2 gap-10 max-w-7xl mx-auto">
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <img 
                    src="/Assets/Aboutus-icons/1.svg" 
                    alt="7-Acre Community" 
                    className="w-[72px] h-[64px] md:w-[90px] md:h-[80px] object-contain flex-shrink-0 rounded-[7px] border border-black bg-[#fffff0]"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="font-bold text-[20px] md:text-[24px] mb-1">7-Acre Low-Density Community</h4>
                    <p className="text-muted-foreground text-[13px] md:text-[15px]">Spread across 7 acres of green, low-density development.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <img 
                    src="/Assets/Aboutus-icons/2.svg" 
                    alt="558 Premium Residences" 
                    className="w-[72px] h-[64px] md:w-[90px] md:h-[80px] object-contain flex-shrink-0 rounded-[7px] border border-black bg-[#fffff0]"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="font-bold text-[20px] md:text-[24px] mb-1">558 Premium Residences</h4>
                    <p className="text-muted-foreground text-[13px] md:text-[15px]">Exclusive community with 558+ premium residences</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <img 
                    src="/Assets/Aboutus-icons/3.svg" 
                    alt="2 & 3 BHK Luxury Homes" 
                    className="w-[72px] h-[64px] md:w-[90px] md:h-[80px] object-contain flex-shrink-0 rounded-[7px] border border-black bg-[#fffff0]"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="font-bold text-[20px] md:text-[24px] mb-1">2 & 3 BHK Luxury Homes</h4>
                    <p className="text-muted-foreground text-[13px] md:text-[15px]">Luxuriously crafted 2 & 3 BHK residences starting at ₹1.62 Cr</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <img 
                    src="/Assets/Aboutus-icons/4.svg" 
                    alt="Intelligent Design" 
                    className="w-[72px] h-[64px] md:w-[90px] md:h-[80px] object-contain flex-shrink-0 rounded-[7px] border border-black bg-[#fffff0]"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="font-bold text-[20px] md:text-[24px] mb-1">Intelligent Design & Spacious Layouts</h4>
                    <p className="text-muted-foreground text-[13px] md:text-[15px]">Spacious layouts designed for maximum natural light & ventilation.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <img 
                    src="/Assets/Aboutus-icons/5.svg" 
                    alt="Sustainable Living" 
                    className="w-[72px] h-[64px] md:w-[90px] md:h-[80px] object-contain flex-shrink-0 rounded-[7px] border border-black bg-[#fffff0]"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="font-bold text-[20px] md:text-[24px] mb-1">Sustainable Living</h4>
                    <p className="text-muted-foreground text-[13px] md:text-[15px]">Nature-themed landscaping & sustainable architecture</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <img 
                    src="/Assets/Aboutus-icons/6.svg" 
                    alt="Clubhouse & Lifestyle Amenities" 
                    className="w-[72px] h-[64px] md:w-[90px] md:h-[80px] object-contain flex-shrink-0 rounded-[7px] border border-black bg-[#fffff0]"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="font-bold text-[20px] md:text-[24px] mb-1">Clubhouse & Lifestyle Amenities</h4>
                    <p className="text-muted-foreground text-[13px] md:text-[15px]">Exclusive clubhouse with fitness, wellness & recreation zones.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <img 
                    src="/Assets/Aboutus-icons/7.svg" 
                    alt="Modern Tower Configurations" 
                    className="w-[72px] h-[64px] md:w-[90px] md:h-[80px] object-contain flex-shrink-0 rounded-[7px] border border-black bg-[#fffff0]"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="font-bold text-[20px] md:text-[24px] mb-1">Modern Tower Configurations</h4>
                    <p className="text-muted-foreground text-[13px] md:text-[15px]">2B + G + 13 floors across 10 architecturally designed towers</p>
                  </div>
                </div>
                {/* CTA as a separate list item to inherit the same column spacing */}
                <div>
                  <Button
                    variant="cta"
                    size="lg"
                    className="w-full h-[78px] text-[24px]"
                    onClick={() => setIsFormOpen(true)}
                    aria-label="Open enquiry form"
                  >
                    Speak to us
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-3xl p-4 md:p-6 shadow-xl">
            <div className="text-center mb-12">
              <h3 className="text-4xl md:text-5xl font-bold mb-4">
                The <span style={{ color: '#B9105E' }}>Godrej Legacy</span>
              </h3>
              <p className="text-muted-foreground max-w-3xl mx-auto">
              With Godrej Properties' trusted legacy, this landmark development combines world-class design with unmatched comfort — making it one of the most promising residential addresses in North Bangalore. 
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 w-full">
              {achievements.map((achievement, index) => {
                const IconComponent = achievement.icon;
                return (
                  <div key={index} className="flex flex-col items-center text-center min-w-[90px] max-w-[120px] flex-1">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform mb-2">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="font-bold text-base md:text-lg mb-1">{achievement.label}</h4>
                    <p className="text-xs md:text-sm text-muted-foreground">{achievement.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <ContactForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)}
        title="About - Learn More About Godrej Thanisandra"
      />
    </>
  );
};
