import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { loadHorses } from '../utils/contentLoader'

export const useHorsesStore = defineStore('horses', () => {
  // State
  const horses = ref([])
  const filters = ref({
    status: 'all',
    type: 'all',
    discipline: 'all',
    level: 'all',
    minPrice: '',
    maxPrice: '',
    search: ''
  })
  const isLoading = ref(false)
  const error = ref(null)

  // Computed
  const availableHorses = computed(() => {
    return horses.value.filter(horse => horse.status === 'Available')
  })

  const featuredHorses = computed(() => {
    return horses.value.filter(horse => horse.featured)
  })

  const filteredHorses = computed(() => {
    let result = [...horses.value]

    // Apply status filter
    if (filters.value.status !== 'all') {
      result = result.filter(horse => horse.status === filters.value.status)
    }

    // Apply type filter
    if (filters.value.type !== 'all') {
      result = result.filter(horse => {
        if (filters.value.type === 'Both') {
          return horse.type === 'Both'
        }
        return horse.type === filters.value.type || horse.type === 'Both'
      })
    }

    // Apply discipline filter
    if (filters.value.discipline !== 'all') {
      result = result.filter(horse => horse.performance?.discipline === filters.value.discipline)
    }

    // Apply level filter
    if (filters.value.level !== 'all') {
      result = result.filter(horse => horse.performance?.level === filters.value.level)
    }

    // Apply price filters
    if (filters.value.minPrice) {
      const minPrice = parseFloat(filters.value.minPrice)
      result = result.filter(horse => {
        const price = horse.pricing?.sale_price || horse.pricing?.lease_price || 0
        return price >= minPrice
      })
    }

    if (filters.value.maxPrice) {
      const maxPrice = parseFloat(filters.value.maxPrice)
      result = result.filter(horse => {
        const price = horse.pricing?.sale_price || horse.pricing?.lease_price || 0
        return price <= maxPrice
      })
    }

    // Apply search filter
    if (filters.value.search) {
      const searchTerm = filters.value.search.toLowerCase()
      result = result.filter(horse => {
        return (
          horse.name?.toLowerCase().includes(searchTerm) ||
          horse.basic_info?.breed?.toLowerCase().includes(searchTerm) ||
          horse.excerpt?.toLowerCase().includes(searchTerm) ||
          horse.body?.toLowerCase().includes(searchTerm)
        )
      })
    }

    return result
  })

  // Methods
  const loadHorsesContent = async () => {
    isLoading.value = true
    error.value = null
    try {
      horses.value = await loadHorses()
    } catch (err) {
      error.value = err.message
      console.error('Error loading horses:', err)
    } finally {
      isLoading.value = false
    }
  }

  const getHorseBySlug = (slug) => {
    return horses.value.find(horse => {
      const horseSlug = horse.slug || horse.name?.toLowerCase().replace(/\s+/g, '-')
      return horseSlug === slug
    })
  }

  const updateFilters = (newFilters) => {
    filters.value = { ...filters.value, ...newFilters }
  }

  const resetFilters = () => {
    filters.value = {
      status: 'all',
      type: 'all',
      discipline: 'all',
      level: 'all',
      minPrice: '',
      maxPrice: '',
      search: ''
    }
  }

  return {
    // State
    horses,
    filters,
    isLoading,
    error,
    
    // Computed
    availableHorses,
    featuredHorses,
    filteredHorses,
    
    // Methods
    loadHorses: loadHorsesContent,
    getHorseBySlug,
    updateFilters,
    resetFilters
  }
})