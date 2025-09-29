    <!-- Scroll Indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-gentle">
      <div class="flex flex-col items-center text-white/80">
        <span class="text-sm mb-2">Discover More</span>
        <ChevronDownIcon class="h-6 w-6" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { HomeIcon, AcademicCapIcon, HeartIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'
import BaseButton from '@/components/ui/BaseButton.vue'

const props = defineProps({
  heroData: {
    type: Object,
    default: () => ({})
  },
  loading: {
    type: Boolean,
    default: false
  }
})
</script>
```

### Services Page Implementation
```vue
<!-- src/pages/ServicesPage.vue -->
<template>
  <div class="services-page">
    <!-- Page Header -->
    <PageHeader
      title="Our Services"
      subtitle="Professional equestrian services tailored to you and your horse"
      background-image="/images/services-hero.jpg"
    />
    
    <!-- Services Grid -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Service Categories -->
        <div class="mb-12">
          <div class="flex flex-wrap justify-center gap-4">
            <button
              v-for="category in serviceCategories"
              :key="category"
              @click="selectedCategory = category"
              :class="[
                'px-6 py-3 rounded-full font-medium transition-colors',
                selectedCategory === category
                  ? 'bg-warm-gold text-rich-brown'
                  : 'bg-white text-charcoal hover:bg-sage-green/20 border border-warm-gray/20'
              ]"
            >
              {{ category }}
            </button>
          </div>
        </div>
        
        <!-- Services List -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ServiceCard
            v-for="service in filteredServices"
            :key="service.id"
            :service="service"
          />
        </div>
      </div>
    </section>
    
    <!-- Pricing Philosophy -->
    <section class="py-16 bg-cream/30">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="heading-section text-3xl font-bold text-rich-brown mb-6">
          Our Pricing Philosophy
        </h2>
        <p class="text-lead text-lg text-warm-gray mb-8">
          We believe in transparent, fair pricing that reflects the quality of care and facilities we provide. 
          All prices include our commitment to your horse's health, happiness, and development.
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white rounded-lg p-6 shadow-soft">
            <ShieldCheckIcon class="h-8 w-8 text-warm-gold mx-auto mb-4" />
            <h3 class="font-semibold text-charcoal mb-2">No Hidden Fees</h3>
            <p class="text-sm text-warm-gray">Clear, upfront pricing with everything included</p>
          </div>
          
          <div class="bg-white rounded-lg p-6 shadow-soft">
            <StarIcon class="h-8 w-8 text-warm-gold mx-auto mb-4" />
            <h3 class="font-semibold text-charcoal mb-2">Premium Quality</h3>
            <p class="text-sm text-warm-gray">Professional facilities and experienced staff</p>
          </div>
          
          <div class="bg-white rounded-lg p-6 shadow-soft">
            <HeartIcon class="h-8 w-8 text-warm-gold mx-auto mb-4" />
            <h3 class="font-semibold text-charcoal mb-2">Flexible Options</h3>
            <p class="text-sm text-warm-gray">Packages tailored to your needs and budget</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Contact Section -->
    <ContactCTA 
      title="Ready to Get Started?"
      subtitle="Contact us to discuss your specific needs and schedule a facility tour"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAppStore } from '@/stores/app'
import { ShieldCheckIcon, StarIcon, HeartIcon } from '@heroicons/vue/24/outline'
import PageHeader from '@/components/ui/PageHeader.vue'
import ServiceCard from '@/components/business/ServiceCard.vue'
import ContactCTA from '@/components/business/ContactCTA.vue'

const appStore = useAppStore()
const selectedCategory = ref('All Services')

const serviceCategories = computed(() => {
  const categories = new Set(['All Services'])
  appStore.services.forEach(service => {
    categories.add(service.service_type)
  })
  return Array.from(categories)
})

const filteredServices = computed(() => {
  if (selectedCategory.value === 'All Services') {
    return appStore.services
  }
  return appStore.services.filter(service => service.service_type === selectedCategory.value)
})

onMounted(async () => {
  await appStore.fetchServices()
})

