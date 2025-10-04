import { ref, computed, onMounted, onUnmounted } from 'vue'

const deferredPrompt = ref(null)
const isInstallable = ref(false)
const isInstalled = ref(false)
const isOnline = ref(navigator.onLine)
const connectionType = ref('unknown')

// PWA Install functionality
export function usePWAInstall() {
  const canInstall = computed(() => isInstallable.value && !isInstalled.value)

  const install = async () => {
    if (!deferredPrompt.value) return false

    deferredPrompt.value.prompt()
    const { outcome } = await deferredPrompt.value.userChoice

    if (outcome === 'accepted') {
      isInstalled.value = true
    }

    deferredPrompt.value = null
    return outcome === 'accepted'
  }

  const dismiss = () => {
    deferredPrompt.value = null
    isInstallable.value = false
  }

  onMounted(() => {
    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault()
      deferredPrompt.value = e
      isInstallable.value = true
    }

    // Listen for successful installation
    const handleAppInstalled = () => {
      isInstalled.value = true
      isInstallable.value = false
      deferredPrompt.value = null
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    onUnmounted(() => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    })
  })

  return {
    canInstall,
    isInstalled,
    install,
    dismiss
  }
}

// Connection awareness functionality
export function useConnection() {
  const updateConnectionStatus = () => {
    isOnline.value = navigator.onLine

    // Get connection type if available
    if ('connection' in navigator) {
      connectionType.value = navigator.connection.effectiveType || 'unknown'
    }
  }

  const isSlowConnection = computed(() => {
    return !isOnline.value || ['slow-2g', '2g'].includes(connectionType.value)
  })

  const isFastConnection = computed(() => {
    return isOnline.value && ['4g', '5g'].includes(connectionType.value)
  })

  onMounted(() => {
    window.addEventListener('online', updateConnectionStatus)
    window.addEventListener('offline', updateConnectionStatus)

    // Listen for connection changes if supported
    if ('connection' in navigator) {
      navigator.connection.addEventListener('change', updateConnectionStatus)
    }

    updateConnectionStatus()

    onUnmounted(() => {
      window.removeEventListener('online', updateConnectionStatus)
      window.removeEventListener('offline', updateConnectionStatus)

      if ('connection' in navigator) {
        navigator.connection.removeEventListener('change', updateConnectionStatus)
      }
    })
  })

  return {
    isOnline: computed(() => isOnline.value),
    connectionType: computed(() => connectionType.value),
    isSlowConnection,
    isFastConnection
  }
}

// Combined PWA functionality
export function usePWA() {
  const install = usePWAInstall()
  const connection = useConnection()

  return {
    ...install,
    ...connection
  }
}