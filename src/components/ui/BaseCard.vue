<template>
  <article
    :class="cardClasses"
    :role="interactive ? 'button' : undefined"
    :tabindex="interactive ? 0 : undefined"
    :aria-pressed="interactive && selected ? 'true' : undefined"
    @click="handleClick"
    @keydown.enter.space="handleKeydown"
  >
    <!-- Card Image -->
    <div v-if="$slots.image" class="relative overflow-hidden">
      <slot name="image" />
      
      <!-- Badge overlay -->
      <div v-if="badge" class="absolute top-4 left-4">
        <span :class="badgeClasses">
          {{ badge }}
        </span>
      </div>

      <!-- Price overlay -->
      <div v-if="price" class="absolute bottom-4 right-4">
        <span class="bg-white/95 backdrop-blur-sm text-deep-forest font-semibold px-3 py-1.5 rounded-lg shadow-lg">
          {{ price }}
        </span>
      </div>
    </div>

    <!-- Card Header -->
    <header
      v-if="$slots.header || title"
      class="px-6 py-4 border-b border-warm-gray/20"
    >
      <slot name="header">
        <h3 v-if="title" class="text-lg font-semibold text-charcoal">
          {{ title }}
        </h3>
      </slot>
    </header>

    <!-- Card Body -->
    <div class="p-6">
      <slot />
    </div>

    <!-- Card Footer -->
    <footer
      v-if="$slots.footer"
      class="px-6 py-4 border-t border-warm-gray/20 bg-cream/30"
    >
      <slot name="footer" />
    </footer>
  </article>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'elevated', 'bordered', 'flat'].includes(value)
  },
  interactive: {
    type: Boolean,
    default: false
  },
  selected: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: null
  },
  badge: {
    type: String,
    default: null
  },
  badgeColor: {
    type: String,
    default: 'primary',
    validator: (value) =>
      ['primary', 'success', 'warning', 'error', 'info'].includes(value)
  },
  price: {
    type: String,
    default: null
  },
  hover: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['click'])

const handleClick = (event) => {
  if (props.interactive) {
    emit('click', event)
  }
}

const handleKeydown = (event) => {
  if (props.interactive && (event.key === 'Enter' || event.key === ' ')) {
    event.preventDefault()
    emit('click', event)
  }
}

const cardClasses = computed(() => {
  const baseClasses = [
    'bg-white',
    'overflow-hidden',
    'rounded-xl',
    'relative'
  ]

  const variantClasses = {
    default: 'shadow-soft',
    elevated: 'shadow-medium',
    bordered: 'border border-warm-gray/20 shadow-sm',
    flat: 'shadow-none border border-warm-gray/10'
  }

  const classes = [
    ...baseClasses,
    variantClasses[props.variant]
  ]

  if (props.interactive) {
    classes.push(
      'cursor-pointer',
      'transition-all',
      'duration-200',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-warm-gold',
      'focus:ring-offset-2',
      'focus:ring-offset-cream'
    )

    if (props.hover) {
      classes.push(
        'hover:shadow-strong',
        'hover:-translate-y-1'
      )
    }
  }

  if (props.selected) {
    classes.push(
      'ring-2',
      'ring-warm-gold',
      'ring-offset-2',
      'ring-offset-cream'
    )
  }

  return classes.join(' ')
})

const badgeClasses = computed(() => {
  const baseClasses = [
    'inline-block',
    'px-3',
    'py-1',
    'text-sm',
    'font-semibold',
    'rounded-full'
  ]

  const colorClasses = {
    primary: 'bg-warm-gold text-rich-brown',
    success: 'bg-hunter-green/10 text-hunter-green',
    warning: 'bg-hay-gold text-rich-brown',
    error: 'bg-barn-red/10 text-barn-red',
    info: 'bg-sky-blue/20 text-deep-forest'
  }

  return [...baseClasses, colorClasses[props.badgeColor]].join(' ')
})
</script>