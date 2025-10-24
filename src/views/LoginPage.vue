<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h1>GetMyTasks</h1>
        <p>Sign in to manage your todos</p>
      </div>
      
      <a-form
        :model="formState"
        name="login"
        @finish="handleLogin"
        layout="vertical"
        class="login-form"
      >
        <a-form-item
          label="Email"
          name="email"
          :rules="[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' }
          ]"
        >
          <a-input
            v-model:value="formState.email"
            placeholder="Enter your email"
            size="large"
          >
            <template #prefix>
              <UserOutlined />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          label="Password"
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input-password
            v-model:value="formState.password"
            placeholder="Enter your password"
            size="large"
          >
            <template #prefix>
              <LockOutlined />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            :loading="loading"
            size="large"
            class="login-button"
          >
            Sign In
          </a-button>
        </a-form-item>
      </a-form>

      <div class="login-demo">
        <p><strong>Demo Credentials:</strong></p>
        <p>Email: admin@example.com</p>
        <p>Password: password</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { notification } from 'ant-design-vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'

const router = useRouter()
const authStore = useAuthStore()
const loading = ref(false)

const formState = reactive({
  email: '',
  password: ''
})

const handleLogin = async (values: { email: string; password: string }) => {
  console.log('Login attempt:', values)
  loading.value = true
  try {
    const success = await authStore.login(values.email, values.password)
    console.log('Login result:', success)
    if (success) {
      notification.success({
        message: 'Login Successful',
        description: 'Welcome back!',
        placement: 'topRight',
      })
      router.push('/')
    } else {
      notification.error({
        message: 'Login Failed',
        description: 'Invalid email or password',
        placement: 'topRight',
      })
    }
  } catch (error) {
    console.error('Login error:', error)
    notification.error({
      message: 'Login Error',
      description: 'Something went wrong. Please try again.',
      placement: 'topRight',
    })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Styles are imported globally from login.css */
</style>

