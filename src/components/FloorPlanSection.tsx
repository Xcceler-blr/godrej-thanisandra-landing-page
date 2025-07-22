import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "./ContactForm";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, Maximize, Download, Eye } from "lucide-react";

export const FloorPlanSection = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const floorPlans = [
    {
      type: "2 BHK",
      area: "1,180 - 1,350 sq.ft",
      image: "https://images.unsplash.com/photo-1460574283810-2aab119d8511?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: [
        "2 Bedrooms with attached bathrooms",
        "Spacious living & dining area",
        "Modern kitchen with utility",
        "Balcony with garden view",
        "Foyer area",
        "Ample storage space"
      ]
    },
    {
      type: "3 BHK",
      area: "1,580 - 1,750 sq.ft",
      image: "https://images.unsplash.com/photo-1439337153520-7082a56a81f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: [
        "3 Bedrooms with attached bathrooms",
        "Master bedroom with walk-in closet",
        "Large living & dining area",
        "Modular kitchen with breakfast counter",
        "2 Balconies",
        "Servant room with bathroom",
        "Study area",
        "Premium fittings"
      ]
    },
    {
      type: "4 BHK",
      area: "2,180 - 2,450 sq.ft",
      image: "https://images.unsplash.com/photo-1497604401993-f2e922e5cb0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: [
        "4 Bedrooms with attached bathrooms",
        "Master suite with walk-in closet",
        "Grand living & dining area",
        "Premium modular kitchen",
        "3 Balconies",
        "Servant room with bathroom",
        "Home office space",
        "Powder room",
        "Multiple storage areas",
        "Luxury fittings & fixtures"
      ]
    }
  ];

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-accent/5 to-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              Floor Plans
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="text-primary">Godrej Thanisandra</span>
              <br />Floor Plans
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Explore our thoughtfully designed floor plans that maximize space utilization 
              while ensuring optimal ventilation and natural light in every home.
            </p>
          </div>

          <Tabs defaultValue="2bhk" className="space-y-8">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
              <TabsTrigger value="2bhk">2 BHK</TabsTrigger>
              <TabsTrigger value="3bhk">3 BHK</TabsTrigger>
              <TabsTrigger value="4bhk">4 BHK</TabsTrigger>
            </TabsList>

            {floorPlans.map((plan, index) => (
              <TabsContent key={index} value={`${plan.type.toLowerCase().replace(' ', '')}`}>
                <Card className="overflow-hidden shadow-2xl">
                  <CardHeader className="bg-gradient-to-r from-primary to-secondary text-white">
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Home className="h-6 w-6" />
                        <span>{plan.type} Floor Plan</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Maximize className="h-4 w-4" />
                        <span>{plan.area}</span>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="p-0">
                    <div className="grid lg:grid-cols-2">
                      <div className="relative">
                        <img 
                          src={plan.image}
                          alt={`${plan.type} Floor Plan`}
                          className="w-full h-[400px] lg:h-[500px] object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <Button 
                            variant="secondary" 
                            size="lg"
                            className="gap-2"
                            onClick={() => setIsFormOpen(true)}
                          >
                            <Eye className="h-5 w-5" />
                            View Detailed Plan
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-8 space-y-6">
                        <h3 className="text-2xl font-bold">
                          {plan.type} Apartment Features
                        </h3>
                        
                        <div className="space-y-3">
                          {plan.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-muted-foreground">{feature}</span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="pt-4 space-y-3">
                          <Button 
                            variant="cta" 
                            className="w-full gap-2"
                            onClick={() => setIsFormOpen(true)}
                          >
                            <Download className="h-4 w-4" />
                            Download {plan.type} Floor Plan
                          </Button>
                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={() => setIsFormOpen(true)}
                          >
                            Schedule Site Visit
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>

          {/* Floor Plan Highlights */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-muted/50 rounded-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Optimized Layouts</h3>
              <p className="text-muted-foreground text-sm">
                Thoughtfully designed layouts that maximize space utilization and natural light
              </p>
            </div>
            
            <div className="text-center p-6 bg-muted/50 rounded-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Maximize className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Spacious Interiors</h3>
              <p className="text-muted-foreground text-sm">
                Large rooms with high ceilings and cross-ventilation for comfortable living
              </p>
            </div>
            
            <div className="text-center p-6 bg-muted/50 rounded-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-tertiary rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Modern Design</h3>
              <p className="text-muted-foreground text-sm">
                Contemporary architectural design with premium finishes and fittings
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <ContactForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)}
        title="Download Floor Plans"
      />
    </>
  );
};