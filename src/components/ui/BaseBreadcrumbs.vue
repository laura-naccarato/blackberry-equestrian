<template>
  <nav aria-label="Breadcrumb" class="breadcrumbs">
    <ol class="breadcrumb-list">
      <li
        v-for="(crumb, index) in crumbs"
        :key="crumb.label"
        class="breadcrumb-item"
        :class="{ 'is-last': index === crumbs.length - 1 }"
      >
        <component
          :is="crumb.to ? 'router-link' : 'span'"
          v-bind="crumb.to ? { to: crumb.to } : {}"
          :class="['breadcrumb-link', { 'is-current': index === crumbs.length - 1 }]"
          :aria-current="index === crumbs.length - 1 ? 'page' : undefined"
        >
          <span v-if="crumb.icon" class="breadcrumb-icon">
            <component :is="crumb.icon" class="w-4 h-4" />
          </span>
          {{ crumb.label }}
        </component>

        <svg
          v-if="index < crumbs.length - 1"
          class="breadcrumb-separator"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </li>
    </ol>
  </nav>
</template>

<script setup>
defineProps({
  crumbs: {
    type: Array,
    required: true,
    validator: (value) => {
      return value.every(crumb =>
        typeof crumb === 'object' &&
        'label' in crumb
      )
    }
  }
})
</script>

<style scoped>
.breadcrumbs {
  @apply w-full;
}

.breadcrumb-list {
  @apply flex items-center space-x-2 text-sm;
}

.breadcrumb-item {
  @apply flex items-center;
}

.breadcrumb-link {
  @apply text-warm-gray hover:text-deep-forest transition-colors duration-200
         focus:outline-none focus:ring-2 focus:ring-warm-gold focus:ring-offset-2
         rounded px-1 py-0.5 min-h-[44px] flex items-center gap-2;
}

.breadcrumb-link.is-current {
  @apply text-charcoal font-medium cursor-default;
}

.breadcrumb-link.is-current:hover {
  @apply text-charcoal;
}

.breadcrumb-icon {
  @apply flex-shrink-0;
}

.breadcrumb-separator {
  @apply w-4 h-4 text-warm-gray/50 flex-shrink-0;
}

/* Responsive */
@media (max-width: 640px) {
  .breadcrumb-list {
    @apply flex-wrap;
  }

  .breadcrumb-item:not(.is-last) {
    @apply hidden sm:flex;
  }

  .breadcrumb-item.is-last::before {
    content: '...';
    @apply text-warm-gray/50 mr-2;
  }
}
</style>