// SEO Meta
useHead({
  title: 'Boarding & Training Services | Blackberry Equestrian',
  meta: [
    {
      name: 'description',
      content: 'Professional horse boarding, training, and lesson services in Durham Region. Indoor/outdoor boarding, expert instruction, competitive pricing.'
    }
  ]
})
</script>
```

### Service Card Component
```vue
<!-- src/components/business/ServiceCard.vue -->
<template>
  <BaseCard :interactive="true" class="service-card h-full">
    <template #image>
      <div class="relative aspect-[16/10] overflow-hidden">
        <img 
          :src="service.featured_image" 
          :alt="service.title"
          class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        
        <!-- Service Type Badge -->
        <div class="absolute top-4 left-4">
          <span class="px-3 py-1 bg-warm-gold text-rich-brown rounded-full text-sm font-medium">
            {{ service.service_type }}
          </span>
        </div>
        
        <!-- Featured Badge -->
        <div v-if="service.featured" class="absolute top-4 right-4">
          <span class="px-3 py-1 bg-deep-forest text-white rounded-full text-sm font-medium">
            Popular
          </span>
        </div>
      </div>
    </template>

    <div class="flex flex-col h-full p-6">
      <div class="flex-grow">
        <!-- Title and Subtitle -->
        <h3 class="heading-card text-xl font-bold text-charcoal mb-2">
          {{ service.title }}
        </h3>
        
        <p v-if="service.subtitle" class="text-warm-gray mb-4">
          {{ service.subtitle }}
        </p>
        
        <!-- Key Features -->
        <div v-if="service.key_features?.length" class="mb-6">
          <ul class="space-y-2">
            <li 
              v-for="feature in service.key_features.slice(0, 3)"
              :key="feature"
              class="flex items-center text-sm text-charcoal"
            >
              <CheckIcon class="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
              {{ feature }}
            </li>
          </ul>
          
          <p v-if="service.key_features.length > 3" class="text-sm text-warm-gray mt-2">
            +{{ service.key_features.length - 3 }} more features
          </p>
        </div>
        
        <!-- Pricing Preview -->
        <div v-if="service.pricing?.length" class="mb-6">
          <div class="border border-warm-gray/20 rounded-lg p-4">
            <div v-if="service.pricing.length === 1" class="text-center">
              <div class="text-2xl font-bold text-deep-forest mb-1">
                {{ formatPrice(service.pricing[0]) }}
              </div>
              <div class="text-sm text-warm-gray">
                {{ service.pricing[0].name }}
              </div>
            </div>
            
            <div v-else class="text-center">
              <div class="text-lg font-semibold text-charcoal mb-2">
                Multiple Packages Available
              </div>
              <div class="text-sm text-warm-gray">
                Starting at {{ formatPrice(getLowestPricedPackage(service.pricing)) }}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Actions -->
      <div class="flex flex-col sm:flex-row gap-3 pt-4 border-t border-warm-gray/20">
        <BaseButton 
          :to="`/services/${service.slug || service.id}`"
          variant="primary"
          class="flex-1"
        >
          Learn More
        </BaseButton>
        
        <BaseButton 
          :to="`/contact?service=${service.title}`"
          variant="outline"
          class="flex-1"
        >
          Get Quote
        </BaseButton>
      </div>
    </div>
  </BaseCard>
</template>

<script setup>
import { CheckIcon } from '@heroicons/vue/24/outline'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const props = defineProps({
  service: {
    type: Object,
    required: true
  }
})

const formatPrice = (pricing) => {
  const formatter = new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0
  })
  
  const price = formatter.format(pricing.price)
  const unit = pricing.price_unit === 'monthly' ? '/month' : 
               pricing.price_unit === 'weekly' ? '/week' : 
               pricing.price_unit === 'per lesson' ? '/lesson' : ''
  
  return `${price}${unit}`
}

