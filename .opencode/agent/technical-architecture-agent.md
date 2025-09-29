# Technical Architecture Agent

## Agent Profile
**Name**: Technical Architecture Specialist  
**Role**: Lead Vue.js and Decap CMS implementation for Blackberry Equestrian  
**Expertise**: Vue.js 3, Composition API, Vite, Decap CMS, TypeScript, Performance Optimization  

## Primary Responsibilities

### 1. Project Setup and Configuration

#### Vite Configuration for Equestrian Website
```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('ion-')
        }
      }
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@stores': resolve(__dirname, 'src/stores'),
      '@composables': resolve(__dirname, 'src/composables'),
      '@assets': resolve(__dirname, 'src/assets')
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['vue', 'vue-router', 'pinia'],
          'ui': ['@headlessui/vue', '@heroicons/vue'],
          'cms': ['decap-cms-app']
        }
      }
    },
    sourcemap: true
  },
  server: {
    fs: {
      allow: ['..']
    }
  }
})
```

#### Package.json Dependencies
```json
{
  "name": "blackberry-equestrian",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "type-check": "vue-tsc --noEmit"
  },
  "dependencies": {
    "vue": "^3.4.0",
    "vue-router": "^4.2.0",
    "pinia": "^2.1.0",
    "@headlessui/vue": "^1.7.0",
    "@heroicons/vue": "^2.0.0",
    "decap-cms-app": "^3.0.0",
    "@vueuse/core": "^10.0.0",
    "date-fns": "^2.30.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^4.5.0",
    "vite": "^5.0.0",
    "typescript": "^5.0.0",
    "vue-tsc": "^1.8.0",
    "@types/node": "^20.0.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "tailwindcss": "^3.3.0"
  }
}
```

### 2. Decap CMS Configuration

