import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PerformanceMonitor } from "@/components/PerformanceMonitor";

const queryClient = new QueryClient();

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
