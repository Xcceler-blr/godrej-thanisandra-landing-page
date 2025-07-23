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
    </div>
  );
};

export default Index;
