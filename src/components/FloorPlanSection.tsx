import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "./ContactForm";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, Maximize, Download, Eye } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const FloorPlanSection = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { ref, isVisible } = useScrollAnimation();

  const floorPlanTiles = [
    {
      type: "2BHK - 1190sqft",
      image: "/Assets/godrej-2bhk%20.png"
    },
    {
      type: "2BHK - 1240sqft",
      image: "/Assets/godrej-2bhk2.png"
    },
    {
      type: "3BHK - 1800 sqft",
      image: "/Assets/godrej-3bhk%20.png"
    }
  ];

  return (
    <>
      <section ref={ref} className={`pt-16 pb-16 bg-[#F6F7F9] overflow-x-hidden transition-opacity duration-700 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <div className="max-w-6xl mx-auto px-2 sm:px-4">
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

          {/* Floor Plan Tiles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {floorPlanTiles.map((plan, idx) => {
              let price = "";
              if (plan.type.startsWith("2BHK")) price = "1.53 Cr* ONWARDS";
              else if (plan.type.startsWith("3BHK")) price = "1.93Cr* ONWARDS";
              else if (plan.type.startsWith("4BHK")) price = "2.23Cr* ONWARDS";
              return (
                <div key={plan.type} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col relative w-full max-w-xs sm:max-w-sm min-w-0 mx-auto transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                  <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-white text-xs font-semibold z-10" style={{background: '#B9105E'}}>{price}</span>
                  <img src={plan.image} alt={plan.type} className="w-full h-56 object-cover" />
                  <div className="p-6 flex-1 flex flex-col justify-between min-w-0">
                    <h3 className="text-xl font-bold mb-4 text-primary break-words">{plan.type}</h3>
                    <Button 
                      variant="default" 
                      className="w-full gap-2 mt-auto"
                      onClick={() => setIsFormOpen(true)}
                    >
                      Know more about floor plan
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Floor Plan Highlights */}
        </div>
      </section>
      <ContactForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)}
        title="Floor Plan - Download Floor Plans"
      />
    </>
  );
};