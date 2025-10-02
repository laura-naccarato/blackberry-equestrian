<template>
  <div class="service-detail-page">
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center min-h-screen">
      <BaseLoading size="lg" />
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="container-narrow py-12">
      <BaseAlert variant="error" :message="error" />
      <BaseButton 
        variant="outline" 
        @click="$router.push('/services')"
        class="mt-4"
      >
        Back to Services
      </BaseButton>
    </div>

    <!-- Service Details -->
    <div v-else-if="service">
      <!-- Hero Section -->
      <section class="service-hero bg-gradient-to-br from-deep-forest to-hunter-green text-white relative overflow-hidden">
        <!-- Background pattern overlay -->
        <div class="absolute inset-0 opacity-5">
          <div class="absolute inset-0" style="background-image: url('/images/pattern-overlay.svg'); background-repeat: repeat;"></div>
        </div>
        
        <div class="container-wide py-8 md:py-12 relative z-10">
          <!-- Breadcrumbs -->
          <nav aria-label="Breadcrumb" class="mb-6">
            <ol class="flex items-center space-x-2 text-sm">
              <li>
                <router-link to="/" class="text-cream hover:text-warm-gold transition-colors">
                  Home
                </router-link>
              </li>
              <li class="text-cream/60">/</li>
              <li>
                <router-link to="/services" class="text-cream hover:text-warm-gold transition-colors">
                  Services
                </router-link>
              </li>
              <li class="text-cream/60">/</li>
              <li>
                <span class="text-warm-gold" aria-current="page">{{ service.title }}</span>
              </li>
            </ol>
          </nav>

          <!-- Service Header -->
          <div class="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div class="flex items-center gap-3 mb-4">
                <BaseBadge 
                  v-if="service.featured"
                  variant="warning"
                  size="lg"
                >
                  <StarIcon class="w-4 h-4 mr-1" />
                  Featured Service
                </BaseBadge>
                <BaseBadge 
                  :variant="getCategoryVariant(service.service_category)"
                  size="md"
                >
                  {{ formatCategory(service.service_category) }}
                </BaseBadge>
              </div>
              
              <h1 class="text-4xl md:text-5xl font-bold mb-4 text-white">
                {{ service.title }}
              </h1>
              
              <p v-if="service.subtitle" class="text-xl text-cream/90 mb-6">
                {{ service.subtitle }}
              </p>
              
              <p class="text-lg text-cream/80 leading-relaxed">
                {{ service.excerpt }}
              </p>

              <!-- Quick Action Buttons -->
              <div class="flex flex-wrap gap-3 mt-6">
                <BaseButton 
                  variant="secondary" 
                  size="lg"
                  @click="scrollToPricing"
                >
                  <CurrencyDollarIcon class="w-5 h-5 mr-2" />
                  View Pricing
                </BaseButton>
                <BaseButton 
                  variant="outline" 
                  size="lg"
                  class="text-white border-white hover:bg-white hover:text-deep-forest"
                  @click="openBookingModal"
                >
                  <CalendarIcon class="w-5 h-5 mr-2" />
                  Schedule a Tour
                </BaseButton>
              </div>
            </div>

            <!-- Hero Image -->
            <div v-if="service.image" class="relative rounded-lg overflow-hidden shadow-2xl">
              <img 
                :src="service.image" 
                :alt="service.title"
                class="w-full h-64 md:h-96 object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Main Content Area -->
      <div class="container-wide py-8 lg:py-12">
        <div class="grid lg:grid-cols-3 gap-8">
          <!-- Main Content Column -->
          <div class="lg:col-span-2 space-y-8">
            <!-- Service Description -->
            <BaseCard>
              <h2 class="text-2xl font-semibold text-deep-forest mb-4">
                About This Service
              </h2>
              <div v-if="service.body" class="prose prose-lg max-w-none text-charcoal service-content">
                <div v-html="renderMarkdown(service.body)"></div>
              </div>
            </BaseCard>

            <!-- Pricing Packages -->
            <div ref="pricingSection" v-if="service.pricing_options && service.pricing_options.length > 0">
              <h2 class="text-2xl font-semibold text-deep-forest mb-6">
                Pricing & Packages
              </h2>
              
              <div class="grid md:grid-cols-2 gap-6">
                <BaseCard 
                  v-for="(option, index) in service.pricing_options" 
                  :key="index"
                  :variant="option.popular ? 'elevated' : 'default'"
                  class="relative overflow-hidden"
                >
                  <!-- Popular Badge -->
                  <div v-if="option.popular" class="absolute top-0 right-0">
                    <div class="bg-warm-gold text-deep-forest px-4 py-1 text-sm font-bold rounded-bl-lg">
                      MOST POPULAR
                    </div>
                  </div>

                  <div class="p-6">
                    <h3 class="text-xl font-semibold text-hunter-green mb-2">
                      {{ option.name }}
                    </h3>
                    
                    <div class="flex items-baseline mb-4">
                      <span class="text-3xl font-bold text-deep-forest">
                        ${{ option.price.toLocaleString() }}
                      </span>
                      <span class="text-warm-gray ml-2">
                        / {{ option.period || 'month' }}
                      </span>
                    </div>

                    <p v-if="option.note" class="text-sm text-warm-gray italic mb-4">
                      {{ option.note }}
                    </p>

                    <!-- Features List -->
                    <div v-if="option.features && option.features.length > 0" class="space-y-3 mb-6">
                      <div 
                        v-for="(feature, fIndex) in option.features" 
                        :key="fIndex"
                        class="flex items-start"
                      >
                        <CheckCircleIcon class="w-5 h-5 text-hunter-green mr-2 flex-shrink-0 mt-0.5" />
                        <span class="text-charcoal text-sm">{{ feature }}</span>
                      </div>
                    </div>

                    <!-- Availability Status -->
                    <div class="pt-4 border-t border-sage-green/20">
                      <div v-if="option.available !== false" class="flex items-center text-hunter-green">
                        <CheckIcon class="w-4 h-4 mr-2" />
                        <span class="text-sm font-medium">Available Now</span>
                      </div>
                      <div v-else class="flex items-center text-warm-gray">
                        <XMarkIcon class="w-4 h-4 mr-2" />
                        <span class="text-sm">Currently Full - Join Waitlist</span>
                      </div>
                    </div>
                  </div>
                </BaseCard>
              </div>
            </div>

            <!-- What's Included -->
            <BaseCard v-if="service.includes && service.includes.length > 0">
              <h2 class="text-2xl font-semibold text-deep-forest mb-6 flex items-center">
                <SparklesIcon class="w-6 h-6 mr-2 text-warm-gold" />
                What's Included
              </h2>
              
              <div class="grid md:grid-cols-2 gap-4">
                <div 
                  v-for="(item, index) in service.includes" 
                  :key="index"
                  class="flex items-start p-3 bg-cream/30 rounded-lg"
                >
                  <div class="bg-hunter-green/10 p-2 rounded-full mr-3">
                    <CheckIcon class="w-4 h-4 text-hunter-green" />
                  </div>
                  <span class="text-charcoal">{{ item }}</span>
                </div>
              </div>
            </BaseCard>

            <!-- Requirements -->
            <BaseCard v-if="service.requirements && service.requirements.length > 0">
              <h2 class="text-2xl font-semibold text-deep-forest mb-4 flex items-center">
                <DocumentTextIcon class="w-6 h-6 mr-2 text-warm-gold" />
                Requirements
              </h2>
              
              <div class="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                <p class="text-sm text-amber-800 mb-3">
                  Please ensure you have the following before booking:
                </p>
                <ul class="space-y-2">
                  <li 
                    v-for="(requirement, index) in service.requirements" 
                    :key="index"
                    class="flex items-start"
                  >
                    <ExclamationCircleIcon class="w-5 h-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span class="text-charcoal">{{ requirement }}</span>
                  </li>
                </ul>
              </div>
            </BaseCard>

            <!-- Additional Services -->
            <BaseCard v-if="service.add_ons && service.add_ons.length > 0">
              <h2 class="text-2xl font-semibold text-deep-forest mb-4">
                Additional Services Available
              </h2>
              
              <div class="grid gap-3">
                <div 
                  v-for="(addon, index) in service.add_ons" 
                  :key="index"
                  class="flex items-center justify-between p-3 bg-sage-green/10 rounded-lg"
                >
                  <span class="text-charcoal font-medium">{{ addon }}</span>
                  <span class="text-sm text-warm-gray">Contact for pricing</span>
                </div>
              </div>
            </BaseCard>

            <!-- Facility Gallery -->
            <div v-if="facilityImages.length > 0">
              <h2 class="text-2xl font-semibold text-deep-forest mb-6">
                Facility Photos
              </h2>
              
              <div class="grid md:grid-cols-2 gap-4">
                <div 
                  v-for="(image, index) in facilityImages" 
                  :key="index"
                  class="relative rounded-lg overflow-hidden shadow-md cursor-pointer group"
                  @click="openLightbox(index)"
                >
                  <img 
                    :src="image.src" 
                    :alt="image.caption || `Facility photo ${index + 1}`"
                    class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <MagnifyingGlassIcon class="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div v-if="image.caption" class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <p class="text-white text-sm">{{ image.caption }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar Column -->
          <div class="space-y-6">
            <!-- Quick Contact Card - Sticky -->
            <BaseCard variant="elevated" class="sticky top-24">
              <div class="p-6 bg-gradient-to-br from-cream to-white rounded-lg">
                <h3 class="text-xl font-semibold text-deep-forest mb-4">
                  Ready to Get Started?
                </h3>
                
                <!-- Starting Price Display -->
                <div v-if="lowestPrice" class="mb-6 text-center py-4 border-y border-sage-green/20">
                  <span class="text-sm text-warm-gray block mb-1">Starting at</span>
                  <div class="text-3xl font-bold text-hunter-green">
                    ${{ lowestPrice.toLocaleString() }}
                    <span class="text-lg text-warm-gray font-normal">/{{ lowestPeriod }}</span>
                  </div>
                </div>

                <!-- CTA Buttons -->
                <div class="space-y-3">
                  <BaseButton 
                    variant="primary" 
                    size="lg"
                    full-width
                    @click="openInquiryModal"
                  >
                    <EnvelopeIcon class="w-5 h-5 mr-2" />
                    Inquire About This Service
                  </BaseButton>
                  
                  <BaseButton 
                    variant="outline" 
                    size="lg"
                    full-width
                    @click="openBookingModal"
                  >
                    <CalendarIcon class="w-5 h-5 mr-2" />
                    Schedule a Tour
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

                <!-- Business Hours -->
                <div class="mt-6 pt-6 border-t border-warm-gray/20">
                  <h4 class="text-sm font-semibold text-deep-forest mb-3">
                    Office Hours
                  </h4>
                  <div class="space-y-1 text-sm text-charcoal">
                    <div class="flex justify-between">
                      <span>Monday - Friday</span>
                      <span class="font-medium">8:00 AM - 6:00 PM</span>
                    </div>
                    <div class="flex justify-between">
                      <span>Saturday</span>
                      <span class="font-medium">8:00 AM - 4:00 PM</span>
                    </div>
                    <div class="flex justify-between">
                      <span>Sunday</span>
                      <span class="font-medium">By Appointment</span>
                    </div>
                  </div>
                </div>

                <!-- Location -->
                <div class="mt-4 pt-4 border-t border-warm-gray/20">
                  <div class="flex items-start text-sm text-charcoal">
                    <MapPinIcon class="w-4 h-4 mr-2 flex-shrink-0 text-hunter-green mt-0.5" />
                    <span>Newtonville, Ontario</span>
                  </div>
                </div>
              </div>
            </BaseCard>

            <!-- Testimonial Card -->
            <BaseCard v-if="featuredTestimonial">
              <div class="p-4">
                <QuoteIcon class="w-8 h-8 text-warm-gold/30 mb-3" />
                <blockquote class="text-charcoal italic mb-4">
                  "{{ featuredTestimonial.text }}"
                </blockquote>
                <div class="flex items-center">
                  <div v-if="featuredTestimonial.photo" class="w-10 h-10 rounded-full overflow-hidden mr-3">
                    <img 
                      :src="featuredTestimonial.photo" 
                      :alt="featuredTestimonial.author"
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div class="font-semibold text-deep-forest text-sm">
                      {{ featuredTestimonial.author }}
                    </div>
                    <div class="text-xs text-warm-gray">
                      {{ featuredTestimonial.role }}
                    </div>
                  </div>
                </div>
              </div>
            </BaseCard>

            <!-- Download Brochure -->
            <BaseCard>
              <div class="p-4 text-center">
                <DocumentArrowDownIcon class="w-12 h-12 text-hunter-green mx-auto mb-3" />
                <h4 class="font-semibold text-deep-forest mb-2">
                  Service Information
                </h4>
                <p class="text-sm text-charcoal mb-4">
                  Download our detailed service guide
                </p>
                <BaseButton 
                  variant="outline" 
                  size="sm"
                  full-width
                  @click="downloadBrochure"
                >
                  <ArrowDownTrayIcon class="w-4 h-4 mr-2" />
                  Download PDF
                </BaseButton>
              </div>
            </BaseCard>
          </div>
        </div>

        <!-- Related Services -->
        <section v-if="relatedServices.length > 0" class="mt-12">
          <h2 class="text-2xl font-semibold text-deep-forest mb-6">
            You May Also Be Interested In
          </h2>
          <div class="grid md:grid-cols-3 gap-6">
            <ServiceCard 
              v-for="relatedService in relatedServices"
              :key="relatedService.slug"
              :service="relatedService"
            />
          </div>
        </section>

        <!-- Bottom CTA Section -->
        <section class="mt-12 bg-gradient-to-br from-sage-green/10 to-cream/20 rounded-2xl p-8 md:p-12 text-center">
          <h2 class="text-3xl font-bold text-deep-forest mb-4">
            Experience Excellence at Blackberry Equestrian
          </h2>
          <p class="text-lg text-charcoal mb-8 max-w-2xl mx-auto">
            Join our community of passionate equestrians and give your horse the care they deserve.
          </p>
          <div class="flex flex-wrap gap-4 justify-center">
            <BaseButton 
              variant="primary" 
              size="lg"
              @click="openBookingModal"
            >
              <CalendarIcon class="w-5 h-5 mr-2" />
              Book a Facility Tour
            </BaseButton>
            <BaseButton 
              variant="outline" 
              size="lg"
              @click="$router.push('/contact')"
            >
              <ChatBubbleLeftRightIcon class="w-5 h-5 mr-2" />
              Contact Us
            </BaseButton>
          </div>
        </section>
      </div>
    </div>

    <!-- Inquiry Modal -->
    <BaseModal 
      v-model="inquiryModalOpen" 
      title="Inquire About This Service"
      size="md"
    >
      <form @submit.prevent="submitInquiry" class="space-y-4">
        <div class="bg-sage-green/10 p-4 rounded-lg mb-4">
          <h4 class="font-semibold text-deep-forest mb-1">{{ service?.title }}</h4>
          <p class="text-sm text-charcoal">{{ service?.excerpt }}</p>
        </div>

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
          v-model="inquiryForm.horseName"
          label="Horse Name (if applicable)"
          placeholder="Enter your horse's name"
          :error="inquiryErrors.horseName"
        />
        
        <BaseInput
          v-model="inquiryForm.package"
          label="Interested Package"
          type="select"
          :options="packageOptions"
          :error="inquiryErrors.package"
        />
        
        <BaseInput
          v-model="inquiryForm.message"
          label="Additional Information"
          multiline
          :rows="4"
          placeholder="Tell us about your needs and any questions you have..."
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

    <!-- Tour Booking Modal -->
    <BaseModal 
      v-model="bookingModalOpen" 
      title="Schedule a Facility Tour"
      size="md"
    >
      <form @submit.prevent="submitBooking" class="space-y-4">
        <div class="bg-sage-green/10 p-4 rounded-lg mb-4">
          <p class="text-sm text-charcoal">
            Tour our facilities and learn more about our {{ service?.title }} service.
          </p>
        </div>

        <BaseInput
          v-model="bookingForm.name"
          label="Your Name"
          required
          :error="bookingErrors.name"
        />
        
        <BaseInput
          v-model="bookingForm.email"
          type="email"
          label="Email Address"
          required
          :error="bookingErrors.email"
        />
        
        <BaseInput
          v-model="bookingForm.phone"
          type="tel"
          label="Phone Number"
          required
          :error="bookingErrors.phone"
        />
        
        <BaseInput
          v-model="bookingForm.preferredDate"
          type="date"
          label="Preferred Date"
          required
          :min="tomorrow"
          :error="bookingErrors.preferredDate"
        />
        
        <BaseInput
          v-model="bookingForm.preferredTime"
          label="Preferred Time"
          type="select"
          :options="timeSlots"
          required
          :error="bookingErrors.preferredTime"
        />

        <BaseInput
          v-model="bookingForm.groupSize"
          type="number"
          label="Number of People"
          min="1"
          max="6"
          :error="bookingErrors.groupSize"
        />
        
        <BaseInput
          v-model="bookingForm.notes"
          label="Special Requests or Questions"
          multiline
          :rows="3"
          placeholder="Any specific areas you'd like to see or questions you have?"
          :error="bookingErrors.notes"
        />
        
        <div class="flex gap-3 justify-end pt-4">
          <BaseButton 
            variant="ghost" 
            @click="bookingModalOpen = false"
          >
            Cancel
          </BaseButton>
          <BaseButton 
            variant="primary" 
            type="submit"
            :loading="submittingBooking"
          >
            Request Tour
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
        <div class="flex items-center justify-center bg-black/90 rounded-lg">
          <img
            :src="facilityImages[currentImageIndex]?.src"
            :alt="facilityImages[currentImageIndex]?.caption || 'Facility photo'"
            class="max-w-full max-h-[80vh] object-contain"
          />
        </div>
        
        <!-- Navigation -->
        <button
          v-if="currentImageIndex > 0"
          @click="navigateLightbox(-1)"
          class="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full p-2 hover:bg-black/80 transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeftIcon class="w-6 h-6" />
        </button>
        
        <button
          v-if="currentImageIndex < facilityImages.length - 1"
          @click="navigateLightbox(1)"
          class="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full p-2 hover:bg-black/80 transition-colors"
          aria-label="Next image"
        >
          <ChevronRightIcon class="w-6 h-6" />
        </button>
        
        <!-- Image counter -->
        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
          {{ currentImageIndex + 1 }} / {{ facilityImages.length }}
        </div>
        
        <!-- Caption -->
        <div v-if="facilityImages[currentImageIndex]?.caption" class="mt-4 text-center text-charcoal">
          {{ facilityImages[currentImageIndex].caption }}
        </div>
      </div>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { loadServices } from '@/utils/contentLoader'

