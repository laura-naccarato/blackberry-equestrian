<template>
  <div class="form-group">
    <!-- Label -->
    <label
      v-if="label"
      :for="selectId"
      class="block text-sm font-medium text-burgundy mb-2"
    >
      {{ label }}
      <span v-if="required" class="text-error ml-1" aria-label="required">*</span>
    </label>

    <!-- Select wrapper -->
    <div class="relative">
      <!-- Icon left -->
      <div
        v-if="$slots['icon-left']"
        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
      >
        <slot name="icon-left" />
      </div>

      <!-- Select element -->
      <select
        :id="selectId"
        ref="selectRef"
        v-model="internalValue"
        :class="selectClasses"
        :required="required"
        :disabled="disabled"
        :aria-invalid="!!error"
        :aria-describedby="ariaDescribedBy"
        v-bind="$attrs"
        @blur="handleBlur"
        @focus="handleFocus"
        @change="handleChange"
      >
        <option v-if="placeholder" value="" disabled>
          {{ placeholder }}
        </option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          :disabled="option.disabled"
        >
          {{ option.label }}
        </option>
      </select>

      <!-- Icon right (dropdown arrow) -->
      <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <svg
          class="h-5 w-5 text-gray"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>

    <!-- Error message -->
    <p
      v-if="error"
      :id="`${selectId}-error`"
      class="mt-2 text-sm text-error"
      role="alert"
    >
      {{ error }}
    </p>

    <!-- Hint message -->
    <p
      v-else-if="hint"
      :id="`${selectId}-hint`"
      class="mt-2 text-sm text-gray"
    >
      {{ hint }}
    </p>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  options: {
    type: Array,
    default: () => [],
    validator: (value) => {
      return value.every(option =>
        typeof option === 'object' &&
        'value' in option &&
        'label' in option
      )
    }
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
  error: {
    type: String,
    default: ''
  },
  hint: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  }
})

const emit = defineEmits(['update:modelValue', 'blur', 'focus', 'change'])

// Refs
const selectRef = ref(null)
const isFocused = ref(false)
const internalValue = ref(props.modelValue)

// Generate unique ID
const selectId = computed(() => `select-${Math.random().toString(36).substr(2, 9)}`)

// ARIA described by
const ariaDescribedBy = computed(() => {
  const ids = []
  if (props.error) ids.push(`${selectId.value}-error`)
  if (props.hint) ids.push(`${selectId.value}-hint`)
  return ids.length ? ids.join(' ') : null
})

// Select classes
const selectClasses = computed(() => {
  const baseClasses = [
    'block',
    'w-full',
    'border',
    'rounded-lg',
    'transition-colors',
    'duration-200',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-tan',
    'focus:border-transparent',
    'text-charcoal',
    'bg-white',
    'appearance-none',
    'cursor-pointer'
  ]

  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm min-h-[36px]',
    md: 'px-4 py-3 text-base min-h-[44px]',
    lg: 'px-5 py-4 text-lg min-h-[52px]'
  }

  // Add padding for icons
  const iconClasses = []
  if (props.placeholder || props.options.length > 0) {
    iconClasses.push('pr-10')
  }

  // State classes
  let stateClasses = []
  if (props.error) {
    stateClasses = [
      'border-error',
      'bg-red-50',
      'focus:ring-error',
      'focus:border-error'
    ]
  } else if (isFocused.value) {
    stateClasses = ['border-tan']
  } else {
    stateClasses = [
      'border-gray/30',
      'hover:border-gray/50'
    ]
  }

  // Disabled classes
  const disabledClasses = props.disabled
    ? ['opacity-50', 'cursor-not-allowed', 'bg-gray-50']
    : []

  return [
    ...baseClasses,
    sizeClasses[props.size],
    ...iconClasses,
    ...stateClasses,
    ...disabledClasses
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

const handleChange = (event) => {
  emit('change', event)
}

const focus = () => {
  selectRef.value?.focus()
}

const blur = () => {
  selectRef.value?.blur()
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