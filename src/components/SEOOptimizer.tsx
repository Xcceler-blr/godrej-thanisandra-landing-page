import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOOptimizerProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export const SEOOptimizer = ({ 
  title, 
  description, 
  keywords, 
  image, 
  url 
}: SEOOptimizerProps) => {
  const location = useLocation();

  useEffect(() => {
    // Update page title
    if (title) {
      document.title = title;
    }

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && description) {
      metaDescription.setAttribute('content', description);
    }

    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    if (keywords) {
      metaKeywords.setAttribute('content', keywords);
    }

    // Update Open Graph tags
    const updateOGTag = (property: string, content: string) => {
      let ogTag = document.querySelector(`meta[property="${property}"]`);
      if (!ogTag) {
        ogTag = document.createElement('meta');
        ogTag.setAttribute('property', property);
        document.head.appendChild(ogTag);
      }
      ogTag.setAttribute('content', content);
    };

    if (title) {
      updateOGTag('og:title', title);
    }
    if (description) {
      updateOGTag('og:description', description);
    }
    if (url) {
      updateOGTag('og:url', url);
    }
    if (image) {
      updateOGTag('og:image', image);
    }

    // Update Twitter Card tags
    const updateTwitterTag = (name: string, content: string) => {
      let twitterTag = document.querySelector(`meta[name="${name}"]`);
      if (!twitterTag) {
        twitterTag = document.createElement('meta');
        twitterTag.setAttribute('name', name);
        document.head.appendChild(twitterTag);
      }
      twitterTag.setAttribute('content', content);
    };

    if (title) {
      updateTwitterTag('twitter:title', title);
    }
    if (description) {
      updateTwitterTag('twitter:description', description);
    }
    if (image) {
      updateTwitterTag('twitter:image', image);
    }

    // Update canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', url || `https://www.godrejpropertiez.in${location.pathname}`);

    // Add structured data for better SEO
    const addStructuredData = () => {
      // Remove existing structured data
      const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
      existingScripts.forEach(script => {
        if (script.textContent && !script.textContent.includes('@context')) {
          script.remove();
        }
      });

      // Add page-specific structured data
      const pageData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": title || "Godrej Properties Thanisandra",
        "description": description || "Premium Apartments at Godrej Properties Thanisandra Bangalore",
        "url": url || `https://www.godrejpropertiez.in${location.pathname}`,
        "mainEntity": {
          "@type": "RealEstateListing",
          "name": "Godrej Thanisandra",
          "description": "Premium 2-3 BHK apartments in North Bangalore",
          "url": "https://www.godrejpropertiez.in"
        }
      };

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(pageData);
      document.head.appendChild(script);
    };

    addStructuredData();

    // Add breadcrumb navigation for better SEO
    const addBreadcrumbs = () => {
      const breadcrumbData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.godrejpropertiez.in"
          }
        ]
      };

      // Add current page to breadcrumbs
      if (location.pathname !== '/') {
        const pageName = location.pathname === '/thank-you' ? 'Thank You' :
                        location.pathname === '/privacy-policy' ? 'Privacy Policy' :
                        'Page';
        
        breadcrumbData.itemListElement.push({
          "@type": "ListItem",
          "position": 2,
          "name": pageName,
          "item": `https://www.godrejpropertiez.in${location.pathname}`
        });
      }

      const breadcrumbScript = document.createElement('script');
      breadcrumbScript.type = 'application/ld+json';
      breadcrumbScript.textContent = JSON.stringify(breadcrumbData);
      document.head.appendChild(breadcrumbScript);
    };

    addBreadcrumbs();

    // Cleanup function
    return () => {
      // Remove dynamically added structured data
      const dynamicScripts = document.querySelectorAll('script[type="application/ld+json"]');
      dynamicScripts.forEach(script => {
        if (script.textContent && script.textContent.includes('WebPage')) {
          script.remove();
        }
      });
    };
  }, [title, description, keywords, image, url, location.pathname]);

  return null; // This component doesn't render anything
};
