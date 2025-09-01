import React, { useState, useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
  placeholder = '/Assets/placeholder.svg',
  onLoad,
  onError,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [imageSrc, setImageSrc] = useState(priority ? src : placeholder);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before image comes into view
        threshold: 0.1,
      }
    );

    observerRef.current = observer;

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [priority]);

  // Load image when in view
  useEffect(() => {
    if (isInView && !isLoaded && !hasError) {
      const img = new Image();
      
      img.onload = () => {
        setImageSrc(src);
        setIsLoaded(true);
        onLoad?.();
      };

      img.onerror = () => {
        setHasError(true);
        setImageSrc(placeholder);
        onError?.();
      };

      img.src = src;
    }
  }, [isInView, src, isLoaded, hasError, onLoad, onError, placeholder]);

  // Memory cleanup
  useEffect(() => {
    return () => {
      // Clear any pending image loads
      if (imgRef.current) {
        imgRef.current.src = '';
      }
    };
  }, []);

  // Preload critical images
  const preloadImage = useCallback((imageSrc: string) => {
    if (priority && 'link' in document.createElement('link')) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = imageSrc;
      document.head.appendChild(link);
    }
  }, [priority]);

  useEffect(() => {
    if (priority) {
      preloadImage(src);
    }
  }, [src, priority, preloadImage]);

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          'transition-opacity duration-300',
          isLoaded ? 'opacity-100' : 'opacity-0',
          hasError && 'opacity-50'
        )}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
      />
      
      {/* Loading skeleton */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      
      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500 text-sm">
          Image not available
        </div>
      )}
    </div>
  );
};

// Hook for image preloading
export const useImagePreloader = () => {
  const preloadImage = useCallback((src: string) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = reject;
      img.src = src;
    });
  }, []);

  const preloadImages = useCallback(async (sources: string[]) => {
    try {
      await Promise.all(sources.map(preloadImage));
    } catch (error) {
      console.warn('Some images failed to preload:', error);
    }
  }, [preloadImage]);

  return { preloadImage, preloadImages };
};
