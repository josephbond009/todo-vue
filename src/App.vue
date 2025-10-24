<template>
  <div class="app">
    <router-view v-if="!isLoading" v-slot="{ Component }">
      <component :is="Component" :toggle-theme="toggleTheme" :current-theme="currentTheme" />
    </router-view>
    <div v-else class="loading-container">
      <div class="loading-spinner"></div>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const currentTheme = ref<'light' | 'dark'>('dark')
const isLoading = ref(true)

onMounted(() => {
  // Initialize auth store
  authStore.initialize()
  
  // Set theme
  document.documentElement.setAttribute('data-theme', currentTheme.value)
  
  isLoading.value = false
})

const toggleTheme = () => {
  currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', currentTheme.value)
}
</script>

<style>
/* Global styles are imported in main.ts */
</style>

