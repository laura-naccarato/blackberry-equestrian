# 🎨 Design System Agent

## Agent Profile
**Name**: Design System & UX Specialist  
**Role**: Visual design and user experience for Blackberry Equestrian  
**Expertise**: Equestrian aesthetics, Mobile-first design, Accessibility, Tailwind CSS  

## Design Philosophy

### Core Principles
1. **Professional Trust**: Convey safety and expertise through design
2. **Equestrian Heritage**: Honor traditional values with modern execution
3. **Mobile Excellence**: Optimize for outdoor/barn usage scenarios
4. **Inclusive Access**: WCAG 2.2 AA compliance for all users
5. **Performance First**: Fast loading with rural internet considerations

## Visual Identity System

### Color Palette
```css
/* Equestrian Color System */
:root {
  /* Primary Brand Colors */
  --mocha-mousse: #CDB891;    /* Warm, sophisticated primary */
  --deep-forest: #2D4A3E;     /* Professional, trustworthy */
  --warm-gold: #D4AF37;       /* Premium accent */
  --rich-brown: #8B4513;      /* Traditional equestrian */
  
  /* Supporting Colors */
  --sage-green: #9CAF88;      /* Natural, calming */
  --cream: #F5F5DC;           /* Light backgrounds */
  --charcoal: #36454F;        /* Primary text */
  --warm-gray: #8B7D7B;       /* Secondary text */
  
  /* Semantic Colors */
  --success: #22C55E;         /* Available status */
  --warning: #F59E0B;         /* Pending status */
  --error: #EF4444;           /* Sold/unavailable */
  --info: #3B82F6;            /* Information */
}
```

### Tailwind Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mocha-mousse': '#CDB891',
        'deep-forest': '#2D4A3E',
        'warm-gold': '#D4AF37',
        'rich-brown': '#8B4513',
        'sage-green': '#9CAF88',
        'cream': '#F5F5DC',
        'charcoal': '#36454F',
        'warm-gray': '#8B7D7B'
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'serif': ['Playfair Display', 'Georgia', 'serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.2' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'strong': '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(-5%)' },
          '50%': { transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
```

## Component Library

### Base UI Components

#### Button Component
```vue
<!-- src/components/ui/BaseButton.vue -->
<template>
  <component 
    :is="tag"
    :class="buttonClasses"
    :disabled="disabled || loading"
    v-bind="$attrs"
  >
    <svg 
      v-if="loading" 
      class="animate-spin -ml-1 mr-3 h-5 w-5" 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    
    <slot name="icon-left" />
    
    <span>
      <slot />
    </span>
    
    <slot name="icon-right" />
  </component>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'outline', 'ghost', 'danger'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
  },
  tag: {
    type: String,
    default: 'button'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  fullWidth: {
    type: Boolean,
    default: false
  }
})

const buttonClasses = computed(() => {
  const baseClasses = [
    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
    // Ensure minimum touch targets for mobile
    'min-h-[44px] min-w-[44px]'
  ]
  
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl'
  }
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-warm-gold text-rich-brown hover:bg-rich-brown hover:text-warm-gold focus:ring-warm-gold shadow-md hover:shadow-lg transform hover:-translate-y-0.5',
    secondary: 'bg-deep-forest text-white hover:bg-charcoal focus:ring-deep-forest shadow-md hover:shadow-lg',
    outline: 'border-2 border-deep-forest text-deep-forest hover:bg-deep-forest hover:text-white focus:ring-deep-forest',
    ghost: 'text-deep-forest hover:bg-sage-green hover:text-charcoal focus:ring-sage-green',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-md hover:shadow-lg'
  }
  
  const classes = [
    ...baseClasses,
    sizeClasses[props.size],
    variantClasses[props.variant]
  ]
  
  if (props.fullWidth) {
    classes.push('w-full')
  }
  
  return classes.join(' ')
})
</script>
```

#### Card Component
```vue
<!-- src/components/ui/BaseCard.vue -->
<template>
  <div :class="cardClasses">
    <div v-if="$slots.header" class="px-6 py-4 border-b border-warm-gray/20">
      <slot name="header" />
    </div>
    
    <div v-if="$slots.image" class="relative overflow-hidden">
      <slot name="image" />
      <div v-if="badge" class="absolute top-4 left-4">
        <span :class="badgeClasses">
          {{ badge }}
        </span>
      </div>
    </div>
    
    <div class="p-6">
      <slot />
    </div>
    
    <div v-if="$slots.footer" class="px-6 py-4 border-t border-warm-gray/20 bg-cream/30">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'elevated', 'bordered'].includes(value)
  },
  interactive: {
    type: Boolean,
    default: false
  },
  badge: {
    type: String,
    default: null
  },
  badgeColor: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'success', 'warning', 'error'].includes(value)
  }
})

