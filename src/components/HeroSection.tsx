import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "./ContactForm";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useToast } from "@/hooks/use-toast";
import { HubSpotIntegration } from "@/lib/hubspot-integration";
import { useNavigate } from "react-router-dom";

type FormType = 'bookhome' | 'enquire' | null;
export const HeroSection = () => {
  const [isFormOpen, setIsFormOpen] = useState<FormType>(null);
  const [submitting, setSubmitting] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { ref, isVisible } = useScrollAnimation();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Fix hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Purpose mapping function (same as ContactForm)
  const PURPOSE_OPTIONS = [
    "About - Learn More About Godrej",
    "Floor Plan - Download Floor Plans", 
    "Project Highlights - Schedule Site Visit",
    "Amenities - Schedule Amenities Tour",
    "Learn More About Location",
    "Pre-Launch Special Offer",
    "Get in Touch"
  ];

  function getPurposeValue(title: string) {
    if (!title) return "Get in Touch";
    if (PURPOSE_OPTIONS.includes(title)) return title;
    if (title.includes("About")) return "About - Learn More About Godrej";
    if (title.includes("Floor Plan")) return "Floor Plan - Download Floor Plans";
    if (title.includes("Project Highlights")) return "Project Highlights - Schedule Site Visit";
    if (title.includes("Amenities")) return "Amenities - Schedule Amenities Tour";
    if (title.includes("Location")) return "Learn More About Location";
    if (title.includes("Pre-Launch") || title.includes("Special Offer")) return "Pre-Launch Special Offer";
    return "Get in Touch";
  }



  // Handle scroll to section
  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Handle pre-launch form submission
  const handlePreLaunchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;

    try {
      // Use the same purpose mapping as ContactForm
      const purposeValue = getPurposeValue("Pre-Launch Special Offer");
      
      // Submit to Google Forms (same method as ContactForm)
      const formPayload = new FormData();
      formPayload.append("entry.1338687725", name);
      formPayload.append("entry.1492404407", phone);
      formPayload.append("entry.1294608166", purposeValue);
      
      console.log('Submitting to Google Forms:', {
        name,
        phone,
        purpose: purposeValue
      });
      
      // Submit to Google Forms
      await fetch("https://docs.google.com/forms/d/e/1FAIpQLSfmhAoHV0oaodPJsJuhcXyDF554xaGkKqaQAkXTd-lCmGexaA/formResponse", {
        method: "POST",
        mode: "no-cors",
        body: formPayload,
      });
      
      console.log('Google Forms submission completed');

      // Submit to HubSpot
      await HubSpotIntegration.submitToForm('booking-offer', {
        name,
        phone,
        additionalData: {
          source: "Pre-Launch Special Offer",
          page_url: window.location.href
        }
      });

      // Reset form
      (e.target as HTMLFormElement).reset();
      
      // Show success and redirect
      toast({
        title: "Thank You!",
        description: "Your pre-launch enquiry has been submitted successfully.",
      });
      
      // Redirect to thank you page
      navigate('/thank-you');
      
    } catch (error) {
      console.error('Pre-launch form submission error:', error);
      toast({
        title: "Submission failed",
        description: "There was a problem submitting your enquiry. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section id="hero" ref={ref} className={`relative min-h-[120vh] flex flex-col md:flex-row items-start md:items-center justify-start md:justify-center overflow-hidden pt-17 md:pt-28 pb-8 md:pb-0 transition-opacity duration-700 ${isClient && isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        {/* Sticky ENQUIRE NOW Button - Desktop Only */}
        {isClient && (
          <button
            onClick={() => setIsFormOpen('enquire')}
            className="hidden md:flex fixed z-50 !bg-[#56A7E0] text-white font-bold py-3 px-4 rounded-l-2xl shadow-xl transition-all duration-300 items-center justify-center top-1/2 right-0 -translate-y-1/2 animate-scale-pulse"
            style={{
              marginRight: 0,
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              letterSpacing: 'normal',
              height: 'auto',
              minWidth: '55px',
              whiteSpace: 'nowrap',
            }}
          >
            Grab Pre-Launch Offer Now
          </button>
        )}
        {/* Background Image as <img> for LCP */}
        <img
          src="/Assets/Godrej.png"
          alt="Godrej Thanisandra"
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          decoding="async"
        />

        {/* Mobile Layout - Logo and Content */}
        <div className="absolute top-16 left-4 right-4 z-20 md:hidden">
          <div className="w-full flex flex-col items-start">
            
            {/* Title and Subtitle */}
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight text-white text-left mt-6">
              Godrej Thanisandra
            </h1>
            <p className="text-lg sm:text-xl mb-6 font-light text-white text-left">
              Where Luxury Meets Comfort in North Bangalore
            </p>

            
            {/* Inline Pre-Launch Form */}
            <div className="w-full mt-4 bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-white/20 mb-6">
              <h3 className="text-lg font-bold text-yellow-300 mb-3 text-center">
                Pre-Launch Special Offer
              </h3>
              <form id="hero-mobile-booking-offer-form" className="space-y-3" onSubmit={handlePreLaunchSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:border-yellow-300"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  required
                  className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:border-yellow-300"
                />
                <Button 
                  type="submit"
                  size="lg"
                  disabled={submitting}
                  className="w-full !bg-[#B9105E] !text-white !border-none hover:!bg-[#a00d4e] font-bold text-lg py-3 rounded-lg disabled:opacity-50"
                >
                  {submitting ? "Submitting..." : "Grab Your Pre-Launch Deal"}
                </Button>
              </form>
              <p className="text-xs text-white text-center mt-2 font-semibold">
              Get Assured Gifts on every Booking
              </p>
            </div>

            {/* Mobile Feature Boxes - Below Form */}
            <div className="w-full flex flex-row gap-3">
              <div 
                onClick={() => handleScrollToSection('floor-plan')}
                className="flex-1 bg-black/40 backdrop-blur-sm rounded-xl p-3 text-center border border-white/20 cursor-pointer hover:bg-black/50 transition-colors duration-200"
              >
                <h3 className="text-lg font-bold text-yellow-300 mb-1">2-3 BHK</h3>
                <p className="text-white/90 text-xs">Premium Apartments</p>
              </div>
              <div 
                onClick={() => handleScrollToSection('godrej-amenities')}
                className="flex-1 bg-black/40 backdrop-blur-sm rounded-xl p-3 text-center border border-white/20 cursor-pointer hover:bg-black/50 transition-colors duration-200"
              >
                <h3 className="text-lg font-bold text-yellow-300 mb-1">45+</h3>
                <p className="text-white/90 text-xs">World-Class Amenities</p>
              </div>
              <div 
                onClick={() => handleScrollToSection('location-advantages')}
                className="flex-1 bg-black/40 backdrop-blur-sm rounded-xl p-3 text-center border border-white/20 cursor-pointer hover:bg-black/50 transition-colors duration-200"
              >
                <h3 className="text-lg font-bold text-yellow-300 mb-1">Prime</h3>
                <p className="text-white/90 text-xs">North Bangalore Location</p>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Original */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full hidden md:flex flex-row items-center justify-between md:mt-[-77px]">
          {/* Left: Text and Buttons */}
          <div className="flex-1 flex flex-col items-start justify-center text-left text-white py-16 md:pt-20 md:pb-24 w-full">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-2 md:mb-4 leading-tight w-full text-left">
              Godrej Thanisandra
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6 md:mb-8 font-light w-full text-left">
              Where Luxury Meets Comfort in North Bangalore
            </p>

            
            {/* Desktop Inline Pre-Launch Form */}
            <div className="w-full max-w-md bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-yellow-300 mb-4 text-center">
                Pre-Launch Special Offer
              </h3>
              <form id="hero-desktop-booking-offer-form" className="space-y-4" onSubmit={handlePreLaunchSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:border-yellow-300"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:border-yellow-300"
                />
                <Button 
                  type="submit"
                  size="lg"
                  disabled={submitting}
                  className="w-full !bg-[#B9105E] !text-white !border-none hover:!bg-[#a00d4e] font-bold text-lg py-3 rounded-lg disabled:opacity-50"
                >
                  {submitting ? "Submitting..." : "Grab Your Pre-Launch Deal"}
                </Button>
              </form>
              <p className="text-sm text-white text-center mt-3 font-semibold">
                Get Assured Gifts on every Booking
              </p>
            </div>
          </div>

          {/* Right: Vertical Tiles */}
          <div className="flex flex-col gap-3 md:gap-6 w-full md:w-auto md:ml-16 mt-8 md:mt-0 mb-8 md:mb-0">
            <div 
              onClick={() => handleScrollToSection('floor-plan')}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 text-center border border-white/20 min-w-0 md:min-w-[220px] h-20 md:h-auto flex flex-col justify-center cursor-pointer hover:bg-white/15 transition-colors duration-200"
            >
              <h3 className="text-lg md:text-2xl font-bold text-yellow-300 mb-1 md:mb-2">2-3 BHK</h3>
              <p className="text-white/90 text-xs md:text-base">Premium Apartments</p>
            </div>
            <div 
              onClick={() => handleScrollToSection('godrej-amenities')}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 text-center border border-white/20 min-w-0 md:min-w-[220px] h-20 md:h-auto flex flex-col justify-center cursor-pointer hover:bg-white/15 transition-colors duration-200"
            >
              <h3 className="text-lg md:text-2xl font-bold text-yellow-300 mb-1 md:mb-2">45+</h3>
              <p className="text-white/90 text-xs md:text-base">World-Class Amenities</p>
            </div>
            <div 
              onClick={() => handleScrollToSection('location-advantages')}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 text-center border border-white/20 min-w-0 md:min-w-[220px] h-20 md:h-auto flex flex-col justify-center cursor-pointer hover:bg-white/15 transition-colors duration-200"
            >
              <h3 className="text-lg md:text-2xl font-bold text-yellow-300 mb-1 md:mb-2">Prime</h3>
              <p className="text-white/90 text-xs md:text-base">North Bangalore Location</p>
            </div>
          </div>
        </div>
      {isClient && (
        <>
          <ContactForm 
            isOpen={isFormOpen === 'bookhome'} 
            onClose={() => setIsFormOpen(null)}
            title="Hero - Book Your Dream Home Now"
          />
          <ContactForm 
            isOpen={isFormOpen === 'enquire'} 
            onClose={() => setIsFormOpen(null)}
            title="Hero - Enquire Now"
          />
        </>
      )}
      </section>
    </>
  );
};