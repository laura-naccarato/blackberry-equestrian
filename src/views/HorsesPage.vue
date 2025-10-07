<template>
  <div class="horses-page">
    <!-- Page Header -->
    <section class="bg-gradient-to-br from-navy to-navy-dark text-white py-12 md:py-16">
      <div class="container-wide">
        <h1 class="font-serif text-4xl md:text-5xl font-bold mb-4">Horses for Sale & Lease</h1>
        <p class="text-xl opacity-95 max-w-3xl">Discover your perfect equine partner at Blackberry Equestrian</p>
      </div>
    </section>

    <div class="container-wide py-8">
      
      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center py-12">
        <BaseLoading />
      </div>
      
      <!-- Error State -->
      <BaseAlert v-else-if="error" variant="error" :message="error" class="mb-8" />
      
      <!-- Filters -->
      <div v-else-if="horses.length > 0" class="mb-8 bg-white rounded-xl shadow-soft p-6">
        <div class="grid md:grid-cols-3 gap-4">
          <BaseSelect
            v-model="filters.status"
            label="Status"
            :options="statusOptions"
          />
          <BaseSelect
            v-model="filters.type"
            label="Type"
            :options="typeOptions"
          />
          <BaseSelect
            v-model="filters.discipline"
            label="Discipline"
            :options="disciplineOptions"
          />
        </div>
      </div>
      
      <!-- Horses Grid -->
      <div v-if="filteredHorses.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <BaseCard
          v-for="horse in filteredHorses" 
          :key="horse.slug"
          :badge="horse.status"
          :badge-color="getStatusColor(horse.status)"
          :price="horse.pricing?.sale_price ? formatPrice(horse.pricing.sale_price) : null"
          interactive
          @click="$router.push(`/horses/${horse.slug}`)"
        >
          <template #image>
            <div class="relative">
              <img
                :src="horse.main_image || HORSE_PLACEHOLDER"
                :alt="horse.name"
                class="w-full h-64 object-cover"
                @error="handleImageError($event, HORSE_PLACEHOLDER)"
              >
              <div v-if="horse.featured" class="absolute top-4 right-4">
                <span class="bg-tan text-burgundy px-3 py-1 rounded-full text-sm font-semibold">
                  Featured
                </span>
              </div>
            </div>
          </template>
          
          <h3 class="text-xl font-semibold text-navy mb-2">
            {{ horse.name }}
          </h3>
          
          <div class="space-y-2 text-sm text-gray mb-4">
            <p><span class="font-medium text-charcoal">Age:</span> {{ horse.basic_info?.age }} years</p>
            <p><span class="font-medium text-charcoal">Height:</span> {{ horse.basic_info?.height }}</p>
            <p><span class="font-medium text-charcoal">Breed:</span> {{ horse.basic_info?.breed }}</p>
            <p><span class="font-medium text-charcoal">Discipline:</span> {{ horse.performance?.discipline }}</p>
          </div>
          
          <p class="text-charcoal mb-4 line-clamp-2">{{ horse.excerpt }}</p>
          
          <template #footer>
            <div>
              <div v-if="horse.pricing">
                <p v-if="horse.pricing.lease_price" class="text-sm text-gray">
                  Lease: {{ formatPrice(horse.pricing.lease_price) }}/month
                </p>
                <p v-if="horse.pricing.price_note" class="text-sm text-gray italic">
                  {{ horse.pricing.price_note }}
                </p>
              </div>
              <div v-else>
                <p class="text-gray">Contact for pricing</p>
              </div>
            </div>
          </template>
        </BaseCard>
      </div>
      
      <!-- No Results -->
      <div v-else-if="!loading" class="bg-cream rounded-xl p-12 text-center">
        <h3 class="text-xl font-semibold text-charcoal mb-2">No horses found</h3>
        <p class="text-gray">
          {{ horses.length === 0 ? 'No horses are currently listed.' : 'Try adjusting your filters to see more results.' }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { loadHorses, formatPrice } from '@/utils/contentLoader'
import { HORSE_PLACEHOLDER, handleImageError } from '@/utils/images'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseLoading from '@/components/ui/BaseLoading.vue'
import BaseAlert from '@/components/ui/BaseAlert.vue'
import BaseSelect from '@/components/ui/BaseSelect.vue'

const router = useRouter()

const horses = ref([])
const loading = ref(true)
const error = ref(null)

const filters = ref({
  status: '',
  type: '',
  discipline: ''
})

const statusOptions = [
  { value: '', label: 'All Statuses' },
  { value: 'Available', label: 'Available' },
  { value: 'Pending', label: 'Pending' },
  { value: 'Sold', label: 'Sold' },
  { value: 'Leased', label: 'Leased' }
]

const typeOptions = [
  { value: '', label: 'All Types' },
  { value: 'Sale', label: 'For Sale' },
  { value: 'Lease', label: 'For Lease' },
  { value: 'Both', label: 'Sale or Lease' }
]

const disciplineOptions = [
  { value: '', label: 'All Disciplines' },
  { value: 'Hunter', label: 'Hunter' },
  { value: 'Jumper', label: 'Jumper' },
  { value: 'Hunter/Jumper', label: 'Hunter/Jumper' },
  { value: 'Equitation', label: 'Equitation' },
  { value: 'Dressage', label: 'Dressage' },
  { value: 'Eventing', label: 'Eventing' }
]

const filteredHorses = computed(() => {
  return horses.value.filter(horse => {
    if (filters.value.status && horse.status !== filters.value.status) return false
    if (filters.value.type && horse.type !== filters.value.type) return false
    if (filters.value.discipline && horse.performance?.discipline !== filters.value.discipline) return false
    return true
  })
})

const getStatusColor = (status) => {
  const statusMap = {
    'Available': 'success',
    'Pending': 'warning',
    'Sold': 'error',
    'Leased': 'info'
  }
  return statusMap[status] || 'primary'
}

onMounted(async () => {
  try {
    loading.value = true
    horses.value = await loadHorses()
  } catch (err) {
    error.value = 'Failed to load horses. Please try again later.'
    console.error('Error loading horses:', err)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>