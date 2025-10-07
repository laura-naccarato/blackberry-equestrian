<template>
  <Teleport to="body">
    <Transition
      name="modal"
      @after-enter="onAfterEnter"
      @after-leave="onAfterLeave"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <!-- Backdrop -->
        <div
          class="fixed inset-0 bg-charcoal/75 backdrop-blur-sm transition-opacity"
          :class="backdropClasses"
          @click="handleBackdropClick"
          aria-hidden="true"
        ></div>

        <!-- Modal container -->
        <div class="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <!-- Modal panel -->
          <div
            ref="modalPanel"
            :class="modalClasses"
            @click.stop
          >
            <!-- Close button -->
            <button
              v-if="showClose"
              type="button"
              class="absolute top-4 right-4 text-gray hover:text-charcoal transition-colors z-10"
              @click="close"
              aria-label="Close modal"
            >
              <svg
                class="h-6 w-6"
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

            <!-- Header -->
            <div
              v-if="$slots.header || title"
              class="px-6 pt-6 pb-4 border-b border-gray/20"
            >
              <slot name="header">
                <h3
                  id="modal-title"
                  class="text-xl font-semibold text-charcoal"
                >
                  {{ title }}
                </h3>
                <p v-if="subtitle" class="mt-1 text-sm text-gray">
                  {{ subtitle }}
                </p>
              </slot>
            </div>

            <!-- Body -->
            <div class="px-6 py-4 max-h-[60vh] overflow-y-auto">
              <slot />
            </div>

            <!-- Footer -->
            <div
              v-if="$slots.footer"
              class="px-6 pb-6 pt-4 border-t border-gray/20 bg-cream/30"
            >
              <slot name="footer" />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'xl', 'full'].includes(value)
  },
  showClose: {
    type: Boolean,
    default: true
  },
  closeOnBackdrop: {
    type: Boolean,
    default: true
  },
  closeOnEscape: {
    type: Boolean,
    default: true
  },
  persistent: {
    type: Boolean,
    default: false
  },
  centered: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:modelValue', 'open', 'close', 'after-enter', 'after-leave'])

// Refs
const modalPanel = ref(null)
const previousActiveElement = ref(null)

// Computed classes
const modalClasses = computed(() => {
  const baseClasses = [
    'relative',
    'transform',
    'overflow-hidden',
    'rounded-xl',
    'bg-white',
    'text-left',
    'shadow-xl',
    'transition-all',
    'w-full'
  ]

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-6xl'
  }

  return [
    ...baseClasses,
    sizeClasses[props.size]
  ].join(' ')
})

const backdropClasses = computed(() => {
  const classes = []
  
  if (props.persistent && props.modelValue) {
    classes.push('animate-pulse-soft')
  }
  
  return classes.join(' ')
})

// Methods
const close = () => {
  if (!props.persistent) {
    emit('update:modelValue', false)
    emit('close')
  }
}

const handleBackdropClick = () => {
  if (props.closeOnBackdrop && !props.persistent) {
    close()
  } else if (props.persistent) {
    // Shake animation for persistent modal
    modalPanel.value?.classList.add('shake')
    setTimeout(() => {
      modalPanel.value?.classList.remove('shake')
    }, 500)
  }
}

const handleEscapeKey = (event) => {
  if (event.key === 'Escape' && props.closeOnEscape && !props.persistent) {
    close()
  }
}

const onAfterEnter = () => {
  emit('after-enter')
  // Focus trap
  modalPanel.value?.focus()
}

const onAfterLeave = () => {
  emit('after-leave')
  // Restore focus
  previousActiveElement.value?.focus()
}

// Lifecycle
onMounted(() => {
  if (props.closeOnEscape) {
    document.addEventListener('keydown', handleEscapeKey)
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscapeKey)
})

// Watch for modal open/close
watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    previousActiveElement.value = document.activeElement
    emit('open')
    // Prevent body scroll
    document.body.style.overflow = 'hidden'
  } else {
    // Restore body scroll
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
/* Modal transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-active > div:last-child,
.modal-leave-active > div:last-child {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from > div:last-child,
.modal-leave-to > div:last-child {
  transform: scale(0.95) translateY(10px);
  opacity: 0;
}

/* Shake animation for persistent modal */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
  20%, 40%, 60%, 80% { transform: translateX(2px); }
}

.shake {
  animation: shake 0.5s;
}
</style>