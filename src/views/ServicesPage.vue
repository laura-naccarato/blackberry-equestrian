<template>
  <div class="services-page">
    <!-- Page Header -->
    <section class="page-header">
      <div class="container">
        <h1 class="page-title">Our Services</h1>
        <p class="page-subtitle">Premier boarding, training, and instruction in Durham Region</p>
      </div>
    </section>

    <!-- Services Grid -->
    <section class="services-section">
      <div class="container">
        <div v-if="loading" class="loading-message">
          <BaseLoading />
        </div>

        <div v-else-if="services.length === 0" class="no-services">
          <p>No services available at the moment. Please check back soon.</p>
        </div>

        <!-- Core Services Display -->
        <div v-else>
          <!-- Service Introduction -->
          <div class="services-intro">
            <h2>Excellence in Every Aspect of Equestrian Care</h2>
            <p>From premium boarding to professional training and expert instruction, we offer comprehensive services to meet all your equestrian needs.</p>
          </div>

          <div class="services-grid core-services">
          <article 
            v-for="service in filteredServices" 
            :key="service.title"
            class="service-card"
          >
            <div class="service-header">
              <img 
                :src="service.image || '/images/horse-placeholder.svg'" 
                :alt="service.title"
                class="service-image"
              >
              <span v-if="service.featured" class="featured-badge">Featured</span>
            </div>

            <div class="service-content">
              <h2 class="service-title">{{ service.title }}</h2>
              
              <p class="service-excerpt">{{ service.excerpt }}</p>

              <!-- Simplified Pricing Display -->
              <div v-if="service.pricing_options" class="pricing-summary">
                <div class="starting-price">
                  <span class="from-text">Starting at</span>
                  <div class="price-display">
                    <span class="currency">$</span>
                    <span class="amount">{{ getStartingPrice(service) }}</span>
                    <span class="period">/{{ getStartingPeriod(service) }}</span>
                  </div>
                </div>
              </div>

              <!-- Key Features (limited to top 5) -->
              <div v-if="service.includes" class="key-features">
                <ul class="features-list-simple">
                  <li v-for="item in service.includes.slice(0, 5)" :key="item">
                    <svg class="check-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {{ item }}
                  </li>
                </ul>
              </div>

              <!-- Simplified Actions -->
              <div class="service-actions">
                <RouterLink 
                  :to="`/services/${service.slug || service.title.toLowerCase().replace(/\s+/g, '-')}`" 
                  class="btn btn-primary btn-block"
                >
                  View Details & Pricing
                </RouterLink>
              </div>
            </div>
          </article>
        </div>
        </div>

        <!-- Call to Action -->
        <div class="services-cta">
          <h2>Ready to Join Blackberry Equestrian?</h2>
          <p>Schedule a tour to see our facilities and discuss how we can meet your equestrian needs.</p>
          <div class="cta-actions">
            <RouterLink to="/contact?subject=facility-tour" class="btn btn-primary btn-large">
              Schedule a Facility Tour
            </RouterLink>
            <a href="tel:905-555-0123" class="btn btn-outline btn-large">
              <svg class="phone-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call: 905-555-0123
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import BaseLoading from '@/components/ui/BaseLoading.vue'
import { loadServices } from '@/utils/contentLoader'

const services = ref([])
const loading = ref(true)

// Core services in preferred order
const coreServiceOrder = ['Full Board', 'Training Programs', 'Lesson Programs']

// Sort and filter to show only core services
const filteredServices = computed(() => {
  return services.value
    .filter(s => coreServiceOrder.includes(s.title))
    .sort((a, b) => {
      const aIndex = coreServiceOrder.indexOf(a.title)
      const bIndex = coreServiceOrder.indexOf(b.title)
      return aIndex - bIndex
    })
})

// Get starting price for service
const getStartingPrice = (service) => {
  if (!service.pricing_options || service.pricing_options.length === 0) return 'Contact'
  const prices = service.pricing_options.map(opt => opt.price)
  return Math.min(...prices).toLocaleString()
}

// Get price period for starting price
const getStartingPeriod = (service) => {
  if (!service.pricing_options || service.pricing_options.length === 0) return ''
  const minPriceOption = service.pricing_options.reduce((min, opt) => 
    opt.price < min.price ? opt : min
  )
  return minPriceOption.period || 'month'
}

