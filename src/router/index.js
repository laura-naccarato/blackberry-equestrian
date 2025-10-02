import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: {
      title: 'Home - Blackberry Equestrian',
      description: 'Premier Hunter/Jumper boarding and training facility in Newtonville, Ontario'
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutPage.vue'),
    meta: {
      title: 'About - Blackberry Equestrian',
      description: 'Learn about our team and facilities'
    }
  },
  {
    path: '/services',
    name: 'services',
    component: () => import('@/views/ServicesPage.vue'),
    meta: {
      title: 'Services - Blackberry Equestrian',
      description: 'Boarding, training, lessons, and horse sales'
    }
  },
  {
    path: '/services/:slug',
    name: 'service-detail',
    component: () => import('@/views/ServiceDetailPage.vue'),
    meta: {
      title: 'Service Details - Blackberry Equestrian'
    }
  },
  {
    path: '/horses',
    name: 'horses',
    component: () => import('@/views/HorsesPage.vue'),
    meta: {
      title: 'Horses for Sale/Lease - Blackberry Equestrian',
      description: 'Quality horses available for sale and lease'
    }
  },
  {
    path: '/horses/:slug',
    name: 'horse-detail',
    component: () => import('@/views/HorseDetailPage.vue'),
    meta: {
      title: 'Horse Details - Blackberry Equestrian'
    }
  },
  {
    path: '/facilities',
    name: 'facilities',
    component: () => import('@/views/FacilitiesPage.vue'),
    meta: {
      title: 'Facilities - Blackberry Equestrian',
      description: 'Tour our indoor arena, outdoor rings, and boarding facilities'
     }
   },
   {
     path: '/contact',
    name: 'contact',
    component: () => import('@/views/ContactPage.vue'),
    meta: {
      title: 'Contact - Blackberry Equestrian',
      description: 'Get in touch with us or schedule a visit'
    }
  },
  {
    path: '/design-system',
    name: 'design-system',
    component: () => import('@/views/DesignSystemPage.vue'),
    meta: {
      title: 'Design System - Blackberry Equestrian',
      description: 'Component library and design guidelines'
    }
  },
  {
    path: '/test-content',
    name: 'test-content',
    component: () => import('@/views/TestContentPage.vue'),
    meta: {
      title: 'Test Content - Blackberry Equestrian',
      description: 'Testing content loader'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundPage.vue'),
    meta: {
      title: 'Page Not Found - Blackberry Equestrian'
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  // Update meta tags
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.meta.description) {
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', to.meta.description)
    }
  }
  next()
})

export default router