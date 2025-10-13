import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "./ContactForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const FAQSection = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { ref, isVisible } = useScrollAnimation();

  const faqs = [
    {
      id: "faq-1",
      question: "How to book Godrej properties in North Bangalore?",
      answer: "Booking Godrej properties in North Bangalore is simple via our official website or through our sales representatives. We provide complete project documentation, master plans, floor plans, and pre-launch offers to ensure a smooth and transparent home-buying experience."
    },
    {
      id: "faq-2", 
      question: "Which are the top Godrej projects in North Bangalore?",
      answer: "Among the top Godrej projects in North Bangalore, Godrej Thanisandra stands out with its 2 & 3 BHK homes, versatile floor plans, and premium lifestyle amenities. The project is set in a thriving corridor of North Bangalore, offering proximity to schools, hospitals, shopping destinations, and major IT hubs, ensuring convenience and luxury in one location."
    },
    {
      id: "faq-3",
      question: "Which is the upcoming Godrej property in Bangalore Yelahanka?",
      answer: "The upcoming Godrej property near Bangalore Yelahanka is Godrej Thanisandra, a premium residential development located just a few minutes from Yelahanka on New Airport Road in North Bangalore. This pre-launch project spans 7 acres and offers 2 & 3 BHK luxury apartments with world-class amenities such as a clubhouse, swimming pool, gym, yoga deck, and landscaped gardens. With its close proximity to Reva College, Manyata Tech Park, and Kempegowda International Airport, Godrej Thanisandra is one of the most promising upcoming Godrej Properties near Yelahanka Bangalore."
    },
    {
      id: "faq-4",
      question: "Which are the top Godrej properties in Bangalore Devanahalli?",
      answer: "If you're exploring Godrej properties in Bangalore Devanahalli, Godrej Thanisandra is one of the most premium options nearby. Strategically located on New Airport Road, just a short drive from Devanahalli and Kempegowda International Airport, this pre-launch residential project by Godrej Properties offers luxurious 2 & 3 BHK apartments within a 7-acre low-density community."
    }
  ];

  // Add structured data for FAQ section
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'faq-structured-data';
    script.innerHTML = JSON.stringify(structuredData);
    
    // Remove existing FAQ structured data if any
    const existingScript = document.getElementById('faq-structured-data');
    if (existingScript) {
      existingScript.remove();
    }
    
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById('faq-structured-data');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

  return (
    <>
      <section 
        id="faq" 
        ref={ref} 
        className={`pt-16 pb-16 bg-white transition-opacity duration-700 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
        itemScope 
        itemType="https://schema.org/FAQPage"
      >
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary">
                <HelpCircle className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold">
                <span className="text-primary">Frequently Asked</span>
                <br className="md:hidden" />
                <span className="text-gray-800"> Questions</span>
              </h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Get answers to the most common questions about Godrej Thanisandra and our properties in North Bangalore.
            </p>
          </div>

          <div className="bg-[#F6F8FB] rounded-3xl p-8 md:p-12">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={faq.id} 
                  value={faq.id}
                  className="bg-white rounded-2xl shadow-sm border-0 overflow-hidden"
                  itemScope 
                  itemType="https://schema.org/Question"
                >
                  <AccordionTrigger className="px-6 py-4 text-left hover:no-underline hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex items-start gap-4 text-left">
                      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm flex-shrink-0 mt-1">
                        {index + 1}
                      </div>
                      <h3 
                        className="font-semibold text-gray-800 text-base md:text-lg leading-relaxed"
                        itemProp="name"
                      >
                        {faq.question}
                      </h3>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent 
                    className="px-6 pb-6"
                    itemScope 
                    itemType="https://schema.org/Answer"
                  >
                    <div className="ml-12">
                      <p 
                        className="text-muted-foreground leading-relaxed"
                        itemProp="text"
                      >
                        {faq.answer}
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
            <div className="text-center mt-8">
              <p className="text-muted-foreground mb-4">
                Have more questions? Our experts are here to help!
              </p>
              <Button 
                variant="default" 
                size="lg"
                className="gap-2 !bg-[#B9105E] !text-white !border-none hover:!bg-[#a00d4e]"
                onClick={() => setIsFormOpen(true)}
                aria-label="Get Expert Consultation for Godrej Thanisandra"
              >
                Get Expert Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>
      <ContactForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)}
        title="FAQ - Get Expert Consultation"
      />
    </>
  );
};