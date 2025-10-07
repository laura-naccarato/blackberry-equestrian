<template>
  <div class="contact-page">
    <!-- Page Header -->
    <section class="bg-gradient-to-br from-navy to-navy-dark text-white py-12 md:py-16">
      <div class="container-wide">
        <h1 class="font-serif text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
        <p class="text-xl opacity-95 max-w-3xl">
          Visit our facility or get in touch to learn more about our boarding, training, and lesson programs
        </p>
      </div>
    </section>

    <section class="py-12 md:py-16 bg-cream">
      <div class="container-wide">
        <div class="grid lg:grid-cols-2 gap-12">
          <!-- Contact Form -->
          <div>
            <BaseCard variant="elevated">
              <h2 class="text-2xl font-serif text-navy mb-6">Send Us a Message</h2>
              
              <form @submit.prevent="handleSubmit" class="space-y-4">
                <div class="grid md:grid-cols-2 gap-4">
                  <BaseInput
                    v-model="form.firstName"
                    label="First Name"
                    placeholder="John"
                    required
                    :error="errors.firstName"
                  />
                  <BaseInput
                    v-model="form.lastName"
                    label="Last Name"
                    placeholder="Doe"
                    required
                    :error="errors.lastName"
                  />
                </div>

                <BaseInput
                  v-model="form.email"
                  type="email"
                  label="Email Address"
                  placeholder="john@example.com"
                  required
                  :error="errors.email"
                />

                <BaseInput
                  v-model="form.phone"
                  type="tel"
                  label="Phone Number"
                  placeholder="(905) 555-0123"
                  hint="Optional"
                />

                <div>
                  <label class="form-label">Subject</label>
                  <select v-model="form.subject" class="form-input" required>
                    <option value="">Select a subject</option>
                    <option>General Inquiry</option>
                    <option>Boarding Information</option>
                    <option>Lesson Programs</option>
                    <option>Training Services</option>
                    <option>Horse Sales/Lease</option>
                    <option>Facility Tour</option>
                    <option>Other</option>
                  </select>
                </div>

                <BaseInput
                  v-model="form.message"
                  multiline
                  :rows="5"
                  label="Message"
                  placeholder="Tell us how we can help you..."
                  required
                  show-count
                  :maxlength="1000"
                  :error="errors.message"
                />

                <div class="flex items-center">
                  <input
                    id="newsletter"
                    v-model="form.newsletter"
                    type="checkbox"
                    class="h-4 w-4 text-tan focus:ring-tan border-gray rounded"
                  >
                  <label for="newsletter" class="ml-2 text-sm text-charcoal">
                    Send me updates about events and programs
                  </label>
                </div>

                <div class="pt-4 flex flex-col sm:flex-row gap-4">
                  <BaseButton
                    type="submit"
                    variant="primary"
                    size="lg"
                    :loading="submitting"
                    full-width
                    class="sm:w-auto"
                  >
                    Send Message
                  </BaseButton>
                  <BaseButton
                    type="button"
                    variant="outline"
                    size="lg"
                    @click="resetForm"
                  >
                    Clear Form
                  </BaseButton>
                </div>
              </form>

              <BaseAlert
                v-if="submitSuccess"
                variant="success"
                title="Message Sent!"
                message="Thank you for contacting us. We'll get back to you within 24 hours."
                class="mt-6"
              />
            </BaseCard>
          </div>

          <!-- Contact Information -->
          <div class="space-y-6">
            <!-- Location Card -->
            <BaseCard variant="bordered">
              <h3 class="text-xl font-semibold text-navy mb-4 flex items-center">
                <MapPinIcon class="h-6 w-6 mr-2 text-tan" />
                Visit Our Facility
              </h3>
              <address class="not-italic text-charcoal space-y-2">
                <p class="font-semibold">Blackberry Equestrian</p>
                <p>1234 Concession Road 7</p>
                <p>Newtonville, Ontario L0A 1J0</p>
              </address>
              <div class="mt-4">
                <BaseButton
                  tag="a"
                  href="https://maps.google.com/?q=Blackberry+Equestrian+Newtonville"
                  target="_blank"
                  variant="secondary"
                  size="sm"
                >
                  <MapIcon class="h-4 w-4 mr-2" />
                  Get Directions
                </BaseButton>
              </div>
            </BaseCard>

            <!-- Contact Methods -->
            <BaseCard variant="bordered">
              <h3 class="text-xl font-semibold text-navy mb-4 flex items-center">
                <PhoneIcon class="h-6 w-6 mr-2 text-tan" />
                Get in Touch
              </h3>
              <div class="space-y-3">
                <a
                  href="tel:905-555-0123"
                  class="flex items-center text-charcoal hover:text-tan transition-colors"
                >
                  <PhoneIcon class="h-5 w-5 mr-3 flex-shrink-0" />
                  <span>(905) 555-0123</span>
                </a>
                <a
                  href="mailto:info@blackberryequestrian.ca"
                  class="flex items-center text-charcoal hover:text-tan transition-colors"
                >
                  <EnvelopeIcon class="h-5 w-5 mr-3 flex-shrink-0" />
                  <span>info@blackberryequestrian.ca</span>
                </a>
              </div>
            </BaseCard>

            <!-- Hours of Operation -->
            <BaseCard variant="bordered">
              <h3 class="text-xl font-semibold text-navy mb-4 flex items-center">
                <ClockIcon class="h-6 w-6 mr-2 text-tan" />
                Hours of Operation
              </h3>
              <div class="space-y-2 text-charcoal">
                <div class="flex justify-between">
                  <span class="font-medium">Monday - Friday:</span>
                  <span>8:00 AM - 8:00 PM</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-medium">Saturday - Sunday:</span>
                  <span>7:00 AM - 7:00 PM</span>
                </div>
                <div class="pt-3 mt-3 border-t border-gray/20">
                  <p class="text-sm text-gray">
                    <strong>Note:</strong> After-hours access available for boarders.
                    Facility tours by appointment only.
                  </p>
                </div>
              </div>
            </BaseCard>

            <!-- Social Media -->
            <BaseCard variant="bordered">
              <h3 class="text-xl font-semibold text-navy mb-4">Follow Us</h3>
              <div class="flex gap-4">
                <a
                  href="https://facebook.com/blackberryequestrian"
                  target="_blank"
                  class="p-3 bg-tan-light/20 rounded-lg hover:bg-tan-light/30 transition-colors"
                  aria-label="Facebook"
                >
                  <svg class="h-6 w-6 text-navy" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="https://instagram.com/blackberryequestrian"
                  target="_blank"
                  class="p-3 bg-tan-light/20 rounded-lg hover:bg-tan-light/30 transition-colors"
                  aria-label="Instagram"
                >
                  <svg class="h-6 w-6 text-navy" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                  </svg>
                </a>
                <a
                  href="https://youtube.com/@blackberryequestrian"
                  target="_blank"
                  class="p-3 bg-tan-light/20 rounded-lg hover:bg-tan-light/30 transition-colors"
                  aria-label="YouTube"
                >
                  <svg class="h-6 w-6 text-navy" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </BaseCard>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseAlert from '@/components/ui/BaseAlert.vue'
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  MapIcon
} from '@heroicons/vue/24/outline'

