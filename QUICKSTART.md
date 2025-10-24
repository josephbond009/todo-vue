# Quick Start Guide - Vue.js Todo App

## Prerequisites

- Node.js 16.x or higher
- npm or yarn package manager

## Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```
   The app will be available at http://localhost:5173

3. **Login Credentials**
   - Email: `admin@example.com`
   - Password: `password`

## Key Features to Try

1. **Authentication**
   - Login with demo credentials
   - Session persists on page refresh
   - Protected routes redirect to login if not authenticated

2. **Todo Management**
   - ➕ **Add**: Click "Add New Todo" button
   - ✏️ **Edit**: Click "Edit" on any todo card
   - 🗑️ **Delete**: Click "Delete" (with confirmation)
   - 👁️ **View**: Click "View" to see details

3. **Search & Filter**
   - Use search box to find todos by title
   - Filter by status: All, Completed, or Pending

4. **Theme Toggle**
   - Switch between dark and light modes
   - Theme preference is saved

5. **Pagination**
   - Navigate through pages (10 todos per page)
   - Page numbers update based on filters

## Project Structure

```
src/
├── views/          # Page components (routes)
├── stores/         # Pinia state management
├── router/         # Vue Router config
├── components/     # Reusable components
├── types/          # TypeScript definitions
└── main.ts         # App entry point
```

## Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` directory.

## Preview Production Build

```bash
npm run preview
```

## Technologies Used

- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool
- **Pinia** - State management
- **Vue Router** - Client-side routing
- **Vue Query** - Data fetching & caching
- **Ant Design Vue** - UI component library
- **Axios** - HTTP client

## Common Commands

- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint code

## Troubleshooting

**Port already in use?**
```bash
# Kill process on port 5173
# Windows: netstat -ano | findstr :5173
# Mac/Linux: lsof -ti:5173 | xargs kill
```

**Dependencies issues?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**TypeScript errors?**
```bash
npm run build
# Check for type errors
```

## Next Steps

- Explore the codebase in `src/`
- Customize theme colors in CSS variables
- Add your own features
- Connect to a real backend API

Enjoy building with Vue! 🚀

