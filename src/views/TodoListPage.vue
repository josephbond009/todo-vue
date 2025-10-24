<template>
  <main class="todo-list-container">
    <div class="todo-list-wrapper">
      <!-- Loading State -->
      <div v-if="isLoading" class="loading-state-container" role="status" aria-live="polite">
        <div class="loading-spinner"></div>
        <p class="loading-text">Loading todos, please wait...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" role="alert" aria-live="assertive">
        <p class="error-message">Error: {{ error.message }}</p>
        <p class="error-message">Please check your network connection or try again later.</p>
      </div>

      <!-- Main Content -->
      <template v-else>
        <header class="todo-list-header">
          <div class="header-title-section">
            <h2>GetMyTasks</h2>
            <div v-if="user" class="user-info">
              <span>Welcome, {{ user.name }}</span>
              <a-button
                type="text"
                size="small"
                class="logout-button"
                @click="handleLogout"
              >
                <template #icon><LogoutOutlined /></template>
                Logout
              </a-button>
            </div>
          </div>
          <div class="header-controls">
            <div class="search-row">
              <label for="search-todo" class="visually-hidden">Search Todos</label>
              <a-input
                id="search-todo"
                v-model:value="searchTerm"
                class="search-input"
                placeholder="Q Search"
                aria-label="Search todos by title"
              />
            </div>
            <div class="buttons-row">
              <a-button
                type="primary"
                class="add-todo-button"
                aria-label="Add new todo"
                @click="isAddModalVisible = true"
              >
                <template #icon><PlusOutlined /></template>
                Add New Todo
              </a-button>
              <a-dropdown :trigger="['click']" placement="bottomRight">
                <a-button class="filter-dropdown-button" aria-label="Filter todos">
                  <FilterOutlined /> Filter
                </a-button>
                <template #overlay>
                  <a-menu
                    v-model:selectedKeys="selectedFilterKeys"
                    @click="handleFilterClick"
                  >
                    <a-menu-item key="all">All</a-menu-item>
                    <a-menu-item key="completed">Completed</a-menu-item>
                    <a-menu-item key="pending">Pending</a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
              <a-button
                class="theme-toggle-button"
                :aria-label="`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`"
                @click="toggleTheme"
              >
                <BulbOutlined v-if="currentTheme === 'light'" />
                <BulbFilled v-else />
                <span class="visually-hidden">Switch to {{ currentTheme === 'light' ? 'dark' : 'light' }} mode</span>
              </a-button>
            </div>
          </div>
        </header>

        <section class="todo-items-grid" aria-live="polite">
          <p v-if="currentTodos.length === 0 && !isLoading && !error && todos.length > 0" class="no-todos-message">
            No todos found matching your criteria.
          </p>
          <div
            v-for="todo in currentTodos"
            :key="todo.id"
            class="todo-item-card"
          >
            <div class="todo-item-card-content">
              <a-checkbox
                :checked="todo.completed"
                disabled
                :aria-label="`Todo ${todo.title} is ${todo.completed ? 'completed' : 'not completed'}`"
              />
              <span :class="['todo-item-title', { 'completed-text': todo.completed }]">
                {{ todo.title }}
              </span>
            </div>
            <div class="todo-card-footer">
              <a-button
                size="small"
                class="action-button edit-button"
                :aria-label="`Edit todo: ${todo.title}`"
                @click="handleEditClick(todo)"
              >
                <template #icon><EditOutlined /></template>
                Edit
              </a-button>
              <a-button
                size="small"
                class="action-button delete-button"
                :aria-label="`Delete todo: ${todo.title}`"
                @click="handleDeleteClick(todo.id)"
              >
                <template #icon><DeleteOutlined /></template>
                Delete
              </a-button>
              <router-link
                :to="`/todos/${todo.id}`"
                class="action-button view-button"
                :aria-label="`View details for todo: ${todo.title}`"
              >
                View
              </router-link>
            </div>
          </div>
        </section>

        <nav class="pagination-controls" aria-label="Pagination Navigation">
          <button
            class="pagination-button"
            :disabled="currentPage === 1"
            aria-label="Go to previous page"
            @click="paginate(currentPage - 1)"
          >
            Previous
          </button>
          
          <button
            v-for="pageNum in totalPages"
            :key="pageNum"
            :class="['pagination-button', { active: currentPage === pageNum }]"
            :aria-label="`Go to page ${pageNum}`"
            @click="paginate(pageNum)"
          >
            {{ pageNum }}
          </button>

          <button
            class="pagination-button"
            :disabled="currentPage === totalPages || totalPages === 0"
            aria-label="Go to next page"
            @click="paginate(currentPage + 1)"
          >
            Next
          </button>
        </nav>
      </template>
    </div>

    <!-- Add Todo Modal -->
    <a-modal
      v-model:open="isAddModalVisible"
      title="Add New Todo"
      :footer="null"
      @cancel="handleAddModalCancel"
    >
      <a-form
        :model="addFormState"
        layout="vertical"
        @finish="handleAddTodo"
      >
        <a-form-item
          label="Todo Title"
          name="title"
          :rules="[{ required: true, message: 'Please input the todo title!' }]"
        >
          <a-input
            v-model:value="addFormState.title"
            placeholder="e.g., Plan social media content"
          />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" class="add-todo-modal-button">
            Add Todo
          </a-button>
          <a-button style="margin-left: 8px" @click="handleAddModalCancel">
            Cancel
          </a-button>
        </a-form-item>
      </a-form>
    </a-modal>

    <!-- Edit Todo Modal -->
    <a-modal
      v-model:open="isEditModalVisible"
      title="Edit Todo"
      :footer="null"
      @cancel="handleEditModalCancel"
    >
      <a-form
        :model="editFormState"
        layout="vertical"
        @finish="handleUpdateTodo"
      >
        <a-form-item
          label="Todo Title"
          name="title"
          :rules="[{ required: true, message: 'Please input the todo title!' }]"
        >
          <a-input
            v-model:value="editFormState.title"
            placeholder="e.g., Plan social media content"
          />
        </a-form-item>
        <a-form-item name="completed">
          <a-checkbox v-model:checked="editFormState.completed">Completed</a-checkbox>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit">
            Update Todo
          </a-button>
          <a-button style="margin-left: 8px" @click="handleEditModalCancel">
            Cancel
          </a-button>
        </a-form-item>
      </a-form>
    </a-modal>

    <!-- Delete Confirmation Modal -->
    <a-modal
      v-model:open="isDeleteConfirmVisible"
      title="Confirm Delete"
      ok-text="Delete"
      cancel-text="Cancel"
      :ok-button-props="{ danger: true }"
      @ok="handleConfirmDelete"
      @cancel="handleDeleteModalCancel"
    >
      <p>Are you sure you want to delete this todo? This action cannot be undone.</p>
    </a-modal>

    <!-- Success Modal -->
    <a-modal
      v-model:open="showSuccessModal"
      :title="successModalTitle"
      :footer="null"
      centered
      @cancel="showSuccessModal = false"
    >
      <div style="text-align: center; margin-bottom: 20px">
        <CheckCircleOutlined style="font-size: 48px; color: #28a745" />
      </div>
      <p style="text-align: center; font-size: 1.1em; color: #333333">
        {{ successModalMessage }}
      </p>
      <div style="text-align: center; margin-top: 20px">
        <a-button type="primary" @click="showSuccessModal = false">OK</a-button>
      </div>
    </a-modal>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, watch, reactive } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { notification } from 'ant-design-vue'
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  FilterOutlined,
  BulbOutlined,
  BulbFilled,
  CheckCircleOutlined,
  LogoutOutlined
} from '@ant-design/icons-vue'
import { useAuthStore } from '@/stores/auth'
import type { Todo, FilterStatus, AddTodoFormValues, EditTodoFormValues } from '@/types'

