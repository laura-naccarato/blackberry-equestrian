<template>
  <section class="featured-services">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Our Services</h2>
        <p class="section-subtitle">
          Professional equestrian services tailored to every rider's journey
        </p>
      </div>
      
      <div v-if="loading" class="loading-container">
        <BaseLoading />
      </div>
      
      <div v-else-if="services.length > 0" class="services-grid">
        <ServiceCard
          v-for="service in services"
          :key="service.slug || service.title"
          :service="service"
          @click="goToService(service)"
        />
      </div>
      
      <div v-else class="no-services">
        <p>Services are being updated. Please check back soon.</p>
      </div>
      
      <div class="section-footer">
        <RouterLink to="/services" class="btn btn-primary">
          View All Services
          <ArrowRightIcon class="w-5 h-5 ml-2" />
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { ArrowRightIcon } from '@heroicons/vue/24/outline'
import ServiceCard from '@/components/ServiceCard.vue'
import BaseLoading from '@/components/ui/BaseLoading.vue'
import { loadServices, getFeaturedContent } from '@/utils/contentLoader'

const router = useRouter()
const services = ref([])
const loading = ref(true)

const props = defineProps({
  limit: {
    type: Number,
    default: 3
  },
  featured: {
    type: Boolean,
    default: true
  }
})

onMounted(async () => {
  try {
    const allServices = await loadServices()
    
    if (props.featured) {
      services.value = getFeaturedContent(allServices, props.limit)
    } else {
      services.value = allServices.slice(0, props.limit)
    }
  } catch (error) {
    console.error('Error loading featured services:', error)
  } finally {
    loading.value = false
  }
})

const goToService = (service) => {
  const slug = service.slug || service.title.toLowerCase().replace(/\s+/g, '-')
  router.push(`/services/${slug}`)
}
</script>

<style scoped>
.featured-services {
  padding: 4rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1B3A57; /* Navy */
  margin-bottom: 1rem;
  font-family: serif;
}

.section-subtitle {
  font-size: 1.125rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
}

.loading-container {
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.no-services {
  text-align: center;
  padding: 3rem 0;
  color: #666;
}

.section-footer {
  text-align: center;
  padding-top: 2rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  padding: 0.875rem 2rem;
  background-color: #8B4513;
  color: white;
  font-weight: 600;
  text-decoration: none;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.btn:hover {
  background-color: #6B3410;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
  
  .services-grid {
    grid-template-columns: 1fr;
  }
}
</style>