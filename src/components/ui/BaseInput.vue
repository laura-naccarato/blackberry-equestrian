<template>
  <div class="form-group">
    <!-- Label -->
    <label
      v-if="label"
      :for="inputId"
      class="block text-sm font-medium text-rich-brown mb-2"
    >
      {{ label }}
      <span v-if="required" class="text-barn-red ml-1" aria-label="required">*</span>
    </label>

    <!-- Input wrapper -->
    <div class="relative">
      <!-- Icon left -->
      <div
        v-if="$slots['icon-left']"
        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
      >
        <slot name="icon-left" />
      </div>

      <!-- Input/Textarea element -->
      <component
        :is="inputComponent"
        :id="inputId"
        ref="inputRef"
        v-model="internalValue"
        :type="type"
        :class="inputClasses"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :aria-invalid="!!error"
        :aria-describedby="ariaDescribedBy"
        :rows="rows"
        :maxlength="maxlength"
        :min="min"
        :max="max"
        :step="step"
        v-bind="$attrs"
        @blur="handleBlur"
        @focus="handleFocus"
        @input="handleInput"
      />

      <!-- Icon right -->
      <div
        v-if="$slots['icon-right'] || showClear"
        class="absolute inset-y-0 right-0 pr-3 flex items-center"
      >
        <!-- Clear button -->
        <button
          v-if="showClear && internalValue"
          type="button"
          class="text-warm-gray hover:text-charcoal transition-colors"
          @click="clearInput"
          aria-label="Clear input"
        >
          <svg
            class="h-5 w-5"
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
        
        <slot name="icon-right" />
      </div>

      <!-- Character count -->
      <div
        v-if="showCount && maxlength"
        class="absolute bottom-2 right-2 text-xs text-warm-gray pointer-events-none"
      >
        {{ internalValue?.length || 0 }} / {{ maxlength }}
      </div>
    </div>

    <!-- Error message -->
    <p
      v-if="error"
      :id="`${inputId}-error`"
      class="mt-2 text-sm text-barn-red"
      role="alert"
    >
      {{ error }}
    </p>

    <!-- Hint message -->
    <p
      v-else-if="hint"
      :id="`${inputId}-hint`"
      class="mt-2 text-sm text-warm-gray"
    >
      {{ hint }}
    </p>
  </div>
</template>

<script setup>
import { computed, ref, watch, nextTick, useSlots } from 'vue'

const slots = useSlots()

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String,
    default: 'text',
    validator: (value) =>
      ['text', 'email', 'password', 'number', 'tel', 'url', 'search', 'date', 'time', 'datetime-local'].includes(value)
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  },
  hint: {
    type: String,
    default: ''
  },
  multiline: {
    type: Boolean,
    default: false
  },
  rows: {
    type: Number,
    default: 3
  },
  autocomplete: {
    type: String,
    default: 'off'
  },
  maxlength: {
    type: Number,
    default: null
  },
  showCount: {
    type: Boolean,
    default: false
  },
  showClear: {
    type: Boolean,
    default: false
  },
  min: {
    type: [Number, String],
    default: null
  },
  max: {
    type: [Number, String],
    default: null
  },
  step: {
    type: [Number, String],
    default: null
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  }
})

const emit = defineEmits(['update:modelValue', 'blur', 'focus', 'input', 'clear'])

// Refs
const inputRef = ref(null)
const isFocused = ref(false)
const internalValue = ref(props.modelValue)

// Generate unique ID
const inputId = computed(() => `input-${Math.random().toString(36).substr(2, 9)}`)

// Component type (input or textarea)
const inputComponent = computed(() => props.multiline ? 'textarea' : 'input')

// ARIA described by
const ariaDescribedBy = computed(() => {
  const ids = []
  if (props.error) ids.push(`${inputId.value}-error`)
  if (props.hint) ids.push(`${inputId.value}-hint`)
  return ids.length ? ids.join(' ') : null
})

// Input classes
const inputClasses = computed(() => {
  const baseClasses = [
    'block',
    'w-full',
    'border',
    'rounded-lg',
    'transition-colors',
    'duration-200',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-warm-gold',
    'focus:border-transparent',
    'placeholder-warm-gray',
    'text-charcoal',
    'bg-white'
  ]

  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm min-h-[36px]',
    md: 'px-4 py-3 text-base min-h-[44px]',
    lg: 'px-5 py-4 text-lg min-h-[52px]'
  }

  // Add padding for icons
  const iconClasses = []
  if (slots && slots['icon-left']) {
    iconClasses.push('pl-10')
  }
  if ((slots && slots['icon-right']) || props.showClear) {
    iconClasses.push('pr-10')
  }

  // State classes
  let stateClasses = []
  if (props.error) {
    stateClasses = [
      'border-barn-red',
      'bg-red-50',
      'focus:ring-barn-red',
      'focus:border-barn-red'
    ]
  } else if (isFocused.value) {
    stateClasses = ['border-warm-gold']
  } else {
    stateClasses = [
      'border-warm-gray/30',
      'hover:border-warm-gray/50'
    ]
  }

  // Disabled/readonly classes
  const disabledClasses = props.disabled || props.readonly
    ? ['opacity-50', 'cursor-not-allowed', 'bg-gray-50']
    : []

  // Multiline specific
  const multilineClasses = props.multiline ? ['resize-y', 'py-3'] : []

  return [
    ...baseClasses,
    sizeClasses[props.size],
    ...iconClasses,
    ...stateClasses,
    ...disabledClasses,
    ...multilineClasses
  ].join(' ')
})

// Methods
const handleBlur = (event) => {
  isFocused.value = false
  emit('blur', event)
}

const handleFocus = (event) => {
  isFocused.value = true
  emit('focus', event)
}

const handleInput = (event) => {
  emit('input', event)
}

const clearInput = () => {
  internalValue.value = ''
  emit('clear')
  nextTick(() => {
    inputRef.value?.focus()
  })
}

const focus = () => {
  inputRef.value?.focus()
}

const blur = () => {
  inputRef.value?.blur()
}

// Watch for prop changes
watch(() => props.modelValue, (newValue) => {
  internalValue.value = newValue
})

// Emit model updates
watch(internalValue, (newValue) => {
  emit('update:modelValue', newValue)
})

// Expose methods
defineExpose({
  focus,
  blur
})
</script>