import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  loadServices,
  loadTeamMembers,
  loadBlogPosts,
  loadFacilities,
  loadTestimonials,
  loadPage,
  loadSettings
} from '../utils/contentLoader'

export const useContentStore = defineStore('content', () => {
  // State
  const services = ref([])
  const teamMembers = ref([])
  const blogPosts = ref([])
  const facilities = ref([])
  const testimonials = ref([])
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

  const sortedTeamMembers = computed(() => {
    return [...teamMembers.value].sort((a, b) => (a.order || 0) - (b.order || 0))
  })

  const featuredTeamMembers = computed(() => {
    return teamMembers.value.filter(member => member.featured)
  })

  const recentBlogPosts = computed(() => {
    return [...blogPosts.value]
      .filter(post => !post.draft)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3)
  })

  const publishedBlogPosts = computed(() => {
    return blogPosts.value.filter(post => !post.draft)
  })

  const blogPostsByCategory = computed(() => {
    const categoryMap = {}
    blogPosts.value.forEach(post => {
      if (!post.draft && post.category) {
        if (!categoryMap[post.category]) {
          categoryMap[post.category] = []
        }
        categoryMap[post.category].push(post)
      }
    })
    return categoryMap
  })

  const blogPostsByTag = computed(() => {
    const tagMap = {}
    blogPosts.value.forEach(post => {
      if (!post.draft && post.tags && Array.isArray(post.tags)) {
        post.tags.forEach(tag => {
          if (!tagMap[tag]) {
            tagMap[tag] = []
          }
          tagMap[tag].push(post)
        })
      }
    })
    return tagMap
  })

  const featuredTestimonials = computed(() => {
    return testimonials.value.filter(testimonial => testimonial.featured)
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
        case 'team':
          teamMembers.value = await loadTeamMembers()
          break
        case 'blog':
          blogPosts.value = await loadBlogPosts()
          break
        case 'facilities':
          facilities.value = await loadFacilities()
          break
        case 'testimonials':
          testimonials.value = await loadTestimonials()
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
            loadContent('team'),
            loadContent('blog'),
            loadContent('facilities'),
            loadContent('testimonials'),
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

  const getBlogPostBySlug = (slug) => {
    return blogPosts.value.find(post => {
      const postSlug = post.slug || `${post.date?.split('T')[0]}-${post.title?.toLowerCase().replace(/\s+/g, '-')}`
      return postSlug === slug
    })
  }

  const getTeamMemberBySlug = (slug) => {
    return teamMembers.value.find(member => {
      const memberSlug = member.slug || member.name?.toLowerCase().replace(/\s+/g, '-')
      return memberSlug === slug
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
    teamMembers,
    blogPosts,
    facilities,
    testimonials,
    pages,
    settings,
    isLoading,
    error,
    
    // Computed
    sortedServices,
    featuredServices,
    sortedTeamMembers,
    featuredTeamMembers,
    recentBlogPosts,
    publishedBlogPosts,
    blogPostsByCategory,
    blogPostsByTag,
    featuredTestimonials,
    
    // Methods
    loadContent,
    getServiceBySlug,
    getBlogPostBySlug,
    getTeamMemberBySlug,
    getFacilityBySlug
  }
})