const getLowestPricedPackage = (pricingOptions) => {
  return pricingOptions.reduce((lowest, current) => {
    return current.price < lowest.price ? current : lowest
  })
}
</script>
```

### Contact Page Implementation
```vue
<!-- src/pages/ContactPage.vue -->
<template>
  <div class="contact-page">
    <!-- Page Header -->
    <PageHeader
      title="Contact Us"
      subtitle="Get in touch to learn more about our services or schedule a visit"
      background-image="/images/contact-hero.jpg"
    />
    
    <!-- Contact Content -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Contact Form -->
          <div>
            <h2 class="heading-section text-2xl font-bold text-rich-brown mb-6">
              Send Us a Message
            </h2>
            
            <ContactForm 
              :service="preselectedService"
              @submitted="handleFormSubmit"
            />
          </div>
          
          <!-- Contact Information -->
          <div>
            <h2 class="heading-section text-2xl font-bold text-rich-brown mb-6">
              Visit Our Facility
            </h2>
            
            <!-- Contact Details -->
            <div class="bg-white rounded-lg shadow-soft p-8 mb-8">
              <div class="space-y-6">
                <!-- Phone -->
                <div class="flex items-start">
                  <PhoneIcon class="h-6 w-6 text-warm-gold mt-1 mr-4" />
                  <div>
                    <h3 class="font-semibold text-charcoal mb-1">Phone</h3>
                    <a 
                      :href="`tel:${appStore.siteConfig.contact.phone}`"
                      class="text-deep-forest hover:text-warm-gold transition-colors"
                    >
                      {{ appStore.siteConfig.contact.phone }}
                    </a>
                  </div>
                </div>
                
                <!-- Email -->
                <div class="flex items-start">
                  <EnvelopeIcon class="h-6 w-6 text-warm-gold mt-1 mr-4" />
                  <div>
                    <h3 class="font-semibold text-charcoal mb-1">Email</h3>
                    <a 
                      :href="`mailto:${appStore.siteConfig.contact.email}`"
                      class="text-deep-forest hover:text-warm-gold transition-colors"
                    >
                      {{ appStore.siteConfig.contact.email }}
                    </a>
                  </div>
                </div>
                
                <!-- Address -->
                <div class="flex items-start">
                  <MapPinIcon class="h-6 w-6 text-warm-gold mt-1 mr-4" />
                  <div>
                    <h3 class="font-semibold text-charcoal mb-1">Location</h3>
                    <p class="text-warm-gray">
                      {{ appStore.siteConfig.contact.address }}
                    </p>
                  </div>
                </div>
                
                <!-- Hours -->
                <div class="flex items-start">
                  <ClockIcon class="h-6 w-6 text-warm-gold mt-1 mr-4" />
                  <div>
                    <h3 class="font-semibold text-charcoal mb-1">Hours</h3>
                    <p class="text-warm-gray whitespace-pre-line">
                      {{ appStore.siteConfig.contact.hours }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Map -->
            <div class="bg-white rounded-lg shadow-soft overflow-hidden">
              <div class="aspect-[4/3]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2890.1234567890123!2d-78.1234567890123!3d43.9876543210987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDU5JzE1LjYiTiA3OMKwMDcnMjQuNCJX!5e0!3m2!1sen!2sca!4v1234567890123"
                  width="100%"
                  height="100%"
                  style="border:0;"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
            
            <!-- Social Media -->
            <div class="mt-8">
              <h3 class="font-semibold text-charcoal mb-4">Follow Us</h3>
              <div class="flex space-x-4">
                <a 
                  :href="appStore.siteConfig.social.facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <span class="sr-only">Facebook</span>
                  <!-- Facebook Icon -->
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                
                <a 
                  :href="appStore.siteConfig.social.instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="p-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                >
                  <span class="sr-only">Instagram</span>
                  <!-- Instagram Icon -->
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.611-3.197-1.559-.748-.948-1.197-2.27-1.197-3.726 0-1.456.449-2.778 1.197-3.726.749-.948 1.9-1.559 3.197-1.559s2.448.611 3.197 1.559c.748.948 1.197 2.27 1.197 3.726 0 1.456-.449 2.778-1.197 3.726-.749.948-1.9 1.559-3.197 1.559zm7.138 0c-1.297 0-2.448-.611-3.197-1.559-.748-.948-1.197-2.27-1.197-3.726 0-1.456.449-2.778 1.197-3.726.749-.948 1.9-1.559 3.197-1.559s2.448.611 3.197 1.559c.748.948 1.197 2.27 1.197 3.726 0 1.456-.449 2.778-1.197 3.726-.749.948-1.9 1.559-3.197 1.559z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Frequently Asked Questions -->
    <section class="py-16 bg-cream/30">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="heading-section text-3xl font-bold text-rich-brown mb-12 text-center">
          Frequently Asked Questions
        </h2>
        
        <FAQSection :faqs="contactFAQs" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon, 
  ClockIcon 
} from '@heroicons/vue/24/outline'
import PageHeader from '@/components/ui/PageHeader.vue'
import ContactForm from '@/components/business/ContactForm.vue'
import FAQSection from '@/components/business/FAQSection.vue'

const route = useRoute()
const appStore = useAppStore()

const preselectedService = ref('')

const contactFAQs = [
  {
    question: "What should I bring for a facility tour?",
    answer: "Just bring yourself and any questions you have! We'll show you around our facilities, introduce you to our team, and discuss how we can best serve you and your horse."
  },
  {
    question: "How far in advance should I book boarding?",
    answer: "We recommend contacting us as early as possible, especially during peak seasons. We maintain a waiting list and will work with you to find the best solution for your timeline."
  },
  {
    question: "Do you offer trial periods for boarding?",
    answer: "Yes, we understand that finding the right fit is important. We offer trial boarding periods so you can experience our facility and care standards before making a long-term commitment."
  },
  {
    question: "What if I have questions after hours?",
    answer: "For non-emergencies, please leave a message or send an email and we'll respond within 24 hours. For horse emergencies, we have 24/7 contact information posted at the facility."
  }
]

onMounted(() => {
  // Pre-select service if specified in URL
  if (route.query.service) {
    preselectedService.value = route.query.service
  }
})

const handleFormSubmit = () => {
  // Handle successful form submission
  // Could show success message, redirect, etc.
}

