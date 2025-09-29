/**
 * Image handling utilities for Blackberry Equestrian
 * Provides fallback mechanisms for missing images
 */

// Default placeholder image path
export const PLACEHOLDER_IMAGE = '/images/placeholder.svg'
export const HORSE_PLACEHOLDER = '/images/horse-placeholder.svg'

/**
 * Get image URL with fallback
 * @param {string} path - Image path
 * @param {string} fallback - Fallback image path
 * @returns {string} - Image URL
 */
export function getImageUrl(path, fallback = PLACEHOLDER_IMAGE) {
  // In production, return the path as-is (will be handled by error event)
  // In development, we could check if the image exists
  return path || fallback
}

/**
 * Handle image load error
 * @param {Event} event - Error event
 * @param {string} fallback - Fallback image path
 */
export function handleImageError(event, fallback = PLACEHOLDER_IMAGE) {
  if (event.target.src !== fallback) {
    event.target.src = fallback
  }
}

/**
 * Preload images for better performance
 * @param {string[]} urls - Array of image URLs to preload
 */
export function preloadImages(urls) {
  urls.forEach(url => {
    const img = new Image()
    img.src = url
  })
}

/**
 * Get responsive image srcset
 * @param {string} basePath - Base image path
 * @param {number[]} sizes - Array of sizes
 * @returns {string} - Srcset string
 */
export function getImageSrcset(basePath, sizes = [640, 768, 1024, 1280]) {
  const ext = basePath.split('.').pop()
  const name = basePath.replace(`.${ext}`, '')
  
  return sizes
    .map(size => `${name}-${size}w.${ext} ${size}w`)
    .join(', ')
}

/**
 * Image gallery configurations
 * Using placeholder paths that won't trigger Vite resolution
 */
export const galleryImages = {
  indoor: [
    { caption: 'Main riding area' },
    { caption: 'Jump course setup' },
    { caption: 'Viewing lounge' },
    { caption: 'Evening lesson' },
    { caption: 'Clinic setup' },
    { caption: 'Footing detail' }
  ],
  outdoor: [
    { caption: 'Main competition ring' },
    { caption: 'Jump course' },
    { caption: 'Warm-up ring' },
    { caption: 'Derby field' },
    { caption: 'Cavaletti setup' },
    { caption: 'Ring maintenance' }
  ],
  barn: [
    { caption: 'Center aisle' },
    { caption: 'Box stalls' },
    { caption: 'Grooming stalls' },
    { caption: 'Feed room' },
    { caption: 'Medical supplies' },
    { caption: 'Barn office' }
  ],
  paddocks: [
    { caption: 'Large turnout' },
    { caption: 'Small paddocks' },
    { caption: 'Round pen' },
    { caption: 'Grass pasture' },
    { caption: 'Winter paddocks' },
    { caption: 'Shelter access' }
  ]
}

// Add URLs dynamically to avoid Vite static analysis
export function getGalleryImages(category) {
  const images = galleryImages[category] || []
  return images.map((img, index) => ({
    ...img,
    url: PLACEHOLDER_IMAGE // Use placeholder for now
  }))
}