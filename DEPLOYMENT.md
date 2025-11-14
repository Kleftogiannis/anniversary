# Deploy to GitHub Pages

## Quick Setup

### 1. Create a GitHub Repository
1. Go to [GitHub](https://github.com) and create a new repository
2. Name it whatever you want (e.g., `anniversary-game`)
3. Don't initialize with README (we already have files)

### 2. Update vite.config.ts
Open `vite.config.ts` and change the base path:
```typescript
base: '/your-repo-name/', // Replace with your actual repo name
```

For example, if your repo is named `anniversary-game`:
```typescript
base: '/anniversary-game/',
```

### 3. Initialize Git and Push
Run these commands in your terminal:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git push -u origin main
```

### 4. Deploy to GitHub Pages
Run this command:
```bash
npm run deploy
```

This will:
- Build your app
- Create a `gh-pages` branch
- Push the built files to GitHub Pages

### 5. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Source", select `gh-pages` branch
4. Click **Save**

Your site will be live at: `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

## Important Notes

### Image Paths
Since you're using `/src/assets/` paths, you need to update them for production:

**Option 1: Import images** (Recommended)
```typescript
import pic1 from '../assets/pic1.jpg';
import pic2 from '../assets/pic2.jpg';
// etc...

const galleryImages = [
  { src: pic1, caption: 'First adventure together' },
  { src: pic2, caption: 'Making memories' },
  // etc...
];
```

**Option 2: Use relative paths**
Change all `/src/assets/` to `/assets/` in your code.

### Custom Domain (Optional)
If you want to use a custom domain:
1. Add a `CNAME` file in the `public` folder with your domain
2. Configure DNS settings with your domain provider

## Updating Your Site
Whenever you make changes:
```bash
git add .
git commit -m "Update content"
git push
npm run deploy
```

## Troubleshooting

**Blank page after deployment?**
- Check that `base` in `vite.config.ts` matches your repo name
- Make sure image paths are correct

**404 errors?**
- GitHub Pages might take a few minutes to update
- Clear your browser cache

**Images not loading?**
- Import images instead of using string paths
- Check that images are in the `src/assets` folder
