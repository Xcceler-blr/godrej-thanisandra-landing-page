import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "./ContactForm";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

type FormType = 'sitevisit' | 'enquire' | null;
export const HeroSection = () => {
  const [isFormOpen, setIsFormOpen] = useState<FormType>(null);
  const { ref, isVisible } = useScrollAnimation();

  return (
    <>
      <section ref={ref} className={`relative min-h-screen flex flex-col md:flex-row items-start md:items-center justify-start md:justify-center overflow-hidden pt-16 md:pt-32 pb-8 md:pb-0 transition-opacity duration-700 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        {/* Logo and Authorized Marketing Partner - Desktop Only */}
        <div className="absolute top-4 left-0 right-0 z-20 hidden md:block">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col items-start">
              <img 
                src="/Assets/id98Oz8z3__logos.svg" 
                alt="Godrej Logo" 
                className="w-32 h-auto md:w-40"
              />
              <p className="mt-1 text-xs font-bold italic" style={{
                background: 'linear-gradient(135deg, #5FB233 0%, #4187CE 50%, #BD1362 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>Authorized Marketing Partner</p>
            </div>
          </div>
        </div>
        {/* Sticky ENQUIRE NOW Button - Desktop Only */}
        <button
          onClick={() => setIsFormOpen('enquire')}
          className="hidden md:flex fixed z-50 !bg-[#56A7E0] text-white font-bold py-3 px-4 rounded-l-2xl shadow-xl hover:scale-105 transition-all duration-300 items-center justify-center enquire-now-animate top-1/2 right-0 -translate-y-1/2"
          style={{
            marginRight: 0,
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            letterSpacing: 'normal',
            height: 'auto',
            minWidth: '80px',
            whiteSpace: 'nowrap',
          }}
        >
          Book a Free Consultation
        </button>
        {/* Background Image as <img> for LCP */}
        <img
          src="/Assets/Godrej.png"
          alt="Godrej Thanisandra"
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          decoding="async"
        />

        {/* Mobile Layout - Logo at Top */}
        <div className="absolute top-16 left-4 right-4 z-20 md:hidden">
          <div className="w-full flex flex-col items-start">
            <img 
              src="/Assets/id98Oz8z3__logos.svg" 
              alt="Godrej Logo" 
              className="w-24 h-auto"
            />
            <p className="mt-2 text-xs font-bold italic" style={{
              background: 'linear-gradient(135deg, #5FB233 0%, #4187CE 50%, #BD1362 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Authorized Marketing Partner</p>
          </div>
        </div>

        {/* Mobile Layout - Content and Features at Bottom */}
        <div className="absolute bottom-16 left-4 right-4 z-20 md:hidden">
          {/* Main Content Section - Title, Subtitle, Button */}
          <div className="w-full mb-6">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight text-white text-left">
              Godrej Thanisandra
            </h1>
            <p className="text-lg sm:text-xl mb-6 font-light text-white text-left">
              Where Luxury Meets Comfort in North Bangalore
            </p>
            <Button 
              size="lg"
              className="px-8 py-3 text-lg font-semibold w-full !bg-[#B9105E] !text-white !border-none hover:!bg-[#a00d4e] rounded-xl"
              onClick={() => setIsFormOpen('sitevisit')}
            >
              Schedule Site Visit
            </Button>
          </div>

          {/* Feature Boxes Section */}
          <div className="w-full flex flex-row gap-3">
            <div className="flex-1 bg-black/40 backdrop-blur-sm rounded-xl p-3 text-center border border-white/20">
              <h3 className="text-lg font-bold text-yellow-300 mb-1">2-3 BHK</h3>
              <p className="text-white/90 text-xs">Premium Apartments</p>
            </div>
            <div className="flex-1 bg-black/40 backdrop-blur-sm rounded-xl p-3 text-center border border-white/20">
              <h3 className="text-lg font-bold text-yellow-300 mb-1">45+</h3>
              <p className="text-white/90 text-xs">World-Class Amenities</p>
            </div>
            <div className="flex-1 bg-black/40 backdrop-blur-sm rounded-xl p-3 text-center border border-white/20">
              <h3 className="text-lg font-bold text-yellow-300 mb-1">Prime</h3>
              <p className="text-white/90 text-xs">North Bangalore Location</p>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Original */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full hidden md:flex flex-row items-center justify-between">
          {/* Left: Text and Buttons */}
          <div className="flex-1 flex flex-col items-start justify-center text-left text-white py-16 md:py-24 w-full">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-2 md:mb-4 leading-tight w-full text-left">
              Godrej Thanisandra
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6 md:mb-8 font-light w-full text-left">
              Where Luxury Meets Comfort in North Bangalore
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 md:mb-8 w-full">
              <Button 
                size="lg"
                className="px-6 py-2 sm:px-8 sm:py-3 text-base sm:text-lg font-semibold w-full sm:w-auto !bg-[#B9105E] !text-white !border-none hover:!bg-[#a00d4e]"
                onClick={() => setIsFormOpen('sitevisit')}
              >
                Schedule Site Visit
              </Button>
            </div>
          </div>

          {/* Right: Vertical Tiles */}
          <div className="flex flex-col gap-3 md:gap-6 w-full md:w-auto md:ml-16 mt-8 md:mt-0 mb-8 md:mb-0">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 text-center border border-white/20 min-w-0 md:min-w-[220px] h-20 md:h-auto flex flex-col justify-center">
              <h3 className="text-lg md:text-2xl font-bold text-yellow-300 mb-1 md:mb-2">2-3 BHK</h3>
              <p className="text-white/90 text-xs md:text-base">Premium Apartments</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 text-center border border-white/20 min-w-0 md:min-w-[220px] h-20 md:h-auto flex flex-col justify-center">
              <h3 className="text-lg md:text-2xl font-bold text-yellow-300 mb-1 md:mb-2">45+</h3>
              <p className="text-white/90 text-xs md:text-base">World-Class Amenities</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 text-center border border-white/20 min-w-0 md:min-w-[220px] h-20 md:h-auto flex flex-col justify-center">
              <h3 className="text-lg md:text-2xl font-bold text-yellow-300 mb-1 md:mb-2">Prime</h3>
              <p className="text-white/90 text-xs md:text-base">North Bangalore Location</p>
            </div>
          </div>
        </div>
      <ContactForm 
        isOpen={isFormOpen === 'sitevisit'} 
        onClose={() => setIsFormOpen(null)}
        title="Hero - Schedule Site Visit"
      />
      <ContactForm 
        isOpen={isFormOpen === 'enquire'} 
        onClose={() => setIsFormOpen(null)}
        title="Hero - Enquire Now"
      />
      </section>
    </>
  );
};