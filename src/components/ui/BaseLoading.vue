<template>
  <div :class="containerClasses" role="status" :aria-label="label">
    <!-- Spinner -->
    <div :class="spinnerClasses">
      <svg
        class="animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
    
    <!-- Loading text -->
    <p v-if="showText" :class="textClasses">
      {{ text }}
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
  },
  color: {
    type: String,
    default: 'primary'
  },
  text: {
    type: String,
    default: 'Loading...'
  },
  showText: {
    type: Boolean,
    default: true
  },
  fullScreen: {
    type: Boolean,
    default: false
  },
  overlay: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: 'Loading content'
  }
})

const containerClasses = computed(() => {
  const baseClasses = ['flex', 'flex-col', 'items-center', 'justify-center']
  
  if (props.fullScreen) {
    baseClasses.push('fixed', 'inset-0', 'z-50', 'bg-white')
  } else if (props.overlay) {
    baseClasses.push('absolute', 'inset-0', 'bg-white/90', 'backdrop-blur-sm', 'z-40')
  } else {
    baseClasses.push('py-8')
  }
  
  return baseClasses.join(' ')
})

const spinnerClasses = computed(() => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  }
  
  const colorClasses = {
    primary: 'text-warm-gold',
    secondary: 'text-deep-forest',
    white: 'text-white',
    current: 'text-current'
  }
  
  return [
    sizeClasses[props.size],
    colorClasses[props.color] || 'text-warm-gold'
  ].join(' ')
})

const textClasses = computed(() => {
  const sizeClasses = {
    sm: 'text-sm mt-2',
    md: 'text-base mt-3',
    lg: 'text-lg mt-4',
    xl: 'text-xl mt-5'
  }
  
  return [
    'text-warm-gray',
    sizeClasses[props.size]
  ].join(' ')
})
</script>