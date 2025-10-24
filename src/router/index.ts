import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import TodoListPage from '@/views/TodoListPage.vue'
import TodoDetailsPage from '@/views/TodoDetailsPage.vue'
import LoginPage from '@/views/LoginPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
      meta: { requiresAuth: false }
    },
    {
      path: '/',
      name: 'home',
      component: TodoListPage,
      meta: { requiresAuth: true }
    },
    {
      path: '/todos/:id',
      name: 'todo-details',
      component: TodoDetailsPage,
      meta: { requiresAuth: true }
    }
  ]
})

// Navigation guard for protected routes
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const requiresAuth = to.meta.requiresAuth

  // Wait for auth to be initialized
  if (authStore.isLoading) {
    // Wait a bit for initialization
    const checkAuth = setInterval(() => {
      if (!authStore.isLoading) {
        clearInterval(checkAuth)
        if (requiresAuth && !authStore.isAuthenticated) {
          next('/login')
        } else if (to.path === '/login' && authStore.isAuthenticated) {
          next('/')
        } else {
          next()
        }
      }
    }, 50)
  } else {
    if (requiresAuth && !authStore.isAuthenticated) {
      next('/login')
    } else if (to.path === '/login' && authStore.isAuthenticated) {
      next('/')
    } else {
      next()
    }
  }
})

export default router

