import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PerformanceOptimizer } from "@/components/PerformanceOptimizer";
import { SEOOptimizer } from "@/components/SEOOptimizer";
import Index from "./pages/Index";
import ThankYou from "./pages/ThankYou";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <PerformanceOptimizer />
      <SEOOptimizer 
        title="Premium Apartments at Godrej Properties Thanisandra Bangalore | 2-3 BHK Flats"
        description="Godrej Properties Thanisandra presents luxurious 2-3 BHK residential apartments in Bangalore's growing corridor. Modern amenities, strategic location & trusted brand. Starting from 1.53 Cr* onwards."
        keywords="Godrej Properties, Thanisandra, Bangalore apartments, 2 BHK flats, 3 BHK flats, luxury apartments, real estate Bangalore, residential projects"
        image="https://www.godrejpropertiez.in/Assets/godrej-master.png"
        url="https://www.godrejpropertiez.in"
      />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
      <Sonner />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
