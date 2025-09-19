import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PerformanceMonitor } from "@/components/PerformanceMonitor";
import Navbar from "@/components/Navbar";
import { AutoPopupForm } from "@/components/AutoPopupForm";
import { FloatingConsultButton } from "@/components/FloatingConsultButton";

// Optimized QueryClient with memory management
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Reduce memory usage with shorter stale times
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

const App = ({ children }: { children?: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <PerformanceMonitor />
      <Toaster />
      <Sonner />
      <Navbar />
      <AutoPopupForm />
      <FloatingConsultButton />
      {children}
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
