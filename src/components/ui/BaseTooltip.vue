<template>
  <div class="relative inline-block" ref="tooltipContainer">
    <!-- Trigger element -->
    <div
      @mouseenter="showTooltip"
      @mouseleave="hideTooltip"
      @focus="showTooltip"
      @blur="hideTooltip"
      :aria-describedby="isVisible ? tooltipId : undefined"
    >
      <slot />
    </div>

    <!-- Tooltip content -->
    <Teleport to="body">
      <Transition name="tooltip">
        <div
          v-if="isVisible"
          :id="tooltipId"
          ref="tooltip"
          role="tooltip"
          :class="tooltipClasses"
          :style="tooltipStyles"
        >
          <div class="tooltip-content">
            {{ content }}
          </div>
          <div
            v-if="showArrow"
            :class="arrowClasses"
            :style="arrowStyles"
          ></div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { generateId } from '@/utils/accessibility'

const props = defineProps({
  content: {
    type: String,
    required: true
  },
  placement: {
    type: String,
    default: 'top',
    validator: (value) =>
      ['top', 'bottom', 'left', 'right', 'top-start', 'top-end', 'bottom-start', 'bottom-end'].includes(value)
  },
  trigger: {
    type: String,
    default: 'hover',
    validator: (value) => ['hover', 'click', 'focus'].includes(value)
  },
  delay: {
    type: Number,
    default: 200 // milliseconds
  },
  offset: {
    type: Number,
    default: 8 // pixels
  },
  showArrow: {
    type: Boolean,
    default: true
  },
  maxWidth: {
    type: String,
    default: '200px'
  },
  theme: {
    type: String,
    default: 'dark',
    validator: (value) => ['dark', 'light'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

// Refs
const tooltipContainer = ref(null)
const tooltip = ref(null)
const isVisible = ref(false)
const tooltipPosition = ref({ top: 0, left: 0 })
const arrowPosition = ref({ top: 0, left: 0 })
const tooltipId = generateId('tooltip')

let showTimeout = null
let hideTimeout = null

// Computed
const tooltipClasses = computed(() => {
  const baseClasses = [
    'absolute',
    'z-50',
    'px-3',
    'py-2',
    'text-sm',
    'rounded-lg',
    'shadow-lg',
    'pointer-events-none',
    'whitespace-normal'
  ]

  const themeClasses = {
    dark: 'bg-charcoal text-white',
    light: 'bg-white text-charcoal border border-gray/20'
  }

  return [
    ...baseClasses,
    themeClasses[props.theme]
  ].join(' ')
})

const tooltipStyles = computed(() => ({
  top: `${tooltipPosition.value.top}px`,
  left: `${tooltipPosition.value.left}px`,
  maxWidth: props.maxWidth
}))

const arrowClasses = computed(() => {
  const baseClasses = ['absolute', 'w-2', 'h-2', 'rotate-45']

  const themeClasses = {
    dark: 'bg-charcoal',
    light: 'bg-white border-gray/20'
  }

  const placementClasses = {
    top: 'bottom-0 translate-y-1/2 border-b border-r',
    bottom: 'top-0 -translate-y-1/2 border-t border-l',
    left: 'right-0 translate-x-1/2 border-t border-r',
    right: 'left-0 -translate-x-1/2 border-b border-l',
    'top-start': 'bottom-0 translate-y-1/2 border-b border-r',
    'top-end': 'bottom-0 translate-y-1/2 border-b border-r',
    'bottom-start': 'top-0 -translate-y-1/2 border-t border-l',
    'bottom-end': 'top-0 -translate-y-1/2 border-t border-l'
  }

  return [
    ...baseClasses,
    themeClasses[props.theme],
    placementClasses[props.placement]
  ].join(' ')
})

const arrowStyles = computed(() => ({
  top: `${arrowPosition.value.top}px`,
  left: `${arrowPosition.value.left}px`
}))

// Methods
const calculatePosition = async () => {
  if (!tooltipContainer.value || !tooltip.value) return

  await nextTick()

  const trigger = tooltipContainer.value.getBoundingClientRect()
  const tooltipEl = tooltip.value
  const tooltipRect = tooltipEl.getBoundingClientRect()
  
  let top = 0
  let left = 0
  let arrowTop = 'auto'
  let arrowLeft = '50%'

  // Calculate position based on placement
  switch (props.placement) {
    case 'top':
      top = trigger.top - tooltipRect.height - props.offset
      left = trigger.left + (trigger.width - tooltipRect.width) / 2
      break
    case 'top-start':
      top = trigger.top - tooltipRect.height - props.offset
      left = trigger.left
      arrowLeft = '16px'
      break
    case 'top-end':
      top = trigger.top - tooltipRect.height - props.offset
      left = trigger.right - tooltipRect.width
      arrowLeft = 'calc(100% - 16px)'
      break
    case 'bottom':
      top = trigger.bottom + props.offset
      left = trigger.left + (trigger.width - tooltipRect.width) / 2
      break
    case 'bottom-start':
      top = trigger.bottom + props.offset
      left = trigger.left
      arrowLeft = '16px'
      break
    case 'bottom-end':
      top = trigger.bottom + props.offset
      left = trigger.right - tooltipRect.width
      arrowLeft = 'calc(100% - 16px)'
      break
    case 'left':
      top = trigger.top + (trigger.height - tooltipRect.height) / 2
      left = trigger.left - tooltipRect.width - props.offset
      arrowTop = '50%'
      arrowLeft = 'auto'
      break
    case 'right':
      top = trigger.top + (trigger.height - tooltipRect.height) / 2
      left = trigger.right + props.offset
      arrowTop = '50%'
      arrowLeft = 'auto'
      break
  }

  // Add scroll offset
  top += window.scrollY
  left += window.scrollX

  // Boundary detection and adjustment
  const padding = 10
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight

  if (left < padding) left = padding
  if (left + tooltipRect.width > viewportWidth - padding) {
    left = viewportWidth - tooltipRect.width - padding
  }
  if (top < padding + window.scrollY) top = padding + window.scrollY
  if (top + tooltipRect.height > viewportHeight + window.scrollY - padding) {
    top = viewportHeight + window.scrollY - tooltipRect.height - padding
  }

  tooltipPosition.value = { top, left }
  arrowPosition.value = { 
    top: arrowTop === 'auto' ? 'auto' : arrowTop,
    left: arrowLeft === 'auto' ? 'auto' : arrowLeft
  }
}

const showTooltip = () => {
  if (props.disabled) return
  
  clearTimeout(hideTimeout)
  showTimeout = setTimeout(async () => {
    isVisible.value = true
    await nextTick()
    calculatePosition()
  }, props.delay)
}

const hideTooltip = () => {
  clearTimeout(showTimeout)
  hideTimeout = setTimeout(() => {
    isVisible.value = false
  }, 100)
}

const handleClick = () => {
  if (props.trigger === 'click') {
    if (isVisible.value) {
      hideTooltip()
    } else {
      showTooltip()
    }
  }
}

// Handle click trigger
onMounted(() => {
  if (props.trigger === 'click') {
    tooltipContainer.value?.addEventListener('click', handleClick)
    
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!tooltipContainer.value?.contains(e.target)) {
        isVisible.value = false
      }
    })
  }

  // Recalculate position on scroll/resize
  window.addEventListener('scroll', calculatePosition)
  window.addEventListener('resize', calculatePosition)
})

onUnmounted(() => {
  clearTimeout(showTimeout)
  clearTimeout(hideTimeout)
  window.removeEventListener('scroll', calculatePosition)
  window.removeEventListener('resize', calculatePosition)
})
</script>

<style scoped>
.tooltip-enter-active,
.tooltip-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.tooltip-enter-from,
.tooltip-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>