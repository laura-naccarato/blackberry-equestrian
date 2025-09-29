<template>
  <div id="app">
    <SiteHeader />
    <main class="main-content">
      <RouterView v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>
    <SiteFooter />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import SiteHeader from './components/layout/SiteHeader.vue'
import SiteFooter from './components/layout/SiteFooter.vue'
</script>

<style>
#app {
  @apply min-h-screen flex flex-col bg-cream;
}

.main-content {
  @apply flex-1 w-full;
}

/* Page transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
}

/* Focus visible only for keyboard navigation */
.js-focus-visible :focus:not(.focus-visible) {
  outline: 0;
}

/* Loading skeleton animation */
@keyframes shimmer {
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
}

.skeleton {
  animation-duration: 1.2s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: shimmer;
  animation-timing-function: linear;
  background: linear-gradient(to right, #f0f0f0 8%, #f8f8f8 18%, #f0f0f0 33%);
  background-size: 936px 104px;
  position: relative;
}
</style>