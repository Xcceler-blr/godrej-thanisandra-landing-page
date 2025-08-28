// Analytics helper functions for tracking user interactions

export const trackFormSubmission = (formType: string, formData: any) => {
  // Track in Google Tag Manager
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'form_submission',
      form_type: formType,
      form_data: formData,
      timestamp: new Date().toISOString()
    });
  }

  // Track in Google Analytics 4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'form_submit', {
      form_type: formType,
      form_name: formData.name,
      form_email: formData.email,
      form_phone: formData.phone,
      page_location: window.location.href,
      page_title: document.title
    });
  }

  // Track in Facebook Pixel
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead', {
      content_name: formType,
      content_category: 'form_submission'
    });
  }

  // Track in HubSpot
  if (typeof window !== 'undefined' && window._hsq) {
    window._hsq.push(['trackEvent', {
      id: 'form_submission',
      value: formType
    }]);
  }
};

export const trackThankYouPageVisit = (source: string) => {
  // Track in Google Tag Manager
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'thank_you_page_visit',
      source: source,
      timestamp: new Date().toISOString()
    });
  }

  // Track in Google Analytics 4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: 'Thank You Page',
      page_location: window.location.href,
      source: source
    });
  }

  // Track conversion in Facebook Pixel
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'CompleteRegistration', {
      content_name: 'Thank You Page',
      source: source
    });
  }

  // Track in HubSpot
  if (typeof window !== 'undefined' && window._hsq) {
    window._hsq.push(['trackEvent', {
      id: 'thank_you_page_visit',
      value: source
    }]);
  }
};

export const trackPageView = (pagePath: string, pageTitle: string) => {
  // Track in Google Tag Manager
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'page_view',
      page_path: pagePath,
      page_title: pageTitle,
      timestamp: new Date().toISOString()
    });
  }

  // Track in Google Analytics 4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: pagePath,
      page_title: pageTitle
    });
  }
};