// UI Components
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import BaseLoading from '@/components/ui/BaseLoading.vue'
import BaseAlert from '@/components/ui/BaseAlert.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import ServiceCard from '@/components/ServiceCard.vue'
import QuoteIcon from '@/components/icons/QuoteIcon.vue'

// Icons from Heroicons
import {
  StarIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  CheckCircleIcon,
  CheckIcon,
  XMarkIcon,
  SparklesIcon,
  DocumentTextIcon,
  ExclamationCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DocumentArrowDownIcon,
  ArrowDownTrayIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/vue/24/outline'

const route = useRoute()
const router = useRouter()

// State
const loading = ref(true)
const error = ref(null)
const service = ref(null)
const allServices = ref([])
const inquiryModalOpen = ref(false)
const bookingModalOpen = ref(false)
const submittingInquiry = ref(false)
const submittingBooking = ref(false)
const lightboxOpen = ref(false)
const currentImageIndex = ref(0)
const pricingSection = ref(null)

// Contact phone from settings
const contactPhone = ref('(905) 555-0123')

// Form data
const inquiryForm = ref({
  name: '',
  email: '',
  phone: '',
  horseName: '',
  package: '',
  message: ''
})

const bookingForm = ref({
  name: '',
  email: '',
  phone: '',
  preferredDate: '',
  preferredTime: '',
  groupSize: '1',
  notes: ''
})

const inquiryErrors = ref({})
const bookingErrors = ref({})

// Computed
const lowestPrice = computed(() => {
  if (!service.value?.pricing_options?.length) return null
  const prices = service.value.pricing_options
    .filter(opt => opt.price)
    .map(opt => opt.price)
  return prices.length > 0 ? Math.min(...prices) : null
})

const lowestPeriod = computed(() => {
  if (!service.value?.pricing_options?.length) return 'month'
  const lowestOption = service.value.pricing_options.find(
    opt => opt.price === lowestPrice.value
  )
  return lowestOption?.period || 'month'
})

const packageOptions = computed(() => {
  if (!service.value?.pricing_options) return []
  return [
    { value: '', label: 'Select a package' },
    ...service.value.pricing_options.map(opt => ({
      value: opt.name,
      label: `${opt.name} - $${opt.price}/${opt.period || 'month'}`
    }))
  ]
})

const timeSlots = computed(() => [
  { value: '', label: 'Select a time' },
  { value: '9:00 AM', label: '9:00 AM' },
  { value: '10:00 AM', label: '10:00 AM' },
  { value: '11:00 AM', label: '11:00 AM' },
  { value: '12:00 PM', label: '12:00 PM' },
  { value: '1:00 PM', label: '1:00 PM' },
  { value: '2:00 PM', label: '2:00 PM' },
  { value: '3:00 PM', label: '3:00 PM' },
  { value: '4:00 PM', label: '4:00 PM' }
])

const tomorrow = computed(() => {
  const date = new Date()
  date.setDate(date.getDate() + 1)
  return date.toISOString().split('T')[0]
})

const facilityImages = computed(() => {
  // Mock facility images - in production, these would come from the service data
  return [
    { src: '/images/indoor-arena.jpg', caption: 'Indoor Arena - 200\' x 80\' heated' },
    { src: '/images/outdoor-arena.jpg', caption: 'Outdoor Arena - Premium footing' },
    { src: '/images/barn-aisle.jpg', caption: 'Bright, airy barn aisles' },
    { src: '/images/stalls.jpg', caption: '12x12 matted stalls' }
  ]
})

const relatedServices = computed(() => {
  if (!service.value || !allServices.value) return []
  return allServices.value
    .filter(s => s.slug !== service.value.slug)
    .slice(0, 3)
})

const featuredTestimonial = computed(() => {
  // Mock testimonial - in production, this would come from testimonials data
  return {
    text: "The care and attention my horse receives here is exceptional. The facilities are top-notch and the staff truly cares about every horse.",
    author: "Sarah Mitchell",
    role: "Boarder for 5+ years",
    photo: "/images/testimonial-1.jpg"
  }
})

// Methods
const getCategoryVariant = (category) => {
  const categoryMap = {
    'boarding': 'success',
    'training': 'info',
    'lessons': 'warning',
    'care': 'default'
  }
  return categoryMap[category] || 'default'
}

const formatCategory = (category) => {
  const categoryNames = {
    'boarding': 'Boarding',
    'training': 'Training',
    'lessons': 'Lessons',
    'care': 'Care Services',
    'facilities': 'Facilities'
  }
  return categoryNames[category] || category
}

const loadService = async () => {
  try {
    loading.value = true
    error.value = null
    
    // Load all services
    const services = await loadServices()
    allServices.value = services
    
    // Find the specific service by slug
    const slug = route.params.slug
    const foundService = services.find(s => 
      (s.slug || s.title.toLowerCase().replace(/\s+/g, '-')) === slug
    )
    
    if (foundService) {
      service.value = foundService
      updateMetaTags()
    } else {
      error.value = 'Service not found'
    }
  } catch (err) {
    console.error('Error loading service:', err)
    error.value = 'Failed to load service details'
  } finally {
    loading.value = false
  }
}

const updateMetaTags = () => {
  if (!service.value) return
  
  // Update page title
  document.title = `${service.value.title} | Blackberry Equestrian Services`
  
  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription) {
    const description = service.value.meta_description || service.value.excerpt
    metaDescription.setAttribute('content', description)
  }
}

