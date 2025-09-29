        <router-link 
          :to="`/horses/${horse.id || horse.slug}`"
          class="btn btn-primary btn-sm"
        >
          View Details
        </router-link>
      </div>
    </div>
  </BaseCard>
</template>

<script setup>
import { computed } from 'vue'
import { useHorsesStore } from '@/stores/horses'
import BaseCard from '@/components/ui/BaseCard.vue'

const props = defineProps({
  horse: {
    type: Object,
    required: true
  }
})

const horsesStore = useHorsesStore()

const statusColor = computed(() => {
  switch (props.horse.status) {
    case 'Available': return 'success'
    case 'Pending': return 'warning'
    case 'Sold': return 'error'
    case 'Leased': return 'info'
    default: return 'primary'
  }
})

const statusClasses = computed(() => {
  const baseClasses = 'inline-block px-2 py-1 text-xs font-semibold rounded-full'
  
  switch (props.horse.status) {
    case 'Available':
      return `${baseClasses} bg-green-100 text-green-800`
    case 'Pending':
      return `${baseClasses} bg-yellow-100 text-yellow-800`
    case 'Sold':
      return `${baseClasses} bg-red-100 text-red-800`
    case 'Leased':
      return `${baseClasses} bg-blue-100 text-blue-800`
    default:
      return `${baseClasses} bg-gray-100 text-gray-800`
  }
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
```

### Horse Search and Filter Component
```vue
<!-- src/components/equestrian/HorseFilters.vue -->
<template>
  <div class="horse-filters bg-white rounded-lg shadow-soft p-6 mb-8">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-lg font-semibold text-charcoal">Find Your Perfect Horse</h3>
      <BaseButton 
        variant="ghost" 
        size="sm" 
        @click="horsesStore.resetFilters()"
      >
        Reset Filters
      </BaseButton>
    </div>
    
    <!-- Search Bar -->
    <div class="mb-6">
      <BaseInput
        v-model="horsesStore.filters.searchQuery"
        type="text"
        placeholder="Search by name, breed, or description..."
        class="w-full"
      >
        <template #icon>
          <MagnifyingGlassIcon class="h-5 w-5 text-warm-gray" />
        </template>
      </BaseInput>
    </div>
    
    <!-- Filter Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <!-- Status Filter -->
      <div>
        <label class="block text-sm font-medium text-rich-brown mb-2">Status</label>
        <select 
          v-model="horsesStore.filters.status"
          class="w-full px-3 py-2 border border-warm-gray/30 rounded-md focus:ring-2 focus:ring-warm-gold focus:border-transparent"
        >
          <option value="">All Status</option>
          <option value="Available">Available</option>
          <option value="Pending">Pending</option>
          <option value="Sold">Sold</option>
          <option value="Leased">Leased</option>
        </select>
      </div>
      
      <!-- Type Filter -->
      <div>
        <label class="block text-sm font-medium text-rich-brown mb-2">Listing Type</label>
        <select 
          v-model="horsesStore.filters.type"
          class="w-full px-3 py-2 border border-warm-gray/30 rounded-md focus:ring-2 focus:ring-warm-gold focus:border-transparent"
        >
          <option value="">Sale & Lease</option>
          <option value="Sale">For Sale</option>
          <option value="Lease">For Lease</option>
          <option value="Both">Both Options</option>
        </select>
      </div>
      
      <!-- Breed Filter -->
      <div>
        <label class="block text-sm font-medium text-rich-brown mb-2">Breed</label>
        <select 
          v-model="horsesStore.filters.breed"
          class="w-full px-3 py-2 border border-warm-gray/30 rounded-md focus:ring-2 focus:ring-warm-gold focus:border-transparent"
        >
          <option value="">All Breeds</option>
          <option 
            v-for="breed in horsesStore.availableBreeds"
            :key="breed"
            :value="breed"
          >
            {{ breed }}
          </option>
        </select>
      </div>
      
      <!-- Training Level Filter -->
      <div>
        <label class="block text-sm font-medium text-rich-brown mb-2">Training Level</label>
        <select 
          v-model="horsesStore.filters.trainingLevel"
          class="w-full px-3 py-2 border border-warm-gray/30 rounded-md focus:ring-2 focus:ring-warm-gold focus:border-transparent"
        >
          <option value="">All Levels</option>
          <option value="Green Broke">Green Broke</option>
          <option value="Training Level">Training Level</option>
          <option value="First Level">First Level</option>
          <option value="Second Level">Second Level</option>
          <option value="Finished">Finished</option>
          <option value="Schoolmaster">Schoolmaster</option>
        </select>
      </div>
    </div>
    
    <!-- Advanced Filters Expandable Section -->
    <div class="border-t border-warm-gray/20 pt-6">
      <button
        @click="showAdvanced = !showAdvanced"
        class="flex items-center text-deep-forest hover:text-warm-gold transition-colors mb-4"
      >
        <span class="font-medium">Advanced Filters</span>
        <ChevronDownIcon 
          :class="['h-5 w-5 ml-2 transition-transform', showAdvanced ? 'rotate-180' : '']" 
        />
      </button>
      
      <div v-show="showAdvanced" class="space-y-6">
        <!-- Age Range Slider -->
        <div>
          <label class="block text-sm font-medium text-rich-brown mb-2">
            Age Range: {{ horsesStore.filters.ageRange[0] }} - {{ horsesStore.filters.ageRange[1] }} years
          </label>
          <div class="px-2">
            <input
              v-model="horsesStore.filters.ageRange[0]"
              type="range"
              min="0"
              max="30"
              class="w-full h-2 bg-sage-green/20 rounded-lg appearance-none cursor-pointer slider"
            />
            <input
              v-model="horsesStore.filters.ageRange[1]"
              type="range"
              min="0"
              max="30"
              class="w-full h-2 bg-sage-green/20 rounded-lg appearance-none cursor-pointer slider mt-1"
            />
          </div>
        </div>
        
        <!-- Price Range Slider -->
        <div>
          <label class="block text-sm font-medium text-rich-brown mb-2">
            Price Range: {{ formatPrice(horsesStore.filters.priceRange[0]) }} - {{ formatPrice(horsesStore.filters.priceRange[1]) }}
          </label>
          <div class="px-2">
            <input
              v-model="horsesStore.filters.priceRange[0]"
              type="range"
              min="0"
              max="200000"
              step="5000"
              class="w-full h-2 bg-sage-green/20 rounded-lg appearance-none cursor-pointer slider"
            />
            <input
              v-model="horsesStore.filters.priceRange[1]"
              type="range"
              min="0"
              max="200000"
              step="5000"
              class="w-full h-2 bg-sage-green/20 rounded-lg appearance-none cursor-pointer slider mt-1"
            />
          </div>
        </div>
        
        <!-- Disciplines Multi-select -->
        <div>
          <label class="block text-sm font-medium text-rich-brown mb-2">Disciplines</label>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
            <label 
              v-for="discipline in horsesStore.availableDisciplines"
              :key="discipline"
              class="flex items-center"
            >
              <input
                v-model="horsesStore.filters.disciplines"
                :value="discipline"
                type="checkbox"
                class="rounded border-warm-gray/30 text-warm-gold focus:ring-warm-gold"
              />
              <span class="ml-2 text-sm text-charcoal">{{ discipline }}</span>
            </label>
          </div>
        </div>
        
        <!-- Rider Suitability -->
        <div>
          <label class="block text-sm font-medium text-rich-brown mb-2">Suitable For</label>
          <select 
            v-model="horsesStore.filters.riderSuitability"
            class="w-full md:w-64 px-3 py-2 border border-warm-gray/30 rounded-md focus:ring-2 focus:ring-warm-gold focus:border-transparent"
          >
            <option value="">All Rider Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Professional">Professional</option>
          </select>
        </div>
      </div>
    </div>
    
    <!-- Sort and Results Info -->
    <div class="flex justify-between items-center mt-6 pt-6 border-t border-warm-gray/20">
      <div class="text-sm text-warm-gray">
        {{ horsesStore.filteredHorses.length }} horses found
      </div>
      
      <div class="flex items-center space-x-2">
        <label class="text-sm font-medium text-rich-brown">Sort by:</label>
        <select 
          v-model="horsesStore.filters.sortBy"
          class="px-3 py-1 border border-warm-gray/30 rounded-md text-sm focus:ring-2 focus:ring-warm-gold focus:border-transparent"
        >
          <option value="date">Date Listed</option>
          <option value="price">Price</option>
          <option value="age">Age</option>
          <option value="name">Name</option>
        </select>
        
        <button
          @click="toggleSortOrder"
          class="p-1 text-warm-gray hover:text-deep-forest transition-colors"
          :title="`Sort ${horsesStore.filters.sortOrder === 'asc' ? 'Ascending' : 'Descending'}`"
        >
          <ArrowUpIcon v-if="horsesStore.filters.sortOrder === 'asc'" class="h-4 w-4" />
          <ArrowDownIcon v-else class="h-4 w-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useHorsesStore } from '@/stores/horses'
import { 
  MagnifyingGlassIcon, 
  ChevronDownIcon, 
  ArrowUpIcon, 
  ArrowDownIcon 
} from '@heroicons/vue/24/outline'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const horsesStore = useHorsesStore()
const showAdvanced = ref(false)

const formatPrice = (price) => {
  if (price === 0) return 'Any'
  if (price >= 200000) return '$200,000+'
  
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0
  }).format(price)
}

