/// <reference types="vite/client" />

// Global analytics function declarations
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    fbq: (...args: any[]) => void;
    _hsq: any[];
    dataLayer: any[];
  }
}

export {};