// SEO Meta
useHead({
  title: 'Contact Blackberry Equestrian | Durham Region Horse Boarding',
  meta: [
    {
      name: 'description',
      content: 'Contact Blackberry Equestrian for professional horse boarding, training, and lessons in Newtonville, Ontario. Schedule a facility tour today.'
    }
  ]
})
</script>
```

### Contact Form Component
```vue
<!-- src/components/business/ContactForm.vue -->
<template>
  <form @submit.prevent="submitForm" class="contact-form space-y-6">
    <!-- Contact Information -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <BaseInput
        v-model="form.firstName"
        label="First Name"
        required
        :error="errors.firstName"
      />
      
      <BaseInput
        v-model="form.lastName"
        label="Last Name"
        required
        :error="errors.lastName"
      />
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <BaseInput
        v-model="form.email"
        type="email"
        label="Email Address"
        required
        :error="errors.email"
      />
      
      <BaseInput
        v-model="form.phone"
        type="tel"
        label="Phone Number"
        :error="errors.phone"
      />
    </div>
    
    <!-- Service Interest -->
    <div>
      <label class="block text-sm font-medium text-rich-brown mb-2">
        Interested Service
      </label>
      <select 
        v-model="form.service"
        class="w-full px-4 py-3 border border-warm-gray/30 rounded-lg focus:ring-2 focus:ring-warm-gold focus:border-transparent"
      >
        <option value="">Select a service</option>
        <option value="Boarding">Horse Boarding</option>
        <option value="Training">Horse Training</option>
        <option value="Lessons">Riding Lessons</option>
        <option value="Horse Purchase">Horse Purchase/Lease</option>
        <option value="Facility Tour">Facility Tour</option>
        <option value="Other">Other</option>
      </select>
    </div>
    
    <!-- Timeline -->
    <BaseInput
      v-model="form.timeline"
      label="Timeline"
      placeholder="When are you looking to start? (e.g., Immediately, Next month, Spring 2024)"
    />
    
    <!-- Message -->
    <BaseInput
      v-model="form.message"
      label="Message"
      :multiline="true"
      :rows="5"
      placeholder="Please tell us more about your needs, experience level, and any specific questions you have."
      required
      :error="errors.message"
    />
    
    <!-- Preferences -->
    <div class="bg-cream/50 p-4 rounded-lg">
      <h4 class="font-semibold text-charcoal mb-3">Contact Preferences</h4>
      
      <div class="space-y-2">
        <label class="flex items-center">
          <input
            v-model="form.preferredContact"
            value="email"
            type="radio"
            name="preferredContact"
            class="mr-2 text-warm-gold focus:ring-warm-gold"
          />
          <span class="text-sm">Email (preferred)</span>
        </label>
        
        <label class="flex items-center">
          <input
            v-model="form.preferredContact"
            value="phone"
            type="radio"
            name="preferredContact"
            class="mr-2 text-warm-gold focus:ring-warm-gold"
          />
          <span class="text-sm">Phone call</span>
        </label>
        
        <label class="flex items-center">
          <input
            v-model="form.preferredContact"
            value="either"
            type="radio"
            name="preferredContact"
            class="mr-2 text-warm-gold focus:ring-warm-gold"
          />
          <span class="text-sm">Either is fine</span>
        </label>
      </div>
    </div>
    
    <!-- Consent -->
    <div class="space-y-3">
      <label class="flex items-start">
        <input
          v-model="form.privacyConsent"
          type="checkbox"
          required
          class="mt-1 mr-3 text-warm-gold focus:ring-warm-gold"
        />
        <span class="text-sm text-warm-gray">
          I consent to being contacted by Blackberry Equestrian regarding my inquiry and understand my information will be handled according to the 
          <router-link to="/privacy" class="text-deep-forest hover:text-warm-gold underline">Privacy Policy</router-link>.
        </span>
      </label>
      
      <label class="flex items-start">
        <input
          v-model="form.marketingConsent"
          type="checkbox"
          class="mt-1 mr-3 text-warm-gold focus:ring-warm-gold"
        />
        <span class="text-sm text-warm-gray">
          I would like to receive updates about services, events, and available horses (optional).
        </span>
      </label>
    </div>
    
    <!-- Submit Button -->
    <BaseButton 
      type="submit" 
      variant="primary"
      size="lg"
      :loading="submitting"
      class="w-full"
    >
      Send Message
    </BaseButton>
    
    <!-- Success/Error Messages -->
    <div v-if="submitted" class="bg-green-50 border border-green-200 rounded-lg p-4">
      <p class="text-green-800 text-sm">
        Thank you for your message! We'll get back to you within 24 hours.
      </p>
    </div>
    
    <div v-if="submitError" class="bg-red-50 border border-red-200 rounded-lg p-4">
      <p class="text-red-800 text-sm">
        There was an error sending your message. Please try again or call us directly.
      </p>
    </div>
  </form>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const props = defineProps({
  service: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['submitted'])

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  service: '',
  timeline: '',
  message: '',
  preferredContact: 'email',
  privacyConsent: false,
  marketingConsent: false
})

const errors = ref({})
const submitting = ref(false)
const submitted = ref(false)
const submitError = ref(false)

// Pre-fill service if provided
watch(() => props.service, (newService) => {
  if (newService) {
    form.service = newService
  }
}, { immediate: true })

