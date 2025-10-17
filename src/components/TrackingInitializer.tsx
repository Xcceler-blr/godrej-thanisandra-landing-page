import { useEffect } from 'react';

declare global {
  interface Window {
    hj: any;
    clarity: any;
    _hjSettings: any;
    CE2: any; // CrazyEgg
    FS: any; // FullStory
  }
}

export const TrackingInitializer = () => {
  useEffect(() => {
    // Only initialize tracking after hydration and in production
    const isProduction = window.location.hostname !== 'localhost' && 
                        window.location.hostname !== '127.0.0.1';
    
    if (!isProduction) {
      console.log('Tracking tools disabled in development mode');
      return;
    }

    // Initialize tracking after page is fully loaded
    if (document.readyState === 'complete') {
      initializeTracking();
    } else {
      window.addEventListener('load', initializeTracking);
      return () => window.removeEventListener('load', initializeTracking);
    }
  }, []);

  const initializeTracking = () => {
    try {
      // Initialize Hotjar if not already loaded
      if (typeof window.hj === 'undefined') {
        (function(h: any, o: any, t: any, j: any, a: any, r: any) {
          h.hj = h.hj || function() { (h.hj.q = h.hj.q || []).push(arguments) };
          h._hjSettings = { hjid: 'YOUR_HOTJAR_ID', hjsv: 6 }; // Replace with actual ID
          a = o.getElementsByTagName('head')[0];
          r = o.createElement('script');
          r.async = 1;
          r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
          a.appendChild(r);
        })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
        
        console.log('Hotjar initialized');
      }

      // Initialize Microsoft Clarity if not already loaded
      if (typeof window.clarity === 'undefined') {
        (function(c: any, l: any, a: any, r: any, i: any, t: any, y: any) {
          c[a] = c[a] || function() { (c[a].q = c[a].q || []).push(arguments) };
          t = l.createElement(r);
          t.async = 1;
          t.src = "https://www.clarity.ms/tag/" + i;
          y = l.getElementsByTagName(r)[0];
          y.parentNode.insertBefore(t, y);
        })(window, document, "clarity", "script", "YOUR_CLARITY_ID"); // Replace with actual ID
        
        console.log('Microsoft Clarity initialized');
      }

      // Note: For CrazyEgg and FullStory, you would add similar initialization code here
      // They are commented out as they require specific account setup and IDs

    } catch (error) {
      console.error('Error initializing tracking tools:', error);
    }
  };

  // This component doesn't render anything
  return null;
};

export default TrackingInitializer;