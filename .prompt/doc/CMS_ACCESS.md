# Accessing Decap CMS

## Local Development Setup

### 1. Start the Development Server
```bash
npm run dev
```
The site will be available at: http://localhost:5173/blackberry-equestrian/

### 2. Start the Decap Backend Server
```bash
npx decap-server
```
This runs on port 8081 and enables local CMS editing without GitHub authentication.

### 3. Access the CMS Admin Panel
Open your browser and navigate to:
```
http://localhost:5173/admin/
```

**Note:** The admin panel is served from the `/public/admin/` directory and is accessible at `/admin/` (without the base path).

## CMS Features

### Content Collections Available:
- **🐴 Horses** - Manage horse listings for sale/lease
- **💼 Services** - Edit boarding, training, and lesson services  
- **👥 Team Members** - Update staff profiles
- **📝 Blog Posts** - Create and edit blog content
- **🏛️ Facilities** - Showcase facility features
- **⭐ Testimonials** - Manage client testimonials
- **📄 Pages** - Edit static pages (Home, About, Contact)
- **⚙️ Settings** - Configure site settings

### Test Backend Mode
The CMS is currently configured to use the `test-repo` backend which stores content locally in your browser's memory. This is perfect for:
- Testing the CMS interface
- Learning how to use the editor
- Development without GitHub setup

### Viewing Content
The content you see in the CMS is loaded from the JSON files in `/src/content/`. When you make changes in the CMS:
1. In test-repo mode: Changes are stored in browser memory (temporary)
2. In GitHub mode: Changes are committed to your repository

## Troubleshooting

### Admin Panel Not Loading?
1. Make sure both servers are running (dev server and decap-server)
2. Clear your browser cache
3. Try accessing in an incognito/private window
4. Check browser console for errors

### Content Not Showing on Site?
1. Content files are in `/src/content/` directories
2. The site uses the `contentLoader.js` utility to load JSON files
3. Check browser console for loading errors
4. Ensure JSON files are valid

### Can't Edit Content?
1. In test-repo mode, changes are temporary (browser only)
2. To persist changes, you'll need to configure GitHub backend
3. Make sure `local_backend: true` is set in `/public/admin/config.yml`

## Next Steps

To enable persistent content editing:
1. Create a GitHub repository for your project
2. Update `/public/admin/config.yml`:
   - Change `backend.name` from `test-repo` to `github`
   - Set `backend.repo` to your GitHub username/repo
3. Set up GitHub authentication (OAuth App or Netlify Identity)
4. Deploy to GitHub Pages for production use