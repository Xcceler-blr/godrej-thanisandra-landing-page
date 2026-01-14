import React from "react";
import SEOMetaTags from "@/components/SEOMetaTags";
import Footer from "@/components/Footer";

const sectionClass = "mb-8";
const headingClass = "text-2xl md:text-3xl font-bold mb-4 text-primary";
const subheadingClass = "text-xl font-semibold mb-2 text-secondary";
const paragraphClass = "text-base md:text-lg text-muted-foreground mb-4";
const listClass = "list-disc pl-6 mb-4 text-base md:text-lg text-muted-foreground";

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-background">
            <SEOMetaTags
                title="About Us | Metro Experts"
                description="Learn about Metro Experts, a trusted real estate consultancy and RERA-registered agent in Bangalore. Authorized channel partner for Godrej Properties."
                canonical="https://www.godrejpropertiez.in/about-us"
                ogTitle="About Us | Metro Experts"
                ogDescription="Learn about Metro Experts, a trusted real estate consultancy in Bangalore. Authorized channel partner for Godrej Properties."
                ogUrl="https://www.godrejpropertiez.in/about-us"
            />

            <div className="py-24 px-4 md:px-0 flex justify-center">
                <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl p-8 md:p-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-8 text-primary text-center">About Us</h1>

                    <div className={sectionClass}>
                        <p className={paragraphClass}>
                            Metro Experts is a trusted real estate consultancy and RERA-registered agent, committed to delivering transparent, reliable, and customer-focused property solutions across Bangalore.
                        </p>
                        <p className={paragraphClass}>
                            We are registered with the Real Estate Regulatory Authority (RERA) under RERA No: <strong>AGENT RERA: PRM/KA/RERA/1251/446/AG/171011/001148</strong>, ensuring full compliance with regulatory standards and ethical business practices.
                        </p>
                        <p className={paragraphClass}>
                            With deep market expertise and strong industry relationships, Metro Experts specializes in residential and investment-focused properties, helping homebuyers and investors make informed decisions with confidence.
                        </p>
                    </div>

                    <div className={sectionClass}>
                        <h2 className={headingClass}>Our Industry Partnerships</h2>
                        <p className={paragraphClass}>
                            We are proud to be an authorized channel partner for <strong>Godrej Properties</strong> and collaborate with several other leading and reputed real estate developers in Bangalore. These partnerships allow us to offer our clients access to premium projects, early-stage opportunities, accurate pricing insights, and verified property information across key growth corridors of the city.
                        </p>
                    </div>

                    <div className={sectionClass}>
                        <h2 className={headingClass}>Our Commitment to Transparency & Privacy</h2>
                        <p className={paragraphClass}>
                            At Metro Experts, your trust and privacy matter to us.
                        </p>
                        <p className={paragraphClass}>
                            We prioritize the protection of your personal information. Our concise Privacy Policy explains:
                        </p>
                        <ul className={listClass}>
                            <li>What personal information we collect through our website, sub-domains, and microsites</li>
                            <li>The purposes for which this information is collected</li>
                            <li>How and with whom the information may be shared</li>
                            <li>The security measures we have in place to safeguard your data</li>
                            <li>Your rights, choices, and how to contact us for any privacy-related concerns</li>
                        </ul>
                        <p className={paragraphClass}>
                            We strongly recommend reviewing our Privacy Policy before using our services or submitting any personal information.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AboutUs;
