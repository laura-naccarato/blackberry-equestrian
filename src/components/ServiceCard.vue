<template>
  <BaseCard 
    variant="elevated" 
    interactive
    class="service-card h-full group"
    @click="$emit('click')"
  >
    <div class="p-6 flex flex-col h-full">
      <!-- Icon or Image -->
      <div v-if="service.image" class="mb-4 -mx-6 -mt-6">
        <img
          :src="service.image"
          :alt="service.title"
          class="w-full h-48 object-cover"
          @error="handleImageError($event, PLACEHOLDER_IMAGE)"
        >
      </div>
      <div v-else class="mb-4">
        <div class="w-12 h-12 bg-warm-gold/10 rounded-lg flex items-center justify-center">
          <HomeModernIcon class="w-6 h-6 text-warm-gold" />
        </div>
      </div>
      
      <!-- Content -->
      <h3 class="text-xl font-semibold text-deep-forest mb-2 group-hover:text-warm-gold transition-colors">
        {{ service.title }}
      </h3>
      
      <p class="text-warm-gray mb-4 flex-grow">
        {{ service.description || service.excerpt }}
      </p>
      
      <!-- Price Display -->
      <div v-if="service.price" class="mb-4">
        <div class="text-2xl font-bold text-hunter-green">
          {{ formatPrice(service.price) }}
        </div>
        <div v-if="service.price_note" class="text-sm text-warm-gray">
          {{ service.price_note }}
        </div>
      </div>
      
      <!-- Features List -->
      <ul v-if="service.features && service.features.length" class="space-y-2 mb-4">
        <li 
          v-for="(feature, index) in service.features.slice(0, 3)" 
          :key="index"
          class="flex items-start text-sm"
        >
          <CheckIcon class="w-4 h-4 text-hunter-green mr-2 flex-shrink-0 mt-0.5" />
          <span class="text-charcoal">{{ feature }}</span>
        </li>
      </ul>
      
      <!-- Call to Action -->
      <div class="flex items-center text-deep-forest font-medium mt-auto pt-4 border-t border-warm-gray/20">
        Learn More 
        <ArrowRightIcon class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  </BaseCard>
</template>

<script setup>
import BaseCard from '@/components/ui/BaseCard.vue'
import { HomeModernIcon, CheckIcon, ArrowRightIcon } from '@heroicons/vue/24/outline'
import { formatPrice } from '@/utils/contentLoader'
import { PLACEHOLDER_IMAGE, handleImageError } from '@/utils/images'

const props = defineProps({
  service: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['click'])
</script>

<style scoped>
.service-card {
  transition: transform 0.2s;
}

.service-card:hover {
  transform: translateY(-4px);
}
</style>