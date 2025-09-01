// Service Worker Registration and Memory Management
export class ServiceWorkerManager {
  private static instance: ServiceWorkerManager;
  private swRegistration: ServiceWorkerRegistration | null = null;
  private memoryCleanupInterval: NodeJS.Timeout | null = null;

  private constructor() {}

  static getInstance(): ServiceWorkerManager {
    if (!ServiceWorkerManager.instance) {
      ServiceWorkerManager.instance = new ServiceWorkerManager();
    }
    return ServiceWorkerManager.instance;
  }

  // Register service worker
  async register(): Promise<ServiceWorkerRegistration | null> {
    // Skip registration in development mode
    if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
      console.log('Service Worker registration skipped in development mode');
      return null;
    }

    if (!('serviceWorker' in navigator)) {
      console.warn('Service Worker not supported');
      return null;
    }

    try {
      this.swRegistration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none' // Always check for updates
      });

      console.log('Service Worker registered successfully:', this.swRegistration);
      
      // Start memory management
      this.startMemoryManagement();
      
      // Listen for updates
      this.setupUpdateHandling();
      
      return this.swRegistration;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      return null;
    }
  }

  // Setup update handling
  private setupUpdateHandling(): void {
    if (!this.swRegistration) return;

    // Check for updates
    this.swRegistration.addEventListener('updatefound', () => {
      const newWorker = this.swRegistration!.installing;
      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New version available
            this.showUpdateNotification();
          }
        });
      }
    });

    // Handle controller change
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('New Service Worker activated');
      // Reload page to use new service worker
      window.location.reload();
    });
  }

  // Show update notification
  private showUpdateNotification(): void {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Update Available', {
        body: 'A new version is available. Click to update.',
        icon: '/Assets/favicon.ico'
      });
    }
  }

  // Start memory management
  private startMemoryManagement(): void {
    // Clean up memory every 2 minutes
    this.memoryCleanupInterval = setInterval(() => {
      this.cleanupMemory();
    }, 2 * 60 * 1000);

    // Clean up on page visibility change
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.cleanupMemory();
      }
    });
  }

  // Clean up memory
  private cleanupMemory(): void {
    // Clear unnecessary caches
    if ('caches' in window) {
      caches.keys().then(cacheNames => {
        cacheNames.forEach(cacheName => {
          if (cacheName.includes('dynamic') && !cacheName.includes('v1')) {
            caches.delete(cacheName);
          }
        });
      });
    }

    // Clear old IndexedDB data if needed
    if ('indexedDB' in window) {
      // Implementation for IndexedDB cleanup if needed
    }

    // Force garbage collection if available
    if ('gc' in window) {
      (window as any).gc();
    }
  }

  // Unregister service worker
  async unregister(): Promise<boolean> {
    if (this.swRegistration) {
      try {
        await this.swRegistration.unregister();
        this.swRegistration = null;
        
        // Clear memory cleanup interval
        if (this.memoryCleanupInterval) {
          clearInterval(this.memoryCleanupInterval);
          this.memoryCleanupInterval = null;
        }
        
        console.log('Service Worker unregistered');
        return true;
      } catch (error) {
        console.error('Service Worker unregistration failed:', error);
        return false;
      }
    }
    return false;
  }

  // Get current registration
  getRegistration(): ServiceWorkerRegistration | null {
    return this.swRegistration;
  }

  // Check if service worker is active
  isActive(): boolean {
    return this.swRegistration?.active?.state === 'activated';
  }
}

// Export singleton instance
export const serviceWorkerManager = ServiceWorkerManager.getInstance();
