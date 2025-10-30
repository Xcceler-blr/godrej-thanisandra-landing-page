import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "./ContactForm";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useToast } from "@/hooks/use-toast";
import { HubSpotIntegration } from "@/lib/hubspot-integration";
import { useNavigate } from "react-router-dom";
import { pushToDataLayer } from "@/lib/analytics";

type FormType = 'bookhome' | 'enquire' | null;

// Background images array for hero carousel
const BACKGROUND_IMAGES = [
  "/Assets/godrej.webp",
  "/Assets/hero-bg-2.webp",
  // "/Assets/hero-bg-3.webp",
  // "/Assets/hero-bg-4.webp",
  "/Assets/hero-bg-5.webp",
  "/Assets/hero-bg-6.webp",
  "/Assets/hero-bg-7.webp",
];

export const HeroSection = () => {
  const [isFormOpen, setIsFormOpen] = useState<FormType>(null);
  const [submitting, setSubmitting] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { ref, isVisible } = useScrollAnimation();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fix hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Auto-slide background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % BACKGROUND_IMAGES.length
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
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
      
      // Submit to Google Forms
      await fetch("https://docs.google.com/forms/d/e/1FAIpQLSfmhAoHV0oaodPJsJuhcXyDF554xaGkKqaQAkXTd-lCmGexaA/formResponse", {
        method: "POST",
        mode: "no-cors",
        body: formPayload,
      });

      // Submit to HubSpot
      await HubSpotIntegration.submitToForm('site-visit', {
        name,
        phone,
        additionalData: {
          source: "Pre-Launch Special Offer",
          page_url: window.location.href
        }
      });

      // Push to data layer after successful form submission
      pushToDataLayer({
        event: 'form_submit_success',
        formName: 'HeroForm',
        formType: 'site-visit',
        formSource: 'Pre-Launch Special Offer'
      });

      // Reset form
      (e.target as HTMLFormElement).reset();
      
      // Show success and redirect
      toast({
        title: "Thank You!",
        description: "Your pre-launch enquiry has been submitted successfully.",
      });
      
      // Close sheet (if open) then redirect to thank you page
      try {
        setIsSheetOpen(false);
      } catch {}
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
            <section id="hero" ref={ref} className={`relative min-h-[85vh] md:min-h-[100vh] flex flex-col md:flex-row items-start md:items-center justify-start md:justify-center overflow-hidden pt-17 md:pt-28 pb-8 md:pb-0 transition-opacity duration-700 ${isClient && isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        {/* Background Images Carousel */}
        <div className="absolute inset-0 z-0">
          {BACKGROUND_IMAGES.map((image, index) => (
            <img
              key={image}
              src={image}
              alt={`Godrej Thanisandra ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover hero-bg-image transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              decoding="async"
              width="1920"
              height="1080"
            />
          ))}
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-24 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
          {BACKGROUND_IMAGES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-white w-8' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Mobile Layout - Logo and Content */}
        <div className="absolute top-16 left-4 right-4 bottom-4 z-20 md:hidden flex flex-col justify-between">
          <div className="w-full flex flex-col items-start">
            {/* Title and Subtitle */}
            <h1 className="text-[33px] sm:text-5xl font-bold mb-2 mt-[23px] leading-tight text-white text-left">
              Godrej Thanisandra
            </h1>
            <p className="text-lg sm:text-xl mb-4 font-semibold text-yellow-300 text-left">
              Pre-launch 2 & 3 BHK apartments <br></br> starting at ₹1.62 Cr in a <br></br> 7-acre premium enclave
            </p>
          </div>

          {/* Mobile: Tiles and Button - At Bottom of Hero Section */}
          <div className="w-full">
            {/* Mobile Feature Boxes - Above Button */}
            <div className="w-full flex flex-row gap-3 mb-3">
              <div 
                onClick={() => handleScrollToSection('floor-plan')}
                className="flex-1 bg-black/40 backdrop-blur-sm rounded-xl p-3 text-center border border-white/20 cursor-pointer hover:bg-black/50 transition-colors duration-200"
              >
                <h3 className="text-lg font-bold text-white mb-1">2-3 BHK</h3>
                <p className="text-white/90 text-xs">Premium Apartments</p>
              </div>
              <div 
                onClick={() => handleScrollToSection('godrej-amenities')}
                className="flex-1 bg-black/40 backdrop-blur-sm rounded-xl p-3 text-center border border-white/20 cursor-pointer hover:bg-black/50 transition-colors duration-200"
              >
                <h3 className="text-lg font-bold text-white mb-1">45+</h3>
                <p className="text-white/90 text-xs">World-Class Amenities</p>
              </div>
              <div 
                onClick={() => handleScrollToSection('location-advantages')}
                className="flex-1 bg-black/40 backdrop-blur-sm rounded-xl p-3 text-center border border-white/20 cursor-pointer hover:bg-black/50 transition-colors duration-200"
              >
                <h3 className="text-lg font-bold text-white mb-1">Prime</h3>
                <p className="text-white/90 text-xs">North Bangalore Location</p>
              </div>
            </div>
            
            {/* Mobile: Button below tiles */}
            <div className="w-full">
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                  <Button 
                    type="button"
                    size="lg"
                    className="w-full !bg-[#B9105E] !text-white !border-none hover:!bg-[#a00d4e] font-bold text-lg py-3 rounded-lg btn-pulse"
                    style={{ animation: 'btn-pulse 1.5s ease-in-out infinite' }}
                  >
                    Book a Site Visit
                  </Button>
                </SheetTrigger>

                <SheetContent side="bottom" className="rounded-t-[10px] max-h-[90vh] overflow-y-auto border">
                  {/* visual handle */}
                  <div className="w-[100px] h-1.5 bg-gray-300 rounded-full mx-auto mb-4 mt-2" />
                  <div className="max-w-md mx-auto">
                    <SheetHeader>
                      <SheetTitle>Book a Site Visit</SheetTitle>
                      <SheetDescription className="text-center">Fill in your details and we'll get back to you.</SheetDescription>
                    </SheetHeader>

                    <form className="space-y-4 mt-4" onSubmit={handlePreLaunchSubmit}>
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-gray-200 rounded-lg text-black placeholder-black/50 focus:outline-none focus:border-yellow-300"
                      />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-gray-200 rounded-lg text-black placeholder-black/50 focus:outline-none focus:border-yellow-300"
                      />

                      <div className="pt-2">
                        <Button 
                          type="submit"
                          size="lg"
                          disabled={submitting}
                          className="w-full !bg-[#B9105E] !text-white !border-none hover:!bg-[#a00d4e] font-bold text-lg py-3 rounded-lg"
                        >
                          {submitting ? "Submitting..." : "Book a Site Visit"}
                        </Button>
                      </div>
                    </form>
                  </div>
                  <SheetClose asChild>
                    <button aria-label="close" className="sr-only">Close</button>
                  </SheetClose>
                </SheetContent>
              </Sheet>
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
            <p className="text-[26px] text-yellow-300 mb-6 md:mb-8 font-semibold w-full text-left">
            Pre-launch 2 & 3 BHK apartments starting at ₹1.62 Cr<br></br> in a 7-acre premium enclave
            </p>

            
            {/* Desktop Inline Pre-Launch Form */}
            <div className="w-full max-w-md bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              {/* <h3 className="text-xl font-bold text-yellow-300 mb-4 text-center">
                Book a Site Visit Now
              </h3> */}
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
                  className="w-full !bg-[#B9105E] !text-white !border-none hover:!bg-[#a00d4e] font-bold text-lg py-3 rounded-lg disabled:opacity-50 btn-pulse"
                  style={{ animation: 'btn-pulse 1.5s ease-in-out infinite' }}
                >
                  {submitting ? "Submitting..." : "Book a Site Visit"}
                </Button>
              </form>
              {/* <p className="text-sm text-white text-center mt-3 font-semibold">
                Get Assured Gifts on every Booking
              </p> */}
            </div>
          </div>

          {/* Right: Vertical Tiles */}
          <div className="flex flex-col gap-3 md:gap-6 w-full md:w-auto md:ml-16 mt-8 md:mt-0 mb-8 md:mb-0">
            <div 
              onClick={() => handleScrollToSection('floor-plan')}
              className="bg-black/40 backdrop-blur-md rounded-2xl p-4 md:p-6 text-center border border-white/20 min-w-0 md:min-w-[220px] h-20 md:h-auto flex flex-col justify-center cursor-pointer hover:bg-white/15 transition-colors duration-200"
            >
              <h3 className="text-lg md:text-2xl font-bold text-white mb-1 md:mb-2">2-3 BHK</h3>
              <p className="text-white/90 text-xs md:text-base">Premium Apartments</p>
            </div>
            <div 
              onClick={() => handleScrollToSection('godrej-amenities')}
              className="bg-black/40 backdrop-blur-md rounded-2xl p-4 md:p-6 text-center border border-white/20 min-w-0 md:min-w-[220px] h-20 md:h-auto flex flex-col justify-center cursor-pointer hover:bg-white/15 transition-colors duration-200"
            >
              <h3 className="text-lg md:text-2xl font-bold text-white mb-1 md:mb-2">45+</h3>
              <p className="text-white/90 text-xs md:text-base">World-Class Amenities</p>
            </div>
            <div 
              onClick={() => handleScrollToSection('location-advantages')}
              className="bg-black/40 backdrop-blur-md rounded-2xl p-4 md:p-6 text-center border border-white/20 min-w-0 md:min-w-[220px] h-20 md:h-auto flex flex-col justify-center cursor-pointer hover:bg-white/15 transition-colors duration-200"
            >
              <h3 className="text-lg md:text-2xl font-bold text-white mb-1 md:mb-2">Prime</h3>
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