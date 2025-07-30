# 🔥 Firebase Hosting with Git Integration Setup Guide

## ✅ Setup Complete!

Your Firebase hosting is now connected to your Git repository for automatic deployments!

## 🚀 How It Works

### Automatic Deployment Flow

1. **Push to Main Branch** → **Automatic Live Deployment**
   - When you push code to the `main` branch
   - GitHub Actions automatically builds your project
   - Deploys to Firebase Hosting live channel
   - Your site goes live immediately

2. **Pull Request** → **Preview Deployment**
   - When you create a pull request
   - GitHub Actions builds and deploys to a preview channel
   - You get a preview URL to test changes
   - Perfect for testing before merging

## 📁 Files Created

### GitHub Workflows

#### 1. `firebase-hosting-merge.yml`
```yaml
# Deploys to live site when PR is merged to main
name: Deploy to Firebase Hosting on merge
on:
  push:
    branches:
      - main
jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm run build          # Builds your project
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT_GODREJ_FF4B3 }}
          channelId: live           # Deploys to live channel
          projectId: godrej-ff4b3
```

#### 2. `firebase-hosting-pull-request.yml`
```yaml
# Creates preview deployments for pull requests
name: Deploy to Firebase Hosting on PR
on: pull_request
jobs:
  build_and_preview:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm run build          # Builds your project
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT_GODREJ_FF4B3 }}
          projectId: godrej-ff4b3   # Creates preview channel
```

## 🔧 Configuration Details

### Firebase Configuration (`firebase.json`)
```json
{
  "hosting": {
    "public": "dist",              // Build output directory
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"  // SPA routing
      }
    ],
    "headers": [
      {
        "source": "assets/**/*.js",
        "headers": [
          {
            "key": "Content-Type",
            "value": "application/javascript"
          }
        ]
      }
      // ... other headers for caching and performance
    ]
  }
}
```

### Project Configuration (`.firebaserc`)
```json
{
  "projects": {
    "default": "godrej-ff4b3"
  }
}
```

## 🚀 How to Use

### 1. Development Workflow

```bash
# Make your changes
git add .
git commit -m "Update hero section"
git push origin main
```

**Result**: Your site automatically deploys to live in ~2-3 minutes!

### 2. Feature Development with Previews

```bash
# Create a feature branch
git checkout -b feature/new-amenities

# Make changes
git add .
git commit -m "Add new amenities section"

# Push and create PR
git push origin feature/new-amenities
```

**Result**: 
- Create a Pull Request on GitHub
- Get a preview URL to test changes
- Merge when ready → automatic live deployment

### 3. Manual Deployment (if needed)

```bash
# Build locally
npm run build

# Deploy manually
firebase deploy
```

## 📊 Monitoring & Management

### Firebase Console
- **URL**: https://console.firebase.google.com/project/godrej-ff4b3
- **Hosting**: View deployment history, rollback versions
- **Analytics**: Monitor site performance and user behavior

### GitHub Actions
- **URL**: https://github.com/Xcceler-blr/godrej-thanisandra-landing-page/actions
- **Monitor**: Build status, deployment logs
- **Debug**: Failed deployments and error logs

## 🔍 Deployment URLs

### Live Site
- **URL**: https://godrej-ff4b3.web.app
- **Custom Domain**: Configure in Firebase Console if needed

### Preview Deployments
- **Format**: `https://godrej-ff4b3--[channel-id].web.app`
- **Access**: Available in PR comments and GitHub Actions

## 🛠️ Troubleshooting

### Common Issues

#### 1. Build Failures
```bash
# Check build locally
npm run build

# Check GitHub Actions logs
# Visit: https://github.com/Xcceler-blr/godrej-thanisandra-landing-page/actions
```

#### 2. Deployment Issues
```bash
# Check Firebase project
firebase projects:list

# Check hosting status
firebase hosting:channel:list

# Manual deployment test
firebase deploy --only hosting
```

#### 3. GitHub Secrets Issues
- **Check**: https://github.com/Xcceler-blr/godrej-thanisandra-landing-page/settings/secrets
- **Verify**: `FIREBASE_SERVICE_ACCOUNT_GODREJ_FF4B3` exists

### Performance Optimization

#### 1. Build Optimization
```json
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-button']
        }
      }
    }
  }
})
```

#### 2. Firebase Hosting Optimization
```json
// firebase.json
{
  "hosting": {
    "headers": [
      {
        "source": "**/*.@(js|css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000"
          }
        ]
      }
    ]
  }
}
```

## 🔄 Rollback Deployments

### Via Firebase Console
1. Go to Firebase Console → Hosting
2. Click on your site
3. View deployment history
4. Click "Rollback" on any previous version

### Via CLI
```bash
# List deployments
firebase hosting:releases:list

# Rollback to specific version
firebase hosting:releases:rollback [version-id]
```

## 📈 Analytics & Monitoring

### Firebase Analytics
- **Setup**: Already configured in your project
- **View**: Firebase Console → Analytics
- **Metrics**: Page views, user engagement, performance

### Performance Monitoring
- **Core Web Vitals**: Automatic tracking
- **Custom Events**: Track user interactions
- **Crash Reporting**: Monitor errors

## 🔐 Security & Permissions

### GitHub Secrets
- **FIREBASE_SERVICE_ACCOUNT_GODREJ_FF4B3**: Service account for deployments
- **GITHUB_TOKEN**: GitHub API access for PR comments

### Firebase Permissions
- **Hosting Admin**: Full deployment control
- **Project Viewer**: Read-only access for monitoring

## 🎯 Best Practices

### 1. Branch Strategy
```bash
main          # Production (auto-deploys to live)
feature/*     # Development (creates previews)
hotfix/*      # Emergency fixes
```

### 2. Commit Messages
```bash
feat: add new amenities section
fix: resolve mobile layout issues
docs: update project documentation
style: improve button styling
```

### 3. Testing Before Deployment
- Use preview deployments for testing
- Test on multiple devices/browsers
- Check performance with Lighthouse

### 4. Monitoring
- Set up alerts for failed deployments
- Monitor Core Web Vitals
- Track user engagement metrics

## 🚀 Next Steps

### 1. Push Your Changes
```bash
git add .
git commit -m "Setup Firebase hosting with Git integration"
git push origin main
```

### 2. Verify Deployment
- Check GitHub Actions: https://github.com/Xcceler-blr/godrej-thanisandra-landing-page/actions
- Visit live site: https://godrej-ff4b3.web.app

### 3. Custom Domain (Optional)
- Go to Firebase Console → Hosting
- Add custom domain
- Configure DNS settings

### 4. Performance Optimization
- Implement image optimization
- Add service worker for caching
- Optimize bundle size

## 📞 Support

### Firebase Support
- **Documentation**: https://firebase.google.com/docs/hosting
- **Community**: https://firebase.google.com/community
- **Stack Overflow**: https://stackoverflow.com/questions/tagged/firebase-hosting

### GitHub Actions Support
- **Documentation**: https://docs.github.com/en/actions
- **Marketplace**: https://github.com/marketplace?type=actions

---

**🎉 Congratulations!** Your Firebase hosting is now fully integrated with Git for automatic deployments!

**Live Site**: https://godrej-ff4b3.web.app
**GitHub Repository**: https://github.com/Xcceler-blr/godrej-thanisandra-landing-page 