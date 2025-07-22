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
      category: "Recreation & Sports",
      color: "from-primary to-primary/80",
      items: [
        { icon: Waves, name: "Swimming Pool", desc: "Temperature controlled pool" },
        { icon: Dumbbell, name: "Fitness Center", desc: "Fully equipped gymnasium" },
        { icon: Gamepad2, name: "Indoor Games", desc: "Table tennis, carrom, chess" },
        { icon: Users, name: "Clubhouse", desc: "Multi-purpose community hall" }
      ]
    },
    {
      category: "Convenience & Safety",
      color: "from-secondary to-secondary/80",
      items: [
        { icon: Shield, name: "24/7 Security", desc: "CCTV & manned security" },
        { icon: Car, name: "Parking", desc: "Covered & visitor parking" },
        { icon: Zap, name: "Power Backup", desc: "100% backup for common areas" },
        { icon: Wifi, name: "High-Speed Internet", desc: "Fiber optic connectivity" }
      ]
    },
    {
      category: "Lifestyle & Wellness",
      color: "from-accent to-accent/80",
      items: [
        { icon: TreePine, name: "Landscaped Gardens", desc: "80% green spaces" },
        { icon: Baby, name: "Kids Play Area", desc: "Safe outdoor playground" },
        { icon: BookOpen, name: "Library", desc: "Reading room & study area" },
        { icon: Coffee, name: "Cafe", desc: "In-house coffee shop" }
      ]
    },
    {
      category: "Additional Services",
      color: "from-tertiary to-tertiary/80",
      items: [
        { icon: Bike, name: "Cycling Track", desc: "Dedicated cycling path" },
        { icon: Camera, name: "Photography Studio", desc: "Professional photo space" },
        { icon: Clock, name: "Maintenance", desc: "24/7 facility management" },
        { icon: Home, name: "Guest Rooms", desc: "Furnished guest accommodation" }
      ]
    }
  ];

  return (
    <>
      <section className="py-20 bg-muted/30">
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
            {amenities.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <div className="text-center mb-8">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    {category.category}
                  </h3>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {category.items.map((amenity, index) => {
                    const IconComponent = amenity.icon;
                    return (
                      <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                        <CardContent className="p-6 text-center">
                          <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                            <IconComponent className="h-8 w-8 text-white" />
                          </div>
                          <h4 className="font-bold text-lg mb-2">{amenity.name}</h4>
                          <p className="text-sm text-muted-foreground">{amenity.desc}</p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
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
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary"
                onClick={() => setIsFormOpen(true)}
              >
                View All Amenities
              </Button>
              <Button 
                variant="secondary" 
                size="lg"
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
        title="Learn More About Amenities"
      />
    </>
  );
};