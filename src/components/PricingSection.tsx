import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "./ContactForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Home, Star, Crown } from "lucide-react";

export const PricingSection = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const pricingPlans = [
    {
      type: "2 BHK",
      icon: Home,
      area: "1,180 - 1,350 sq.ft",
      price: "₹85 Lakhs - ₹98 Lakhs",
      originalPrice: "₹92 Lakhs - ₹1.05 Cr",
      savings: "Save ₹7 Lakhs",
      features: [
        "2 Bedrooms + 2 Bathrooms",
        "Spacious Living & Dining",
        "Modern Kitchen",
        "Balcony with Garden View",
        "Premium Fittings",
        "Covered Parking"
      ],
      popular: false,
      gradient: "from-primary to-primary/80"
    },
    {
      type: "3 BHK",
      icon: Star,
      area: "1,580 - 1,750 sq.ft",
      price: "₹1.15 Cr - ₹1.32 Cr",
      originalPrice: "₹1.25 Cr - ₹1.45 Cr",
      savings: "Save ₹10 Lakhs",
      features: [
        "3 Bedrooms + 3 Bathrooms",
        "Spacious Living & Dining",
        "Modular Kitchen",
        "Master Bedroom with Walk-in Closet",
        "2 Balconies",
        "Premium Fittings & Fixtures",
        "Covered Parking"
      ],
      popular: true,
      gradient: "from-secondary to-secondary/80"
    },
    {
      type: "4 BHK",
      icon: Crown,
      area: "2,180 - 2,450 sq.ft",
      price: "₹1.65 Cr - ₹1.95 Cr",
      originalPrice: "₹1.80 Cr - ₹2.15 Cr",
      savings: "Save ₹15 Lakhs",
      features: [
        "4 Bedrooms + 4 Bathrooms",
        "Grand Living & Dining",
        "Premium Modular Kitchen",
        "Master Suite with Walk-in Closet",
        "3 Balconies",
        "Servant Room",
        "Luxury Fittings & Fixtures",
        "2 Covered Parking Spaces"
      ],
      popular: false,
      gradient: "from-accent to-accent/80"
    }
  ];

  return (
    <>
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              Pricing Plans
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="text-primary">Godrej Thanisandra</span> Price
              <br />2BHK • 3BHK • 4BHK
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Choose from our range of thoughtfully designed apartments with 
              attractive pricing and flexible payment plans.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {pricingPlans.map((plan, index) => {
              const IconComponent = plan.icon;
              return (
                <Card 
                  key={index} 
                  className={`relative overflow-hidden group hover:shadow-2xl transition-all duration-300 ${
                    plan.popular ? 'ring-2 ring-primary scale-105' : 'hover:scale-105'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary to-secondary text-white text-center py-2 text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  
                  <CardHeader className={`bg-gradient-to-r ${plan.gradient} text-white ${plan.popular ? 'pt-12' : 'pt-6'}`}>
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <IconComponent className="h-8 w-8" />
                      <CardTitle className="text-2xl">{plan.type}</CardTitle>
                    </div>
                    <div className="text-center">
                      <p className="text-white/90 mb-2">{plan.area}</p>
                      <div className="text-3xl font-bold mb-1">{plan.price}</div>
                      <div className="text-sm text-white/70 line-through mb-2">{plan.originalPrice}</div>
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                        {plan.savings}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-6">
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-3">
                          <Check className="h-5 w-5 text-primary flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      variant={plan.popular ? "cta" : "outline"} 
                      className="w-full"
                      onClick={() => setIsFormOpen(true)}
                    >
                      Get Price Details
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Payment Plans */}
          <div className="bg-muted/50 rounded-3xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Flexible <span className="text-primary">Payment Plans</span>
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We offer attractive payment plans and financing options to make your dream home affordable.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 bg-background rounded-xl shadow-sm">
                <div className="text-2xl font-bold text-primary mb-2">20%</div>
                <div className="text-sm text-muted-foreground">On Booking</div>
              </div>
              <div className="text-center p-6 bg-background rounded-xl shadow-sm">
                <div className="text-2xl font-bold text-secondary mb-2">60%</div>
                <div className="text-sm text-muted-foreground">During Construction</div>
              </div>
              <div className="text-center p-6 bg-background rounded-xl shadow-sm">
                <div className="text-2xl font-bold text-accent mb-2">20%</div>
                <div className="text-sm text-muted-foreground">On Possession</div>
              </div>
            </div>
            
            <div className="text-center">
              <Button 
                variant="cta" 
                size="lg"
                onClick={() => setIsFormOpen(true)}
              >
                Get Detailed Payment Plan
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <ContactForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)}
        title="Get Pricing & Payment Details"
      />
    </>
  );
};