const validateForm = () => {
  const newErrors = {}
  
  if (!form.firstName.trim()) newErrors.firstName = 'First name is required'
  if (!form.lastName.trim()) newErrors.lastName = 'Last name is required'
  if (!form.email.trim()) newErrors.email = 'Email is required'
  if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email is invalid'
  if (!form.message.trim()) newErrors.message = 'Message is required'
  if (!form.privacyConsent) newErrors.privacyConsent = 'Privacy consent is required'
  
  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

const submitForm = async () => {
  if (!validateForm()) return
  
  submitting.value = true
  submitError.value = false
  
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...form,
        timestamp: new Date().toISOString(),
        source: 'contact_form'
      })
    })
    
    if (!response.ok) throw new Error('Failed to submit')
    
    submitted.value = true
    emit('submitted')
    
    // Reset form
    Object.keys(form).forEach(key => {
      if (typeof form[key] === 'boolean') {
        form[key] = false
      } else {
        form[key] = ''
      }
    })
    form.preferredContact = 'email'
    
  } catch (error) {
    submitError.value = true
    console.error('Error submitting form:', error)
  } finally {
    submitting.value = false
  }
}
</script>
```

## Task Completion Checklist

### Core Business Pages
- [ ] Homepage with compelling hero section
- [ ] Services overview with clear pricing
- [ ] About page with facility history and team
- [ ] Contact page with multiple contact methods
- [ ] Individual service detail pages
- [ ] Facilities showcase with photo galleries

### Trust Building Elements
- [ ] Professional photography throughout
- [ ] Staff credentials and certifications displayed
- [ ] Client testimonials with photos
- [ ] Safety protocols and insurance information
- [ ] Years of experience highlighted
- [ ] Professional memberships and awards

### Contact and Booking Systems
- [ ] Multi-step contact forms with validation
- [ ] Service-specific inquiry options
- [ ] Facility tour booking capability
- [ ] Emergency contact information
- [ ] Automated email responses
- [ ] CRM integration for lead tracking

### Content Management Integration
- [ ] All pages editable through Decap CMS
- [ ] Dynamic content loading from API
- [ ] SEO metadata for all pages
- [ ] Social sharing integration
- [ ] Blog post display and pagination
- [ ] Event calendar integration

### Mobile Optimization
- [ ] Touch-friendly navigation and forms
- [ ] Optimized layouts for barn usage
- [ ] Fast loading on rural connections
- [ ] Offline content caching
- [ ] Click-to-call functionality
- [ ] GPS integration for directions

## Testimonials and Social Proof

### Testimonials Component
```vue
<!-- src/components/business/TestimonialsSection.vue -->
<template>
  <section class="testimonials-section py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="heading-section text-3xl font-bold text-rich-brown mb-4">
          What Our Clients Say
        </h2>
        <p class="text-lead text-lg text-warm-gray max-w-2xl mx-auto">
          Don't just take our word for it - hear from the horse owners, riders, and families who call Blackberry Equestrian home.
        </p>
      </div>
      
      <!-- Testimonials Carousel -->
      <div class="relative">
        <div class="overflow-hidden">
          <div 
            class="flex transition-transform duration-500 ease-in-out"
            :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
          >
            <div
              v-for="(testimonial, index) in testimonials"
              :key="index"
              class="w-full flex-shrink-0"
            >
              <div class="max-w-4xl mx-auto">
                <TestimonialCard :testimonial="testimonial" />
              </div>
            </div>
          </div>
        </div>
        
        <!-- Navigation Arrows -->
        <button
          v-if="testimonials.length > 1"
          @click="previousSlide"
          class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white shadow-medium rounded-full p-3 hover:bg-sage-green/10 transition-colors"
        >
          <ChevronLeftIcon class="h-6 w-6 text-charcoal" />
        </button>
        
        <button
          v-if="testimonials.length > 1"
          @click="nextSlide"
          class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-medium rounded-full p-3 hover:bg-sage-green/10 transition-colors"
        >
          <ChevronRightIcon class="h-6 w-6 text-charcoal" />
        </button>
        
        <!-- Dots Indicator -->
        <div v-if="testimonials.length > 1" class="flex justify-center mt-8 space-x-2">
          <button
            v-for="(_, index) in testimonials"
            :key="index"
            @click="currentSlide = index"
            :class="[
              'w-3 h-3 rounded-full transition-colors',
              currentSlide === index ? 'bg-warm-gold' : 'bg-warm-gray/30'
            ]"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import TestimonialCard from '@/components/business/TestimonialCard.vue'

const props = defineProps({
  testimonials: {
    type: Array,
    default: () => []
  }
})

const currentSlide = ref(0)
let autoSlideInterval = null

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % props.testimonials.length
}

const previousSlide = () => {
  currentSlide.value = currentSlide.value === 0 
    ? props.testimonials.length - 1 
    : currentSlide.value - 1
}

const startAutoSlide = () => {
  if (props.testimonials.length > 1) {
    autoSlideInterval = setInterval(nextSlide, 8000)
  }
}

const stopAutoSlide = () => {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval)
    autoSlideInterval = null
  }
}

onMounted(() => {
  startAutoSlide()
})