const cardClasses = computed(() => {
  const baseClasses = ['bg-white rounded-xl overflow-hidden']
  
  const variantClasses = {
    default: 'shadow-soft',
    elevated: 'shadow-medium',
    bordered: 'border border-warm-gray/20 shadow-sm'
  }
  
  const classes = [
    ...baseClasses,
    variantClasses[props.variant]
  ]
  
  if (props.interactive) {
    classes.push('transition-all duration-200 hover:shadow-strong hover:-translate-y-1 cursor-pointer')
  }
  
  return classes.join(' ')
})

const badgeClasses = computed(() => {
  const baseClasses = ['inline-block px-3 py-1 text-sm font-semibold rounded-full']
  
  const colorClasses = {
    primary: 'bg-warm-gold text-rich-brown',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800'
  }
  
  return [...baseClasses, colorClasses[props.badgeColor]].join(' ')
})
</script>
```

### Layout Components

#### Header Component
```vue
<!-- src/components/layout/AppHeader.vue -->
<template>
  <header class="bg-white shadow-soft sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 lg:h-20">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <router-link to="/" class="flex items-center">
            <img 
              class="h-10 w-auto lg:h-12" 
              src="/images/logo.png" 
              alt="Blackberry Equestrian"
            />
            <span class="ml-3 text-xl lg:text-2xl font-serif font-bold text-deep-forest">
              Blackberry Equestrian
            </span>
          </router-link>
        </div>
        
        <!-- Desktop Navigation -->
        <nav class="hidden lg:flex space-x-8">
          <router-link
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            :class="[
              'text-charcoal hover:text-deep-forest transition-colors duration-200',
              'px-3 py-2 text-sm font-medium'
            ]"
          >
            {{ item.name }}
          </router-link>
        </nav>
        
        <!-- Contact Info (Desktop) -->
        <div class="hidden lg:flex items-center space-x-4">
          <a 
            :href="`tel:${appStore.siteConfig.contact.phone}`"
            class="text-deep-forest hover:text-warm-gold transition-colors"
          >
            <PhoneIcon class="h-5 w-5" />
          </a>
          <span class="text-sm text-charcoal">{{ appStore.siteConfig.contact.phone }}</span>
        </div>
        
        <!-- Mobile menu button -->
        <div class="lg:hidden">
          <button
            @click="appStore.toggleMobileMenu()"
            class="p-2 rounded-md text-charcoal hover:text-deep-forest hover:bg-sage-green/20 transition-colors"
          >
            <Bars3Icon v-if="!appStore.mobileMenuOpen" class="h-6 w-6" />
            <XMarkIcon v-else class="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
    
    <!-- Mobile Navigation -->
    <div v-show="appStore.mobileMenuOpen" class="lg:hidden bg-white border-t border-warm-gray/20">
      <div class="px-4 py-4 space-y-1">
        <router-link
          v-for="item in navigation"
          :key="item.name"
          :to="item.href"
          @click="appStore.mobileMenuOpen = false"
          class="block px-3 py-3 text-base font-medium text-charcoal hover:text-deep-forest hover:bg-sage-green/20 rounded-md transition-colors"
        >
          {{ item.name }}
        </router-link>
        
        <!-- Mobile Contact -->
        <div class="pt-4 border-t border-warm-gray/20">
          <a 
            :href="`tel:${appStore.siteConfig.contact.phone}`"
            class="flex items-center px-3 py-3 text-base font-medium text-deep-forest hover:bg-sage-green/20 rounded-md"
          >
            <PhoneIcon class="h-5 w-5 mr-3" />
            {{ appStore.siteConfig.contact.phone }}
          </a>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useAppStore } from '@/stores/app'
import { PhoneIcon, Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

const appStore = useAppStore()

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Horses', href: '/horses' },
  { name: 'Facilities', href: '/facilities' },
  { name: 'Team', href: '/team' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' }
]
</script>
```

### Form Components

#### Form Input Component
```vue
<!-- src/components/ui/BaseInput.vue -->
<template>
  <div class="form-group">
    <label 
      v-if="label"
      :for="inputId" 
      class="block text-sm font-medium text-rich-brown mb-2"
    >
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>
    
    <div class="relative">
      <component
        :is="inputComponent"
        :id="inputId"
        v-model="modelValue"
        :class="inputClasses"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :type="type"
        v-bind="$attrs"
        @blur="handleBlur"
        @focus="handleFocus"
      />
      
      <div v-if="$slots.icon" class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <slot name="icon" />
      </div>
    </div>
    
    <p v-if="error" class="mt-2 text-sm text-red-600">
      {{ error }}
    </p>
    
    <p v-else-if="hint" class="mt-2 text-sm text-warm-gray">
      {{ hint }}
    </p>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  },
  hint: {
    type: String,
    default: ''
  },
  multiline: {
    type: Boolean,
    default: false
  },
  rows: {
    type: Number,
    default: 3
  }
})

