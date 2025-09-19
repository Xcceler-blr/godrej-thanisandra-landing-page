import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Phone } from "lucide-react";
import { ContactForm } from "./ContactForm";

type FormType = 'enquire' | null;

export const FloatingConsultButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState<FormType>(null);

  return (
    <div>
      <div 
        className="fixed z-50 top-1/2 -translate-y-1/2 right-0 md:hidden transition-all duration-300"
        style={{
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
        }}
      >
        {!isExpanded ? (
          <Button
            className="!rounded-l-xl !rounded-r-none !bg-[#56A7E0] !text-white hover:!bg-[#4590c5] shadow-xl h-auto py-6"
            onClick={() => setIsExpanded(true)}
          >
            <Phone className="h-5 w-5 -rotate-90" />
            <ChevronLeft className="h-4 w-4 -rotate-90 mt-2" />
          </Button>
        ) : (
          <div className="flex items-stretch gap-[2px] animate-fade-in">
            <Button
              className="!rounded-l-xl !rounded-r-none !bg-[#56A7E0] !text-white hover:!bg-[#4590c5] shadow-xl font-semibold px-4 min-h-[350px] flex items-center gap-3"
              onClick={() => setIsFormOpen('enquire')}
              style={{
                letterSpacing: '0.05em',
                lineHeight: '1.8'
              }}
            >
              <Phone className="h-5 w-5 -rotate-90 mb-3" />
              <span className="text-base">Grab Pre-Launch Offer Now</span>
            </Button>
            <button
              className="relative !bg-[#56A7E0] !text-white w-[55px] min-h-[80px] hover:!bg-[#4590c5] transition-colors flex flex-col items-center justify-center group !rounded-l-xl !rounded-r-none shadow-xl overflow-hidden"
              onClick={() => setIsExpanded(false)}
              aria-label="Hide consultation button"
            >
              <div className="absolute inset-0 bg-white/10 translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
              <div className="relative animate-bounce-gentle">
                <div 
                  className="w-8 h-8 rounded-full border-2 border-white/70 flex items-center justify-center group-hover:border-white group-hover:scale-110 transition-all duration-300 ease-out bg-white/5 backdrop-blur-sm"
                >
                  <ChevronRight 
                    className="h-5 w-5 -rotate-90 group-hover:translate-x-0.5 transition-all duration-300" 
                  />
                </div>
              </div>
            </button>
          </div>
        )}
      </div>
      <ContactForm 
        isOpen={isFormOpen === 'enquire'} 
        onClose={() => setIsFormOpen(null)}
        title="Pre-Launch Special Offer"
      />
    </div>
  );
};
