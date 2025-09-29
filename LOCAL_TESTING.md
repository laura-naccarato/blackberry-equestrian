# Local Testing Guide for Blackberry Equestrian

## 🚀 Quick Start

### Step 1: Start the servers
Open two terminal windows:

**Terminal 1 - Decap CMS Proxy Server:**
```bash
cd blackberry-equestrian
npx decap-server
```
This will start the CMS backend on port 8081.

**Terminal 2 - Vue Development Server:**
```bash
cd blackberry-equestrian
pnpm run dev
```
This will start the website on http://localhost:5173/blackberry-equestrian/

### Step 2: Access the Site

## 📍 Important URLs

| Page | URL |
|------|-----|
| **Homepage** | http://localhost:5173/blackberry-equestrian/ |
| **CMS Admin** | http://localhost:5173/blackberry-equestrian/admin/index.html |
| **Design System** | http://localhost:5173/blackberry-equestrian/design-system |
| **Horses** | http://localhost:5173/blackberry-equestrian/horses |
| **Services** | http://localhost:5173/blackberry-equestrian/services |
| **About** | http://localhost:5173/blackberry-equestrian/about |
| **Contact** | http://localhost:5173/blackberry-equestrian/contact |

## 🔐 CMS Login

1. Go to: http://localhost:5173/blackberry-equestrian/admin/index.html
2. You'll see the Decap CMS interface
3. For local testing with `test-repo` backend:
   - Click "Login" 
   - No authentication required
4. You can now create and edit content

## 📝 Testing Content

### Create Test Content:
1. Access the CMS admin panel
2. Click on any collection (Horses, Services, Team, etc.)
3. Click "New [Collection Name]"
4. Fill in the form fields
5. Click "Save"
6. Content will be saved to `src/content/[collection]/` as JSON files

### View Content on Site:
- Content created in CMS will be saved as JSON files
- These files are loaded by the Vue app
- Navigate to the relevant pages to see your content

## 🐴 Example: Adding a Horse

1. Go to CMS Admin
2. Click "🐴 Horses" in the sidebar
3. Click "New Horses"
4. Fill in:
   - Name: "Thunder Bay"
   - Status: "available"
   - Price: 25000
   - Breed: "Thoroughbred"
   - Age: 8
   - Height: "16.2"
   - Gender: "Gelding"
   - Description: "Experienced hunter with show record"
5. Click "Save"
6. Visit http://localhost:5173/blackberry-equestrian/horses to see the listing

## 🛠️ Troubleshooting

### Admin page shows 404:
- Make sure you include `/index.html` at the end of the admin URL
- Correct: http://localhost:5173/blackberry-equestrian/admin/index.html
- Wrong: http://localhost:5173/blackberry-equestrian/admin

### CMS won't load:
1. Check that decap-server is running (port 8081)
2. Check browser console for errors
3. Try refreshing the page

### Content not showing:
1. Check that content files exist in `src/content/`
2. Check browser console for loading errors
3. Restart the dev server

### Servers won't start:
Kill any existing processes:
```bash
pkill -f vite
pkill -f decap-server
```
Then start them again.

## 📁 Project Structure

```
blackberry-equestrian/
├── public/
│   └── admin/           # CMS admin interface
│       ├── index.html
│       └── config.yml   # CMS configuration
├── src/
│   ├── content/        # CMS content (JSON files)
│   │   ├── horses/
│   │   ├── services/
│   │   ├── team/
│   │   └── ...
│   ├── components/     # Vue components
│   ├── views/         # Page components
│   └── router/        # Vue Router config
└── package.json
```

## 🔄 Switching to Production

To deploy to GitHub Pages:

1. Edit `public/admin/config.yml`
2. Change backend from `test-repo` to `github`
3. Configure your GitHub repository
4. Set up GitHub authentication
5. Deploy to GitHub Pages

## Need Help?

- CMS Documentation: https://decapcms.org/docs/
- Vue.js Documentation: https://vuejs.org/
- Project Repository: [Your GitHub Repo]