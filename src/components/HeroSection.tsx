import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "./ContactForm";

export const HeroSection = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Better Showcase */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(106, 182, 55, 0.3), rgba(55, 119, 197, 0.2)), url('https://images.unsplash.com/photo-1524230572899-a752b3835840?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`
          }}
        />
        
        {/* Property Showcase Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-primary/20 rounded-full blur-xl animate-pulse delay-500"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center text-white">
          {/* Premium Badge */}
          <div className="mb-8">
            <span className="inline-block bg-white/15 backdrop-blur-md text-white px-8 py-3 rounded-full text-lg font-semibold border border-white/20">
              Premium Residential Project
            </span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
            <span className="block text-white drop-shadow-2xl">Godrej</span>
            <span className="block bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent drop-shadow-2xl">
              Thanisandra
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-3xl mb-4 max-w-4xl mx-auto text-white/95 drop-shadow-lg font-light">
            Where Luxury Meets Comfort in North Bangalore
          </p>
          
          <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto text-white/80 leading-relaxed">
            Experience premium living with world-class amenities, strategic location, 
            and thoughtfully designed 2, 3 & 4 BHK apartments in the heart of Thanisandra
          </p>
          
          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button 
              variant="hero" 
              size="lg"
              className="px-12 py-4 text-xl font-semibold transform hover:scale-105 transition-all duration-300 shadow-2xl"
              onClick={() => setIsFormOpen(true)}
            >
              Book Your Dream Home
            </Button>
            
            <Button 
              variant="heroBrochure" 
              size="lg"
              className="px-12 py-4 text-xl font-semibold transform hover:scale-105 transition-all duration-300 backdrop-blur-sm"
              onClick={() => setIsFormOpen(true)}
            >
              Download Brochure
            </Button>
          </div>
          
          {/* Key Highlights - Simplified */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/20 transform hover:scale-105 transition-all duration-300">
              <h3 className="text-3xl md:text-4xl font-bold text-yellow-300 mb-3">2-4 BHK</h3>
              <p className="text-white/90 text-lg">Premium Apartments</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/20 transform hover:scale-105 transition-all duration-300">
              <h3 className="text-3xl md:text-4xl font-bold text-yellow-300 mb-3">45+</h3>
              <p className="text-white/90 text-lg">World-Class Amenities</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/20 transform hover:scale-105 transition-all duration-300">
              <h3 className="text-3xl md:text-4xl font-bold text-yellow-300 mb-3">Prime</h3>
              <p className="text-white/90 text-lg">North Bangalore Location</p>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
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