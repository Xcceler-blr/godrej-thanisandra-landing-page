# Google Canonical URL Fix - Complete Solution

## Issue
**Google Search Console Error:**
- "Duplicate, Google chose different canonical than user"
- User-declared canonical: `https://www.godrejpropertiez.in/`
- Google-selected canonical: `https://godrejpropertiez.in/` (non-www)

## Root Cause
Both non-www and www versions are accessible, and Google prefers the non-www version even though you've declared www as canonical.

## Complete Fix Applied

### 1. ✅ Client-Side Immediate Redirect (index.html)
Added JavaScript redirect at the very top of `<head>` to immediately redirect non-www to www:

```javascript
if (window.location.hostname === 'godrejpropertiez.in') {
  window.location.replace('https://www.godrejpropertiez.in' + window.location.pathname + window.location.search + window.location.hash);
}
```

This executes BEFORE any other scripts, ensuring instant redirect.

### 2. ✅ Firebase Hosting Redirects (firebase.json)
Updated redirects to properly handle all paths:

```json
"redirects": [
  {
    "source": "/",
    "destination": "https://www.godrejpropertiez.in/",
    "type": 301
  },
  {
    "source": "/**",
    "destination": "https://www.godrejpropertiez.in/:splat",
    "type": 301
  }
]
```

**Note:** Firebase redirects only work when accessing the non-www domain. You need both domains configured in Firebase Hosting.

### 3. ✅ HTTP Link Header (firebase.json)
Added canonical Link header to HTTP response:

```json
{
  "key": "Link",
  "value": "<https://www.godrejpropertiez.in/>; rel=\"canonical\""
}
```

### 4. ✅ HTML Canonical Tag (Already Set)
Canonical tag in index.html:
```html
<link rel="canonical" href="https://www.godrejpropertiez.in/" />
```

### 5. ✅ Structured Data (Already Set)
All structured data uses www version in index.html.

## Firebase Hosting Domain Setup Required

### Check Current Domains:
```bash
firebase hosting:sites:get
```

### If Non-WWW Domain Not Added:
You need to add both domains to Firebase Hosting and configure one to redirect:

```bash
# In Firebase Console:
1. Go to Hosting → Connect domain
2. Add: godrejpropertiez.in (non-www)
3. Add: www.godrejpropertiez.in (www)
4. Both should point to same hosting site
```

### Domain DNS Configuration:
Both domains need these DNS records:

**For godrejpropertiez.in (non-www):**
- A record → Firebase IP
- TXT record → Firebase verification

**For www.godrejpropertiez.in:**
- CNAME → your-project.web.app

## Deploy Steps

### 1. Build and Deploy:
```bash
npm run build
firebase deploy --only hosting
```

### 2. Verify Redirect Works:
```bash
# Test non-www redirects to www
curl -I https://godrejpropertiez.in/
# Should show: Location: https://www.godrejpropertiez.in/

# Test www version loads normally
curl -I https://www.godrejpropertiez.in/
# Should show: 200 OK
```

### 3. Request Google Re-crawl:
1. Go to Google Search Console
2. URL Inspection tool
3. Enter: `https://www.godrejpropertiez.in/`
4. Click "Request Indexing"

### 4. Submit Updated Sitemap:
Make sure your sitemap uses www version:

**public/sitemap.xml:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.godrejpropertiez.in/</loc>
    <lastmod>2025-11-05</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.godrejpropertiez.in/privacy-policy</loc>
    <lastmod>2025-11-05</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>
```

Then submit in Search Console:
- Sitemaps → Add sitemap → Enter: `https://www.godrejpropertiez.in/sitemap.xml`

## Verification Timeline

- **Immediate:** Redirects work, users see www version
- **24-48 hours:** Google re-crawls and sees redirect
- **1-2 weeks:** Canonical error disappears from Search Console
- **2-4 weeks:** Non-www pages removed from index, www pages rank

## Monitor Progress

### Google Search Console:
1. **Coverage Report:** Watch "Duplicate, Google chose different canonical" count decrease to 0
2. **URL Inspection:** Verify www URLs show as canonical
3. **Sitemaps:** Verify sitemap processed successfully

### Manual Tests:
```bash
# Test 1: Non-www redirects
curl -L https://godrejpropertiez.in/ | grep canonical
# Should show: www.godrejpropertiez.in

# Test 2: WWW version canonical
curl https://www.godrejpropertiez.in/ | grep canonical
# Should show: www.godrejpropertiez.in

# Test 3: HTTP Link header
curl -I https://www.godrejpropertiez.in/ | grep Link
# Should show: rel="canonical"
```

## Checklist

- [x] Client-side redirect added to index.html
- [x] Firebase redirects configured
- [x] HTTP Link header added
- [x] Canonical tag uses www version
- [x] Structured data uses www version
- [ ] Deploy to Firebase Hosting
- [ ] Verify both domains in Firebase Console
- [ ] Test redirect with curl
- [ ] Request Google re-indexing
- [ ] Update and submit sitemap
- [ ] Monitor Search Console for 2 weeks

## Expected Results

After deployment and Google re-crawl:
- ✅ All traffic redirects to www version
- ✅ Google recognizes www as canonical
- ✅ Duplicate content error resolved
- ✅ Better SEO consolidation
- ✅ Single authoritative URL version
