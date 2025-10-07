<template>
  <div class="horse-detail-page">
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center min-h-screen">
      <BaseLoading size="lg" />
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="container-narrow py-12">
      <BaseAlert variant="error" :message="error" />
      <BaseButton 
        variant="outline" 
        @click="$router.push('/horses')"
        class="mt-4"
      >
        Back to Horses
      </BaseButton>
    </div>

    <!-- Horse Details -->
    <div v-else-if="horse">
      <!-- Hero Section with Image Gallery -->
      <section class="bg-gradient-to-br from-navy to-navy-dark text-white">
        <div class="container-wide py-8 md:py-12">
          <!-- Breadcrumbs - Accessibility -->
          <nav aria-label="Breadcrumb" class="mb-6">
            <ol class="flex items-center space-x-2 text-sm">
              <li>
                <router-link to="/" class="text-cream hover:text-tan transition-colors">
                  Home
                </router-link>
              </li>
              <li class="text-cream/60">/</li>
              <li>
                <router-link to="/horses" class="text-cream hover:text-tan transition-colors">
                  Horses
                </router-link>
              </li>
              <li class="text-cream/60">/</li>
              <li>
                <span class="text-tan" aria-current="page">{{ horse.name }}</span>
              </li>
            </ol>
          </nav>

          <!-- Horse Name and Status -->
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h1 class="heading-hero text-white">{{ horse.name }}</h1>
            <div class="flex items-center gap-3">
              <BaseBadge 
                :variant="getStatusVariant(horse.status)"
                size="lg"
              >
                {{ horse.status }}
              </BaseBadge>
              <BaseBadge 
                v-if="horse.featured"
                variant="warning"
                size="lg"
              >
                Featured
              </BaseBadge>
            </div>
          </div>

          <!-- Quick Info Bar -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-cream">
            <div>
              <span class="text-caption block mb-1">Age</span>
              <span class="text-xl font-semibold">{{ horse.basic_info?.age }} years</span>
            </div>
            <div>
              <span class="text-caption block mb-1">Height</span>
              <span class="text-xl font-semibold">{{ horse.basic_info?.height }}</span>
            </div>
            <div>
              <span class="text-caption block mb-1">Breed</span>
              <span class="text-xl font-semibold">{{ horse.basic_info?.breed }}</span>
            </div>
            <div>
              <span class="text-caption block mb-1">Gender</span>
              <span class="text-xl font-semibold">{{ horse.basic_info?.gender }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Main Content Area -->
      <div class="container-wide py-8 lg:py-12">
        <div class="grid lg:grid-cols-3 gap-8">
          <!-- Main Content Column -->
          <div class="lg:col-span-2 space-y-8">
            <!-- Image Gallery -->
            <BaseCard variant="elevated" class="overflow-hidden">
              <div class="relative">
                <img
                  :src="currentImage.src || currentImage"
                  :alt="`${horse.name} - Main view`"
                  class="w-full h-96 md:h-[500px] object-cover cursor-pointer"
                  @click="openLightbox(currentImageIndex)"
                  @error="handleImageError($event, HORSE_PLACEHOLDER)"
                />
                
                <!-- Image Navigation -->
                <div v-if="allImages.length > 1" class="absolute bottom-4 left-0 right-0">
                  <div class="flex justify-center gap-2 px-4">
                    <button
                      v-for="(img, index) in allImages"
                      :key="index"
                      @click="currentImageIndex = index"
                      :class="[
                        'w-3 h-3 rounded-full transition-all duration-200 touch-target flex items-center justify-center',
                        currentImageIndex === index 
                          ? 'bg-tan scale-125' 
                          : 'bg-white/60 hover:bg-white/80'
                      ]"
                      :aria-label="`View image ${index + 1}`"
                    >
                      <span class="sr-only">Image {{ index + 1 }}</span>
                    </button>
                  </div>
                </div>
                
                <!-- View Fullscreen Hint -->
                <div class="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                  Click to enlarge
                </div>
              </div>

              <!-- Thumbnail Gallery -->
              <div v-if="allImages.length > 1" class="p-4 bg-cream/30">
                <div class="grid grid-cols-4 md:grid-cols-6 gap-2">
                  <button
                    v-for="(img, index) in allImages"
                    :key="index"
                    @click="currentImageIndex = index"
                    :class="[
                      'relative overflow-hidden rounded-lg transition-all duration-200',
                      currentImageIndex === index 
                        ? 'ring-2 ring-tan ring-offset-2' 
                        : 'hover:opacity-80'
                    ]"
                    :aria-label="`Select image ${index + 1}`"
                  >
                    <img
                      :src="img.src || img"
                      :alt="`${horse.name} - Thumbnail ${index + 1}`"
                      class="w-full h-20 object-cover"
                      @error="handleImageError($event, HORSE_PLACEHOLDER)"
                    />
                  </button>
                </div>
              </div>
            </BaseCard>
            
            <!-- Video Player -->
            <BaseCard v-if="horse.video_url" variant="elevated" class="overflow-hidden">
              <div class="p-4">
                <h3 class="text-lg font-semibold text-navy mb-3 flex items-center">
                  <PlayIcon class="w-5 h-5 mr-2 text-tan" />
                  Video of {{ horse.name }}
                </h3>
                <div class="aspect-video bg-charcoal rounded-lg overflow-hidden">
                  <iframe
                    v-if="videoExpanded"
                    :src="getVideoEmbedUrl(horse.video_url)"
                    class="w-full h-full"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                    :title="`Video of ${horse.name}`"
                  ></iframe>
                  <button
                    v-else
                    @click="videoExpanded = true"
                    class="w-full h-full flex flex-col items-center justify-center text-white hover:bg-white/10 transition-colors"
                  >
                    <PlayCircleIcon class="w-20 h-20 mb-2" />
                    <span class="text-lg">Play Video</span>
                  </button>
                </div>
              </div>
            </BaseCard>

            <!-- Description Section -->
            <BaseCard>
              <h2 class="heading-subsection mb-4">About {{ horse.name }}</h2>
              <p v-if="horse.excerpt" class="text-lg text-charcoal mb-4">{{ horse.excerpt }}</p>
              <div v-if="horse.body" class="prose prose-lg max-w-none text-charcoal" v-html="renderMarkdown(horse.body)"></div>
              <div v-else-if="horse.description" class="text-body space-y-4" v-html="renderMarkdown(horse.description)"></div>
            </BaseCard>

            <!-- Performance & Experience -->
            <div v-if="horse.performance" class="grid md:grid-cols-2 gap-6">
              <BaseCard>
                <h3 class="text-xl font-semibold text-navy mb-4 flex items-center">
                  <TrophyIcon class="w-5 h-5 mr-2 text-tan" />
                  Performance
                </h3>
                <dl class="space-y-3">
                  <div v-if="horse.performance.discipline">
                    <dt class="text-sm font-medium text-gray">Discipline</dt>
                    <dd class="text-charcoal font-medium">{{ horse.performance.discipline }}</dd>
                  </div>
                  <div v-if="horse.performance.level">
                    <dt class="text-sm font-medium text-gray">Competition Level</dt>
                    <dd class="text-charcoal font-medium">{{ horse.performance.level }}</dd>
                  </div>
                  <div v-if="horse.performance.achievements">
                    <dt class="text-sm font-medium text-gray mb-2">Achievements</dt>
                    <dd>
                      <ul class="list-disc list-inside space-y-1 text-charcoal">
                        <li v-for="(achievement, index) in horse.performance.achievements" :key="index">
                          {{ achievement }}
                        </li>
                      </ul>
                    </dd>
                  </div>
                </dl>
              </BaseCard>

              <BaseCard>
                <h3 class="text-xl font-semibold text-navy mb-4 flex items-center">
                  <AcademicCapIcon class="w-5 h-5 mr-2 text-tan" />
                  Training
                </h3>
                <dl class="space-y-3">
                  <div v-if="horse.training">
                    <dt class="text-sm font-medium text-gray">Training Level</dt>
                    <dd class="text-charcoal font-medium">{{ horse.training.level }}</dd>
                  </div>
                  <div v-if="horse.training?.specialties">
                    <dt class="text-sm font-medium text-gray mb-2">Specialties</dt>
                    <dd>
                      <div class="flex flex-wrap gap-2">
                        <span 
                          v-for="specialty in horse.training.specialties" 
                          :key="specialty"
                          class="badge badge-success"
                        >
                          {{ specialty }}
                        </span>
                      </div>
                    </dd>
                  </div>
                </dl>
              </BaseCard>
            </div>

            <!-- Health & Temperament -->
            <div class="grid md:grid-cols-2 gap-6">
              <BaseCard v-if="horse.health">
                <h3 class="text-xl font-semibold text-navy mb-4 flex items-center">
                  <HeartIcon class="w-5 h-5 mr-2 text-tan" />
                  Health
                </h3>
                <dl class="space-y-3">
                  <div>
                    <dt class="text-sm font-medium text-gray">Vaccinations</dt>
                    <dd class="text-charcoal font-medium">{{ horse.health.vaccinations || 'Up to date' }}</dd>
                  </div>
                  <div>
                    <dt class="text-sm font-medium text-gray">Coggins</dt>
                    <dd class="text-charcoal font-medium">{{ horse.health.coggins || 'Current' }}</dd>
                  </div>
                  <div v-if="horse.health.notes">
                    <dt class="text-sm font-medium text-gray">Notes</dt>
                    <dd class="text-charcoal">{{ horse.health.notes }}</dd>
                  </div>
                </dl>
              </BaseCard>

              <BaseCard v-if="horse.temperament">
                <h3 class="text-xl font-semibold text-navy mb-4 flex items-center">
                  <SparklesIcon class="w-5 h-5 mr-2 text-tan" />
                  Temperament
                </h3>
                <div class="space-y-3">
                  <p class="text-charcoal">{{ horse.temperament.description }}</p>
                  <div v-if="horse.temperament.traits" class="flex flex-wrap gap-2">
                    <span 
                      v-for="trait in horse.temperament.traits" 
                      :key="trait"
                      class="badge bg-tan-light/20 text-navy"
                    >
                      {{ trait }}
                    </span>
                  </div>
                </div>
              </BaseCard>
            </div>

            <!-- Suitability -->
            <BaseCard v-if="horse.suitability">
              <h3 class="text-xl font-semibold text-navy mb-4">
                Ideal For
              </h3>
              <div class="grid sm:grid-cols-2 gap-4">
                <div 
                  v-for="(suitable, type) in horse.suitability" 
                  :key="type"
                  v-if="suitable"
                  class="flex items-start"
                >
                  <CheckCircleIcon class="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                  <span class="text-charcoal">{{ formatSuitability(type) }}</span>
                </div>
              </div>
            </BaseCard>
          </div>

          <!-- Sidebar Column -->
          <div class="space-y-6">
            <!-- Pricing Card -->
            <BaseCard variant="elevated" class="sticky top-24">
              <div class="p-6 bg-gradient-to-br from-cream to-white rounded-lg">
                <h3 class="text-xl font-semibold text-navy mb-4">
                  Pricing & Availability
                </h3>
                
                <div class="space-y-4">
                  <!-- Sale Price -->
                  <div v-if="horse.pricing?.sale_price">
                    <span class="text-sm text-gray block mb-1">Sale Price</span>
                    <div class="text-3xl font-bold text-burgundy">
                      {{ formatPrice(horse.pricing.sale_price) }}
                    </div>
                  </div>

                  <!-- Lease Price -->
                  <div v-if="horse.pricing?.lease_price">
                    <span class="text-sm text-gray block mb-1">Monthly Lease</span>
                    <div class="text-2xl font-semibold text-navy">
                      {{ formatPrice(horse.pricing.lease_price) }}
                    </div>
                  </div>

                  <!-- Price Note -->
                  <p v-if="horse.pricing?.price_note" class="text-sm text-gray italic">
                    {{ horse.pricing.price_note }}
                  </p>

                  <!-- No pricing available -->
                  <div v-if="!horse.pricing?.sale_price && !horse.pricing?.lease_price">
                    <p class="text-lg text-gray">Contact for pricing</p>
                  </div>
                </div>

                <!-- CTA Buttons -->
                <div class="space-y-3 mt-6">
                  <BaseButton 
                    variant="primary" 
                    size="lg"
                    full-width
                    @click="openInquiryModal"
                    :disabled="horse.status === 'Sold'"
                  >
                    <EnvelopeIcon class="w-5 h-5 mr-2" />
                    Inquire About {{ horse.name }}
                  </BaseButton>
                  
                  <BaseButton 
                    variant="outline" 
                    size="lg"
                    full-width
                    @click="openScheduleModal"
                  >
                    <CalendarIcon class="w-5 h-5 mr-2" />
                    Schedule Viewing
                  </BaseButton>
                  
                  <BaseButton 
                    variant="ghost" 
                    size="md"
                    full-width
                    tag="a"
                    :href="`tel:${contactPhone}`"
                  >
                    <PhoneIcon class="w-5 h-5 mr-2" />
                    Call {{ contactPhone }}
                  </BaseButton>
                </div>

                <!-- Share Buttons -->
                <div class="mt-6 pt-6 border-t border-gray/20">
                  <p class="text-sm text-gray mb-3">Share this horse:</p>
                  <div class="flex gap-2">
                    <button
                      @click="shareHorse('facebook')"
                      class="p-2 rounded-lg bg-tan-light/20 hover:bg-tan-light/30 transition-colors touch-target flex items-center justify-center"
                      aria-label="Share on Facebook"
                    >
                      <ShareIcon class="w-5 h-5 text-navy" />
                    </button>
                    <button
                      @click="shareHorse('email')"
                      class="p-2 rounded-lg bg-tan-light/20 hover:bg-tan-light/30 transition-colors touch-target flex items-center justify-center"
                      aria-label="Share via Email"
                    >
                      <EnvelopeIcon class="w-5 h-5 text-navy" />
                    </button>
                    <button
                      @click="printPage"
                      class="p-2 rounded-lg bg-tan-light/20 hover:bg-tan-light/30 transition-colors touch-target flex items-center justify-center"
                      aria-label="Print this page"
                    >
                      <PrinterIcon class="w-5 h-5 text-navy" />
                    </button>
                  </div>
                </div>
              </div>
            </BaseCard>

            <!-- Contact Card -->
            <BaseCard>
              <h3 class="text-lg font-semibold text-navy mb-3">
                Questions?
              </h3>
              <p class="text-charcoal mb-4">
                Our team is here to help you find your perfect equine partner.
              </p>
              <div class="space-y-2 text-sm">
                <div class="flex items-center text-gray">
                  <MapPinIcon class="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>Newtonville, Ontario</span>
                </div>
                <div class="flex items-center text-gray">
                  <ClockIcon class="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>Mon-Sat: 8am-6pm</span>
                </div>
              </div>
            </BaseCard>
          </div>
        </div>

        <!-- Related Horses -->
        <section v-if="relatedHorses.length > 0" class="mt-12">
          <h2 class="heading-section mb-6">You May Also Like</h2>
          <div class="grid md:grid-cols-3 gap-6">
            <HorseCard 
              v-for="relatedHorse in relatedHorses"
              :key="relatedHorse.slug"
              :horse="relatedHorse"
              @click="$router.push(`/horses/${relatedHorse.slug}`)"
            />
          </div>
        </section>
      </div>
    </div>

    <!-- Inquiry Modal -->
    <BaseModal 
      v-model="inquiryModalOpen" 
      title="Inquire About This Horse"
      size="md"
    >
      <form @submit.prevent="submitInquiry" class="space-y-4">
        <BaseInput
          v-model="inquiryForm.name"
          label="Your Name"
          required
          :error="inquiryErrors.name"
        />
        
        <BaseInput
          v-model="inquiryForm.email"
          type="email"
          label="Email Address"
          required
          :error="inquiryErrors.email"
        />
        
        <BaseInput
          v-model="inquiryForm.phone"
          type="tel"
          label="Phone Number"
          :error="inquiryErrors.phone"
        />
        
        <BaseInput
          v-model="inquiryForm.message"
          label="Message"
          multiline
          :rows="4"
          placeholder="Tell us about your riding experience and what you're looking for..."
          :error="inquiryErrors.message"
        />
        
        <div class="flex gap-3 justify-end pt-4">
          <BaseButton 
            variant="ghost" 
            @click="inquiryModalOpen = false"
          >
            Cancel
          </BaseButton>
          <BaseButton 
            variant="primary" 
            type="submit"
            :loading="submittingInquiry"
          >
            Send Inquiry
          </BaseButton>
        </div>
      </form>
    </BaseModal>

    <!-- Schedule Viewing Modal -->
    <BaseModal 
      v-model="scheduleModalOpen" 
      title="Schedule a Viewing"
      size="md"
    >
      <form @submit.prevent="submitSchedule" class="space-y-4">
        <BaseInput
          v-model="scheduleForm.name"
          label="Your Name"
          required
          :error="scheduleErrors.name"
        />
        
        <BaseInput
          v-model="scheduleForm.email"
          type="email"
          label="Email Address"
          required
          :error="scheduleErrors.email"
        />
        
        <BaseInput
          v-model="scheduleForm.phone"
          type="tel"
          label="Phone Number"
          required
          :error="scheduleErrors.phone"
        />
        
        <BaseInput
          v-model="scheduleForm.preferredDate"
          type="date"
          label="Preferred Date"
          required
          :error="scheduleErrors.preferredDate"
        />
        
        <BaseInput
          v-model="scheduleForm.preferredTime"
          label="Preferred Time"
          placeholder="e.g., Morning, Afternoon, or specific time"
          :error="scheduleErrors.preferredTime"
        />
        
        <BaseInput
          v-model="scheduleForm.notes"
          label="Additional Notes"
          multiline
          :rows="3"
          placeholder="Any special requests or questions?"
          :error="scheduleErrors.notes"
        />
        
        <div class="flex gap-3 justify-end pt-4">
          <BaseButton 
            variant="ghost" 
            @click="scheduleModalOpen = false"
          >
            Cancel
          </BaseButton>
          <BaseButton 
            variant="primary" 
            type="submit"
            :loading="submittingSchedule"
          >
            Request Viewing
          </BaseButton>
        </div>
      </form>
    </BaseModal>
    
    <!-- Image Lightbox Modal -->
    <BaseModal
      v-model="lightboxOpen"
      title=""
      size="xl"
      class="image-lightbox"
    >
      <div class="relative">
        <!-- Image display -->
        <div class="flex items-center justify-center bg-black/90 rounded-lg">
          <img
            :src="allImages[currentImageIndex]?.src || allImages[currentImageIndex]"
            :alt="`${horse?.name} - Photo ${currentImageIndex + 1}`"
            class="max-w-full max-h-[80vh] object-contain"
            @load="handleImageLoad"
            @error="handleImageError($event, HORSE_PLACEHOLDER)"
          />
        </div>
        
        <!-- Navigation arrows -->
        <button
          v-if="currentImageIndex > 0"
          @click="navigateLightbox(-1)"
          class="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full p-2 hover:bg-black/80 transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeftIcon class="w-6 h-6" />
        </button>
        
        <button
          v-if="currentImageIndex < allImages.length - 1"
          @click="navigateLightbox(1)"
          class="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full p-2 hover:bg-black/80 transition-colors"
          aria-label="Next image"
        >
          <ChevronRightIcon class="w-6 h-6" />
        </button>
        
        <!-- Image counter -->
        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
          {{ currentImageIndex + 1 }} / {{ allImages.length }}
        </div>
        
        <!-- Caption if available -->
        <div v-if="allImages[currentImageIndex]?.caption" class="mt-4 text-center text-charcoal">
          {{ allImages[currentImageIndex].caption }}
        </div>
      </div>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useHorsesStore } from '@/stores/horses'
