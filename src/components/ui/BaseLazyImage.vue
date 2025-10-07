<template>
  <div class="relative overflow-hidden" :class="wrapperClasses">
    <!-- Main Image -->
    <img
      ref="imgRef"
      :src="currentSrc"
      :alt="alt"
      :class="imageClasses"
      :loading="loadingStrategy"
      @load="handleLoad"
      @error="handleError"
      :data-src="lazySrc"
    />

    <!-- Loading Placeholder -->
    <div
      v-if="showLoading"
      class="absolute inset-0 bg-tan-light/10 flex items-center justify-center"
    >
      <BaseLoading size="md" />
    </div>

    <!-- Error State -->
    <div
      v-else-if="hasError"
      class="absolute inset-0 bg-gray/10 flex items-center justify-center"
    >
      <div class="text-center text-gray">
        <svg class="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
        </svg>
        <p class="text-sm">Image unavailable</p>
      </div>
    </div>

    <!-- Retry Button for Error State -->
    <button
      v-if="hasError && retryable"
      @click="retry"
      class="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
      aria-label="Retry loading image"
    >
      <svg class="w-4 h-4 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { usePerformance } from '@/composables/usePerformance'
import BaseLoading from './BaseLoading.vue'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  },
  lazy: {
    type: Boolean,
    default: true
  },
  aspectRatio: {
    type: String,
    default: null // e.g., '16/9', '4/3', '1/1'
  },
  objectFit: {
    type: String,
    default: 'cover',
    validator: (value) => ['contain', 'cover', 'fill', 'none', 'scale-down'].includes(value)
  },
  sizes: {
    type: String,
    default: null
  },
  srcset: {
    type: String,
    default: null
  },
  placeholder: {
    type: String,
    default: '/images/placeholder.svg'
  },
  retryable: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['load', 'error'])

const { getImageLoadingStrategy, lazyLoadImage, enableProgressiveEnhancement } = usePerformance()

const imgRef = ref(null)
const isLoading = ref(true)
const hasError = ref(false)
const retryCount = ref(0)

const loadingStrategy = computed(() => {
  if (!props.lazy) return 'eager'
  return getImageLoadingStrategy() === 'eager' ? 'eager' : 'lazy'
})

const currentSrc = computed(() => {
  if (props.lazy && loadingStrategy.value === 'lazy') {
    return props.placeholder
  }
  return props.src
})

const lazySrc = computed(() => {
  return props.lazy ? props.src : null
})

const showLoading = computed(() => {
  return isLoading.value && !hasError.value
})

const wrapperClasses = computed(() => {
  const classes = ['lazy-image-wrapper']

  if (props.aspectRatio) {
    classes.push('aspect-ratio-wrapper')
  }

  return classes.join(' ')
})

const imageClasses = computed(() => {
  const classes = [
    'w-full h-full transition-opacity duration-300',
    `object-${props.objectFit}`
  ]

  if (isLoading.value) {
    classes.push('opacity-0')
  } else {
    classes.push('opacity-100')
  }

  if (props.aspectRatio) {
    classes.push('absolute inset-0')
  }

  return classes.join(' ')
})

const handleLoad = () => {
  isLoading.value = false
  hasError.value = false
  emit('load')
}

const handleError = (event) => {
  isLoading.value = false
  hasError.value = true
  emit('error', event)
}

const retry = () => {
  if (retryCount.value >= 2) return // Max 2 retries

  retryCount.value++
  isLoading.value = true
  hasError.value = false

  // Force reload by adding timestamp
  const img = imgRef.value
  if (img) {
    img.src = `${props.src}?retry=${retryCount.value}&t=${Date.now()}`
  }
}

onMounted(() => {
  if (props.lazy && enableProgressiveEnhancement.value) {
    lazyLoadImage(imgRef.value)
  }
})

watch(() => props.src, () => {
  isLoading.value = true
  hasError.value = false
  retryCount.value = 0
})
</script>

<style scoped>
.aspect-ratio-wrapper {
  position: relative;
  width: 100%;
}

.aspect-ratio-wrapper::before {
  content: '';
  display: block;
  padding-bottom: calc(var(--aspect-ratio) * 100%);
}

.aspect-ratio-wrapper[style*="--aspect-ratio: 16/9"]::before {
  padding-bottom: 56.25%;
}

.aspect-ratio-wrapper[style*="--aspect-ratio: 4/3"]::before {
  padding-bottom: 75%;
}

.aspect-ratio-wrapper[style*="--aspect-ratio: 1/1"]::before {
  padding-bottom: 100%;
}

.aspect-ratio-wrapper[style*="--aspect-ratio: 3/4"]::before {
  padding-bottom: 133.33%;
}
</style>