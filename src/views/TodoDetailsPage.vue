<template>
  <main class="todo-detail-container" :role="error ? 'alert' : 'status'" :aria-live="error ? 'assertive' : 'polite'">
    <div class="todo-detail-wrapper">
      <!-- Loading State -->
      <p v-if="isLoading" class="loading-message">Loading todo details...</p>

      <!-- Error State -->
      <template v-else-if="error">
        <p class="error-message">{{ errorMessage }}</p>
        <router-link to="/" class="back-button">Back to Todo List</router-link>
      </template>

      <!-- No Todo Found -->
      <template v-else-if="!todo">
        <p class="error-message">No todo found with ID: {{ id }}</p>
        <router-link to="/" class="back-button">Back to Todo List</router-link>
      </template>

      <!-- Todo Details -->
      <template v-else>
        <header class="detail-header">
          <h2>Todo Details</h2>
        </header>
        <section class="detail-info">
          <p><strong>Title:</strong> {{ todo.title }}</p>
          <p><strong>ID:</strong> {{ todo.id }}</p>
          <p><strong>User ID:</strong> {{ todo.userId }}</p>
          <p>
            <strong>Status:</strong>
            <span :class="todo.completed ? 'status-completed' : 'status-pending'">
              {{ todo.completed ? 'Completed' : 'Pending' }}
            </span>
          </p>
        </section>
        <router-link to="/" class="back-button" aria-label="Back to todo list">
          Back to Todo List
        </router-link>
      </template>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import axios, { AxiosError } from 'axios'
import type { Todo } from '@/types'

const route = useRoute()
const id = computed(() => route.params.id as string)
const BASE_URL = computed(() => `https://jsonplaceholder.typicode.com/todos/${id.value}`)

const { data: todo, isLoading, error } = useQuery<Todo, AxiosError>({
  queryKey: ['todo', id],
  queryFn: async (): Promise<Todo> => {
    const response = await axios.get<Todo>(BASE_URL.value)
    return response.data
  },
})

const errorMessage = computed(() => {
  if (!error.value) return ''
  
  if (axios.isAxiosError(error.value)) {
    if (error.value.response) {
      if (error.value.response.status === 404) {
        return 'Todo not found.'
      } else {
        return `Error: ${error.value.response.status} - ${error.value.response.statusText || 'Server Error'}`
      }
    } else if (error.value.request) {
      return 'Network error. No response received from server.'
    } else {
      return error.value.message
    }
  }
  
  return (error.value as Error).message || 'Failed to load todo details.'
})
</script>

<style scoped>
/* Styles are imported globally from todoList.css */
</style>