import { formatPrice } from '@/utils/contentLoader'
import { HORSE_PLACEHOLDER, handleImageError } from '@/utils/images'

// UI Components
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import BaseLoading from '@/components/ui/BaseLoading.vue'
import BaseAlert from '@/components/ui/BaseAlert.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import HorseCard from '@/components/HorseCard.vue'

// Icons
import {
  TrophyIcon,
  AcademicCapIcon,
  HeartIcon,
  SparklesIcon,
  CheckCircleIcon,
  EnvelopeIcon,
  CalendarIcon,
  PhoneIcon,
  ShareIcon,
  PrinterIcon,
  MapPinIcon,
  ClockIcon,
  PlayIcon,
  PlayCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/vue/24/outline'

const route = useRoute()
const router = useRouter()
const horsesStore = useHorsesStore()

// State
const loading = ref(true)
const error = ref(null)
const horse = ref(null)
const currentImageIndex = ref(0)
const inquiryModalOpen = ref(false)
const scheduleModalOpen = ref(false)
const submittingInquiry = ref(false)
const submittingSchedule = ref(false)
const lightboxOpen = ref(false)
const videoExpanded = ref(false)

// Contact phone from site settings
const contactPhone = ref('(905) 555-0123')

// Form data
const inquiryForm = ref({
  name: '',
  email: '',
  phone: '',
  message: ''
})

const scheduleForm = ref({
  name: '',
  email: '',
  phone: '',
  preferredDate: '',
  preferredTime: '',
  notes: ''
})

const inquiryErrors = ref({})
const scheduleErrors = ref({})

// Computed
const allImages = computed(() => {
  if (!horse.value) return []
  const images = []
  
  // Add main image
  if (horse.value.main_image) {
    images.push({
      src: horse.value.main_image,
      caption: 'Main photo'
    })
  }
  
  // Add gallery images
  if (horse.value.gallery?.length) {
    horse.value.gallery.forEach(item => {
      if (typeof item === 'string') {
        images.push({ src: item, caption: '' })
      } else if (item.image) {
        images.push({
          src: item.image,
          caption: item.caption || ''
        })
      }
    })
  }
  
  // Fallback to placeholder if no images
  if (images.length === 0) {
    images.push({
      src: '/images/horse-placeholder.svg',
      caption: 'No photo available'
    })
  }
  
  return images
})

const currentImage = computed(() => {
  return allImages.value[currentImageIndex.value] || { src: '/images/horse-placeholder.svg', caption: '' }
})

const relatedHorses = computed(() => {
  if (!horse.value) return []
  return horsesStore.horses
    .filter(h => h.slug !== horse.value.slug && h.status === 'Available')
    .slice(0, 3)
})

// Methods
const getStatusVariant = (status) => {
  const statusMap = {
    'Available': 'success',
    'Pending': 'warning',
    'Sold': 'error',
    'Leased': 'info'
  }
  return statusMap[status] || 'default'
}

const formatSuitability = (type) => {
  const suitabilityMap = {
    beginners: 'Beginners',
    intermediate: 'Intermediate Riders',
    advanced: 'Advanced Riders',
    children: 'Children',
    adults: 'Adults',
    seniors: 'Senior Riders',
    shows: 'Show Competition',
    trails: 'Trail Riding',
    lessons: 'Lesson Programs'
  }
  return suitabilityMap[type] || type
}

const loadHorse = async () => {
  try {
    loading.value = true
    error.value = null
    
    await horsesStore.loadHorses()
    const foundHorse = horsesStore.horses.find(h => h.slug === route.params.slug)
    
    if (foundHorse) {
      horse.value = foundHorse
      
      // Update meta tags for SEO
      updateMetaTags()
    } else {
      error.value = 'Horse not found'
    }
  } catch (err) {
    console.error('Error loading horse:', err)
    error.value = 'Failed to load horse details'
  } finally {
    loading.value = false
  }
}

const updateMetaTags = () => {
  if (!horse.value) return
  
  // Update page title
  document.title = `${horse.value.name} - ${horse.value.type} | Blackberry Equestrian`
  
  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription) {
    const description = horse.value.meta_description || 
      `${horse.value.basic_info?.age || ''} year old ${horse.value.basic_info?.breed || ''} ${horse.value.basic_info?.gender || ''} for ${horse.value.type}. ${horse.value.excerpt || ''}`
    metaDescription.setAttribute('content', description)
  }
  
  // Update Open Graph tags for social sharing
  updateOpenGraphTags()
}