const toggleSortOrder = () => {
  horsesStore.filters.sortOrder = horsesStore.filters.sortOrder === 'asc' ? 'desc' : 'asc'
}
</script>

<style scoped>
.slider::-webkit-slider-thumb {
  appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #D4AF37;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.slider::-moz-range-thumb {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #D4AF37;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>
```

### Horse Detail Page Component
```vue
<!-- src/components/equestrian/HorseDetailPage.vue -->
<template>
  <div class="horse-detail-page">
    <div v-if="loading" class="flex justify-center items-center min-h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-warm-gold"></div>
    </div>
    
    <div v-else-if="error" class="text-center py-12">
      <p class="text-red-600 mb-4">{{ error }}</p>
      <BaseButton @click="$router.push('/horses')">
        Back to Horse Listings
      </BaseButton>
    </div>
    
    <div v-else-if="horse" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Breadcrumb -->
      <nav class="mb-8">
        <ol class="flex items-center space-x-2 text-sm text-warm-gray">
          <li><router-link to="/" class="hover:text-deep-forest">Home</router-link></li>
          <li>•</li>
          <li><router-link to="/horses" class="hover:text-deep-forest">Horses</router-link></li>
          <li>•</li>
          <li class="text-charcoal font-medium">{{ horse.title }}</li>
        </ol>
      </nav>
      
      <!-- Horse Header -->
      <div class="mb-8">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 class="heading-hero text-3xl lg:text-4xl font-bold text-deep-forest mb-2">
              {{ horse.title }}
            </h1>
            <p class="text-lead text-lg text-warm-gray mb-4">
              {{ horse.basic_info?.age }} year old {{ horse.basic_info?.breed }} {{ horse.basic_info?.gender }}
            </p>
            
            <!-- Status and Type -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span :class="getStatusClasses(horse.status)">
                {{ horse.status }}
              </span>
              <span class="px-3 py-1 bg-warm-gold text-rich-brown rounded-full text-sm font-medium">
                {{ horse.type }}
              </span>
              
              <!-- Disciplines -->
              <span 
                v-for="discipline in horse.training?.disciplines?.slice(0, 3)"
                :key="discipline"
                class="px-3 py-1 bg-sage-green/20 text-deep-forest rounded-full text-sm"
              >
                {{ discipline }}
              </span>
            </div>
          </div>
          
          <!-- Price and Action -->
          <div class="text-left lg:text-right">
            <div class="mb-4">
              <div v-if="horse.pricing?.sale_price" class="text-2xl font-bold text-deep-forest">
                {{ horsesStore.formatPrice(horse.pricing.sale_price, 'sale') }}
              </div>
              <div v-if="horse.pricing?.lease_price" class="text-lg text-warm-gray">
                {{ horsesStore.formatPrice(horse.pricing.lease_price, 'lease') }}
              </div>
              <div v-if="horse.pricing?.negotiable" class="text-sm text-warm-gray">
                Price Negotiable
              </div>
            </div>
            
            <div class="flex flex-col sm:flex-row lg:flex-col gap-2">
              <BaseButton 
                @click="showInquiryModal = true"
                variant="primary"
                size="lg"
              >
                Request Information
              </BaseButton>
              
              <BaseButton 
                v-if="horse.pricing?.trial_available"
                @click="showTrialModal = true"
                variant="secondary"
                size="lg"
              >
                Request Trial
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Photo Gallery - Takes up 2 columns -->
        <div class="lg:col-span-2">
          <HorseGallery :horse="horse" />
        </div>
        
        <!-- Horse Information Sidebar -->
        <div class="space-y-6">
          <!-- Basic Information Card -->
          <div class="bg-white rounded-lg shadow-soft p-6">
            <h3 class="heading-subsection text-lg font-semibold text-charcoal mb-4">
              Basic Information
            </h3>
            
            <div class="space-y-3">
              <div v-if="horse.basic_info?.registered_name" class="flex justify-between">
                <span class="text-warm-gray">Registered Name:</span>
                <span class="font-medium text-charcoal">{{ horse.basic_info.registered_name }}</span>
              </div>
              
              <div class="flex justify-between">
                <span class="text-warm-gray">Barn Name:</span>
                <span class="font-medium text-charcoal">{{ horse.basic_info?.barn_name || horse.title }}</span>
              </div>
              
              <div class="flex justify-between">
                <span class="text-warm-gray">Breed:</span>
                <span class="font-medium text-charcoal">{{ horse.basic_info?.breed }}</span>
              </div>
              
              <div class="flex justify-between">
                <span class="text-warm-gray">Age:</span>
                <span class="font-medium text-charcoal">{{ horse.basic_info?.age }} years</span>
              </div>
              
              <div class="flex justify-between">
                <span class="text-warm-gray">Height:</span>
                <span class="font-medium text-charcoal">{{ horse.basic_info?.height }}</span>
              </div>
              
              <div class="flex justify-between">
                <span class="text-warm-gray">Color:</span>
                <span class="font-medium text-charcoal">{{ horse.basic_info?.color }}</span>
              </div>
              
              <div class="flex justify-between">
                <span class="text-warm-gray">Gender:</span>
                <span class="font-medium text-charcoal">{{ horse.basic_info?.gender }}</span>
              </div>
              
              <div v-if="horse.basic_info?.papers" class="flex justify-between">
                <span class="text-warm-gray">Papers:</span>
                <span class="font-medium text-green-600">✓ Registered</span>
              </div>
            </div>
          </div>
          
          <!-- Training Information Card -->
          <div class="bg-white rounded-lg shadow-soft p-6">
            <h3 class="heading-subsection text-lg font-semibold text-charcoal mb-4">
              Training & Performance
            </h3>
            
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-warm-gray">Training Level:</span>
                <span class="font-medium text-charcoal">{{ horse.training?.level }}</span>
              </div>
              
              <div v-if="horse.training?.jump_height">
                <span class="text-warm-gray">Jump Height:</span>
                <span class="font-medium text-charcoal">{{ horse.training.jump_height }}</span>
              </div>
              
              <div>
                <span class="text-warm-gray">Suitable For:</span>
                <span class="font-medium text-charcoal">{{ horse.training?.rider_suitability }} Rider</span>
              </div>
              
              <div v-if="horse.training?.disciplines?.length">
                <span class="text-warm-gray block mb-2">Disciplines:</span>
                <div class="flex flex-wrap gap-2">
                  <span 
                    v-for="discipline in horse.training.disciplines"
                    :key="discipline"
                    class="px-2 py-1 bg-sage-green/20 text-deep-forest rounded text-sm"
                  >
                    {{ discipline }}
                  </span>
                </div>
              </div>
              
              <div v-if="horse.training?.special_skills?.length">
                <span class="text-warm-gray block mb-2">Special Skills:</span>
                <ul class="list-disc list-inside space-y-1 text-sm text-charcoal">
                  <li v-for="skill in horse.training.special_skills" :key="skill">
                    {{ skill }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <!-- Contact Information Card -->
          <div class="bg-white rounded-lg shadow-soft p-6">
            <h3 class="heading-subsection text-lg font-semibold text-charcoal mb-4">
              Contact Information
            </h3>
            
            <div class="space-y-3">
              <div>
                <span class="text-warm-gray">Contact:</span>
                <span class="font-medium text-charcoal block">{{ horse.contact?.name }}</span>
              </div>
              
              <div>
                <span class="text-warm-gray">Email:</span>
                <a 
                  :href="`mailto:${horse.contact?.email}`"
                  class="font-medium text-deep-forest hover:text-warm-gold transition-colors block"
                >
                  {{ horse.contact?.email }}
                </a>
              </div>
              
              <div v-if="horse.contact?.phone">
                <span class="text-warm-gray">Phone:</span>
                <a 
                  :href="`tel:${horse.contact?.phone}`"
                  class="font-medium text-deep-forest hover:text-warm-gold transition-colors block"
                >
                  {{ horse.contact?.phone }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Detailed Description -->
      <div class="mt-8 bg-white rounded-lg shadow-soft p-8">
        <h2 class="heading-section text-2xl font-bold text-rich-brown mb-6">
          About {{ horse.title }}
        </h2>
        
        <div 
          class="prose prose-lg max-w-none text-body"
          v-html="formatMarkdown(horse.body)"
        ></div>
        
        <!-- Competition Record -->
        <div v-if="horse.training?.competition_record" class="mt-8 pt-8 border-t border-warm-gray/20">
          <h3 class="heading-subsection text-xl font-semibold text-charcoal mb-4">
            Competition Record
          </h3>
          <div 
            class="prose max-w-none text-body"
            v-html="formatMarkdown(horse.training.competition_record)"
          ></div>
        </div>
        
        <!-- Health Information -->
        <div v-if="horse.health?.health_notes" class="mt-8 pt-8 border-t border-warm-gray/20">
          <h3 class="heading-subsection text-xl font-semibold text-charcoal mb-4">
            Health & Care Information
          </h3>
          <div 
            class="prose max-w-none text-body"
            v-html="formatMarkdown(horse.health.health_notes)"
          ></div>
        </div>
      </div>
      
      <!-- Video Section -->
      <div v-if="horse.video_url" class="mt-8 bg-white rounded-lg shadow-soft p-8">
        <h2 class="heading-section text-2xl font-bold text-rich-brown mb-6">
          Video
        </h2>
        
        <div class="aspect-video rounded-lg overflow-hidden">
          <iframe
            :src="getEmbedUrl(horse.video_url)"
            class="w-full h-full"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
    
    <!-- Inquiry Modal -->
    <HorseInquiryModal 
      v-if="showInquiryModal"
      :horse="horse"
      @close="showInquiryModal = false"
      @submitted="handleInquirySubmitted"
    />
    
    <!-- Trial Request Modal -->
    <TrialRequestModal 
      v-if="showTrialModal && horse.pricing?.trial_available"
      :horse="horse"
      @close="showTrialModal = false"
      @submitted="handleTrialSubmitted"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useHorsesStore } from '@/stores/horses'
import BaseButton from '@/components/ui/BaseButton.vue'
import HorseGallery from '@/components/equestrian/HorseGallery.vue'
import HorseInquiryModal from '@/components/equestrian/HorseInquiryModal.vue'
import TrialRequestModal from '@/components/equestrian/TrialRequestModal.vue'

const route = useRoute()
const router = useRouter()
const horsesStore = useHorsesStore()

const horse = ref(null)
const loading = ref(true)
const error = ref(null)
const showInquiryModal = ref(false)
const showTrialModal = ref(false)

onMounted(async () => {
  try {
    const horseData = await horsesStore.getHorseById(route.params.id)
    if (!horseData) {
      error.value = 'Horse not found'
      return
    }
    horse.value = horseData
  } catch (err) {
    error.value = 'Failed to load horse details'
    console.error('Error loading horse:', err)
  } finally {
    loading.value = false
  }
})

const getStatusClasses = (status) => {
  const baseClasses = 'px-3 py-1 rounded-full text-sm font-medium'
  
  switch (status) {
    case 'Available':
      return `${baseClasses} bg-green-100 text-green-800`
    case 'Pending':
      return `${baseClasses} bg-yellow-100 text-yellow-800`
    case 'Sold':
      return `${baseClasses} bg-red-100 text-red-800`
    case 'Leased':
      return `${baseClasses} bg-blue-100 text-blue-800`
    default:
      return `${baseClasses} bg-gray-100 text-gray-800`
  }
}

const formatMarkdown = (text) => {
  if (!text) return ''
  // Simple markdown to HTML conversion (you might want to use a proper markdown library)
  return text
    .replace(/\n/g, '<br>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
}

const getEmbedUrl = (url) => {
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1]
    return `https://www.youtube.com/embed/${videoId}`
  }
  if (url.includes('vimeo.com')) {
    const videoId = url.match(/vimeo\.com\/(\d+)/)?.[1]
    return `https://player.vimeo.com/video/${videoId}`
  }
  return url
}

const handleInquirySubmitted = () => {
  showInquiryModal.value = false
  // Show success message or redirect
}

const handleTrialSubmitted = () => {
  showTrialModal.value = false
  // Show success message
}
</script>
```

## Task Completion Checklist

### Store and Data Management
- [ ] Create Pinia horses store with full CRUD operations
- [ ] Implement filtering and search functionality
- [ ] Add sorting capabilities
- [ ] Set up real-time data synchronization
- [ ] Handle loading and error states

### Component Development
- [ ] Build responsive HorseCard component
- [ ] Create comprehensive search/filter interface
- [ ] Develop detailed horse profile pages
- [ ] Build photo gallery with lightbox
- [ ] Create inquiry and booking forms

### Search and Filter System
- [ ] Implement multi-criteria filtering
- [ ] Add price range sliders
- [ ] Create discipline multi-select
- [ ] Build location-based filtering
- [ ] Add saved searches functionality

### Photo Gallery Management
- [ ] Create responsive image galleries
- [ ] Implement lazy loading for performance
- [ ] Add image zoom and lightbox features
- [ ] Support multiple image formats
- [ ] Enable drag-and-drop uploading in CMS

### Contact and Inquiry System
- [ ] Build horse-specific inquiry forms
- [ ] Create trial request functionality
- [ ] Implement email notifications
- [ ] Add inquiry tracking system
- [ ] Set up automated responses

### Legal and Regulatory Compliance
- [ ] Implement Ontario Sale of Goods Act compliance
- [ ] Add required disclaimers and terms
- [ ] Create liability waivers for trials
- [ ] Set up PIPEDA privacy compliance
- [ ] Add proper contract templates

## Ontario Legal Compliance

### Legal Requirements Integration
```vue
<!-- src/components/equestrian/HorseInquiryModal.vue -->
<template>
  <BaseModal 
    :show="true" 
    @close="$emit('close')"
    max-width="2xl"
  >
    <template #header>
      <h3 class="text-lg font-semibold text-charcoal">
        Inquiry About {{ horse.title }}
      </h3>
    </template>
    
    <form @submit.prevent="submitInquiry" class="space-y-6">
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
      
      <!-- Inquiry Details -->
      <div>
        <label class="block text-sm font-medium text-rich-brown mb-2">
          Inquiry Type <span class="text-red-500">*</span>
        </label>
        <div class="space-y-2">
          <label v-if="horse.type === 'Sale' || horse.type === 'Both'" class="flex items-center">
            <input
              v-model="form.inquiryType"
              value="purchase"
              type="radio"
              name="inquiryType"
              class="mr-2 text-warm-gold focus:ring-warm-gold"
            />
            <span>Interested in purchasing</span>
          </label>
          <label v-if="horse.type === 'Lease' || horse.type === 'Both'" class="flex items-center">
            <input
              v-model="form.inquiryType"
              value="lease"
              type="radio"
              name="inquiryType"
              class="mr-2 text-warm-gold focus:ring-warm-gold"
            />
            <span>Interested in leasing</span>
          </label>
          <label v-if="horse.pricing?.trial_available" class="flex items-center">
            <input
              v-model="form.inquiryType"
              value="trial"
              type="radio"
              name="inquiryType"
              class="mr-2 text-warm-gold focus:ring-warm-gold"
            />
            <span>Request trial period</span>
          </label>
          <label class="flex items-center">
            <input
              v-model="form.inquiryType"
              value="information"
              type="radio"
              name="inquiryType"
              class="mr-2 text-warm-gold focus:ring-warm-gold"
            />
            <span>General information</span>
          </label>
        </div>
        <p v-if="errors.inquiryType" class="mt-2 text-sm text-red-600">
          {{ errors.inquiryType }}
        </p>
      </div>
      
      <!-- Experience Level -->
      <BaseInput
        v-model="form.experience"
        label="Your riding experience level"
        placeholder="e.g., Beginner, Intermediate, Advanced"
        :error="errors.experience"
      />
      
      <!-- Message -->
      <BaseInput
        v-model="form.message"
        label="Message"
        :multiline="true"
        :rows="4"
        placeholder="Please let us know about your riding goals, timeline, and any specific questions about this horse."
        :error="errors.message"
      />
      
      <!-- Legal Agreements -->
      <div class="bg-cream/50 p-4 rounded-lg">
        <h4 class="font-semibold text-charcoal mb-3">Important Information</h4>
        
        <div class="space-y-3 text-sm text-warm-gray">
          <div class="flex items-start">
            <input
              v-model="form.acknowledgeRisk"
              type="checkbox"
              required
              class="mt-1 mr-3 text-warm-gold focus:ring-warm-gold"
            />
            <label class="flex-1">
              I acknowledge that horse activities involve inherent risks and that I participate at my own risk. 
              I understand that this inquiry does not constitute a purchase agreement.
            </label>
          </div>
          
          <div class="flex items-start">
            <input
              v-model="form.agreeToTerms"
              type="checkbox"
              required
              class="mt-1 mr-3 text-warm-gold focus:ring-warm-gold"
            />
            <label class="flex-1">
              I agree to the <router-link to="/terms" class="text-deep-forest hover:text-warm-gold underline" target="_blank">
                Terms of Service
              </router-link> and understand that all sales are subject to veterinary examination and are governed by Ontario law.
            </label>
          </div>
          
          <div class="flex items-start">
            <input
              v-model="form.privacyConsent"
              type="checkbox"
              required
              class="mt-1 mr-3 text-warm-gold focus:ring-warm-gold"
            />
            <label class="flex-1">
              I consent to the collection and use of my personal information in accordance with the 
              <router-link to="/privacy" class="text-deep-forest hover:text-warm-gold underline" target="_blank">
                Privacy Policy
              </router-link> and understand my rights under PIPEDA.
            </label>
          </div>
          
          <div class="flex items-start">
            <input
              v-model="form.marketingConsent"
              type="checkbox"
              class="mt-1 mr-3 text-warm-gold focus:ring-warm-gold"
            />
            <label class="flex-1">
              I would like to receive updates about other horses and services from Blackberry Equestrian (optional).
            </label>
          </div>
        </div>
      </div>
      
      <!-- Submission -->
      <div class="flex justify-end space-x-3 pt-4">
        <BaseButton 
          type="button" 
          variant="ghost" 
          @click="$emit('close')"
        >
          Cancel
        </BaseButton>
        
        <BaseButton 
          type="submit" 
          variant="primary"
          :loading="submitting"
        >
          Send Inquiry
        </BaseButton>
      </div>
    </form>
  </BaseModal>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useHorsesStore } from '@/stores/horses'
