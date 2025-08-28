import { useEffect } from 'react';

export const PerformanceOptimizer = () => {
  useEffect(() => {
    // Preload critical images
    const preloadImages = () => {
      const criticalImages = [
        '/Assets/Godrej.png',
        '/Assets/godrej-master.png',
        '/Assets/godrej-2bhk .png',
        '/Assets/godrej-3bhk .png'
      ];

      criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      });
    };

    // Optimize images for better performance
    const optimizeImages = () => {
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        // Add loading="lazy" for non-critical images
        if (!img.classList.contains('critical-image')) {
          img.loading = 'lazy';
        }
        
        // Add decoding="async" for better performance
        img.decoding = 'async';
        
        // Add fetchpriority for critical images
        if (img.classList.contains('critical-image')) {
          img.fetchPriority = 'high';
        }
      });
    };

    // Preconnect to external domains
    const preconnectDomains = () => {
      const domains = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
        'https://www.googletagmanager.com',
        'https://www.google-analytics.com'
      ];

      domains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        if (domain.includes('fonts.gstatic.com')) {
          link.crossOrigin = 'anonymous';
        }
        document.head.appendChild(link);
      });
    };

    // Optimize fonts loading
    const optimizeFonts = () => {
      // Add font-display: swap for better performance
      const style = document.createElement('style');
      style.textContent = `
        @font-face {
          font-family: 'Inter';
          font-display: swap;
        }
      `;
      document.head.appendChild(style);
    };

    // Initialize performance optimizations
    preloadImages();
    preconnectDomains();
    optimizeFonts();
    
    // Run image optimization after DOM is loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', optimizeImages);
    } else {
      optimizeImages();
    }

    // Cleanup function
    return () => {
      // Remove any dynamically added elements if needed
    };
  }, []);

  return null; // This component doesn't render anything
};
