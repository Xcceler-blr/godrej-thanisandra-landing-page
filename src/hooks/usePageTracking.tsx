import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/lib/analytics';

export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view using our centralized analytics helper
    trackPageView(location.pathname + location.search, document.title);
  }, [location]);
};
