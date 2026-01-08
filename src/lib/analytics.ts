// Type declarations for Google Tag Manager
interface Window {
  dataLayer: any[];
}

declare global {
  interface Window {
    dataLayer: any[];
  }
}

// Type definitions for analytics events
export interface FormSubmitSuccessEvent {
  event: 'form_submit_success';
  formName: string;
  formType?: string;
  formSource?: string;
  userName?: string;
  userPhone?: string;
}

// Analytics helper functions
export const pushToDataLayer = (data: FormSubmitSuccessEvent) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(data);
};