// Props
const props = defineProps<{
  toggleTheme: () => void
  currentTheme: 'light' | 'dark'
}>()

// Auth
const authStore = useAuthStore()
const router = useRouter()
const user = computed(() => authStore.user)

// State
const currentPage = ref(1)
const searchTerm = ref('')
const filterStatus = ref<FilterStatus>('all')
const selectedFilterKeys = ref<string[]>(['all'])

const isAddModalVisible = ref(false)
const isEditModalVisible = ref(false)
const isDeleteConfirmVisible = ref(false)
const editingTodo = ref<Todo | null>(null)
const deletingTodoId = ref<number | null>(null)

const showSuccessModal = ref(false)
const successModalTitle = ref('')
const successModalMessage = ref('')

const addFormState = reactive<AddTodoFormValues>({
  title: '',
  completed: false
})

const editFormState = reactive<EditTodoFormValues>({
  title: '',
  completed: false
})

const queryClient = useQueryClient()
const todosPerPage = 10
const BASE_URL = 'https://jsonplaceholder.typicode.com/todos'

// Success modal helper
const displaySuccessModal = (title: string, message: string) => {
  successModalTitle.value = title
  successModalMessage.value = message
  showSuccessModal.value = true
}

// Fetch todos
const { data: todosData, isLoading, error } = useQuery<Todo[]>({
  queryKey: ['todos'],
  queryFn: async (): Promise<Todo[]> => {
    const response = await axios.get<Todo[]>(BASE_URL)
    return response.data
  }
})

const todos = computed(() => todosData.value ?? [])

// Add todo mutation
const addTodoMutation = useMutation<Todo, Error, AddTodoFormValues>({
  mutationFn: async (values: AddTodoFormValues): Promise<Todo> => {
    const response = await axios.post<Todo>(BASE_URL, {
      title: values.title,
      completed: false,
      userId: 1,
    })
    const maxId = todos.value.length > 0 ? Math.max(...todos.value.map((t: Todo) => t.id)) : 200
    return { ...response.data, id: maxId + 1 }
  },
  onSuccess: (newTodo: Todo, variables: AddTodoFormValues) => {
    queryClient.setQueryData(['todos'], (oldTodos: Todo[] | undefined) => [newTodo, ...(oldTodos || [])])
    isAddModalVisible.value = false
    addFormState.title = ''
    addFormState.completed = false
    displaySuccessModal('Todo Added Successfully!', `"${variables.title}" has been added. (Note: JSONPlaceholder simulates this; data is not persistent)`)
  },
  onError: (err: Error) => {
    notification.error({
      message: 'Add Todo Failed',
      description: err.message || 'Could not add todo.',
      placement: 'topRight',
    })
  }
})