const updateOpenGraphTags = () => {
  // Create or update OG tags
  const ogTags = {
    'og:title': `${horse.value.name} - For ${horse.value.type}`,
    'og:description': horse.value.excerpt || `Beautiful ${horse.value.basic_info?.breed || 'horse'} available at Blackberry Equestrian`,
    'og:image': horse.value.main_image || '/images/horse-placeholder.svg',
    'og:url': window.location.href,
    'og:type': 'article'
  }
  
  Object.entries(ogTags).forEach(([property, content]) => {
    let tag = document.querySelector(`meta[property="${property}"]`)
    if (!tag) {
      tag = document.createElement('meta')
      tag.setAttribute('property', property)
      document.head.appendChild(tag)
    }
    tag.setAttribute('content', content)
  })
}

const openInquiryModal = () => {
  inquiryModalOpen.value = true
  inquiryErrors.value = {}
}

const openScheduleModal = () => {
  scheduleModalOpen.value = true
  scheduleErrors.value = {}
}

const validateInquiryForm = () => {
  const errors = {}
  
  if (!inquiryForm.value.name.trim()) {
    errors.name = 'Name is required'
  }
  
  if (!inquiryForm.value.email.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiryForm.value.email)) {
    errors.email = 'Please enter a valid email address'
  }
  
  inquiryErrors.value = errors
  return Object.keys(errors).length === 0
}

