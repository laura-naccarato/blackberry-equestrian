<template>
  <header class="bg-white shadow-soft sticky top-0 z-50">
    <div class="container-wide">
      <div class="flex items-center justify-between h-16 lg:h-20">
        <!-- Logo and Brand -->
        <div class="flex-shrink-0">
          <RouterLink to="/" class="flex items-center group">
            <!-- Logo placeholder - can be replaced with actual logo image -->
            <div class="w-10 h-10 lg:w-12 lg:h-12 bg-tan rounded-full flex items-center justify-center mr-3 group-hover:bg-burgundy transition-colors">
              <span class="text-burgundy font-bold text-lg lg:text-xl group-hover:text-tan transition-colors">BE</span>
            </div>
            <div>
              <h1 class="font-serif text-xl lg:text-2xl font-bold text-navy">
                Blackberry Equestrian
              </h1>
              <p class="text-xs text-gray hidden sm:block">Hunter/Jumper Excellence</p>
            </div>
          </RouterLink>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden lg:flex items-center space-x-1" aria-label="Main navigation">
          <RouterLink
            v-for="item in navigation"
            :key="item.path"
            :to="item.path"
            class="nav-link"
            :aria-current="$route.path === item.path ? 'page' : undefined"
          >
            {{ item.name }}
          </RouterLink>
        </nav>

        <!-- Contact Info (Desktop) -->
        <div class="hidden lg:flex items-center space-x-4">
          <a
            href="tel:905-555-0123"
            class="flex items-center text-navy hover:text-tan transition-colors group"
            aria-label="Call us"
          >
            <PhoneIcon class="h-5 w-5 mr-2" />
            <span class="text-sm font-medium">905-555-0123</span>
          </a>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMenu"
          class="lg:hidden p-2 rounded-lg text-charcoal hover:text-navy hover:bg-tan-light/20 transition-all min-h-[44px] min-w-[44px]"
          :aria-label="isMenuOpen ? 'Close menu' : 'Open menu'"
          :aria-expanded="isMenuOpen"
        >
          <Bars3Icon v-if="!isMenuOpen" class="h-6 w-6" />
          <XMarkIcon v-else class="h-6 w-6" />
        </button>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <Transition name="slide-down">
      <div
        v-if="isMenuOpen"
        class="lg:hidden bg-white border-t border-gray/20"
      >
        <nav class="px-4 py-4 space-y-1" aria-label="Mobile navigation">
          <RouterLink
            v-for="item in navigation"
            :key="item.path"
            :to="item.path"
            @click="closeMenu"
            class="mobile-nav-link"
            :aria-current="$route.path === item.path ? 'page' : undefined"
          >
            <component :is="item.icon" class="h-5 w-5 mr-3" />
            {{ item.name }}
          </RouterLink>

          <!-- Mobile Contact -->
          <div class="pt-4 mt-4 border-t border-gray/20">
            <a
              href="tel:905-555-0123"
              class="mobile-nav-link"
            >
              <PhoneIcon class="h-5 w-5 mr-3" />
              Call: 905-555-0123
            </a>
            <a
              href="mailto:info@blackberryequestrian.ca"
              class="mobile-nav-link"
            >
              <EnvelopeIcon class="h-5 w-5 mr-3" />
              Email Us
            </a>
          </div>

          <!-- Quick Actions -->
          <div class="pt-4 mt-4 border-t border-gray/20">
            <BaseButton
              variant="primary"
              size="md"
              full-width
              @click="$router.push('/contact'); closeMenu()"
            >
              Book a Tour
            </BaseButton>
          </div>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { useMainStore } from '@/stores/main'
import { storeToRefs } from 'pinia'
import BaseButton from '@/components/ui/BaseButton.vue'

// Import icons from Heroicons
import {
  Bars3Icon,
  XMarkIcon,
  PhoneIcon,
  EnvelopeIcon,
  HomeIcon,
  InformationCircleIcon,
  SparklesIcon,
  HeartIcon,
  BuildingOffice2Icon,
  UserGroupIcon,
  NewspaperIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/vue/24/outline'

const route = useRoute()
const mainStore = useMainStore()
const { isMenuOpen } = storeToRefs(mainStore)
const { toggleMenu, closeMenu } = mainStore

// Navigation items with icons for mobile
const navigation = [
  { name: 'Home', path: '/', icon: HomeIcon },
  { name: 'About', path: '/about', icon: InformationCircleIcon },
  { name: 'Services', path: '/services', icon: SparklesIcon },
  { name: 'Horses', path: '/horses', icon: HeartIcon },
  { name: 'Facilities', path: '/facilities', icon: BuildingOffice2Icon },
  { name: 'Contact', path: '/contact', icon: ChatBubbleLeftRightIcon }
]
</script>

<style scoped>
/* Desktop navigation link styles */
.nav-link {
  @apply px-4 py-2 text-sm font-medium text-charcoal rounded-lg transition-all duration-200;
  @apply hover:text-navy hover:bg-tan-light/20;
}

.nav-link.router-link-active {
  @apply text-tan bg-navy/10;
}

/* Mobile navigation link styles */
.mobile-nav-link {
  @apply flex items-center px-4 py-3 text-base font-medium text-charcoal rounded-lg transition-all duration-200;
  @apply hover:text-navy hover:bg-tan-light/20 min-h-[44px];
}

.mobile-nav-link.router-link-active {
  @apply text-tan bg-navy/10;
}

/* Slide down animation for mobile menu */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>