#### Complete CMS Configuration for Equestrian Content
```yaml
# static/admin/config.yml
backend:
  name: git-gateway
  branch: main
  commit_messages:
    create: 'Create {{collection}} "{{slug}}"'
    update: 'Update {{collection}} "{{slug}}"'
    delete: 'Delete {{collection}} "{{slug}}"'
    uploadMedia: 'Upload "{{path}}"'
    deleteMedia: 'Delete "{{path}}"'

local_backend: true
media_folder: static/images
public_folder: /images

collections:
  - name: "pages"
    label: "Pages"
    files:
      - file: "content/pages/home.md"
        label: "Homepage"
        name: "home"
        fields:
          - {label: "Title", name: "title", widget: "string"}
          - {label: "Hero Heading", name: "hero_heading", widget: "string"}
          - {label: "Hero Subheading", name: "hero_subheading", widget: "text"}
          - {label: "Hero Image", name: "hero_image", widget: "image"}
          - {label: "Hero CTA Text", name: "hero_cta", widget: "string"}
          - {label: "Hero CTA Link", name: "hero_link", widget: "string"}
          - label: "Feature Sections"
            name: "features"
            widget: "list"
            fields:
              - {label: "Title", name: "title", widget: "string"}
              - {label: "Description", name: "description", widget: "text"}
              - {label: "Icon", name: "icon", widget: "string"}
              - {label: "Link", name: "link", widget: "string", required: false}

  - name: "horses"
    label: "Horses for Sale/Lease"
    folder: "content/horses"
    create: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    fields:
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Featured", name: "featured", widget: "boolean", default: false}
      - {label: "Status", name: "status", widget: "select", options: ["Available", "Sold", "Leased", "Pending"]}
      - {label: "Type", name: "type", widget: "select", options: ["Sale", "Lease", "Both"]}
      
      # Basic Information
      - label: "Basic Information"
        name: "basic_info"
        widget: "object"
        fields:
          - {label: "Registered Name", name: "registered_name", widget: "string", required: false}
          - {label: "Barn Name", name: "barn_name", widget: "string"}
          - {label: "Breed", name: "breed", widget: "select", options: ["Warmblood", "Thoroughbred", "Quarter Horse", "Paint", "Arabian", "Other"]}
          - {label: "Age", name: "age", widget: "number", min: 1, max: 30}
          - {label: "Height", name: "height", widget: "string", hint: "e.g., 16.2hh"}
          - {label: "Color", name: "color", widget: "string"}
          - {label: "Gender", name: "gender", widget: "select", options: ["Mare", "Gelding", "Stallion"]}
      
      # Training & Performance
      - label: "Training & Performance"
        name: "training"
        widget: "object"
        fields:
          - {label: "Disciplines", name: "disciplines", widget: "select", multiple: true, options: ["Hunter", "Jumper", "Equitation", "Dressage", "Eventing", "Trail"]}
          - {label: "Training Level", name: "level", widget: "select", options: ["Green Broke", "Training Level", "First Level", "Finished", "Schoolmaster"]}
          - {label: "Jump Height", name: "jump_height", widget: "string", required: false}
          - {label: "Competition Record", name: "competition_record", widget: "text", required: false}
          - {label: "Rider Suitability", name: "rider_suitability", widget: "select", options: ["Beginner", "Intermediate", "Advanced", "Professional"]}
      
      # Health & Care
      - label: "Health & Care"
        name: "health"
        widget: "object"
        fields:
          - {label: "Vet Check Date", name: "vet_check_date", widget: "date", required: false}
          - {label: "Health Notes", name: "health_notes", widget: "text", required: false}
          - {label: "Special Care Requirements", name: "special_care", widget: "text", required: false}
      
      # Pricing
      - label: "Pricing"
        name: "pricing"
        widget: "object"
        fields:
          - {label: "Sale Price", name: "sale_price", widget: "number", required: false}
          - {label: "Lease Price (Monthly)", name: "lease_price", widget: "number", required: false}
          - {label: "Trial Available", name: "trial_available", widget: "boolean", default: false}
          - {label: "Trial Terms", name: "trial_terms", widget: "text", required: false}
      
      # Media
      - {label: "Main Photo", name: "main_photo", widget: "image"}
      - {label: "Photo Gallery", name: "gallery", widget: "list", field: {label: "Image", name: "image", widget: "image"}}
      - {label: "Video URL", name: "video_url", widget: "string", required: false}
      
      # Content
      - {label: "Description", name: "body", widget: "markdown"}
      - {label: "Contact Name", name: "contact_name", widget: "string"}
      - {label: "Contact Email", name: "contact_email", widget: "string"}
      - {label: "Contact Phone", name: "contact_phone", widget: "string", required: false}

  - name: "services"
    label: "Services"
    folder: "content/services"
    create: true
    slug: "{{slug}}"
    fields:
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Subtitle", name: "subtitle", widget: "string", required: false}
      - {label: "Featured", name: "featured", widget: "boolean", default: false}
      - {label: "Service Type", name: "service_type", widget: "select", options: ["Boarding", "Training", "Lessons", "Other"]}
      - {label: "Featured Image", name: "featured_image", widget: "image"}
      
      # Pricing
      - label: "Pricing Options"
        name: "pricing"
        widget: "list"
        fields:
          - {label: "Option Name", name: "name", widget: "string"}
          - {label: "Price", name: "price", widget: "number"}
          - {label: "Price Unit", name: "price_unit", widget: "select", options: ["monthly", "weekly", "per lesson", "one-time"]}
          - {label: "Features", name: "features", widget: "list", field: {label: "Feature", name: "feature", widget: "string"}}
          - {label: "Available", name: "available", widget: "boolean", default: true}
      
      # Features & Amenities
      - {label: "Key Features", name: "features", widget: "list", field: {label: "Feature", name: "feature", widget: "string"}}
      - {label: "What's Included", name: "includes", widget: "list", field: {label: "Item", name: "item", widget: "string"}}
      - {label: "Additional Services", name: "add_ons", widget: "list", field: {label: "Service", name: "service", widget: "string"}, required: false}
      
      # Content
      - {label: "Description", name: "body", widget: "markdown"}
      - {label: "Call to Action Text", name: "cta_text", widget: "string", default: "Learn More"}
      - {label: "CTA Link", name: "cta_link", widget: "string", required: false}

  - name: "team"
    label: "Team Members"
    folder: "content/team"
    create: true
    slug: "{{slug}}"
    fields:
      - {label: "Name", name: "title", widget: "string"}
      - {label: "Position", name: "position", widget: "string"}
      - {label: "Bio", name: "bio", widget: "text"}
      - {label: "Photo", name: "photo", widget: "image"}
      - {label: "Certifications", name: "certifications", widget: "list", field: {label: "Certification", name: "cert", widget: "string"}, required: false}
      - {label: "Specialties", name: "specialties", widget: "list", field: {label: "Specialty", name: "specialty", widget: "string"}}
      - {label: "Years Experience", name: "experience", widget: "number", required: false}
      - {label: "Competition Highlights", name: "competition_highlights", widget: "text", required: false}
      - {label: "Email", name: "email", widget: "string", required: false}

  - name: "blog"
    label: "Blog Posts"
    folder: "content/blog"
    create: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    fields:
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Publish Date", name: "date", widget: "datetime"}
      - {label: "Author", name: "author", widget: "string"}
      - {label: "Featured Image", name: "featured_image", widget: "image"}
      - {label: "Excerpt", name: "excerpt", widget: "text"}
      - {label: "Tags", name: "tags", widget: "list", field: {label: "Tag", name: "tag", widget: "string"}}
      - {label: "Body", name: "body", widget: "markdown"}

  - name: "settings"
    label: "Site Settings"
    files:
      - file: "content/settings/general.md"
        label: "General Settings"
        name: "general"
        fields:
          - {label: "Site Title", name: "site_title", widget: "string"}
          - {label: "Site Description", name: "site_description", widget: "text"}
          - {label: "Logo", name: "logo", widget: "image"}
          - {label: "Favicon", name: "favicon", widget: "image"}
          - label: "Contact Information"
            name: "contact"
            widget: "object"
            fields:
              - {label: "Phone", name: "phone", widget: "string"}
              - {label: "Email", name: "email", widget: "string"}
              - {label: "Address", name: "address", widget: "text"}
              - {label: "Hours", name: "hours", widget: "text"}
          - label: "Social Media"
            name: "social"
            widget: "object"
            fields:
              - {label: "Facebook URL", name: "facebook", widget: "string"}
              - {label: "Instagram URL", name: "instagram", widget: "string"}
              - {label: "YouTube URL", name: "youtube", widget: "string", required: false}
```