// Update todo mutation
const updateTodoMutation = useMutation<Todo, Error, EditTodoFormValues>({
  mutationFn: async (values: EditTodoFormValues): Promise<Todo> => {
    if (!editingTodo.value) {
      throw new Error('No todo being edited')
    }
    const updatedTodoData: Todo = {
      id: editingTodo.value.id,
      title: values.title,
      completed: values.completed,
      userId: editingTodo.value.userId,
    }
    await axios.put(`${BASE_URL}/${editingTodo.value.id}`, updatedTodoData)
    return updatedTodoData
  },
  onSuccess: (updatedTodo: Todo) => {
    queryClient.setQueryData(['todos'], (oldTodos: Todo[] | undefined) =>
      (oldTodos || []).map(todo => (todo.id === editingTodo.value?.id ? updatedTodo : todo))
    )
    isEditModalVisible.value = false
    editingTodo.value = null
    displaySuccessModal('Todo Updated Successfully!', `"${updatedTodo.title}" has been updated. (Note: JSONPlaceholder simulates this; data is not persistent)`)
  },
  onError: (err: Error) => {
    notification.error({
      message: 'Update Todo Failed',
      description: err.message || 'Could not update todo.',
      placement: 'topRight',
    })
  }
})

// Delete todo mutation
const deleteTodoMutation = useMutation<number, Error, number>({
  mutationFn: async (id: number): Promise<number> => {
    await axios.delete(`${BASE_URL}/${id}`)
    return id
  },
  onSuccess: (deletedId: number) => {
    queryClient.setQueryData(['todos'], (oldTodos: Todo[] | undefined) =>
      (oldTodos || []).filter(todo => todo.id !== deletedId)
    )
    isDeleteConfirmVisible.value = false
    deletingTodoId.value = null
    displaySuccessModal('Todo Deleted Successfully!', 'The todo has been removed. (Note: JSONPlaceholder simulates this; data is not persistent)')
  },
  onError: (err: Error) => {
    notification.error({
      message: 'Delete Todo Failed',
      description: err.message || 'Could not delete todo.',
      placement: 'topRight',
    })
  }
})

// Handlers
const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}

const handleFilterClick = ({ key }: { key: string }) => {
  filterStatus.value = key as FilterStatus
  selectedFilterKeys.value = [key]
}

const handleAddTodo = (values: AddTodoFormValues) => {
  addTodoMutation.mutate(values)
}

const handleEditClick = (todo: Todo) => {
  editingTodo.value = todo
  editFormState.title = todo.title
  editFormState.completed = todo.completed
  isEditModalVisible.value = true
}

const handleUpdateTodo = (values: EditTodoFormValues) => {
  if (!editingTodo.value) return
  updateTodoMutation.mutate(values)
}

const handleDeleteClick = (id: number) => {
  deletingTodoId.value = id
  isDeleteConfirmVisible.value = true
}

const handleConfirmDelete = () => {
  if (deletingTodoId.value !== null) {
    deleteTodoMutation.mutate(deletingTodoId.value)
  }
}

const handleAddModalCancel = () => {
  isAddModalVisible.value = false
  addFormState.title = ''
  addFormState.completed = false
}

const handleEditModalCancel = () => {
  isEditModalVisible.value = false
  editingTodo.value = null
  editFormState.title = ''
  editFormState.completed = false
}

const handleDeleteModalCancel = () => {
  isDeleteConfirmVisible.value = false
  deletingTodoId.value = null
}

// Computed properties
const filteredAndSearchedTodos = computed((): Todo[] => {
  let filtered: Todo[] = todos.value

  if (filterStatus.value === 'completed') {
    filtered = filtered.filter(todo => todo.completed)
  } else if (filterStatus.value === 'pending') {
    filtered = filtered.filter(todo => !todo.completed)
  }

  if (searchTerm.value) {
    filtered = filtered.filter(todo =>
      todo.title.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
  }
  return filtered
})

const indexOfLastTodo = computed(() => currentPage.value * todosPerPage)
const indexOfFirstTodo = computed(() => indexOfLastTodo.value - todosPerPage)
const currentTodos = computed(() => filteredAndSearchedTodos.value.slice(indexOfFirstTodo.value, indexOfLastTodo.value))
const totalPages = computed(() => Math.ceil(filteredAndSearchedTodos.value.length / todosPerPage))

const paginate = (pageNumber: number) => {
  currentPage.value = pageNumber
}

// Reset current page when search or filter changes
watch([searchTerm, filterStatus], () => {
  currentPage.value = 1
})

// Use the props methods
const { toggleTheme, currentTheme } = props
</script>

<style scoped>
/* Styles are imported globally */
</style>

