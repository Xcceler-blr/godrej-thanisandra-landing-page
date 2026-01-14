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
      question: "What apartment configurations are available at Godrej Woods?",
      answer: "Godrej Woods offers thoughtfully designed 2 and 3-BHK apartments, with carpet areas ranging from [1193 sq.ft – 2305 sq.ft]. Each configuration is planned to maximise space efficiency, natural light, and ventilation, catering to both end-users and investors."
    },
    {
      id: "faq-2",
      question: "What is the starting price and overall price range of apartments at Godrej Woods?",
      answer: "The apartments at Godrej Woods are priced starting from ₹ 1.62Cr onwards, with prices varying based on configuration, floor level, view, and unit size. For detailed pricing and current offers, interested buyers are encouraged to contact us on the given number."
    },
    {
      id: "faq-3",
      question: "Is Godrej Woods registered and approved under RERA?",
      answer: "Yes, Godrej Woods is a RERA-approved project, ensuring transparency and compliance with regulatory standards. RERA Registration Number: PRM/KA/RERA/1251/472/PR/121125/008248 Buyers can verify the project details on the official RERA website https://rera.karnataka.gov.in/ for complete assurance. "
    },
    {
      id: "faq-4",
      question: "Can I visit the Godrej Woods site or sample flat?",
      answer: "Yes, prospective buyers can schedule a site visit or sample flat visit at Godrej Woods to experience the layout, amenities, and overall project environment. Visits are conducted by prior appointment to ensure a guided and personalised experience. "
    },
    {
      id: "faq-5",
      question: "Is Godrej Woods a good option for investment or rental returns?",
      answer: "Godrej Woods is considered a strong option for both long-term investment and rental income, due to its strategic location, brand reputation of Godrej Properties, quality construction, and upcoming infrastructure developments in the area. The project has the potential for capital appreciation and steady rental demand."
    },
    {
      id: "faq-6",
      question: "Where is Godrej Woods located and what are the key nearby landmarks?",
      answer: (
        <div className="whitespace-normal">
          Godrej Woods is strategically located in Thanisandra in North Bangalore offering excellent connectivity to major destinations such as:
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>5 minutes BIAL (Bangalore International Airport)</li>
            <li>10 minutes Upcoming Metro Station</li>
            <li>15 minutes Hebbal Flyover</li>
            <li>12 minutes Manyata Tech Park</li>
            <li>7 minutes Delhi Public School</li>
            <li>2 minutes REVA University</li>
            <li>5 minutes Phoenix Mall Of Asia</li>
            <li>9 minutes Sparsh Hospital Yelahanka</li>
          </ul>
        </div>
      ),
      plainAnswer: "Godrej Woods is strategically located in Thanisandra in North Bangalore offering excellent connectivity to major destinations such as: 5 minutes BIAL (Bangalore International Airport), 10 minutes Upcoming Metro Station, 15 minutes Hebbal Flyover, 12 minutes Manyata Tech Park, 7 minutes Delhi Public School, 2 minutes REVA University, 5 minutes Phoenix Mall Of Asia, 9 minutes Sparsh Hospital Yelahanka"
    },
    {
      id: "faq-7",
      question: "How to book Godrej properties in North Bangalore?",
      answer: "Booking Godrej properties in North Bangalore is simple via our official website or through our sales representatives. We provide complete project documentation, master plans, floor plans, and pre-launch offers to ensure a smooth and transparent home-buying experience."
    },
    {
      id: "faq-8",
      question: "Which are the top Godrej projects in North Bangalore?",
      answer: "Among the top Godrej projects in North Bangalore, Godrej Thanisandra stands out with its 2 & 3 BHK homes, versatile floor plans, and premium lifestyle amenities. The project is set in a thriving corridor of North Bangalore, offering proximity to schools, hospitals, shopping destinations, and major IT hubs, ensuring convenience and luxury in one location."
    },
    {
      id: "faq-9",
      question: "Which is the upcoming Godrej property in Bangalore Yelahanka?",
      answer: "The upcoming Godrej property near Bangalore Yelahanka is Godrej Thanisandra, a premium residential development located just a few minutes from Yelahanka on New Airport Road in North Bangalore. This pre-launch project spans 7 acres and offers 2 & 3 BHK luxury apartments with world-class amenities such as a clubhouse, swimming pool, gym, yoga deck, and landscaped gardens. With its close proximity to Reva College, Manyata Tech Park, and Kempegowda International Airport, Godrej Thanisandra is one of the most promising upcoming Godrej Properties near Yelahanka Bangalore."
    },
    {
      id: "faq-10",
      question: "Which are the top Godrej properties in Bangalore Devanahalli?",
      answer: "If you're exploring Godrej properties in Bangalore Devanahalli, Godrej Thanisandra is one of the most premium options nearby. Strategically located on New Airport Road, just a short drive from Devanahalli and Kempegowda International Airport, this pre-launch residential project by Godrej Properties offers luxurious 2 & 3 BHK apartments within a 7-acre low-density community."
    },
    {
      id: "faq-11",
      question: "Where is the godrej thanisandra bangalore location and how is the connectivity?",
      answer: "The Godrej Thanisandra location is one of its biggest advantages — it's strategically positioned on New Airport Road near Reva College, in the heart of North Bangalore. The project is just 10 minutes from Manyata Tech Park, 15 minutes from Hebbal Junction, and 25–30 minutes from Kempegowda International Airport. Residents also enjoy excellent access to schools, hospitals, malls, and the upcoming metro line, making daily commuting effortless and convenient."
    },
    {
      id: "faq-12",
      question: "What types of homes are available in Godrej North Bangalore?",
      answer: "Godrej North Bangalore offers 1, 2, and 3 BHK apartments, including thoughtfully designed residences at Godrej Woods, featuring modern layouts, premium specifications, and green open spaces"
    },
    {
      id: "faq-13",
      question: "Why is Godrej Properties North Bangalore considered a prime real estate destination?",
      answer: "Godrej Properties North Bangalore is considered prime due to rapid infrastructure growth, strong employment hubs, upcoming metro connectivity, and premium communities like Godrej Woods that enhance long-term livability and value."
    },
    {
      id: "faq-14",
      question: "What are the Godrej upcoming projects in North Bangalore?",
      answer: "Godrej upcoming projects in North Bangalore include premium residential developments by Godrej Properties, strategically launched in fast-growing locations such as Thanisandra, Hebbal, Devanahalli, and Yelahanka. One of the key upcoming projects is Godrej Woods Thanisandra, a premium residential development by Godrej Properties North Bangalore, offering modern apartments, excellent connectivity, and strong long-term investment potential"
    },
    {
      id: "faq-15",
      question: "Which Godrej Properties near REVA University are located in North Bangalore?",
      answer: "The Godrej Properties project near REVA University in North Bangalore is Godrej Woods Thanisandra. Developed by Godrej Properties North Bangalore, Godrej Woods Thanisandra is located on Thanisandra Main Road and offers excellent connectivity to REVA University, Manyata Tech Park, Hebbal, and other key areas of North Bangalore."
    },
    {
      id: "faq-16",
      question: "Which Godrej Properties offer Luxury Apartments in North Bangalore near REVA University?",
      answer: "The Godrej Properties project offering luxury apartments in North Bangalore near REVA University is Godrej Woods Thanisandra. Developed by Godrej Properties North Bangalore, Godrej Woods Thanisandra features premium 2 BHK and 3 BHK apartments with modern architecture, high-end amenities, and excellent connectivity to REVA University, Manyata Tech Park, and Hebbal."
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
          "text": typeof faq.answer === 'string' ? faq.answer : (faq.plainAnswer || "")
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
              Get answers to the most common questions about Godrej Woods and our properties in North Bangalore.
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
                  <AccordionTrigger className="px-6 py-2 text-left hover:no-underline hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex items-center gap-4 text-left">
                      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm flex-shrink-0">
                        {index + 1}
                      </div>
                      <h3
                        className="font-semibold text-gray-800 text-xs md:text-sm leading-relaxed"
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
                      <div
                        className="text-muted-foreground leading-relaxed whitespace-pre-line"
                        itemProp="text"
                      >
                        {faq.answer}
                      </div>
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
                className="gap-2 !bg-[#B9105E] !text-white !border-none hover:!bg-[#a00d4e] !text-[24px] !h-[68px]"
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