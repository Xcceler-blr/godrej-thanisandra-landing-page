import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PerformanceMonitor } from "@/components/PerformanceMonitor";

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
      {children}
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
