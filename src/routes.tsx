import type { RouteRecord } from 'vite-react-ssg';
import Index from './pages/Index';
import PrivacyPolicy from './pages/PrivacyPolicy';
import NotFound from './pages/NotFound';
import ThankYou from './pages/ThankYou';
import GodrejWoods from './pages/GodrejWoods';
import App from './App';

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: (
      <App>
        <Index />
      </App>
    ),
  },
  {
    path: '/godrejwoods',
    element: (
      <App>
        <GodrejWoods />
      </App>
    ),
  },
  {
    path: '/thank-you',
    element: (
      <App>
        <ThankYou />
      </App>
    ),
  },
  {
    path: '/privacy-policy',
    element: (
      <App>
        <PrivacyPolicy />
      </App>
    ),
  },
  {
    path: '*',
    element: (
      <App>
        <NotFound />
      </App>
    ),
  },
]; 
