// Cache Configuration and Memory Management
export interface CacheConfig {
  maxSize: number;
  maxAge: number;
  cleanupInterval: number;
  enableCompression: boolean;
  enableServiceWorker: boolean;
}

export const DEFAULT_CACHE_CONFIG: CacheConfig = {
  maxSize: 50 * 1024 * 1024, // 50MB
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
  cleanupInterval: 5 * 60 * 1000, // 5 minutes
  enableCompression: true,
  enableServiceWorker: true,
};

// Cache strategies
export enum CacheStrategy {
  CACHE_FIRST = 'cache-first',
  NETWORK_FIRST = 'network-first',
  STALE_WHILE_REVALIDATE = 'stale-while-revalidate',
  NETWORK_ONLY = 'network-only',
  CACHE_ONLY = 'cache-only',
}

// Cache configuration for different asset types
export const ASSET_CACHE_CONFIG = {
  images: {
    strategy: CacheStrategy.CACHE_FIRST,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    maxSize: 20 * 1024 * 1024, // 20MB
  },
  scripts: {
    strategy: CacheStrategy.STALE_WHILE_REVALIDATE,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    maxSize: 10 * 1024 * 1024, // 10MB
  },
  styles: {
    strategy: CacheStrategy.STALE_WHILE_REVALIDATE,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    maxSize: 5 * 1024 * 1024, // 5MB
  },
  fonts: {
    strategy: CacheStrategy.CACHE_FIRST,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    maxSize: 5 * 1024 * 1024, // 5MB
  },
  api: {
    strategy: CacheStrategy.NETWORK_FIRST,
    maxAge: 5 * 60 * 1000, // 5 minutes
    maxSize: 10 * 1024 * 1024, // 10MB
  },
};

// Memory management configuration
export const MEMORY_CONFIG = {
  // Heap usage thresholds
  warningThreshold: 0.7, // 70% of heap limit
  criticalThreshold: 0.9, // 90% of heap limit
  
  // Cleanup intervals
  memoryCheckInterval: 10 * 1000, // 10 seconds
  cleanupInterval: 2 * 60 * 1000, // 2 minutes
  
  // Cache limits
  maxCacheEntries: 100,
  maxImageCacheSize: 50,
  
  // Storage limits
  maxLocalStorageSize: 5 * 1024 * 1024, // 5MB
  maxSessionStorageSize: 2 * 1024 * 1024, // 2MB
};

// Cache key generation
export const generateCacheKey = (url: string, strategy: CacheStrategy): string => {
  const timestamp = Math.floor(Date.now() / (5 * 60 * 1000)); // 5-minute intervals
  return `${strategy}-${timestamp}-${url}`;
};

// Cache size calculation
export const calculateCacheSize = async (cache: Cache): Promise<number> => {
  let totalSize = 0;
  const requests = await cache.keys();
  
  for (const request of requests) {
    const response = await cache.match(request);
    if (response) {
      const blob = await response.blob();
      totalSize += blob.size;
    }
  }
  
  return totalSize;
};

// Memory usage monitoring
export const getMemoryInfo = () => {
  if ('memory' in performance) {
    const memory = (performance as any).memory;
    return {
      used: memory.usedJSHeapSize,
      total: memory.totalJSHeapSize,
      limit: memory.jsHeapSizeLimit,
      usage: memory.usedJSHeapSize / memory.jsHeapSizeLimit,
    };
  }
  return null;
};

// Cache cleanup utilities
export const cleanupExpiredCache = async (cache: Cache, maxAge: number) => {
  const requests = await cache.keys();
  const now = Date.now();
  
  for (const request of requests) {
    const response = await cache.match(request);
    if (response) {
      const cacheTime = response.headers.get('cache-time');
      if (cacheTime && (now - parseInt(cacheTime)) > maxAge) {
        await cache.delete(request);
      }
    }
  }
};

export const cleanupOldCacheEntries = async (cache: Cache, maxEntries: number) => {
  const requests = await cache.keys();
  
  if (requests.length > maxEntries) {
    const requestsToDelete = requests.slice(0, requests.length - maxEntries);
    await Promise.all(requestsToDelete.map(request => cache.delete(request)));
  }
};

// Performance monitoring
export const monitorCachePerformance = () => {
  if ('performance' in window) {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'resource') {
          const resourceEntry = entry as PerformanceResourceTiming;
          if (resourceEntry.transferSize === 0) {
            // Resource served from cache
            console.log('Cache hit:', resourceEntry.name);
          }
        }
      });
    });
    
    observer.observe({ entryTypes: ['resource'] });
    
    return observer;
  }
  return null;
};

// Export configuration
export const cacheConfig = {
  ...DEFAULT_CACHE_CONFIG,
  assets: ASSET_CACHE_CONFIG,
  memory: MEMORY_CONFIG,
  strategies: CacheStrategy,
};
