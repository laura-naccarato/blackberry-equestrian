<template>
  <component
    :is="tag"
    :type="tag === 'button' ? type : undefined"
    :class="buttonClasses"
    :style="{ transitionDuration: `${transitionDuration.value}ms` }"
    :disabled="disabled || loading"
    :aria-disabled="disabled || loading"
    :aria-busy="loading"
    v-bind="$attrs"
    @click="handleClick"
  >
    <!-- Loading spinner -->
    <svg
      v-if="loading"
      class="animate-spin -ml-1 mr-3 h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
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

    <!-- Left icon slot -->
    <span v-if="$slots['icon-left']" class="mr-2">
      <slot name="icon-left" />
    </span>

    <!-- Button content -->
    <span>
      <slot />
    </span>

    <!-- Right icon slot -->
    <span v-if="$slots['icon-right']" class="ml-2">
      <slot name="icon-right" />
    </span>
  </component>
</template>

<script setup>
import { computed } from 'vue'
import { getAnimationDuration } from '@/utils/accessibility'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) =>
      ['primary', 'secondary', 'outline', 'ghost', 'danger'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
  },
  type: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'submit', 'reset'].includes(value)
  },
  tag: {
    type: String,
    default: 'button'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  fullWidth: {
    type: Boolean,
    default: false
  },
  rounded: {
    type: String,
    default: 'lg',
    validator: (value) => ['none', 'sm', 'md', 'lg', 'xl', 'full'].includes(value)
  }
})

const emit = defineEmits(['click'])

const handleClick = (event) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}

const transitionDuration = computed(() => getAnimationDuration(200))

const buttonClasses = computed(() => {
  const baseClasses = [
    'inline-flex',
    'items-center',
    'justify-center',
    'font-medium',
    'transition-all',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
    'focus:ring-offset-cream',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
    'min-h-[44px]' // Ensures minimum 44px touch targets
  ]

  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm min-h-[36px]',
    md: 'px-4 py-2.5 text-base min-h-[44px]',
    lg: 'px-6 py-3 text-lg min-h-[48px]',
    xl: 'px-8 py-4 text-xl min-h-[56px]'
  }

  // Rounded classes
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full'
  }

  // Variant classes
  const variantClasses = {
    primary: [
      'bg-warm-gold',
      'text-rich-brown',
      'hover:bg-rich-brown',
      'hover:text-warm-gold',
      'focus:ring-warm-gold',
      'shadow-md',
      'hover:shadow-lg',
      'transform',
      'hover:-translate-y-0.5',
      'active:translate-y-0'
    ],
    secondary: [
      'bg-deep-forest',
      'text-white',
      'hover:bg-charcoal',
      'focus:ring-deep-forest',
      'shadow-md',
      'hover:shadow-lg',
      'transform',
      'hover:-translate-y-0.5',
      'active:translate-y-0'
    ],
    outline: [
      'border-2',
      'border-deep-forest',
      'text-deep-forest',
      'hover:bg-deep-forest',
      'hover:text-white',
      'focus:ring-deep-forest',
      'bg-transparent'
    ],
    ghost: [
      'text-deep-forest',
      'hover:bg-sage-green/20',
      'hover:text-charcoal',
      'focus:ring-sage-green',
      'bg-transparent'
    ],
    danger: [
      'bg-barn-red',
      'text-white',
      'hover:bg-red-700',
      'focus:ring-barn-red',
      'shadow-md',
      'hover:shadow-lg',
      'transform',
      'hover:-translate-y-0.5',
      'active:translate-y-0'
    ]
  }

  const classes = [
    ...baseClasses,
    sizeClasses[props.size],
    roundedClasses[props.rounded],
    ...variantClasses[props.variant]
  ]

  if (props.fullWidth) {
    classes.push('w-full')
  }

  if (props.loading) {
    classes.push('cursor-wait')
  }

  return classes.join(' ')
})
</script>