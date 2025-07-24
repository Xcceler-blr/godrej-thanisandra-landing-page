import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "./ContactForm";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Waves, 
  Dumbbell, 
  Car, 
  TreePine, 
  Gamepad2, 
  Shield, 
  Zap, 
  Wifi,
  Baby,
  BookOpen,
  Coffee,
  Bike,
  Camera,
  Clock,
  Home,
  Users
} from "lucide-react";

export const AmenitiesSection = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const amenities = [
    {
      name: "CLUB HOUSE",
      image: "/Assets/Amenities/CLUB-HOUSE.png",
      desc: "Premium club house for recreation and gatherings."
    },
    {
      name: "MINI THEATRE",
      image: "/Assets/Amenities/MINI-THEATRE.png",
      desc: "Enjoy movies and events in a private mini theatre."
    },
    {
      name: "LOTUS POND",
      image: "/Assets/Amenities/MINI-THEATRE (1).png",
      desc: "Serene lotus pond for relaxation and scenic beauty."
    },
    {
      name: "BADMINTON COURT",
      image: "/Assets/Amenities/BADMINTON-COURT.png",
      desc: "Indoor badminton court for sports enthusiasts."
    },
    {
      name: "BUSINESS CENTRE",
      image: "/Assets/Amenities/BUSINESS-CENTRE.png",
      desc: "Modern business centre for meetings and work."
    },
    {
      name: "SWIMMING POOL",
      image: "/Assets/Amenities/SWIMMING POOL SPA & SAUNA.png",
      desc: "Large swimming pool for leisure and fitness."
    },
    {
      name: "SPA & SAUNA",
      image: "/Assets/Amenities/_SPA & SAUNA.png",
      desc: "Relax and rejuvenate at the spa and sauna."
    },
    {
      name: "YOGA & MEDITATION DECK",
      image: "/Assets/Amenities/YOGA & MEDITATION DECK.png",
      desc: "Dedicated deck for yoga and meditation."
    },
    {
      name: "RESTAURANT",
      image: "/Assets/Amenities/RESTAURANT.png",
      desc: "On-site restaurant for fine dining."
    },
    {
      name: "GYM",
      image: "/Assets/Amenities/gym.png",
      desc: "State-of-the-art gym for your fitness needs."
    }
  ];

  return (
    <>
      <section className="py-12 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              Premium Amenities
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="text-primary">Godrej Thanisandra</span>
              <br />Amenities
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Experience a lifestyle of luxury with our comprehensive range of world-class 
              amenities designed for your comfort, convenience, and well-being.
            </p>
          </div>

          <div className="space-y-12">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {amenities.map((amenity, index) => (
                <div key={index} className="relative rounded-2xl shadow-xl overflow-hidden group h-48 flex items-end hover:shadow-2xl transition-all duration-300">
                  <img src={amenity.image} alt={amenity.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/70 via-black/10 to-transparent">
                    <h4 className="font-bold text-lg text-white drop-shadow-md">{amenity.name}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Amenities Highlight */}
          <div className="mt-16 bg-gradient-to-r from-primary via-secondary to-accent rounded-3xl p-8 md:p-12 text-white text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              45+ World-Class Amenities
            </h3>
            <p className="text-lg mb-6 text-white/90 max-w-2xl mx-auto">
              From fitness and recreation to safety and convenience, 
              every amenity is designed to enhance your living experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="default" 
                size="lg"
                className="text-white"
                style={{background: '#B9105E', border: 'none'}}
                onMouseOver={e => { e.currentTarget.style.background = '#B9105E'; e.currentTarget.style.color = '#fff'; }}
                onMouseOut={e => { e.currentTarget.style.background = '#B9105E'; e.currentTarget.style.color = '#fff'; }}
                onClick={() => setIsFormOpen(true)}
              >
                Schedule Amenities Tour
              </Button>
            </div>
          </div>

          {/* Amenities Stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">45+</div>
              <div className="text-sm text-muted-foreground">Premium Amenities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary mb-2">80%</div>
              <div className="text-sm text-muted-foreground">Green Spaces</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Security & Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-tertiary mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Power Backup</div>
            </div>
          </div>
        </div>
      </section>
      
      <ContactForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)}
        title="Amenities - Schedule Amenities Tour"
      />
    </>
  );
};