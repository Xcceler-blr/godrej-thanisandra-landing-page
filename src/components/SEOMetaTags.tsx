import { useEffect } from 'react';

interface SEOMetaTagsProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  noindex?: boolean;
}

export const SEOMetaTags: React.FC<SEOMetaTagsProps> = ({
  title,
  description,
  canonical = 'https://www.godrejpropertiez.in/',
  ogTitle,
  ogDescription,
  ogImage = 'https://www.godrejpropertiez.in/Assets/godrej-master.png',
  ogUrl,
  noindex = false,
}) => {
  useEffect(() => {
    // Update page title
    if (title) {
      document.title = title;
    }

    // Update or create meta description
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', description);
    }

    // Update or create canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonical);

    // Handle noindex
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (noindex) {
      if (!robotsMeta) {
        robotsMeta = document.createElement('meta');
        robotsMeta.setAttribute('name', 'robots');
        document.head.appendChild(robotsMeta);
      }
      robotsMeta.setAttribute('content', 'noindex, nofollow');
    } else if (robotsMeta) {
      robotsMeta.setAttribute('content', 'index, follow');
    }

    // Open Graph meta tags
    const ogTags = [
      { property: 'og:title', content: ogTitle || title },
      { property: 'og:description', content: ogDescription || description },
      { property: 'og:image', content: ogImage },
      { property: 'og:url', content: ogUrl || canonical },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Godrej Thanisandra' },
    ];

    ogTags.forEach(({ property, content }) => {
      if (content) {
        let ogMeta = document.querySelector(`meta[property="${property}"]`);
        if (!ogMeta) {
          ogMeta = document.createElement('meta');
          ogMeta.setAttribute('property', property);
          document.head.appendChild(ogMeta);
        }
        ogMeta.setAttribute('content', content);
      }
    });

    // Twitter Card meta tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: ogTitle || title },
      { name: 'twitter:description', content: ogDescription || description },
      { name: 'twitter:image', content: ogImage },
    ];

    twitterTags.forEach(({ name, content }) => {
      if (content) {
        let twitterMeta = document.querySelector(`meta[name="${name}"]`);
        if (!twitterMeta) {
          twitterMeta = document.createElement('meta');
          twitterMeta.setAttribute('name', name);
          document.head.appendChild(twitterMeta);
        }
        twitterMeta.setAttribute('content', content);
      }
    });

  }, [title, description, canonical, ogTitle, ogDescription, ogImage, ogUrl, noindex]);

  return null;
};

export default SEOMetaTags;