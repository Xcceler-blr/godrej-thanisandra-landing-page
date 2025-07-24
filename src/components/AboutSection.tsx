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
      <section ref={ref} className={`pt-16 pb-16 bg-gradient-to-br from-muted/50 to-accent/10 transition-opacity duration-700 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              About Godrej
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              About <span className="text-primary">Godrej Thanisandra</span>
              <br />North Bangalore
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Godrej Properties brings you the finest residential experience in North Bangalore 
              with Godrej Thanisandra, a premium project that combines luxury, comfort, and convenience.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <img 
                src="/Assets/godrej-about-section%20.png"
                alt="Godrej Thanisandra Building"
                className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
              />
            </div>
            
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                Premium Living Redefined
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                Nestled in the rapidly developing Thanisandra region of North Bangalore, 
                Godrej Thanisandra offers meticulously planned 2 and 3 BHK apartments 
                designed for the modern family. With world-class amenities and strategic 
                connectivity to IT corridors, this project represents the perfect blend 
                of luxury and practicality.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-muted-foreground">Prime location in North Bangalore with excellent connectivity</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                  <p className="text-muted-foreground">Thoughtfully designed apartments with modern amenities</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                  <p className="text-muted-foreground">Close proximity to schools, hospitals, and shopping centers</p>
                </div>
              </div>
              
              <Button
                variant="cta" 
                size="lg"
                onClick={() => setIsFormOpen(true)}
                className="mt-6"
              >
                Learn More About Project
              </Button>
            </div>
          </div>

          {/* Godrej Legacy */}
          <div className="bg-card rounded-3xl p-4 md:p-6 shadow-xl">
            <div className="text-center mb-12">
              <h3 className="text-4xl md:text-5xl font-bold mb-4">
                The <span style={{ color: '#B9105E' }}>Godrej Legacy</span>
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                For over 125 years, Godrej has been synonymous with trust, quality, and innovation. 
                Our commitment to excellence continues with every project we undertake.
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