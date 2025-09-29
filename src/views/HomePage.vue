<template>
  <div class="home-page">
    <!-- Hero Section -->
    <HeroSection :hero-data="pageData?.hero" />
    
    <!-- Featured Services -->
    <FeaturedServices :limit="3" :featured="true" />
    
    <section class="welcome" v-if="pageData?.welcome">
      <div class="container">
        <h2>{{ pageData.welcome.title }}</h2>
        <div v-html="renderMarkdown(pageData.welcome.content)" class="content"></div>
      </div>
    </section>
    
    <section class="features">
      <div class="container">
        <h2>Why Choose Blackberry Equestrian</h2>
        <div class="features-grid">
          <div v-if="pageData?.features?.length > 0" v-for="feature in pageData.features" :key="feature.title" class="feature-card">
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
          <div v-else class="features-grid">
            <div class="feature-card">
              <h3>Indoor & Outdoor Arenas</h3>
              <p>Year-round training facilities with well-maintained footing</p>
            </div>
            <div class="feature-card">
              <h3>Expert Training</h3>
              <p>Professional instruction for all skill levels</p>
            </div>
            <div class="feature-card">
              <h3>Quality Boarding</h3>
              <p>Spacious stalls and personalized care for your horse</p>
            </div>
            <div class="feature-card">
              <h3>Horse Sales & Lease</h3>
              <p>Carefully selected horses to match riders with their perfect partner</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <section class="horses" v-if="featuredHorses.length > 0">
      <div class="container">
        <h2>Featured Horses</h2>
        <div class="horses-grid">
          <RouterLink v-for="horse in featuredHorses" :key="horse.slug" :to="`/horses/${horse.slug}`" class="horse-card">
            <img :src="horse.main_image || '/images/horse-placeholder.jpg'" :alt="horse.name">
            <div class="horse-info">
              <h3>{{ horse.name }}</h3>
              <p>{{ horse.basic_info?.breed }} • {{ horse.basic_info?.height }}</p>
              <span class="status" :class="`status-${horse.status?.toLowerCase()}`">{{ horse.status }}</span>
            </div>
          </RouterLink>
        </div>
        <div class="text-center mt-4">
          <RouterLink to="/horses" class="btn btn-primary">View All Horses</RouterLink>
        </div>
      </div>
    </section>
    
    <section class="cta">
      <div class="container">
        <h2>{{ pageData?.cta_section?.title || 'Ready to Join Our Community?' }}</h2>
        <p>{{ pageData?.cta_section?.description || 'Experience the Blackberry Equestrian difference' }}</p>
        <RouterLink :to="pageData?.cta_section?.button_link || '/contact'" class="btn btn-primary">
          {{ pageData?.cta_section?.button_text || 'Get Started' }}
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { marked } from 'marked'
import { loadPage, loadHorses, getFeaturedContent } from '@/utils/contentLoader'
import HeroSection from '@/components/sections/HeroSection.vue'
import FeaturedServices from '@/components/sections/FeaturedServices.vue'

const pageData = ref(null)
const featuredHorses = ref([])

const renderMarkdown = (content) => {
  if (!content) return ''
  return marked(content)
}

onMounted(async () => {
  try {
    // Load page content
    pageData.value = await loadPage('home')
    
    // Load featured horses
    const allHorses = await loadHorses()
    featuredHorses.value = getFeaturedContent(allHorses, 3)
  } catch (error) {
    console.error('Error loading homepage data:', error)
  }
})
</script>

<style scoped>
.welcome {
  padding: 4rem 0;
  background-color: #fff;
}

.welcome h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #2c5530;
}

.welcome .content {
  max-width: 800px;
  margin: 0 auto;
  font-size: 1.1rem;
  line-height: 1.8;
  color: #444;
}

.btn {
  padding: 0.75rem 2rem;
  border-radius: 4px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  display: inline-block;
}

.btn-primary {
  background-color: #8B4513;
  color: #fff;
}

.btn-primary:hover {
  background-color: #6B3410;
  transform: translateY(-2px);
}

.btn-secondary {
  background-color: transparent;
  color: #fff;
  border: 2px solid #fff;
}

.btn-secondary:hover {
  background-color: #fff;
  color: #2c5530;
}

.features {
  padding: 4rem 0;
  background-color: #f5f5f5;
}

.features h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #2c5530;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-card h3 {
  color: #2c5530;
  margin-bottom: 1rem;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
}

.horses {
  padding: 4rem 0;
  background-color: #fff;
}

.horses h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #2c5530;
}

.horses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.horse-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  display: block;
}

.horse-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.horse-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.horse-info {
  padding: 1.5rem;
}

.horse-info h3 {
  color: #2c5530;
  margin-bottom: 0.5rem;
  font-size: 1.3rem;
}

.horse-info p {
  color: #666;
  margin-bottom: 1rem;
}

.status {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
}

.status-available {
  background-color: #d4edda;
  color: #155724;
}

.status-pending {
  background-color: #fff3cd;
  color: #856404;
}

.status-sold {
  background-color: #f8d7da;
  color: #721c24;
}

.text-center {
  text-align: center;
}

.mt-4 {
  margin-top: 2rem;
}

.cta {
  padding: 4rem 0;
  text-align: center;
  background-color: #2c5530;
  color: #fff;
}

.cta h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.cta p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.95;
}

@media (max-width: 768px) {
  .features h2 {
    font-size: 2rem;
  }
}
</style>