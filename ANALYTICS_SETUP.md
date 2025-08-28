# Analytics Setup for Godrej Thanisandra Landing Page

## Overview

This project has been updated to use React Router for proper client-side routing and includes comprehensive analytics tracking for form submissions and page visits.

## What Was Fixed

### Before (Issue)
- The website was using `vite-react-ssg` which only changed URLs without loading new pages
- Form submissions redirected to `/thank-you` but it was just DOM manipulation
- Analytics tools couldn't track thank you page visits properly
- No proper page view tracking for route changes

### After (Solution)
- Switched to React Router for proper client-side routing
- Added comprehensive analytics tracking for all user interactions
- Form submissions now properly navigate to a new page
- Thank you page visits are properly tracked in analytics

## Analytics Tracking Features

### 1. Form Submission Tracking
- Tracks when users submit the contact form
- Captures form data (name, email, phone, source)
- Sends events to multiple analytics platforms:
  - Google Tag Manager
  - Google Analytics 4
  - Facebook Pixel
  - HubSpot

### 2. Thank You Page Tracking
- Tracks when users reach the thank you page
- Identifies the source of the form submission
- Sends conversion events to analytics platforms
- Properly tracks as a new page visit

### 3. Page View Tracking
- Tracks all route changes automatically
- Sends page view events to analytics platforms
- Works with React Router navigation

## Analytics Platforms Supported

### Google Tag Manager (GTM)
- Already configured in your HTML
- Tracks form submissions and page views
- Events are pushed to `dataLayer`

### Google Analytics 4
- Form submission events
- Page view tracking
- Thank you page conversion tracking

### Facebook Pixel
- Lead generation events
- Page view tracking
- Conversion tracking

### HubSpot
- Form submission tracking
- Page view tracking
- Event tracking

## How It Works

### Form Submission Flow
1. User fills out contact form
2. Form data is submitted to Google Forms and HubSpot
3. Analytics events are fired for form submission
4. User is redirected to `/thank-you` page with source parameter
5. Thank you page loads as a new page (not just URL change)
6. Analytics events are fired for thank you page visit

### Route Change Tracking
1. User navigates between pages
2. React Router handles the navigation
3. `usePageTracking` hook detects route changes
4. Analytics events are fired for new page views

## Files Modified

- `src/main.tsx` - Switched from vite-react-ssg to React Router
- `src/App.tsx` - Added routing and page tracking
- `src/components/ContactForm.tsx` - Added analytics tracking
- `src/pages/ThankYou.tsx` - Added analytics tracking
- `src/hooks/usePageTracking.tsx` - Created page tracking hook
- `src/lib/analytics.ts` - Created analytics helper functions
- `package.json` - Updated scripts and dependencies
- `vite.config.ts` - Removed SSG configuration

## Testing

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

## Analytics Events

### Form Submission Event
```javascript
{
  event: 'form_submission',
  form_type: 'About - Learn More About Godrej',
  form_data: {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '1234567890',
    source: 'About Section',
    page_url: 'https://example.com'
  },
  timestamp: '2024-01-01T00:00:00.000Z'
}
```

### Thank You Page Event
```javascript
{
  event: 'thank_you_page_visit',
  source: 'About Section',
  timestamp: '2024-01-01T00:00:00.000Z'
}
```

### Page View Event
```javascript
{
  event: 'page_view',
  page_path: '/thank-you?source=About%20Section',
  page_title: 'Thank You | Godrej Thanisandra',
  timestamp: '2024-01-01T00:00:00.000Z'
}
```

## Benefits

1. **Proper Page Tracking**: Analytics tools now properly track thank you page visits
2. **Better User Experience**: Users see actual page transitions instead of just URL changes
3. **Comprehensive Analytics**: All user interactions are tracked across multiple platforms
4. **SEO Friendly**: Proper page structure for search engines
5. **Conversion Tracking**: Better tracking of form submissions and conversions

## Troubleshooting

### Analytics Not Working
1. Check browser console for errors
2. Verify GTM is properly loaded
3. Check if analytics functions are defined in window object

### Routing Issues
1. Ensure React Router is properly installed
2. Check if routes are correctly defined in App.tsx
3. Verify navigation calls use `navigate()` function

### Build Issues
1. Run `npm install` to ensure all dependencies are installed
2. Clear `node_modules` and reinstall if needed
3. Check for TypeScript errors in the console