import BaseModal from '@/components/ui/BaseModal.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const props = defineProps({
  horse: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'submitted'])

const horsesStore = useHorsesStore()
const submitting = ref(false)

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  inquiryType: '',
  experience: '',
  message: '',
  acknowledgeRisk: false,
  agreeToTerms: false,
  privacyConsent: false,
  marketingConsent: false
})

const errors = ref({})

const validateForm = () => {
  const newErrors = {}
  
  if (!form.firstName.trim()) newErrors.firstName = 'First name is required'
  if (!form.lastName.trim()) newErrors.lastName = 'Last name is required'
  if (!form.email.trim()) newErrors.email = 'Email is required'
  if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email is invalid'
  if (!form.inquiryType) newErrors.inquiryType = 'Please select an inquiry type'
  if (!form.acknowledgeRisk) newErrors.acknowledgeRisk = 'Risk acknowledgment required'
  if (!form.agreeToTerms) newErrors.agreeToTerms = 'Terms agreement required'
  if (!form.privacyConsent) newErrors.privacyConsent = 'Privacy consent required'
  
  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

const submitInquiry = async () => {
  if (!validateForm()) return
  
  submitting.value = true
  
  try {
    await horsesStore.submitInquiry(props.horse.id, {
      ...form,
      horseTitle: props.horse.title,
      timestamp: new Date().toISOString()
    })
    
    emit('submitted')
  } catch (error) {
    // Handle error - show notification
    console.error('Failed to submit inquiry:', error)
  } finally {
    submitting.value = false
  }
}
</script>
```

### Photo Gallery Component
```vue
<!-- src/components/equestrian/HorseGallery.vue -->
<template>
  <div class="horse-gallery">
    <!-- Main Image Display -->
    <div class="mb-4">
      <div class="relative aspect-[4/3] bg-warm-gray/10 rounded-lg overflow-hidden">
        <img
          :src="selectedImage.image"
          :alt="selectedImage.caption || `${horse.title} photo`"
          class="w-full h-full object-cover cursor-zoom-in"
          @click="openLightbox(selectedImageIndex)"
        />
        
        <!-- Image Navigation Arrows -->
        <button
          v-if="allImages.length > 1"
          @click="previousImage"
          class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
        >
          <ChevronLeftIcon class="h-5 w-5" />
        </button>
        
        <button
          v-if="allImages.length > 1"
          @click="nextImage"
          class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
        >
          <ChevronRightIcon class="h-5 w-5" />
        </button>
        
        <!-- Image Counter -->
        <div class="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
          {{ selectedImageIndex + 1 }} / {{ allImages.length }}
        </div>
        
        <!-- Caption -->
        <div v-if="selectedImage.caption" class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <p class="text-white text-sm">{{ selectedImage.caption }}</p>
        </div>
      </div>
    </div>
    
    <!-- Thumbnail Strip -->
    <div class="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
      <button
        v-for="(image, index) in allImages"
        :key="index"
        @click="selectImage(index)"
        :class="[
          'flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all',
          selectedImageIndex === index 
            ? 'border-warm-gold shadow-md' 
            : 'border-warm-gray/20 hover:border-warm-gray/50'
        ]"
      >
        <img
          :src="image.image"
          :alt="image.caption || `${horse.title} thumbnail ${index + 1}`"
          class="w-full h-full object-cover"
        />
      </button>
    </div>
    
    <!-- Lightbox Modal -->
    <div
      v-if="lightboxOpen"
      class="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      @click="closeLightbox"
    >
      <div class="relative max-w-4xl max-h-full">
        <!-- Close Button -->
        <button
          @click="closeLightbox"
          class="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
        >
          <XMarkIcon class="h-6 w-6" />
        </button>
        
        <!-- Navigation in Lightbox -->
        <button
          v-if="allImages.length > 1"
          @click.stop="previousImage"
          class="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
        >
          <ChevronLeftIcon class="h-6 w-6" />
        </button>
        
        <button
          v-if="allImages.length > 1"
          @click.stop="nextImage"
          class="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
        >
          <ChevronRightIcon class="h-6 w-6" />
        </button>
        
        <!-- Lightbox Image -->
        <img
          :src="selectedImage.image"
          :alt="selectedImage.caption || `${horse.title} photo`"
          class="max-w-full max-h-full object-contain rounded-lg"
          @click.stop
        />
        
        <!-- Lightbox Caption and Info -->
        <div v-if="selectedImage.caption || selectedImage.type" class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
          <div class="text-white text-center">
            <p v-if="selectedImage.caption" class="text-lg mb-1">{{ selectedImage.caption }}</p>
            <p v-if="selectedImage.type" class="text-sm opacity-90">{{ selectedImage.type }}</p>
          </div>
        </div>
        
        <!-- Image Counter in Lightbox -->
        <div class="absolute top-4 left-4 bg-black/50 text-white px-3 py-2 rounded-full text-sm">
          {{ selectedImageIndex + 1 }} / {{ allImages.length }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  horse: {
    type: Object,
    required: true
  }
})

