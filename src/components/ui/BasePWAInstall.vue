<template>
  <Transition name="slide-down">
    <div
      v-if="canInstall && !dismissed"
      class="fixed bottom-0 left-0 right-0 z-50 bg-deep-forest text-white shadow-strong p-4 md:p-6"
      role="banner"
      aria-label="Install Blackberry Equestrian app"
    >
      <div class="container-wide">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 bg-warm-gold rounded-lg flex items-center justify-center flex-shrink-0">
              <svg class="w-6 h-6 text-rich-brown" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C10.9 2 10 2.9 10 4C10 5.1 10.9 6 12 6C13.1 6 14 5.1 14 4C14 2.9 13.1 2 12 2ZM12 8C9.8 8 8 9.8 8 12C8 14.2 9.8 16 12 16C14.2 16 16 14.2 16 12C16 9.8 14.2 8 12 8ZM12 18C7.6 18 4 21.6 4 26V28H20V26C20 21.6 16.4 18 12 18Z"/>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-lg">Install Blackberry Equestrian</h3>
              <p class="text-sm text-warm-gray">
                Get the full experience with offline access and quick loading
              </p>
            </div>
          </div>

          <div class="flex items-center space-x-3">
            <button
              @click="dismiss"
              class="text-warm-gray hover:text-white transition-colors p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Dismiss install prompt"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>

            <BaseButton
              variant="secondary"
              size="md"
              @click="install"
              :loading="installing"
              class="min-h-[44px]"
            >
              {{ installing ? 'Installing...' : 'Install' }}
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref } from 'vue'
import { usePWAInstall } from '@/composables/usePWA'
import BaseButton from './BaseButton.vue'

const { canInstall, install: installPWA } = usePWAInstall()
const dismissed = ref(false)
const installing = ref(false)

const dismiss = () => {
  dismissed.value = true
}

const install = async () => {
  installing.value = true
  try {
    const success = await installPWA()
    if (success) {
      dismissed.value = true
    }
  } catch (error) {
    console.error('Failed to install PWA:', error)
  } finally {
    installing.value = false
  }
}
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>