const validateScheduleForm = () => {
  const errors = {}
  
  if (!scheduleForm.value.name.trim()) {
    errors.name = 'Name is required'
  }
  
  if (!scheduleForm.value.email.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(scheduleForm.value.email)) {
    errors.email = 'Please enter a valid email address'
  }
  
  if (!scheduleForm.value.phone.trim()) {
    errors.phone = 'Phone number is required'
  }
  
  if (!scheduleForm.value.preferredDate) {
    errors.preferredDate = 'Please select a preferred date'
  }
  
  scheduleErrors.value = errors
  return Object.keys(errors).length === 0
}

const submitInquiry = async () => {
  if (!validateInquiryForm()) return
  
  submittingInquiry.value = true
  
  try {
    // Here you would normally send the form data to your backend
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Success feedback
    inquiryModalOpen.value = false
    alert(`Thank you for your inquiry about ${horse.value.name}! We'll be in touch soon.`)
    
    // Reset form
    inquiryForm.value = {
      name: '',
      email: '',
      phone: '',
      message: ''
    }
  } catch (err) {
    console.error('Error submitting inquiry:', err)
    alert('There was an error sending your inquiry. Please try again or call us directly.')
  } finally {
    submittingInquiry.value = false
  }
}

const submitSchedule = async () => {
  if (!validateScheduleForm()) return
  
  submittingSchedule.value = true
  
  try {
    // Here you would normally send the form data to your backend
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Success feedback
    scheduleModalOpen.value = false
    alert(`Your viewing request for ${horse.value.name} has been received! We'll contact you to confirm.`)
    
    // Reset form
    scheduleForm.value = {
      name: '',
      email: '',
      phone: '',
      preferredDate: '',
      preferredTime: '',
      notes: ''
    }
  } catch (err) {
    console.error('Error submitting schedule request:', err)
    alert('There was an error sending your request. Please try again or call us directly.')
  } finally {
    submittingSchedule.value = false
  }
}

