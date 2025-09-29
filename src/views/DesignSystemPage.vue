<template>
  <div class="min-h-screen bg-cream py-12">
    <div class="container-wide">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="heading-hero text-deep-forest mb-4">
          Blackberry Equestrian Design System
        </h1>
        <p class="text-lead text-warm-gray max-w-3xl mx-auto">
          A professional, accessible, and mobile-first design system for our Hunter/Jumper boarding facility
        </p>
      </div>

      <!-- Color Palette -->
      <section class="mb-16">
        <h2 class="heading-section">Color Palette</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div v-for="color in colors" :key="color.name" class="space-y-2">
            <div 
              :class="`h-24 rounded-lg shadow-md ${color.bgClass}`"
              :style="`background-color: ${color.hex}`"
            ></div>
            <p class="text-sm font-medium text-charcoal">{{ color.label }}</p>
            <p class="text-xs text-warm-gray">{{ color.hex }}</p>
          </div>
        </div>
      </section>

      <!-- Typography -->
      <section class="mb-16">
        <h2 class="heading-section">Typography</h2>
        <div class="space-y-6 bg-white p-8 rounded-xl shadow-soft">
          <div>
            <h1 class="font-serif text-6xl text-deep-forest">Hero Heading</h1>
            <p class="text-sm text-warm-gray mt-2">font-serif text-6xl</p>
          </div>
          <div>
            <h2 class="font-serif text-4xl text-rich-brown">Section Heading</h2>
            <p class="text-sm text-warm-gray mt-2">font-serif text-4xl</p>
          </div>
          <div>
            <h3 class="font-sans text-2xl text-charcoal">Subsection Heading</h3>
            <p class="text-sm text-warm-gray mt-2">font-sans text-2xl</p>
          </div>
          <div>
            <p class="text-lg text-charcoal">Lead paragraph text for emphasis</p>
            <p class="text-sm text-warm-gray mt-2">text-lg</p>
          </div>
          <div>
            <p class="text-base text-charcoal">Body text for regular content</p>
            <p class="text-sm text-warm-gray mt-2">text-base</p>
          </div>
        </div>
      </section>

      <!-- Buttons -->
      <section class="mb-16">
        <h2 class="heading-section">Buttons</h2>
        
        <!-- Button Variants -->
        <div class="mb-8">
          <h3 class="text-xl font-semibold text-charcoal mb-4">Variants</h3>
          <div class="flex flex-wrap gap-4">
            <BaseButton variant="primary">Primary Button</BaseButton>
            <BaseButton variant="secondary">Secondary Button</BaseButton>
            <BaseButton variant="outline">Outline Button</BaseButton>
            <BaseButton variant="ghost">Ghost Button</BaseButton>
            <BaseButton variant="danger">Danger Button</BaseButton>
          </div>
        </div>

        <!-- Button Sizes -->
        <div class="mb-8">
          <h3 class="text-xl font-semibold text-charcoal mb-4">Sizes</h3>
          <div class="flex flex-wrap items-center gap-4">
            <BaseButton size="sm">Small</BaseButton>
            <BaseButton size="md">Medium</BaseButton>
            <BaseButton size="lg">Large</BaseButton>
            <BaseButton size="xl">Extra Large</BaseButton>
          </div>
        </div>

        <!-- Button States -->
        <div class="mb-8">
          <h3 class="text-xl font-semibold text-charcoal mb-4">States</h3>
          <div class="flex flex-wrap gap-4">
            <BaseButton disabled>Disabled</BaseButton>
            <BaseButton loading>Loading</BaseButton>
            <BaseButton full-width>Full Width</BaseButton>
          </div>
        </div>
      </section>

      <!-- Cards -->
      <section class="mb-16">
        <h2 class="heading-section">Cards</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Basic Card -->
          <BaseCard title="Basic Card">
            <p class="text-warm-gray">This is a basic card with some content inside.</p>
          </BaseCard>

          <!-- Card with Badge -->
          <BaseCard 
            title="Horse Profile Card"
            badge="Available"
            badge-color="success"
            interactive
          >
            <p class="text-warm-gray">16.2hh Bay Gelding, excellent hunter prospect.</p>
            <template #footer>
              <BaseButton variant="primary" size="sm" full-width>
                View Details
              </BaseButton>
            </template>
          </BaseCard>

          <!-- Card with Price -->
          <BaseCard 
            price="$45,000"
            badge="Featured"
            badge-color="warning"
            interactive
          >
            <h3 class="font-semibold text-charcoal mb-2">Premium Show Horse</h3>
            <p class="text-warm-gray">Championship experience at A-rated shows.</p>
          </BaseCard>
        </div>
      </section>

      <!-- Forms -->
      <section class="mb-16">
        <h2 class="heading-section">Form Elements</h2>
        <div class="bg-white p-8 rounded-xl shadow-soft max-w-2xl">
          <div class="space-y-6">
            <BaseInput
              v-model="formData.name"
              label="Full Name"
              placeholder="Enter your name"
              required
            />
            
            <BaseInput
              v-model="formData.email"
              type="email"
              label="Email Address"
              placeholder="you@example.com"
              hint="We'll never share your email"
            />
            
            <BaseInput
              v-model="formData.phone"
              type="tel"
              label="Phone Number"
              placeholder="(555) 123-4567"
            />
            
            <BaseInput
              v-model="formData.message"
              multiline
              :rows="4"
              label="Message"
              placeholder="Tell us about your equestrian experience..."
              show-count
              :maxlength="500"
            />
            
            <BaseInput
              v-model="formData.error"
              label="Error State Example"
              error="This field has an error"
            />

            <div class="flex gap-4">
              <BaseButton variant="primary">Submit</BaseButton>
              <BaseButton variant="outline">Cancel</BaseButton>
            </div>
          </div>
        </div>
      </section>

      <!-- Alerts -->
      <section class="mb-16">
        <h2 class="heading-section">Alerts & Notifications</h2>
        <div class="space-y-4 max-w-3xl">
          <BaseAlert
            variant="success"
            title="Success!"
            message="Your tour has been scheduled successfully."
          />
          
          <BaseAlert
            variant="warning"
            title="Limited Availability"
            message="Only 2 stalls remaining for the winter season."
          />
          
          <BaseAlert
            variant="error"
            title="Error"
            message="Please correct the errors in the form before submitting."
          />
          
          <BaseAlert
            variant="info"
            title="Facility Hours"
            message="Open daily 8:00 AM - 8:00 PM. After-hours access for boarders."
          />
        </div>
      </section>

      <!-- Loading States -->
      <section class="mb-16">
        <h2 class="heading-section">Loading States</h2>
        <div class="grid md:grid-cols-4 gap-6">
          <div class="bg-white p-8 rounded-lg shadow-soft text-center">
            <BaseLoading size="sm" show-text />
            <p class="text-sm text-warm-gray mt-4">Small</p>
          </div>
          <div class="bg-white p-8 rounded-lg shadow-soft text-center">
            <BaseLoading size="md" show-text />
            <p class="text-sm text-warm-gray mt-4">Medium</p>
          </div>
          <div class="bg-white p-8 rounded-lg shadow-soft text-center">
            <BaseLoading size="lg" show-text />
            <p class="text-sm text-warm-gray mt-4">Large</p>
          </div>
          <div class="bg-white p-8 rounded-lg shadow-soft text-center">
            <BaseLoading size="xl" :show-text="false" />
            <p class="text-sm text-warm-gray mt-4">Extra Large</p>
          </div>
        </div>
      </section>

      <!-- Modal Example -->
      <section class="mb-16">
        <h2 class="heading-section">Modal Dialog</h2>
        <div class="space-y-4">
          <BaseButton @click="showModal = true" variant="primary">
            Open Modal
          </BaseButton>
          
          <BaseModal
            v-model="showModal"
            title="Schedule a Tour"
            subtitle="Visit our beautiful facility in Newtonville"
            size="md"
          >
            <div class="space-y-4">
              <p class="text-warm-gray">
                We'd love to show you around our Hunter/Jumper facility. Tours are available daily by appointment.
              </p>
              <BaseInput
                label="Preferred Date"
                type="date"
                placeholder="Select a date"
              />
              <BaseInput
                label="Preferred Time"
                type="time"
                placeholder="Select a time"
              />
            </div>
            
            <template #footer>
              <div class="flex gap-3 justify-end">
                <BaseButton variant="outline" @click="showModal = false">
                  Cancel
                </BaseButton>
                <BaseButton variant="primary" @click="showModal = false">
                  Schedule Tour
                </BaseButton>
              </div>
            </template>
          </BaseModal>
        </div>
      </section>

      <!-- Responsive Grid Example -->
      <section class="mb-16">
        <h2 class="heading-section">Responsive Grid System</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <div v-for="i in 8" :key="i" class="bg-white p-6 rounded-lg shadow-soft text-center">
            <div class="w-12 h-12 bg-warm-gold rounded-full mx-auto mb-3"></div>
            <p class="font-medium text-charcoal">Grid Item {{ i }}</p>
          </div>
        </div>
      </section>

      <!-- Accessibility Features -->
      <section class="mb-16">
        <h2 class="heading-section">Accessibility Features</h2>
        <div class="bg-white p-8 rounded-xl shadow-soft">
          <ul class="space-y-3 text-charcoal">
            <li class="flex items-start">
              <svg class="w-6 h-6 text-hunter-green mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              <span>WCAG 2.2 AA color contrast compliance</span>
            </li>
            <li class="flex items-start">
              <svg class="w-6 h-6 text-hunter-green mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              <span>44px minimum touch targets for mobile</span>
            </li>
            <li class="flex items-start">
              <svg class="w-6 h-6 text-hunter-green mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              <span>Semantic HTML structure</span>
            </li>
            <li class="flex items-start">
              <svg class="w-6 h-6 text-hunter-green mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              <span>Focus management and keyboard navigation</span>
            </li>
            <li class="flex items-start">
              <svg class="w-6 h-6 text-hunter-green mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              <span>Screen reader compatible components</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import BaseAlert from '@/components/ui/BaseAlert.vue'
