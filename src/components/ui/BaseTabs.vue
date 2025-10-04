<template>
  <div class="tabs">
    <!-- Tab List -->
    <div class="tab-list" role="tablist">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        :id="`tab-${tab.key}`"
        :aria-controls="`panel-${tab.key}`"
        :aria-selected="activeTab === tab.key"
        :class="['tab-button', { active: activeTab === tab.key }]"
        role="tab"
        @click="setActiveTab(tab.key)"
        @keydown="handleKeydown"
      >
        <span v-if="tab.icon" class="tab-icon">
          <component :is="tab.icon" class="w-4 h-4" />
        </span>
        {{ tab.label }}
        <span v-if="tab.badge" class="tab-badge">{{ tab.badge }}</span>
      </button>
    </div>

    <!-- Tab Panels -->
    <div class="tab-panels">
      <div
        v-for="tab in tabs"
        :key="tab.key"
        :id="`panel-${tab.key}`"
        :aria-labelledby="`tab-${tab.key}`"
        :class="['tab-panel', { active: activeTab === tab.key }]"
        role="tabpanel"
      >
        <slot :name="tab.key" :tab="tab">
          {{ tab.content }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  tabs: {
    type: Array,
    required: true,
    validator: (value) => {
      return value.every(tab =>
        typeof tab === 'object' &&
        'key' in tab &&
        'label' in tab
      )
    }
  },
  modelValue: {
    type: [String, Number],
    default: null
  },
  defaultTab: {
    type: [String, Number],
    default: null
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const activeTab = ref(props.modelValue || props.defaultTab || props.tabs[0]?.key)

const setActiveTab = (tabKey) => {
  activeTab.value = tabKey
  emit('update:modelValue', tabKey)
  emit('change', tabKey)
}

const handleKeydown = (event) => {
  const currentIndex = props.tabs.findIndex(tab => tab.key === activeTab.value)

  switch (event.key) {
    case 'ArrowLeft':
      event.preventDefault()
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : props.tabs.length - 1
      setActiveTab(props.tabs[prevIndex].key)
      break
    case 'ArrowRight':
      event.preventDefault()
      const nextIndex = currentIndex < props.tabs.length - 1 ? currentIndex + 1 : 0
      setActiveTab(props.tabs[nextIndex].key)
      break
    case 'Home':
      event.preventDefault()
      setActiveTab(props.tabs[0].key)
      break
    case 'End':
      event.preventDefault()
      setActiveTab(props.tabs[props.tabs.length - 1].key)
      break
  }
}

// Watch for external changes
watch(() => props.modelValue, (newValue) => {
  if (newValue !== activeTab.value) {
    activeTab.value = newValue
  }
})
</script>

<style scoped>
.tabs {
  @apply w-full;
}

.tab-list {
  @apply flex border-b border-warm-gray/20 mb-4;
}

.tab-button {
  @apply relative px-4 py-3 text-sm font-medium text-warm-gray border-b-2 border-transparent
         hover:text-charcoal hover:border-warm-gray/30 transition-all duration-200
         focus:outline-none focus:ring-2 focus:ring-warm-gold focus:ring-offset-2
         min-h-[44px] flex items-center gap-2;
}

.tab-button.active {
  @apply text-deep-forest border-warm-gold;
}

.tab-button.active::after {
  content: '';
  @apply absolute bottom-0 left-0 right-0 h-0.5 bg-warm-gold;
}

.tab-icon {
  @apply flex-shrink-0;
}

.tab-badge {
  @apply bg-warm-gold text-rich-brown px-2 py-0.5 rounded-full text-xs font-semibold;
}

.tab-panels {
  @apply relative;
}

.tab-panel {
  @apply hidden;
}

.tab-panel.active {
  @apply block;
}

/* Responsive */
@media (max-width: 640px) {
  .tab-list {
    @apply flex-wrap;
  }

  .tab-button {
    @apply flex-1 min-w-0;
  }
}
</style>