onUnmounted(() => {
  stopAutoSlide()
})
</script>
```

### Team Page Implementation
```vue
<!-- src/pages/TeamPage.vue -->
<template>
  <div class="team-page">
    <!-- Page Header -->
    <PageHeader
      title="Meet Our Team"
      subtitle="Experienced professionals dedicated to the highest standards of equestrian care"
      background-image="/images/team-hero.jpg"
    />
    
    <!-- Team Introduction -->
    <section class="py-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="heading-section text-3xl font-bold text-rich-brown mb-6">
          Professional Excellence in Horse Care
        </h2>
        <p class="text-lead text-lg text-warm-gray">
          Our team combines decades of experience with ongoing education and genuine passion for horses. 
          Every member is committed to providing the highest level of care for your horse and support for your equestrian journey.
        </p>
      </div>
    </section>
    
    <!-- Team Members -->
    <section class="py-16 bg-cream/30">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TeamMemberCard
            v-for="member in teamMembers"
            :key="member.id"
            :member="member"
          />
        </div>
      </div>
    </section>
    
    <!-- Qualifications and Certifications -->
    <section class="py-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="heading-section text-3xl font-bold text-rich-brown mb-12 text-center">
          Qualifications & Certifications
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="text-center">
            <div class="bg-white rounded-lg shadow-soft p-6 mb-4">
              <ShieldCheckIcon class="h-12 w-12 text-warm-gold mx-auto mb-4" />
              <h3 class="font-semibold text-charcoal mb-2">Certified Instructors</h3>
              <p class="text-sm text-warm-gray">USHJA and Equine Canada certified</p>
            </div>
          </div>
          
          <div class="text-center">
            <div class="bg-white rounded-lg shadow-soft p-6 mb-4">
              <AcademicCapIcon class="h-12 w-12 text-warm-gold mx-auto mb-4" />
              <h3 class="font-semibold text-charcoal mb-2">Continuing Education</h3>
              <p class="text-sm text-warm-gray">Regular clinics and training updates</p>
            </div>
          </div>
          
          <div class="text-center">
            <div class="bg-white rounded-lg shadow-soft p-6 mb-4">
              <HeartIcon class="h-12 w-12 text-warm-gold mx-auto mb-4" />
              <h3 class="font-semibold text-charcoal mb-2">First Aid Certified</h3>
              <p class="text-sm text-warm-gray">Human and equine emergency response</p>
            </div>
          </div>
          
          <div class="text-center">
            <div class="bg-white rounded-lg shadow-soft p-6 mb-4">
              <TrophyIcon class="h-12 w-12 text-warm-gold mx-auto mb-4" />
              <h3 class="font-semibold text-charcoal mb-2">Competition Experience</h3>
              <p class="text-sm text-warm-gray">Regional and national level success</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAppStore } from '@/stores/app'
import { 
  ShieldCheckIcon, 
  AcademicCapIcon, 
  HeartIcon, 
  TrophyIcon 
} from '@heroicons/vue/24/outline'
import PageHeader from '@/components/ui/PageHeader.vue'
import TeamMemberCard from '@/components/business/TeamMemberCard.vue'

const appStore = useAppStore()
const teamMembers = ref([])

onMounted(async () => {
  await appStore.fetchTeamMembers()
  teamMembers.value = appStore.teamMembers.sort((a, b) => (a.order || 0) - (b.order || 0))
})

// SEO Meta
useHead({
  title: 'Our Professional Team | Blackberry Equestrian',
  meta: [
    {
      name: 'description',
      content: 'Meet the experienced team at Blackberry Equestrian. Certified instructors, professional trainers, and dedicated staff in Durham Region, Ontario.'
    }
  ]
})
</script>
```

### Facilities Showcase Page
```vue
<!-- src/pages/FacilitiesPage.vue -->
<template>
  <div class="facilities-page">
    <!-- Page Header -->
    <PageHeader
      title="World-Class Facilities"
      subtitle="Modern amenities and professional-grade facilities for optimal horse care and training"
      background-image="/images/facilities-hero.jpg"
    />
    
    <!-- Facilities Overview -->
    <section class="py-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="heading-section text-3xl font-bold text-rich-brown mb-6">
          Everything Your Horse Needs to Thrive
        </h2>
        <p class="text-lead text-lg text-warm-gray mb-8">
          Our state-of-the-art facilities are designed with both horse and rider in mind, 
          featuring premium footing, excellent drainage, and all the amenities needed for 
          training, competition, and daily care.
        </p>
        
        <!-- Key Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div class="text-center">
            <div class="text-3xl font-bold text-warm-gold mb-2">24</div>
            <div class="text-sm text-warm-gray">Stalls Available</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-warm-gold mb-2">2</div>
            <div class="text-sm text-warm-gray">Indoor Arenas</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-warm-gold mb-2">45</div>
            <div class="text-sm text-warm-gray">Acres of Land</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-warm-gold mb-2">12</div>
            <div class="text-sm text-warm-gray">Paddocks</div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Facility Details -->
    <section class="py-16 bg-cream/30">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="space-y-16">
          <FacilityShowcase
            v-for="facility in facilities"
            :key="facility.id"
            :facility="facility"
            :reverse="facility.id % 2 === 0"
          />
        </div>
      </div>
    </section>
    
    <!-- Virtual Tour CTA -->
    <section class="py-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="heading-section text-3xl font-bold text-rich-brown mb-6">
          Schedule Your Personal Tour
        </h2>
        <p class="text-lead text-lg text-warm-gray mb-8">
          See our facilities in person and meet our team. We'd love to show you around 
          and discuss how we can serve you and your horse.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <BaseButton 
            to="/contact?service=Facility Tour"
            variant="primary"
            size="lg"
          >
            Schedule Tour
          </BaseButton>
          
          <BaseButton 
            :href="`tel:${appStore.siteConfig.contact.phone}`"
            variant="outline"
            size="lg"
          >
            Call Now
          </BaseButton>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAppStore } from '@/stores/app'
