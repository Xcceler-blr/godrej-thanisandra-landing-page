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

export const LocationSection = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const locationAdvantages = [
    {
      category: "Connectivity",
      icon: Route,
      color: "from-primary to-primary/80",
      items: [
        { icon: Car, name: "Outer Ring Road", distance: "2 km", desc: "Direct connectivity to IT hubs" },
        { icon: Train, name: "Yelahanka Railway Station", distance: "8 km", desc: "Main line railway connectivity" },
        { icon: Plane, name: "Kempegowda Airport", distance: "25 km", desc: "International airport access" },
        { icon: Car, name: "Bellary Road", distance: "3 km", desc: "Major arterial road" }
      ]
    },
    {
      category: "IT & Business Hubs",
      icon: Building,
      color: "from-secondary to-secondary/80",
      items: [
        { icon: Building, name: "Manyata Tech Park", distance: "12 km", desc: "Major IT hub" },
        { icon: Building, name: "Embassy Tech Village", distance: "15 km", desc: "Premium business district" },
        { icon: Building, name: "Bagmane Tech Park", distance: "18 km", desc: "IT and biotech companies" },
        { icon: Building, name: "ITPL Whitefield", distance: "20 km", desc: "Technology corridor" }
      ]
    },
    {
      category: "Education & Healthcare",
      icon: GraduationCap,
      color: "from-accent to-accent/80",
      items: [
        { icon: GraduationCap, name: "Canadian International School", distance: "5 km", desc: "Premium international school" },
        { icon: Hospital, name: "Columbia Asia Hospital", distance: "4 km", desc: "Multi-specialty hospital" },
        { icon: GraduationCap, name: "Ryan International School", distance: "6 km", desc: "Reputed educational institution" },
        { icon: Hospital, name: "Manipal Hospital", distance: "8 km", desc: "Advanced healthcare facility" }
      ]
    },
    {
      category: "Lifestyle & Recreation",
      icon: Coffee,
      color: "from-tertiary to-tertiary/80",
      items: [
        { icon: ShoppingBag, name: "Phoenix MarketCity", distance: "10 km", desc: "Premium shopping mall" },
        { icon: TreePine, name: "Lumbini Gardens", distance: "7 km", desc: "Popular recreation park" },
        { icon: Coffee, name: "Forum Neighbourhood Mall", distance: "8 km", desc: "Local shopping & dining" },
        { icon: ShoppingBag, name: "Orion Mall", distance: "12 km", desc: "Entertainment & shopping" }
      ]
    }
  ];

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-secondary/5 to-primary/10">
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

          {/* Location Map */}
          <div className="mb-16">
            <Card className="overflow-hidden shadow-2xl">
              <CardContent className="p-0">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                    alt="Location Map"
                    className="w-full h-[400px] object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="text-center text-white">
                      <MapPin className="h-12 w-12 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold mb-2">Prime North Bangalore Location</h3>
                      <p className="text-lg">Thanisandra, Near Outer Ring Road</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Location Advantages by Category */}
          <div className="space-y-16">
            {locationAdvantages.map((category, categoryIndex) => {
              const CategoryIcon = category.icon;
              return (
                <div key={categoryIndex}>
                  <div className="text-center mb-8">
                    <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <CategoryIcon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">
                      {category.category}
                    </h3>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {category.items.map((item, index) => {
                      const ItemIcon = item.icon;
                      return (
                        <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                <ItemIcon className="h-6 w-6 text-white" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-bold text-sm">{item.name}</h4>
                                  <Badge variant="outline" className="text-xs">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {item.distance}
                                  </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground">{item.desc}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
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
                variant="cta" 
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