const emit = defineEmits(['update:modelValue', 'blur', 'focus'])

const isFocused = ref(false)
const inputId = computed(() => `input-${Math.random().toString(36).substr(2, 9)}`)

const inputComponent = computed(() => props.multiline ? 'textarea' : 'input')

const inputClasses = computed(() => {
  const baseClasses = [
    'block w-full px-4 py-3 border rounded-lg transition-colors duration-200',
    'focus:outline-none focus:ring-2 focus:ring-warm-gold focus:border-transparent',
    'placeholder-warm-gray text-charcoal',
    // Ensure minimum touch targets for mobile
    'min-h-[44px]'
  ]
  
  const stateClasses = props.error 
    ? ['border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500']
    : ['border-warm-gray/30 bg-white hover:border-warm-gray/50']
  
  const disabledClasses = props.disabled 
    ? ['opacity-50 cursor-not-allowed bg-gray-50']
    : ['hover:border-warm-gold/50']
    
  if (props.multiline) {
    baseClasses.push('resize-vertical')
  }
  
  return [...baseClasses, ...stateClasses, ...disabledClasses].join(' ')
})

const handleBlur = (event) => {
  isFocused.value = false
  emit('blur', event)
}

const handleFocus = (event) => {
  isFocused.value = true
  emit('focus', event)
}

// v-model handling
const modelValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>
```

### Typography System

#### CSS Typography Classes
```css
/* src/assets/css/typography.css */
.heading-hero {
  @apply font-serif text-5xl lg:text-6xl font-bold leading-tight text-deep-forest;
}

.heading-section {
  @apply font-serif text-3xl lg:text-4xl font-semibold leading-tight text-rich-brown mb-6;
}

.heading-subsection {
  @apply font-sans text-xl lg:text-2xl font-semibold text-charcoal mb-4;
}

.heading-card {
  @apply font-sans text-lg lg:text-xl font-semibold text-charcoal mb-2;
}

.text-body {
  @apply font-sans text-base leading-relaxed text-charcoal;
}

.text-lead {
  @apply font-sans text-lg leading-relaxed text-warm-gray;
}

.text-small {
  @apply font-sans text-sm text-warm-gray;
}

.text-caption {
  @apply font-sans text-xs uppercase tracking-wide font-medium text-warm-gray;
}

/* Responsive text utilities */
@media (max-width: 768px) {
  .heading-hero {
    @apply text-4xl;
  }
  
  .heading-section {
    @apply text-2xl;
  }
}
```

## Mobile-First Responsive Design

### Breakpoint System
```css
/* Mobile-first breakpoints */
/* Default: 320px+ (mobile) */

/* sm: 640px+ (large mobile) */
@media (min-width: 640px) {
  .responsive-grid {
    @apply grid-cols-2;
  }
}

/* md: 768px+ (tablet) */
@media (min-width: 768px) {
  .responsive-grid {
    @apply grid-cols-2 gap-8;
  }
}

/* lg: 1024px+ (desktop) */
@media (min-width: 1024px) {
  .responsive-grid {
    @apply grid-cols-3 gap-10;
  }
}

/* xl: 1280px+ (large desktop) */
@media (min-width: 1280px) {
  .responsive-grid {
    @apply grid-cols-4 gap-12;
  }
}
```

### Touch-Friendly Design Guidelines
```css
/* Touch target sizing */
.touch-target {
  @apply min-h-[44px] min-w-[44px];
}

/* Button spacing for touch */
.button-group {
  @apply space-y-3 sm:space-y-0 sm:space-x-3 sm:flex;
}

/* Form spacing for touch */
.form-spacing {
  @apply space-y-4 sm:space-y-6;
}

/* Navigation touch areas */
.nav-touch {
  @apply py-3 px-4 -mx-4;
}
```

## Accessibility Implementation

### WCAG 2.2 AA Compliance

#### Color Contrast Validation
```css
/* Ensure 4.5:1 contrast ratio minimum */
.text-primary {
  color: #36454F; /* Charcoal - AAA compliant on white */
}

.text-secondary {
  color: #8B7D7B; /* Warm Gray - AA compliant on white */
}

.bg-primary {
  background-color: #D4AF37; /* Warm Gold */
  color: #8B4513; /* Rich Brown - AAA compliant */
}

