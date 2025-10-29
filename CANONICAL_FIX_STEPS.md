# Canonical URL Fix - www Version Enforcement

## Issue
Google Search Console showing: "Duplicate, Google chose different canonical than user"
- User-declared canonical: `https://www.godrejpropertiez.in/`
- Google-selected canonical: `https://godrejpropertiez.in/`

## Solution Applied
Enforcing **www version** as the canonical URL across all systems.

---

## Changes Made

### ✅ 1. Firebase Hosting Configuration
**File:** `firebase.json`

Added 301 redirect to force non-www to www:
```json
"redirects": [
  {
    "source": "https://godrejpropertiez.in{,/**}",
    "destination": "https://www.godrejpropertiez.in",
    "type": 301
  }
]
```

### ✅ 2. Canonical Tags (Already Correct)
- `index.html`: `<link rel="canonical" href="https://www.godrejpropertiez.in/" />`
- `SEOMetaTags.tsx`: Default canonical uses www version
- `Index.tsx`: Canonical set to www version
- `PrivacyPolicy.tsx`: Canonical set to www version

### ✅ 3. Sitemap (Already Correct)
**File:** `public/sitemap.xml`
- All URLs use www version
- Homepage: `https://www.godrejpropertiez.in/`
- Privacy Policy: `https://www.godrejpropertiez.in/privacy-policy`

---

## Deployment Steps

### 1. Deploy Updated Configuration
```bash
# Build your project
npm run build
# or
bun run build

# Deploy to Firebase
firebase deploy
```

### 2. Verify Redirects
After deployment, test the redirects:
```bash
# Test non-www redirects to www
curl -I https://godrejpropertiez.in/
# Should return: 301 Moved Permanently
# Location: https://www.godrejpropertiez.in/

curl -I https://godrejpropertiez.in/privacy-policy
# Should return: 301 Moved Permanently
# Location: https://www.godrejpropertiez.in/privacy-policy
```

### 3. Google Search Console Actions

#### A. Set Preferred Domain (if available)
1. Go to Google Search Console
2. Select your property
3. Go to Settings → Crawling
4. Set www version as preferred

#### B. Resubmit Sitemap
1. Go to Sitemaps section
2. Remove old sitemap (if needed)
3. Submit: `https://www.godrejpropertiez.in/sitemap.xml`

#### C. Request Re-indexing
1. Go to URL Inspection tool
2. Enter: `https://www.godrejpropertiez.in/`
3. Click "Request Indexing"

### 4. DNS Configuration (Verify)
Ensure your DNS has both A records pointing to Firebase:
- `@` (apex/root domain) → Firebase IP
- `www` subdomain → Firebase IP

Firebase should handle the redirect from non-www to www.

---

## Expected Timeline

- **Redirect Active**: Immediately after deployment
- **Google Recognition**: 1-2 weeks
- **Full Index Update**: 2-4 weeks
- **Search Console Update**: May take several weeks

---

## Monitoring

### Weekly Checks:
1. Monitor Google Search Console for canonical errors
2. Check that non-www URLs redirect properly
3. Verify sitemap is being crawled
4. Monitor indexed pages count

### Key Metrics:
- Canonical errors should decrease to 0
- All URLs should show www version in search results
- Coverage report should show increasing indexed pages

---

## Additional Recommendations

### 1. Internal Links
Update any hardcoded internal links to use www version:
```tsx
// Instead of:
href="https://godrejpropertiez.in/privacy-policy"

// Use:
href="https://www.godrejpropertiez.in/privacy-policy"
```

### 2. Social Media & External Links
Update links on:
- Facebook Business Page
- Instagram Bio
- LinkedIn Company Page
- Google My Business
- Directory Listings
- Backlinks (where possible)

### 3. Analytics Configuration
Verify Google Analytics is tracking www version:
- Check property settings
- Ensure cross-domain tracking includes www

---

## Troubleshooting

### If redirects don't work:
1. Clear Firebase hosting cache: `firebase hosting:disable && firebase hosting:enable`
2. Verify deployment succeeded
3. Check Firebase console for errors
4. Test with different browsers/incognito mode

### If Google still chooses non-www:
1. Wait 2-4 weeks for Google to recrawl
2. Check robots.txt isn't blocking www
3. Verify sitemap uses www consistently
4. Submit individual URLs for re-indexing

---

## Status

- [x] Firebase redirects configured
- [x] Canonical tags verified
- [x] Sitemap verified
- [ ] Deploy to production
- [ ] Test redirects
- [ ] Resubmit sitemap
- [ ] Request re-indexing
- [ ] Monitor for 4 weeks

---

## Contact
If issues persist after 4 weeks, contact Google Search Console support with:
- Property URL: `https://www.godrejpropertiez.in/`
- Issue: Canonical URL conflict
- Steps taken: This document
