import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@/types'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isLoading = ref(true)
  const mounted = ref(false)

  // Initialize from localStorage
  const initialize = () => {
    mounted.value = true
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('user')
      if (savedUser) {
        try {
          user.value = JSON.parse(savedUser)
        } catch (error) {
          console.error('Failed to parse saved user:', error)
          localStorage.removeItem('user')
        }
      }
    }
    isLoading.value = false
  }

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    console.log('AuthStore login called with:', { email, password })
    
    // Simple mock authentication - in real app, this would call an API
    if (email === 'admin@example.com' && password === 'password') {
      const userData: User = {
        id: '1',
        email: email,
        name: 'Admin User'
      }
      user.value = userData
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(userData))
      }
      console.log('Login successful, user set:', userData)
      return true
    }
    console.log('Login failed - invalid credentials')
    return false
  }

  // Logout function
  const logout = () => {
    user.value = null
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user')
    }
  }

  // Computed property for checking if user is authenticated
  const isAuthenticated = computed(() => !!user.value)

  return {
    user,
    isLoading,
    mounted,
    isAuthenticated,
    initialize,
    login,
    logout
  }
})

