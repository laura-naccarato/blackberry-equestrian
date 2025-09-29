import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useMainStore = defineStore('main', () => {
  // Site settings
  const siteSettings = ref({
    siteTitle: 'Blackberry Equestrian',
    siteDescription: 'Premier Hunter/Jumper boarding and training facility in Newtonville, Ontario',
    contact: {
      phone: '',
      email: '',
      address: 'Newtonville, Ontario',
      hours: ''
    },
    social: {
      facebook: '',
      instagram: '',
      twitter: '',
      youtube: ''
    }
  })

  // Navigation state
  const isMenuOpen = ref(false)
  const isLoading = ref(false)

  // Current page data
  const currentPage = ref(null)

  // Methods
  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
  }

  const closeMenu = () => {
    isMenuOpen.value = false
  }

  const setLoading = (value) => {
    isLoading.value = value
  }

  const updateSiteSettings = (settings) => {
    siteSettings.value = { ...siteSettings.value, ...settings }
  }

  // Computed
  const hasContactInfo = computed(() => {
    return siteSettings.value.contact.phone || siteSettings.value.contact.email
  })

  const hasSocialMedia = computed(() => {
    const social = siteSettings.value.social
    return social.facebook || social.instagram || social.twitter || social.youtube
  })

  return {
    // State
    siteSettings,
    isMenuOpen,
    isLoading,
    currentPage,
    
    // Computed
    hasContactInfo,
    hasSocialMedia,
    
    // Methods
    toggleMenu,
    closeMenu,
    setLoading,
    updateSiteSettings
  }
})