import { ref, computed, onMounted } from 'vue'
import { useConnection } from './usePWA'

const cachedContent = ref(new Map())
const isContentCached = ref(false)

export function useOfflineContent() {
  const { isOnline, isSlowConnection } = useConnection()

  // Cache key content for offline access
  const cacheContent = async (key, content) => {
    try {
      if ('caches' in window) {
        const cache = await caches.open('blackberry-content-v1')
        await cache.put(key, new Response(JSON.stringify(content)))
        cachedContent.value.set(key, content)
        isContentCached.value = true
      }
    } catch (error) {
      console.warn('Failed to cache content:', error)
    }
  }

  // Retrieve cached content
  const getCachedContent = async (key) => {
    try {
      if ('caches' in window) {
        const cache = await caches.open('blackberry-content-v1')
        const response = await cache.match(key)
        if (response) {
          const data = await response.json()
          cachedContent.value.set(key, data)
          return data
        }
      }
    } catch (error) {
      console.warn('Failed to retrieve cached content:', error)
    }
    return null
  }

  // Check if content is available offline
  const isContentAvailableOffline = (key) => {
    return cachedContent.value.has(key)
  }

  // Get content with fallback to cache
  const getContentWithFallback = async (key, fetchFunction) => {
    // Try to fetch fresh content if online
    if (isOnline.value && !isSlowConnection.value) {
      try {
        const freshContent = await fetchFunction()
        await cacheContent(key, freshContent)
        return freshContent
      } catch (error) {
        console.warn('Failed to fetch fresh content, using cache:', error)
      }
    }

    // Fallback to cached content
    const cached = await getCachedContent(key)
    if (cached) {
      return cached
    }

    // If no cache and offline, throw error
    if (!isOnline.value) {
      throw new Error('Content not available offline')
    }

    // Last resort: try to fetch even on slow connection
    return await fetchFunction()
  }

  // Preload critical content
  const preloadCriticalContent = async () => {
    const criticalPaths = [
      '/api/content/home',
      '/api/content/services',
      '/api/content/facilities'
    ]

    for (const path of criticalPaths) {
      try {
        // This would be replaced with actual API calls
        const mockData = { path, cached: true, timestamp: Date.now() }
        await cacheContent(path, mockData)
      } catch (error) {
        console.warn(`Failed to preload ${path}:`, error)
      }
    }
  }

  onMounted(() => {
    preloadCriticalContent()
  })

  return {
    isOnline,
    isSlowConnection,
    isContentCached: computed(() => isContentCached.value),
    cacheContent,
    getCachedContent,
    isContentAvailableOffline,
    getContentWithFallback,
    preloadCriticalContent
  }
}