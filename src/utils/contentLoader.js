/**
 * Content Loader Utility
 * Loads content from JSON files created by Decap CMS
 */

// Helper function to load all files from a directory using Vite's glob import
async function loadContentFromDirectory(globPattern) {
  const modules = import.meta.glob('/src/content/**/*.json')
  const content = []
  
  for (const path in modules) {
    if (path.includes(globPattern)) {
      try {
        const module = await modules[path]()
        const filename = path.split('/').pop().replace('.json', '')
        content.push({
          ...module.default || module,
          slug: filename
        })
      } catch (error) {
        console.error(`Error loading content from ${path}:`, error)
      }
    }
  }
  
  return content
}

// Load horses
export async function loadHorses() {
  try {
    const horses = await loadContentFromDirectory('/horses/')
    console.log(horses) 
    return horses.sort((a, b) => new Date(b.date) - new Date(a.date))
  } catch (error) {
    console.error('Error loading horses:', error)
    return []
  }
}

// Load services
export async function loadServices() {
  try {
    const services = await loadContentFromDirectory('/services/')
    return services.sort((a, b) => (a.order || 0) - (b.order || 0))
  } catch (error) {
    console.error('Error loading services:', error)
    return []
  }
}

// Load team members
export async function loadTeamMembers() {
  try {
    const team = await loadContentFromDirectory('/team/')
    return team.sort((a, b) => (a.order || 0) - (b.order || 0))
  } catch (error) {
    console.error('Error loading team members:', error)
    return []
  }
}

// Load blog posts
export async function loadBlogPosts() {
  try {
    const posts = await loadContentFromDirectory('/blog/')
    return posts.sort((a, b) => new Date(b.date) - new Date(a.date))
  } catch (error) {
    console.error('Error loading blog posts:', error)
    return []
  }
}

// Load facilities
export async function loadFacilities() {
  try {
    const facilities = await loadContentFromDirectory('/facilities/')
    return facilities.sort((a, b) => (a.order || 0) - (b.order || 0))
  } catch (error) {
    console.error('Error loading facilities:', error)
    return []
  }
}

// Load testimonials
export async function loadTestimonials() {
  try {
    const testimonials = await loadContentFromDirectory('/testimonials/')
    return testimonials.sort((a, b) => new Date(b.date) - new Date(a.date))
  } catch (error) {
    console.error('Error loading testimonials:', error)
    return []
  }
}

// Load a specific page
export async function loadPage(pageName) {
  try {
    const module = await import(`../content/pages/${pageName}.json`)
    return module.default || module
  } catch (error) {
    console.error(`Error loading page ${pageName}:`, error)
    return null
  }
}

// Load settings
export async function loadSettings(settingName) {
  try {
    const module = await import(`../content/settings/${settingName}.json`)
    return module.default || module
  } catch (error) {
    console.error(`Error loading settings ${settingName}:`, error)
    return null
  }
}

// Get content by slug
export function getContentBySlug(contentArray, slug) {
  return contentArray.find(item => {
    // Handle different slug formats
    const itemSlug = item.slug || 
                    item.name?.toLowerCase().replace(/\s+/g, '-') ||
                    item.title?.toLowerCase().replace(/\s+/g, '-')
    return itemSlug === slug
  })
}

// Filter content by category/type
export function filterContentByCategory(contentArray, category, categoryField = 'category') {
  if (!category || category === 'all') return contentArray
  return contentArray.filter(item => item[categoryField] === category)
}

// Search content
export function searchContent(contentArray, searchTerm, searchFields = ['title', 'body', 'excerpt']) {
  if (!searchTerm) return contentArray
  
  const term = searchTerm.toLowerCase()
  return contentArray.filter(item => {
    return searchFields.some(field => {
      const value = item[field]
      if (typeof value === 'string') {
        return value.toLowerCase().includes(term)
      }
      return false
    })
  })
}

// Get featured content
export function getFeaturedContent(contentArray, limit = 3) {
  return contentArray
    .filter(item => item.featured)
    .slice(0, limit)
}

// Get recent content
export function getRecentContent(contentArray, limit = 3) {
  return contentArray
    .filter(item => item.date)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit)
}

// Validate required fields
export function validateContent(content, requiredFields) {
  const errors = []
  
  requiredFields.forEach(field => {
    if (!content[field]) {
      errors.push(`Missing required field: ${field}`)
    }
  })
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Format price for display
export function formatPrice(price, currency = 'CAD') {
  if (!price) return 'Contact for pricing'
  
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

// Export all functions as default
export default {
  loadHorses,
  loadServices,
  loadTeamMembers,
  loadBlogPosts,
  loadFacilities,
  loadTestimonials,
  loadPage,
  loadSettings,
  getContentBySlug,
  filterContentByCategory,
  searchContent,
  getFeaturedContent,
  getRecentContent,
  validateContent,
  formatPrice
}