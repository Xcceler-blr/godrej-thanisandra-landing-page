import { useEffect } from 'react';

export const PerformanceMonitor = () => {
  useEffect(() => {
    // Monitor Core Web Vitals
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        
        // Send to analytics if needed
        if ((window as any).gtag) {
          (window as any).gtag('event', 'LCP', {
            value: Math.round(lastEntry.startTime),
            event_category: 'Performance'
          });
        }
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if ((window as any).gtag) {
            (window as any).gtag('event', 'FID', {
              value: Math.round(entry.processingStart - entry.startTime),
              event_category: 'Performance'
            });
          }
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            
            if ((window as any).gtag) {
              (window as any).gtag('event', 'CLS', {
                value: Math.round(clsValue * 1000) / 1000,
                event_category: 'Performance'
              });
            }
          }
        });
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });

      // Monitor mobile-specific metrics
      const checkMobilePerformance = () => {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isMobile) {
          // Monitor memory usage
          if ('memory' in performance) {
            const memory = (performance as any).memory;
            // Memory monitoring disabled for cleaner console
          }

          // Monitor battery if available
          if ('getBattery' in navigator) {
            (navigator as any).getBattery().then((battery: any) => {
              // Battery monitoring disabled for cleaner console
            });
          }
        }
      };

      // Check performance after page load
      window.addEventListener('load', () => {
        setTimeout(checkMobilePerformance, 1000);
      });

      return () => {
        lcpObserver?.disconnect();
        fidObserver?.disconnect();
        clsObserver?.disconnect();
      };
    }
  }, []);

  return null; // This component doesn't render anything
}; 