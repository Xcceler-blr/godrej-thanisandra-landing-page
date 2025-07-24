import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "./ContactForm";
import { Badge } from "@/components/ui/badge";
import { Download, Eye, Map, FileText } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

type FormType = 'expert' | null;
export const MasterPlanSection = () => {
  const [isFormOpen, setIsFormOpen] = useState<FormType>(null);
  const { ref, isVisible } = useScrollAnimation();

  const downloadOptions = [
    {
      title: "Master Plan",
      description: "Complete layout and site plan",
      icon: Map,
      format: "PDF",
      size: "2.3 MB"
    },
    {
      title: "Brochure",
      description: "Complete project brochure with details",
      icon: Download,
      format: "PDF",
      size: "8.5 MB"
    }
  ];

  return (
    <>
      <section ref={ref} className={`pt-16 pb-16 bg-gradient-to-br from-primary/5 to-secondary/5 transition-opacity duration-700 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              Project Documentation
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Godrej Thanisandra <span className="text-primary">Master Plan</span>
              <br />& Project Details
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Get complete project documentation including master plan, floor plans, 
              and detailed brochures to help you make an informed decision.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <img 
                src="/Assets/godrej-master.png"
                alt="Master Plan Preview"
                className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
              />
              
              {/* Removed View Interactive Master Plan button */}
            </div>
            
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold">
                Comprehensive Project <span className="text-primary">Documentation</span>
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                Access detailed project documentation including master plans, floor plans, 
                amenity layouts, and pricing information. Our comprehensive documentation 
                package provides all the information you need to understand the project scope 
                and make an informed investment decision.
              </p>
              
              <div className="grid gap-4">
                {downloadOptions.map((option, index) => {
                  const IconComponent = option.icon;
                  return (
                    <div 
                      key={index}
                      className="flex items-center gap-4 p-4 bg-background rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{option.title}</h4>
                        <p className="text-sm text-muted-foreground">{option.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="flex flex-col gap-4">
                <Button 
                  variant="default" 
                  size="lg"
                  className="gap-2 !bg-[#B9105E] !text-white !border-none hover:!bg-[#a00d4e]"
                  onClick={() => setIsFormOpen('expert')}
                >
                  Talk to Our Expert
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ContactForm 
        isOpen={isFormOpen === 'expert'} 
        onClose={() => setIsFormOpen(null)}
        title="Master Plan - Talk to Our Expert"
      />
    </>
  );
};