/**
 * GTM DataLayer Utilities
 * Simple helper functions to push events to existing GTM dataLayer
 * Does NOT load any tracking scripts - only sends events to GTM
 */

declare global {
  interface Window {
    dataLayer: any[];
  }
}

/**
 * Push event to GTM dataLayer (GTM handles all script loading)
 */
export const pushToDataLayer = (eventData: Record<string, any>) => {
  if (typeof window === 'undefined' || !window.dataLayer) {
    console.warn('GTM dataLayer not available');
    return;
  }
  
  window.dataLayer.push({
    ...eventData,
    timestamp: new Date().toISOString()
  });
  
  console.log('GTM Event:', eventData);
};

/**
 * Track form submissions
 */
export const trackFormSubmission = (formName: string, formData?: Record<string, any>) => {
  pushToDataLayer({
    event: 'form_submit',
    form_name: formName,
    form_data: formData || {}
  });
};

/**
 * Track button clicks
 */
export const trackButtonClick = (buttonName: string, buttonLocation?: string) => {
  pushToDataLayer({
    event: 'button_click',
    button_name: buttonName,
    button_location: buttonLocation || 'unknown'
  });
};

/**
 * Track phone clicks
 */
export const trackPhoneClick = (phoneNumber: string, location?: string) => {
  pushToDataLayer({
    event: 'phone_click',
    phone_number: phoneNumber,
    click_location: location || 'unknown'
  });
};

/**
 * Track downloads
 */
export const trackDownload = (fileName: string, fileType?: string) => {
  pushToDataLayer({
    event: 'file_download',
    file_name: fileName,
    file_type: fileType || 'unknown'
  });
};

/**
 * Track section views for heatmap analysis
 */
export const trackSectionView = (sectionName: string) => {
  pushToDataLayer({
    event: 'section_view',
    section_name: sectionName
  });
};

export default pushToDataLayer;