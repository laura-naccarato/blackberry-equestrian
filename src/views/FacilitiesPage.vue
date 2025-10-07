<template>
  <div class="facilities-page">
    <!-- Page Header -->
    <section class="bg-gradient-to-br from-navy to-navy-dark text-white py-16 md:py-20">
      <div class="container-wide">
        <h1 class="font-serif text-5xl md:text-6xl font-bold mb-4">Our Facilities</h1>
        <p class="text-xl md:text-2xl opacity-95 max-w-3xl">
          State-of-the-art equestrian facilities designed for optimal horse care, training, and rider comfort
        </p>
      </div>
    </section>

    <!-- Facility Stats -->
    <section class="py-8 bg-burgundy text-white">
      <div class="container-wide">
        <div class="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
          <div>
            <div class="text-3xl font-bold text-tan">45</div>
            <div class="text-sm opacity-90">Acres</div>
          </div>
          <div>
            <div class="text-3xl font-bold text-tan">24</div>
            <div class="text-sm opacity-90">Stalls</div>
          </div>
          <div>
            <div class="text-3xl font-bold text-tan">2</div>
            <div class="text-sm opacity-90">Arenas</div>
          </div>
          <div>
            <div class="text-3xl font-bold text-tan">12</div>
            <div class="text-sm opacity-90">Paddocks</div>
          </div>
          <div>
            <div class="text-3xl font-bold text-tan">2000</div>
            <div class="text-sm opacity-90">Established</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Facilities -->
    <section class="py-16 md:py-20 bg-white">
      <div class="container-wide space-y-20">
        <!-- Indoor Arena -->
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div class="order-2 md:order-1">
            <h2 class="heading-section mb-6">Indoor Arena</h2>
            <p class="text-lg text-charcoal mb-6">
              Our expansive 200' x 80' heated indoor arena provides year-round training opportunities regardless of weather conditions.
            </p>
            <ul class="space-y-3 mb-8">
              <li class="flex items-start">
                <CheckIcon class="w-6 h-6 text-success mr-3 flex-shrink-0 mt-0.5" />
                <span class="text-charcoal">Premium sand and fiber footing for optimal cushioning</span>
              </li>
              <li class="flex items-start">
                <CheckIcon class="w-6 h-6 text-success mr-3 flex-shrink-0 mt-0.5" />
                <span class="text-charcoal">Full jumping course with adjustable standards</span>
              </li>
              <li class="flex items-start">
                <CheckIcon class="w-6 h-6 text-success mr-3 flex-shrink-0 mt-0.5" />
                <span class="text-charcoal">Heated viewing lounge with panoramic windows</span>
              </li>
              <li class="flex items-start">
                <CheckIcon class="w-6 h-6 text-success mr-3 flex-shrink-0 mt-0.5" />
                <span class="text-charcoal">Professional lighting for evening riding</span>
              </li>
              <li class="flex items-start">
                <CheckIcon class="w-6 h-6 text-success mr-3 flex-shrink-0 mt-0.5" />
                <span class="text-charcoal">Sound system for lessons and clinics</span>
              </li>
            </ul>
            <div class="bg-cream rounded-lg p-4">
              <p class="text-sm text-gray italic">
                "The indoor arena footing is the best I've ridden on - consistent, supportive, and well-maintained." - Sarah M., Boarder
              </p>
            </div>
          </div>
          <div class="order-1 md:order-2">
            <div class="relative">
              <div 
                class="bg-gradient-to-br from-tan/20 to-tan/10 rounded-xl shadow-strong w-full aspect-video flex items-center justify-center cursor-pointer"
                @click="openGallery('indoor')"
              >
                <HomeModernIcon class="w-32 h-32 text-tan/50" />
              </div>
              <button 
                @click="openGallery('indoor')"
                class="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-white transition-colors"
              >
                <PhotoIcon class="w-5 h-5 text-navy" />
                <span class="text-navy font-medium">View Gallery</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Outdoor Rings -->
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div class="order-1">
            <div class="relative">
              <img 
                :src="outdoorRingImage" 
                alt="Main outdoor riding ring"
                class="w-full h-64 object-cover"
                @error="handleImageError"
              >
              <button 
                @click="openGallery('outdoor')"
                class="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-white transition-colors"
              >
                <PhotoIcon class="w-5 h-5 text-navy" />
                <span class="text-navy font-medium">View Gallery</span>
              </button>
            </div>
          </div>
          <div class="order-2">
            <h2 class="heading-section mb-6">Outdoor Rings</h2>
            <p class="text-lg text-charcoal mb-6">
              Two professionally maintained outdoor rings provide variety in training environments and ample space for multiple riders.
            </p>
            <div class="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 class="font-semibold text-navy mb-3">Main Ring (250' x 150')</h3>
                <ul class="space-y-2 text-sm">
                  <li class="flex items-start">
                    <CheckIcon class="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                    <span class="text-charcoal">Competition-grade sand footing</span>
                  </li>
                  <li class="flex items-start">
                    <CheckIcon class="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                    <span class="text-charcoal">Full jump course</span>
                  </li>
                  <li class="flex items-start">
                    <CheckIcon class="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                    <span class="text-charcoal">Derby field option</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 class="font-semibold text-navy mb-3">Warm-up Ring (150' x 100')</h3>
                <ul class="space-y-2 text-sm">
                  <li class="flex items-start">
                    <CheckIcon class="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                    <span class="text-charcoal">Flat work area</span>
                  </li>
                  <li class="flex items-start">
                    <CheckIcon class="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                    <span class="text-charcoal">Cavaletti exercises</span>
                  </li>
                  <li class="flex items-start">
                    <CheckIcon class="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                    <span class="text-charcoal">Lunging permitted</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="bg-tan-light/10 rounded-lg p-4 border border-tan-light/30">
              <p class="text-sm text-navy">
                <strong>Note:</strong> Outdoor rings are groomed daily and watered as needed for optimal footing conditions.
              </p>
            </div>
          </div>
        </div>

        <!-- Barn & Stalls -->
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div class="order-2 md:order-1">
            <h2 class="heading-section mb-6">Barn & Stalls</h2>
            <p class="text-lg text-charcoal mb-6">
              Our main barn features spacious, well-ventilated stalls designed for your horse's comfort and safety.
            </p>
            <div class="grid grid-cols-2 gap-4 mb-6">
              <div class="bg-cream rounded-lg p-4">
                <h4 class="font-semibold text-navy mb-2">Box Stalls</h4>
                <ul class="space-y-1 text-sm text-charcoal">
                  <li>• 12' x 12' dimensions</li>
                  <li>• Rubber mats</li>
                  <li>• Automatic waterers</li>
                  <li>• Daily cleaning</li>
                </ul>
              </div>
              <div class="bg-cream rounded-lg p-4">
                <h4 class="font-semibold text-navy mb-2">Barn Features</h4>
                <ul class="space-y-1 text-sm text-charcoal">
                  <li>• Wide center aisle</li>
                  <li>• Cross-tie areas</li>
                  <li>• Wash stalls (hot/cold)</li>
                  <li>• Feed room</li>
                </ul>
              </div>
            </div>
            <BaseButton 
              variant="secondary"
              @click="openGallery('barn')"
            >
              <PhotoIcon class="w-5 h-5 mr-2" />
              View Barn Photos
            </BaseButton>
          </div>
          <div class="order-1 md:order-2">
            <div class="grid grid-cols-2 gap-4">
              <img 
                :src="stallImage" 
                alt="Spacious box stall"
                class="w-full h-48 object-cover"
                @error="handleImageError"
              >
              <img 
                :src="barnAisleImage" 
                alt="Wide barn aisle"
                class="w-full h-48 object-cover"
                @error="handleImageError"
              >
              <img 
                :src="tackRoomImage" 
                alt="Heated tack room"
                class="w-full h-48 object-cover"
                @error="handleImageError"
              >
            </div>
          </div>
        </div>

        <!-- Paddocks & Pastures -->
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div class="order-1">
            <div class="relative">
              <img 
                :src="paddocksImage" 
                alt="Paddocks and turnout areas"
                class="w-full h-64 object-cover"
                @error="handleImageError"
              >
              <div class="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 max-w-xs">
                <h4 class="font-semibold text-navy mb-1">Daily Turnout</h4>
                <p class="text-sm text-charcoal">All horses receive individual or group turnout based on their needs</p>
              </div>
            </div>
          </div>
          <div class="order-2">
            <h2 class="heading-section mb-6">Paddocks & Pastures</h2>
            <p class="text-lg text-charcoal mb-6">
              Multiple turnout options ensure every horse gets appropriate outdoor time and socialization.
            </p>
            <div class="space-y-4">
              <div class="flex items-start">
                <div class="bg-tan/20 rounded-lg p-2 mr-4">
                  <SunIcon class="w-6 h-6 text-tan" />
                </div>
                <div>
                  <h4 class="font-semibold text-navy mb-1">Individual Paddocks</h4>
                  <p class="text-sm text-charcoal">6 private paddocks for horses requiring solo turnout</p>
                </div>
              </div>
              <div class="flex items-start">
                <div class="bg-tan/20 rounded-lg p-2 mr-4">
                  <UsersIcon class="w-6 h-6 text-tan" />
                </div>
                <div>
                  <h4 class="font-semibold text-navy mb-1">Group Pastures</h4>
                  <p class="text-sm text-charcoal">4 large pastures for compatible group turnout</p>
                </div>
              </div>
              <div class="flex items-start">
                <div class="bg-tan/20 rounded-lg p-2 mr-4">
                  <ShieldCheckIcon class="w-6 h-6 text-tan" />
                </div>
                <div>
                  <h4 class="font-semibold text-navy mb-1">Safe Fencing</h4>
                  <p class="text-sm text-charcoal">Diamond mesh and board fencing for maximum safety</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Additional Amenities -->
    <section class="py-16 md:py-20 bg-cream">
      <div class="container-wide">
        <h2 class="heading-section text-center mb-12">Additional Amenities</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <BaseCard variant="elevated" class="text-center">
            <div class="p-6">
              <BuildingStorefrontIcon class="w-12 h-12 text-tan mx-auto mb-4" />
              <h3 class="text-lg font-semibold text-navy mb-2">Heated Tack Room</h3>
              <p class="text-sm text-charcoal">Individual lockers with ample storage space</p>
            </div>
          </BaseCard>
          
          <BaseCard variant="elevated" class="text-center">
            <div class="p-6">
              <HomeModernIcon class="w-12 h-12 text-tan mx-auto mb-4" />
              <h3 class="text-lg font-semibold text-navy mb-2">Rider's Lounge</h3>
              <p class="text-sm text-charcoal">Comfortable viewing area with kitchenette</p>
            </div>
          </BaseCard>
          
          <BaseCard variant="elevated" class="text-center">
            <div class="p-6">
              <TruckIcon class="w-12 h-12 text-tan mx-auto mb-4" />
              <h3 class="text-lg font-semibold text-navy mb-2">Trailer Parking</h3>
              <p class="text-sm text-charcoal">Secure parking for horse trailers</p>
            </div>
          </BaseCard>
          
          <BaseCard variant="elevated" class="text-center">
            <div class="p-6">
              <MapIcon class="w-12 h-12 text-tan mx-auto mb-4" />
              <h3 class="text-lg font-semibold text-navy mb-2">Trail Access</h3>
              <p class="text-sm text-charcoal">Direct access to scenic riding trails</p>
            </div>
          </BaseCard>
        </div>
      </div>
    </section>

    <!-- Virtual Tour CTA -->
    <section class="py-16 bg-gradient-to-br from-navy to-navy-dark text-white">
      <div class="container-narrow text-center">
        <h2 class="font-serif text-3xl md:text-4xl font-bold mb-6">
          Experience Our Facilities in Person
        </h2>
        <p class="text-xl mb-8 opacity-95 max-w-2xl mx-auto">
          Schedule a tour to see our facilities and meet our team. We'd love to show you around!
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <BaseButton
            :tag="'router-link'"
            to="/contact?service=facility-tour"
            variant="primary"
            size="xl"
            class="min-w-[200px]"
          >
            <CalendarIcon class="w-5 h-5 mr-2" />
            Schedule Tour
          </BaseButton>
          <BaseButton
            @click="showVirtualTour = true"
            variant="outline"
            size="xl"
            class="!border-white !text-white hover:!bg-white hover:!text-navy min-w-[200px]"
          >
            <VideoCameraIcon class="w-5 h-5 mr-2" />
            Virtual Tour
          </BaseButton>
        </div>
      </div>
    </section>

    <!-- Photo Gallery Modal -->
    <BaseModal v-model:show="showGallery" :title="currentGalleryTitle">
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <img
          v-for="(image, index) in currentGalleryImages"
          :key="index"
          :src="image.url"
          :alt="image.caption"
          class="rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
          @click="viewFullImage(image)"
          @error="handleImgError($event, PLACEHOLDER_IMAGE)"
        >
      </div>
    </BaseModal>

    <!-- Virtual Tour Modal -->
    <BaseModal v-model:show="showVirtualTour" title="Virtual Facility Tour">
      <div class="aspect-video bg-black rounded-lg flex items-center justify-center">
        <p class="text-white">Virtual tour video would be embedded here</p>
      </div>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import { PLACEHOLDER_IMAGE, handleImageError as handleImgError, getGalleryImages } from '@/utils/images'