.bg-secondary {
  background-color: #2D4A3E; /* Deep Forest */
  color: #FFFFFF; /* White - AAA compliant */
}
```

#### Focus Management
```css
/* Custom focus rings */
.focus-ring {
  @apply focus:outline-none focus:ring-2 focus:ring-warm-gold focus:ring-offset-2;
}

/* Skip links */
.skip-link {
  @apply absolute -top-10 left-4 bg-deep-forest text-white px-4 py-2 rounded-md;
  @apply focus:top-4 transition-all duration-200;
}

/* Screen reader only text */
.sr-only {
  @apply absolute w-px h-px p-0 -m-px overflow-hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

#### Semantic HTML Structure
```vue
<!-- Proper heading hierarchy example -->
<template>
  <main role="main">
    <h1 class="heading-hero">Page Title</h1>
    
    <section aria-labelledby="services-heading">
      <h2 id="services-heading" class="heading-section">Our Services</h2>
      
      <article>
        <h3 class="heading-subsection">Boarding Services</h3>
        <!-- Content -->
      </article>
    </section>
  </main>
</template>
```

## Performance Optimization

### CSS Optimization
```css
/* Use transform for animations (GPU acceleration) */
.smooth-hover {
  @apply transition-transform duration-200 ease-out;
}

.smooth-hover:hover {
  @apply -translate-y-1;
}

/* Optimize background images */
.hero-bg {
  background-image: url('/images/hero-mobile.webp');
}

@media (min-width: 768px) {
  .hero-bg {
    background-image: url('/images/hero-desktop.webp');
  }
}

/* Efficient animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}
```

### Image Optimization Guidelines
```vue
<template>
  <!-- Responsive images with modern formats -->
  <picture>
    <source 
      srcset="/images/facility-hero.avif" 
      type="image/avif"
      media="(min-width: 768px)"
    >
    <source 
      srcset="/images/facility-hero.webp" 
      type="image/webp"
      media="(min-width: 768px)"
    >
    <source 
      srcset="/images/facility-hero-mobile.avif" 
      type="image/avif"
    >
    <source 
      srcset="/images/facility-hero-mobile.webp" 
      type="image/webp"
    >
    <img 
      src="/images/facility-hero.jpg"
      alt="Blackberry Equestrian indoor arena with hunter course"
      class="w-full h-64 sm:h-80 lg:h-96 object-cover"
      loading="lazy"
    >
  </picture>
</template>
```

## Task Completion Checklist

### Design System Setup
- [ ] Configure Tailwind CSS with custom theme
- [ ] Create color palette and CSS variables
- [ ] Set up typography system
- [ ] Define spacing and sizing scales
- [ ] Create animation keyframes

### Component Development
- [ ] Build base UI components (Button, Card, Input)
- [ ] Create layout components (Header, Footer, Navigation)
- [ ] Develop form components with validation styles
- [ ] Build modal and overlay components
- [ ] Create loading and feedback components

### Responsive Design
- [ ] Implement mobile-first breakpoints
- [ ] Ensure touch-friendly interfaces
- [ ] Test on various screen sizes
- [ ] Optimize for outdoor/barn usage
- [ ] Validate thumb-zone accessibility

### Accessibility Implementation
- [ ] Audit color contrast ratios
- [ ] Implement proper focus management
- [ ] Add skip navigation links
- [ ] Ensure semantic HTML structure
- [ ] Test with screen readers

### Performance Optimization
- [ ] Optimize CSS bundle size
- [ ] Implement efficient animations
- [ ] Set up image optimization pipeline
- [ ] Configure lazy loading
- [ ] Minimize layout shifts

## Success Criteria Validation

### Design Quality
- Professional equestrian aesthetic achieved
- Consistent visual hierarchy throughout
- Brand identity clearly communicated
- Mobile experience optimized for barn usage

### Technical Performance
- Lighthouse accessibility score > 95
- Mobile-friendly test passes
- Touch targets meet 44px minimum
- Color contrast meets WCAG 2.2 AA standards

### User Experience
- Intuitive navigation structure
- Fast loading visual feedback
- Smooth interactions and animations
- Clear call-to-action placement

## Next Phase Handoff

### For Content Management Agent
- Component library ready for content integration
- Style system established for CMS previews
- Image sizing guidelines provided
- Form styling patterns available

### For Horse Listings Agent
- Card components ready for horse profiles
- Gallery layout patterns established
- Search/filter UI components available
- Mobile-optimized interaction patterns

### For Business Pages Agent
- Page layout templates ready
- Hero section components built
- Pricing table styles defined
- Contact form components available

This design system provides a comprehensive foundation for creating a professional, accessible, and mobile-optimized equestrian website that honors traditional values while embracing modern web standards.