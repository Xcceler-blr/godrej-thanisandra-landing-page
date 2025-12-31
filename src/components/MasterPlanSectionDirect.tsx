import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "./ContactForm";
import { Download, Map } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const MasterPlanSectionDirect = () => {
    const { ref, isVisible } = useScrollAnimation();
    const [isFormOpen, setIsFormOpen] = useState(false);

    const downloadOptions = [
        {
            title: "Master Plan",
            description: "Complete layout and site plan",
            icon: Map,
            format: "PDF",
            size: "2.3 MB",
            downloadUrl: "/Assets/GodrejwoodsMasterPlan.pdf"
        },
        {
            title: "Brochure",
            description: "Complete project brochure with details",
            icon: Download,
            format: "PDF",
            size: "8.5 MB",
            downloadUrl: "/Assets/Godrejwoods_brochure.pdf"
        }
    ];

    const handleDirectDownload = (url: string, title: string) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = title;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            <section ref={ref} className={`pt-16 pb-16 bg-[#EAF3FB] transition-opacity duration-700 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            Godrej Woods Thanisandra <span className="text-primary">Master Plan</span>
                            <br />& Project Details
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                            Explore every detail of your future home — from world-class amenities to complete project plans, all in one place.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-center mb-0">
                        <div>
                            <img
                                src="/Assets/godrej thanisandra blr.webp"
                                alt="Godrej Thanisandra Building"
                                className="rounded-2xl shadow-2xl w-full h-[660px] object-cover master-plan-image"
                                width="800"
                                height="600"
                                loading="lazy"
                            />
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-4">
                                <p className="text-muted-foreground leading-relaxed">
                                    As a resident of Godrej Woods, you will enjoy an exclusive range of lifestyle amenities, including:
                                </p>
                                <ul className="space-y-2 text-muted-foreground">
                                    <li className="flex items-start">
                                        <span className="text-primary mr-2">•</span>
                                        A state-of-the-art clubhouse with indoor and outdoor leisure facilities
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-primary mr-2">•</span>
                                        Swimming pool, gymnasium, yoga deck, and landscaped gardens
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-primary mr-2">•</span>
                                        Dedicated children's play zones and multipurpose courts
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-primary mr-2">•</span>
                                        24/7 security, power backup, and sustainable green features
                                    </li>
                                </ul>
                            </div>

                            <h3 className="text-2xl md:text-3xl font-bold">
                                Comprehensive Project <span className="text-primary">Documentation</span>
                            </h3>

                            <p className="text-muted-foreground leading-relaxed">
                                Access detailed project documentation including master plans, floor plans,
                                amenity layouts, and pricing information. Our comprehensive documentation
                                package provides all the information you need to understand the project scope
                                and make an informed investment decision.
                            </p>

                            <div className="grid gap-4">
                                {downloadOptions.map((option, index) => {
                                    const IconComponent = option.icon;
                                    return (
                                        <div
                                            key={index}
                                            className="flex items-center gap-4 p-4 bg-background rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                                            onClick={() => handleDirectDownload(option.downloadUrl, option.title)}
                                            role="button"
                                            aria-label={`Download ${option.title}`}
                                        >
                                            <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
                                                <IconComponent className="h-6 w-6 text-primary" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-foreground text-[20px]">{option.title}</h4>
                                                <p className="text-sm text-muted-foreground">{option.description}</p>
                                            </div>
                                            <Download className="h-5 w-5 text-primary" />
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="flex flex-col gap-4">
                                <Button
                                    variant="default"
                                    size="lg"
                                    className="gap-2 !bg-[#B9105E] !text-white !text-[20px] !border-none hover:!bg-[#a00d4e]"
                                    onClick={() => setIsFormOpen(true)}
                                >
                                    Request a Callback
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ContactForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                title="Master Plan - Request a Callback"
            />
        </>
    );
};
