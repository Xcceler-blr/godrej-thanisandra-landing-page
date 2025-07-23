import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ProjectHighlights } from "@/components/ProjectHighlights";
import { PricingSection } from "@/components/PricingSection";
import { MasterPlanSection } from "@/components/MasterPlanSection";
import { AmenitiesSection } from "@/components/AmenitiesSection";
import { FloorPlanSection } from "@/components/FloorPlanSection";
import { GallerySection } from "@/components/GallerySection";
import { LocationSection } from "@/components/LocationSection";
import { motion } from "framer-motion";

const fadeInProps = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.35 }
};

const Index = () => {
  return (
    <div className="min-h-screen">
      <motion.div {...fadeInProps}><HeroSection /></motion.div>
      <motion.div {...fadeInProps}><AboutSection /></motion.div>
      <motion.div {...fadeInProps}><MasterPlanSection /></motion.div>
      <motion.div {...fadeInProps}><FloorPlanSection /></motion.div>
      <motion.div {...fadeInProps}><ProjectHighlights /></motion.div>
      <motion.div {...fadeInProps}><AmenitiesSection /></motion.div>
      <motion.div {...fadeInProps}><LocationSection /></motion.div>
      <footer style={{ background: '#3b3b3b', color: 'white', fontSize: '8px', height: '20vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }} className="w-full px-2">
        <div>
          Marketed by authorized channel partner<br />
          Disclaimer : The content is for information purposes only and does not constitute an offer to avail of any service. Prices mentioned are subject to change without notice and properties mentioned are subject to availability. Images for representation purposes only. This is the official website of authorized marketing partner. We may share data with RERA registered brokers/companies for further processing. We may also send updates to the mobile number/email id registered with us. All Rights Reserved. AGENT RERA:PRM/KA/RERA/1251/446/AG/171011/001148
        </div>
      </footer>
    </div>
  );
};

export default Index;
