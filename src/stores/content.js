import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  loadServices,
  loadFacilities,
  loadPage,
  loadSettings
} from '../utils/contentLoader'

export const useContentStore = defineStore('content', () => {
  // State
  const services = ref([])
  const facilities = ref([])
  const pages = ref({})
  const settings = ref({})
  const isLoading = ref(false)
  const error = ref(null)

  // Computed
  const sortedServices = computed(() => {
    return [...services.value].sort((a, b) => (a.order || 0) - (b.order || 0))
  })

  const featuredServices = computed(() => {
    return services.value.filter(service => service.featured)
  })

  // Methods
  const loadContent = async (contentType) => {
    isLoading.value = true
    error.value = null
    try {
      switch (contentType) {
        case 'services':
          services.value = await loadServices()
          break
        case 'facilities':
          facilities.value = await loadFacilities()
          break
        case 'pages':
          // Load all pages
          const pageNames = ['home', 'about', 'contact']
          for (const pageName of pageNames) {
            const pageContent = await loadPage(pageName)
            if (pageContent) {
              pages.value[pageName] = pageContent
            }
          }
          break
        case 'settings':
          // Load all settings
          const settingNames = ['general', 'seo']
          for (const settingName of settingNames) {
            const settingContent = await loadSettings(settingName)
            if (settingContent) {
              settings.value[settingName] = settingContent
            }
          }
          break
        case 'all':
          // Load all content types
          await Promise.all([
            loadContent('services'),
            loadContent('facilities'),
            loadContent('pages'),
            loadContent('settings')
          ])
          break
      }
    } catch (err) {
      error.value = err.message
      console.error(`Error loading ${contentType}:`, err)
    } finally {
      isLoading.value = false
    }
  }

  const getServiceBySlug = (slug) => {
    return services.value.find(service => {
      const serviceSlug = service.slug || service.title?.toLowerCase().replace(/\s+/g, '-')
      return serviceSlug === slug
    })
  }

  const getFacilityBySlug = (slug) => {
    return facilities.value.find(facility => {
      const facilitySlug = facility.slug || facility.title?.toLowerCase().replace(/\s+/g, '-')
      return facilitySlug === slug
    })
  }

  return {
    // State
    services,
    facilities,
    pages,
    settings,
    isLoading,
    error,
    
    // Computed
    sortedServices,
    featuredServices,
    
    // Methods
    loadContent,
    getServiceBySlug,
    getFacilityBySlug
  }
})