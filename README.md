# Blackberry Equestrian Website

Professional Hunter/Jumper boarding facility website for Blackberry Equestrian in Newtonville, Ontario.

## Tech Stack

- **Frontend**: Vue.js 3 + Vite
- **State Management**: Pinia
- **Routing**: Vue Router 4
- **CMS**: Decap CMS (formerly Netlify CMS)
- **Deployment**: GitHub Pages with GitHub Actions

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Build for GitHub Pages
npm run build:gh-pages

# Preview production build
npm run preview
```

## Project Structure

```
blackberry-equestrian/
├── public/
│   └── admin/          # Decap CMS admin interface
├── src/
│   ├── components/     # Reusable Vue components
│   │   ├── common/     # Common UI components
│   │   └── layout/     # Layout components (Header, Footer)
│   ├── composables/    # Vue composables
│   ├── content/        # CMS content files
│   ├── router/         # Vue Router configuration
│   ├── stores/         # Pinia stores
│   ├── utils/          # Utility functions
│   └── views/          # Page components
├── .github/
│   └── workflows/      # GitHub Actions for deployment
└── vite.config.js      # Vite configuration
```

## Deployment

The site automatically deploys to GitHub Pages when changes are pushed to the main branch.

### Manual Deployment

```bash
npm run deploy
```

## CMS Access

The CMS admin interface is available at `/admin` when deployed.

## Features

- **Responsive Design**: Mobile-first approach for all devices
- **Content Management**: Easy content updates through Decap CMS
- **Horse Listings**: Dynamic horse profiles for sales/lease
- **Service Pages**: Detailed information about boarding, training, and lessons
- **Blog**: News and updates from the barn
- **Contact Forms**: Easy communication with potential clients
- **SEO Optimized**: Local SEO for Durham Region

## Development Guidelines

1. Follow Vue.js 3 Composition API patterns
2. Use Pinia stores for state management
3. Keep components small and reusable
4. Optimize images before uploading
5. Test on mobile devices regularly
6. Maintain accessibility standards (WCAG 2.2 AA)

## License

© 2024 Blackberry Equestrian. All rights reserved.
