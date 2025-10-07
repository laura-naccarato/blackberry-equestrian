<template>
  <Transition name="alert" @after-leave="$emit('closed')">
    <div
      v-if="modelValue"
      :class="alertClasses"
      role="alert"
      :aria-live="variant === 'error' ? 'assertive' : 'polite'"
    >
      <!-- Icon -->
      <div class="flex-shrink-0">
        <component
          :is="iconComponent"
          :class="iconClasses"
          aria-hidden="true"
        />
      </div>
      
      <!-- Content -->
      <div class="flex-1">
        <h3 v-if="title" :class="titleClasses">
          {{ title }}
        </h3>
        <div :class="messageClasses">
          <slot>{{ message }}</slot>
        </div>
        
        <!-- Actions -->
        <div v-if="$slots.actions" class="mt-4">
          <slot name="actions" />
        </div>
      </div>
      
      <!-- Dismiss button -->
      <button
        v-if="dismissible"
        type="button"
        :class="dismissClasses"
        @click="dismiss"
        aria-label="Dismiss alert"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  </Transition>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  InformationCircleIcon
} from '@heroicons/vue/24/outline'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: true
  },
  variant: {
    type: String,
    default: 'info',
    validator: (value) => ['success', 'warning', 'error', 'info'].includes(value)
  },
  title: {
    type: String,
    default: ''
  },
  message: {
    type: String,
    default: ''
  },
  dismissible: {
    type: Boolean,
    default: true
  },
  autoClose: {
    type: Number,
    default: 0 // milliseconds, 0 = don't auto close
  }
})

const emit = defineEmits(['update:modelValue', 'closed'])

let autoCloseTimer = null

const variantConfig = {
  success: {
    icon: CheckCircleIcon,
    bgClass: 'bg-success/10 border-success/30',
    iconClass: 'text-success',
    titleClass: 'text-success',
    messageClass: 'text-success/90'
  },
  warning: {
    icon: ExclamationTriangleIcon,
    bgClass: 'bg-warning/30 border-tan/50',
    iconClass: 'text-burgundy',
    titleClass: 'text-burgundy',
    messageClass: 'text-burgundy/90'
  },
  error: {
    icon: XCircleIcon,
    bgClass: 'bg-error/10 border-error/30',
    iconClass: 'text-error',
    titleClass: 'text-error',
    messageClass: 'text-error/90'
  },
  info: {
    icon: InformationCircleIcon,
    bgClass: 'bg-info/10 border-info/30',
    iconClass: 'text-navy',
    titleClass: 'text-navy',
    messageClass: 'text-charcoal'
  }
}

const iconComponent = computed(() => variantConfig[props.variant].icon)

const alertClasses = computed(() => {
  const baseClasses = [
    'flex',
    'p-4',
    'rounded-lg',
    'border',
    'relative'
  ]
  
  return [
    ...baseClasses,
    variantConfig[props.variant].bgClass
  ].join(' ')
})

const iconClasses = computed(() => [
  'w-6 h-6 mr-3',
  variantConfig[props.variant].iconClass
].join(' '))

const titleClasses = computed(() => [
  'font-semibold mb-1',
  variantConfig[props.variant].titleClass
].join(' '))

const messageClasses = computed(() => [
  'text-sm',
  variantConfig[props.variant].messageClass
].join(' '))

const dismissClasses = computed(() => [
  'absolute',
  'top-4',
  'right-4',
  'p-1',
  'rounded-md',
  'transition-colors',
  'hover:bg-black/5',
  variantConfig[props.variant].iconClass
].join(' '))

const dismiss = () => {
  emit('update:modelValue', false)
}

const startAutoClose = () => {
  if (props.autoClose > 0) {
    autoCloseTimer = setTimeout(() => {
      dismiss()
    }, props.autoClose)
  }
}

const stopAutoClose = () => {
  if (autoCloseTimer) {
    clearTimeout(autoCloseTimer)
    autoCloseTimer = null
  }
}

onMounted(() => {
  startAutoClose()
})

onUnmounted(() => {
  stopAutoClose()
})
</script>

<style scoped>
.alert-enter-active,
.alert-leave-active {
  transition: all 0.3s ease;
}

.alert-enter-from {
  transform: translateY(-10px);
  opacity: 0;
}

.alert-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
</style>