const scrollToPricing = () => {
  if (pricingSection.value) {
    pricingSection.value.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const openInquiryModal = () => {
  inquiryModalOpen.value = true
  inquiryErrors.value = {}
}

const openBookingModal = () => {
  bookingModalOpen.value = true
  bookingErrors.value = {}
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

const validateBookingForm = () => {
  const errors = {}
  
  if (!bookingForm.value.name.trim()) {
    errors.name = 'Name is required'
  }
  
  if (!bookingForm.value.email.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookingForm.value.email)) {
    errors.email = 'Please enter a valid email address'
  }
  
  if (!bookingForm.value.phone.trim()) {
    errors.phone = 'Phone number is required'
  }
  
  if (!bookingForm.value.preferredDate) {
    errors.preferredDate = 'Please select a date'
  }
  
  if (!bookingForm.value.preferredTime) {
    errors.preferredTime = 'Please select a time'
  }
  
  bookingErrors.value = errors
  return Object.keys(errors).length === 0
}

const submitInquiry = async () => {
  if (!validateInquiryForm()) return
  
  submittingInquiry.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    inquiryModalOpen.value = false
    alert(`Thank you for your inquiry about ${service.value.title}! We'll be in touch within 24 hours.`)
    
    // Reset form
    inquiryForm.value = {
      name: '',
      email: '',
      phone: '',
      horseName: '',
      package: '',
      message: ''
    }
  } catch (err) {
    console.error('Error submitting inquiry:', err)
    alert('There was an error sending your inquiry. Please try again or call us directly.')
  } finally {
    submittingInquiry.value = false
  }
}

const submitBooking = async () => {
  if (!validateBookingForm()) return
  
  submittingBooking.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    bookingModalOpen.value = false
    alert('Your tour request has been received! We\'ll contact you within 24 hours to confirm your appointment.')
    
    // Reset form
    bookingForm.value = {
      name: '',
      email: '',
      phone: '',
      preferredDate: '',
      preferredTime: '',
      groupSize: '1',
      notes: ''
    }
  } catch (err) {
    console.error('Error submitting booking:', err)
    alert('There was an error submitting your tour request. Please try again or call us directly.')
  } finally {
    submittingBooking.value = false
  }
}

