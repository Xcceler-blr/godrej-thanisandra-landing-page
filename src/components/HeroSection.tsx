import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "./ContactForm";
import { MapPin, Star, Home } from "lucide-react";

export const HeroSection = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1524230572899-a752b3835840?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center text-white">
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 bg-primary/20 text-primary-foreground px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
              <Star className="h-4 w-4" />
              Premium Living Experience
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Godrej Thanisandra
            </span>
            <br />
            <span className="text-white">North Bangalore</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-200">
            Experience luxury living in the heart of North Bangalore with world-class amenities, 
            strategic location, and premium 2, 3 & 4 BHK apartments.
          </p>
          
          <div className="flex items-center justify-center gap-2 mb-8 text-lg">
            <MapPin className="h-5 w-5 text-primary" />
            <span>Thanisandra, North Bangalore</span>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="cta" 
              size="lg"
              className="px-8 py-3 text-lg"
              onClick={() => setIsFormOpen(true)}
            >
              <Home className="h-5 w-5 mr-2" />
              Book Your Dream Home
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-3 text-lg border-white text-white hover:bg-white hover:text-primary"
              onClick={() => setIsFormOpen(true)}
            >
              Download Brochure
            </Button>
          </div>
          
          {/* Key Highlights */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <h3 className="text-2xl font-bold text-primary mb-2">2-4 BHK</h3>
              <p className="text-gray-200">Premium Apartments</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <h3 className="text-2xl font-bold text-secondary mb-2">45+</h3>
              <p className="text-gray-200">World-Class Amenities</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <h3 className="text-2xl font-bold text-accent mb-2">Prime</h3>
              <p className="text-gray-200">North Bangalore Location</p>
            </div>
          </div>
        </div>
      </section>
      
      <ContactForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)}
        title="Book Your Dream Home"
      />
    </>
  );
};