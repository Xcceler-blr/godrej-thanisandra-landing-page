import { useEffect } from 'react';

export const PerformanceMonitor = () => {
  useEffect(() => {
    // Monitor Core Web Vitals
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
        
        // Send to analytics if needed
        if (window.gtag) {
          window.gtag('event', 'LCP', {
            value: Math.round(lastEntry.startTime),
            event_category: 'Performance'
          });
        }
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          console.log('FID:', entry.processingStart - entry.startTime);
          
          if (window.gtag) {
            window.gtag('event', 'FID', {
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
            console.log('CLS:', clsValue);
            
            if (window.gtag) {
              window.gtag('event', 'CLS', {
                value: Math.round(clsValue * 1000) / 1000,
                event_category: 'Performance'
              });
            }
          }
        });
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    }

    // Monitor mobile-specific metrics
    const checkMobilePerformance = () => {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      if (isMobile) {
        // Monitor memory usage
        if ('memory' in performance) {
          const memory = (performance as any).memory;
          console.log('Memory Usage:', {
            used: Math.round(memory.usedJSHeapSize / 1048576) + ' MB',
            total: Math.round(memory.totalJSHeapSize / 1048576) + ' MB',
            limit: Math.round(memory.jsHeapSizeLimit / 1048576) + ' MB'
          });
        }

        // Monitor battery if available
        if ('getBattery' in navigator) {
          navigator.getBattery().then((battery) => {
            console.log('Battery Level:', Math.round(battery.level * 100) + '%');
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
  }, []);

  return null; // This component doesn't render anything
}; 