import BaseLoading from '@/components/ui/BaseLoading.vue'

// Color palette data
const colors = [
  { name: 'mocha-mousse', label: 'Mocha Mousse', hex: '#A67B5B', bgClass: 'bg-mocha-mousse' },
  { name: 'deep-forest', label: 'Deep Forest', hex: '#2D4A3E', bgClass: 'bg-deep-forest' },
  { name: 'warm-gold', label: 'Warm Gold', hex: '#D4AF37', bgClass: 'bg-warm-gold' },
  { name: 'rich-brown', label: 'Rich Brown', hex: '#6B4423', bgClass: 'bg-rich-brown' },
  { name: 'sage-green', label: 'Sage Green', hex: '#9CAF88', bgClass: 'bg-sage-green' },
  { name: 'cream', label: 'Cream', hex: '#FAF7F0', bgClass: 'bg-cream' },
  { name: 'charcoal', label: 'Charcoal', hex: '#36454F', bgClass: 'bg-charcoal' },
  { name: 'warm-gray', label: 'Warm Gray', hex: '#8B7D7B', bgClass: 'bg-warm-gray' },
  { name: 'hunter-green', label: 'Hunter Green', hex: '#355E3B', bgClass: 'bg-hunter-green' },
  { name: 'barn-red', label: 'Barn Red', hex: '#8B3A3A', bgClass: 'bg-barn-red' },
  { name: 'hay-gold', label: 'Hay Gold', hex: '#F4E4C1', bgClass: 'bg-hay-gold' },
  { name: 'sky-blue', label: 'Sky Blue', hex: '#87CEEB', bgClass: 'bg-sky-blue' },
]

// Form data
const formData = ref({
  name: '',
  email: '',
  phone: '',
  message: '',
  error: 'Example error field'
})

// Modal state
const showModal = ref(false)
</script>

<style scoped>
.heading-hero {
  @apply font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight;
}

.heading-section {
  @apply font-serif text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight text-rich-brown mb-6;
}

.text-lead {
  @apply text-lg md:text-xl leading-relaxed;
}
</style>