### 3. Vue.js Application Structure

#### Main Application Entry Point
```javascript
// src/main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './style.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Global error handling
app.config.errorHandler = (err, vm, info) => {
  console.error('Global error:', err, info)
  // In production, send to error tracking service
}

app.mount('#app')
```

#### Router Configuration
```javascript
// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { useHead } from '@vueuse/head'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/HomePage.vue'),
    meta: {
      title: 'Blackberry Equestrian | Hunter/Jumper Boarding in Newtonville, Ontario'
    }
  },
  {
    path: '/services',
    name: 'Services',
    component: () => import('../pages/ServicesPage.vue'),
    meta: {
      title: 'Boarding & Training Services | Blackberry Equestrian'
    }
  },
  {
    path: '/services/:slug',
    name: 'ServiceDetail',
    component: () => import('../pages/ServiceDetailPage.vue'),
    meta: {
      title: 'Service Details | Blackberry Equestrian'
    }
  },
  {
    path: '/horses',
    name: 'Horses',
    component: () => import('../pages/HorsesPage.vue'),
    meta: {
      title: 'Horses for Sale & Lease | Blackberry Equestrian'
    }
  },
  {
    path: '/horses/:id',
    name: 'HorseDetail',
    component: () => import('../pages/HorseDetailPage.vue'),
    meta: {
      title: 'Horse Details | Blackberry Equestrian'
    }
  },
  {
    path: '/facilities',
    name: 'Facilities',
    component: () => import('../pages/FacilitiesPage.vue'),
    meta: {
      title: 'Our Facilities | Blackberry Equestrian'
    }
  },
  {
    path: '/team',
    name: 'Team',
    component: () => import('../pages/TeamPage.vue'),
    meta: {
      title: 'Our Team | Blackberry Equestrian'
    }
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import('../pages/BlogPage.vue'),
    meta: {
      title: 'News & Updates | Blackberry Equestrian'
    }
  },
  {
    path: '/blog/:slug',
    name: 'BlogPost',
    component: () => import('../pages/BlogPostPage.vue'),
    meta: {
      title: 'Blog Post | Blackberry Equestrian'
    }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../pages/ContactPage.vue'),
    meta: {
      title: 'Contact Us | Blackberry Equestrian'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// SEO meta tag management
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    useHead({
      title: to.meta.title
    })
  }
  next()
})

export default router
```

### 4. Composables for Equestrian Functionality

#### Horse Management Composable
```javascript
// src/composables/useHorses.js
import { ref, computed, reactive } from 'vue'
import { useAsyncState } from '@vueuse/core'

export function useHorses() {
  const horses = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Filters for horse search
  const filters = reactive({
    breed: '',
    ageRange: [0, 30],
    priceRange: [0, 100000],
    disciplines: [],
    trainingLevel: '',
    status: 'Available',
    type: '' // Sale, Lease, Both
  })

  // Computed filtered horses
  const filteredHorses = computed(() => {
    return horses.value.filter(horse => {
      // Status filter
      if (