const route = useRoute()

// Form data
const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  newsletter: false
})

const errors = reactive({
  firstName: '',
  lastName: '',
  email: '',
  message: ''
})

const submitting = ref(false)
const submitSuccess = ref(false)

// Check for pre-filled subject from query params
onMounted(() => {
  if (route.query.subject) {
    form.subject = route.query.subject
  }
})

// Form validation
const validateForm = () => {
  let isValid = true
  
  // Reset errors
  Object.keys(errors).forEach(key => errors[key] = '')
  
  if (!form.firstName.trim()) {
    errors.firstName = 'First name is required'
    isValid = false
  }
  
  if (!form.lastName.trim()) {
    errors.lastName = 'Last name is required'
    isValid = false
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(form.email)) {
    errors.email = 'Please enter a valid email address'
    isValid = false
  }
  
  if (!form.message.trim() || form.message.trim().length < 10) {
    errors.message = 'Please enter a message (minimum 10 characters)'
    isValid = false
  }
  
  return isValid
}

// Handle form submission
const handleSubmit = async () => {
  if (!validateForm()) return
  
  submitting.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // In production, this would send to your backend
  console.log('Form submitted:', form)
  
  submitting.value = false
  submitSuccess.value = true
  
  // Reset form after success
  setTimeout(() => {
    resetForm()
    submitSuccess.value = false
  }, 5000)
}

// Reset form
const resetForm = () => {
  Object.keys(form).forEach(key => {
    if (typeof form[key] === 'boolean') {
      form[key] = false
    } else {
      form[key] = ''
    }
  })
  Object.keys(errors).forEach(key => errors[key] = '')
  submitSuccess.value = false
}
</script>

<style scoped>
.form-input {
  @apply block w-full px-4 py-3 border border-gray/30 rounded-lg;
  @apply focus:outline-none focus:ring-2 focus:ring-tan focus:border-transparent;
  @apply placeholder-gray text-charcoal bg-white;
  @apply min-h-[44px];
}

select.form-input {
  @apply appearance-none bg-no-repeat bg-right;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}
</style>