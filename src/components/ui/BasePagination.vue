<template>
  <nav aria-label="Pagination" class="pagination" v-if="totalPages > 1">
    <div class="pagination-content">
      <!-- Previous Button -->
      <button
        :disabled="currentPage === 1"
        class="pagination-button pagination-prev"
        :class="{ disabled: currentPage === 1 }"
        @click="goToPage(currentPage - 1)"
        aria-label="Go to previous page"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        <span class="hidden sm:inline ml-1">Previous</span>
      </button>

      <!-- Page Numbers -->
      <div class="pagination-pages">
        <button
          v-for="page in visiblePages"
          :key="page"
          :class="['pagination-button pagination-page', { active: page === currentPage }]"
          @click="goToPage(page)"
          :aria-label="`Go to page ${page}`"
          :aria-current="page === currentPage ? 'page' : undefined"
        >
          {{ page }}
        </button>
      </div>

      <!-- Next Button -->
      <button
        :disabled="currentPage === totalPages"
        class="pagination-button pagination-next"
        :class="{ disabled: currentPage === totalPages }"
        @click="goToPage(currentPage + 1)"
        aria-label="Go to next page"
      >
        <span class="hidden sm:inline mr-1">Next</span>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    <!-- Optional Info -->
    <div v-if="showInfo" class="pagination-info">
      Showing {{ startItem }} to {{ endItem }} of {{ totalItems }} results
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
    validator: (value) => value > 0
  },
  totalPages: {
    type: Number,
    required: true,
    validator: (value) => value > 0
  },
  totalItems: {
    type: Number,
    default: 0
  },
  itemsPerPage: {
    type: Number,
    default: 10
  },
  showInfo: {
    type: Boolean,
    default: false
  },
  maxVisiblePages: {
    type: Number,
    default: 5
  }
})

const emit = defineEmits(['update:currentPage', 'change'])

const goToPage = (page) => {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit('update:currentPage', page)
    emit('change', page)
  }
}

const visiblePages = computed(() => {
  const pages = []
  const half = Math.floor(props.maxVisiblePages / 2)
  let start = Math.max(1, props.currentPage - half)
  let end = Math.min(props.totalPages, start + props.maxVisiblePages - 1)

  if (end - start + 1 < props.maxVisiblePages) {
    start = Math.max(1, end - props.maxVisiblePages + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})

const startItem = computed(() => {
  return (props.currentPage - 1) * props.itemsPerPage + 1
})

const endItem = computed(() => {
  return Math.min(props.currentPage * props.itemsPerPage, props.totalItems)
})
</script>

<style scoped>
.pagination {
  @apply w-full;
}

.pagination-content {
  @apply flex items-center justify-center gap-2;
}

.pagination-button {
  @apply inline-flex items-center justify-center px-3 py-2 text-sm font-medium
         text-charcoal bg-white border border-warm-gray/30 rounded-lg
         hover:bg-warm-gray/5 hover:border-warm-gray/50 transition-all duration-200
         focus:outline-none focus:ring-2 focus:ring-warm-gold focus:ring-offset-2
         min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white;
}

.pagination-page.active {
  @apply bg-warm-gold text-rich-brown border-warm-gold font-semibold;
}

.pagination-prev,
.pagination-next {
  @apply px-4;
}

.pagination-pages {
  @apply flex items-center gap-1 mx-2;
}

.pagination-info {
  @apply text-center text-sm text-warm-gray mt-4;
}

/* Responsive */
@media (max-width: 640px) {
  .pagination-content {
    @apply gap-1;
  }

  .pagination-pages {
    @apply mx-1;
  }

  .pagination-button {
    @apply px-2 py-1 text-xs min-h-[40px];
  }
}
</style>