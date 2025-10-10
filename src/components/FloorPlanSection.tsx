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
      type: "2BHK - 1193sqft",
      image: "/Assets/godrej-2bhk%20.png"
    },
    {
      type: "2BHK - 1242sqft",
      image: "/Assets/godrej-2bhk2.png"
    },
    {
      type: "3BHK Premium - 1800 sqft",
      image: "/Assets/godrej-3bhk%20.png"
    },
    {
      type: "3BHK LUX - 2185 sqft",
      image: "/Assets/3bhk-lux.png"
      
    },
    {
      type: "3BHK LUX - 2305 sqft",
      image: "/Assets/3bhk-lux-(1).png"

    }
  ];

  return (
    <>
      <section id="floor-plan" ref={ref} className={`pt-16 pb-16 bg-[#F6F7F9] overflow-x-hidden transition-opacity duration-700 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <div className="max-w-6xl mx-auto px-2 sm:px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="text-primary">Godrej Thanisandra Bangalore</span>
              <br />Floor Plans
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Explore our thoughtfully designed floor plans that maximize space utilization 
              while ensuring optimal ventilation and natural light in every home.
            </p>
          </div>

          {/* Floor Plan Tiles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {floorPlanTiles.slice(0, 3).map((plan, idx) => {
              let price = "";
              if (plan.type.startsWith("2BHK")) price = "1.62 Cr* ONWARDS";
              else if (plan.type.includes("3BHK LUX - 2305")) price = "3.2 cr onwards";
              else if (plan.type.startsWith("3BHK LUX")) price = "₹3 Cr onwards";
              else if (plan.type.startsWith("3BHK")) price = "2.52Cr* ONWARDS";
              else if (plan.type.startsWith("4BHK")) price = "2.52Cr* ONWARDS";
              return (
                <div key={plan.type} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col relative w-full max-w-xs sm:max-w-sm min-w-0 mx-auto transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                  <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-white text-xs font-semibold z-10" style={{background: '#B9105E'}}>{price}</span>
                  <img src={plan.image} alt={plan.type} className="w-full h-56 object-cover floor-plan-image" width="500" height="400" loading="lazy" />
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
            <div className="col-span-1 sm:col-span-2 md:col-span-3 mt-10">
              <div className="flex justify-center gap-6 flex-wrap">
                {floorPlanTiles.slice(3).map((plan) => {
                  let price = "";
                  if (plan.type.startsWith("2BHK")) price = "1.62 Cr* ONWARDS";
                  else if (plan.type.includes("3BHK LUX - 2305")) price = "3.2 cr onwards";
                  else if (plan.type.startsWith("3BHK LUX")) price = "₹3 Cr onwards";
                  else if (plan.type.startsWith("3BHK")) price = "2.52Cr* ONWARDS";
                  else if (plan.type.startsWith("4BHK")) price = "2.52Cr* ONWARDS";
                  return (
                    <div key={plan.type} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col relative w-full max-w-xs sm:max-w-sm min-w-0 transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                      <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-white text-xs font-semibold z-10" style={{background: '#B9105E'}}>{price}</span>
                      <img src={plan.image} alt={plan.type} className="w-full h-56 object-cover floor-plan-image" width="500" height="400" loading="lazy" />
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
            </div>
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