<template>
  <Transition name="fade">
    <div
      v-if="showIndicator"
      class="fixed top-20 right-4 z-40 bg-white rounded-lg shadow-medium border p-3 max-w-xs"
      role="status"
      aria-live="polite"
    >
      <div class="flex items-center space-x-3">
        <!-- Connection Icon -->
        <div class="flex-shrink-0">
          <div
            :class="[
              'w-8 h-8 rounded-full flex items-center justify-center',
              connectionIconClass
            ]"
          >
            <component :is="connectionIcon" class="w-4 h-4" />
          </div>
        </div>

        <!-- Status Text -->
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-charcoal">
            {{ statusText }}
          </p>
          <p v-if="connectionType !== 'unknown'" class="text-xs text-warm-gray">
            {{ connectionTypeText }}
          </p>
        </div>

        <!-- Close Button -->
        <button
          v-if="dismissible"
          @click="dismiss"
          class="flex-shrink-0 text-warm-gray hover:text-charcoal transition-colors p-1"
          aria-label="Dismiss connection status"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Offline Actions -->
      <div v-if="!isOnline" class="mt-3 pt-3 border-t border-warm-gray/20">
        <p class="text-xs text-warm-gray mb-2">
          Some features may be limited while offline
        </p>
        <div class="flex space-x-2">
          <BaseButton
            variant="outline"
            size="sm"
            @click="retryConnection"
            :loading="retrying"
            class="text-xs"
          >
            {{ retrying ? 'Retrying...' : 'Retry' }}
          </BaseButton>
          <BaseButton
            variant="ghost"
            size="sm"
            @click="dismiss"
            class="text-xs"
          >
            Dismiss
          </BaseButton>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useConnection } from '@/composables/usePWA'
import BaseButton from './BaseButton.vue'

// Icons
import {
  WifiIcon,
  ExclamationTriangleIcon,
  CloudIcon,
  SignalIcon
} from '@heroicons/vue/24/outline'

const { isOnline, connectionType, isSlowConnection, isFastConnection } = useConnection()

const dismissed = ref(false)
const retrying = ref(false)
const showIndicator = ref(false)

const dismissible = computed(() => !isOnline.value || isSlowConnection.value)

const statusText = computed(() => {
  if (!isOnline.value) return 'You are offline'
  if (isSlowConnection.value) return 'Slow connection detected'
  if (isFastConnection.value) return 'Fast connection'
  return 'Connected'
})

const connectionTypeText = computed(() => {
  if (connectionType.value === 'unknown') return ''
  return `Connection: ${connectionType.value.toUpperCase()}`
})

const connectionIcon = computed(() => {
  if (!isOnline.value) return ExclamationTriangleIcon
  if (isSlowConnection.value) return SignalIcon
  if (isFastConnection.value) return WifiIcon
  return CloudIcon
})

const connectionIconClass = computed(() => {
  if (!isOnline.value) return 'bg-barn-red text-white'
  if (isSlowConnection.value) return 'bg-hay-gold text-rich-brown'
  if (isFastConnection.value) return 'bg-hunter-green text-white'
  return 'bg-sage-green text-white'
})

const dismiss = () => {
  dismissed.value = true
  showIndicator.value = false
}

const retryConnection = async () => {
  retrying.value = true
  // Simulate connection check
  await new Promise(resolve => setTimeout(resolve, 2000))
  retrying.value = false

  // Check if we're back online
  if (navigator.onLine) {
    dismissed.value = false
  }
}

// Show indicator when connection status changes
watch([isOnline, isSlowConnection], ([online, slow]) => {
  if (!online || slow) {
    showIndicator.value = true
    dismissed.value = false
  } else if (online && !slow) {
    // Hide after a delay for good connections
    setTimeout(() => {
      if (isOnline.value && !isSlowConnection.value) {
        showIndicator.value = false
      }
    }, 3000)
  }
}, { immediate: true })

// Auto-hide after 5 seconds for non-critical status
let autoHideTimer
watch(showIndicator, (show) => {
  if (autoHideTimer) clearTimeout(autoHideTimer)

  if (show && isOnline.value && !isSlowConnection.value) {
    autoHideTimer = setTimeout(() => {
      showIndicator.value = false
    }, 5000)
  }
})

onMounted(() => {
  // Show indicator briefly on load to confirm connection
  setTimeout(() => {
    if (isOnline.value && !isSlowConnection.value && !dismissed.value) {
      showIndicator.value = true
    }
  }, 1000)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>