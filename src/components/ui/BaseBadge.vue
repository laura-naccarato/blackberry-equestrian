<template>
  <span
    :class="badgeClasses"
    :aria-label="ariaLabel || label"
  >
    <span v-if="showDot" :class="dotClasses" aria-hidden="true"></span>
    <slot>{{ label }}</slot>
    <button
      v-if="removable"
      type="button"
      :class="removeButtonClasses"
      @click="$emit('remove')"
      :aria-label="`Remove ${label}`"
    >
      <svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
        <path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) =>
      ['default', 'primary', 'success', 'warning', 'error', 'info'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  rounded: {
    type: String,
    default: 'full',
    validator: (value) => ['sm', 'md', 'lg', 'full'].includes(value)
  },
  outlined: {
    type: Boolean,
    default: false
  },
  showDot: {
    type: Boolean,
    default: false
  },
  removable: {
    type: Boolean,
    default: false
  },
  ariaLabel: {
    type: String,
    default: null
  }
})

defineEmits(['remove'])

const badgeClasses = computed(() => {
  const baseClasses = [
    'inline-flex',
    'items-center',
    'font-medium',
    'transition-colors'
  ]

  // Size classes
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base'
  }

  // Rounded classes
  const roundedClasses = {
    sm: 'rounded',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  }

  // Variant classes
  let variantClasses = []
  if (props.outlined) {
    // Outlined variants
    const outlinedVariants = {
      default: 'border border-warm-gray/50 text-charcoal bg-transparent',
      primary: 'border border-warm-gold text-warm-gold bg-transparent',
      success: 'border border-hunter-green text-hunter-green bg-transparent',
      warning: 'border border-hay-gold text-rich-brown bg-transparent',
      error: 'border border-barn-red text-barn-red bg-transparent',
      info: 'border border-sky-blue text-deep-forest bg-transparent'
    }
    variantClasses = outlinedVariants[props.variant].split(' ')
  } else {
    // Filled variants
    const filledVariants = {
      default: 'bg-warm-gray/10 text-charcoal',
      primary: 'bg-warm-gold text-rich-brown',
      success: 'bg-hunter-green/10 text-hunter-green',
      warning: 'bg-hay-gold text-rich-brown',
      error: 'bg-barn-red/10 text-barn-red',
      info: 'bg-sky-blue/20 text-deep-forest'
    }
    variantClasses = filledVariants[props.variant].split(' ')
  }

  return [
    ...baseClasses,
    sizeClasses[props.size],
    roundedClasses[props.rounded],
    ...variantClasses
  ].join(' ')
})

const dotClasses = computed(() => {
  const sizeClasses = {
    sm: 'h-1.5 w-1.5 -ml-0.5 mr-1',
    md: 'h-2 w-2 -ml-0.5 mr-1.5',
    lg: 'h-2.5 w-2.5 -ml-0.5 mr-2'
  }

  const colorClasses = {
    default: 'bg-charcoal',
    primary: 'bg-warm-gold',
    success: 'bg-hunter-green',
    warning: 'bg-rich-brown',
    error: 'bg-barn-red',
    info: 'bg-deep-forest'
  }

  return [
    'rounded-full',
    sizeClasses[props.size],
    colorClasses[props.variant]
  ].join(' ')
})

const removeButtonClasses = computed(() => {
  const sizeClasses = {
    sm: 'ml-0.5 -mr-0.5',
    md: 'ml-1 -mr-1',
    lg: 'ml-1.5 -mr-1.5'
  }

  return [
    sizeClasses[props.size],
    'hover:opacity-75',
    'focus:opacity-75',
    'focus:outline-none',
    'transition-opacity'
  ].join(' ')
})
</script>