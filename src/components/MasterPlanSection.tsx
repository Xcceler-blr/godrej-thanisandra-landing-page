import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "./ContactForm";
import { Badge } from "@/components/ui/badge";
import { Download, Eye, Map, FileText } from "lucide-react";

export const MasterPlanSection = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const downloadOptions = [
    {
      title: "Master Plan",
      description: "Complete layout and site plan",
      icon: Map,
      format: "PDF",
      size: "2.3 MB"
    },
    {
      title: "Floor Plans",
      description: "Detailed floor plans for all configurations",
      icon: FileText,
      format: "PDF",
      size: "4.1 MB"
    },
    {
      title: "Brochure",
      description: "Complete project brochure with details",
      icon: Download,
      format: "PDF",
      size: "8.5 MB"
    },
    {
      title: "Price List",
      description: "Updated pricing for all apartment types",
      icon: FileText,
      format: "PDF",
      size: "1.2 MB"
    }
  ];

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              Project Documentation
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Download <span className="text-primary">Master Plan</span>
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
                src="https://images.unsplash.com/photo-1496307653780-42ee777d4833?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Master Plan Preview"
                className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
              />
              
              <div className="mt-6 flex justify-center">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="gap-2"
                  onClick={() => setIsFormOpen(true)}
                >
                  <Eye className="h-5 w-5" />
                  View Interactive Master Plan
                </Button>
              </div>
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
                      onClick={() => setIsFormOpen(true)}
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{option.title}</h4>
                        <p className="text-sm text-muted-foreground">{option.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-foreground">{option.format}</div>
                        <div className="text-xs text-muted-foreground">{option.size}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="default" 
                  size="lg"
                  className="gap-2"
                  onClick={() => setIsFormOpen(true)}
                >
                  <Download className="h-5 w-5" />
                  Download All Documents
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => setIsFormOpen(true)}
                >
                  Request Physical Copy
                </Button>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="bg-background rounded-3xl p-8 md:p-12 shadow-xl">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
              What's Included in the <span className="text-primary">Master Plan</span>
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                "Site Layout & Design",
                "Apartment Configurations",
                "Amenity Locations",
                "Landscaping Details",
                "Parking Layout",
                "Security Features",
                "Utility Infrastructure",
                "Recreation Areas"
              ].map((feature, index) => (
                <div key={index} className="text-center p-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold text-lg">{index + 1}</span>
                  </div>
                  <p className="font-medium text-foreground">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <ContactForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)}
        title="Download Master Plan & Documents"
      />
    </>
  );
};