onMounted(async () => {
  try {
    const allServices = await loadServices()
    // Sort by order property if it exists
    services.value = allServices.sort((a, b) => (a.order || 999) - (b.order || 999))
  } catch (error) {
    console.error('Error loading services:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
/* Page Header */
.page-header {
  background: linear-gradient(rgba(44, 85, 48, 0.9), rgba(44, 85, 48, 0.9)),
              url('/images/services-hero.jpg') center/cover;
  padding: 6rem 0;
  text-align: center;
  color: white;
}

.page-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.page-subtitle {
  font-size: 1.25rem;
  opacity: 0.95;
  max-width: 600px;
  margin: 0 auto;
}

/* Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Services Section */
.services-section {
  padding: 4rem 0;
  background-color: #f9f9f9;
}

.loading-message {
  text-align: center;
  padding: 4rem 0;
}

.no-services {
  text-align: center;
  padding: 4rem 0;
  color: #666;
}

/* Services Introduction */
.services-intro {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 4rem;
}

.services-intro h2 {
  font-size: 2.5rem;
  color: #2c5530;
  margin-bottom: 1rem;
  font-family: 'Playfair Display', serif;
}

.services-intro p {
  font-size: 1.2rem;
  color: #666;
  line-height: 1.6;
}

/* Services Grid - Core Services Layout */
.services-grid {
  display: grid;
  gap: 3rem;
  margin-bottom: 4rem;
}

.services-grid.core-services {
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  max-width: 1200px;
  margin: 0 auto 4rem;
}

/* Service Card - Enhanced Design */
.service-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.service-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
}

.service-header {
  position: relative;
  height: 250px;
  overflow: hidden;
  background: linear-gradient(135deg, #2c5530 0%, #4a7c59 100%);
}

.service-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.9;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.service-card:hover .service-image {
  transform: scale(1.05);
  opacity: 1;
}

.featured-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #D4AF37;
  color: #2c5530;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.service-content {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.service-title {
  font-size: 1.75rem;
  color: #2c5530;
  margin-bottom: 0.75rem;
  font-family: 'Playfair Display', serif;
  font-weight: 600;
}

.service-excerpt {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
  flex-grow: 1;
}

/* Simplified Pricing Display */
.pricing-summary {
  padding: 1.5rem 0;
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  margin: 1.5rem 0;
}

.starting-price {
  text-align: center;
}

.from-text {
  display: block;
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.price-display {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.25rem;
}

.currency {
  font-size: 1.25rem;
  color: #8B4513;
  font-weight: 600;
}

.amount {
  font-size: 2rem;
  font-weight: 700;
  color: #2c5530;
}

.period {
  font-size: 0.875rem;
  color: #666;
  font-weight: 500;
}

/* Key Features - Simplified */
.key-features {
  margin: 1.5rem 0;
}

.features-list-simple {
  list-style: none;
  padding: 0;
  margin: 0;
}

.features-list-simple li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
  font-size: 0.95rem;
  color: #555;
  border-bottom: 1px solid #f0f0f0;
}

.features-list-simple li:last-child {
  border-bottom: none;
}

.check-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #4CAF50;
  flex-shrink: 0;
}

/* Includes Section */
.includes-section {
  margin-bottom: 2rem;
}

.includes-list {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.75rem;
}

.includes-list li {
  position: relative;
  padding-left: 1.5rem;
  color: #555;
  font-size: 0.95rem;
}

.includes-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #4CAF50;
  font-weight: bold;
}

.more-items {
  color: #8B4513;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  font-weight: 500;
}

/* Service Actions - Simplified */
.service-actions {
  margin-top: 2rem;
  padding-top: 1.5rem;
}

.btn {
  display: inline-block;
  padding: 1rem 2rem;
  text-align: center;
  border-radius: 6px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  text-transform: uppercase;
  font-size: 0.95rem;
  letter-spacing: 0.5px;
}

.btn-block {
  display: block;
  width: 100%;
}

.btn-primary {
  background-color: #8B4513;
  color: white;
}

.btn-primary:hover {
  background-color: #6B3410;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(139, 69, 19, 0.3);
}

/* CTA Section - Enhanced */
.services-cta {
  text-align: center;
  padding: 4rem 3rem;
  background: linear-gradient(135deg, #2c5530 0%, #4a7c59 100%);
  border-radius: 16px;
  color: white;
  position: relative;
  overflow: hidden;
}

.services-cta::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('/images/pattern-overlay.svg') repeat;
  opacity: 0.05;
  pointer-events: none;
}

.services-cta h2 {
  font-size: 2.5rem;
  color: white;
  margin-bottom: 1rem;
  font-family: 'Playfair Display', serif;
  position: relative;
}

.services-cta p {
  color: rgba(255, 255, 255, 0.95);
  font-size: 1.25rem;
  margin-bottom: 2.5rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
}

.cta-actions {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
}

.btn-large {
  padding: 1.25rem 3rem;
  font-size: 1.1rem;
}

.btn-outline {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.btn-outline:hover {
  background: white;
  color: #2c5530;
}

.phone-icon {
  width: 1.25rem;
  height: 1.25rem;
  display: inline-block;
  margin-right: 0.5rem;
  vertical-align: middle;
}

/* Responsive Design - Enhanced */
@media (max-width: 1024px) {
  .services-grid.core-services {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .page-header {
    padding: 4rem 0;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .page-subtitle {
    font-size: 1rem;
  }
  
  .services-intro h2 {
    font-size: 1.75rem;
  }
  
  .services-intro p {
    font-size: 1rem;
  }
  
  .service-header {
    height: 200px;
  }
  
  .service-content {
    padding: 1.5rem;
  }
  
  .service-title {
    font-size: 1.5rem;
  }
  
  .services-cta {
    padding: 3rem 2rem;
  }
  
  .services-cta h2 {
    font-size: 1.75rem;
  }
  
  .services-cta p {
    font-size: 1rem;
  }
  
  .cta-actions {
    flex-direction: column;
    width: 100%;
  }
  
  .btn-large {
    width: 100%;
    padding: 1rem 2rem;
  }
  
  .phone-icon {
    width: 1rem;
    height: 1rem;
  }
}

/* Loading animation for content loader */
.loading-message {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
}
</style>