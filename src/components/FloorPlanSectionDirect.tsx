import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "./ContactForm";
import { Download } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface FloorPlanCardProps {
    plan: {
        type: string;
        images: string[];
        pdfUrl: string;
    };
    setIsFormOpen: (open: boolean) => void;
    setSelectedPdf: (url: string) => void;
    className?: string;
}

const FloorPlanCard = ({ plan, setIsFormOpen, setSelectedPdf, className = "" }: FloorPlanCardProps) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        let intervalId: ReturnType<typeof setInterval> | null = null;

        const handleResize = () => {
            const isMobile = window.innerWidth < 1024; // lg breakpoint

            if (isMobile) {
                // Start interval if not already running
                if (!intervalId) {
                    intervalId = setInterval(() => {
                        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % plan.images.length);
                    }, 2000);
                }
            } else {
                // Stop interval if running (desktop mode)
                if (intervalId) {
                    clearInterval(intervalId);
                    intervalId = null;
                    setCurrentImageIndex(0); // Reset to first image
                }
            }
        };

        // Initial check
        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (intervalId) clearInterval(intervalId);
        };
    }, [plan.images.length]);

    // Handle hover for desktop
    const handleMouseEnter = () => {
        if (window.innerWidth >= 1024) { // Only on desktop
            setIsHovered(true);
            if (plan.images.length > 1) {
                setCurrentImageIndex(1); // switch to the second image
            }
        }
    };

    const handleMouseLeave = () => {
        if (window.innerWidth >= 1024) { // Only on desktop
            setIsHovered(false);
            setCurrentImageIndex(0); // revert to the first image
        }
    };

    const handleDownloadClick = () => {
        setSelectedPdf(plan.pdfUrl);
        setIsFormOpen(true);

        // Trigger download
        const link = document.createElement('a');
        link.href = plan.pdfUrl;
        link.download = `${plan.type}.pdf`;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    let price = "";
    if (plan.type.startsWith("2BHK")) price = "1.5 Cr* ONWARDS";
    else if (plan.type.includes("3BHK LUX - 2305")) price = "3.2 cr onwards";
    else if (plan.type.startsWith("3BHK LUX")) price = "₹3 Cr onwards";
    else if (plan.type.startsWith("3BHK")) price = "2.52Cr* ONWARDS";
    else if (plan.type.startsWith("4BHK")) price = "2.52Cr* ONWARDS";

    return (
        <div
            className={`bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col relative w-full max-w-xs sm:max-w-sm min-w-0 transition-transform duration-300 hover:scale-105 hover:shadow-xl ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-white text-xs font-semibold z-10" style={{ background: '#B9105E' }}>{price}</span>
            <div className="relative w-full h-56 bg-gray-100">
                {plan.images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`${plan.type} - View ${index + 1}`}
                        className={`absolute inset-0 w-full h-full object-cover floor-plan-image transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'} ${index === 1 ? 'blur-[3px]' : ''}`}
                        width="500"
                        height="400"
                        loading="lazy"
                    />
                ))}
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between min-w-0">
                <h3 className="text-xl font-bold mb-4 text-primary break-words">{plan.type}</h3>
                <Button
                    variant="default"
                    className="w-full gap-2 mt-auto"
                    onClick={handleDownloadClick}
                >
                    <Download className="h-4 w-4" />
                    Know more about floor plan
                </Button>
            </div>
        </div>
    );
};

export const FloorPlanSectionDirect = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedPdf, setSelectedPdf] = useState("");
    const { ref, isVisible } = useScrollAnimation();

    const floorPlanTiles = [
        {
            type: "2BHK - 1193sqft",
            images: ["/Assets/godrej-2bhk%20.png", "/Assets/2bhk_floor_plan.webp"],
            pdfUrl: "/Assets/floor_planpdf/2bkplan.pdf"
        },
        {
            type: "2BHK - 1242sqft",
            images: ["/Assets/godrej-2bhk2.png", "/Assets/2bhk_floor_plan.webp"],
            pdfUrl: "/Assets/floor_planpdf/2bkplan.pdf"
        },
        {
            type: "3BHK Premium - 1800 sqft",
            images: ["/Assets/godrej-3bhk%20.png", "/Assets/3bhk_prmium_floor_plan.webp"],
            pdfUrl: "/Assets/floor_planpdf/3bhkpremium.pdf"
        },
        {
            type: "3BHK LUX - 2185 sqft",
            images: ["/Assets/3bhk-lux.png", "/Assets/3bhk_lux_floor plan.webp"],
            pdfUrl: "/Assets/floor_planpdf/3bhklux.pdf"
        },
        {
            type: "3BHK LUX - 2305 sqft",
            images: ["/Assets/3bhk-lux-(1).png", "/Assets/3bhk_lux_floor plan.webp"],
            pdfUrl: "/Assets/floor_planpdf/3bhklux.pdf"
        }
    ];

    return (
        <>
            <section id="floor-plan" ref={ref} className={`pt-16 pb-16 bg-[#F6F7F9] overflow-x-hidden transition-opacity duration-700 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                <div className="max-w-6xl mx-auto px-2 sm:px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            <span className="text-primary">Godrej Woods Bangalore</span>
                            <br />Floor Plans
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                            Explore our thoughtfully designed floor plans that maximize space utilization
                            while ensuring optimal ventilation and natural light in every home.
                        </p>
                    </div>

                    {/* Floor Plan Tiles Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {floorPlanTiles.slice(0, 3).map((plan) => (
                            <FloorPlanCard
                                key={plan.type}
                                plan={plan}
                                setIsFormOpen={setIsFormOpen}
                                setSelectedPdf={setSelectedPdf}
                                className="mx-auto"
                            />
                        ))}
                        <div className="col-span-1 sm:col-span-2 md:col-span-3 mt-10">
                            <div className="flex justify-center gap-6 flex-wrap">
                                {floorPlanTiles.slice(3).map((plan) => (
                                    <FloorPlanCard
                                        key={plan.type}
                                        plan={plan}
                                        setIsFormOpen={setIsFormOpen}
                                        setSelectedPdf={setSelectedPdf}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Floor Plan Highlights */}
                </div>
            </section>
            <ContactForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                title="Know more about floor plan"
                subtitle="Fill the form to get detailed floor plan layouts, unit sizes, and complete configuration information. Our team will share the complete plan and assist you with all your queries."
                ctaText="Get Floor Plan Details"
            />
        </>
    );
};
