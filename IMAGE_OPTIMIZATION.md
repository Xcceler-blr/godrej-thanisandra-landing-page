# Image Optimization Instructions

## Quick Fix Implementation

Since we don't have image processing libraries installed, here are the immediate optimizations you can implement:

### 1. Update Image Components

Replace standard `<img>` tags with our `ResponsiveImage` component:

```tsx
import ResponsiveImage from '@/components/ui/responsive-image';

// Instead of:
<img src="/Assets/Godrej.png" alt="Godrej" />

// Use:
<ResponsiveImage 
  src="/Assets/Godrej.png" 
  alt="Godrej"
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

### 2. Manual Image Optimization (Recommended)

Use online tools or image editing software to create optimized versions:

#### For each problematic image, create these sizes:
- 320w (mobile)
- 480w (small tablet)
- 768w (tablet)
- 1024w (small desktop)
- 1280w (desktop)
- 1920w (large desktop)

#### Save in both formats:
- WebP (for modern browsers) - 80% quality
- Original format (fallback) - 90% quality

#### Naming convention:
- `imagename-320w.webp`
- `imagename-320w.png`
- etc.

### 3. Immediate Size Reductions

For the most problematic images, here are the recommended display sizes:

```javascript
const optimizedSizes = {
  'Godrej.png': { maxWidth: 800, currentSize: '390.9KB', targetSize: '235KB' },
  'godrej thanisandra blr.webp': { maxWidth: 600, currentSize: '122.2KB', targetSize: '54.7KB' },
  'godrej-2bhk2.png': { maxWidth: 500, currentSize: '111KB', targetSize: '57.2KB' },
  'godrej-3bhk .png': { maxWidth: 500, currentSize: '104.2KB', targetSize: '53.6KB' },
  'godrej-about-section .png': { maxWidth: 700, currentSize: '159.2KB', targetSize: '109.9KB' },
  'godrej-2bhk .png': { maxWidth: 500, currentSize: '99.1KB', targetSize: '51KB' },
  '3bhk-lux-(1).png': { maxWidth: 600, currentSize: '467.5KB', targetSize: '427.6KB' },
  '3bhk-lux.png': { maxWidth: 600, currentSize: '385.6KB', targetSize: '352.7KB' }
};
```

### 4. CSS-based Optimization

Add this CSS to limit image rendering sizes:

```css
/* Limit maximum image sizes */
.hero-image { max-width: 800px; }
.floor-plan-image { max-width: 500px; }
.about-image { max-width: 700px; }
.highlight-image { max-width: 400px; }
```

### 5. Install Image Optimization Tools (Optional)

To automate the process, you can install:

```bash
npm install --save-dev sharp imagemin imagemin-webp imagemin-pngquant
```

Then run the automated optimization script.
