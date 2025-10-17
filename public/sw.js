// Service Worker for Asset Caching and Memory Management
const CACHE_NAME = 'godrej-thanisandra-v1';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

// Development mode logging
if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
  console.log('Service Worker running in development mode');
}

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/Assets/favicon.ico',
  '/Assets/godrej-master.png',
  '/Assets/Godrej.png'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .catch((error) => {
        console.error('Cache installation failed:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  try {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') {
      return;
    }

    // Skip unsupported schemes (chrome-extension, data, etc.)
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return;
    }

    // Skip Chrome extension requests
    if (url.hostname === 'chrome-extension' || url.protocol === 'chrome-extension:') {
      return;
    }

    // Skip tracking and analytics requests - let browser handle these normally
    if (
      url.hostname.includes('hotjar') ||
      url.hostname.includes('crazyegg') ||
      url.hostname.includes('fullstory') ||
      url.hostname.includes('clarity') ||
      url.hostname.includes('googletagmanager') ||
      url.hostname.includes('google-analytics') ||
      url.hostname.includes('gtag') ||
      url.pathname.includes('tracking') ||
      url.pathname.includes('analytics') ||
      url.pathname.includes('heatmap') ||
      request.destination === 'document' && url.search.includes('utm_')
    ) {
      return; // Let browser handle these requests normally
    }

    // Handle different types of requests
    if (request.destination === 'image') {
      event.respondWith(handleImageRequest(request));
    } else if (request.destination === 'script' || request.destination === 'style') {
      event.respondWith(handleAssetRequest(request));
    } else {
      event.respondWith(handlePageRequest(request));
    }
  } catch (error) {
    console.error('Service Worker fetch error:', error);
    // Don't respond, let the browser handle the request normally
  }
});

// Handle image requests with memory-efficient caching
async function handleImageRequest(request) {
  try {
    const cache = await caches.open(DYNAMIC_CACHE);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }

    const response = await fetch(request);
    if (response.ok) {
      try {
        // Clone response before caching
        const responseToCache = response.clone();
        await cache.put(request, responseToCache);
      } catch (cacheError) {
        console.warn('Failed to cache image:', cacheError);
        // Continue without caching
      }
    }
    return response;
  } catch (error) {
    console.error('Image fetch failed:', error);
    // Return a placeholder or fallback
    return new Response('', { status: 404 });
  }
}

// Handle asset requests (JS, CSS)
async function handleAssetRequest(request) {
  try {
    const cache = await caches.open(STATIC_CACHE);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }

    const response = await fetch(request);
    if (response.ok) {
      try {
        const responseToCache = response.clone();
        await cache.put(request, responseToCache);
      } catch (cacheError) {
        console.warn('Failed to cache asset:', cacheError);
        // Continue without caching
      }
    }
    return response;
  } catch (error) {
    console.error('Asset fetch failed:', error);
    return new Response('', { status: 404 });
  }
}

// Handle page requests
async function handlePageRequest(request) {
  try {
    const cache = await caches.open(STATIC_CACHE);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }

    const response = await fetch(request);
    if (response.ok) {
      try {
        const responseToCache = response.clone();
        await cache.put(request, responseToCache);
      } catch (cacheError) {
        console.warn('Failed to cache page:', cacheError);
        // Continue without caching
      }
    }
    return response;
  } catch (error) {
    console.error('Page fetch failed:', error);
    return new Response('', { status: 404 });
  }
}

// Memory management - clean up old entries
async function cleanupOldCacheEntries() {
  const cache = await caches.open(DYNAMIC_CACHE);
  const keys = await cache.keys();
  
  // Keep only the 50 most recent entries
  if (keys.length > 50) {
    const keysToDelete = keys.slice(0, keys.length - 50);
    await Promise.all(keysToDelete.map(key => cache.delete(key)));
    console.log('Cleaned up old cache entries');
  }
}

// Periodic cleanup
setInterval(cleanupOldCacheEntries, 5 * 60 * 1000); // Every 5 minutes
