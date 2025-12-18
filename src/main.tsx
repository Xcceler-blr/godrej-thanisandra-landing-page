import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './routes';
import './index.css';
import './styles/animations.css';
import 'leaflet/dist/leaflet.css';

export const createRoot = ViteReactSSG({ routes });

// Register service worker for caching and memory management
if (typeof window !== 'undefined') {
  // Register service worker only in production
  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    import('./lib/service-worker').then(({ serviceWorkerManager }) => {
      serviceWorkerManager.register().catch(console.error);
    });
  }

  // Initialize memory management
  import('./hooks/useMemoryManagement').then(({ useMemoryManagement }) => {
    // This will be used by components that need memory management
    console.log('Memory management system initialized');
  });
}