import PageHeader from '@/components/ui/PageHeader.vue'
import FacilityShowcase from '@/components/business/FacilityShowcase.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const appStore = useAppStore()
const facilities = ref([])

onMounted(async () => {
  // Load facilities data
  try {
    const response = await fetch('/api/facilities')
    const data = await response.json()
    facilities.value = data.sort((a, b) => (a.order || 0) - (b.order || 0))
  } catch (error) {
    console.error('Error loading facilities:', error)
  }
})

// SEO Meta
useHead({
  title: 'Professional Horse Boarding Facilities | Blackberry Equestrian',
  meta: [
    {
      name: 'description',
      content: 'Tour our modern equestrian facilities in Newtonville, Ontario. Indoor arenas, quality stalls, and premium amenities for horse boarding and training.'
    }
  ]
})
</script>
```

## Legal and Compliance Integration

### Legal Pages Implementation
```vue
<!-- src/pages/TermsPage.vue -->
<template>
  <div class="legal-page">
    <PageHeader
      title="Terms of Service"
      subtitle="Important legal information for clients and visitors"
    />
    
    <section class="py-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="prose prose-lg max-w-none">
          <!-- Terms content would be managed through CMS -->
          <LegalContent content-type="terms" />
        </div>
      </div>
    </section>
  </div>
</template>
```

### Privacy Policy Component
```vue
<!-- src/components/legal/PrivacyPolicy.vue -->
<template>
  <div class="privacy-policy">
    <!-- PIPEDA Compliance Notice -->
    <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
      <h3 class="text-lg font-semibold text-blue-900 mb-2">
        Privacy Protection in Canada
      </h3>
      <p class="text-blue-800 text-sm">
        Blackberry Equestrian is committed to protecting your privacy in accordance with 
        Canada's Personal Information Protection and Electronic Documents Act (PIPEDA) and Ontario privacy laws.
      </p>
    </div>
    
    <!-- Privacy policy content -->
    <div class="prose prose-lg max-w-none">
      <!-- Content loaded from CMS -->
    </div>
  </div>
</template>
```

## Success Criteria Validation

### Business Page Quality
- Professional presentation builds immediate trust
- Clear service descriptions with transparent pricing
- Easy-to-find contact information on every page
- Mobile-optimized experience for barn usage
- Fast loading times on rural internet connections

### Conversion Optimization
- Strategic placement of contact forms and CTAs
- Multiple ways to get in touch (phone, email, form)
- Trust signals prominently displayed
- Social proof through testimonials and credentials
- Clear next steps for interested visitors

### Content Management
- All pages easily editable through Decap CMS
- Dynamic content updates without developer intervention
- SEO metadata properly configured
- Image optimization and management
- Blog integration for ongoing content marketing

## Next Phase Handoff

### For Local SEO Agent
- All business pages ready for local keyword optimization
- Contact information consistently formatted
- Schema markup integration points identified
- Local content opportunities mapped

### For Mobile Experience Agent
- Touch-friendly interface patterns established
- Barn usage scenarios designed for
- Contact methods optimized for mobile
- Performance requirements documented

### For Analytics Agent
- Conversion tracking events identified
- Form submission goals configured
- User journey mapping completed
- Key business metrics defined

This Business Pages Agent provides a comprehensive foundation for establishing professional credibility, building trust with potential clients, and converting visitors into booking inquiries through strategic design and content presentation.# 🏢 Business Pages Agent

## Agent Profile
**Name**: Business Pages & Core Functionality Specialist  
**Role**: Essential business pages and conversion-focused functionality  
**Expertise**: Equestrian business presentation, Trust-building, Contact systems, Service showcases  

## Business Pages Architecture

### Core Business Objectives
1. **Professional Credibility**: Establish trust through quality presentation
2. **Clear Communication**: Services, pricing, and contact information
3. **Conversion Optimization**: Guide visitors to booking inquiries
4. **Local Authority**: Demonstrate expertise in Durham Region market
5. **Educational Value**: Provide helpful information to build relationships

## Homepage Implementation

### Homepage Component Structure
```vue
<!-- src/pages/HomePage.vue -->
<template>
  <div class="homepage">
    <!-- Hero Section -->
    <HeroSection 
      :hero-data="pageData.hero"
      :loading="loading"
    />
    
    <!-- Featured Services -->
    <FeaturedServices 
      :services="featuredServices"
      class="py-16 bg-cream/30"
    />
    
    <!-- About Preview -->
    <AboutPreview 
      :about-data="pageData.about"
      class="py-16"
    />
    
    <!-- Featured Horses -->
    <FeaturedHorses 
      :horses="featuredHorses"
      class="py-16 bg-cream/30"
    />
    
    <!-- Testimonials -->
    <TestimonialsSection 
      :testimonials="pageData.testimonials"
      class="py-16"
    />
    
    <!-- Facilities Preview -->
    <FacilitiesPreview class="py-16 bg-cream/30" />
    
    <!-- Contact CTA -->
    <ContactCTA class="py-16" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAppStore } from '@/stores/app'
