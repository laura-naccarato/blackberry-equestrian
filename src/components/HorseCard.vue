<template>
  <BaseCard 
    :badge="horse.status"
    :badge-color="getStatusColor(horse.status)"
    variant="elevated"
    interactive
    class="horse-card h-full group"
    @click="$emit('click')"
  >
    <template #image>
      <div class="relative overflow-hidden">
        <img 
          :src="horse.main_image || '/images/horse-placeholder.svg'" 
          :alt="horse.name"
          class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        >
        <div v-if="horse.featured" class="absolute top-4 right-4">
          <span class="bg-warm-gold text-rich-brown px-3 py-1 rounded-full text-sm font-semibold shadow-medium">
            Featured
          </span>
        </div>
        <div v-if="horse.type" class="absolute bottom-4 left-4">
          <span class="bg-white/90 backdrop-blur-sm text-charcoal px-3 py-1 rounded text-sm font-medium">
            For {{ horse.type }}
          </span>
        </div>
      </div>
    </template>
    
    <div class="p-6">
      <h3 class="text-xl font-semibold text-deep-forest mb-2 group-hover:text-warm-gold transition-colors">
        {{ horse.name }}
      </h3>
      
      <div class="grid grid-cols-2 gap-2 text-sm mb-4">
        <div>
          <span class="text-warm-gray">Age:</span>
          <span class="ml-1 text-charcoal font-medium">{{ horse.basic_info?.age }} years</span>
        </div>
        <div>
          <span class="text-warm-gray">Height:</span>
          <span class="ml-1 text-charcoal font-medium">{{ horse.basic_info?.height }}</span>
        </div>
        <div>
          <span class="text-warm-gray">Breed:</span>
          <span class="ml-1 text-charcoal font-medium">{{ horse.basic_info?.breed }}</span>
        </div>
        <div>
          <span class="text-warm-gray">Gender:</span>
          <span class="ml-1 text-charcoal font-medium">{{ horse.basic_info?.gender }}</span>
        </div>
      </div>
      
      <p v-if="horse.excerpt" class="text-charcoal mb-4 line-clamp-2">
        {{ horse.excerpt }}
      </p>
      
      <div v-if="horse.performance" class="mb-4">
        <div class="flex items-center text-sm">
          <TrophyIcon class="w-4 h-4 text-warm-gold mr-2" />
          <span class="text-charcoal">{{ horse.performance.discipline }}</span>
        </div>
        <div v-if="horse.performance.level" class="flex items-center text-sm mt-1">
          <ChartBarIcon class="w-4 h-4 text-warm-gold mr-2" />
          <span class="text-charcoal">{{ horse.performance.level }}</span>
        </div>
      </div>
      
      <div v-if="horse.pricing" class="pt-4 border-t border-warm-gray/20">
        <div v-if="horse.pricing.sale_price" class="text-lg font-bold text-hunter-green">
          {{ formatPrice(horse.pricing.sale_price) }}
        </div>
        <div v-if="horse.pricing.lease_price" class="text-sm text-warm-gray">
          Lease: {{ formatPrice(horse.pricing.lease_price) }}/month
        </div>
        <div v-if="!horse.pricing.sale_price && !horse.pricing.lease_price" class="text-warm-gray">
          Contact for pricing
        </div>
      </div>
      
      <div class="flex items-center text-deep-forest font-medium mt-4 group-hover:text-warm-gold transition-colors">
        View Details
        <ArrowRightIcon class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  </BaseCard>
</template>

<script setup>
import BaseCard from '@/components/ui/BaseCard.vue'
import { TrophyIcon, ChartBarIcon, ArrowRightIcon } from '@heroicons/vue/24/outline'
import { formatPrice } from '@/utils/contentLoader'

const props = defineProps({
  horse: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['click'])

const getStatusColor = (status) => {
  const statusMap = {
    'Available': 'success',
    'Pending': 'warning', 
    'Sold': 'error',
    'Leased': 'info'
  }
  return statusMap[status] || 'primary'
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.horse-card {
  transition: transform 0.2s;
}

.horse-card:hover {
  transform: translateY(-4px);
}
</style>