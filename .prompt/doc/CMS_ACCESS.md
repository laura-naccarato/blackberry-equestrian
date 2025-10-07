# Accessing Decap CMS

## Local Development Setup

### Prerequisites
- Node.js and npm installed
- Project dependencies installed (`npm install`)

### 1. Start the Development Server
```bash
npm run dev
```
The site will be available at: http://localhost:5173/blackberry-equestrian/

### 2. Access the CMS Admin Panel
Open your browser and navigate to:
```
http://localhost:5173/admin/
```

**Note:** The CMS is configured with `local_backend: true`, so no separate decap-server is needed for local development.

## CMS Features

### Content Collections Available:
- **🐴 Horses for Sale/Lease** - Manage horse listings with detailed profiles, pricing, and photos
- **💼 Services** - Edit boarding, training, and lesson services with pricing options
- **🏛️ Facilities** - Showcase facility features with photo galleries
- **📄 Pages** - Edit static pages (Home, About, Contact) with structured content
- **⚙️ Settings** - Configure site settings, SEO, and business information

### Editorial Workflow
The CMS is configured with `publish_mode: editorial_workflow`, which means:
- Content changes go through a review process
- Save content as "Draft" for personal editing
- Submit for "Review" when ready for approval
- Administrator must approve before content goes live

### Test Backend Mode
The CMS uses the `test-repo` backend for local development, which stores content locally in your browser's memory. This is perfect for:
- Testing the CMS interface and workflows
- Learning how to use the editor
- Development without GitHub authentication

### Viewing Content
The content you see in the CMS is loaded from the JSON files in `/src/content/`. When you make changes in the CMS:
1. In test-repo mode: Changes are stored in browser memory (temporary)
2. In GitHub mode: Changes are committed to your repository (production setup)

## Production Setup (GitHub Backend)

### Switching to Production Mode
To enable persistent content editing with GitHub integration:

1. **Update CMS Configuration** (`/public/admin/config.yml`):
   ```yaml
   backend:
     name: github
     repo: YOUR_USERNAME/blackberry-equestrian  # Replace with your GitHub repo
     branch: main
     commit_messages:
       create: 'Create {{collection}} "{{slug}}"'
       update: 'Update {{collection}} "{{slug}}"'
       delete: 'Delete {{collection}} "{{slug}}"'
       uploadMedia: 'Upload "{{path}}"'
       deleteMedia: 'Delete "{{path}}"'
   ```

2. **Set up GitHub OAuth App** (optional, for easier authentication):
   - Go to GitHub Settings → Developer settings → OAuth Apps
   - Create new OAuth App with callback URL: `https://YOUR_USERNAME.github.io/blackberry-equestrian/admin/`
   - Add client ID and secret to your deployment environment

3. **Deploy to GitHub Pages**:
   ```bash
   npm run build
   npm run deploy
   ```

4. **Access Production CMS**:
   Navigate to: `https://YOUR_USERNAME.github.io/blackberry-equestrian/admin/`

## Troubleshooting

### Admin Panel Not Loading?
1. Make sure the dev server is running (`npm run dev`)
2. Clear your browser cache and cookies
3. Try accessing in an incognito/private window
4. Check browser console for JavaScript errors
5. Verify `/public/admin/config.yml` is valid YAML

### Content Not Showing on Site?
1. Content files are in `/src/content/` directories as JSON files
2. The site uses `contentLoader.js` utility to load content
3. Check browser console for loading errors
4. Ensure JSON files are valid (use a JSON validator)
5. Verify file paths match the CMS configuration

### Can't Edit Content?
1. In test-repo mode, changes are temporary (browser storage only)
2. For persistent changes, switch to GitHub backend
3. Ensure you have write access to the GitHub repository
4. Check that `local_backend: true` is set for local development

### Editorial Workflow Issues?
1. Content must be submitted for review before publishing
2. Only administrators can approve content changes
3. Check the workflow status in the CMS interface
4. Ensure proper permissions are set up

## Content File Structure

```
src/content/
├── horses/           # Horse listings (JSON files)
├── services/         # Service pages (JSON files)
├── facilities/      # Facility information (JSON files)
├── pages/           # Static pages (JSON files)
│   ├── home.json
│   ├── about.json
│   └── contact.json
└── settings/        # Site configuration (JSON files)
    ├── general.json
    └── seo.json
```

## Security Notes

- **Local Development**: Uses test-repo backend (no authentication required)
- **Production**: Requires GitHub authentication for content editing
- **Editorial Workflow**: Provides content approval process for quality control
- **Media Uploads**: Configured for local storage (can be changed to cloud storage)