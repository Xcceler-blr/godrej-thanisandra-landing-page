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

export const ProjectHighlights = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const highlights = [
    {
      icon: MapPin,
      title: "Prime Location",
      description: "Strategic location in North Bangalore with excellent connectivity to IT hubs",
      color: "text-primary"
    },
    {
      icon: Car,
      title: "Connectivity",
      description: "Easy access to Outer Ring Road, Bellary Road, and major IT corridors",
      color: "text-secondary"
    },
    {
      icon: Trees,
      title: "Green Living",
      description: "80% open spaces with landscaped gardens and tree-lined walkways",
      color: "text-primary"
    },
    {
      icon: Shield,
      title: "Security",
      description: "24/7 security with CCTV surveillance and controlled access",
      color: "text-accent"
    },
    {
      icon: Wifi,
      title: "Smart Homes",
      description: "Pre-wired apartments with smart home automation features",
      color: "text-tertiary"
    },
    {
      icon: Zap,
      title: "Power Backup",
      description: "100% power backup for all common areas and apartments",
      color: "text-secondary"
    },
    {
      icon: Waves,
      title: "Water Features",
      description: "Swimming pool, water bodies, and efficient water management system",
      color: "text-accent"
    },
    {
      icon: Dumbbell,
      title: "Fitness",
      description: "State-of-the-art gymnasium and multiple sports facilities",
      color: "text-primary"
    },
    {
      icon: GraduationCap,
      title: "Education",
      description: "Close proximity to renowned schools and educational institutions",
      color: "text-tertiary"
    },
    {
      icon: ShoppingBag,
      title: "Retail",
      description: "Near shopping malls, supermarkets, and entertainment centers",
      color: "text-secondary"
    }
  ];

  return (
    <>
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              Project Features
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="text-primary">Godrej Thanisandra</span>
              <br />Project Highlights
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Discover the exceptional features that make Godrej Thanisandra the perfect choice 
              for your dream home in North Bangalore.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {highlights.map((highlight, index) => {
              const IconComponent = highlight.icon;
              return (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <IconComponent className={`h-6 w-6 ${highlight.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2">{highlight.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {highlight.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
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
                className="border-white text-white hover:bg-white hover:text-primary"
                onClick={() => setIsFormOpen(true)}
              >
                Schedule Site Visit
              </Button>
              <Button 
                variant="secondary" 
                size="lg"
                onClick={() => setIsFormOpen(true)}
              >
                Get Project Details
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <ContactForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)}
        title="Get Project Highlights"
      />
    </>
  );
};