import {
  CheckIcon,
  PhotoIcon,
  SunIcon,
  UsersIcon,
  ShieldCheckIcon,
  BuildingStorefrontIcon,
  HomeModernIcon,
  TruckIcon,
  MapIcon,
  CalendarIcon,
  VideoCameraIcon
} from '@heroicons/vue/24/outline'

const router = useRouter()
const showGallery = ref(false)
const showVirtualTour = ref(false)
const currentGalleryTitle = ref('')
const currentGalleryImages = ref([])

// Image refs - using placeholder for now to avoid build issues
const outdoorRingImage = ref(PLACEHOLDER_IMAGE)
const stallImage = ref(PLACEHOLDER_IMAGE)
const barnAisleImage = ref(PLACEHOLDER_IMAGE)
const washStallImage = ref(PLACEHOLDER_IMAGE)
const tackRoomImage = ref(PLACEHOLDER_IMAGE)
const paddocksImage = ref(PLACEHOLDER_IMAGE)

const handleImageError = (event) => {
  handleImgError(event)
}

// Gallery data
const galleries = {
  indoor: {
    title: 'Indoor Arena Gallery',
    images: getGalleryImages('indoor')
  },
  outdoor: {
    title: 'Outdoor Rings Gallery',
    images: getGalleryImages('outdoor')
  },
  barn: {
    title: 'Barn & Stables Gallery',
    images: getGalleryImages('barn')
  },
  paddocks: {
    title: 'Paddocks & Turnout Gallery',
    images: getGalleryImages('paddocks')
  }
}

const openGallery = (galleryType) => {
  currentGalleryTitle.value = galleries[galleryType].title
  currentGalleryImages.value = galleries[galleryType].images
  showGallery.value = true
}

const viewFullImage = (image) => {
  // In a real app, this would open a lightbox or full-screen viewer
  console.log('View full image:', image)
}
</script>

<style scoped>
.heading-section {
  @apply font-serif text-3xl md:text-4xl font-semibold text-burgundy;
}
</style>