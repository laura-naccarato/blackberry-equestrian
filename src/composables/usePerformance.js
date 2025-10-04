import { ref, computed, onMounted } from 'vue'
import { useConnection } from './usePWA'

const imageLoadStates = ref(new Map())
const lazyLoadObserver = ref(null)

export function usePerformance() {
  const { isOnline, isSlowConnection, isFastConnection } = useConnection()

  // Progressive enhancement based on connection
  const enableProgressiveEnhancement = computed(() => {
    if (!isOnline.value) return false
    if (isSlowConnection.value) return false
    return true
  })

  // Image loading strategy
  const getImageLoadingStrategy = () => {
    if (!isOnline.value) return 'cache-only'
    if (isSlowConnection.value) return 'lazy'
    if (isFastConnection.value) return 'eager'
    return 'lazy'
  }

  // Lazy load images with intersection observer
  const setupLazyLoading = () => {
    if (!window.IntersectionObserver) return

    lazyLoadObserver.value = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target
          const src = img.dataset.src
          if (src) {
            img.src = src
            img.classList.remove('lazy')
            lazyLoadObserver.value.unobserve(img)
          }
        }
      })
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    })
  }

  // Lazy load a specific image
  const lazyLoadImage = (imgElement) => {
    if (!lazyLoadObserver.value) setupLazyLoading()
    lazyLoadObserver.value.observe(imgElement)
  }

  // Preload critical images
  const preloadCriticalImages = (imageUrls) => {
    if (!enableProgressiveEnhancement.value) return

    imageUrls.forEach(url => {
      const img = new Image()
      img.src = url
      imageLoadStates.value.set(url, 'loading')

      img.onload = () => {
        imageLoadStates.value.set(url, 'loaded')
      }

      img.onerror = () => {
        imageLoadStates.value.set(url, 'error')
      }
    })
  }

  // Debounced function for performance
  const debounce = (func, wait) => {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  // Throttled function for performance
  const throttle = (func, limit) => {
    let inThrottle
    return function() {
      const args = arguments
      const context = this
      if (!inThrottle) {
        func.apply(context, args)
        inThrottle = true
        setTimeout(() => inThrottle = false, limit)
      }
    }
  }

  // Resource hints for performance
  const addResourceHints = () => {
    if (!enableProgressiveEnhancement.value) return

    // Preconnect to external domains
    const hints = [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }
    ]

    hints.forEach(hint => {
      const link = document.createElement('link')
      Object.assign(link, hint)
      document.head.appendChild(link)
    })
  }

  // Bundle splitting hints
  const shouldLoadHeavyComponents = computed(() => {
    return enableProgressiveEnhancement.value
  })

  // Connection-aware API calls
  const makeConnectionAwareRequest = async (url, options = {}) => {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10s timeout

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        // Reduce priority for slow connections
        priority: isSlowConnection.value ? 'low' : 'auto'
      })

      clearTimeout(timeoutId)
      return response
    } catch (error) {
      clearTimeout(timeoutId)
      if (error.name === 'AbortError') {
        throw new Error('Request timeout')
      }
      throw error
    }
  }

  // Memory management for large lists
  const useVirtualScrolling = (items, itemHeight, containerHeight) => {
    const scrollTop = ref(0)
    const visibleItems = computed(() => {
      const start = Math.floor(scrollTop.value / itemHeight)
      const end = Math.min(
        start + Math.ceil(containerHeight / itemHeight) + 2, // +2 for buffer
        items.length
      )
      return items.slice(Math.max(0, start - 1), end) // -1 for buffer
    })

    const offsetY = computed(() => {
      const start = Math.floor(scrollTop.value / itemHeight)
      return Math.max(0, start - 1) * itemHeight
    })

    const totalHeight = computed(() => items.length * itemHeight)

    return {
      scrollTop,
      visibleItems,
      offsetY,
      totalHeight
    }
  }

  onMounted(() => {
    setupLazyLoading()
    addResourceHints()
  })

  return {
    enableProgressiveEnhancement,
    getImageLoadingStrategy,
    lazyLoadImage,
    preloadCriticalImages,
    debounce,
    throttle,
    shouldLoadHeavyComponents,
    makeConnectionAwareRequest,
    useVirtualScrolling,
    imageLoadStates: computed(() => imageLoadStates.value)
  }
}