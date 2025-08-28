#!/usr/bin/env node

/**
 * Performance Testing Script for Godrej Thanisandra Landing Page
 * This script helps test page performance and Core Web Vitals
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Configuration
const SITE_URL = 'https://www.godrejpropertiez.in';
const LOCAL_URL = 'http://localhost:8080';
const PAGES = [
  '/',
  '/thank-you',
  '/privacy-policy'
];

// Performance metrics to check
const PERFORMANCE_METRICS = {
  'First Contentful Paint (FCP)': '< 1.8s',
  'Largest Contentful Paint (LCP)': '< 2.5s',
  'First Input Delay (FID)': '< 100ms',
  'Cumulative Layout Shift (CLS)': '< 0.1',
  'Time to Interactive (TTI)': '< 3.8s',
  'Total Blocking Time (TBT)': '< 200ms'
};

console.log('🚀 Performance Testing for Godrej Thanisandra Landing Page\n');

// Test local development server
async function testLocalPerformance() {
  console.log('📊 Testing Local Development Server...\n');
  
  for (const page of PAGES) {
    const url = `${LOCAL_URL}${page}`;
    console.log(`Testing: ${url}`);
    
    try {
      // Basic response time test
      const startTime = Date.now();
      const response = await fetch(url);
      const endTime = Date.now();
      
      if (response.ok) {
        console.log(`✅ ${page} - Response Time: ${endTime - startTime}ms`);
      } else {
        console.log(`❌ ${page} - HTTP ${response.status}`);
      }
    } catch (error) {
      console.log(`❌ ${page} - Error: ${error.message}`);
    }
  }
}

// Test production site performance
async function testProductionPerformance() {
  console.log('\n🌐 Testing Production Site...\n');
  
  for (const page of PAGES) {
    const url = `${SITE_URL}${page}`;
    console.log(`Testing: ${url}`);
    
    try {
      const startTime = Date.now();
      const response = await fetch(url);
      const endTime = Date.now();
      
      if (response.ok) {
        console.log(`✅ ${page} - Response Time: ${endTime - startTime}ms`);
        
        // Check for performance headers
        const server = response.headers.get('server');
        const poweredBy = response.headers.get('x-powered-by');
        
        if (server) console.log(`   Server: ${server}`);
        if (poweredBy) console.log(`   Powered by: ${poweredBy}`);
      } else {
        console.log(`❌ ${page} - HTTP ${response.status}`);
      }
    } catch (error) {
      console.log(`❌ ${page} - Error: ${error.message}`);
    }
  }
}

// Check build optimization
function checkBuildOptimization() {
  console.log('\n🔧 Checking Build Optimization...\n');
  
  const distPath = path.join(__dirname, '..', 'dist');
  
  if (fs.existsSync(distPath)) {
    console.log('✅ Build directory exists');
    
    // Check for compressed files
    const files = fs.readdirSync(distPath, { recursive: true });
    const gzipFiles = files.filter(file => file.endsWith('.gz'));
    const brotliFiles = files.filter(file => file.endsWith('.br'));
    
    console.log(`📦 Gzip compressed files: ${gzipFiles.length}`);
    console.log(`📦 Brotli compressed files: ${brotliFiles.length}`);
    
    // Check bundle sizes
    const jsFiles = files.filter(file => file.endsWith('.js'));
    const cssFiles = files.filter(file => file.endsWith('.css'));
    
    console.log(`📄 JavaScript files: ${jsFiles.length}`);
    console.log(`🎨 CSS files: ${cssFiles.length}`);
    
    // Check for large files
    jsFiles.forEach(file => {
      const filePath = path.join(distPath, file);
      const stats = fs.statSync(filePath);
      const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
      
      if (parseFloat(sizeInMB) > 1) {
        console.log(`⚠️  Large JS file: ${file} (${sizeInMB}MB)`);
      }
    });
    
  } else {
    console.log('❌ Build directory not found. Run "npm run build" first.');
  }
}

// Performance recommendations
function showPerformanceRecommendations() {
  console.log('\n💡 Performance Recommendations:\n');
  
  console.log('1. Image Optimization:');
  console.log('   - Use WebP format for images');
  console.log('   - Implement responsive images with srcset');
  console.log('   - Add loading="lazy" for below-the-fold images');
  
  console.log('\n2. Code Splitting:');
  console.log('   - Ensure React Router code splitting is working');
  console.log('   - Check bundle analyzer for large chunks');
  
  console.log('\n3. Caching:');
  console.log('   - Implement proper cache headers');
  console.log('   - Use service worker for offline support');
  
  console.log('\n4. Core Web Vitals:');
  console.log('   - Monitor LCP, FID, and CLS');
  console.log('   - Use Lighthouse for detailed analysis');
  
  console.log('\n5. SEO & Crawling:');
  console.log('   - Verify robots.txt and sitemap.xml');
  console.log('   - Check structured data with Google Rich Results Test');
  console.log('   - Test mobile-friendliness');
}

// Main execution
async function main() {
  try {
    await testLocalPerformance();
    await testProductionPerformance();
    checkBuildOptimization();
    showPerformanceRecommendations();
    
    console.log('\n🎯 Next Steps:');
    console.log('1. Run "npm run build" to create optimized production build');
    console.log('2. Test with Google PageSpeed Insights');
    console.log('3. Use Lighthouse in Chrome DevTools');
    console.log('4. Monitor Core Web Vitals in Google Search Console');
    
  } catch (error) {
    console.error('❌ Error during performance testing:', error.message);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  testLocalPerformance,
  testProductionPerformance,
  checkBuildOptimization,
  showPerformanceRecommendations
};