const downloadBrochure = () => {
  // In production, this would download a real PDF
  alert('Service brochure download will be implemented with backend integration.')
}

const openLightbox = (index) => {
  currentImageIndex.value = index
  lightboxOpen.value = true
}

const navigateLightbox = (direction) => {
  const newIndex = currentImageIndex.value + direction
  if (newIndex >= 0 && newIndex < facilityImages.value.length) {
    currentImageIndex.value = newIndex
  }
}

const renderMarkdown = (markdown) => {
  if (!markdown) return ''
  
  // Basic markdown to HTML conversion
  let html = markdown
    // Headers
    .replace(/^### (.*?)$/gm, '<h3 class="text-xl font-semibold text-hunter-green mb-2 mt-4">$1</h3>')
    .replace(/^## (.*?)$/gm, '<h2 class="text-2xl font-bold text-deep-forest mb-3 mt-6">$1</h2>')
    .replace(/^# (.*?)$/gm, '<h1 class="text-3xl font-bold text-deep-forest mb-4 mt-6">$1</h1>')
    // Bold and italic
    .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Lists
    .replace(/^\* (.*?)$/gm, '<li class="ml-4">$1</li>')
    .replace(/^- (.*?)$/gm, '<li class="ml-4">$1</li>')
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
  loadService()
})

// Watch for route changes
watch(() => route.params.slug, (newSlug) => {
  if (newSlug) {
    loadService()
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
    
    // Cleanup listener on modal close
    return () => {
      window.removeEventListener('keydown', handleKeydown)
    }
  }
})
</script>

<style scoped>
/* Hero Section Styles */
.service-hero {
  position: relative;
  min-height: 400px;
}

/* Service Content Styling */
.service-content :deep(h2) {
  @apply text-2xl font-bold text-deep-forest mb-3 mt-6;
}

.service-content :deep(h3) {
  @apply text-xl font-semibold text-hunter-green mb-2 mt-4;
}

.service-content :deep(p) {
  @apply mb-4 leading-relaxed;
}

.service-content :deep(ul) {
  @apply list-disc list-inside mb-4 space-y-2;
}

.service-content :deep(li) {
  @apply ml-4;
}

/* Container Styles */
.container-wide {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}

.container-narrow {
  @apply max-w-4xl mx-auto px-4 sm:px-6 lg:px-8;
}

/* Lightbox Styles */
.image-lightbox :deep(.modal-content) {
  background: rgba(0, 0, 0, 0.95);
}

/* Print Styles */
@media print {
  .no-print,
  button,
  nav,
  .sticky {
    display: none !important;
  }
  
  .service-detail-page {
    color: black !important;
  }
  
  .grid {
    display: block !important;
  }
}

/* Mobile Responsive Adjustments */
@media (max-width: 640px) {
  .service-hero h1 {
    @apply text-3xl;
  }
  
  .service-hero p {
    @apply text-base;
  }
}

/* Touch Target Sizes */
button {
  min-height: 44px;
  min-width: 44px;
}

/* Smooth Scrolling */
html {
  scroll-behavior: smooth;
}

/* Focus Styles for Accessibility */
button:focus-visible,
a:focus-visible {
  @apply outline-2 outline-offset-2 outline-warm-gold;
}
</style>