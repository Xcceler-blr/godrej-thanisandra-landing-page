import { useEffect, useRef, useCallback } from 'react';

interface MemoryMetrics {
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
}

interface UseMemoryManagementOptions {
  enableMonitoring?: boolean;
  cleanupInterval?: number;
  memoryThreshold?: number;
  onMemoryWarning?: (metrics: MemoryMetrics) => void;
}

export const useMemoryManagement = (options: UseMemoryManagementOptions = {}) => {
  const {
    enableMonitoring = true,
    cleanupInterval = 30000, // 30 seconds
    memoryThreshold = 0.8, // 80% of heap limit
    onMemoryWarning
  } = options;

  const cleanupIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const memoryCheckIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Get memory metrics if available
  const getMemoryMetrics = useCallback((): MemoryMetrics | null => {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      return {
        usedJSHeapSize: memory.usedJSHeapSize,
        totalJSHeapSize: memory.totalJSHeapSize,
        jsHeapSizeLimit: memory.jsHeapSizeLimit
      };
    }
    return null;
  }, []);

  // Check memory usage
  const checkMemoryUsage = useCallback(() => {
    const metrics = getMemoryMetrics();
    if (!metrics) return;

    const usageRatio = metrics.usedJSHeapSize / metrics.jsHeapSizeLimit;
    
    if (usageRatio > memoryThreshold) {
      console.warn('Memory usage is high:', {
        used: `${Math.round(metrics.usedJSHeapSize / 1024 / 1024)}MB`,
        total: `${Math.round(metrics.totalJSHeapSize / 1024 / 1024)}MB`,
        limit: `${Math.round(metrics.jsHeapSizeLimit / 1024 / 1024)}MB`,
        ratio: `${Math.round(usageRatio * 100)}%`
      });

      onMemoryWarning?.(metrics);
      
      // Force cleanup
      performMemoryCleanup();
    }
  }, [getMemoryMetrics, memoryThreshold, onMemoryWarning]);

  // Perform memory cleanup
  const performMemoryCleanup = useCallback(() => {
    // Clear image caches
    if ('caches' in window) {
      caches.keys().then(cacheNames => {
        cacheNames.forEach(cacheName => {
          if (cacheName.includes('dynamic')) {
            caches.delete(cacheName);
          }
        });
      });
    }

    // Clear localStorage if it's getting large
    if ('localStorage' in window) {
      try {
        const totalSize = JSON.stringify(localStorage).length;
        if (totalSize > 5 * 1024 * 1024) { // 5MB
          const keys = Object.keys(localStorage);
          keys.forEach(key => {
            if (!key.startsWith('persistent_')) {
              localStorage.removeItem(key);
            }
          });
        }
      } catch (error) {
        console.warn('localStorage cleanup failed:', error);
      }
    }

    // Clear sessionStorage
    if ('sessionStorage' in window) {
      sessionStorage.clear();
    }

    // Force garbage collection if available
    if ('gc' in window) {
      try {
        (window as any).gc();
      } catch (error) {
        // GC not available or failed
      }
    }

    console.log('Memory cleanup completed');
  }, []);

  // Start memory monitoring
  const startMemoryMonitoring = useCallback(() => {
    if (!enableMonitoring) return;

    // Check memory every 10 seconds
    memoryCheckIntervalRef.current = setInterval(checkMemoryUsage, 10000);

    // Perform cleanup every cleanupInterval
    cleanupIntervalRef.current = setInterval(performMemoryCleanup, cleanupInterval);

    // Cleanup on page visibility change
    const handleVisibilityChange = () => {
      if (document.hidden) {
        performMemoryCleanup();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup on page unload
    const handleBeforeUnload = () => {
      performMemoryCleanup();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [enableMonitoring, checkMemoryUsage, performMemoryCleanup, cleanupInterval]);

  // Stop memory monitoring
  const stopMemoryMonitoring = useCallback(() => {
    if (cleanupIntervalRef.current) {
      clearInterval(cleanupIntervalRef.current);
      cleanupIntervalRef.current = null;
    }

    if (memoryCheckIntervalRef.current) {
      clearInterval(memoryCheckIntervalRef.current);
      memoryCheckIntervalRef.current = null;
    }
  }, []);

  // Start monitoring on mount
  useEffect(() => {
    const cleanup = startMemoryMonitoring();

    return () => {
      cleanup?.();
      stopMemoryMonitoring();
    };
  }, [startMemoryMonitoring, stopMemoryMonitoring]);

  // Manual cleanup function
  const manualCleanup = useCallback(() => {
    performMemoryCleanup();
  }, [performMemoryCleanup]);

  // Get current memory status
  const getMemoryStatus = useCallback(() => {
    const metrics = getMemoryMetrics();
    if (!metrics) return null;

    return {
      ...metrics,
      usageRatio: metrics.usedJSHeapSize / metrics.jsHeapSizeLimit,
      isHighUsage: (metrics.usedJSHeapSize / metrics.jsHeapSizeLimit) > memoryThreshold
    };
  }, [getMemoryMetrics, memoryThreshold]);

  return {
    getMemoryStatus,
    performMemoryCleanup: manualCleanup,
    startMemoryMonitoring,
    stopMemoryMonitoring
  };
};
