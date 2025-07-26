# Godrej Thanisandra Landing Page - Documentation

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Getting Started](#getting-started)
5. [Architecture](#architecture)
6. [Components](#components)
7. [Styling System](#styling-system)
8. [Build & Deployment](#build--deployment)
9. [Development Guidelines](#development-guidelines)
10. [Troubleshooting](#troubleshooting)

## 🏗️ Project Overview

The Godrej Thanisandra Landing Page is a modern, responsive website showcasing premium residential apartments in North Bangalore. Built with React, TypeScript, and Vite, it features static site generation for optimal performance and SEO.

### Key Features
- **Static Site Generation** for fast loading and SEO
- **Responsive Design** with mobile-first approach
- **Modern UI Components** using shadcn/ui
- **TypeScript** for type safety
- **Accessibility** compliant
- **Performance Optimized** with lazy loading

## 🛠️ Technology Stack

### Core Technologies
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **vite-react-ssg** - Static site generation
- **Tailwind CSS** - Utility-first CSS framework

### UI Libraries
- **shadcn/ui** - Component library (Radix UI + Tailwind)
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 📁 Project Structure

```
godrej-thanisandra-landing-page/
├── public/
│   ├── Assets/                    # Static assets
│   │   ├── Amenities/            # Amenity images
│   │   ├── Project-Highlights/   # Project feature images
│   │   └── favicon.ico           # Site favicon
│   └── index.html                # HTML template
├── src/
│   ├── components/               # React components
│   │   ├── ui/                  # Reusable UI components
│   │   ├── HeroSection.tsx      # Main banner section
│   │   ├── AboutSection.tsx     # About project section
│   │   ├── AmenitiesSection.tsx # Amenities showcase
│   │   ├── FloorPlanSection.tsx # Floor plan display
│   │   ├── LocationSection.tsx  # Location and map
│   │   ├── MasterPlanSection.tsx # Master plan view
│   │   ├── ProjectHighlights.tsx # Project features
│   │   ├── ContactForm.tsx      # Contact form modal
│   │   └── Footer.tsx           # Site footer
│   ├── hooks/                   # Custom React hooks
│   │   ├── useScrollAnimation.tsx # Scroll-based animations
│   │   └── useMobile.tsx        # Mobile detection
│   ├── lib/                     # Utility functions
│   │   └── utils.ts             # Common utilities
│   ├── pages/                   # Page components
│   │   ├── Index.tsx            # Main landing page
│   │   ├── PrivacyPolicy.tsx    # Privacy policy page
│   │   └── NotFound.tsx         # 404 error page
│   ├── App.tsx                  # Main app wrapper
│   ├── main.tsx                 # Application entry point
│   ├── routes.tsx               # Route definitions
│   └── index.css                # Global styles
├── package.json                 # Dependencies and scripts
├── vite.config.ts              # Vite configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Project readme
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd godrej-thanisandra-landing-page
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:8080`

### Available Scripts

```json
{
  "dev": "vite-react-ssg dev",        // Development server
  "build": "vite-react-ssg build",    // Production build
  "build:dev": "vite build --mode development", // Development build
  "preview": "vite preview",          // Preview built site
  "lint": "eslint ."                  // Code linting
}
```

## 🏛️ Architecture

### Application Flow

1. **Entry Point** (`src/main.tsx`)
   - Initializes vite-react-ssg
   - Sets up routing system
   - Loads global styles

2. **Routing** (`src/routes.tsx`)
   - Defines static routes
   - Wraps each route with App component
   - Handles 404 and error pages

3. **App Wrapper** (`src/App.tsx`)
   - Provides global context providers
   - Sets up React Query for data fetching
   - Configures toast notifications
   - Initializes tooltip provider

4. **Page Components** (`src/pages/`)
   - Composed of multiple section components
   - Handle SEO meta tags
   - Manage page-specific state

### Static Site Generation

The project uses `vite-react-ssg` for static site generation:

- **Pre-rendering**: Pages are generated at build time
- **SEO Optimized**: Search engines can crawl all content
- **Fast Loading**: No JavaScript required for initial render
- **Progressive Enhancement**: JavaScript enhances functionality

## 🧩 Components

### Page Components

#### Index Page (`src/pages/Index.tsx`)
Main landing page that composes all sections:

```typescript
const Index = () => {
  useEffect(() => {
    // SEO meta tags
    document.title = "Premium Apartments at Godrej Properties Thanisandra Bangalore";
    // ... meta description setup
  }, []);

  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <MasterPlanSection />
      <FloorPlanSection />
      <ProjectHighlights />
      <AmenitiesSection />
      <LocationSection />
      <Footer />
    </div>
  );
};
```

### Section Components

#### HeroSection (`src/components/HeroSection.tsx`)
- **Purpose**: Main banner with call-to-action
- **Features**: 
  - Background image with overlay
  - Sticky "ENQUIRE NOW" button
  - Responsive design
  - Scroll animations
  - Contact form integration

#### AboutSection (`src/components/AboutSection.tsx`)
- **Purpose**: Project overview and key highlights
- **Features**:
  - Project description
  - Key statistics
  - Brand trust indicators

#### AmenitiesSection (`src/components/AmenitiesSection.tsx`)
- **Purpose**: Showcase project amenities
- **Features**:
  - Grid layout of amenity cards
  - Image galleries
  - Interactive elements

#### FloorPlanSection (`src/components/FloorPlanSection.tsx`)
- **Purpose**: Display apartment layouts
- **Features**:
  - Floor plan images
  - Apartment specifications
  - Interactive floor plan viewer

#### LocationSection (`src/components/LocationSection.tsx`)
- **Purpose**: Show project location and connectivity
- **Features**:
  - Map integration
  - Location highlights
  - Connectivity information

### UI Components (`src/components/ui/`)

Built with shadcn/ui, providing accessible and customizable components:

#### Button Component
```typescript
// Example usage
<Button 
  variant="hero" 
  size="lg"
  onClick={handleClick}
>
  Schedule Site Visit
</Button>
```

**Available Variants:**
- `default` - Standard button
- `hero` - Hero section styling
- `cta` - Call-to-action styling
- `outline` - Outlined button
- `ghost` - Minimal styling

#### Form Components
- **ContactForm**: Modal-based contact form
- **Input**: Text input with validation
- **Select**: Dropdown selection
- **Textarea**: Multi-line text input

### Custom Hooks

#### useScrollAnimation (`src/hooks/useScrollAnimation.tsx`)
Provides scroll-based animation triggers:

```typescript
const { ref, isVisible } = useScrollAnimation();

return (
  <section ref={ref} className={`${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
    {/* Content */}
  </section>
);
```

#### useMobile (`src/hooks/useMobile.tsx`)
Detects mobile devices for responsive behavior:

```typescript
const isMobile = useMobile();
```

## 🎨 Styling System

### Tailwind CSS Configuration

The project uses a custom Tailwind configuration with:

#### Color System
```typescript
colors: {
  primary: 'hsl(var(--primary))',
  secondary: 'hsl(var(--secondary))',
  tertiary: 'hsl(var(--tertiary))',
  // ... other colors
}
```

#### Custom Animations
```typescript
keyframes: {
  'fade-in-up': {
    '0%': { opacity: '0', transform: 'translateY(30px)' },
    '100%': { opacity: '1', transform: 'translateY(0)' }
  }
}
```

#### Responsive Design
- **Mobile-first** approach
- **Breakpoints**: sm, md, lg, xl, 2xl
- **Container queries** for component-level responsiveness

### CSS Variables

Global CSS variables for consistent theming:

```css
:root {
  --primary: 220 14% 96%;
  --primary-foreground: 220 9% 46%;
  --secondary: 220 14% 96%;
  --secondary-foreground: 220 9% 46%;
  /* ... other variables */
}
```

### Component Styling Patterns

#### Responsive Classes
```typescript
className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl"
```

#### Animation Classes
```typescript
className="animate-fade-in-up transition-opacity duration-700"
```

#### Layout Classes
```typescript
className="flex flex-col md:flex-row items-center justify-between"
```

## 🚀 Build & Deployment

### Development Build
```bash
npm run build:dev
```

### Production Build
```bash
npm run build
```

### Build Output
The build process generates:
- **Static HTML files** for each route
- **Optimized assets** (images, CSS, JS)
- **Service worker** for caching
- **Sitemap** for SEO

### Deployment Options

#### Vercel (Recommended)
1. Connect repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Deploy automatically on push

#### Netlify
1. Connect repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`

#### Static Hosting
1. Run `npm run build`
2. Upload `dist` folder to any static hosting service

## 📝 Development Guidelines

### Code Style

#### TypeScript
- Use strict type checking
- Define interfaces for component props
- Use type inference where appropriate

#### React Patterns
- Functional components with hooks
- Custom hooks for reusable logic
- Proper error boundaries
- Memoization for performance

#### File Naming
- **Components**: PascalCase (e.g., `HeroSection.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useScrollAnimation.tsx`)
- **Utilities**: camelCase (e.g., `utils.ts`)

### Component Structure

```typescript
// 1. Imports
import { useState } from "react";
import { Button } from "@/components/ui/button";

// 2. Type definitions
interface ComponentProps {
  title: string;
  onAction?: () => void;
}

// 3. Component definition
export const Component = ({ title, onAction }: ComponentProps) => {
  // 4. State and hooks
  const [isOpen, setIsOpen] = useState(false);

  // 5. Event handlers
  const handleClick = () => {
    setIsOpen(true);
    onAction?.();
  };

  // 6. Render
  return (
    <div className="component-container">
      <h2>{title}</h2>
      <Button onClick={handleClick}>Action</Button>
    </div>
  );
};
```

### Performance Best Practices

1. **Image Optimization**
   - Use `fetchPriority="high"` for above-the-fold images
   - Implement lazy loading for below-the-fold images
   - Optimize image formats (WebP, AVIF)

2. **Code Splitting**
   - Use dynamic imports for large components
   - Implement route-based code splitting

3. **Caching**
   - Implement service worker for offline support
   - Use appropriate cache headers

### Accessibility Guidelines

1. **Semantic HTML**
   - Use proper heading hierarchy
   - Implement ARIA labels
   - Provide alt text for images

2. **Keyboard Navigation**
   - Ensure all interactive elements are keyboard accessible
   - Implement focus management

3. **Screen Reader Support**
   - Use descriptive text for screen readers
   - Implement proper ARIA attributes

## 🔧 Troubleshooting

### Common Issues

#### Build Errors
```bash
# Clear cache and reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### TypeScript Errors
```bash
# Check TypeScript configuration
npx tsc --noEmit
```

#### Styling Issues
```bash
# Rebuild Tailwind CSS
npx tailwindcss -i ./src/index.css -o ./dist/output.css --watch
```

#### Development Server Issues
```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

### Performance Issues

#### Large Bundle Size
- Check for unused dependencies
- Implement code splitting
- Optimize images

#### Slow Loading
- Implement lazy loading
- Optimize critical rendering path
- Use CDN for static assets

### Browser Compatibility

#### Supported Browsers
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

#### Polyfills
- Modern JavaScript features are transpiled
- CSS Grid and Flexbox are supported
- Custom properties have fallbacks

## 📚 Additional Resources

### Documentation
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [shadcn/ui Documentation](https://ui.shadcn.com/)

### Tools
- [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WebPageTest](https://www.webpagetest.org/)

### Performance Monitoring
- [Core Web Vitals](https://web.dev/vitals/)
- [Google PageSpeed Insights](https://pagespeed.web.dev/)

---

**Last Updated**: December 2024
**Version**: 1.0.0
**Maintainer**: Development Team 