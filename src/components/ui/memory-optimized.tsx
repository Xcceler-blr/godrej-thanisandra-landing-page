import React, { Component, ComponentType, useEffect, useRef, useCallback } from 'react';

// HOC for class components
export function withMemoryOptimization<P extends object>(
  WrappedComponent: ComponentType<P>
) {
  return class MemoryOptimizedComponent extends Component<P> {
    private cleanupFunctions: (() => void)[] = [];
    private eventListeners: Array<{ element: EventTarget; type: string; handler: EventListener }> = [];

    componentWillUnmount() {
      // Clean up all registered cleanup functions
      this.cleanupFunctions.forEach(cleanup => cleanup());
      this.cleanupFunctions = [];

      // Remove all event listeners
      this.eventListeners.forEach(({ element, type, handler }) => {
        element.removeEventListener(type, handler);
      });
      this.eventListeners = [];
    }

    // Register cleanup function
    registerCleanup = (cleanup: () => void) => {
      this.cleanupFunctions.push(cleanup);
    }

    // Register event listener with automatic cleanup
    addEventListener = (element: EventTarget, type: string, handler: EventListener) => {
      element.addEventListener(type, handler);
      this.eventListeners.push({ element, type, handler });
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}

// Hook for functional components
export function useMemoryOptimization() {
  const cleanupFunctions = useRef<(() => void)[]>([]);
  const eventListeners = useRef<Array<{ element: EventTarget; type: string; handler: EventListener }>>([]);

  // Register cleanup function
  const registerCleanup = useCallback((cleanup: () => void) => {
    cleanupFunctions.current.push(cleanup);
  }, []);

  // Add event listener with automatic cleanup
  const addEventListener = useCallback((element: EventTarget, type: string, handler: EventListener) => {
    element.addEventListener(type, handler);
    eventListeners.current.push({ element, type, handler });
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Execute all cleanup functions
      cleanupFunctions.current.forEach(cleanup => cleanup());
      cleanupFunctions.current = [];

      // Remove all event listeners
      eventListeners.current.forEach(({ element, type, handler }) => {
        element.removeEventListener(type, handler);
      });
      eventListeners.current = [];
    };
  }, []);

  return { registerCleanup, addEventListener };
}

// Memory-optimized wrapper component
interface MemoryOptimizedWrapperProps {
  children: React.ReactNode;
  maxRenders?: number;
  cleanupOnUnmount?: boolean;
}

export const MemoryOptimizedWrapper: React.FC<MemoryOptimizedWrapperProps> = ({
  children,
  maxRenders = 1000,
  cleanupOnUnmount = true
}) => {
  const renderCount = useRef(0);
  const { registerCleanup } = useMemoryOptimization();

  // Track render count
  useEffect(() => {
    renderCount.current += 1;
    
    if (renderCount.current > maxRenders) {
      console.warn(`Component rendered ${renderCount.current} times. Consider optimizing.`);
    }
  });

  // Memory cleanup on unmount
  useEffect(() => {
    if (cleanupOnUnmount) {
      registerCleanup(() => {
        // Clear any cached data
        if ('caches' in window) {
          caches.keys().then(cacheNames => {
            cacheNames.forEach(cacheName => {
              if (cacheName.includes('dynamic')) {
                caches.delete(cacheName);
              }
            });
          });
        }

        // Clear any stored references
        renderCount.current = 0;
      });
    }
  }, [cleanupOnUnmount, registerCleanup]);

  return <>{children}</>;
};

// Memory-optimized image component
interface MemoryOptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export const MemoryOptimizedImage: React.FC<MemoryOptimizedImageProps> = ({
  src,
  alt,
  className,
  width,
  height,
  priority = false
}) => {
  const { registerCleanup } = useMemoryOptimization();
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current) {
      registerCleanup(() => {
        // Clear image source to free memory
        if (imgRef.current) {
          imgRef.current.src = '';
          imgRef.current.srcset = '';
        }
      });
    }
  }, [registerCleanup]);

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
    />
  );
};
