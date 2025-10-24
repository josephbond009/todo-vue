# Todo Application (Vue.js)

A modern, responsive Todo application built with Vue 3 that allows users to manage their tasks efficiently. The application fetches todo data from JSONPlaceholder API and provides a clean, user-friendly interface for viewing and managing todos.

## Features

- 📱 Responsive design that works on all devices
- 🔄 Real-time data fetching with Vue Query (TanStack Query)
- 🎨 Modern UI with Ant Design Vue components
- 🔐 User authentication with protected routes
- 📋 View list of all todos
- ➕ Add new todos
- ✏️ Edit existing todos
- 🗑️ Delete todos
- 🔍 Search todos by title
- 🎯 Filter todos by status (All/Completed/Pending)
- 📄 Pagination support
- 🌓 Dark/Light theme toggle
- ⚡ Fast and efficient data loading
- ♿ Accessibility features included
- 🎯 Error handling and loading states

## Technology Stack

- **Frontend Framework**: Vue 3 (Composition API)
- **State Management**: Pinia
- **Data Fetching**: Vue Query (TanStack Query)
- **Routing**: Vue Router 4
- **UI Components**: Ant Design Vue
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: CSS (with CSS Variables for theming)

## Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd todovuejs
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint

## Project Structure

```
todovuejs/
├── src/
│   ├── views/
│   │   ├── TodoListPage.vue       # Main todo list view
│   │   ├── TodoDetailsPage.vue    # Todo details view
│   │   ├── LoginPage.vue          # Login page
│   │   └── styles/
│   │       └── login.css
│   ├── components/
│   │   └── styles/
│   │       ├── TodoList.css
│   │       ├── todoList.css
│   │       └── layout.css
│   ├── stores/
│   │   └── auth.ts                # Pinia store for authentication
│   ├── router/
│   │   └── index.ts               # Vue Router configuration
│   ├── types/
│   │   └── index.ts               # TypeScript type definitions
│   ├── App.vue                    # Root component
│   ├── main.ts                    # Application entry point
│   ├── index.css                  # Global styles
│   └── App.css                    # App-specific styles
├── public/
│   └── vite.svg
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## Authentication

The application includes a simple authentication system:

- **Email**: admin@example.com
- **Password**: password

This is a mock authentication for demonstration purposes. In a production environment, this would be replaced with a proper backend authentication system.

## API Integration

The application uses the JSONPlaceholder API for todo data:

- Base URL: `https://jsonplaceholder.typicode.com`
- Endpoints:
  - `GET /todos` - Fetch all todos
  - `GET /todos/:id` - Fetch a specific todo
  - `POST /todos` - Add a new todo
  - `PUT /todos/:id` - Update a todo
  - `DELETE /todos/:id` - Delete a todo

**Note**: JSONPlaceholder is a fake REST API, so changes are simulated and not persisted.

## Features in Detail

### Authentication
- Login page with form validation
- Protected routes requiring authentication
- Logout functionality
- Session persistence using localStorage

### Todo List View
- Displays all todos in a clean, organized grid layout
- Shows completion status for each todo
- Search functionality to filter by title
- Filter by status (All/Completed/Pending)
- Pagination (10 todos per page)
- Responsive design for mobile and desktop

### Todo Management
- **Add**: Create new todos with a modal form
- **Edit**: Update todo title and completion status
- **Delete**: Remove todos with confirmation
- **View Details**: Navigate to detailed view of individual todos

### Theme Toggle
- Switch between light and dark modes
- Persistent theme preference
- Smooth transitions between themes
- CSS variables for easy customization

### Todo Details View
- Detailed view of individual todos
- Shows todo title, ID, user ID, and completion status
- Error handling for non-existent todos
- Loading states for better UX
- Back navigation to todo list

## Accessibility Features

- ARIA labels for better screen reader support
- Semantic HTML structure
- Keyboard navigation support
- Loading and error states with appropriate ARIA roles
- Focus management in modals

## Screenshots

### Homepage (darkmode default)
![Homepage(darkmode default)](images/FireShot%20Capture%20007%20-%20Vite%20+%20React%20-%20[localhost].png)

### Homepage (lightmode)
![Homepage(lightmode)](images/FireShot%20Capture%20015%20-%20Vite%20+%20React%20-%20[localhost].png)

### Search input
![Search input](images/FireShot%20Capture%20009%20-%20Vite%20+%20React%20-%20[localhost].png)

### Add new todo
![Add new todo](images/FireShot%20Capture%20011%20-%20Vite%20+%20React%20-%20[localhost].png)
![Add new todo](images/FireShot%20Capture%20012%20-%20Vite%20+%20React%20-%20[localhost].png)

### Filter feature
![Filter feature](images/FireShot%20Capture%20013%20-%20Vite%20+%20React%20-%20[localhost].png)

### Mobile version (darkmode)
![Mobile version(darkmode)](images/FireShot%20Capture%20017%20-%20Vite%20+%20React%20-%20[localhost].png)

### Mobile version (lightmode)
![Mobile version(lightmode)](images/FireShot%20Capture%20018%20-%20Vite%20+%20React%20-%20[localhost].png)

## Known Limitations

- The application uses JSONPlaceholder API, which is a mock API
- No persistent storage (data resets on page refresh for API calls)
- Mock authentication (not connected to a real backend)
- LocalStorage is used for user session persistence

## Future Improvements

- [ ] Add user authentication with a real backend
- [ ] Implement persistent storage with a database
- [ ] Add real-time updates with WebSockets
- [ ] Implement unit and integration tests
- [ ] Add todo categories/tags
- [ ] Add due dates and reminders
- [ ] Export/import todo lists
- [ ] Add user preferences and settings

## Vue 3 + TypeScript Benefits

This application leverages Vue 3's Composition API and TypeScript for:

- Better type safety and IntelliSense
- Improved code organization and reusability
- Enhanced developer experience
- Better performance with Vue 3's reactivity system
- Modern development patterns

## Development Notes

- Built with Vite for fast development and optimized builds
- Uses Pinia for state management (Vue's official state management)
- Vue Query for efficient data fetching and caching
- Ant Design Vue for consistent UI components
- TypeScript for type safety
- Vue Router for client-side routing

## Acknowledgments

- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for providing the mock API
- [Ant Design Vue](https://antdv.com/) for the UI components
- [Vue Query](https://tanstack.com/query/latest) for data fetching and caching
- [Vue.js](https://vuejs.org/) for the amazing framework
- [Pinia](https://pinia.vuejs.org/) for state management
- [Vite](https://vitejs.dev/) for the build tool

## License

This project is open source and available under the MIT License.
