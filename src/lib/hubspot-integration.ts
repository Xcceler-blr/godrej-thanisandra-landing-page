// HubSpot CRM Integration using Forms API (no token required)
export class HubSpotIntegration {
  // Your HubSpot Portal ID
  private static PORTAL_ID = '243445377';

  // Your HubSpot Form IDs
  private static FORM_IDS = {
    'download': '3249d79f-19c0-42b1-b0fb-a1ddbd8d85ce',
    'lead-capture': '3249d79f-19c0-42b1-b0fb-a1ddbd8d85ce',
    'site-visit': '3249d79f-19c0-42b1-b0fb-a1ddbd8d85ce',
    'booking-offer': '3249d79f-19c0-42b1-b0fb-a1ddbd8d85ce'
  };

  // Submit to HubSpot using Forms API (no token required)
  static async submitToForm(formType: 'download' | 'lead-capture' | 'site-visit' | 'booking-offer', data: {
    name: string;
    email?: string;
    phone: string;
    consent?: boolean;
    additionalData?: Record<string, string>;
    formName?: string;
  }) {
    const formId = this.FORM_IDS[formType];
    if (!formId) {
      throw new Error(`Form type '${formType}' not found`);
    }

    try {
      // Create form data using the correct HubSpot Forms API format
      const formData = new FormData();

      // Add the standard fields - using HubSpot's default field names
      formData.append('firstname', data.name);
      formData.append('mobilephone', data.phone); // This is HubSpot's standard phone field

      // Add optional fields if they exist
      if (data.email) {
        formData.append('email', data.email);
      }
      if (data.consent !== undefined) {
        formData.append('consent', data.consent ? 'Yes' : 'No');
      }

      // Add custom properties (now enabled since fields are added to HubSpot forms)
      // Use provided formName or fallback to formType
      formData.append('form_type', data.formName || formType);
      formData.append('source', data.additionalData?.source || 'Website Form');
      formData.append('page_url', window.location.href);

      // Add any additional data
      if (data.additionalData) {
        Object.entries(data.additionalData).forEach(([key, value]) => {
          // Skip source and page_url as they're already added above
          if (key !== 'source' && key !== 'page_url') {
            formData.append(key, value);
          }
        });
      }

      // Submit to HubSpot Forms API using the correct endpoint
      const response = await fetch(
        `https://forms.hubspot.com/uploads/form/v2/${this.PORTAL_ID}/${formId}`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (response.ok) {
        return { success: true };
      } else {
        console.error(`HubSpot form submission failed: ${response.status}`);
        return { success: false, error: `HTTP ${response.status}` };
      }

    } catch (error) {
      console.error('HubSpot form submission error:', error);
      return { success: false, error };
    }
  }

  // Submit to both existing form system and HubSpot
  static async submitToBoth(formType: 'download' | 'lead-capture' | 'site-visit' | 'booking-offer', data: {
    name: string;
    email?: string;
    phone: string;
    consent?: boolean;
    formName: string;
    additionalData?: Record<string, string>;
  }) {
    const promises = [];

    // Submit to existing form system (if any)
    // Add your existing form submission logic here
    // Example: Google Forms, custom API, etc.

    // Submit to HubSpot Forms API
    promises.push(
      this.submitToForm(formType, {
        name: data.name,
        email: data.email,
        phone: data.phone,
        consent: data.consent,
        additionalData: data.additionalData
      })
    );

    try {
      await Promise.allSettled(promises);
      // Form submitted successfully
    } catch (error) {
      console.error('Form submission error:', error);
      // Don't throw error, just log it
    }
  }
} 