const selectedImageIndex = ref(0)
const lightboxOpen = ref(false)

// Combine main photo and gallery images
const allImages = computed(() => {
  const images = []
  
  // Add main photo first
  if (props.horse.main_photo) {
    images.push({
      image: props.horse.main_photo,
      caption: `${props.horse.title} - Main Photo`,
      type: 'Main Photo'
    })
  }
  
  // Add gallery images
  if (props.horse.gallery && Array.isArray(props.horse.gallery)) {
    images.push(...props.horse.gallery.map(item => ({
      image: item.photo?.image || item.image,
      caption: item.photo?.caption || item.caption,
      type: item.photo?.type || item.type
    })))
  }
  
  return images.filter(img => img.image) // Remove any images without src
})

const selectedImage = computed(() => {
  return allImages.value[selectedImageIndex.value] || { image: '', caption: '' }
})

const selectImage = (index) => {
  if (index >= 0 && index < allImages.value.length) {
    selectedImageIndex.value = index
  }
}

const previousImage = () => {
  const newIndex = selectedImageIndex.value > 0 
    ? selectedImageIndex.value - 1 
    : allImages.value.length - 1
  selectImage(newIndex)
}

const nextImage = () => {
  const newIndex = selectedImageIndex.value < allImages.value.length - 1 
    ? selectedImageIndex.value + 1 
    : 0
  selectImage(newIndex)
}

