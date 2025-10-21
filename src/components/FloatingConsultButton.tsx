import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CampaignIcon from '@mui/icons-material/Campaign';
import { ContactForm } from "./ContactForm";

type FormType = 'enquire' | null;

export const FloatingConsultButton = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState<FormType>(null);
  const [isHeroInView, setIsHeroInView] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const heroEl = document.getElementById('hero');
    if (!heroEl) {
      // If hero isn't found, we default to showing the button
      setIsHeroInView(false);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsHeroInView(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      {/* Desktop sticky button - shows when hero is not in view */}
      {(!isHeroInView) && (
        <button
          onClick={() => setIsFormOpen('enquire')}
          className="hidden md:flex fixed z-50 !bg-[#b90f5f] text-white font-bold py-3 px-4 rounded-l-2xl shadow-xl transition-all duration-300 items-center justify-center top-1/2 right-0 -translate-y-1/2 animate-scale-pulse"
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
         Book A Site Visit
        </button>
      )}
      
      {/* Mobile expandable button - shows when hero is not in view */}
      {(!isHeroInView) && (
      <div 
        className="fixed z-50 top-1/2 -translate-y-1/2 right-0 md:hidden transition-all duration-300"
        style={{
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
        }}
      >
        {!isExpanded ? (
          <Button
            className="!rounded-l-xl !rounded-r-none !bg-[#b90f5f] !text-white hover:!bg-[#9d0d52] shadow-xl h-auto py-6"
            onClick={() => setIsExpanded(true)}
          >
            <CampaignIcon className="h-7 w-7 -rotate-90" />
            <ChevronLeft className="h-4 w-4 -rotate-90 mt-2" />
          </Button>
        ) : (
          <div className="flex items-stretch gap-[2px] animate-fade-in">
            <Button
              className="!rounded-l-xl !rounded-r-none !bg-[#b90f5f] !text-white hover:!bg-[#9d0d52] shadow-xl font-semibold px-4 min-h-[350px] flex items-center gap-3 animate-scale-pulse"
              onClick={() => setIsFormOpen('enquire')}
              style={{
                letterSpacing: '0.05em',
                lineHeight: '1.8'
              }}
            >
              <CampaignIcon className="h-7 w-7 -rotate-90 mb-3" />
              <span className="text-base">Book A Site Visit</span>
            </Button>
            <button
              className="relative !bg-[#b90f5f] !text-white w-[55px] min-h-[80px] hover:!bg-[#9d0d52] transition-colors flex flex-col items-center justify-center group !rounded-l-xl !rounded-r-none shadow-xl overflow-hidden"
              onClick={() => setIsExpanded(false)}
              aria-label="Hide consultation button"
            >
              <div className="absolute inset-0 bg-white/10 translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
              <div className="relative">
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
      )}
      <ContactForm 
        isOpen={isFormOpen === 'enquire'} 
        onClose={() => setIsFormOpen(null)}
        title="Pre-Launch Special Offer"
      />
    </div>
  );
};
