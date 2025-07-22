import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "./ContactForm";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, Camera, Download, Play } from "lucide-react";

export const GallerySection = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const galleryItems = [
    {
      type: "Exterior View",
      image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "exterior"
    },
    {
      type: "Lobby & Entrance",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "interior"
    },
    {
      type: "Swimming Pool",
      image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "amenities"
    },
    {
      type: "Fitness Center",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "amenities"
    },
    {
      type: "Model Apartment",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "interior"
    },
    {
      type: "Landscaped Gardens",
      image: "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "exterior"
    },
    {
      type: "Children's Play Area",
      image: "https://images.unsplash.com/photo-1460574283810-2aab119d8511?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "amenities"
    },
    {
      type: "Clubhouse",
      image: "https://images.unsplash.com/photo-1431576901776-e539bd916ba2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "amenities"
    },
    {
      type: "Sample Kitchen",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "interior"
    }
  ];

  return (
    <>
      <section className="py-12 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              Project Gallery
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="text-primary">Godrej Thanisandra</span>
              <br />Gallery
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Take a virtual tour of Godrej Thanisandra and experience the luxury, 
              quality, and attention to detail that defines our premium project.
            </p>
          </div>

          {/* Main Gallery Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {galleryItems.map((item, index) => (
              <Card key={index} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0 relative">
                  <img 
                    src={item.image}
                    alt={item.type}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Eye className="h-8 w-8 mx-auto mb-2" />
                      <p className="font-medium">{item.type}</p>
                    </div>
                  </div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge 
                      variant="secondary" 
                      className="bg-black/50 text-white border-white/20"
                    >
                      {item.category}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Gallery Actions */}
          <div className="text-center space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="default" 
                size="lg"
                className="gap-2"
                onClick={() => setIsFormOpen(true)}
              >
                <Camera className="h-5 w-5" />
                View Complete Gallery
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="gap-2"
                onClick={() => setIsFormOpen(true)}
              >
                <Play className="h-5 w-5" />
                Watch Virtual Tour
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Want to see more? Schedule a site visit for a personal tour of the property.
            </p>
          </div>

          {/* Gallery Stats */}
          <div className="mt-16 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-3xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Experience <span className="text-primary">Godrej Thanisandra</span>
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <div className="text-sm text-muted-foreground">High-Quality Images</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary mb-2">360°</div>
                <div className="text-sm text-muted-foreground">Virtual Tour</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent mb-2">4K</div>
                <div className="text-sm text-muted-foreground">Video Walkthrough</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-tertiary mb-2">Live</div>
                <div className="text-sm text-muted-foreground">Construction Updates</div>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <Button 
                variant="default" 
                size="lg"
                onClick={() => setIsFormOpen(true)}
              >
                <Download className="h-5 w-5 mr-2" />
                Download HD Images
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <ContactForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)}
        title="Access Complete Gallery"
      />
    </>
  );
};