const openLightbox = (index) => {
  selectedImageIndex.value = index
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  lightboxOpen.value = false
  document.body.style.overflow = 'auto'
}

// Keyboard navigation
const handleKeydown = (event) => {
  if (!lightboxOpen.value) return
  
  switch (event.key) {
    case 'Escape':
      closeLightbox()
      break
    case 'ArrowLeft':
      previousImage()
      break
    case 'ArrowRight':
      nextImage()
      break
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = 'auto'
})
</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
```

### Status Management Composable
```javascript
// src/composables/useHorseStatus.js
import { ref, computed } from 'vue'

export function useHorseStatus() {
  const statusDefinitions = {
    'Available': {
      label: 'Available',
      color: 'success',
      description: 'Horse is currently available for sale or lease',
      allowInquiries: true,
      showPricing: true
    },
    'Pending': {
      label: 'Pending',
      color: 'warning',
      description: 'Sale or lease is pending completion',
      allowInquiries: false,
      showPricing: true
    },
    'Sold': {
      label: 'Sold',
      color: 'error',
      description: 'Horse has been sold',
      allowInquiries: false,
      showPricing: false
    },
    'Leased': {
      label: 'Leased',
      color: 'info',
      description: 'Horse is currently leased',
      allowInquiries: false,
      showPricing: false
    }
  }

  const getStatusInfo = (status) => {
    return statusDefinitions[status] || statusDefinitions['Available']
  }

  const canShowPrice = (horse) => {
    const statusInfo = getStatusInfo(horse.status)
    return statusInfo.showPricing && (horse.pricing?.sale_price || horse.pricing?.lease_price)
  }

  const canAcceptInquiries = (horse) => {
    const statusInfo = getStatusInfo(horse.status)
    return statusInfo.allowInquiries
  }

  const getStatusClass = (status) => {
    const statusInfo = getStatusInfo(status)
    const baseClasses = 'px-3 py-1 rounded-full text-sm font-medium'
    
    switch (statusInfo.color) {
      case 'success':
        return `${baseClasses} bg-green-100 text-green-800`
      case 'warning':
        return `${baseClasses} bg-yellow-100 text-yellow-800`
      case 'error':
        return `${baseClasses} bg-red-100 text-red-800`
      case 'info':
        return `${baseClasses} bg-blue-100 text-blue-800`
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`
    }
  }

  return {
    statusDefinitions,
    getStatusInfo,
    canShowPrice,
    canAcceptInquiries,
    getStatusClass
  }
}
```

## Success Criteria Validation

### Functionality Testing
- All horse listings display correctly with proper information
- Search and filter system works on all device sizes
- Photo galleries load efficiently with proper optimization
- Contact forms submit successfully and send notifications
- Status management updates properly across the system

### User Experience Validation
- Mobile interface provides excellent touch experience
- Loading states provide clear feedback to users
- Error handling guides users to resolution
- Accessibility standards met for all interactions
- Performance optimized for rural internet connections

### Business Requirements Met
- Professional presentation builds trust and credibility
- Clear pricing and contact information facilitates inquiries
- Legal compliance protects both buyer and seller
- Easy content management enables staff to maintain listings
- SEO optimization improves search visibility

## Next Phase Handoff

### For Business Pages Agent
- Horse listing components ready for integration
- Contact form patterns established
- Professional design standards set
- Trust-building elements defined

### For Local SEO Agent
- Horse listing schema markup requirements identified
- Local keyword integration points mapped
- Content optimization opportunities outlined
- Analytics tracking events defined

### For Performance Agent
- Image optimization requirements documented
- Loading performance targets established
- Mobile experience standards set
- Caching strategies identified

This Horse Listings Agent provides a comprehensive, legally compliant, and user-friendly system for managing horse sales and leases while meeting the specific needs of the Ontario equestrian market.# 🐎 Horse Listings Agent

## Agent Profile
**Name**: Horse Sales & Lease Functionality Specialist  
**Role**: Dynamic horse profile system and marketplace features  
**Expertise**: Equestrian sales processes, Search/filter systems, Photo galleries, Ontario regulations  

## Horse Marketplace Overview

### Core Functionality
1. **Dynamic Horse Profiles**: Comprehensive individual horse pages
2. **Advanced Search/Filter**: Multiple criteria filtering system
3. **Photo Management**: Professional gallery systems
4. **Inquiry System**: Integrated contact and booking forms
5. **Status Management**: Real-time availability tracking

## Vue.js Components Architecture

### Horse Data Management

#### Pinia Store for Horse Listings
```javascript
// src/stores/horses.js
import { defineStore } from 'pinia'
import { ref, computed, reactive } from 'vue'

export const useHorsesStore = defineStore('horses', () => {
  // State
  const horses = ref([])
  const loading = ref(false)
  const error = ref(null)
  const selectedHorse = ref(null)

  // Filters - reactive object for two-way binding
  const filters = reactive({
    status: 'Available',
    type: '', // Sale, Lease, Both
    breed: '',
    ageRange: [0, 30],
    priceRange: [0, 200000],
    disciplines: [],
    trainingLevel: '',
    riderSuitability: '',
    searchQuery: '',
    location: '',
    sortBy: 'date', // date, price, age, name
    sortOrder: 'desc'
  })

  // Computed - filtered and sorted horses
  const filteredHorses = computed(() => {
    let filtered = horses.value.filter(horse => {
      // Status filter
      if (filters.status && horse.status !== filters.status) return false
      
      // Type filter (Sale/Lease/Both)
      if (filters.type) {
        if (horse.type === 'Both') return true
        if (horse.type !== filters.type) return false
      }
      
      // Breed filter
      if (filters.breed && horse.basic_info?.breed !== filters.breed) return false
      
      // Age range filter
      const age = horse.basic_info?.age || 0
      if (age < filters.ageRange[0] || age > filters.ageRange[1]) return false
      
      // Price range filter
      const price = getPriceForFilter(horse)
      if (price > 0 && (price < filters.priceRange[0] || price > filters.priceRange[1])) return false
      
      // Disciplines filter
      if (filters.disciplines.length > 0) {
        const horseDisciplines = horse.training?.disciplines || []
        if (!filters.disciplines.some(d => horseDisciplines.includes(d))) return false
      }
      
      // Training level filter
      if (filters.trainingLevel && horse.training?.level !== filters.trainingLevel) return false
      
      // Rider suitability filter
      if (filters.riderSuitability && horse.training?.rider_suitability !== filters.riderSuitability) return false
      
      // Search query filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase()
        const searchFields = [
          horse.title,
          horse.basic_info?.registered_name,
          horse.basic_info?.barn_name,
          horse.basic_info?.breed,
          horse.basic_info?.color,
          horse.body
        ].filter(Boolean).join(' ').toLowerCase()
        
        if (!searchFields.includes(query)) return false
      }
      
      return true
    })

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue, bValue
      
      switch (filters.sortBy) {
        case 'price':
          aValue = getPriceForFilter(a)
          bValue = getPriceForFilter(b)
          break
        case 'age':
          aValue = a.basic_info?.age || 0
          bValue = b.basic_info?.age || 0
          break
        case 'name':
          aValue = a.title.toLowerCase()
          bValue = b.title.toLowerCase()
          break
        default: // date
          aValue = new Date(a.date || 0).getTime()
          bValue = new Date(b.date || 0).getTime()
      }
      
      if (filters.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    return filtered
  })

  // Featured horses
  const featuredHorses = computed(() => {
    return horses.value.filter(horse => horse.featured && horse.status === 'Available').slice(0, 6)
  })

  // Available breeds for filter dropdown
  const availableBreeds = computed(() => {
    const breeds = new Set(horses.value.map(h => h.basic_info?.breed).filter(Boolean))
    return Array.from(breeds).sort()
  })

  // Available disciplines for filter
  const availableDisciplines = computed(() => {
    const disciplines = new Set()
    horses.value.forEach(horse => {
      if (horse.training?.disciplines) {
        horse.training.disciplines.forEach(d => disciplines.add(d))
      }
    })
    return Array.from(disciplines).sort()
  })

  // Helper functions
  const getPriceForFilter = (horse) => {
    // Use sale price if available, otherwise lease price * 12 for comparison
    return horse.pricing?.sale_price || (horse.pricing?.lease_price * 12) || 0
  }

  const formatPrice = (price, type = 'sale') => {
    if (!price) return 'Contact for Price'
    
    const formatter = new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      maximumFractionDigits: 0
    })
    
    const formatted = formatter.format(price)
    return type === 'lease' ? `${formatted}/month` : formatted
  }

  // Actions
  const fetchHorses = async () => {
    loading.value = true
    error.value = null
    
    try {
      // In production, this would fetch from your API/CMS
      const response = await fetch('/api/horses')
      if (!response.ok) throw new Error('Failed to fetch horses')
      
      const data = await response.json()
      horses.value = data
    } catch (err) {
      error.value = err.message
      console.error('Error fetching horses:', err)
    } finally {
      loading.value = false
    }
  }

  const getHorseById = async (id) => {
    if (!horses.value.length) await fetchHorses()
    
    const horse = horses.value.find(h => h.id === id || h.slug === id)
    if (horse) {
      selectedHorse.value = horse
    }
    return horse
  }

  const resetFilters = () => {
    Object.assign(filters, {
      status: 'Available',
      type: '',
      breed: '',
      ageRange: [0, 30],
      priceRange: [0, 200000],
      disciplines: [],
      trainingLevel: '',
      riderSuitability: '',
      searchQuery: '',
      location: '',
      sortBy: 'date',
      sortOrder: 'desc'
    })
  }

  const submitInquiry = async (horseId, inquiryData) => {
    try {
      const response = await fetch('/api/horse-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          horseId,
          ...inquiryData,
          timestamp: new Date().toISOString()
        })
      })
      
      if (!response.ok) throw new Error('Failed to submit inquiry')
      return await response.json()
    } catch (err) {
      throw new Error(err.message)
    }
  }

  return {
    // State
    horses,
    loading,
    error,
    selectedHorse,
    filters,
    
    // Computed
    filteredHorses,
    featuredHorses,
    availableBreeds,
    availableDisciplines,
    
    // Methods
    fetchHorses,
    getHorseById,
    resetFilters,
    submitInquiry,
    formatPrice,
    getPriceForFilter
  }
})
```

### Horse Card Component
```vue
<!-- src/components/equestrian/HorseCard.vue -->
<template>
  <BaseCard 
    :interactive="true"
    :badge="horse.status"
    :badge-color="statusColor"
    class="horse-card h-full"
  >
    <template #image>
      <div class="relative aspect-[4/3] overflow-hidden">
        <img 
          :src="horse.main_photo" 
          :alt="`${horse.title} - ${horse.basic_info?.breed} ${horse.basic_info?.gender}`"
          class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
        
        <!-- Status and Type Badges -->
        <div class="absolute top-3 left-3">
          <span :class="statusClasses" class="inline-block px-2 py-1 text-xs font-semibold rounded-full">
            {{ horse.status }}
          </span>
        </div>
        
        <div class="absolute top-3 right-3">
          <span class="inline-block px-2 py-1 text-xs font-semibold bg-warm-gold text-rich-brown rounded-full">
            {{ horse.type }}
          </span>
        </div>
        
        <!-- Quick Info Overlay -->
        <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div class="text-white">
            <p class="text-sm font-medium">{{ horse.basic_info?.breed }} • {{ horse.basic_info?.gender }}</p>
            <p class="text-xs opacity-90">{{ horse.basic_info?.age }} years • {{ horse.basic_info?.height }}</p>
          </div>
        </div>
      </div>
    </template>

    <!-- Card Content -->
    <div class="flex flex-col h-full">
      <div class="flex-grow">
        <h3 class="heading-card text-lg font-bold text-charcoal mb-2 line-clamp-2">
          {{ horse.title }}
        </h3>
        
        <!-- Horse Details Grid -->
        <div class="grid grid-cols-2 gap-3 mb-4 text-sm">
          <div class="space-y-1">
            <div class="text-warm-gray">Training Level:</div>
            <div class="font-medium text-charcoal">{{ horse.training?.level || 'Not specified' }}</div>
          </div>
          <div class="space-y-1">
            <div class="text-warm-gray">Suitable For:</div>
            <div class="font-medium text-charcoal">{{ horse.training?.rider_suitability || 'Any level' }}</div>
          </div>
        </div>
        
        <!-- Disciplines -->
        <div class="mb-4">
          <div class="flex flex-wrap gap-1">
            <span 
              v-for="discipline in horse.training?.disciplines?.slice(0, 3)" 
              :key="discipline"
              class="inline-block px-2 py-1 text-xs bg-sage-green/20 text-deep-forest rounded"
            >
              {{ discipline }}
            </span>
            <span 
              v-if="horse.training?.disciplines?.length > 3"
              class="inline-block px-2 py-1 text-xs bg-warm-gray/20 text-charcoal rounded"
            >
              +{{ horse.training.disciplines.length - 3 }} more
            </span>
          </div>
        </div>
        
        <!-- Brief Description -->
        <p v-if="horse.excerpt" class="text-sm text-warm-gray line-clamp-2 mb-4">
          {{ horse.excerpt }}
        </p>
      </div>
      
      <!-- Price and Action -->
      <div class="flex justify-between items-center pt-4 border-t border-warm-gray/20">
        <div class="text-left">
          <div v-if="horse.pricing?.sale_price" class="text-lg font-bold text-deep-forest">
            {{ horsesStore.formatPrice(horse.pricing.sale_price, 'sale') }}
          </div>
          <div v-if="horse.pricing?.lease_price" class="text-sm text-warm-gray">
            {{ horsesStore.formatPrice(horse.pricing.lease_price, 'lease') }}
          </div>
          <div v-if="!horse.pricing?.sale_price && !horse.pricing?.lease_price" class="text-sm text-warm-gray">
            Contact for Price
          </div>
        </div>
        
        <router-link 