import { useHorsesStore } from '@/stores/horses'
import HeroSection from '@/components/business/HeroSection.vue'
import FeaturedServices from '@/components/business/FeaturedServices.vue'
import AboutPreview from '@/components/business/AboutPreview.vue'
import FeaturedHorses from '@/components/business/FeaturedHorses.vue'
import TestimonialsSection from '@/components/business/TestimonialsSection.vue'
import FacilitiesPreview from '@/components/business/FacilitiesPreview.vue'
import ContactCTA from '@/components/business/ContactCTA.vue'

const appStore = useAppStore()
const horsesStore = useHorsesStore()

const pageData = ref({})
const loading = ref(true)

const featuredServices = computed(() => {
  return appStore.services.filter(service => service.featured).slice(0, 3)
})

const featuredHorses = computed(() => {
  return horsesStore.featuredHorses.slice(0, 6)
})

onMounted(async () => {
  try {
    // Load homepage content from CMS
    const response = await fetch('/api/pages/home')
    pageData.value = await response.json()
    
    // Ensure other stores are loaded
    await Promise.all([
      appStore.fetchServices(),
      horsesStore.fetchHorses()
    ])
  } catch (error) {
    console.error('Error loading homepage:', error)
  } finally {
    loading.value = false
  }
})

// SEO Meta
useHead({
  title: 'Blackberry Equestrian | Premier Hunter/Jumper Boarding in Durham Region, Ontario',
  meta: [
    {
      name: 'description',
      content: 'Professional horse boarding, training, and lessons in Newtonville, Ontario. Indoor/outdoor facilities, experienced trainers, horses for sale and lease.'
    },
    {
      property: 'og:title',
      content: 'Blackberry Equestrian | Hunter/Jumper Boarding Facility'
    },
    {
      property: 'og:description',
      content: 'Premier equestrian facility in Durham Region offering boarding, training, lessons, and quality horses for sale and lease.'
    },
    {
      property: 'og:type',
      content: 'website'
    }
  ]
})
</script>
```

### Hero Section Component
```vue
<!-- src/components/business/HeroSection.vue -->
<template>
  <section class="hero-section relative min-h-screen flex items-center justify-center overflow-hidden">
    <!-- Background Image with Parallax Effect -->
    <div 
      class="absolute inset-0 bg-cover bg-center bg-fixed"
      :style="{ backgroundImage: `url(${heroData?.image || '/images/hero-default.jpg'})` }"
    >
      <div class="absolute inset-0 bg-black/40"></div>
    </div>
    
    <!-- Content Container -->
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div class="max-w-4xl mx-auto">
        <!-- Main Heading -->
        <h1 class="heading-hero text-white mb-6 animate-fade-in">
          {{ heroData?.heading || 'Welcome to Blackberry Equestrian' }}
        </h1>
        
        <!-- Subheading -->
        <p class="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed animate-slide-up">
          {{ heroData?.subheading || 'Premier Hunter/Jumper boarding facility in the heart of Durham Region' }}
        </p>
        
        <!-- Key Features -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 animate-slide-up" style="animation-delay: 0.3s;">
          <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div class="flex items-center justify-center mb-2">
              <HomeIcon class="h-8 w-8 text-warm-gold" />
            </div>
            <h3 class="text-white font-semibold mb-1">Professional Boarding</h3>
            <p class="text-white/80 text-sm">Indoor & outdoor options</p>
          </div>
          
          <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div class="flex items-center justify-center mb-2">
              <AcademicCapIcon class="h-8 w-8 text-warm-gold" />
            </div>
            <h3 class="text-white font-semibold mb-1">Expert Training</h3>
            <p class="text-white/80 text-sm">All levels welcome</p>
          </div>
          
          <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div class="flex items-center justify-center mb-2">
              <HeartIcon class="h-8 w-8 text-warm-gold" />
            </div>
            <h3 class="text-white font-semibold mb-1">Quality Horses</h3>
            <p class="text-white/80 text-sm">Sale & lease options</p>
          </div>
        </div>
        
        <!-- Call to Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style="animation-delay: 0.6s;">
          <BaseButton 
            :to="heroData?.cta_link || '/services'"
            variant="primary"
            size="lg"
          >
            {{ heroData?.cta_text || 'Explore Our Services' }}
          </BaseButton>
          
          <BaseButton 
            to="/horses"
            variant="outline"
            size="lg"
            class="border-white text-white hover:bg-white hover:text-deep-forest"
          >
            View Available Horses
          </BaseButton>
        </div>
      </div>
    </div>
    
    <!-- Scroll Indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-gentle">