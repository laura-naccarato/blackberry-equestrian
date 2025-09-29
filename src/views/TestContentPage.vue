<template>
  <div class="test-content-page p-8">
    <h1 class="text-2xl font-bold mb-4">Content Test Page</h1>
    
    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-2">Homepage Data</h2>
      <pre class="bg-gray-100 p-4 rounded overflow-auto">{{ JSON.stringify(pageData, null, 2) }}</pre>
    </section>
    
    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-2">Horses Data</h2>
      <pre class="bg-gray-100 p-4 rounded overflow-auto">{{ JSON.stringify(horses, null, 2) }}</pre>
    </section>
    
    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-2">Services Data</h2>
      <pre class="bg-gray-100 p-4 rounded overflow-auto">{{ JSON.stringify(services, null, 2) }}</pre>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { loadPage, loadHorses, loadServices } from '@/utils/contentLoader'

const pageData = ref(null)
const horses = ref([])
const services = ref([])

onMounted(async () => {
  try {
    console.log('Loading content...')
    
    // Load page content
    pageData.value = await loadPage('home')
    console.log('Page data loaded:', pageData.value)
    
    // Load horses
    horses.value = await loadHorses()
    console.log('Horses loaded:', horses.value)
    
    // Load services
    services.value = await loadServices()
    console.log('Services loaded:', services.value)
  } catch (error) {
    console.error('Error loading content:', error)
  }
})
</script>