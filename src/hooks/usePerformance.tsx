import { useEffect, useState } from 'react';

export const usePerformance = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSlowConnection, setIsSlowConnection] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      setIsMobile(isMobileDevice);
    };

    // Check connection speed
    const checkConnectionSpeed = () => {
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        const isSlow = connection.effectiveType === 'slow-2g' || 
                      connection.effectiveType === '2g' || 
                      connection.effectiveType === '3g';
        setIsSlowConnection(isSlow);
      }
    };

    checkMobile();
    checkConnectionSpeed();

    // Listen for connection changes
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      connection.addEventListener('change', checkConnectionSpeed);
      
      return () => {
        connection.removeEventListener('change', checkConnectionSpeed);
      };
    }
  }, []);

  // Optimize images based on connection
  const getOptimizedImageSrc = (src: string, mobileSrc?: string) => {
    if (isMobile && mobileSrc) {
      return mobileSrc;
    }
    return src;
  };

  // Reduce animations on slow connections
  const shouldReduceMotion = isSlowConnection;

  return {
    isMobile,
    isSlowConnection,
    getOptimizedImageSrc,
    shouldReduceMotion,
  };
}; 