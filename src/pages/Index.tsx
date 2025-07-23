import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ProjectHighlights } from "@/components/ProjectHighlights";
import { PricingSection } from "@/components/PricingSection";
import { MasterPlanSection } from "@/components/MasterPlanSection";
import { AmenitiesSection } from "@/components/AmenitiesSection";
import { FloorPlanSection } from "@/components/FloorPlanSection";
import { GallerySection } from "@/components/GallerySection";
import { LocationSection } from "@/components/LocationSection";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

function AnimatedSection({ children, delay = 0 }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
  if (inView) controls.start({ opacity: 1, y: 0 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={controls}
      transition={{ duration: 0.7, delay, type: "spring", bounce: 0.18 }}
    >
      {children}
    </motion.div>
  );
}

const Index = () => {
  return (
    <div className="min-h-screen">
      <AnimatedSection><HeroSection /></AnimatedSection>
      <AnimatedSection delay={0.1}><AboutSection /></AnimatedSection>
      <AnimatedSection delay={0.2}><MasterPlanSection /></AnimatedSection>
      <AnimatedSection delay={0.3}><FloorPlanSection /></AnimatedSection>
      <AnimatedSection delay={0.4}><ProjectHighlights /></AnimatedSection>
      <AnimatedSection delay={0.5}><AmenitiesSection /></AnimatedSection>
      <AnimatedSection delay={0.6}><LocationSection /></AnimatedSection>
    </div>
  );
};

export default Index;
