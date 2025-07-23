import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "./ContactForm";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, Maximize, Download, Eye } from "lucide-react";

export const FloorPlanSection = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const floorPlanTiles = [
    {
      type: "2BHK - 1190sqft",
      image: "https://images.unsplash.com/photo-1460574283810-2aab119d8511?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      type: "2BHK - 1240sqft",
      image: "https://images.unsplash.com/photo-1439337153520-7082a56a81f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      type: "3BHK - 1800 sqft",
      image: "https://images.unsplash.com/photo-1497604401993-f2e922e5cb0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      type: "4BHK - 2180 sqft",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      type: "4BHK - 2300 sqft",
      image: "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <>
      <section className="py-12 bg-gradient-to-br from-accent/5 to-muted/30 overflow-x-hidden">
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
                <div key={plan.type} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col relative w-full max-w-xs sm:max-w-sm min-w-0 mx-auto">
                  <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-white text-xs font-semibold z-10" style={{background: '#B9105E'}}>{price}</span>
                  <img src={plan.image} alt={plan.type} className="w-full h-56 object-cover" />
                  <div className="p-6 flex-1 flex flex-col justify-between min-w-0">
                    <h3 className="text-xl font-bold mb-4 text-primary break-words">{plan.type}</h3>
                    <Button 
                      variant="default" 
                      className="w-full gap-2 mt-auto"
                      onClick={() => setIsFormOpen(true)}
                    >
                      <Download className="h-4 w-4" />
                      Download Floor Plan
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
        title="Download Floor Plans"
      />
    </>
  );
};