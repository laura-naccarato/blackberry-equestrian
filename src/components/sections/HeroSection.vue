<template>
  <section class="hero-section">
    <div class="hero-background">
      <img
        :src="heroData?.image || PLACEHOLDER_IMAGE"
        :alt="heroData?.title || 'Blackberry Equestrian'"
        class="hero-image"
        @error="handleImageError($event, PLACEHOLDER_IMAGE)"
      >
      <div class="hero-overlay"></div>
    </div>
    
    <div class="hero-content">
      <div class="container">
        <h1 class="hero-title animate-fade-in">
          {{ heroData?.title || 'Premier Hunter/Jumper Facility' }}
        </h1>
        
        <p class="hero-subtitle animate-slide-up">
          {{ heroData?.subtitle || 'Experience excellence in horse care, training, and instruction' }}
        </p>
        
        <div class="hero-features animate-slide-up">
          <div class="feature-badge">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="feature-icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            <span>Full-Service Boarding</span>
          </div>
          
          <div class="feature-badge">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="feature-icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
            </svg>
            <span>Professional Training</span>
          </div>
          
          <div class="feature-badge">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="feature-icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
            <span>Quality Horses</span>
          </div>
        </div>
        
        <div class="hero-actions animate-slide-up">
          <RouterLink 
            :to="heroData?.cta_link || '/services'" 
            class="btn btn-primary"
          >
            {{ heroData?.cta_text || 'Explore Our Services' }}
          </RouterLink>
          
          <RouterLink 
            to="/contact" 
            class="btn btn-secondary"
          >
            Schedule a Visit
          </RouterLink>
        </div>
      </div>
    </div>
    
    <div class="hero-scroll">
      <span>Scroll to explore</span>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="scroll-icon">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { PLACEHOLDER_IMAGE, handleImageError } from '@/utils/images'

defineProps({
  heroData: {
    type: Object,
    default: () => ({})
  }
})
</script>

<style scoped>
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  inset: 0;
  z-index: -1;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(44, 85, 48, 0.7),
    rgba(44, 85, 48, 0.8)
  );
}

.hero-content {
  text-align: center;
  color: white;
  padding: 2rem;
  z-index: 1;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
  font-size: clamp(1.125rem, 2.5vw, 1.5rem);
  margin-bottom: 3rem;
  opacity: 0.95;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.hero-features {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  margin-bottom: 3rem;
  animation-delay: 0.2s;
}

.feature-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  padding: 0.75rem 1.25rem;
  border-radius: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  font-weight: 500;
  transition: all 0.3s ease;
}

.feature-badge:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
}

.feature-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  animation-delay: 0.4s;
}

.btn {
  display: inline-block;
  padding: 1rem 2rem;
  font-size: 1.125rem;
  font-weight: 600;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: 0.375rem;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #8B4513;
  color: white;
  box-shadow: 0 4px 6px rgba(139, 69, 19, 0.3);
}

.btn-primary:hover {
  background-color: #6B3410;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(139, 69, 19, 0.4);
}

.btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.btn-secondary:hover {
  background: white;
  color: #2c5530;
  transform: translateY(-2px);
}

.hero-scroll {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: white;
  opacity: 0.7;
  animation: bounce 2s infinite;
}

.scroll-icon {
  width: 1.5rem;
  height: 1.5rem;
}

/* Animations */
.animate-fade-in {
  animation: fadeIn 1s ease-out forwards;
}

.animate-slide-up {
  animation: slideUp 1s ease-out forwards;
  opacity: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  50% {
    transform: translateX(-50%) translateY(10px);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .hero-section {
    min-height: 80vh;
  }
  
  .hero-features {
    flex-direction: column;
    align-items: center;
  }
  
  .hero-actions {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
  }
  
  .btn {
    width: 100%;
    text-align: center;
  }
}
</style>