const shareHorse = (platform) => {
  const url = window.location.href
  const text = `Check out ${horse.value.name} at Blackberry Equestrian`
  
  if (platform === 'facebook') {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
  } else if (platform === 'email') {
    window.location.href = `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`
  }
}

const printPage = () => {
  window.print()
}

const openLightbox = (index) => {
  currentImageIndex.value = index
  lightboxOpen.value = true
}

const navigateLightbox = (direction) => {
  const newIndex = currentImageIndex.value + direction
  if (newIndex >= 0 && newIndex < allImages.value.length) {
    currentImageIndex.value = newIndex
  }
}

const handleImageLoad = () => {
  // Image loaded successfully
}

const getVideoEmbedUrl = (url) => {
  if (!url) return ''
  
  // YouTube
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)?.[1]
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?rel=0`
    }
  }
  
  // Vimeo
  if (url.includes('vimeo.com')) {
    const videoId = url.match(/vimeo\.com\/(\d+)/)?.[1]
    if (videoId) {
      return `https://player.vimeo.com/video/${videoId}`
    }
  }
  
  return url
}

const renderMarkdown = (markdown) => {
  if (!markdown) return ''
  
  // Basic markdown to HTML conversion
  // In production, consider using a library like marked.js
  let html = markdown
    // Headers
    .replace(/^### (.*?)$/gm, '<h3 class="text-xl font-semibold text-burgundy mb-2 mt-4">$1</h3>')
    .replace(/^## (.*?)$/gm, '<h2 class="text-2xl font-bold text-navy mb-3 mt-6">$1</h2>')
    .replace(/^# (.*?)$/gm, '<h1 class="text-3xl font-bold text-navy mb-4 mt-6">$1</h1>')
    // Bold and italic
    .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Lists
    .replace(/^\* (.*?)$/gm, '<li class="ml-4">$1</li>')
    .replace(/^- (.*?)$/gm, '<li class="ml-4">$1</li>')
    .replace(/^\d+\. (.*?)$/gm, '<li class="ml-4">$1</li>')
    // Paragraphs
    .replace(/\n\n/g, '</p><p class="mb-4">')
    .replace(/^/, '<p class="mb-4">')
    .replace(/$/, '</p>')
    
  // Wrap list items in ul tags
  html = html.replace(/(<li.*?<\/li>\n?)+/g, (match) => {
    return `<ul class="list-disc list-inside mb-4">${match}</ul>`
  })
  
  return html
}

// Lifecycle
onMounted(() => {
  loadHorse()
})

// Watch for route changes
watch(() => route.params.slug, (newSlug) => {
  if (newSlug) {
    currentImageIndex.value = 0
    loadHorse()
  }
})

// Keyboard navigation for lightbox
watch(lightboxOpen, (isOpen) => {
  if (isOpen) {
    const handleKeydown = (e) => {
      if (e.key === 'ArrowLeft') {
        navigateLightbox(-1)
      } else if (e.key === 'ArrowRight') {
        navigateLightbox(1)
      } else if (e.key === 'Escape') {
        lightboxOpen.value = false
      }
    }
    
    window.addEventListener('keydown', handleKeydown)
    
    // Cleanup on unmount
    onUnmounted(() => {
      window.removeEventListener('keydown', handleKeydown)
    })
  }
})
</script>

<style scoped>
/* Screen reader only text */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Print styles */
@media print {
  .no-print,
  button,
  .touch-target,
  nav {
    display: none !important;
  }
  
  .horse-detail-page {
    color: black !important;
  }
}

/* Ensure proper image aspect ratios on mobile */
@media (max-width: 640px) {
  .horse-detail-page img {
    max-height: 300px;
  }
}

/* Lightbox specific styles */
.image-lightbox :deep(.modal-content) {
  background: rgba(0, 0, 0, 0.95);
}

/* Smooth image transitions */
.horse-detail-page img {
  transition: opacity 0.3s ease;
}

/* Badge styles following design system */
.badge {
  @apply inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium;
}

.badge-success {
  @apply bg-success/10 text-success;
}
</style>