import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "./ContactForm";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MapPin, 
  Plane, 
  Train, 
  Car, 
  GraduationCap, 
  ShoppingBag, 
  Building, 
  Hospital,
  Coffee,
  TreePine,
  Clock,
  Route
} from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export const LocationSection = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const locations = [
    { icon: MapPin, title: "New Airport Road (Reva College)", desc: "Prime location with excellent connectivity" },
    { icon: Building, title: "Manyata Tech Park", desc: "10 min drive" },
    { icon: Car, title: "Hebbal Junction", desc: "15 min drive via ORR" },
    { icon: Plane, title: "Kempegowda International Airport", desc: "25–30 min drive" },
    { icon: Car, title: "Outer Ring Road", desc: "Access within minutes" },
    { icon: Train, title: "Thanisandra Railway Station", desc: "5 min away" },
    { icon: ShoppingBag, title: "Supers & Local Markets", desc: "Walkable distance" },
    { icon: GraduationCap, title: "Vidyashilp Academy & Stonehill Intl", desc: "10–15 min" },
    { icon: Hospital, title: "Columbia Asia & Aster CMI Hospitals", desc: "10–15 min" },
    { icon: ShoppingBag, title: "Phoenix Market City & Orion Mall", desc: "20 km" },
    { icon: Car, title: "Whitefield", desc: "Quick access, 20 km" },
    { icon: MapPin, title: "Nagawara & Kammanahalli", desc: "5–10 min" },
    { icon: Train, title: "Future Metro", desc: "Upcoming connectivity" },
    { icon: Building, title: "BCM Vertex (2.3 Km)", desc: "10 min drive" }
  ];

  return (
    <>
      <section className="py-12 bg-gradient-to-br from-secondary/5 to-primary/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              Strategic Location
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Location Advantages of
              <br /><span className="text-primary">Godrej Thanisandra</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Strategically located in the heart of North Bangalore, Godrej Thanisandra 
              offers unparalleled connectivity to major IT hubs, educational institutions, 
              and lifestyle destinations.
            </p>
          </div>

          {/* Location Advantages Tiles Grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16">
            {locations.map((loc, idx) => {
              const Icon = loc.icon;
              const iconColor = idx % 2 === 0 ? '#3777C5' : '#B9105E';
              const controls = useAnimation();
              const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
              if (inView) controls.start({ opacity: 1, y: 0, scale: 1 });
              return (
                <motion.div
                  key={idx}
                  ref={ref}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  animate={controls}
                  transition={{ duration: 0.6, delay: idx * 0.08, type: "spring", bounce: 0.2 }}
                  className="flex items-start gap-4 bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-full" style={{background: iconColor}}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base mb-1 text-primary">{loc.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{loc.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Location Benefits Summary */}
          <div className="mt-16 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-3xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Why <span className="text-primary">Thanisandra</span> is the Perfect Choice
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Thanisandra represents the perfect balance of urban convenience and peaceful living, 
                making it one of North Bangalore's most sought-after residential destinations.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 bg-background rounded-xl shadow-sm">
                <div className="text-2xl font-bold text-primary mb-2">25 min</div>
                <div className="text-sm text-muted-foreground">To Airport</div>
              </div>
              <div className="text-center p-6 bg-background rounded-xl shadow-sm">
                <div className="text-2xl font-bold text-secondary mb-2">15 min</div>
                <div className="text-sm text-muted-foreground">To IT Hubs</div>
              </div>
              <div className="text-center p-6 bg-background rounded-xl shadow-sm">
                <div className="text-2xl font-bold text-accent mb-2">5 min</div>
                <div className="text-sm text-muted-foreground">To Schools & Hospitals</div>
              </div>
            </div>
            
            <div className="text-center">
              <Button 
                variant="default" 
                size="lg"
                onClick={() => setIsFormOpen(true)}
              >
                <MapPin className="h-5 w-5 mr-2" />
                Explore Location Benefits
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <ContactForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)}
        title="Learn More About Location"
      />
    </>
  );
};